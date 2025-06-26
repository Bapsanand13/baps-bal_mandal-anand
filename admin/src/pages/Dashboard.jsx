import React, { useEffect, useState } from 'react';
import { useApi } from '../services/api';

export default function Dashboard() {
  const { request } = useApi();
  const [stats, setStats] = useState({ users: 0, events: 0, posts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const usersRes = await request('/users/list?limit=1');
        const eventsRes = await request('/events');
        const postsRes = await request('/posts/list?limit=1');
        setStats({
          users: usersRes.total || 0,
          events: eventsRes.length || 0,
          posts: postsRes.total || 0
        });
      } catch {
        setStats({ users: 0, events: 0, posts: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow text-center">
          <div className="text-lg font-semibold">Total Users</div>
          <div className="text-3xl font-bold text-blue-600">{loading ? '--' : stats.users}</div>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <div className="text-lg font-semibold">Total Events</div>
          <div className="text-3xl font-bold text-blue-600">{loading ? '--' : stats.events}</div>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <div className="text-lg font-semibold">Total Posts</div>
          <div className="text-3xl font-bold text-blue-600">{loading ? '--' : stats.posts}</div>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow mb-8">
        <div className="font-semibold mb-2">Attendance Trends (Graph Placeholder)</div>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">Graph</div>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <div className="font-semibold mb-2">Event Participation (Graph Placeholder)</div>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">Graph</div>
      </div>
    </div>
  );
} 