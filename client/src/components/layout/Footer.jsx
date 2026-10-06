import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight">GoRide</span>
              <div className="w-2 h-2 rounded-full bg-[#315C4B]"></div>
            </Link>
            <p className="text-[#A3A3A3] text-sm leading-relaxed max-w-xs">
              Go further, comfortably. India's premium intercity transit network focusing on reliability and sustainability.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm tracking-wider uppercase text-[#E6E6E1]">Travel</h4>
            <ul className="space-y-4">
              <li><Link to="/search" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Find a Bus</Link></li>
              <li><Link to="/destinations" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Destinations</Link></li>
              <li><Link to="/track/demo" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Live Tracking</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm tracking-wider uppercase text-[#E6E6E1]">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/fleet" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Our Fleet</Link></li>
              <li><Link to="/careers" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm tracking-wider uppercase text-[#E6E6E1]">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/help" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/contact" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/cancellation" className="text-[#A3A3A3] hover:text-white transition-colors text-sm">Cancellation Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#313030] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#A3A3A3] text-sm">
            © {new Date().getFullYear()} GoRide Transit Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-[#A3A3A3] hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[#A3A3A3] hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
