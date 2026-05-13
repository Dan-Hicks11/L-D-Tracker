import { useState, useMemo } from 'react';
import { Search, ExternalLink, Users, Clock, Zap, CheckCircle, SlidersHorizontal, X } from 'lucide-react';
import { recommendations, categories, teamFilters, levelFilters, formatFilters } from '../data/mockData';

const categoryColors = {
  Course: 'bg-hx-50 text-hx-700 border-hx-200',
  Certification: 'bg-amber-50 text-amber-700 border-amber-200',
  Membership: 'bg-purple-50 text-purple-700 border-purple-200',
  Coaching: 'bg-green-50 text-green-700 border-green-200',
  Conference: 'bg-rose-50 text-rose-700 border-rose-200',
  Books: 'bg-orange-50 text-orange-700 border-orange-200',
};

function RecommendationCard({ rec, onAddToPlan }) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAddToPlan({ name: rec.name, cost: rec.cost, category: rec.category, provider: rec.provider });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Top badges */}
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[rec.category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
          {rec.category}
        </span>
        {rec.hxEndorsed && (
          <span className="text-xs font-semibold bg-hx-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={10} />
            hx endorsed
          </span>
        )}
      </div>

      {/* Name + provider */}
      <h3 className="font-bold text-gray-900 text-base mb-0.5">{rec.name}</h3>
      <p className="text-xs text-gray-400 mb-3">{rec.provider}</p>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="font-bold text-gray-800 text-sm">{rec.cost === 0 ? 'Free' : rec.costLabel}</span>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock size={11} className="text-gray-400" />
          {rec.timeCommitment}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <Zap size={11} className="text-gray-400" />
          {rec.level}
        </span>
      </div>

      {/* Why recommended */}
      <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{rec.whyRecommended}</p>

      {/* Teams */}
      <div className="flex flex-wrap gap-1 mb-4">
        {rec.teams.slice(0, 3).map(t => (
          <span key={t} className="text-xs bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full">
            {t}
          </span>
        ))}
        {rec.teams.length > 3 && (
          <span className="text-xs text-gray-400 px-1 self-center">+{rec.teams.length - 3} more</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={handleAdd}
          className={`flex-1 text-xs font-semibold py-2 rounded-xl transition-all ${
            added
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-hx-600 text-white hover:bg-hx-700'
          }`}
        >
          {added ? '✓ Added to plan' : 'Add to my plan'}
        </button>
        <a
          href={rec.link}
          className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors"
          title="View resource"
        >
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Endorsements */}
      {rec.endorsements > 0 && (
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          <Users size={10} />
          {rec.endorsements} hx {rec.endorsements === 1 ? 'person' : 'people'} recommend this
        </p>
      )}
    </div>
  );
}

export default function RecommendationBank({ onAddToPlan }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [team, setTeam] = useState('All Teams');
  const [level, setLevel] = useState('All Levels');
  const [format, setFormat] = useState('Any Format');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return recommendations.filter(r => {
      const qMatch = !query || r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.provider.toLowerCase().includes(query.toLowerCase()) ||
        r.subCategories.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
        r.whyRecommended.toLowerCase().includes(query.toLowerCase());
      const catMatch = category === 'All' || r.category === category;
      const teamMatch = team === 'All Teams' || r.teams.some(t => t === team);
      const lvlMatch = level === 'All Levels' || r.level === level;
      const fmtMatch = format === 'Any Format' || r.format === format;
      return qMatch && catMatch && teamMatch && lvlMatch && fmtMatch;
    });
  }, [query, category, team, level, format]);

  const activeFilterCount = [
    category !== 'All',
    team !== 'All Teams',
    level !== 'All Levels',
    format !== 'Any Format',
  ].filter(Boolean).length;

  function clearFilters() {
    setCategory('All');
    setTeam('All Teams');
    setLevel('All Levels');
    setFormat('Any Format');
    setQuery('');
  }

  return (
    <section id="recommendations" className="border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Search size={18} className="text-hx-500" />
            <span className="text-sm font-semibold text-hx-600 uppercase tracking-wide">Recommendation bank</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore learning opportunities</h2>
          <p className="text-gray-500 text-sm max-w-xl">
            Courses, certs, memberships, coaching and more — curated by hx employees and the People team.
          </p>
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, provider, or topic…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-hx-300 focus:border-transparent placeholder-gray-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'bg-hx-50 border-hx-300 text-hx-700'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-hx-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Category', value: category, setter: setCategory, options: categories },
                { label: 'Team', value: team, setter: setTeam, options: teamFilters },
                { label: 'Level', value: level, setter: setLevel, options: levelFilters },
                { label: 'Format', value: format, setter: setFormat, options: formatFilters },
              ].map(({ label, value, setter, options }) => (
                <div key={label}>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">{label}</label>
                  <select
                    value={value}
                    onChange={e => setter(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-hx-300 text-gray-700"
                  >
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="mt-3 text-xs text-hx-600 font-medium hover:underline">
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Category quick-filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                category === cat
                  ? 'bg-hx-600 text-white border-hx-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-hx-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing {filtered.length} of {recommendations.length} recommendations
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(rec => (
              <RecommendationCard key={rec.id} rec={rec} onAddToPlan={onAddToPlan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p className="font-medium text-gray-600">No results found.</p>
            <p className="text-sm mt-1">Try a different search term or clear your filters.</p>
            <button onClick={clearFilters} className="mt-3 text-sm text-hx-600 hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
