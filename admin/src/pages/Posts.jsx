import React, { useEffect, useState } from 'react';
import DataTable from '../components/ui/DataTable';
import { useApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import Modal from '../components/ui/Modal';

export default function Posts() {
  const { request } = useApi();
  const { showToast } = useToast();
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await request(`/posts/list?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
        setPosts(res.posts);
        setTotal(res.total);
      } catch {
        setPosts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    // eslint-disable-next-line
  }, [page, limit, search]);

  const handleAction = async (id, action) => {
    try {
      await request(`/posts/${id}/${action}`, { method: 'PUT' });
      setPosts(posts => posts.map(p => p._id === id ? { ...p, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : p.status, inappropriate: action === 'inappropriate' ? true : p.inappropriate } : p));
      showToast(`Post ${action}d`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const openModal = (post = null) => {
    setEditData(post);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editData && editData._id) {
        await request(`/posts/${editData._id}`, {
          method: 'PUT',
          body: JSON.stringify(editData)
        });
        showToast('Post updated', 'success');
      } else {
        await request('/posts', {
          method: 'POST',
          body: JSON.stringify(editData)
        });
        showToast('Post added', 'success');
      }
      setModalOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const columns = [
    { key: 'title', title: 'Title' },
    { key: 'author', title: 'Author', render: p => p.author?.name || '' },
    { key: 'status', title: 'Status' },
    { key: 'inappropriate', title: 'Inappropriate', render: p => p.inappropriate ? '\ud83d\udea9' : '' },
    {
      key: 'actions',
      title: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <button className="text-green-600 hover:underline" onClick={() => handleAction(row._id, 'approve')}>Approve</button>
          <button className="text-red-600 hover:underline" onClick={() => handleAction(row._id, 'reject')}>Reject</button>
          <button className="text-yellow-600 hover:underline" onClick={() => handleAction(row._id, 'inappropriate')}>Flag</button>
          <button className="text-blue-600 hover:underline" onClick={() => openModal(row)}>Edit</button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Post Moderation</h1>
        <button onClick={() => openModal()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Post</button>
      </div>
      <DataTable
        columns={columns}
        data={posts}
        loading={loading}
        search={search}
        onSearch={setSearch}
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
} 