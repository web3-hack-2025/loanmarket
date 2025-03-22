import ShaderBackground2 from "./components/ShaderBackground2"

const Landing = () => {
  return (
    <>
      <ShaderBackground2/>
      <section className="z-[20] absolute inset-0 flex flex-col items-center justify-center "><h1 className="text-6xl font-bold tracking-tight">The future of finance</h1><p className="text-lg mt-4">Broker can help you get better rates on financing</p></section>
    </>
  )
}

export default Landing