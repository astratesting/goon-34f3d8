'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Search, Globe, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ leads: 0, sites: 0, live: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/sites').then(r => r.json()),
    ]).then(([leadsData, sitesData]) => {
      setStats({
        leads: leadsData.leads?.length || 0,
        sites: sitesData.sites?.length || 0,
        live: sitesData.sites?.filter((s: any) => s.status === 'live').length || 0,
      });
      setLoading(false);
    });
  }, []);

  const statCards = [
    { label: 'Leads Found', value: stats.leads, icon: Search, color: 'bg-violet-500' },
    { label: 'Sites Created', value: stats.sites, icon: Globe, color: 'bg-coral-500' },
    { label: 'Sites Live', value: stats.live, icon: TrendingUp, color: 'bg-honey-500' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Welcome back, {session?.user?.name || 'there'}!</h1>
          <p className="text-gray-600 mt-1 font-body">Here's what's happening with your sites.</p>
        </div>
        <Link href="/leads" className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Find New Leads
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="card flex items-center gap-4">
            <div className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white`}><card.icon size={24} /></div>
            <div>
              <p className="text-3xl font-heading font-bold text-gray-900">{loading ? '...' : card.value}</p>
              <p className="text-gray-500 text-sm">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 className="text-xl font-heading font-bold mb-4">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/leads" className="p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-violet-500 transition-all text-center">
            <Search className="mx-auto mb-2 text-violet-500" size={32} />
            <p className="font-semibold">Discover Leads</p>
            <p className="text-sm text-gray-500">Find businesses without websites</p>
          </Link>
          <Link href="/sites" className="p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-coral-500 transition-all text-center">
            <Globe className="mx-auto mb-2 text-coral-500" size={32} />
            <p className="font-semibold">Build Sites</p>
            <p className="text-sm text-gray-500">Generate websites from templates</p>
          </Link>
          <Link href="/analytics" className="p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-honey-500 transition-all text-center">
            <TrendingUp className="mx-auto mb-2 text-honey-500" size={32} />
            <p className="font-semibold">View Analytics</p>
            <p className="text-sm text-gray-500">Track your performance</p>
          </Link>
        </div>
      </div>
    </div>
  );
}