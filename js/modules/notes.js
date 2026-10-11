import { state } from '../state.js';
export function renderNotes() {
    const el = document.getElementById('tab-notes');
    if (!el) return;
    el.innerHTML = `<h2 class="text-2xl font-bold text-white mb-4">Notas & Ideias</h2><div class="space-y-3">${state.notes.map(n => `<div class="glass-card p-4 rounded-xl"><h3 class="font-bold">${n.title}</h3><p class="text-sm text-slate-400 mt-1">${n.content}</p></div>`).join('')}</div>`;
}
