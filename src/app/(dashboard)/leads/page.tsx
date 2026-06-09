'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Globe, MapPin, Phone, Mail, Loader2 } from 'lucide-react';

interface Lead {
  id: string;
  businessName: string;
  category: string;
  address: string;
  phone: string | null;
  email: string | null;
  status: string;
  hasWebsite: boolean;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [discovering, setDiscovering] = useState(false);
  const [filter, setFilter] = useState('');

  const fetchLeads = async () => {
    const res = await fetch('/api/leads');
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const discoverLead = async () => {
    setDiscovering(true);
    await fetch('/api/leads', { method: 'POST' });
    await fetchLeads();
    setDiscovering(false);
  };

  const filtered = leads.filter(l => !filter || l.category.toLowerCase().includes(filter.toLowerCase()));

  const statusColors: Record<string, string> = {
    discovered: 'bg-honey-500 text-white',
    contacted: 'bg-blue-500 text-white',
    site_created: 'bg-coral-500 text-white',
    live: 'bg-green-500 text-white',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">Local businesses without websites, ready for you to help.</p>
        </div>
        <button onClick={discoverLead} disabled={discovering} className="btn-primary flex items-center gap-2 disabled:opacity-50">
          {discovering ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
          {discovering ? 'Scanning...' : 'Discover Lead'}
        </button>
      </div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by category..." className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white" />
        </div>
      </div>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading leads...</div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-12">
          <Search className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-xl font-heading font-bold text-gray-700 mb-2">No leads yet</h3>
          <p className="text-gray-500 mb-4">Click Discover Lead to find local businesses without websites.</p>
          <button onClick={discoverLead} className="btn-primary">Find Your First Lead</button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((lead) => (
            <div key={lead.id} className="card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-500 font-bold text-lg">
                  {lead.businessName[0]}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-900">{lead.businessName}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-lg text-xs font-medium">{lead.category}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} />{lead.address}</span>
                    {lead.phone && <span className="flex items-center gap-1"><Phone size={14} />{lead.phone}</span>}
                    {lead.email && <span className="flex items-center gap-1"><Mail size={14} />{lead.email}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${statusColors[lead.status] || 'bg-gray-200 text-gray-700'}`}>{lead.status.replace('_', ' ')}</span>
                {lead.status === 'discovered' && (
                  <button onClick={async () => {
                    await fetch('/api/sites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ leadId: lead.id, template: 'service' }) });
                    fetchLeads();
                  }} className="btn-secondary text-sm py-2 px-4 flex items-center gap-1">
                    <Globe size={16} /> Build Site
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}