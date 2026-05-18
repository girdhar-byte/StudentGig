import { Link } from 'react-router-dom';
import { GraduationCap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1F4E79] text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 leading-none">
                Student<span className="text-[#1F4E79]">Gig</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              The premier marketplace where university students connect, collaborate, and earn while pursuing their education.
            </p>
            <div className="flex gap-4">
              <Github className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Marketplace</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><Link to="/tasks" className="hover:text-[#1F4E79]">Browse Tasks</Link></li>
              <li><Link to="/categories" className="hover:text-[#1F4E79]">Categories</Link></li>
              <li><Link to="/post-task" className="hover:text-[#1F4E79]">Post a Task</Link></li>
              <li><Link to="/freelancers" className="hover:text-[#1F4E79]">Top Freelancers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Support</h4>
            <ul className="flex flex-col gap-2 text-sm text-gray-500">
              <li><Link to="/help" className="hover:text-[#1F4E79]">Help Center</Link></li>
              <li><Link to="/safety" className="hover:text-[#1F4E79]">Safety & Trust</Link></li>
              <li><Link to="/terms" className="hover:text-[#1F4E79]">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-[#1F4E79]">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Newsletter</h4>
            <p className="mb-4 text-sm text-gray-500">Get student task alerts directly in your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="University email" 
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-[#1F4E79] focus:outline-none"
              />
              <button className="rounded-lg bg-[#1F4E79] px-4 py-2 text-white hover:bg-[#1F4E79]/90">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} StudentGig. All rights reserved. Built for students, by students.
        </div>
      </div>
    </footer>
  );
}
