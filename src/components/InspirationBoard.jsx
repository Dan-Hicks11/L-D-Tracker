import { useState } from 'react';
import { Star, ThumbsUp, Filter } from 'lucide-react';
import { inspirationCards } from '../data/mockData';

const allTeams = ['All', 'Product', 'Sales', 'Engineering', 'Actuarial', 'People', 'Data', 'Customer Success'];
const allCategories = ['All', 'Course', 'Certification', 'Membership', 'Coaching', 'Conference'];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          className={i <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  );
}

function InspirationCard({ card, onAddToPlan }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl ${card.avatarColor} text-white text-sm font-bold flex items-center justify-center shrink-0`}>
          {card.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 text-sm">{card.name}</p>
          <p className="text-xs text-gray-500">{card.role}</p>
          <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${card.teamColor}`}>
            {card.team}
          </span>
        </div>
        {card.rating === 5 && (
          <span className="shrink-0 text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <ThumbsUp size={10} />
            Top pick
          </span>
        )}
      </div>

      {/* Used for */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4">
        <p className="text-xs font-medium text-gray-400 mb-1">Used budget for</p>
        <p className="text-sm font-semibold text-gray-800">{card.used}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs bg-white border border-gray-200 text-gray-600 font-medium px-2 py-0.5 rounded-full">
            {card.category}
          </span>
          <span className="text-sm font-bold text-gray-700">
            {card.cost === 0 ? 'Free' : `£${card.cost}`}
          </span>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-sm text-gray-600 italic leading-relaxed mb-4 flex-1">
        "{card.quote}"
      </blockquote>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <StarRating rating={card.rating} />
        <button
          onClick={() => onAddToPlan({ name: card.used, cost: card.cost, category: card.category, provider: '' })}
          className="text-xs font-semibold text-hx-600 hover:text-hx-800 transition-colors"
        >
          Add to my plan →
        </button>
      </div>
    </div>
  );
}

export default function InspirationBoard({ onAddToPlan }) {
  const [activeTeam, setActiveTeam] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = inspirationCards.filter(card => {
    const teamMatch = activeTeam === 'All' || card.team === activeTeam;
    const catMatch = activeCategory === 'All' || card.category === activeCategory;
    return teamMatch && catMatch;
  });

  return (
    <section id="inspiration" className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <ThumbsUp size={18} className="text-hx-500" />
            <span className="text-sm font-semibold text-hx-600 uppercase tracking-wide">Inspiration board</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How people at hx use their L&D budget</h2>
          <p className="text-gray-500 text-sm max-w-xl">
            Real examples from across the team. Browse for ideas, or add something you like to your own plan.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
              <Filter size={12} /> Team:
            </span>
            {allTeams.map(t => (
              <button
                key={t}
                onClick={() => setActiveTeam(t)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  activeTeam === t
                    ? 'bg-hx-600 text-white border-hx-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-hx-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-gray-500">Type:</span>
            {allCategories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  activeCategory === c
                    ? 'bg-hx-600 text-white border-hx-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-hx-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map(card => (
              <InspirationCard key={card.id} card={card} onAddToPlan={onAddToPlan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p className="font-medium">No examples match those filters.</p>
            <button
              onClick={() => { setActiveTeam('All'); setActiveCategory('All'); }}
              className="mt-2 text-sm text-hx-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
