import { resetState } from './state.js';
import { switchTab } from './modules/navigation.js';
import { renderDashboard } from './modules/dashboard.js';
import { renderTasks } from './modules/tasks.js';
import { renderFinances } from './modules/finances.js';
import { renderHabits } from './modules/habits.js';
import { renderNotes } from './modules/notes.js';
import { renderPomodoro } from './modules/pomodoro.js';
import { renderWishlist } from './modules/wishlist.js';
import { openModal } from './modules/modal.js';

// Expor utilitários globais de navegação para botões de atalho
window.switchTab = (tabName) => {
    switchTab(tabName);
    if (tabName === 'dashboard') renderDashboard();
    if (tabName === 'tasks') renderTasks();
    if (tabName === 'finances') renderFinances();
    if (tabName === 'habits') renderHabits();
    if (tabName === 'notes') renderNotes();
    if (tabName === 'pomodoro') renderPomodoro();
    if (tabName === 'wishlist') renderWishlist();
};

window.resetData = resetState;

// Inicialização Principal ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza todas as abas
    renderDashboard();
    renderTasks();
    renderFinances();
    renderHabits();
    renderNotes();
    renderPomodoro();
    renderWishlist();

    // Ativa a aba inicial
    window.switchTab('dashboard');

    // Botão Quick Add no mobile
    const btnQuickAdd = document.getElementById('btn-quick-add');
    if (btnQuickAdd) {
        btnQuickAdd.addEventListener('click', () => {
            openModal('task');
        });
    }
});
