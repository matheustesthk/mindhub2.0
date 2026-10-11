import { state } from '../state.js';
export function renderHabits() {
    const el = document.getElementById('tab-habits');
    if (!el) return;
    el.innerHTML = `<h2 class="text-2xl font-bold text-white mb-4">Hábitos</h2><div class="space-y-3">${state.habits.map(h => `<div class="glass-card p-4 rounded-xl"><span>${h.title}</span></div>`).join('')}</div>`;
}
