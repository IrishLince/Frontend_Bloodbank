'use client'

import React, { useState } from 'react'
import { ChevronDown, Calendar, MapPin, Users, Phone, Mail, Clock, Coffee } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function Component() {
  const navigate = useNavigate();

  const Header = () => (
    <header className="bg-red-600 shadow-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-white rounded-full"/>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/contact" className="text-white hover:text-red-100">Contact Us</a>
            <a href="/faqs" className="text-white hover:text-red-100">FAQs</a>
            <a href="/signup" className="px-4 py-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors">
              Sign Up
            </a>
            <a href="/login" className="px-4 py-2 bg-red-700 text-white rounded-full hover:bg-red-800 transition-colors">
              Log In
            </a>
          </div>
        </div>
      </div>
    </header>
  )


  const HeroSection = () => (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-90" />
      <div className="relative max-w-5xl mx-auto px-6 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Donate Blood, Save Lives</h1>
          <p className="text-lg md:text-xl mb-6">
            When you donate blood, you're not just donating a pint;
            you're giving someone a chance to live,
            recover, and continue to make memories.
          </p>
          <p className="text-xl md:text-2xl font-semibold mb-8">
            It's a gift that lasts a lifetime.
          </p>
          <button className="bg-white text-red-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-50">
            DONATE NOW
          </button>
        </div>
      </div>
    </div>
  )

  const ActionButtons = () => (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Learn More', 'Check History', 'Find Blood Drive'].map((text, index) => (
            <button 
              key={index} 
              className="bg-red-800 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700"
              onClick={() => navigate('/signup')} // Redirects to signup.jsx
            >
              {text}
            </button>
          ))}
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
    ]

    return (
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Donation Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-red-600 text-white rounded-full p-4 mb-4">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const Testimonials = () => {
    const testimonials = [
      { name: "John Doe", quote: "Donating blood was a rewarding experience. It's amazing to know I've helped save lives." },
      { name: "Jane Smith", quote: "The process was quick and easy. The staff made me feel comfortable throughout." },
      { name: "Mike Johnson", quote: "I donate regularly now. It's a simple way to make a big difference in someone's life." },
    ]

    return (
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Donors Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const ContactInfo = () => (
    <section className="bg-red-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Phone, title: "Phone", info: "(123) 456-7890" },
            { icon: Mail, title: "Email", info: "info@blooddonation.com" },
            { icon: MapPin, title: "Address", info: "123 Medical Center Dr." },
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <li className="text-sm opacity-80">Address: 123 Medical Center Dr.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-red-800 text-white placeholder-red-300 flex-1"
              />
              <button className="px-4 py-2 bg-white text-red-800 rounded-full hover:bg-red-100">
                Subscribe
              </button>
            </div>
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
      <Header />
      <HeroSection />
      <ActionButtons />
      <DonationProcess />
      <Testimonials />
      <ContactInfo />
      <Footer />
    </div>
  )
}