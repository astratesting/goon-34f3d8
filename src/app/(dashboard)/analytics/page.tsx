'use client';

import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, Globe } from 'lucide-react';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({ leads: 0, sites: 0, live: 0, draft: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/sites').then(r => r.json()),
    ]).then(([leadsData, sitesData]) => {
      const sites = sitesData.sites || [];
      setStats({
        leads: leadsData.leads?.length || 0,
        sites: sites.length,
        live: sites.filter((s: any) => s.status === 'live').length,
        draft: sites.filter((s: any) => s.status === 'draft').length,
      });
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your lead generation and site building performance.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Leads', value: stats.leads, icon: Users, color: 'text-violet-500' },
          { label: 'Sites Built', value: stats.sites, icon: Globe, color: 'text-coral-500' },
          { label: 'Live Sites', value: stats.live, icon: TrendingUp, color: 'text-green-500' },
          { label: 'Draft Sites', value: stats.draft, icon: BarChart3, color: 'text-honey-500' },
        ].map((card) => (
          <div key={card.label} className="card">
            <card.icon className={`${card.color} mb-2`} size={24} />
            <p className="text-3xl font-heading font-bold text-gray-900">{card.value}</p>
            <p className="text-gray-500 text-sm">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 className="text-xl font-heading font-bold mb-4">Conversion Funnel</h2>
        <div className="space-y-4">
          {[
            { label: 'Leads Discovered', value: stats.leads, pct: 100, color: 'bg-violet-500' },
            { label: 'Sites Created', value: stats.sites, pct: stats.leads ? Math.round((stats.sites / stats.leads) * 100) : 0, color: 'bg-coral-500' },
            { label: 'Sites Live', value: stats.live, pct: stats.leads ? Math.round((stats.live / stats.leads) * 100) : 0, color: 'bg-green-500' },
          ].map((step) => (
            <div key={step.label} className="flex items-center gap-4">
              <div className="w-40 text-sm font-medium text-gray-700">{step.label}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div className={`${step.color} h-full rounded-full transition-all duration-500`} style={{ width: `${step.pct}%` }} />
              </div>
              <div className="w-20 text-right text-sm font-bold text-gray-900">{step.value} ({step.pct}%)</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}