// js/app.js
// Ponto único de inicialização do MindHub 2.1.
// Os módulos são carregados uma vez pelo index.html, antes deste arquivo.

function refreshUI() {
    renderDashboard();
    renderTasks();
    renderFinances();
    renderHabits();
    renderNotes();
    renderWishlist();
    updatePomoUI();
}

window.addEventListener('DOMContentLoaded', () => {
    refreshUI();
});
