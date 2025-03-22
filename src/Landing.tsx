import ShaderBackground2 from "./components/ShaderBackground2"

const Landing = () => {
  return (
    <>
      <ShaderBackground2/>
      <section className="z-[20] absolute inset-0 flex flex-col items-center justify-center"><div className=" flex flex-col items-center justify-center p-12 "><h1 className="text-[5rem] font-bold tracking-tight">The future of finance</h1><p className="text-[1.5rem] mb-8 ">Loan market can help you get better rates on financing</p> <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:opacity-90 transition-all">Connect Wallet</button></div></section>
      
      {/* Features Section */}
      <section className=" mt-[-40rem] relative z-10 w-full bg-gradient-to-b from-transparent to-black/90 pt-[70vh] pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Redefining Financial Freedom</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Experience the next generation of decentralized finance with unparalleled security and transparency.</p>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fast Loan Approval",
                description: "Get approved for loans in minutes, not weeks. Our AI-powered underwriting ensures quick access to competitive financing options.",
                icon: "💰"
              },
              {
                title: "Bank-Grade Security",
                description: "Strong encryption and multi-signature protection keep your assets safer than traditional defi.",
                icon: "🔒"
              },
              {
                title: "Zero Hidden Fees",
                description: "Complete transparency with all transactions. No surprise charges, ever.",
                icon: "✓"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Stats Section */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-2 gap-8 text-center">
            {[

              { value: "0.01%", label: "Transaction Fee" },
              { value: "99.99%", label: "Uptime" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <p className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">{stat.value}</p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="relative z-10 w-full bg-black py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Trusted by Industry Developers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform revolutionized how we access loans. The application process is so streamlined compared to traditional banks.",
                author: "Russell Bloxwich",
                role: "Developer @ Coalesce"
              },
              {
                quote: "The borrowing experience was incredibly smooth. We secured funding for our project in days instead of months.",
                author: "Jasper Miller-Waugh",
                role: "Creative Technologist @ University of Auckland"
              },
              {
                quote: "We've never had an easier time getting financing. The entire borrowing process from application to funding took less than 48 hours.",
                author: "Connor Hare",
                role: "Vice President, UoA Maker Club"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="mb-6 text-2xl">"</div>
                  <p className="text-gray-300 mb-6 flex-grow">{testimonial.quote}</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative z-10 w-full bg-gradient-to-t from-black to-purple-900/20 py-32">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Finances?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join thousands of individuals and businesses who have already discovered the future of finance.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-lg hover:opacity-90 transition-all">Connect Wallet</button>
            <button className="px-8 py-4 bg-transparent border border-white/20 rounded-lg font-bold text-lg hover:bg-white/5 transition-all">Learn More</button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 w-full bg-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0"> 2025 Loan Market. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Discord</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Landing