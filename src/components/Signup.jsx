import React, { useState } from 'react';
import { Eye, EyeOff, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Background from './Background';
import flagLogo from '../assets/Logophonenumber.png';
import LogoSignup from '../assets/LogoSignup.png';
import RefreshLink from './RefreshLink';
import { navigateWithRefresh } from '../utils/navigation';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactInformation: '',
    dateOfBirth: '',
    bloodType: '',
    profilePicture: 'profile.png'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file.name
      }));

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.bloodType) newErrors.bloodType = "Required";
    if (!formData.contactInformation.trim()) newErrors.contactInformation = "Required";
    else if (!/^\d{10}$/.test(formData.contactInformation)) newErrors.contactInformation = "10 digits required";
    if (!formData.password.trim()) newErrors.password = "Required";
    else if (formData.password.length < 8) newErrors.password = "Min 8 characters";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log("Form submitted:", formData);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigateWithRefresh('/login');
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Background>
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
        <div className="mb-4">
          <RefreshLink to="/homepage">
            <img 
              src={LogoSignup} 
              alt="BloodBank Logo" 
              className="w-20 h-20 cursor-pointer hover:opacity-80 transition-opacity" 
            />
          </RefreshLink>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Picture Upload */}
            <div className="md:col-span-2 flex flex-col items-center justify-center mb-4">
              <label className="block text-gray-700 text-xs font-medium mb-2">
                Profile Picture
              </label>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 mb-2">
                  {previewImage ? (
                    <img src={previewImage} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">No image</span>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer flex items-center justify-center px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-300 transition-colors duration-300">
                  <Upload size={14} className="mr-1" />
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.profilePicture !== 'profile.png' ? formData.profilePicture : 'Default profile.png'}
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-gray-700 text-xs font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-sm`}
                placeholder="Full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 text-xs font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-sm`}
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="bloodType" className="block text-gray-700 text-xs font-medium mb-1">
                Blood Type
              </label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg border ${errors.bloodType ? 'border-red-500' : 'border-gray-300'} text-sm`}
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
              {errors.bloodType && <p className="text-red-500 text-xs mt-1">{errors.bloodType}</p>}
            </div>

            <div>
              <label htmlFor="contactInformation" className="block text-gray-700 text-xs font-medium mb-1">
                Contact Number
              </label>
              <div className="flex">
                <div className="bg-white p-2 rounded-l-lg border border-r-0 border-gray-300 flex items-center">
                  <img src={flagLogo} alt="Philippines flag" className="w-4 h-3 mr-1" />
                  <span className="text-gray-800 text-xs">+63</span>
                </div>
                <input
                  type="tel"
                  id="contactInformation"
                  name="contactInformation"
                  value={formData.contactInformation}
                  onChange={handleChange}
                  className={`flex-1 p-2 rounded-r-lg border ${errors.contactInformation ? 'border-red-500' : 'border-gray-300'} text-sm`}
                  placeholder="Phone number"
                  maxLength={10}
                />
              </div>
              {errors.contactInformation && <p className="text-red-500 text-xs mt-1">{errors.contactInformation}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 text-xs font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-sm pr-10`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-gray-700 text-xs font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full p-2 rounded-lg border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} text-sm`}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <button
              type="submit"
              className="w-auto px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-semibold hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              REGISTER
            </button>

            <p className="mt-4 text-xs text-gray-600">
              Already have an account?{' '}
              <RefreshLink
                to="/login"
                className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Login here
              </RefreshLink>
            </p>
          </div>
        </form>
      </div>
    </Background>
  );
}