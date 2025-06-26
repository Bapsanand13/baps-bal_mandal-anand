import React, { useEffect, useState } from 'react';
import { useApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import Modal from '../components/ui/Modal';
import DataTable from '../components/ui/DataTable';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { request } = useApi();
  const { showToast } = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  // Get userId from query param
  const userId = new URLSearchParams(window.location.search).get('id');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await request(`/api/users/${userId}/profile`);
        setProfile(res);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchProfile();
    // eslint-disable-next-line
  }, [userId]);

  const openEdit = () => {
    setEditForm(profile?.user || {});
    setEditOpen(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await request(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(editForm)
      });
      showToast('User updated', 'success');
      setEditOpen(false);
      // Refresh profile
      const res = await request(`/api/users/${userId}/profile`);
      setProfile(res);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!profile) return <div className="p-8 text-red-600">User not found</div>;

  const { user, posts, achievements, attendance } = profile;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300" onClick={() => navigate('/users')}>&larr; Back</button>
          <h1 className="text-2xl font-bold">Student Profile</h1>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={openEdit}>Edit</button>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div><b>Name:</b> {user.name}</div>
          <div><b>Email:</b> {user.email}</div>
          <div><b>Phone:</b> {user.phone}</div>
          <div><b>Age:</b> {user.age}</div>
          <div><b>Guardian:</b> {user.guardianName}</div>
          <div><b>Mandal:</b> {user.mandal}</div>
          <div><b>Role:</b> {user.role}</div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Posts</h2>
        <DataTable columns={[
          { key: 'title', title: 'Title' },
          { key: 'status', title: 'Status' },
          { key: 'createdAt', title: 'Date', render: p => new Date(p.createdAt).toLocaleDateString() }
        ]} data={posts} loading={false} limit={5} />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Achievements</h2>
        <DataTable columns={[
          { key: 'title', title: 'Title' },
          { key: 'category', title: 'Category' },
          { key: 'level', title: 'Level' },
          { key: 'date', title: 'Date', render: a => new Date(a.date).toLocaleDateString() }
        ]} data={achievements} loading={false} limit={5} />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Attendance</h2>
        <DataTable columns={[
          { key: 'date', title: 'Date', render: a => new Date(a.date).toLocaleDateString() },
          { key: 'status', title: 'Status', render: a => a.status === 'present' ? '✅ Present' : '❌ Absent' },
          { key: 'mandal', title: 'Mandal' }
        ]} data={attendance} loading={false} limit={10} />
      </div>
      <Modal
        open={editOpen}
        title="Edit User"
        onClose={() => setEditOpen(false)}
        actions={[
          <button key="cancel" className="px-4 py-2 rounded bg-gray-200" onClick={() => setEditOpen(false)}>Cancel</button>,
          <button key="save" className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleEdit}>Save</button>
        ]}
      >
        <form onSubmit={handleEdit} className="space-y-3">
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Name" value={editForm.name || ''} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} required />
          <input type="email" className="w-full border px-3 py-2 rounded" placeholder="Email" value={editForm.email || ''} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} required />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Phone" value={editForm.phone || ''} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} required />
          <input type="number" className="w-full border px-3 py-2 rounded" placeholder="Age" value={editForm.age || ''} onChange={e => setEditForm(f => ({ ...f, age: e.target.value }))} required />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Guardian Name" value={editForm.guardianName || ''} onChange={e => setEditForm(f => ({ ...f, guardianName: e.target.value }))} required />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Mandal" value={editForm.mandal || ''} onChange={e => setEditForm(f => ({ ...f, mandal: e.target.value }))} required />
          <select className="w-full border px-3 py-2 rounded" value={editForm.role || 'user'} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </form>
      </Modal>
    </div>
  );
} 