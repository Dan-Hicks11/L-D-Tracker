import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, CheckCircle } from 'lucide-react';
import { internalLearning } from '../data/mockData';

const formatColors = {
  Remote: 'bg-blue-50 text-blue-600 border-blue-200',
  'In-person': 'bg-green-50 text-green-700 border-green-200',
  'Async + 1:1': 'bg-purple-50 text-purple-700 border-purple-200',
};

const categoryFilters = ['All', 'Management', 'AI & Tools', 'Hiring', 'Commercial', 'Product Knowledge', 'Mentoring', 'Lunch & Learn', 'Peer Learning'];

function InternalCard({ item }) {
  const [registered, setRegistered] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Icon + tag */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-2xl">
          {item.icon}
        </div>
        <div className="flex items-center gap-2">
          {item.tag && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.tagColor}`}>
              {item.tag}
            </span>
          )}
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${formatColors[item.format] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            {item.format}
          </span>
        </div>
      </div>

      {/* Title + category */}
      <p className="text-xs font-semibold text-hx-600 mb-1">{item.category}</p>
      <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{item.description}</p>

      {/* Meta */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Users size={12} className="text-gray-400" />
          {item.audience}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={12} className="text-gray-400" />
          Next: <span className="font-semibold text-gray-700">{item.nextDate}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={12} className="text-gray-400" />
          {item.duration}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => setRegistered(true)}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
          registered
            ? 'bg-green-50 text-green-700 border border-green-200 flex items-center justify-center gap-2'
            : 'bg-hx-600 text-white hover:bg-hx-700'
        }`}
      >
        {registered ? (
          <>
            <CheckCircle size={14} />
            Interest registered!
          </>
        ) : (
          'Register interest'
        )}
      </button>
    </div>
  );
}

export default function InternalLearning() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? internalLearning
    : internalLearning.filter(i => i.category === activeCategory);

  return (
    <section id="internal" className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🏢</span>
            <span className="text-sm font-semibold text-hx-600 uppercase tracking-wide">Internal programmes</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning built for hx, by hx</h2>
          <p className="text-gray-500 text-sm max-w-xl">
            Workshops, training programmes, lunch &amp; learns, and peer communities running across the business. All free, no budget needed.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categoryFilters.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? 'bg-hx-600 text-white border-hx-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-hx-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <InternalCard key={item.id} item={item} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>No programmes in this category right now.</p>
          </div>
        )}
      </div>
    </section>
  );
}
