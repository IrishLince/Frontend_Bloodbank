import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Header from '../Header'

export default function Schedule() {
  const location = useLocation()
  const navigate = useNavigate()
  const { selectedHospital } = location.state || {}
  const [date, setDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')

  const availableTimeSlots = [
    "10:00 AM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM"
  ]

  const handleConfirm = () => {
    if (selectedTime) {
      navigate('/eligibility', { 
        state: { 
          selectedHospital,
          appointmentDate: date,
          appointmentTime: selectedTime
        } 
      })
    } else {
      alert('Please select a time slot before proceeding.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1920px] mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link 
            to="/donation-center" 
            className="flex items-center text-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="ml-2">BACK</span>
          </Link>
          <button 
            onClick={handleConfirm}
            className="flex items-center text-gray-600"
          >
            <span className="mr-2">CONFIRM</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-center mb-8">
          <span className="bg-gray-100 px-8 py-2 rounded-full">
            Select Date and Time
          </span>
        </h1>

        <div className="max-w-4xl mx-auto bg-red-50 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Donation Date</h2>
              <div className="bg-white rounded-lg p-4 shadow">
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  inline
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Select Time Slot</h2>
              <div className="bg-white rounded-lg p-4 shadow">
                <p className="mb-4">Select an available time slot!</p>
                <div className="space-y-2">
                  {availableTimeSlots.map((time) => (
                    <label
                      key={time}
                      className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="timeSlot"
                        value={time}
                        checked={selectedTime === time}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="form-radio text-[#C91C1C]"
                      />
                      <span>{time}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="inline-block bg-red-100 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-600">Donation Eligibility Status:</p>
              <p className="font-semibold text-[#C91C1C]">FOR REVIEW</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}