import { appState } from '../state.js';
import { formatCurrency } from '../utils.js';

let chartInstance = null;

export function renderDashboard() {
    const container = document.getElementById('tab-dashboard');
    if (!container) return;

    // Métricas calculadas
    const totalTasks = appState.tasks.length;
    const completedTasks = appState.tasks.filter(t => t.status === 'completed').length;
    const tasksPerc = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const incomes = appState.finances.filter(f => f.type === 'income').reduce((acc, f) => acc + f.amount, 0);
    const expenses = appState.finances.filter(f => f.type === 'expense').reduce((acc, f) => acc + f.amount, 0);
    const balance = incomes - expenses;

    const totalWishlistSaved = appState.wishlist.reduce((acc, w) => acc + w.saved, 0);
    const totalWishlistTarget = appState.wishlist.reduce((acc, w) => acc + w.total, 0);

    container.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-white tracking-tight">Painel Principal</h2>
                    <p class="text-slate-400 text-sm">Resumo consolidado do seu ecossistema pessoal.</p>
                </div>
            </div>

            <!-- Cards de Métricas -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="glass-card p-5 rounded-2xl border border-slate-800">
                    <div class="flex items-center justify-between text-slate-400 mb-2">
                        <span class="text-xs font-semibold uppercase">Tarefas Concluídas</span>
                        <i class="fa-solid fa-circle-check text-emerald-400"></i>
                    </div>
                    <div class="text-2xl font-bold text-white">${completedTasks}/${totalTasks}</div>
                    <div class="text-xs text-emerald-400 mt-1">${tasksPerc}% concluído</div>
                </div>

                <div class="glass-card p-5 rounded-2xl border border-slate-800">
                    <div class="flex items-center justify-between text-slate-400 mb-2">
                        <span class="text-xs font-semibold uppercase">Saldo Geral</span>
                        <i class="fa-solid fa-wallet text-teal-400"></i>
                    </div>
                    <div class="text-2xl font-bold ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}">${formatCurrency(balance)}</div>
                    <div class="text-xs text-slate-400 mt-1">Receitas vs Despesas</div>
                </div>

                <div class="glass-card p-5 rounded-2xl border border-slate-800">
                    <div class="flex items-center justify-between text-slate-400 mb-2">
                        <span class="text-xs font-semibold uppercase">Pomodoros Hoje</span>
                        <i class="fa-solid fa-fire text-amber-400"></i>
                    </div>
                    <div class="text-2xl font-bold text-white">${appState.pomodoro.completedSessions} SESSÕES</div>
                    <div class="text-xs text-amber-400 mt-1">Foco acumulado</div>
                </div>

                <div class="glass-card p-5 rounded-2xl border border-slate-800">
                    <div class="flex items-center justify-between text-slate-400 mb-2">
                        <span class="text-xs font-semibold uppercase">Metas / Wishlist</span>
                        <i class="fa-solid fa-wand-magic-sparkles text-purple-400"></i>
                    </div>
                    <div class="text-2xl font-bold text-white">${formatCurrency(totalWishlistSaved)}</div>
                    <div class="text-xs text-purple-400 mt-1">de ${formatCurrency(totalWishlistTarget)} investidos</div>
                </div>
            </div>

            <!-- Gráfico + Bloco de Hábitos Rápido -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-800">
                    <h3 class="font-bold text-white mb-4 text-base">Balanço Financeiro Mensal</h3>
                    <div class="h-64">
                        <canvas id="dashboardChart"></canvas>
                    </div>
                </div>

                <div class="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-white mb-4 text-base">Próximas Metas da Wishlist</h3>
                        <div class="space-y-3">
                            ${appState.wishlist.slice(0, 3).map(w => `
                                <div class="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                                    <div class="flex justify-between text-xs mb-1">
                                        <span class="font-medium text-slate-200">${w.title}</span>
                                        <span class="text-emerald-400 font-semibold">${formatCurrency(w.saved)}</span>
                                    </div>
                                    <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full" style="width: ${Math.min(100, Math.round((w.saved / w.total) * 100))}%"></div>
                                    </div>
                                </div>
                            `).join('') || '<p class="text-slate-500 text-sm">Nenhuma meta cadastrada.</p>'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    renderChart(incomes, expenses);
}

function renderChart(incomes, expenses) {
    const ctx = document.getElementById('dashboardChart');
    if (!ctx) return;

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Entradas / Receitas', 'Saídas / Despesas'],
            datasets: [{
                data: [incomes, expenses],
                backgroundColor: ['#10b981', '#f43f5e'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { ticks: { color: '#64748b' }, grid: { display: false } }
            }
        }
    });
}
