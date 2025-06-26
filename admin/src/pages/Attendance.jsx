import React, { useEffect, useState } from 'react';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import { useApi } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function Attendance() {
  const { request } = useApi();
  const { showToast } = useToast();
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkDate, setBulkDate] = useState('');
  const [bulkMandal, setBulkMandal] = useState('');
  const [bulkUsers, setBulkUsers] = useState([]);
  const [bulkStatus, setBulkStatus] = useState('present');
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const res = await request(`/attendance?limit=${limit}&page=${page}&search=${encodeURIComponent(search)}`);
        setRecords(res.attendance || res);
        setTotal(res.total || (res.attendance ? res.attendance.length : res.length));
      } catch {
        setRecords([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
    // eslint-disable-next-line
  }, [page, limit, search]);

  const handleExport = async () => {
    try {
      const res = await request('/attendance/export');
      const csv = [
        'Name,Mandal,Date,Status',
        ...res.map(r => `${r.user?.name || ''},${r.mandal},${new Date(r.date).toLocaleDateString()},${r.status}`)
      ].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attendance.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {}
  };

  const openBulkModal = async () => {
    setBulkOpen(true);
    setBulkDate('');
    setBulkMandal('');
    setBulkUsers([]);
    setBulkStatus('present');
    try {
      const res = await request('/users/list?limit=1000');
      setUsersList(res.users);
    } catch {
      setUsersList([]);
    }
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    try {
      await request('/attendance/mark', {
        method: 'POST',
        body: JSON.stringify({
          date: bulkDate,
          mandal: bulkMandal,
          records: bulkUsers.map(user => ({ user, status: bulkStatus }))
        })
      });
      showToast('Attendance marked in bulk', 'success');
      setBulkOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const columns = [
    { key: 'user', title: 'Name', render: r => r.user?.name || '' },
    { key: 'mandal', title: 'Mandal' },
    { key: 'date', title: 'Date', render: r => new Date(r.date).toLocaleDateString() },
    { key: 'status', title: 'Status', render: r => r.status === 'present' ? '✅ Present' : '❌ Absent' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <div className="flex gap-2">
          <button onClick={handleExport} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Export CSV</button>
          <button onClick={openBulkModal} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Bulk Mark Attendance</button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={records}
        loading={loading}
        search={search}
        onSearch={setSearch}
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
      <Modal
        open={bulkOpen}
        title="Bulk Mark Attendance"
        onClose={() => setBulkOpen(false)}
        actions={[
          <button key="cancel" className="px-4 py-2 rounded bg-gray-200" onClick={() => setBulkOpen(false)}>Cancel</button>,
          <button key="save" className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleBulkSubmit}>Mark</button>
        ]}
      >
        <form onSubmit={handleBulkSubmit} className="space-y-3">
          <input type="date" className="w-full border px-3 py-2 rounded" value={bulkDate} onChange={e => setBulkDate(e.target.value)} required />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Mandal" value={bulkMandal} onChange={e => setBulkMandal(e.target.value)} required />
          <select className="w-full border px-3 py-2 rounded" value={bulkStatus} onChange={e => setBulkStatus(e.target.value)}>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
          <div className="max-h-40 overflow-y-auto border rounded p-2">
            {usersList.map(u => (
              <label key={u._id} className="block">
                <input
                  type="checkbox"
                  checked={bulkUsers.includes(u._id)}
                  onChange={e => setBulkUsers(bulkUsers => e.target.checked ? [...bulkUsers, u._id] : bulkUsers.filter(id => id !== u._id))}
                />
                <span className="ml-2">{u.name} ({u.mandal})</span>
              </label>
            ))}
          </div>
        </form>
      </Modal>
    </div>
  );
} 