"use client"

import { useState } from "react"
import { Gift, Award, Clock, ChevronRight, Check, AlertCircle } from "lucide-react"

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
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Rewards Center</h2>
        <div className="bg-red-100 px-4 py-2 rounded-full flex items-center">
          <span className="text-red-600 font-semibold mr-2">Points Balance:</span>
          <span className="text-red-700 font-bold text-xl">{userPoints}</span>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "available" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("available")}
        >
          Available Rewards
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "redeemed" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("redeemed")}
        >
          Redeemed Rewards
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "history" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Points History
        </button>
      </div>

      {activeTab === "available" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableRewards.map((reward) => (
            <div
              key={reward.id}
              className="border border-gray-200 rounded-lg p-4 flex items-start hover:shadow-md transition-shadow"
            >
              <div className="bg-red-50 p-3 rounded-full mr-4">{getRewardIcon(reward.image)}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{reward.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-bold">{reward.pointsCost} points</span>
                  <button
                    onClick={() => handleRedeemClick(reward)}
                    disabled={userPoints < reward.pointsCost}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userPoints >= reward.pointsCost
                        ? "bg-red-600 text-white hover:bg-red-700"
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
              <div key={reward.id} className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="bg-green-50 p-2 rounded-full mr-4">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{reward.title}</h3>
                  <p className="text-sm text-gray-600">Redeemed on {reward.redeemedDate}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    reward.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {reward.status}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Gift className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-gray-500 font-medium">No redeemed rewards yet</h3>
              <p className="text-gray-400 text-sm mt-1">Redeem your points to see your rewards here</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div className="overflow-x-auto">
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
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium text-right">
                    +{item.points}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan="2" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                  Total Points:
                </td>
                <td className="px-6 py-3 text-right text-sm font-bold text-red-600">{userPoints}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {!redeemSuccess ? (
              <>
                <div className="text-center mb-4">
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Gift className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Confirm Redemption</h3>
                  <p className="text-gray-600 mt-1">
                    Are you sure you want to redeem <span className="font-medium">{selectedReward?.title}</span> for{" "}
                    <span className="font-medium text-red-600">{selectedReward?.pointsCost} points</span>?
                  </p>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowRedeemModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRedeem}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Redemption Successful!</h3>
                <p className="text-gray-600 mt-1">Your reward has been successfully redeemed.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* How to Earn Points Section */}
      <div className="mt-8 bg-red-50 rounded-lg p-4">
        <h3 className="font-semibold text-red-800 mb-2 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          How to Earn More Points
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />
            <span>
              <strong>Blood Donation:</strong> Earn 100 points for each successful blood donation
            </span>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />
            <span>
              <strong>Referrals:</strong> Earn 50 points when someone you refer completes their first donation
            </span>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />
            <span>
              <strong>Milestone Bonuses:</strong> Earn bonus points for reaching donation milestones (5, 10, 25
              donations)
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RewardsSystem
