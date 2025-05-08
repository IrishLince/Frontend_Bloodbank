"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CheckCircle, ChevronLeft, Calendar, Clock, Droplet, Building, Package, Info } from "lucide-react"
import Header from "../Header"

export default function SuccessfulRequest() {
  const location = useLocation()
  const navigate = useNavigate()
  const [requestData, setRequestData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if we have data from the previous page
    if (location.state) {
      setRequestData(location.state)
      setLoading(false)
    } else {
      // If no data, redirect back to the request page
      navigate("/new-request")
    }
  }, [location, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#FFF5F5]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C91C1C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading request details...</p>
        </div>
      </div>
    )
  }

  // Format dates for display
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Generate a random request ID
  const requestId = `REQ-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`

  return (
    <div className="bg-gradient-to-b from-white to-[#FFF5F5] flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-6">
        <Link to="/welcome-message" className="inline-flex">
          <button className="flex items-center text-[#C91C1C] hover:text-[#A81A1A] transition-colors text-sm font-medium bg-white rounded-full py-2 px-4 shadow-sm">
            <ChevronLeft className="mr-1 w-4 h-4" /> BACK TO DASHBOARD
          </button>
        </Link>

        <div className="flex flex-col items-center justify-center my-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Request Submitted Successfully!</h1>
          <p className="text-gray-600 max-w-md">
            Your blood request has been submitted and is being processed. You will receive updates on your dashboard.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-[#FFD6D6] max-w-3xl mx-auto">
          <div className="bg-[#C91C1C] text-white py-4 px-6">
            <h2 className="text-xl font-semibold">Request Summary</h2>
            <p className="text-sm opacity-75">Request ID: {requestId}</p>
          </div>

          <div className="p-6">
            <div className="grid gap-6">
              <div className="flex items-center p-4 bg-[#FFF5F5] rounded-lg">
                <Building className="w-5 h-5 text-[#C91C1C] mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Blood Source</p>
                  <p className="font-medium">{requestData.bloodSource}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-[#FFF5F5] rounded-lg">
                  <Calendar className="w-5 h-5 text-[#C91C1C] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Request Date</p>
                    <p className="font-medium">{formatDate(requestData.requestDate)}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-[#FFF5F5] rounded-lg">
                  <Clock className="w-5 h-5 text-[#C91C1C] mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Date Needed</p>
                    <p className="font-medium">{formatDate(requestData.dateNeeded)}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-700 mb-3">Blood Units Requested</h3>

                <div className="space-y-3">
                  {requestData.bloodRequests ? (
                    // Multiple blood requests
                    requestData.bloodRequests.map(
                      (request, index) =>
                        request.bloodType && (
                          <div key={index} className="flex items-center justify-between p-3 bg-[#FFF5F5] rounded-lg">
                            <div className="flex items-center">
                              <Droplet className="w-5 h-5 text-[#C91C1C] mr-3" />
                              <div>
                                <p className="font-medium">{request.bloodType}</p>
                                <p className="text-sm text-gray-500">Blood Type</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Package className="w-5 h-5 text-[#C91C1C] mr-3" />
                              <div>
                                <p className="font-medium">{request.unitsRequested} units</p>
                                <p className="text-sm text-gray-500">Quantity</p>
                              </div>
                            </div>
                          </div>
                        ),
                    )
                  ) : (
                    // Legacy single blood request
                    <div className="flex items-center justify-between p-3 bg-[#FFF5F5] rounded-lg">
                      <div className="flex items-center">
                        <Droplet className="w-5 h-5 text-[#C91C1C] mr-3" />
                        <div>
                          <p className="font-medium">{requestData.bloodType}</p>
                          <p className="text-sm text-gray-500">Blood Type</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Package className="w-5 h-5 text-[#C91C1C] mr-3" />
                        <div>
                          <p className="font-medium">{requestData.unitsRequested} units</p>
                          <p className="text-sm text-gray-500">Quantity</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 text-sm">
                <p className="flex items-start">
                  <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    You will receive a confirmation email shortly. Please check your dashboard for updates on your
                    request status.
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Link to="/welcome-message">
                <button className="bg-[#C91C1C] hover:bg-[#A81A1A] text-white py-3 px-8 rounded-lg font-semibold transition-colors shadow-md">
                  RETURN TO DASHBOARD
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
