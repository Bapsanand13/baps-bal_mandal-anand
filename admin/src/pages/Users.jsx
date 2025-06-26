import React, { useEffect, useState } from 'react';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import { useApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const initialForm = { name: '', email: '', password: '', phone: '', age: '', guardianName: '', mandal: '', role: 'user' };

export default function Users() {
  const { request } = useApi();
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await request(`/users/list?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
        setUsers(res.users);
        setTotal(res.total);
      } catch {
        setUsers([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    // eslint-disable-next-line
  }, [page, limit, search]);

  const handleDelete = async () => {
    try {
      await request(`/users/${deleteId}`, { method: 'DELETE' });
      showToast('User deleted', 'success');
      setUsers(users.filter(u => u._id !== deleteId));
      setModalOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'add') {
        const res = await request('/users', {
          method: 'POST',
          body: JSON.stringify(form)
        });
        setUsers([res.user, ...users]);
        showToast('User added', 'success');
      } else {
        const res = await request(`/users/${editId}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setUsers(users.map(u => u._id === editId ? res.user : u));
        showToast('User updated', 'success');
      }
      setForm(initialForm);
      setFormOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const openEdit = (user) => {
    setForm({ ...user, password: '' });
    setEditId(user._id);
    setFormMode('edit');
    setFormOpen(true);
  };

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'mandal', title: 'Mandal' },
    { key: 'age', title: 'Age' },
    { key: 'guardianName', title: 'Guardian' },
    { key: 'phone', title: 'Phone' },
    { key: 'role', title: 'Role' },
    {
      key: 'actions',
      title: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:underline" onClick={() => openEdit(row)}>Edit</button>
          <button className="text-red-600 hover:underline" onClick={() => { setDeleteId(row._id); setModalOpen(true); }}>Delete</button>
          <button className="text-green-600 hover:underline" onClick={() => navigate(`/profile?id=${row._id}`)}>View</button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => { setForm(initialForm); setFormMode('add'); setFormOpen(true); }}
        >
          Add User
        </button>
      </div>
      <DataTable
        columns={columns}
        data={users}
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
        title="Delete User"
        onClose={() => setModalOpen(false)}
        actions={[
          <button key="cancel" className="px-4 py-2 rounded bg-gray-200" onClick={() => setModalOpen(false)}>Cancel</button>,
          <button key="delete" className="px-4 py-2 rounded bg-red-600 text-white" onClick={handleDelete}>Delete</button>
        ]}
      >
        Are you sure you want to delete this user?
      </Modal>
      <Modal
        open={formOpen}
        title={formMode === 'add' ? 'Add User' : 'Edit User'}
        onClose={() => setFormOpen(false)}
        actions={[
          <button key="cancel" className="px-4 py-2 rounded bg-gray-200" onClick={() => setFormOpen(false)}>Cancel</button>,
          <button key="save" className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleFormSubmit}>
            {formMode === 'add' ? 'Add' : 'Save'}
          </button>
        ]}
      >
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          <input type="email" className="w-full border px-3 py-2 rounded" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required={formMode === 'add'} />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
          <input type="number" className="w-full border px-3 py-2 rounded" placeholder="Age" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} required />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Guardian Name" value={form.guardianName} onChange={e => setForm(f => ({ ...f, guardianName: e.target.value }))} required />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Mandal" value={form.mandal} onChange={e => setForm(f => ({ ...f, mandal: e.target.value }))} required />
          <select className="w-full border px-3 py-2 rounded" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
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