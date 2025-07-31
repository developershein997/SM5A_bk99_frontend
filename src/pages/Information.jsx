import React, { useContext, useEffect, useState } from "react";
import { FaHistory, FaUser, FaWallet, FaCog, FaChartLine, FaShieldAlt } from "react-icons/fa";
import { IoWalletSharp } from "react-icons/io5";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Profile from "../components/mobile/Profile";
import BankAccount from "../components/mobile/BankAccount";
import MoneyTransfer from "../components/mobile/MoneyTransfer";
import ChangePassword from "../components/mobile/ChangePassword";
import Log from "../components/mobile/Log";
import Marquee from "../components/mobile/Marquee";
import LanguageDropdown from "../components/LanguageDropdown";
import { LanguageContext } from "../contexts/LanguageContext";

const InformationPage = () => {
   const { content } = useContext(LanguageContext);
  const navigate = useNavigate();
   const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    {
      id: "profile",
      icon: <FaUser className="text-xl" />,
      title: content?.profile?.my_profile || "Profile User",
      description: "Manage your account information",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-400/20",
      iconColor: "text-blue-400"
    },
    {
      id: "transfer",
      icon: <FaWallet className="text-xl" />,
      title: content?.wallet?.money_transfer || "Money Transfer",
      description: "Transfer funds between accounts",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-400/20",
      iconColor: "text-green-400"
    },
    {
      id: "logs",
      icon: <FaHistory className="text-xl" />,
      title: content?.wallet?.logs || "Logs",
      description: "View transaction history",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-400/20",
      iconColor: "text-purple-400"
    }
  ];

  const tab = searchParams.get("tab");

  useEffect(() => {
    if (!tab) {
      navigate("/information?tab=profile");
      setActiveTab("profile");
    } else {
      setActiveTab(tab);
    }
  }, [tab, navigate]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsLoading(true);
    // Simulate loading for smooth transitions
    setTimeout(() => setIsLoading(false), 300);
  };

  const getActiveTab = () => {
    return tabs.find(tab => tab.id === activeTab);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101223] via-[#1a1d3a] to-[#101223]">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
        <div className="relative z-10">
        <Marquee />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaCog className="text-4xl text-yellow-400 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Account Information
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Manage your profile, transfer funds, and view your transaction history
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tabs.map((tabItem) => (
            <div
              key={tabItem.id}
              className="group relative cursor-pointer"
              onClick={() => handleTabChange(tabItem.id)}
            >
              <div className={`bg-gradient-to-br from-[#181A29] to-[#1f2338] rounded-2xl p-6 shadow-lg border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                activeTab === tabItem.id
                  ? `border-yellow-400/50 shadow-yellow-400/20`
                  : `border-gray-700/50 hover:border-yellow-400/30`
              }`}>
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tabItem.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 ${tabItem.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className={tabItem.iconColor}>
                      {tabItem.icon}
                    </div>
                  </div>
                  
                  <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    activeTab === tabItem.id ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400'
                  }`}>
                    {tabItem.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm">
                    {tabItem.description}
                  </p>
                  
                  {/* Active Indicator */}
                  {activeTab === tabItem.id && (
                    <div className="mt-4">
                      <div className={`w-8 h-1 bg-gradient-to-r ${tabItem.color} mx-auto rounded-full`}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                <p className="text-white">Loading...</p>
              </div>
            </div>
          )}

          {/* Content Container */}
          <div className="bg-gradient-to-br from-[#181A29] to-[#1f2338] rounded-3xl p-8 shadow-2xl border border-gray-700/50">
            {/* Tab Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${getActiveTab()?.bgColor} rounded-full flex items-center justify-center`}>
                  <div className={getActiveTab()?.iconColor}>
                    {getActiveTab()?.icon}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{getActiveTab()?.title}</h2>
                  <p className="text-gray-400">{getActiveTab()?.description}</p>
                </div>
              </div>
              
              {/* Additional Actions */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Active</span>
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaShieldAlt className="text-yellow-400 text-xl" />
                    <h3 className="text-xl font-semibold text-white">Profile Management</h3>
      </div>
            <Profile />
                </div>
              )}
              
              {activeTab === "transfer" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaWallet className="text-green-400 text-xl" />
                    <h3 className="text-xl font-semibold text-white">Money Transfer</h3>
                  </div>
                  <MoneyTransfer />
                </div>
              )}
              
              {activeTab === "logs" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FaChartLine className="text-purple-400 text-xl" />
                    <h3 className="text-xl font-semibold text-white">Transaction Logs</h3>
                  </div>
                  <Log />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#181A29] to-[#1f2338] rounded-2xl p-6 text-center border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-blue-400 text-xl" />
            </div>
            <h3 className="text-white font-semibold mb-2">Profile Security</h3>
            <p className="text-gray-400 text-sm">Keep your account information secure and up to date</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#181A29] to-[#1f2338] rounded-2xl p-6 text-center border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300">
            <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWallet className="text-green-400 text-xl" />
            </div>
            <h3 className="text-white font-semibold mb-2">Secure Transfers</h3>
            <p className="text-gray-400 text-sm">Transfer funds safely between your accounts</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#181A29] to-[#1f2338] rounded-2xl p-6 text-center border border-gray-700/50 hover:border-yellow-400/30 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaChartLine className="text-purple-400 text-xl" />
            </div>
            <h3 className="text-white font-semibold mb-2">Transaction History</h3>
            <p className="text-gray-400 text-sm">Track all your financial activities and transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
