"use client"

import { useState } from "react"
import { Gift, Award, Clock, ChevronRight, Check, AlertCircle, X, Download, TrendingUp } from "lucide-react"

const RewardsSystem = () => {
  const [activeTab, setActiveTab] = useState("available")
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [redeemSuccess, setRedeemSuccess] = useState(false)

  // Mock data - in a real app, this would come from an API
  const userPoints = 350
  const pointsHistory = [
    { id: 1, event: "Blood Donation", points: 100, date: "Apr 15, 2024" },
    { id: 2, event: "Blood Donation", points: 100, date: "Feb 20, 2024" },
    { id: 3, event: "Referral Bonus", points: 50, date: "Feb 10, 2024" },
    { id: 4, event: "Blood Donation", points: 100, date: "Dec 05, 2023" },
  ]

  const availableRewards = [
    {
      id: 1,
      title: "Free Health Check-up",
      description: "Comprehensive health screening at partner clinics",
      pointsCost: 300,
      image: "health-checkup",
    },
    {
      id: 2,
      title: "Gift Card",
      description: "₱500 gift card for use at partner stores",
      pointsCost: 500,
      image: "gift-card",
    },
    {
      id: 3,
      title: "Priority Booking",
      description: "Priority scheduling for your next donation",
      pointsCost: 150,
      image: "priority",
    },
    {
      id: 4,
      title: "Donation Certificate",
      description: "Personalized certificate recognizing your contributions",
      pointsCost: 100,
      image: "certificate",
    },
  ]

  const redeemedRewards = [
    {
      id: 101,
      title: "Donation Certificate",
      redeemedDate: "Jan 15, 2024",
      status: "Delivered",
    },
  ]

  const handleRedeemClick = (reward) => {
    setSelectedReward(reward)
    setShowRedeemModal(true)
  }

  const handleConfirmRedeem = () => {
    // In a real app, this would make an API call to redeem the reward
    setRedeemSuccess(true)
    setTimeout(() => {
      setRedeemSuccess(false)
      setShowRedeemModal(false)
    }, 2000)
  }

  const getRewardIcon = (imageName) => {
    switch (imageName) {
      case "health-checkup":
        return <Award className="w-8 h-8 text-red-600" />
      case "gift-card":
        return <Gift className="w-8 h-8 text-red-600" />
      case "priority":
        return <Clock className="w-8 h-8 text-red-600" />
      case "certificate":
        return <Award className="w-8 h-8 text-red-600" />
      default:
        return <Gift className="w-8 h-8 text-red-600" />
    }
  }

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-full h-32 bg-[#C91C1C] rounded-b-[30%] opacity-5" />
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#C91C1C] rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="flex items-center">
            <div className="bg-red-50 p-2 md:p-3 rounded-full mr-3 md:mr-4">
              <Gift className="w-5 h-5 md:w-6 md:h-6 text-[#C91C1C]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Rewards Center</h2>
          </div>
          
          <div className="bg-gradient-to-r from-[#C91C1C] to-[#FF5757] w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 rounded-xl flex items-center justify-between sm:justify-start shadow-md">
            <div>
              <span className="text-white/80 text-xs md:text-sm block">Points Balance</span>
              <span className="text-white font-bold text-xl md:text-2xl">{userPoints}</span>
            </div>
            <div className="ml-4 pl-4 border-l border-white/20">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-nowrap overflow-x-auto pb-1 border-b border-gray-200 mb-6 gap-1 no-scrollbar">
          <button
            className={`px-4 py-2 md:px-5 md:py-3 font-medium text-sm whitespace-nowrap rounded-t-lg transition-colors ${
              activeTab === "available" 
                ? "bg-red-50 text-red-600 border-b-2 border-red-600" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Available Rewards
          </button>
          <button
            className={`px-4 py-2 md:px-5 md:py-3 font-medium text-sm whitespace-nowrap rounded-t-lg transition-colors ${
              activeTab === "redeemed" 
                ? "bg-red-50 text-red-600 border-b-2 border-red-600" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("redeemed")}
          >
            Redeemed Rewards
          </button>
          <button
            className={`px-4 py-2 md:px-5 md:py-3 font-medium text-sm whitespace-nowrap rounded-t-lg transition-colors ${
              activeTab === "history" 
                ? "bg-red-50 text-red-600 border-b-2 border-red-600" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Points History
          </button>
        </div>

        {activeTab === "available" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {availableRewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-start gap-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-red-50 p-3 rounded-xl">{getRewardIcon(reward.image)}</div>
                <div className="flex-1 w-full">
                  <h3 className="font-semibold text-gray-800 text-base md:text-lg">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                    <span className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">
                      {reward.pointsCost} points
                    </span>
                    <button
                      onClick={() => handleRedeemClick(reward)}
                      disabled={userPoints < reward.pointsCost}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-all ${
                        userPoints >= reward.pointsCost
                          ? "bg-gradient-to-r from-[#C91C1C] to-[#FF5757] text-white hover:shadow-md"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {userPoints >= reward.pointsCost ? "Redeem" : "Not Enough Points"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "redeemed" && (
          <div className="space-y-4">
            {redeemedRewards.length > 0 ? (
              redeemedRewards.map((reward) => (
                <div key={reward.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center shadow-sm hover:shadow-md transition-all">
                  <div className="bg-green-50 p-3 rounded-xl mr-4">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{reward.title}</h3>
                    <p className="text-sm text-gray-600">Redeemed on {reward.redeemedDate}</p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-lg text-xs font-medium ${
                      reward.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {reward.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Gift className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-gray-700 font-medium text-lg">No redeemed rewards yet</h3>
                <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">
                  Redeem your points to see your rewards here. Every blood donation earns you valuable points!
                </p>
                <button 
                  onClick={() => setActiveTab("available")}
                  className="mt-4 px-5 py-2 bg-gradient-to-r from-[#C91C1C] to-[#FF5757] text-white rounded-lg text-sm font-medium hover:shadow-md">
                  Browse Available Rewards
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700">Your Points Activity</h3>
              <button className="flex items-center text-[#C91C1C] hover:text-[#A01515] text-sm font-medium">
                <Download size={14} className="mr-1" />
                Export
              </button>
            </div>
            
            <div className="overflow-x-auto -mx-4 px-4">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pointsHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-red-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.event}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium text-right">
                            +{item.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gradient-to-r from-[#FFEBEB] to-white">
                        <td colSpan="2" className="px-6 py-4 text-right text-sm font-medium text-gray-700">
                          Total Points:
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-bold text-red-600">{userPoints}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How to Earn Points Section */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-white rounded-xl p-5 shadow-sm border border-red-100">
          <h3 className="font-semibold text-red-800 mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            How to Earn More Points
          </h3>
          <ul className="space-y-3 text-sm text-gray-700 mt-3">
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Blood Donation:</span>
                <span className="ml-1">Earn 100 points for each successful blood donation</span>
              </div>
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Referrals:</span>
                <span className="ml-1">Earn 50 points when someone you refer completes their first donation</span>
              </div>
            </li>
            <li className="flex items-start">
              <ChevronRight className="w-4 h-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Milestone Bonuses:</span>
                <span className="ml-1">Earn bonus points for reaching donation milestones (5, 10, 25 donations)</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Redeem Confirmation Modal */}
        {showRedeemModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full mx-4 p-4 md:p-6 shadow-lg">
              {!redeemSuccess ? (
                <>
                  <div className="text-center mb-6">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <Gift className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Confirm Redemption</h3>
                    <p className="text-gray-600 mt-2">
                      Are you sure you want to redeem <span className="font-medium">{selectedReward?.title}</span> for{" "}
                      <span className="font-medium text-red-600">{selectedReward?.pointsCost} points</span>?
                    </p>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowRedeemModal(false)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium shadow-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmRedeem}
                      className="px-4 py-2.5 bg-gradient-to-r from-[#C91C1C] to-[#FF5757] text-white rounded-lg hover:from-[#B91818] hover:to-[#E54545] font-medium shadow-sm hover:shadow-md"
                    >
                      Confirm Redemption
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Redemption Successful!</h3>
                  <p className="text-gray-600 mt-2">Your reward has been successfully redeemed.</p>
                  <p className="text-gray-500 text-sm mt-4">You will receive further details via email shortly.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RewardsSystem
