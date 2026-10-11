import { state } from '../state.js';
export function renderFinances() {
    const el = document.getElementById('tab-finances');
    if (!el) return;
    el.innerHTML = `<h2 class="text-2xl font-bold text-white mb-4">Financeiro</h2><div class="space-y-3">${state.finances.map(f => `<div class="glass-card p-4 rounded-xl flex justify-between items-center"><span>${f.title}</span><span class="font-bold ${f.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}">R$ ${f.amount.toFixed(2)}</span></div>`).join('')}</div>`;
}
