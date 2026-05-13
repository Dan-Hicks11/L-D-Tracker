import { useState } from 'react';
import { Trash2, Send, PlusCircle, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { personalBudget } from '../data/mockData';

const emptyForm = { name: '', provider: '', category: 'Course', cost: '' };

const categoryOptions = ['Course', 'Certification', 'Membership', 'Coaching', 'Conference', 'Books', 'Other'];

export default function LearningPlan({ planItems, onRemove }) {
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [localItems, setLocalItems] = useState([]);

  const allItems = [...planItems, ...localItems];
  const total = allItems.reduce((sum, i) => sum + Number(i.cost || 0), 0);
  const remaining = personalBudget.annualBudget - personalBudget.spent;
  const overBudget = total > remaining;

  function handleAdd(e) {
    e.preventDefault();
    if (!form.name || !form.cost) return;
    setLocalItems(prev => [...prev, { ...form, id: Date.now() }]);
    setForm(emptyForm);
    setShowForm(false);
  }

  function handleRemoveLocal(id) {
    setLocalItems(prev => prev.filter(i => i.id !== id));
  }

  function handleSubmit() {
    if (allItems.length === 0) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="plan" className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Request submitted!</h2>
            <p className="text-gray-500 mb-6">
              Your L&D request has been sent for review. Your line manager and the People team will be in touch within 5 working days.
            </p>
            <div className="bg-gray-50 rounded-2xl p-5 text-left mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">What you requested:</h3>
              <div className="space-y-2">
                {allItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-semibold text-gray-800">{Number(item.cost) === 0 ? 'Free' : `£${item.cost}`}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200 mt-2">
                  <span>Total</span>
                  <span className="text-hx-700">£{total}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm text-hx-600 font-medium hover:underline"
            >
              ← Back to learning plan
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="plan" className="border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-hx-500" />
            <span className="text-sm font-semibold text-hx-600 uppercase tracking-wide">My learning plan</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Build your 2026 learning plan</h2>
          <p className="text-gray-500 text-sm max-w-xl">
            Add courses, certifications, and other learning to your plan, then submit for approval in one go. Your remaining budget is <strong className="text-gray-700">£{remaining}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plan items */}
          <div className="lg:col-span-2 space-y-3">
            {allItems.length === 0 && (
              <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 p-10 text-center">
                <p className="text-gray-400 text-sm font-medium mb-2">Your plan is empty</p>
                <p className="text-gray-400 text-xs mb-4">
                  Add items from the recommendation bank, inspiration board, or manually below.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 text-sm text-hx-600 font-semibold hover:text-hx-800 transition-colors"
                >
                  <PlusCircle size={16} />
                  Add item manually
                </button>
              </div>
            )}

            {allItems.map((item, idx) => {
              const isLocal = localItems.some(l => l.id === item.id);
              return (
                <div key={item.id || idx} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.provider && (
                        <span className="text-xs text-gray-400">{item.provider}</span>
                      )}
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{item.category}</span>
                    </div>
                  </div>
                  <span className="font-bold text-gray-800 text-sm shrink-0">
                    {Number(item.cost) === 0 ? 'Free' : `£${item.cost}`}
                  </span>
                  <button
                    onClick={() => isLocal ? handleRemoveLocal(item.id) : onRemove(item.id || idx)}
                    className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })}

            {/* Add manual item */}
            {showForm ? (
              <form onSubmit={handleAdd} className="bg-white rounded-2xl p-5 border border-hx-200 shadow-sm space-y-3">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Add item</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Name (e.g. AWS Solutions Architect cert)"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      required
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hx-300"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Provider (optional)"
                    value={form.provider}
                    onChange={e => setForm(f => ({ ...f, provider: e.target.value }))}
                    className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hx-300"
                  />
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hx-300 text-gray-700"
                  >
                    {categoryOptions.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <input
                    type="number"
                    placeholder="Cost in £ (0 if free)"
                    value={form.cost}
                    onChange={e => setForm(f => ({ ...f, cost: e.target.value }))}
                    required
                    min="0"
                    className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hx-300"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button type="submit" className="flex-1 bg-hx-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-hx-700 transition-colors">
                    Add to plan
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              allItems.length > 0 && (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-3 rounded-2xl border border-dashed border-gray-300 text-sm text-gray-400 font-medium hover:border-hx-300 hover:text-hx-600 transition-colors flex items-center justify-center gap-2"
                >
                  <PlusCircle size={15} />
                  Add another item
                </button>
              )
            )}
          </div>

          {/* Summary sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Plan summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Items in plan</span>
                  <span className="font-semibold text-gray-800">{allItems.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Estimated total</span>
                  <span className={`font-bold ${overBudget ? 'text-red-500' : 'text-gray-800'}`}>£{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Remaining budget</span>
                  <span className="font-semibold text-gray-800">£{remaining}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-sm">
                  <span className="text-gray-500">Budget after approval</span>
                  <span className={`font-bold ${remaining - total < 0 ? 'text-red-500' : 'text-green-600'}`}>
                    £{remaining - total}
                  </span>
                </div>
              </div>

              {/* Budget bar */}
              {total > 0 && (
                <div className="mb-5">
                  <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                        overBudget ? 'bg-red-400' : 'bg-hx-500'
                      }`}
                      style={{ width: `${Math.min((total / remaining) * 100, 100)}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-1.5 ${overBudget ? 'text-red-500' : 'text-gray-400'}`}>
                    {overBudget
                      ? `£${total - remaining} over budget`
                      : `£${remaining - total} remaining after this plan`
                    }
                  </p>
                </div>
              )}

              {overBudget && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                  <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-red-600">
                    This plan exceeds your remaining budget. You can still submit — your manager will review the request.
                  </p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={allItems.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-hx-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-hx-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                Request approval
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">
                Sent to your line manager for review
              </p>
            </div>

            {/* Tips */}
            <div className="bg-hx-50 rounded-2xl p-4 border border-hx-100">
              <p className="text-xs font-semibold text-hx-700 mb-2">💡 Quick tips</p>
              <ul className="text-xs text-hx-700 space-y-1.5 list-disc list-inside">
                <li>Requests are usually approved within 5 working days</li>
                <li>Include a note on how this links to your role or development goals</li>
                <li>Unused budget doesn't roll over — use it before Dec 2026</li>
                <li>Internal programmes are always free — no approval needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
