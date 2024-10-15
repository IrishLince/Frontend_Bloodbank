import React from "react";
import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiMail } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";

export const Signup = () => {
  return (
    <div className="max-w-md mx-auto p-6 ">
      <div className="text-center py-4">
        <h1 className="text-5xl font-semibold">Welcome</h1>
        <p className="font-light  text-lg mt-2">
        We are glad to see you join us in our blood bank management system.
        </p>
      </div>
      <form className="space-y-4">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
          <CiUser className="text-xl text-gray-500" />
          <input
            className="bg-transparent w-full outline-none"
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
          <CiMail className="text-xl text-gray-500" />
          <input
            className="bg-transparent w-full outline-none"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
          <CiUser className="text-xl text-gray-500" />
          <input
            className="bg-transparent w-full outline-none"
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
          <RiLockPasswordLine className="text-xl text-gray-500" />
          <input
            className="bg-transparent w-full outline-none"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
          <RiLockPasswordLine className="text-xl text-gray-500" />
          <input
            className="bg-transparent w-full outline-none"
            type="password"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
          <CiCalendar className="text-xl text-gray-500" />
          <input
            className="bg-transparent w-full outline-none"
            type="date"
            placeholder="Date of Birth"
            required
          />
        </div>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
          <CiPhone className="text-xl text-gray-500" />
          <input
          minLength={0}
          maxLength={11}
            className="bg-transparent w-full outline-none"
            type="tel"
            placeholder="Contact Number"
            required
          />
        </div>
        <button className="bg-black text-white rounded-lg w-full p-2 mt-6 hover:bg-gray-800 transition-colors">
          Sign Up
        </button>
      </form>
    </div>
  );
};
