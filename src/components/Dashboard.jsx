import { useState } from 'react';
import { PlusCircle, TrendingUp, Wallet, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { personalBudget } from '../data/mockData';

function StatCard({ label, value, sub, color, icon: Icon }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function Dashboard({ onNavigate, onAddToPlan }) {
  const { name, role, annualBudget, spent, items, suggestedNext } = personalBudget;
  const remaining = annualBudget - spent;
  const pct = Math.round((spent / annualBudget) * 100);

  return (
    <section id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Budget Dashboard</h2>
          <p className="text-gray-500 mt-1 text-sm">Hello, {name} · {role} · 2026 budget year</p>
        </div>
        <button
          onClick={() => onNavigate('plan')}
          className="hidden sm:flex items-center gap-2 bg-hx-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-hx-700 transition-colors"
        >
          <PlusCircle size={15} />
          New L&D request
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Annual Budget"
          value={`£${annualBudget.toLocaleString()}`}
          sub="Resets Jan 2027"
          color="bg-hx-50 text-hx-600"
          icon={Wallet}
        />
        <StatCard
          label="Spent So Far"
          value={`£${spent.toLocaleString()}`}
          sub={`${pct}% of your budget used`}
          color="bg-orange-50 text-orange-500"
          icon={TrendingUp}
        />
        <StatCard
          label="Remaining"
          value={`£${remaining.toLocaleString()}`}
          sub="Available to spend"
          color="bg-green-50 text-green-600"
          icon={CheckCircle}
        />
      </div>

      {/* Progress bar + breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Budget tracker */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1">Budget progress</h3>
          <p className="text-sm text-gray-400 mb-5">
            £{spent} spent of £{annualBudget} · £{remaining} remaining
          </p>

          <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-hx-500 to-hx-400 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mb-6">
            <span>£0</span>
            <span className="font-medium text-hx-600">{pct}% used</span>
            <span>£{annualBudget.toLocaleString()}</span>
          </div>

          <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent spend</h4>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.category} · {item.date}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700 shrink-0">£{item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested next steps */}
        <div className="lg:col-span-2 bg-gradient-to-br from-hx-50 to-hx-100 rounded-2xl p-6 border border-hx-200">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={16} className="text-hx-600" />
            <h3 className="font-semibold text-gray-900 text-sm">Ideas for your remaining £{remaining}</h3>
          </div>
          <div className="space-y-3">
            {suggestedNext.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-3 border border-hx-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-800 flex-1 min-w-0 pr-2">{item.name}</p>
                  <span className="text-sm font-semibold text-hx-700 shrink-0">£{item.cost}</span>
                </div>
                <button
                  onClick={() => onAddToPlan({ name: item.name, cost: item.cost, category: 'Course', provider: '' })}
                  className="mt-2 text-xs text-hx-600 font-medium flex items-center gap-1 hover:text-hx-800 transition-colors"
                >
                  Add to my plan <ArrowRight size={11} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('recommendations')}
            className="mt-4 w-full text-center text-sm text-hx-600 font-semibold hover:text-hx-800 transition-colors"
          >
            Browse all recommendations →
          </button>
        </div>
      </div>
    </section>
  );
}
