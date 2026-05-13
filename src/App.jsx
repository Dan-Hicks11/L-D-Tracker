import { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import InspirationBoard from './components/InspirationBoard';
import RecommendationBank from './components/RecommendationBank';
import InternalLearning from './components/InternalLearning';
import LearningPlan from './components/LearningPlan';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 72;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function App() {
  const [planItems, setPlanItems] = useState([]);
  const [planToast, setPlanToast] = useState(null);

  function handleAddToPlan(item) {
    const id = Date.now();
    setPlanItems(prev => [...prev, { ...item, id }]);
    setPlanToast(item.name);
    setTimeout(() => setPlanToast(null), 3000);
  }

  function handleRemoveFromPlan(id) {
    setPlanItems(prev => prev.filter(i => i.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={scrollToSection} />
      <Hero onNavigate={scrollToSection} />
      <Dashboard onNavigate={scrollToSection} onAddToPlan={handleAddToPlan} />
      <InspirationBoard onAddToPlan={handleAddToPlan} />
      <RecommendationBank onAddToPlan={handleAddToPlan} />
      <InternalLearning />
      <LearningPlan planItems={planItems} onRemove={handleRemoveFromPlan} />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-hx-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">hx</span>
            </div>
            <span className="text-sm text-gray-500">Learning &amp; Development Hub</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <span>Questions? Reach out to <strong className="text-gray-500">people@hyperexponential.com</strong></span>
            <span>© 2026 hyperexponential</span>
          </div>
        </div>
      </footer>

      {/* Toast notification */}
      {planToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce-in">
          <span className="text-green-400">✓</span>
          <span className="max-w-xs truncate">"{planToast}" added to your plan</span>
          <button
            onClick={() => scrollToSection('plan')}
            className="ml-2 text-hx-300 hover:text-white text-xs font-semibold whitespace-nowrap"
          >
            View plan →
          </button>
        </div>
      )}
    </div>
  );
}
