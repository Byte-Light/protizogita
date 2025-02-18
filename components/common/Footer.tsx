import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Press releases</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">In the media</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Testimonials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">99nonprofits</a></li>
            </ul>
          </div>

          {/* Design Services Section */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Design services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Design contests</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">1-to-1 Projects</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Find a designer</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Discover inspiration</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">99designs Studio</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">99designs Pro</a></li>
            </ul>
          </div>

          {/* Get a Design Section */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Get a design</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Logo design</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Business card</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Web page design</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Brand guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Packaging design</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">T-shirt design</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Book cover design</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Browse all categories</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Become a designer</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Design without borders</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">99awards</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Affiliates</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Logo ideas</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">T-shirt ideas</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Designer resources</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Featured partners</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Help</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t pt-6">
          <p className="text-gray-500">© Byte Contest | by Bytelight | Terms and Conditions | Privacy</p>
          <div className="mt-4 sm:mt-0">
            <a href="#" className="text-gray-500 mx-2 hover:text-gray-700">English</a>
            <a href="#" className="text-gray-500 mx-2 hover:text-gray-700">Español</a>
          </div>
          <div className="flex mt-4 sm:mt-0">
            <a href="#" className="text-gray-500 mx-2 hover:text-gray-700">FB</a>
            <a href="#" className="text-gray-500 mx-2 hover:text-gray-700">TW</a>
            <a href="#" className="text-gray-500 mx-2 hover:text-gray-700">LI</a>
            <a href="#" className="text-gray-500 mx-2 hover:text-gray-700">PIN</a>
            <a href="#" className="text-gray-500 mx-2 hover:text-gray-700">IG</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;