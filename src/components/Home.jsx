'use client';

import React from 'react';
import { ArrowRight, Calendar, MapPin, Users, Phone, Mail, Clock, Coffee } from 'lucide-react';
import backgroundImage from '../assets/CoverPreviehomepage.png';
import bloodBag from '../assets/LeftContentimg.png';
import Header from './Header'; // Make sure the relative path is correct



export default function Home() {
  const HeroSection = () => (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6 sm:space-y-8">
          <div className="pl-4 sm:pl-20 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src={bloodBag}
                alt="Blood bag"
                className="w-60 sm:w-80 h-32 sm:h-40 object-contain"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">Why Donate Blood?</h2>
            <ul className="space-y-2 sm:space-y-3">
              {["Save lives", "Quick and simple process", "Your donation can save 3+ lives", "Help in emergencies", "Free health check with every donation"].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="/donate"
              className="inline-block w-full sm:w-auto bg-red-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-red-700 transition-colors text-sm sm:text-base text-center"
            >
              DONATE NOW
            </a>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative h-64 sm:h-80 lg:h-[400px]">
          <img
            src={backgroundImage}
            alt="Blood donation process"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${i === 2 ? 'bg-red-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DonationProcess = () => {
    const steps = [
      { icon: Users, title: "Registration", description: "Sign up and provide basic information" },
      { icon: Calendar, title: "Appointment", description: "Schedule a convenient time for donation" },
      { icon: Clock, title: "Pre-Donation Screening", description: "Quick health check and eligibility confirmation" },
      { icon: MapPin, title: "Donation", description: "Safe and comfortable blood donation process" },
      { icon: Coffee, title: "Recovery", description: "Short rest and refreshments after donation" },
    ];

    return (
      <section className="bg-gray-100 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Donation Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <div className="bg-red-600 text-white rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
                  <step.icon size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Testimonials = () => {
    const testimonials = [
      { name: "John Doe", quote: "Donating blood was a rewarding experience. It's amazing to know I've helped save lives." },
      { name: "Jane Smith", quote: "The process was quick and easy. The staff made me feel comfortable throughout." },
      { name: "Mike Johnson", quote: "I donate regularly now. It's a simple way to make a big difference in someone's life." },
    ];

    return (
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">What Our Donors Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">"{testimonial.quote}"</p>
                <p className="text-sm sm:text-base font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const ContactInfo = () => (
    <section className="bg-red-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: Phone, title: "Phone", info: "(123) 456-7890" },
            { icon: Mail, title: "Email", info: "info@blooddonation.com" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <item.icon className="text-red-600 mr-4" size={24} />
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p>{item.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
  
  const Footer = () => (
    <footer className="bg-red-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-sm opacity-80">
              We are dedicated to saving lives through blood donation,
              connecting donors with those in need.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Donate Blood', 'Find Location', 'Contact Us'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-sm opacity-80 hover:opacity-100">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="text-sm opacity-80">Phone: (123) 456-7890</li>
              <li className="text-sm opacity-80">Email: info@blooddonation.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-red-800 text-center text-sm opacity-80">
          © 2024 Blood Donation Center. All rights reserved.
        </div>
      </div>
    </footer>
  )

  return (
    <div className="min-h-screen">
      <Header isLoggedIn={false} />
      <HeroSection />
      <DonationProcess />
      <Testimonials />
      <ContactInfo />
      <Footer />
    </div>
  )
}