"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Eye, EyeOff, Gift } from "lucide-react"
import Header from "../Header"
import RewardsSystem from "./RewardsSystem"

const ProfileManagement = () => {
  const [view, setView] = useState("profile")
  const [activeTab, setActiveTab] = useState("details")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const navigate = useNavigate()

  const renderProfile = () => (
    <div className="relative">
      <div className="bg-[#C91C1C] p-8 rounded-b-[4rem] relative">
        <div className="flex items-center gap-6">
          <img
            src="/path-to-user-avatar.png"
            alt="Daniel Padilla"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          <h2 className="text-4xl font-bold text-white">DANIEL PADILLA</h2>
        </div>
      </div>

      <div className="mt-6 px-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 font-medium ${
              activeTab === "details" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`px-4 py-2 font-medium flex items-center ${
              activeTab === "rewards" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Gift className="w-4 h-4 mr-2" />
            Rewards
          </button>
        </div>
      </div>

      {activeTab === "details" ? (
        <div className="px-8 py-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          <div className="empty-box"></div>
          <div className="empty-box"></div>
          <div className="empty-box"></div>
          <div className="empty-box"></div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="shrink-0 text-[#C91C1C]" />
            <span className="text-sm">donor@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="shrink-0 text-[#C91C1C]" />
            <span className="text-sm">+63 987 654 3210</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-[#C91C1C]" />
            <span className="text-sm">123 Quezon Ave., Manila, Metro Manila, Philippines</span>
          </div>
          <button
            onClick={() => setView("editDetails")}
            className="text-sm text-[#C91C1C] hover:text-[#C91C1C]/80 flex items-center gap-1"
          >
            Edit Details
          </button>
        </div>
      ) : (
        <div className="px-8 py-6">
          <RewardsSystem />
        </div>
      )}

      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 right-24 w-24 h-24 bg-white/10 rounded-full translate-y-1/2" />
        <div className="absolute top-1/2 right-12 w-16 h-16 bg-white/10 rounded-full" />
      </div>
    </div>
  )

  const renderEditDetails = () => (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full mx-auto bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="bg-[#C91C1C] text-white p-2 flex items-center rounded-t-lg">
          <button onClick={() => setView("profile")} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>BACK</span>
          </button>
          <h1 className="text-center flex-1 font-medium mr-8">Edit Details</h1>
        </div>

        {/* Form */}
        <form className="p-4">
          {/* Personal Details Section */}
          <div className="mb-4">
            <h2 className="text-base font-medium mb-2">Personal Details</h2>

            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  defaultValue="Daniel Padilla"
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#C91C1C] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  defaultValue="Donor"
                  className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed text-sm"
                  disabled
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Contact Number</label>
                <input
                  type="tel"
                  defaultValue="+63 987 654 3210"
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#C91C1C] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="danielpadilla@gmail.com"
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#C91C1C] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Location Address</label>
                <input
                  type="text"
                  defaultValue="123 Quezon Ave., Manila, Metro Manila, Philippines"
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#C91C1C] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Date of Birth</label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="26/04/1995"
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#C91C1C] focus:border-transparent pr-8 text-sm"
                  />
                  <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="mb-4">
            <h2 className="text-base font-medium mb-2">Password</h2>

            <div className="space-y-2">
              <div className="relative">
                <label className="block text-xs text-gray-600 mb-1">Old password</label>
                <input
                  type={showOldPassword ? "text" : "password"}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#C91C1C] focus:border-transparent pr-8 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-2 top-[22px]"
                >
                  {showOldPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="relative">
                <label className="block text-xs text-gray-600 mb-1">New password</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#C91C1C] focus:border-transparent pr-8 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-[22px]"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="relative">
                <label className="block text-xs text-gray-600 mb-1">Confirm new password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-[#C91C1C] focus:border-transparent pr-8 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-[22px]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-2">
            <button
              type="button"
              onClick={() => setView("profile")}
              className="px-6 py-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-1.5 bg-[#C91C1C] text-white rounded-md hover:bg-[#C91C1C]/90 text-sm"
            >
              Save
            </button>
          </div>

          {/* Archive Account */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setView("archiveConfirmation")}
              className="px-4 py-2 text-xs text-white bg-gray-500 rounded-md hover:bg-gray-600 transition-colors duration-200"
            >
              Archive Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  const renderArchiveConfirmation = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center mb-6">
          <button onClick={() => setView("editDetails")} className="flex items-center text-[#880000]">
            <ArrowLeft className="mr-2" />
            <span>BACK</span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img src="/path-to-user-avatar.png" alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold mb-6">DANIEL PADILLA</h2>
          <button
            onClick={() => setView("archiveConfirmationInput")}
            className="w-full bg-[#880000] text-white rounded-md py-3 font-medium hover:bg-red-700"
          >
            I WANT TO ARCHIVE THIS ACCOUNT
          </button>
        </div>
      </div>
    </div>
  )

  const renderArchiveConfirmationInput = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center mb-6">
          <button onClick={() => setView("archiveConfirmation")} className="flex items-center text-[#880000]">
            <ArrowLeft className="mr-2" />
            <span>BACK</span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img src="/path-to-user-avatar.png" alt="" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold mb-6">DANIEL PADILLA</h2>
          <p className="text-center mb-4">To confirm, type "DANIEL PADILLA" in the box below</p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            placeholder="Type here"
          />
          <button
            onClick={() => {
              if (confirmText === "DANIEL PADILLA") {
                alert("Account archived successfully")
                setView("profile")
              } else {
                alert("Please type your name exactly as shown above")
              }
            }}
            disabled={confirmText !== "DANIEL PADILLA"}
            className="w-full bg-[#880000] text-white rounded-md py-3 font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ARCHIVE THIS ACCOUNT
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 bg-white">
        {view === "profile" && renderProfile()}
        {view === "editDetails" && renderEditDetails()}
        {view === "archiveConfirmation" && renderArchiveConfirmation()}
        {view === "archiveConfirmationInput" && renderArchiveConfirmationInput()}
      </main>
    </div>
  )
}

export default ProfileManagement 