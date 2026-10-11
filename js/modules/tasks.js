import { appState, saveState } from '../state.js';
import { escapeHtml } from '../utils.js';
import { openModal } from './modal.js';

export function renderTasks() {
    const container = document.getElementById('tab-tasks');
    if (!container) return;

    container.innerHTML = `
        <div class="space-y-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-white">Tarefas & Kanban</h2>
                    <p class="text-slate-400 text-sm">Gerencie suas atividades diárias com facilidade.</p>
                </div>
                <button onclick="openModal('task')" class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-500/10">
                    <i class="fa-solid fa-plus"></i> Nova Tarefa
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- A Fazer -->
                <div class="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div class="flex items-center justify-between text-slate-400 font-semibold text-sm border-b border-slate-800 pb-2">
                        <span><i class="fa-solid fa-circle text-amber-500 text-xs mr-2"></i> A Fazer</span>
                        <span class="bg-slate-800 px-2 py-0.5 rounded text-xs">${appState.tasks.filter(t => t.status === 'pending').length}</span>
                    </div>
                    <div class="space-y-3">
                        ${renderTaskList('pending')}
                    </div>
                </div>

                <!-- Em Progresso -->
                <div class="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div class="flex items-center justify-between text-slate-400 font-semibold text-sm border-b border-slate-800 pb-2">
                        <span><i class="fa-solid fa-circle text-blue-500 text-xs mr-2"></i> Em Progresso</span>
                        <span class="bg-slate-800 px-2 py-0.5 rounded text-xs">${appState.tasks.filter(t => t.status === 'in-progress').length}</span>
                    </div>
                    <div class="space-y-3">
                        ${renderTaskList('in-progress')}
                    </div>
                </div>

                <!-- Concluído -->
                <div class="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div class="flex items-center justify-between text-slate-400 font-semibold text-sm border-b border-slate-800 pb-2">
                        <span><i class="fa-solid fa-circle text-emerald-500 text-xs mr-2"></i> Concluído</span>
                        <span class="bg-slate-800 px-2 py-0.5 rounded text-xs">${appState.tasks.filter(t => t.status === 'completed').length}</span>
                    </div>
                    <div class="space-y-3">
                        ${renderTaskList('completed')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderTaskList(status) {
    const list = appState.tasks.filter(t => t.status === status);
    if (!list.length) return `<p class="text-slate-600 text-xs italic py-4 text-center">Nenhuma tarefa</p>`;

    return list.map(t => `
        <div class="p-4 bg-slate-900/90 rounded-xl border border-slate-800 hover:border-slate-700 transition space-y-2">
            <div class="flex items-start justify-between gap-2">
                <h4 class="font-medium text-slate-200 text-sm ${t.status === 'completed' ? 'line-through text-slate-500' : ''}">${escapeHtml(t.title)}</h4>
                
                <!-- Botões de Ação: Caneta de Edição + Lixeira de Exclusão -->
                <div class="flex items-center gap-1 shrink-0">
                    <button onclick="editTask('${t.id}')" class="p-1 text-slate-400 hover:text-amber-400 transition" title="Editar">
                        <i class="fa-solid fa-pen text-xs"></i>
                    </button>
                    <button onclick="deleteTask('${t.id}')" class="p-1 text-slate-400 hover:text-rose-400 transition" title="Excluir">
                        <i class="fa-solid fa-trash text-xs"></i>
                    </button>
                </div>
            </div>

            <div class="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">${escapeHtml(t.category)}</span>
                <select onchange="changeTaskStatus('${t.id}', this.value)" class="bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5 text-xs text-slate-300">
                    <option value="pending" ${t.status === 'pending' ? 'selected' : ''}>A Fazer</option>
                    <option value="in-progress" ${t.status === 'in-progress' ? 'selected' : ''}>Progresso</option>
                    <option value="completed" ${t.status === 'completed' ? 'selected' : ''}>Concluído</option>
                </select>
            </div>
        </div>
    `).join('');
}

window.editTask = (id) => {
    const task = appState.tasks.find(t => t.id === id);
    if (task) openModal('task', task);
};

window.deleteTask = (id) => {
    if (confirm("Excluir esta tarefa?")) {
        appState.tasks = appState.tasks.filter(t => t.id !== id);
        saveState();
        renderTasks();
    }
};

window.changeTaskStatus = (id, newStatus) => {
    const task = appState.tasks.find(t => t.id === id);
    if (task) {
        task.status = newStatus;
        saveState();
        renderTasks();
    }
};
