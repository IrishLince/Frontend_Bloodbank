'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Heart } from 'lucide-react';
import Header from './Header';

export default function BloodDonationWebsite() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(2);
 

  const teamMembers = [
    { name: 'Dr. Sarah Chen', role: 'Medical Director', image: 'https://i.pravatar.cc/300?img=1' },
    { name: 'James Wilson', role: 'Operations Manager', image: 'https://i.pravatar.cc/300?img=2' },
    { name: 'Dr. Maria Rodriguez', role: 'Blood Bank Specialist', image: 'https://i.pravatar.cc/300?img=3' },
    { name: 'David Kumar', role: 'Community Outreach', image: 'https://i.pravatar.cc/300?img=4' },
    { name: 'Emma Thompson', role: 'Donor Relations', image: 'https://i.pravatar.cc/300?img=5' },
  ];

  const nextTeamSlide = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const prevTeamSlide = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  useEffect(() => {
    const handleResize = () => {};
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-17">
        {/* Hero Section */}
        <div className="relative h-64 sm:h-96 bg-red-100 mb-16">
          <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-red-800">About Us</h1>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-300 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Who We Are Section */}
        <section className="bg-white px-6 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red-800">Who We Are</h2>
              <p className="text-sm sm:text-base text-gray-700">
                At <span className="text-red-600 font-semibold">RedSource</span>, our passion lies in saving lives through the power of generosity and community...
              </p>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red-800">Our Mission and Impact</h2>
              <p className="text-sm sm:text-base text-gray-700">
                At the heart of <span className="text-red-600 font-semibold">RedSource</span> is a profound commitment to saving lives...
              </p>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="bg-red-900 text-white py-12 sm:py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6">Join Us In Saving Lives!</h2>
            <p className="text-base sm:text-xl mb-12">
              You have the power to save lives. Whether you're a first-time donor or a seasoned supporter, there's always a way to help.
            </p>
            
            <div className="space-y-6 text-left max-w-2xl mx-auto">
              {['Donate Blood', 'Volunteer Your Time', 'Spread the Word'].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-red-300 mt-1.5">•</span>
                  <div>
                    <h3 className="font-semibold mb-1">{item}:</h3>
                    <p className="text-sm sm:text-base">{item === 'Donate Blood' 
                      ? 'It only takes a few minutes to make a lifetime of difference. We ensure the donation process is comfortable, safe, and rewarding.'
                      : item === 'Volunteer Your Time'
                      ? 'Join our team of dedicated volunteers who help with drives, donor support, and community outreach.'
                      : 'Be an advocate for life. Encourage your friends and family to join the cause and make blood donation a habit.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Information Sections */}
        <section className="bg-red-50 px-6 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Why Blood Donation Matters */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex-1 max-w-xl">
                <h2 className="text-xl sm:text-2xl font-bold text-red-800 mb-4">
                  Why Blood Donation Matters
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-gray-600">
                  <p>
                    Every two seconds, someone needs blood—whether for emergencies, surgeries, or chronic illnesses. Blood cannot be manufactured, making donors like you essential.
                  </p>
                  <p>
                    A single donation can save up to three lives, offering hope and healing to patients and their families. At <span className="text-red-600 font-semibold">RedSource</span>, we ensure every donation is safe, simple, and rewarding.
                  </p>
                </div>
              </div>
              <div className="relative w-full md:w-auto">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Blood donation process"
                  className="w-full md:w-[200px] h-[200px] rounded-full object-cover"
                />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-200 rounded-full" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-200 rounded-full" />
              </div>
            </div>

            {/* Our Commitment to Safety */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="relative order-2 md:order-first w-full md:w-auto">
                <div className="w-full md:w-[200px] h-[200px] rounded-full bg-red-100"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-200 rounded-full" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-200 rounded-full" />
              </div>
              <div className="flex-1 max-w-xl order-1 md:order-last">
                <h2 className="text-xl sm:text-2xl font-bold text-red-800 mb-4">
                  Our Commitment to Safety
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Your safety is our top priority. At <span className="text-red-600 font-semibold">RedSource</span>, we adhere to the highest medical and ethical standards to ensure a safe and comfortable donation process. From sterile equipment to trained professionals, every step of your journey is designed to provide peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="bg-red-900 py-16 px-4 relative overflow-x-hidden">
          <div className="max-w-[90vw] md:max-w-6xl mx-auto px-2 sm:px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">Our Team</h2>
            <div className="relative">
              {/* Large red circle */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500 rounded-full opacity-20 blur-3xl"></div>
              {/* Small pink circle */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>

              <div className="flex justify-center items-center gap-2 sm:gap-0 -mx-2 sm:mx-0">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-300 ${
                      index === currentTeamIndex
                        ? 'scale-100 opacity-100 w-[280px] sm:w-64'
                        : index === (currentTeamIndex + 1) % teamMembers.length || index === (currentTeamIndex - 1 + teamMembers.length) % teamMembers.length
                        ? 'scale-75 opacity-60 hidden sm:block'
                        : 'hidden sm:block scale-50 opacity-30'
                    }`}
                  >
                    <div className="bg-red-800 rounded-lg overflow-hidden shadow-lg w-full sm:w-64">
                      <div className="h-48 sm:h-64 bg-red-700 flex justify-center items-center">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-white"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-bold text-xl text-white">{member.name}</h3>
                        <p className="text-red-200">{member.role}</p>
                        <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevTeamSlide}
                className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Previous team member"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={nextTeamSlide}
                className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Next team member"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="flex justify-center mt-8">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 mx-1 rounded-full ${
                    index === currentTeamIndex ? 'bg-white' : 'bg-red-600'
                  }`}
                  onClick={() => setCurrentTeamIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-red-50 py-12 sm:py-16 px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-red-800">Contact Us!</h2>
            <p className="mb-8 text-sm sm:text-base">Together, we can create a legacy of kindness and care that transforms lives.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Phone, title: 'Phone Number', content: '(555) 123-4567' },
                { icon: Mail, title: 'Email Address', content: 'info@bloodbank.com' },
                { icon: MapPin, title: 'Location', content: '123 Medical Avenue' }
              ].map(({ icon: Icon, title, content }) => (
                <div key={title} className="flex flex-col items-center">
                  <Icon className="w-6 h-6 mb-2 text-red-600" />
                  <h3 className="font-bold text-red-800">{title}</h3>
                  <p className="text-sm sm:text-base">{content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}