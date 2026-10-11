import { appState, saveState } from '../state.js';
import { escapeHtml } from '../utils.js';
import { openModal } from './modal.js';

const daysOfWeek = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

export function renderHabits() {
    const container = document.getElementById('tab-habits');
    if (!container) return;

    container.innerHTML = `
        <div class="space-y-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-white">Rastreador de Hábitos</h2>
                    <p class="text-slate-400 text-sm">Acompanhe sua consistência semanal.</p>
                </div>
                <button onclick="openModal('habit')" class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition flex items-center gap-2">
                    <i class="fa-solid fa-plus"></i> Novo Hábito
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${appState.habits.map(h => `
                    <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-bold text-slate-200">${escapeHtml(h.title)}</h3>
                                <span class="text-xs text-slate-500">${escapeHtml(h.category)}</span>
                            </div>
                            <!-- Botões de Caneta de Edição + Lixeira -->
                            <div class="flex items-center gap-1">
                                <button onclick="editHabit('${h.id}')" class="p-1.5 text-slate-400 hover:text-amber-400 transition" title="Editar">
                                    <i class="fa-solid fa-pen text-xs"></i>
                                </button>
                                <button onclick="deleteHabit('${h.id}')" class="p-1.5 text-slate-400 hover:text-rose-400 transition" title="Excluir">
                                    <i class="fa-solid fa-trash text-xs"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Dias da semana -->
                        <div class="flex justify-between gap-1">
                            ${h.days.map((done, idx) => `
                                <button onclick="toggleHabitDay('${h.id}', ${idx})" class="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition ${done ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-slate-800/80 text-slate-500 hover:bg-slate-700'}">
                                    ${daysOfWeek[idx]}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `).join('') || '<p class="text-slate-500 text-sm">Nenhum hábito cadastrado.</p>'}
            </div>
        </div>
    `;
}

window.toggleHabitDay = (id, dayIndex) => {
    const habit = appState.habits.find(h => h.id === id);
    if (habit) {
        habit.days[dayIndex] = !habit.days[dayIndex];
        saveState();
        renderHabits();
    }
};

window.editHabit = (id) => {
    const item = appState.habits.find(h => h.id === id);
    if (item) openModal('habit', item);
};

window.deleteHabit = (id) => {
    if (confirm("Remover este hábito?")) {
        appState.habits = appState.habits.filter(h => h.id !== id);
        saveState();
        renderHabits();
    }
};
