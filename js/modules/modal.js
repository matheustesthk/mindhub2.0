import { appState, saveState } from '../state.js';
import { generateId } from '../utils.js';

import { renderTasks } from './tasks.js';
import { renderFinances } from './finances.js';
import { renderHabits } from './habits.js';
import { renderNotes } from './notes.js';
import { renderWishlist } from './wishlist.js';

export function openModal(type, data = null) {
    const modal = document.getElementById('app-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    let html = '';

    if (type === 'task') {
        html = `
            <h3 class="text-lg font-bold text-white mb-4">${data ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
            <form id="form-task" class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-400 mb-1">Título</label>
                    <input type="text" id="task-title" value="${data ? data.title : ''}" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-400 mb-1">Categoria</label>
                        <input type="text" id="task-cat" value="${data ? data.category : 'Geral'}" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-400 mb-1">Status</label>
                        <select id="task-status" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                            <option value="pending" ${data && data.status === 'pending' ? 'selected' : ''}>A Fazer</option>
                            <option value="in-progress" ${data && data.status === 'in-progress' ? 'selected' : ''}>Em Progresso</option>
                            <option value="completed" ${data && data.status === 'completed' ? 'selected' : ''}>Concluído</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="w-full py-3 bg-emerald-500 font-bold text-slate-950 rounded-xl hover:bg-emerald-400 transition">Salvar</button>
            </form>
        `;
    } else if (type === 'finance') {
        html = `
            <h3 class="text-lg font-bold text-white mb-4">${data ? 'Editar Transação' : 'Nova Transação'}</h3>
            <form id="form-finance" class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-400 mb-1">Descrição</label>
                    <input type="text" id="fin-title" value="${data ? data.title : ''}" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-400 mb-1">Valor (R$)</label>
                        <input type="number" step="0.01" id="fin-amount" value="${data ? data.amount : ''}" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-400 mb-1">Tipo</label>
                        <select id="fin-type" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                            <option value="income" ${data && data.type === 'income' ? 'selected' : ''}>Receita (+)</option>
                            <option value="expense" ${data && data.type === 'expense' ? 'selected' : ''}>Despesa (-)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="w-full py-3 bg-emerald-500 font-bold text-slate-950 rounded-xl hover:bg-emerald-400 transition">Salvar</button>
            </form>
        `;
    } else if (type === 'wish') {
        html = `
            <h3 class="text-lg font-bold text-white mb-4">${data ? 'Editar Desejo' : 'Novo Desejo'}</h3>
            <form id="form-wish" class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-400 mb-1">Nome do Item</label>
                    <input type="text" id="wish-title" value="${data ? data.title : ''}" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-semibold text-slate-400 mb-1">Já Economizado (R$)</label>
                        <input type="number" step="0.01" id="wish-saved" value="${data ? data.saved : '0'}" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-400 mb-1">Valor Total (R$)</label>
                        <input type="number" step="0.01" id="wish-total" value="${data ? data.total : ''}" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                    </div>
                </div>
                <button type="submit" class="w-full py-3 bg-emerald-500 font-bold text-slate-950 rounded-xl hover:bg-emerald-400 transition">Salvar Meta</button>
            </form>
        `;
    } else if (type === 'habit') {
        html = `
            <h3 class="text-lg font-bold text-white mb-4">${data ? 'Editar Hábito' : 'Novo Hábito'}</h3>
            <form id="form-habit" class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-400 mb-1">Nome do Hábito</label>
                    <input type="text" id="habit-title" value="${data ? data.title : ''}" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-400 mb-1">Categoria</label>
                    <input type="text" id="habit-cat" value="${data ? data.category : 'Geral'}" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                </div>
                <button type="submit" class="w-full py-3 bg-emerald-500 font-bold text-slate-950 rounded-xl hover:bg-emerald-400 transition">Salvar Hábito</button>
            </form>
        `;
    } else if (type === 'note') {
        html = `
            <h3 class="text-lg font-bold text-white mb-4">${data ? 'Editar Nota' : 'Nova Nota'}</h3>
            <form id="form-note" class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-400 mb-1">Título</label>
                    <input type="text" id="note-title" value="${data ? data.title : ''}" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-400 mb-1">Conteúdo</label>
                    <textarea id="note-content" rows="4" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100">${data ? data.content : ''}</textarea>
                </div>
                <button type="submit" class="w-full py-3 bg-emerald-500 font-bold text-slate-950 rounded-xl hover:bg-emerald-400 transition">Salvar Anotação</button>
            </form>
        `;
    }

    content.innerHTML = html;
    modal.classList.remove('hidden');

    // Bind Form Submit
    const form = content.querySelector('form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            if (type === 'task') {
                if (data) {
                    data.title = document.getElementById('task-title').value;
                    data.category = document.getElementById('task-cat').value;
                    data.status = document.getElementById('task-status').value;
                } else {
                    appState.tasks.push({
                        id: generateId(),
                        title: document.getElementById('task-title').value,
                        category: document.getElementById('task-cat').value,
                        status: document.getElementById('task-status').value,
                        priority: 'medium'
                    });
                }
                renderTasks();
            } else if (type === 'finance') {
                if (data) {
                    data.title = document.getElementById('fin-title').value;
                    data.amount = parseFloat(document.getElementById('fin-amount').value);
                    data.type = document.getElementById('fin-type').value;
                } else {
                    appState.finances.push({
                        id: generateId(),
                        title: document.getElementById('fin-title').value,
                        amount: parseFloat(document.getElementById('fin-amount').value),
                        type: document.getElementById('fin-type').value,
                        category: 'Geral',
                        date: new Date().toISOString().split('T')[0]
                    });
                }
                renderFinances();
            } else if (type === 'wish') {
                if (data) {
                    data.title = document.getElementById('wish-title').value;
                    data.saved = parseFloat(document.getElementById('wish-saved').value || '0');
                    data.total = parseFloat(document.getElementById('wish-total').value);
                } else {
                    appState.wishlist.push({
                        id: generateId(),
                        title: document.getElementById('wish-title').value,
                        saved: parseFloat(document.getElementById('wish-saved').value || '0'),
                        total: parseFloat(document.getElementById('wish-total').value),
                        category: 'Geral',
                        status: 'pending'
                    });
                }
                renderWishlist();
            } else if (type === 'habit') {
                if (data) {
                    data.title = document.getElementById('habit-title').value;
                    data.category = document.getElementById('habit-cat').value;
                } else {
                    appState.habits.push({
                        id: generateId(),
                        title: document.getElementById('habit-title').value,
                        category: document.getElementById('habit-cat').value,
                        days: [false, false, false, false, false, false, false]
                    });
                }
                renderHabits();
            } else if (type === 'note') {
                if (data) {
                    data.title = document.getElementById('note-title').value;
                    data.content = document.getElementById('note-content').value;
                    data.updatedAt = new Date().toISOString().split('T')[0];
                } else {
                    appState.notes.push({
                        id: generateId(),
                        title: document.getElementById('note-title').value,
                        content: document.getElementById('note-content').value,
                        updatedAt: new Date().toISOString().split('T')[0]
                    });
                }
                renderNotes();
            }
            saveState();
            closeModal();
        };
    }
}

export function closeModal() {
    const modal = document.getElementById('app-modal');
    if (modal) modal.classList.add('hidden');
}

window.openModal = openModal;
window.closeModal = closeModal;
