import { state } from '../state.js';
export function renderTasks() {
    const el = document.getElementById('tab-tasks');
    if (!el) return;
    el.innerHTML = `<h2 class="text-2xl font-bold text-white mb-4">Tarefas & Kanban</h2><div class="space-y-3">${state.tasks.map(t => `<div class="glass-card p-4 rounded-xl flex justify-between items-center"><span>${t.title}</span><span class="text-xs bg-slate-800 px-2 py-1 rounded">${t.status}</span></div>`).join('')}</div>`;
}
