import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import backgroundImage from '../assets/cover.png'
import flagLogo from '../assets/Logophonenumber.png'
import LogoSignup from '../assets/LogoSignup.png'

export default function Signup({ setIsLogin }: { setIsLogin: (value: boolean) => void }) {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    bloodGroup: '',
    phoneNumber: '',
    password: '',
    dateOfBirth: '',
    gender: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Handle form submission
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div 
      className="min-h-screen w-full bg-cover justify-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex items-center justify-center">
        <img src={LogoSignup} alt="BloodBank Logo" className="mx-auto w-32 h-32 mt-5" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-black text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border shadow-lg border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Full name"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-black text-sm font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border shadow-lg border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="123 Quezon Ave., Manila, Metro Manila, Philippines"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-black text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border shadow-lg border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label htmlFor="bloodGroup" className="block text-black text-sm font-medium mb-1">
                Blood Group
              </label>
              <div className="relative">
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border shadow-lg border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none appearance-none"
                >
                  <option value="">SELECT</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-black text-sm font-medium mb-1">
                Contact Number
              </label>
              <div className="flex">
                <div className="bg-white p-3 rounded-l-lg border border-r-0 border-gray-300 flex items-center">
                  <img src={flagLogo} alt="Philippines flag" className="w-6 h-4 mr-2" />
                  <span className="text-gray-800">+63</span>
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="flex-1 p-3 rounded-r-lg border shadow-lg border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder=""
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-black text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border shadow-lg border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none pr-10"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-black text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border shadow-lg border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="26/04/1995"
              />
            </div>

            {/* Sex */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm font-medium text-black">Sex:</span>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                      className="form-radio text-red-600 focus:ring-red-500 h-4 w-4"
                    />
                    <span className="ml-2 text-black">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                      className="form-radio text-red-600 focus:ring-red-500 h-4 w-4"
                    />
                    <span className="ml-2 text-black">Female</span>
                  </label>
                </div>
              </div>
            </div>
            {/* Buttons - spanning full width */}
            <div className="col-span-full">
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="bg-red-600 text-white px-6 py-1.5 rounded-full text-xs font-medium 
                  hover:bg-red-700 transition-colors duration-200 w-24"
              >
                Return
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-1.5 rounded-full text-xs font-medium 
                  hover:bg-red-700 transition-colors duration-200 w-24"
              >
                REGISTER
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}