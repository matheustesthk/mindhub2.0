
import { state } from '../state.js';

export function renderDashboard() {
    const container = document.getElementById('tab-dashboard');
    if (!container) return;

    // Resumo das tarefas
    const totalTasks = state.tasks.length;
    const completed = state.tasks.filter(
        task => task.status === 'completed'
    ).length;

    const pending = totalTasks - completed;

    // Resumo financeiro
    const incomes = state.finances
        .filter(item => item.type === 'income')
        .reduce((total, item) => total + item.amount, 0);

    const expenses = state.finances
        .filter(item => item.type === 'expense')
        .reduce((total, item) => total + item.amount, 0);

    const balance = incomes - expenses;

    // Pomodoros
    const pomodoros = state.pomodoro.completedSessions;

    // Saudação conforme o horário
    const hour = new Date().getHours();

    let greeting = 'Boa noite';

    if (hour >= 5 && hour < 12) {
        greeting = 'Bom dia';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Boa tarde';
    }

    // Data atual
    const today = new Date();

    const formattedDate = today.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Formatação de moeda
    const currency = value =>
        value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

    container.innerHTML = `
        <!-- Cabeçalho do Dashboard -->
        <header class="mb-8">
            <p class="text-sm text-slate-400 capitalize mb-2">
                ${formattedDate}
            </p>

            <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                ${greeting}! 👋
            </h2>

            <p class="text-slate-400 mt-2">
                Aqui está o resumo da sua vida hoje.
            </p>
        </header>

        <!-- Cards de resumo -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

            <!-- Card de tarefas -->
            <div class="glass-card p-6 rounded-2xl">
                <div class="flex items-center justify-between mb-5">
                    <div>
                        <p class="text-sm text-slate-400">
                            Tarefas concluídas
                        </p>

                        <h3 class="text-3xl font-bold text-white mt-2">
                            ${completed}
                            <span class="text-lg text-slate-500">
                                / ${totalTasks}
                            </span>
                        </h3>
                    </div>

                    <div class="w-12 h-12 rounded-xl bg-emerald-500/10
                                flex items-center justify-center">
                        <i class="fa-solid fa-list-check
                                  text-emerald-400 text-xl"></i>
                    </div>
                </div>

                <div class="w-full bg-slate-800 rounded-full h-2">
                    <div
                        class="bg-emerald-400 h-2 rounded-full transition-all"
                        style="width: ${
                            totalTasks > 0
                                ? (completed / totalTasks) * 100
                                : 0
                        }%"
                    ></div>
                </div>

                <p class="text-xs text-slate-500 mt-3">
                    ${pending} tarefa(s) pendente(s)
                </p>
            </div>

            <!-- Card financeiro -->
            <div class="glass-card p-6 rounded-2xl">
                <div class="flex items-center justify-between mb-5">
                    <div>
                        <p class="text-sm text-slate-400">
                            Saldo geral
                        </p>

                        <h3 class="text-2xl sm:text-3xl font-bold mt-2
                            ${balance >= 0
                                ? 'text-emerald-400'
                                : 'text-rose-400'}">
                            ${currency(balance)}
                        </h3>
                    </div>

                    <div class="w-12 h-12 rounded-xl bg-sky-500/10
                                flex items-center justify-center">
                        <i class="fa-solid fa-wallet
                                  text-sky-400 text-xl"></i>
                    </div>
                </div>

                <div class="flex justify-between gap-3 text-xs">
                    <span class="text-emerald-400">
                        <i class="fa-solid fa-arrow-up mr-1"></i>
                        ${currency(incomes)}
                    </span>

                    <span class="text-rose-400">
                        <i class="fa-solid fa-arrow-down mr-1"></i>
                        ${currency(expenses)}
                    </span>
                </div>
            </div>

            <!-- Card Pomodoro -->
            <div class="glass-card p-6 rounded-2xl">
                <div class="flex items-center justify-between mb-5">
                    <div>
                        <p class="text-sm text-slate-400">
                            Pomodoros concluídos
                        </p>

                        <h3 class="text-3xl font-bold text-amber-400 mt-2">
                            ${pomodoros}
                        </h3>
                    </div>

                    <div class="w-12 h-12 rounded-xl bg-amber-500/10
                                flex items-center justify-center">
                        <i class="fa-solid fa-stopwatch
                                  text-amber-400 text-xl"></i>
                    </div>
                </div>

                <p class="text-xs text-slate-500">
                    Sessões de foco concluídas
                </p>
            </div>

        </div>
    `;
}
