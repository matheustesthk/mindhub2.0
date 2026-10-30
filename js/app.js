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
   RENDERIZA TODAS AS SEÇÕES
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
   INICIALIZA SIDEBAR
========================================= */

function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebar-toggle');

    // Verifica se os elementos existem no HTML
    if (!sidebar || !toggleButton) {
        console.error(
            'Erro: Sidebar ou botão de recolher não encontrado no HTML.'
        );

        return;
    }

    // Configura o estado inicial
    sidebar.classList.remove('sidebar-collapsed');

    sidebar.style.width = '256px';
    sidebar.style.minWidth = '256px';
    sidebar.style.flexBasis = '256px';

    toggleButton.setAttribute('aria-label', 'Recolher menu');
    toggleButton.setAttribute('title', 'Recolher menu');
    toggleButton.setAttribute('aria-expanded', 'true');

    // Evento de clique
    toggleButton.addEventListener('click', function () {
        const isCollapsed = sidebar.classList.toggle(
            'sidebar-collapsed'
        );

        // Ajusta a largura da sidebar
        if (isCollapsed) {
            sidebar.style.width = '80px';
            sidebar.style.minWidth = '80px';
            sidebar.style.flexBasis = '80px';
        } else {
            sidebar.style.width = '256px';
            sidebar.style.minWidth = '256px';
            sidebar.style.flexBasis = '256px';
        }

        // Atualiza acessibilidade e descrição do botão
        const buttonLabel = isCollapsed
            ? 'Expandir menu'
            : 'Recolher menu';

        toggleButton.setAttribute('aria-label', buttonLabel);
        toggleButton.setAttribute('title', buttonLabel);
        toggleButton.setAttribute(
            'aria-expanded',
            String(!isCollapsed)
        );

        console.log(
            isCollapsed
                ? 'Sidebar recolhida'
                : 'Sidebar expandida'
        );
    });
}


/* =========================================
   DISPONIBILIZA FUNÇÕES PARA O HTML
========================================= */

window.switchTab = switchTab;
window.resetState = resetState;


/* =========================================
   INICIALIZAÇÃO DO MINDHUB
========================================= */

document.addEventListener('DOMContentLoaded', function () {
    // Abre o Dashboard inicialmente
    switchTab('dashboard');

    // Ativa o botão da sidebar
    initializeSidebar();
});
