import React, { useEffect, useState } from 'react';
import DataTable from '../components/ui/DataTable';
import { useApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import Modal from '../components/ui/Modal';

export default function Achievements() {
  const { request } = useApi();
  const { showToast } = useToast();
  const [achievements, setAchievements] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      try {
        const res = await request(`/api/achievements/list?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
        setAchievements(res.achievements);
        setTotal(res.total);
      } catch {
        setAchievements([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
    // eslint-disable-next-line
  }, [page, limit, search]);

  const handleAction = async (id, action) => {
    try {
      await request(`/api/achievements/${id}/${action}`, { method: 'PUT' });
      setAchievements(achievements => achievements.map(a => a._id === id ? { ...a, isActive: action === 'verify' } : a));
      showToast(`Achievement ${action}d`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const openModal = (achievement = null) => {
    setEditData(achievement);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editData && editData._id) {
        await request(`/api/achievements/${editData._id}`, {
          method: 'PUT',
          body: JSON.stringify(editData)
        });
        showToast('Achievement updated', 'success');
      } else {
        await request('/api/achievements', {
          method: 'POST',
          body: JSON.stringify(editData)
        });
        showToast('Achievement added', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const columns = [
    { key: 'title', title: 'Title' },
    { key: 'category', title: 'Category' },
    { key: 'level', title: 'Level' },
    { key: 'date', title: 'Date', render: a => new Date(a.date).toLocaleDateString() },
    { key: 'isActive', title: 'Verified', render: a => a.isActive ? '\u2705' : '' },
    {
      key: 'actions',
      title: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <button className="text-green-600 hover:underline" onClick={() => handleAction(row._id, 'verify')}>Verify</button>
          <button className="text-red-600 hover:underline" onClick={() => handleAction(row._id, 'reject')}>Reject</button>
          <button className="text-blue-600 hover:underline" onClick={() => openModal(row)}>Edit</button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Achievements Verification</h1>
        <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Achievement</button>
      </div>
      <DataTable
        columns={columns}
        data={achievements}
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
        title={editData && editData._id ? 'Edit Achievement' : 'Add Achievement'}
        onClose={() => setModalOpen(false)}
        actions={[
          <button key="cancel" className="px-4 py-2 rounded bg-gray-200" onClick={() => setModalOpen(false)}>Cancel</button>,
          <button key="save" className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleSave}>Save</button>
        ]}
      >
        <form onSubmit={handleSave} className="space-y-3">
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Title" value={editData?.title || ''} onChange={e => setEditData(d => ({ ...d, title: e.target.value }))} required />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Category" value={editData?.category || ''} onChange={e => setEditData(d => ({ ...d, category: e.target.value }))} required />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Level" value={editData?.level || ''} onChange={e => setEditData(d => ({ ...d, level: e.target.value }))} required />
          <input type="date" className="w-full border px-3 py-2 rounded" value={editData?.date ? new Date(editData.date).toISOString().substr(0,10) : ''} onChange={e => setEditData(d => ({ ...d, date: e.target.value }))} required />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!editData?.isActive} onChange={e => setEditData(d => ({ ...d, isActive: e.target.checked }))} />
            Verified
          </label>
        </form>
      </Modal>
    </div>
  );
} 