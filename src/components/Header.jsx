import { BookOpen, Sparkles, ChevronRight } from 'lucide-react';

export default function Header({ onNavigate }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-hx-600 flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-sm">hx</span>
              <span className="text-gray-400 text-sm mx-1">/</span>
              <span className="font-medium text-gray-700 text-sm">L&D Hub</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: 'Dashboard', id: 'dashboard' },
              { label: 'Inspiration', id: 'inspiration' },
              { label: 'Recommendations', id: 'recommendations' },
              { label: 'Internal', id: 'internal' },
              { label: 'My Plan', id: 'plan' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => onNavigate('plan')}
            className="flex items-center gap-2 bg-hx-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-hx-700 transition-colors"
          >
            <Sparkles size={14} />
            Submit L&D request
          </button>
        </div>
      </div>
    </header>
  );
}
