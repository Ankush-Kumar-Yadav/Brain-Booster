import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="dark:bg-black text-black py-10 dark:text-white">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div>
            <h1 className="text-2xl font-bold">Brain Boosters</h1>
            <p className="dark:text-gray-400 mt-2">
              Empower your learning with top-notch courses designed by experts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="mt-3 space-y-2 dark:text-gray-400">
              <li>
                <a href="#" className="dark:hover:text-white transition">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="dark:hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="dark:hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="dark:hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social Links */}
          <div>
            <h2 className="text-xl font-semibold">
              Subscribe to our Newsletter
            </h2>
            <form className="mt-3 flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="dark:bg-gray-800 text-white border-2 border-black dark:border-white focus:ring-0 focus:outline-none"
              />
              <Button className="bg-[#1E90FF] hover:bg-[#2959e9] transition ml-2 text-white">
                Subscribe
              </Button>
            </form>

            {/* Social Media Icons */}
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center   light:text-gray-900 text-sm mt-10 border-t border-gray-800 dark:border-gray-100 pt-4">
          © {new Date().getFullYear()} Brain Boosters. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
