
import { resetState } from './state.js';

import { switchTab } from './modules/navigation.js';

import { renderDashboard } from './modules/dashboard.js';
import { renderTasks } from './modules/tasks.js';
import { renderFinances } from './modules/finances.js';
import { renderHabits } from './modules/habits.js';
import { renderNotes } from './modules/notes.js';
import { renderPomodoro } from './modules/pomodoro.js';
import { renderWishlist } from './modules/wishlist.js';


/* =========================================
   RENDERIZAÇÃO DOS MÓDULOS
   ========================================= */

export function renderAll() {
    renderDashboard();

    renderTasks();

    renderFinances();

    renderHabits();

    renderNotes();

    renderPomodoro();

    renderWishlist();
}


/* =========================================
   FUNÇÕES GLOBAIS
   ========================================= */

window.switchTab = switchTab;

window.resetState = resetState;


/* =========================================
   SIDEBAR - RECOLHER E EXPANDIR
   ========================================= */

function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');

    const toggleButton = document.getElementById('sidebar-toggle');

    // Verifica se os elementos existem
    if (!sidebar || !toggleButton) {
        return;
    }

    // Alterna entre recolher e expandir
    toggleButton.addEventListener('click', () => {
        const isCollapsed = sidebar.classList.toggle(
            'sidebar-collapsed'
        );

        // Atualiza o texto de acessibilidade
        const buttonLabel = isCollapsed
            ? 'Expandir menu'
            : 'Recolher menu';

        toggleButton.setAttribute(
            'aria-label',
            buttonLabel
        );

        toggleButton.setAttribute(
            'title',
            buttonLabel
        );

        // Atualiza o estado do botão
        toggleButton.setAttribute(
            'aria-expanded',
            String(!isCollapsed)
        );
    });
}


/* =========================================
   INICIALIZAÇÃO DO MINDHUB
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // Inicializa a navegação
    switchTab('dashboard');

    // Inicializa o botão da Sidebar
    initializeSidebar();

});
