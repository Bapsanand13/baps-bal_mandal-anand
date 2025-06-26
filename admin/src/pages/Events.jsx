import React, { useEffect, useState } from 'react';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import { useApi } from '../services/api';
import { useToast } from '../context/ToastContext';

const initialForm = { title: '', description: '', date: '', time: '', venue: '', category: 'spiritual', maxAttendees: '', image: '' };

export default function Events() {
  const { request } = useApi();
  const { showToast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(initialForm);
  const [formMode, setFormMode] = useState('add');
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await request(`/events?search=${encodeURIComponent(search)}`);
        setEvents(res);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
    // eslint-disable-next-line
  }, [search]);

  const handleExport = async () => {
    try {
      const res = await request('/events');
      const csv = [
        'Title,Date,Venue,Category,Attendees',
        ...res.map(e => `${e.title},${new Date(e.date).toLocaleDateString()},${e.venue || ''},${e.category},${e.attendees?.length || 0}`)
      ].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'events.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {}
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'add') {
        const res = await request('/events', {
          method: 'POST',
          body: JSON.stringify(form)
        });
        setEvents([res.event, ...events]);
        showToast('Event added', 'success');
      } else {
        const res = await request(`/events/${editId}`, {
          method: 'PUT',
          body: JSON.stringify(form)
        });
        setEvents(events.map(ev => ev._id === editId ? res.event : ev));
        showToast('Event updated', 'success');
      }
      setForm(initialForm);
      setFormOpen(false);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const openEdit = (event) => {
    setForm({ ...event });
    setEditId(event._id);
    setFormMode('edit');
    setFormOpen(true);
  };

  const columns = [
    { key: 'title', title: 'Title' },
    { key: 'date', title: 'Date', render: e => new Date(e.date).toLocaleDateString() },
    { key: 'venue', title: 'Venue' },
    { key: 'category', title: 'Category' },
    { key: 'attendees', title: 'Attendees', render: e => e.attendees?.length || 0 },
    {
      key: 'actions',
      title: 'Actions',
      render: row => (
        <button className="text-blue-600 hover:underline" onClick={() => openEdit(row)}>Edit</button>
      )
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Event Management</h1>
        <div className="flex gap-2">
          <button onClick={handleExport} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Export CSV</button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => { setForm(initialForm); setFormMode('add'); setFormOpen(true); }}
          >
            Add Event
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={events}
        loading={loading}
        search={search}
        onSearch={setSearch}
        page={1}
        total={events.length}
        limit={events.length}
        onPageChange={() => {}}
      />
      <Modal
        open={formOpen}
        title={formMode === 'add' ? 'Add Event' : 'Edit Event'}
        onClose={() => setFormOpen(false)}
        actions={[
          <button key="cancel" className="px-4 py-2 rounded bg-gray-200" onClick={() => setFormOpen(false)}>Cancel</button>,
          <button key="save" className="px-4 py-2 rounded bg-blue-600 text-white" onClick={handleFormSubmit}>
            {formMode === 'add' ? 'Add' : 'Save'}
          </button>
        ]}
      >
        <form onSubmit={handleFormSubmit} className="space-y-3">
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
          <textarea className="w-full border px-3 py-2 rounded" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
          <input type="date" className="w-full border px-3 py-2 rounded" value={form.date ? form.date.slice(0,10) : ''} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
          <input type="time" className="w-full border px-3 py-2 rounded" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} required />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Venue" value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} required />
          <select className="w-full border px-3 py-2 rounded" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            <option value="spiritual">Spiritual</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="educational">Educational</option>
          </select>
          <input type="number" className="w-full border px-3 py-2 rounded" placeholder="Max Attendees" value={form.maxAttendees} onChange={e => setForm(f => ({ ...f, maxAttendees: e.target.value }))} required />
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Image URL" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
        </form>
      </Modal>
    </div>
  );
} 