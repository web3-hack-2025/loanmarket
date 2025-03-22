import { useEffect, useRef, ReactNode } from 'react';

interface ShaderBackground2Props {
  className?: string;
  children?: ReactNode;
}

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  varying vec2 v_uv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0;

    for(int i = 0; i < 6; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }

    return value;
  }

  void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x/u_resolution.y, 1.0);
    uv = uv * 2.0 - 1.0;
    uv *= aspect;

    float mouseInfluence = length(uv - (u_mouse * 2.0 - 1.0) * aspect);
    mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseInfluence);

    vec2 motion = vec2(u_time * 0.1);
    float f1 = fbm(uv * 3.0 + motion);
    float f2 = fbm(uv * 2.0 - motion + f1);
    float f3 = fbm(uv * 4.0 + f2 + motion * 0.5);

    vec3 color1 = vec3(0.5, 0.8, 1.0);
    vec3 color2 = vec3(0.8, 0.3, 0.8);
    vec3 color3 = vec3(0.1, 0.1, 0.4);

    f3 += mouseInfluence * 0.5;

    vec3 finalColor = mix(color1, color2, f1);
    finalColor = mix(finalColor, color3, f2);
    finalColor += f3 * 0.3;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function ShaderBackground2({ className = '', children }: ShaderBackground2Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Look up attribute locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

    // Look up uniform locations
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

    // Create a buffer for positions
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Set geometry (a simple quad covering the entire canvas)
    const positions = [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Handle resize
    const handleResize = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      // Check if the canvas is not the same size
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        
        // Update the viewport
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      }
    };

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: 1.0 - (event.clientY - rect.top) / rect.height, // Flip Y to match WebGL coords
      };
    };

    // Handle touch movement
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: (event.touches[0].clientX - rect.left) / rect.width,
          y: 1.0 - (event.touches[0].clientY - rect.top) / rect.height, // Flip Y to match WebGL coords
        };
        event.preventDefault();
      }
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Initial resize
    handleResize();

    // Animation function
    const render = () => {
      // Clear the canvas
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Use the program
      gl.useProgram(program);

      // Set up the position attribute
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2,          // 2 components per iteration
        gl.FLOAT,   // the data is 32bit floats
        false,      // don't normalize the data
        0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
        0,          // start at the beginning of the buffer
      );

      // Set uniforms
      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      gl.uniform1f(timeUniformLocation, currentTime);
      gl.uniform2f(mouseUniformLocation, mouseRef.current.x, mouseRef.current.y);
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Request next frame
      animationRef.current = requestAnimationFrame(render);
    };

    // Start animation
    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen z-1"
      />
      {children}
    </div>
  );
}

// Helper function to create a shader
function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

// Helper function to create a program
function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

export default ShaderBackground2;