import { state } from '../state.js';

export function renderDashboard() {
    const container = document.getElementById('tab-dashboard');
    if (!container) return;

    const totalTasks = state.tasks.length;
    const completed = state.tasks.filter(t => t.status === 'completed').length;
    const incomes = state.finances.filter(f => f.type === 'income').reduce((a, b) => a + b.amount, 0);
    const expenses = state.finances.filter(f => f.type === 'expense').reduce((a, b) => a + b.amount, 0);

    container.innerHTML = `
        <h2 class="text-2xl font-bold text-white mb-6">Painel Principal</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div class="glass-card p-5 rounded-2xl">
                <span class="text-xs text-slate-400 font-semibold uppercase">Tarefas Concluídas</span>
                <div class="text-2xl font-bold text-emerald-400 mt-2">${completed}/${totalTasks}</div>
            </div>
            <div class="glass-card p-5 rounded-2xl">
                <span class="text-xs text-slate-400 font-semibold uppercase">Saldo Geral</span>
                <div class="text-2xl font-bold ${incomes - expenses >= 0 ? 'text-emerald-400' : 'text-rose-400'} mt-2">R$ ${(incomes - expenses).toFixed(2)}</div>
            </div>
            <div class="glass-card p-5 rounded-2xl">
                <span class="text-xs text-slate-400 font-semibold uppercase">Pomodoros Concluídos</span>
                <div class="text-2xl font-bold text-amber-400 mt-2">${state.pomodoro.completedSessions} SESSÕES</div>
            </div>
        </div>
    `;
}
