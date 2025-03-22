import { useNavigate } from "react-router-dom";
import ShaderBackground2 from "./components/ShaderBackground2"
import { ConnectWalletButton } from "@/components/web3/simplekit";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  function onConnectWallet() {
    console.log("Connect Wallet");
    // go to loan
    navigate("/loan");
  }

  return (
    <>
      {/* Fancy Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
        
              <span className="ml-2 text-xl font-bold ">Loan Market</span>
            </div>
            
          
            
            {/* Connect Wallet (Desktop) */}
            <div className="hidden md:block">
              <ConnectWalletButton variant="default" onConnectedClick={onConnectWallet} />
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-3 border-t border-white/10 mt-3 space-y-3">
              <Link to="/" className="block text-white/90 hover:text-white py-2 transition-colors">Home</Link>
              <Link to="/loan" className="block text-white/90 hover:text-white py-2 transition-colors">Loans</Link>
              <Link to="/identity" className="block text-white/90 hover:text-white py-2 transition-colors">Identity</Link>
              <Link to="/apply" className="block text-white/90 hover:text-white py-2 transition-colors">Apply Now</Link>
              <div className="pt-2">
                <ConnectWalletButton variant="default" onConnectedClick={onConnectWallet} />
              </div>
            </div>
          )}
        </div>
      </header>

      <ShaderBackground2/>
      <section className="z-[20] absolute inset-0 flex flex-col items-center justify-center">
        <div className=" flex flex-col items-center justify-center p-12 mt-[200px] md:mt-0">
          <h1 className="text-[5rem]  font-bold tracking-tight">The future of finance</h1>
          <p className="text-[1.5rem] mb-8 ">Broker can help you get better rates on financing</p>
          <ConnectWalletButton variant="fancy" onConnectedClick={onConnectWallet}/>

        </div>
      </section>
      
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
            <ConnectWalletButton variant="fancy" onConnectedClick={onConnectWallet}/>

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
           
              <a href="https://github.com/web3-hack-2025/loanmarket" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
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