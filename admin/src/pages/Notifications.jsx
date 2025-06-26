import React, { useEffect, useState } from 'react';
import DataTable from '../components/ui/DataTable';
import { useApi } from '../services/api';
import Modal from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';

export default function Notifications() {
  const { request } = useApi();
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: '', message: '', type: 'info', recipients: [] });
  const { showToast } = useToast();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await request(`/api/notifications/list?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
        setNotifications(res.notifications);
        setTotal(res.total);
      } catch {
        setNotifications([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
    // eslint-disable-next-line
  }, [page, limit, search]);

  const openModal = async () => {
    setModalOpen(true);
    setEditData({ title: '', message: '', type: 'info', recipients: [] });
    try {
      const res = await request('/api/users/list?limit=1000');
      setUsersList(res.users);
    } catch {
      setUsersList([]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      await request('/api/notifications', {
        method: 'POST',
        body: JSON.stringify(editData)
      });
      showToast('Notification sent', 'success');
      setModalOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const columns = [
    { key: 'title', title: 'Title' },
    { key: 'message', title: 'Message' },
    { key: 'type', title: 'Type' },
    { key: 'createdAt', title: 'Date', render: n => new Date(n.createdAt).toLocaleDateString() },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notification Management</h1>
        <button onClick={openModal} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send Notification</button>
      </div>
      <DataTable
        columns={columns}
        data={notifications}
        loading={loading}
        search={search}
        onSearch={setSearch}
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
      <Modal
        open={modalOpen}
        title="Send Notification"
        onClose={() => setModalOpen(false)}
        actions={[
          <button key="cancel" className="px-4 py-2 rounded bg-gray-200" onClick={() => setModalOpen(false)}>Cancel</button>,
          <button key="send" className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleSend}>Send</button>
        ]}
      >
        <form onSubmit={handleSend} className="space-y-3">
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Title" value={editData.title} onChange={e => setEditData(d => ({ ...d, title: e.target.value }))} required />
          <textarea className="w-full border px-3 py-2 rounded" placeholder="Message" value={editData.message} onChange={e => setEditData(d => ({ ...d, message: e.target.value }))} required />
          <select className="w-full border px-3 py-2 rounded" value={editData.type} onChange={e => setEditData(d => ({ ...d, type: e.target.value }))}>
            <option value="info">Info</option>
            <option value="alert">Alert</option>
            <option value="reminder">Reminder</option>
          </select>
          <div className="max-h-40 overflow-y-auto border rounded p-2">
            {usersList.map(u => (
              <label key={u._id} className="block">
                <input
                  type="checkbox"
                  checked={editData.recipients.includes(u._id)}
                  onChange={e => setEditData(d => ({ ...d, recipients: e.target.checked ? [...d.recipients, u._id] : d.recipients.filter(id => id !== u._id) }))}
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