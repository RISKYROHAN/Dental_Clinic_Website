"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, CheckCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterReason, setFilterReason] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const filteredEnquiries = enquiries.filter((eq) => {
    let matchDate = true;
    let matchReason = true;
    let matchStatus = true;

    if (fromDate || toDate) {
      const eqDate = new Date(eq.preferredDate).getTime();
      
      if (fromDate && !toDate) {
        matchDate = eqDate >= new Date(fromDate).getTime();
      } else if (!fromDate && toDate) {
        matchDate = eqDate <= new Date(toDate).getTime() + 86400000;
      } else if (fromDate && toDate) {
        matchDate = eqDate >= new Date(fromDate).getTime() && eqDate <= new Date(toDate).getTime() + 86400000;
      }
    }

    if (filterReason) {
      matchReason = eq.reason === filterReason;
    }

    if (filterStatus) {
      matchStatus = eq.status === filterStatus;
    }

    return matchDate && matchReason && matchStatus;
  });
  const router = useRouter();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/admin/enquiries');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    // Optimistic UI Update - Instant feedback for the user
    setEnquiries((prev) => 
      prev.map((eq) => eq._id === id ? { ...eq, status } : eq)
    );

    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      // If the backend request failed for some reason, we revert the optimistic update
      // by pulling the real data again from the database.
      if (!res.ok) {
        fetchEnquiries();
      }
    } catch (err) {
      console.error(err);
      fetchEnquiries();
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600 p-2 rounded-xl shadow-lg shadow-teal-600/20">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-slate-900">Clinic Dashboard</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors bg-slate-100 hover:bg-red-50 px-4 py-2 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="font-heading font-extrabold text-3xl text-slate-900 mb-2">Patient Enquiries</h2>
            <p className="text-slate-600">Manage all booking requests from the website.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1">
              <input 
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-1.5 text-sm rounded-lg outline-none focus:ring-2 focus:ring-teal-500 bg-transparent text-slate-700"
                title="From Date"
              />
              <span className="text-slate-400 text-sm font-medium">to</span>
              <input 
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-1.5 text-sm rounded-lg outline-none focus:ring-2 focus:ring-teal-500 bg-transparent text-slate-700"
                title="To Date"
              />
            </div>
            <select 
              value={filterReason}
              onChange={(e) => setFilterReason(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 text-sm rounded-xl outline-none focus:ring-2 focus:ring-teal-500 bg-white min-w-[140px] text-slate-700"
            >
              <option value="">All Reasons</option>
              <option value="General Checkup">General Checkup</option>
              <option value="Tooth Pain">Tooth Pain</option>
              <option value="Cosmetic">Tooth Whitening</option>
              <option value="Other">Other</option>
            </select>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 text-sm rounded-xl outline-none focus:ring-2 focus:ring-teal-500 bg-white min-w-[120px] text-slate-700"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
            </select>
            <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm text-sm font-medium text-slate-600 flex items-center justify-center">
              Results: <span className="text-teal-600 font-bold ml-1">{filteredEnquiries.length}</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 font-semibold text-sm text-slate-500 uppercase tracking-wider">Date/Time</th>
                    <th className="px-6 py-4 font-semibold text-sm text-slate-500 uppercase tracking-wider">Patient Name</th>
                    <th className="px-6 py-4 font-semibold text-sm text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 font-semibold text-sm text-slate-500 uppercase tracking-wider">Reason & Pref. Date</th>
                    <th className="px-6 py-4 font-semibold text-sm text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 font-semibold text-sm text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                        No enquiries match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((eq) => (
                      <tr key={eq._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500">
                          {new Date(eq.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="font-semibold text-slate-900">{eq.name}</span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-600">
                          {eq.phone}
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm text-slate-900 font-medium mb-1">{eq.reason}</p>
                          <p className="text-xs text-slate-500">Pref: {new Date(eq.preferredDate).toLocaleDateString()}</p>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {eq.status === 'Pending' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                              <Clock className="w-3.5 h-3.5" /> Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                              <CheckCircle className="w-3.5 h-3.5" /> Contacted
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-sm">
                           {eq.status === 'Pending' ? (
                             <button
                               onClick={() => updateStatus(eq._id, 'Contacted')}
                               className="text-teal-600 hover:text-teal-900 font-medium bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors"
                             >
                               Mark Contacted
                             </button>
                           ) : (
                             <button
                               onClick={() => updateStatus(eq._id, 'Pending')}
                               className="text-slate-500 hover:text-slate-700 font-medium bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                             >
                               Revert
                             </button>
                           )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">Logout</h3>
            <p className="text-slate-600 mb-8">Are you sure you want to logout from the admin dashboard?</p>
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
              >
                No, cancel
              </button>
              <button 
                onClick={confirmLogout}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-red-600/30"
              >
                Yes, logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
