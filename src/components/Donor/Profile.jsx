"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Eye, EyeOff, Gift, User, Shield, ChevronRight, X } from "lucide-react"
import Header from "../Header"
import RewardsSystem from "./RewardsSystem"
import DonationHistory from "./DonationHistory"

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState("details")
  const [showEditModal, setShowEditModal] = useState(false)
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [showArchiveConfirmModal, setShowArchiveConfirmModal] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const navigate = useNavigate()

  const renderEditProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[90vh] w-full max-w-2xl">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#C91C1C] to-[#FF5757] text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="font-medium text-xl">Edit Profile</h1>
          <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form className="p-4 md:p-6">
          {/* Personal Details Section */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
              <User className="w-5 h-5 mr-2 text-[#C91C1C]" />
              Personal Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Name</label>
                <input
                  type="text"
                  defaultValue="Daniel Padilla"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent text-sm shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Username</label>
                <input
                  type="text"
                  defaultValue="Donor"
                  className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed text-sm shadow-sm"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Contact Number</label>
                <input
                  type="tel"
                  defaultValue="+63 987 654 3210"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent text-sm shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  defaultValue="danielpadilla@gmail.com"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent text-sm shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Location Address</label>
                <input
                  type="text"
                  defaultValue="123 Quezon Ave., Manila, Metro Manila, Philippines"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent text-sm shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1 font-medium">Date of Birth</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="26/04/1995"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent pr-10 text-sm shadow-sm"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4 text-gray-800 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-[#C91C1C]" />
              Security
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1 font-medium">Old password</label>
                <input
                  type={showOldPassword ? "text" : "password"}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent pr-10 text-sm shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-[30px]"
                >
                  {showOldPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1 font-medium">New password</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent pr-10 text-sm shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-[30px]"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm text-gray-600 mb-1 font-medium">Confirm new password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent pr-10 text-sm shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[30px]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium shadow-sm hover:shadow transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setShowEditModal(false);
                // Would handle save here in a real app
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-[#C91C1C] to-[#FF5757] text-white rounded-lg hover:from-[#B91818] hover:to-[#E54545] font-medium shadow-sm hover:shadow-md transition-all"
            >
              Save Changes
            </button>
          </div>

          {/* Archive Account */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setShowEditModal(false);
                setShowArchiveModal(true);
              }}
              className="px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Archive Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  const renderArchiveConfirmation = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-5 md:p-8 w-full max-w-md mx-auto shadow-xl">
        <div className="flex items-center mb-6">
          <button onClick={() => setShowArchiveModal(false)} className="flex items-center text-[#C91C1C] hover:bg-red-50 p-2 rounded-lg transition-colors">
            <ArrowLeft className="mr-1 w-5 h-5" />
            <span>BACK</span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-red-100 shadow-md">
            <img src="/path-to-user-avatar.png" alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">DANIEL PADILLA</h2>
          <p className="text-gray-600 mb-6 text-center">Are you sure you want to archive your account? This action will hide your profile but preserve your data.</p>
          <button
            onClick={() => {
              setShowArchiveModal(false);
              setShowArchiveConfirmModal(true);
            }}
            className="w-full bg-gradient-to-r from-[#880000] to-[#C91C1C] text-white rounded-lg py-3 font-medium hover:from-[#770000] hover:to-[#B91818] shadow-md hover:shadow-lg transition-all"
          >
            I WANT TO ARCHIVE THIS ACCOUNT
          </button>
        </div>
      </div>
    </div>
  )

  const renderArchiveConfirmationInput = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-5 md:p-8 w-full max-w-md mx-auto shadow-xl">
        <div className="flex items-center mb-6">
          <button onClick={() => {
            setShowArchiveConfirmModal(false);
            setShowArchiveModal(true);
          }} className="flex items-center text-[#C91C1C] hover:bg-red-50 p-2 rounded-lg transition-colors">
            <ArrowLeft className="mr-1 w-5 h-5" />
            <span>BACK</span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-red-100 shadow-md">
            <img src="/path-to-user-avatar.png" alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">DANIEL PADILLA</h2>
          <div className="w-full bg-red-50 p-4 rounded-lg mb-6">
            <p className="text-center text-gray-800 mb-2">To confirm, type "DANIEL PADILLA" in the box below</p>
            <p className="text-xs text-red-600 text-center">This action cannot be undone easily</p>
          </div>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:ring-2 focus:ring-[#C91C1C] focus:border-transparent shadow-sm"
            placeholder="Type your full name here"
          />
          <button
            onClick={() => {
              if (confirmText === "DANIEL PADILLA") {
                alert("Account archived successfully")
                setShowArchiveConfirmModal(false);
              } else {
                alert("Please type your name exactly as shown above")
              }
            }}
            disabled={confirmText !== "DANIEL PADILLA"}
            className="w-full bg-gradient-to-r from-[#880000] to-[#C91C1C] text-white rounded-lg py-3 font-medium hover:from-[#770000] hover:to-[#B91818] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
          >
            ARCHIVE THIS ACCOUNT
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFEBEB] to-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-full h-64 bg-[#C91C1C] rounded-b-[30%] opacity-5" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#C91C1C] rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C91C1C] rounded-full blur-3xl opacity-5 translate-x-1/2 translate-y-1/2" />
          
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#C91C1C] to-[#FF5757] p-6 md:p-10 rounded-b-[2rem] md:rounded-b-[3rem] relative shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img
                    src="/path-to-user-avatar.png"
                    alt="Daniel Padilla"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                  <div className="bg-green-500 w-4 h-4 rounded-full"></div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-white">DANIEL PADILLA</h2>
                <span className="inline-block mt-2 bg-white/20 text-white px-3 py-1 rounded-full text-xs md:text-sm">
                  Active Donor since 2020
                </span>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 right-24 w-24 h-24 bg-white/10 rounded-full translate-y-1/2" />
            <div className="absolute top-1/2 right-12 w-16 h-16 bg-white/10 rounded-full" />
          </div>

          {/* Tabs Navigation */}
          <div className="mt-8 px-4 md:px-8">
            <div className="flex flex-wrap md:flex-nowrap overflow-x-auto justify-start border-b border-gray-200 pb-1 gap-1 no-scrollbar">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-3 md:px-5 py-2 md:py-3 font-medium flex items-center whitespace-nowrap ${
                  activeTab === "details" 
                    ? "text-red-600 border-b-2 border-red-600" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg"
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Personal Details
              </button>
              <button
                onClick={() => setActiveTab("rewards")}
                className={`px-3 md:px-5 py-2 md:py-3 font-medium flex items-center whitespace-nowrap ${
                  activeTab === "rewards" 
                    ? "text-red-600 border-b-2 border-red-600" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg"
                }`}
              >
                <Gift className="w-4 h-4 mr-2" />
                Rewards
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-3 md:px-5 py-2 md:py-3 font-medium flex items-center whitespace-nowrap ${
                  activeTab === "history" 
                    ? "text-red-600 border-b-2 border-red-600" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg"
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Donation History
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "details" ? (
            <div className="px-4 md:px-8 py-4 md:py-6">
              <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Personal Information</h3>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-[#C91C1C] to-[#FF5757] text-white rounded-full flex items-center font-medium text-sm hover:from-[#B91818] hover:to-[#E54545] transition-all shadow hover:shadow-md"
                  >
                    Edit Profile
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 md:gap-x-12">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <div className="flex items-center gap-2">
                      <Mail size={18} className="shrink-0 text-[#C91C1C]" />
                      <span>donor@gmail.com</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                    <div className="flex items-center gap-2">
                      <Phone size={18} className="shrink-0 text-[#C91C1C]" />
                      <span>+63 987 654 3210</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-sm text-gray-500 font-medium">Address</p>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="shrink-0 text-[#C91C1C]" />
                      <span>123 Quezon Ave., Manila, Metro Manila, Philippines</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 font-medium">Date of Birth</p>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="shrink-0 text-[#C91C1C]" />
                      <span>April 26, 1995</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 font-medium">Blood Type</p>
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 bg-red-100 w-6 h-6 rounded-full flex items-center justify-center text-[#C91C1C] font-bold">A+</span>
                      <span>Type A Positive</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield size={18} className="text-[#C91C1C]" />
                    <span className="text-sm">Your personal information is secure and will only be used for donation purposes.</span>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === "rewards" ? (
            <div className="px-8 py-6">
              <RewardsSystem />
            </div>
          ) : (
            <div className="px-8 py-6">
              <DonationHistory />
            </div>
          )}
        </div>
      </main>
      
      {/* Modals */}
      {showEditModal && renderEditProfileModal()}
      {showArchiveModal && renderArchiveConfirmation()}
      {showArchiveConfirmModal && renderArchiveConfirmationInput()}
    </div>
  )
}

export default ProfileManagement 