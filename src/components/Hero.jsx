import { ArrowRight, Compass } from 'lucide-react';

export default function Hero({ onNavigate }) {
  return (
    <div className="bg-gradient-to-br from-hx-600 via-hx-700 to-hx-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Your 2026 L&D budget is live — £1,500 available
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            hx Learning &amp; Development Hub
          </h1>
          <p className="text-hx-200 text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-2xl">
            Explore how your L&D budget can help you grow, learn, and build new skills.
            Browse what your colleagues are doing, find your next course, or build your learning plan.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('plan')}
              className="flex items-center gap-2 bg-white text-hx-700 font-semibold px-6 py-3 rounded-xl hover:bg-hx-50 transition-colors shadow-lg shadow-hx-900/30"
            >
              Submit L&D request
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('recommendations')}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              <Compass size={16} />
              Browse recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
