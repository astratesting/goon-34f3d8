'use client';

import { useEffect, useState } from 'react';
import { Globe, ExternalLink, Eye } from 'lucide-react';

interface Site {
  id: string;
  template: string;
  subdomain: string;
  status: string;
  createdAt: string;
  lead: { businessName: string; category: string; address: string };
}

const templateNames: Record<string, string> = {
  restaurant: 'Restaurant',
  service: 'Service Business',
  retail: 'Retail Store',
  professional: 'Professional Office',
};

const statusColors: Record<string, string> = {
  draft: 'bg-gray-200 text-gray-700',
  building: 'bg-honey-500 text-white',
  live: 'bg-green-500 text-white',
  pending: 'bg-blue-500 text-white',
};

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sites').then(r => r.json()).then(data => {
      setSites(data.sites || []);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">Sites</h1>
        <p className="text-gray-600 mt-1">Websites you've built for local businesses.</p>
      </div>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading sites...</div>
      ) : sites.length === 0 ? (
        <div className="card text-center py-12">
          <Globe className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-xl font-heading font-bold text-gray-700 mb-2">No sites yet</h3>
          <p className="text-gray-500">Discover a lead and build their website to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site) => (
            <div key={site.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading font-bold text-gray-900">{site.lead.businessName}</h3>
                  <p className="text-sm text-gray-500">{site.lead.category}</p>
                </div>
                <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${statusColors[site.status] || 'bg-gray-200 text-gray-700'}`}>{site.status}</span>
              </div>
              <div className="bg-warm-offwhite rounded-xl p-4 mb-4">
                <div className="aspect-video bg-white rounded-lg border border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="mx-auto mb-2 text-violet-500" size={32} />
                    <p className="text-sm font-medium text-gray-700">{templateNames[site.template] || site.template} Template</p>
                    <p className="text-xs text-gray-500">{site.subdomain}.goon.site</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{site.lead.address}</span>
                <button className="text-violet-500 font-semibold hover:underline flex items-center gap-1">
                  <Eye size={16} /> Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}