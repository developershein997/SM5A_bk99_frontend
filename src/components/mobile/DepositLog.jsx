import React, { useContext } from 'react'
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseUrl';
import { LanguageContext } from '../../contexts/LanguageContext';
import { FaRegCalendarAlt, FaUser, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

export default function DepositLog() {
  const { content } = useContext(LanguageContext);
  const { data: logs, loading } = useFetch(BASE_URL + "/depositlogfinicial");

  return (
    <div className="max-w-2xl mx-auto my-4 mb-5 pb-5 px-2">
      <h2 className="text-2xl font-extrabold text-yellow-400 mb-6 text-center tracking-wide drop-shadow">Deposit Log</h2>
      {loading && <div className="text-center py-8 text-gray-400 font-semibold">Loading...</div>}
      {logs && logs.length === 0 && (
        <div className="text-center py-8 text-gray-400 font-semibold">
          <h5>{content?.no_data}</h5>
        </div>
      )}
      {logs && logs.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-700 bg-white/5 shadow-lg">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-[#181A29] text-gray-300">
                <th className="px-3 py-2 font-semibold whitespace-nowrap">{content?.log?.date || 'Date'}</th>
                <th className="px-3 py-2 font-semibold whitespace-nowrap">{content?.wallet?.account_name || 'Account Name'}</th>
                <th className="px-3 py-2 font-semibold whitespace-nowrap">{content?.wallet?.account || 'Account No.'}</th>
                <th className="px-3 py-2 font-semibold whitespace-nowrap">{content?.log?.amount || 'Amount'}</th>
                <th className="px-3 py-2 font-semibold whitespace-nowrap">{content?.log?.status || 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-t border-gray-800 hover:bg-[#23243a] transition">
                  <td className="px-3 py-2 whitespace-nowrap flex items-center gap-2">
                    <FaRegCalendarAlt className="text-blue-400" />
                    <span>{log.datetime}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap flex items-center gap-2">
                    <FaUser className="text-green-400" />
                    <span>{log.account_name}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap flex items-center gap-2">
                    <FaCreditCard className="text-pink-400" />
                    <span>{log.account_number}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap flex items-center gap-2">
                    <FaMoneyBillWave className="text-yellow-400" />
                    <span>{Number(log.amount).toLocaleString()} Ks</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow
                      ${log.status === 'Pending' ? 'bg-yellow-300 text-yellow-900' : log.status === 'Success' ? 'bg-green-300 text-green-900' : 'bg-red-300 text-red-900'}`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
