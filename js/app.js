import { resetState } from './state.js';
import { switchTab } from './modules/navigation.js';
import { renderDashboard } from './modules/dashboard.js';
import { renderTasks } from './modules/tasks.js';
import { renderFinances } from './modules/finances.js';
import { renderHabits } from './modules/habits.js';
import { renderNotes } from './modules/notes.js';
import { renderPomodoro } from './modules/pomodoro.js';
import { renderWishlist } from './modules/wishlist.js';

export function renderAll() {
    renderDashboard();
    renderTasks();
    renderFinances();
    renderHabits();
    renderNotes();
    renderPomodoro();
    renderWishlist();
}

window.switchTab = switchTab;
window.resetState = resetState;

document.addEventListener('DOMContentLoaded', () => {
    switchTab('dashboard');
});
