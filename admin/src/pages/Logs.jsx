import React, { useEffect, useState } from 'react';
import DataTable from '../components/ui/DataTable';
import { useApi } from '../services/api';

export default function Logs() {
  const { request } = useApi();
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await request(`/api/logs?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
        setLogs(res.logs);
        setTotal(res.total);
      } catch {
        setLogs([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
    // eslint-disable-next-line
  }, [page, limit, search]);

  const columns = [
    { key: 'action', title: 'Action' },
    { key: 'performedBy', title: 'By', render: l => l.performedBy?.name || '' },
    { key: 'target', title: 'Target' },
    { key: 'timestamp', title: 'Date', render: l => new Date(l.timestamp).toLocaleString() },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Logs & Audit Trail</h1>
      <DataTable
        columns={columns}
        data={logs}
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