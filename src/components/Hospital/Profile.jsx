"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Eye, EyeOff, FileText, Building, User, Lock, Shield, CheckCircle, AlertTriangle, Pencil, Clock, LogOut } from "lucide-react"
import Header from "../Header"

const ProfileManagement = () => {
  const [view, setView] = useState("profile")
  const [activeTab, setActiveTab] = useState("details")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const navigate = useNavigate()

  const renderProfile = () => (
    <div className="relative bg-gray-50 min-h-screen">
      {/* Hero Section with Hospital Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-900 p-8 sm:p-10 rounded-b-3xl shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-md" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-sm" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="bg-white p-1 rounded-full shadow-lg">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
              <Building className="w-12 h-12 text-red-700" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">MANILA MEDICAL CENTER</h2>
            <p className="text-red-100 mt-1 flex items-center justify-center sm:justify-start">
              <Shield className="w-4 h-4 mr-1" /> Verified Healthcare Provider
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative -mt-5">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex flex-wrap overflow-x-auto">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-5 py-4 font-medium text-sm transition-colors flex items-center ${
                activeTab === "details" 
                  ? "text-red-600 border-b-2 border-red-600 bg-red-50" 
                  : "text-gray-600 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              Hospital Details
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-5 py-4 font-medium text-sm transition-colors flex items-center ${
                activeTab === "requests" 
                  ? "text-red-600 border-b-2 border-red-600 bg-red-50" 
                  : "text-gray-600 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Request History
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === "details" ? (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Hospital Information</h3>
              <button
                onClick={() => setView("editDetails")}
                className="bg-red-50 text-red-600 hover:bg-red-100 transition-colors px-4 py-2 rounded-lg flex items-center text-sm font-medium"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit Details
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Hospital ID</div>
                  <div className="font-medium">MMC-2023</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Email Address</div>
                  <div className="font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-red-600" />
                    info@manilamedical.com
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Phone Number</div>
                  <div className="font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-red-600" />
                    +63 2 8888 9999
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">License Number</div>
                  <div className="font-medium">LN-12345-67890</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Location Address</div>
                  <div className="font-medium flex items-start">
                    <MapPin className="w-4 h-4 mr-2 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>456 Taft Avenue, Manila, Metro Manila, Philippines</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Account Status</div>
                  <div className="font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Active
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h4>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <Lock className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h5 className="font-medium">Password & Authentication</h5>
                    <p className="text-sm text-gray-500">Update your password and security settings</p>
                  </div>
                </div>
                <button
                  onClick={() => setView("editDetails")}
                  className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Blood Request History</h3>
              <div className="flex space-x-2">
                <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm">Filter</button>
                <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-sm">Export</button>
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Request #12345</h4>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> 12/05/2023
                      </div>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">Completed</span>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Blood Type</div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center mr-1.5">
                          <span className="text-xs font-bold text-white">O+</span>
                        </div>
                        <span className="font-medium">O Positive</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Quantity</div>
                      <div className="font-medium">3 units</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Source</div>
                      <div className="font-medium">RedSource Central</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Request #12346</h4>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> 19/05/2023
                      </div>
                    </div>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2.5 py-1 rounded-full">Processing</span>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Blood Type</div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center mr-1.5">
                          <span className="text-xs font-bold text-white">AB-</span>
                        </div>
                        <span className="font-medium">AB Negative</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Quantity</div>
                      <div className="font-medium">1 unit</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Source</div>
                      <div className="font-medium">City Regional</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Request #12347</h4>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> 25/05/2023
                      </div>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">Completed</span>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Blood Type</div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center mr-1.5">
                          <span className="text-xs font-bold text-white">A+</span>
                        </div>
                        <span className="font-medium">A Positive</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Quantity</div>
                      <div className="font-medium">2 units</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Source</div>
                      <div className="font-medium">Metro Network</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button className="text-red-600 hover:text-red-800 font-medium flex items-center">
                  View All Request History
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Quick Action Button */}
        <div className="mt-6 mb-8 text-center">
          <button
            onClick={() => navigate('/new-request')}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            Create New Blood Request
          </button>
        </div>
      </div>
    </div>
  )

  const renderEditDetails = () => (
    <div className="min-h-screen bg-gray-50 pt-4 sm:pt-6 pb-8 sm:pb-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 sm:p-4 flex items-center">
          <button onClick={() => setView("profile")} className="flex items-center hover:bg-red-700/50 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="font-medium text-sm sm:text-base">Back to Profile</span>
          </button>
          <h1 className="text-center flex-1 font-bold mr-8 sm:mr-12 text-base sm:text-lg">Edit Hospital Details</h1>
        </div>

        {/* Form */}
        <form className="p-4 sm:p-6">
          {/* Hospital Details Section */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-800 flex items-center">
              <Building className="mr-2 h-4 sm:h-5 w-4 sm:w-5 text-red-600" />
              Hospital Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
                <input
                  type="text"
                  defaultValue="Manila Medical Center"
                  className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-shadow"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Hospital ID</label>
                <input
                  type="text"
                  defaultValue="MMC-2023"
                  className="w-full p-2 sm:p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed text-sm"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Hospital ID cannot be changed</p>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  defaultValue="+63 2 8888 9999"
                  className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-shadow"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  defaultValue="info@manilamedical.com"
                  className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-shadow"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Location Address</label>
                <input
                  type="text"
                  defaultValue="456 Taft Avenue, Manila, Metro Manila, Philippines"
                  className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-shadow"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">License Number</label>
                <input
                  type="text"
                  defaultValue="LN-12345-67890"
                  className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-shadow"
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-800 flex items-center">
              <Lock className="mr-2 h-4 sm:h-5 w-4 sm:w-5 text-red-600" />
              Change Password
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10 text-sm transition-shadow"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showOldPassword ? (
                      <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                    ) : (
                      <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10 text-sm transition-shadow"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                    ) : (
                      <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long and include a number and special character</p>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-10 text-sm transition-shadow"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 sm:w-5 h-4 sm:h-5" />
                    ) : (
                      <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center border-t border-gray-200 pt-4 sm:pt-6">
            <button
              type="button"
              onClick={() => setView("archiveConfirmation")}
              className="mt-3 sm:mt-0 text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
            >
              <AlertTriangle className="w-4 h-4 mr-1" />
              Delete Account
            </button>

            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setView("profile")}
                className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg text-sm transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  const renderArchiveConfirmation = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col items-center text-center mb-4 sm:mb-6">
          <div className="bg-red-100 p-2 sm:p-3 rounded-full mb-3 sm:mb-4">
            <AlertTriangle className="h-6 sm:h-8 w-6 sm:w-8 text-red-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Delete Account</h3>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            This action cannot be undone. All your data will be permanently deleted.
          </p>
        </div>
        
        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Type "delete" to confirm
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-shadow"
            placeholder="Type 'delete' here"
          />
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setView("editDetails")}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={confirmText !== "delete"}
            className={`w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 font-medium rounded-lg text-sm transition-colors ${
              confirmText === "delete" 
                ? "bg-red-600 hover:bg-red-700 text-white" 
                : "bg-red-300 cursor-not-allowed text-white"
            }`}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <Header />
      {view === "profile" && renderProfile()}
      {view === "editDetails" && renderEditDetails()}
      {view === "archiveConfirmation" && renderArchiveConfirmation()}
    </div>
  )
}

export default ProfileManagement 