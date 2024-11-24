import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import Header from '../Header'

export default function DonationCenter() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  
  const hospitals = [
    {
      name: "St. Mary's General Hospital",
      location: "123 Maple St., Cityville",
      phone: "(555) 123-4567",
      hours: "10:00 AM - 4:00 PM",
      bloodTypes: "O+, A+, B-"
    },
    {
      name: "Riverside Community Medical Center",
      location: "456 River Ave., Townsville",
      phone: "(555) 987-6543",
      hours: "8:30 AM - 5:30 PM",
      bloodTypes: "AB+, O-"
    },
    // ... other hospitals
  ]

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.bloodTypes.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [hospitals, searchTerm])

  const handleHospitalSelect = (hospital) => {
    navigate('/schedule', { state: { selectedHospital: hospital } })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-[1920px] mx-auto px-6 py-8">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Select Donation Center"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 py-2 px-8 bg-gray-100 text-xl font-bold text-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 placeholder-opacity-75"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-sm text-gray-600">
                <th className="text-left p-4">Blood Bank</th>
                <th className="text-left p-4">Location</th>
                <th className="text-left p-4">Contact Number</th>
                <th className="text-left p-4">Available Time Slots</th>
                <th className="text-left p-4">Blood Types Needed</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitals.map((hospital, index) => (
                <tr 
                  key={index}
                  onClick={() => handleHospitalSelect(hospital)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">{hospital.name}</td>
                  <td className="p-4">{hospital.location}</td>
                  <td className="p-4">{hospital.phone}</td>
                  <td className="p-4">{hospital.hours}</td>
                  <td className="p-4">{hospital.bloodTypes}</td>
                  <td className="p-4">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <div className="max-w-[1920px] mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/booking" className="flex items-center text-gray-600">
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-2">BACK</span>
        </Link>
        <button className="flex items-center text-gray-600">
          <span className="mr-2">CONFIRM</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
