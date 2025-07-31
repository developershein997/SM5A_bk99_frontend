import React, { useContext } from 'react'
import { Spinner, Table } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseUrl';
import { LanguageContext } from '../../contexts/LanguageContext';

export default function WithdrawLog() {
  const { content } = useContext(LanguageContext);
  const { data: logs, loading } = useFetch(BASE_URL + "/withdrawlogfinicial");

  return (
    <>
      <div className="max-w-2xl mx-auto my-4 mb-5 pb-5 px-2">
        <h2 className="text-xl font-bold text-yellow-400 mb-4 text-center">Withdraw Log</h2>
        {loading && <div className="text-center py-8 text-gray-400 font-semibold">Loading...</div>}
        {logs && logs.length === 0 && (
          <div className="text-center py-8 text-gray-400 font-semibold">
            <h5>{content?.no_data}</h5>
          </div>
        )}
        <div className="space-y-4">
          {logs && logs.map((log, index) => (
            <div className="rounded-xl border border-gray-700 bg-white/10 shadow p-4 hover:shadow-lg transition flex flex-col gap-2" key={index}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1
                  ${log.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : log.status === 'Success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                >
                  {log.status === 'Pending' && <svg className="w-3 h-3 mr-1 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>}
                  {log.status === 'Success' && <svg className="w-3 h-3 mr-1 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>}
                  {log.status === 'Failed' && <svg className="w-3 h-3 mr-1 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>}
                  {log.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs md:text-sm">
                <div><span className="font-semibold text-gray-400">{content?.log?.date}:</span> <span>{log.datetime}</span></div>
                <div><span className="font-semibold text-gray-400">{content?.wallet?.account_name}:</span> <span>{log.account_name}</span></div>
                <div><span className="font-semibold text-gray-400">{content?.wallet?.account}:</span> <span>{log.account_number}</span></div>
                <div><span className="font-semibold text-gray-400">{content?.log?.amount}:</span> <span>{Number(log.amount).toLocaleString()} Ks</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}