import React, { useState } from 'react';
import { Filter, Download, ArrowUpDown, AlertCircle, CheckCircle, Clock, Calendar } from 'lucide-react';
import Header from '../Header';

const DonationHistory = () => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showDateFilter, setShowDateFilter] = useState(false);

// Mock data for donation history
  const allDonations = [
  { date: '2025-04-20', location: "St. Mary's General Hospital", quantity: '5 units', status: 'Pending' },
  { date: '2025-04-20', location: "St. Mary's General Hospital", quantity: '5 units', status: 'Fulfilled' },
  { date: '2025-03-15', location: "Cityview Medical Center", quantity: '10 units', status: 'Fulfilled' },
  { date: '2025-03-15', location: "Cityview Medical Center", quantity: '10 units', status: 'Rejected' },
  { date: '2025-02-28', location: "Pinecrest Medical Center", quantity: '9 units', status: 'Fulfilled' },
  { date: '2025-01-10', location: "Mount Hope Regional Hospital", quantity: '12 units', status: 'Rejected' },
  { date: '2024-12-05', location: "Cityview Medical Center", quantity: '7 units', status: 'Fulfilled' },
  { date: '2024-11-12', location: "Lakeside General Hospital", quantity: '6 units', status: 'Rejected' },
];

  // Filter donations based on status and date
  const getFilteredDonations = () => {
    let filtered = [...allDonations];
    
    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(d => d.status === filterStatus);
    }
    
    // Filter by date
    if (dateFilter !== 'all') {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      switch (dateFilter) {
        case 'month':
          // Current month
          filtered = filtered.filter(d => {
            const donationDate = new Date(d.date);
            return donationDate.getMonth() === currentMonth && 
                   donationDate.getFullYear() === currentYear;
          });
          break;
        case 'quarter':
          // Current quarter (3 months)
          filtered = filtered.filter(d => {
            const donationDate = new Date(d.date);
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return donationDate >= threeMonthsAgo;
          });
          break;
        case 'year':
          // Current year
          filtered = filtered.filter(d => {
            const donationDate = new Date(d.date);
            return donationDate.getFullYear() === currentYear;
          });
          break;
        default:
          // All dates
          break;
      }
    }
    
    return filtered;
  };
  
  const filteredDonations = getFilteredDonations();
  
  // Sort donations
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else if (sortField === 'quantity') {
      return sortDirection === 'asc'
        ? parseInt(a.quantity) - parseInt(b.quantity)
        : parseInt(b.quantity) - parseInt(a.quantity);
    }
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Fulfilled':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock size={14} className="mr-1" />;
      case 'Fulfilled':
        return <CheckCircle size={14} className="mr-1" />;
      case 'Rejected':
        return <AlertCircle size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  const resetFilters = () => {
    setFilterStatus('all');
    setDateFilter('all');
  };

  // Function to export data to CSV/Excel
  const exportToExcel = () => {
    // Get the data to export (filtered & sorted)
    const dataToExport = sortedDonations;
    
    // Create CSV content
    const headers = ['Date', 'Location', 'Quantity', 'Status'];
    const csvContent = [
      headers.join(','), // Header row
      ...dataToExport.map(donation => [
        donation.date,
        `"${donation.location}"`, // Add quotes to handle commas in location names
        donation.quantity,
        donation.status
      ].join(','))
    ].join('\n');
    
    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    
    // Set the file name
    const fileName = `donation_history_${new Date().toISOString().split('T')[0]}.csv`;
    link.setAttribute('download', fileName);
    
    // Append to the body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Release the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFEBEB] to-white">
      <div className="absolute top-0 right-0 w-full h-64 bg-[#C91C1C] rounded-b-[30%] opacity-5" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#C91C1C] rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C91C1C] rounded-full blur-3xl opacity-5 translate-x-1/2 translate-y-1/2" />
      
      <Header />
      
      <div className="container mx-auto px-4 pt-6 md:pt-8 pb-16 max-w-6xl relative z-10">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#C91C1C] to-[#FF5757] text-transparent bg-clip-text inline-block">Donation History</h1>
          <div className="mt-2 w-32 md:w-40 h-1 bg-gradient-to-r from-[#C91C1C] to-[#FF5757] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-2 md:mt-3 text-sm md:text-base">Your journey of saving lives through blood donation</p>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-3 md:p-5 mb-6 md:mb-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setShowDateFilter(false)}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${!showDateFilter 
                ? 'bg-[#C91C1C] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Status Filter
            </button>
            <button
              onClick={() => setShowDateFilter(true)}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${showDateFilter 
                ? 'bg-[#C91C1C] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Date Filter
            </button>
            <button
              onClick={resetFilters}
              className="ml-auto px-3 py-1.5 text-[#C91C1C] bg-red-50 rounded-lg text-xs md:text-sm font-medium hover:bg-red-100 transition-colors"
            >
              Reset All Filters
            </button>
        </div>
        
          {/* Status Filter */}
          {!showDateFilter && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                <div className="flex items-center">
                  <Filter size={16} className="text-gray-400 mr-2" />
                  <span className="font-medium text-gray-700 mr-2 text-sm md:text-base">Filter by Status:</span>
                </div>
                <div className="flex flex-wrap gap-2 w-full">
                  <button 
                    onClick={() => setFilterStatus('all')} 
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${filterStatus === 'all' 
                      ? 'bg-gray-900 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setFilterStatus('Fulfilled')} 
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center ${filterStatus === 'Fulfilled' 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-green-50'}`}
                  >
                    <CheckCircle size={14} className="mr-1" />
                    Fulfilled
                  </button>
                  <button 
                    onClick={() => setFilterStatus('Pending')} 
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center ${filterStatus === 'Pending' 
                      ? 'bg-yellow-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'}`}
                  >
                    <Clock size={14} className="mr-1" />
                    Pending
                  </button>
                  <button 
                    onClick={() => setFilterStatus('Rejected')} 
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center ${filterStatus === 'Rejected' 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-50'}`}
                  >
                    <AlertCircle size={14} className="mr-1" />
                    Rejected
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Date Filter */}
          {showDateFilter && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="font-medium text-gray-700 mr-2 text-sm md:text-base">Filter by Date:</span>
                </div>
                <div className="flex flex-wrap gap-2 w-full">
                  <button 
                    onClick={() => setDateFilter('all')} 
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${dateFilter === 'all' 
                      ? 'bg-gray-900 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    All Time
                  </button>
                  <button 
                    onClick={() => setDateFilter('month')} 
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${dateFilter === 'month' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}
                  >
                    This Month
                  </button>
                  <button 
                    onClick={() => setDateFilter('quarter')} 
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${dateFilter === 'quarter' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}
                  >
                    Last 3 Months
                  </button>
                  <button 
                    onClick={() => setDateFilter('year')} 
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${dateFilter === 'year' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}
                  >
                    This Year
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={exportToExcel}
              className="flex items-center text-white bg-gradient-to-r from-[#C91C1C] to-[#FF5757] hover:from-[#B91818] hover:to-[#E54545] px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <Download size={14} className="mr-2" />
              Export to Excel
            </button>
          </div>
        </div>
        
        {/* Applied Filters */}
        {(filterStatus !== 'all' || dateFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="text-sm text-gray-600">Applied filters:</div>
            {filterStatus !== 'all' && (
              <div className="bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
                Status: <span className="font-medium ml-1">{filterStatus}</span>
                <button onClick={() => setFilterStatus('all')} className="ml-2 text-gray-500 hover:text-gray-700">×</button>
              </div>
            )}
            {dateFilter !== 'all' && (
              <div className="bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
                Date: <span className="font-medium ml-1">
                  {dateFilter === 'month' ? 'This Month' : 
                   dateFilter === 'quarter' ? 'Last 3 Months' : 
                   dateFilter === 'year' ? 'This Year' : 'All Time'}
                </span>
                <button onClick={() => setDateFilter('all')} className="ml-2 text-gray-500 hover:text-gray-700">×</button>
              </div>
            )}
          </div>
        )}
        
        {/* Table */}
        <div className="overflow-x-auto -mx-4 px-4">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden bg-white shadow-lg rounded-xl backdrop-blur-md bg-opacity-90">
              <table className="min-w-full">
            <thead>
                  <tr className="bg-gradient-to-r from-[#C91C1C] to-[#FF5757] text-white">
                    <th className="py-4 md:py-5 px-4 md:px-6 text-left font-semibold">
                      <button 
                        className="flex items-center focus:outline-none" 
                        onClick={() => handleSort('date')}
                      >
                        Date
                        <ArrowUpDown size={16} className={`ml-1 transition-transform ${sortField === 'date' && sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      </button>
                    </th>
                    <th className="py-4 md:py-5 px-4 md:px-6 text-left font-semibold">Location</th>
                    <th className="py-4 md:py-5 px-4 md:px-6 text-left font-semibold">
                      <button 
                        className="flex items-center focus:outline-none" 
                        onClick={() => handleSort('quantity')}
                      >
                        Quantity
                        <ArrowUpDown size={16} className={`ml-1 transition-transform ${sortField === 'quantity' && sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                      </button>
                    </th>
                    <th className="py-4 md:py-5 px-4 md:px-6 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                  {sortedDonations.map((donation, index) => (
                    <tr key={index} className="transition-colors hover:bg-red-50">
                      <td className="py-3 md:py-4 px-4 md:px-6 font-medium">{donation.date}</td>
                      <td className="py-3 md:py-4 px-4 md:px-6">{donation.location}</td>
                      <td className="py-3 md:py-4 px-4 md:px-6">{donation.quantity}</td>
                      <td className="py-3 md:py-4 px-4 md:px-6">
                        <span className={`inline-flex items-center px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(donation.status)}`}>
                          {getStatusIcon(donation.status)}
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              
              {sortedDonations.length === 0 && (
                <div className="py-12 md:py-16 text-center text-gray-500">
                  <AlertCircle size={40} className="mx-auto mb-4 text-gray-400" />
                  <p className="font-medium">No donation records found with the selected filters.</p>
                  <button 
                    onClick={resetFilters}
                    className="mt-2 text-[#C91C1C] hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Showing {sortedDonations.length} of {allDonations.length} donation records</p>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
