import { appState, saveState } from '../state.js';
import { playChime } from '../utils.js';

let timerInterval = null;

export function renderPomodoro() {
    const container = document.getElementById('tab-pomodoro');
    if (!container) return;

    const minutes = Math.floor(appState.pomodoro.timeLeft / 60).toString().padStart(2, '0');
    const seconds = (appState.pomodoro.timeLeft % 60).toString().padStart(2, '0');

    container.innerHTML = `
        <div class="max-w-xl mx-auto space-y-8 text-center">
            <div>
                <h2 class="text-2xl font-bold text-white">Timer Pomodoro</h2>
                <p class="text-slate-400 text-sm">Mantenha foco total por ciclos de tempo.</p>
            </div>

            <!-- Modos -->
            <div class="flex justify-center gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800 max-w-sm mx-auto">
                <button onclick="setPomoMode('work')" class="flex-1 py-2 text-xs font-semibold rounded-lg transition ${appState.pomodoro.mode === 'work' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}">Foco (25m)</button>
                <button onclick="setPomoMode('shortBreak')" class="flex-1 py-2 text-xs font-semibold rounded-lg transition ${appState.pomodoro.mode === 'shortBreak' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}">Pausa Curta (5m)</button>
                <button onclick="setPomoMode('longBreak')" class="flex-1 py-2 text-xs font-semibold rounded-lg transition ${appState.pomodoro.mode === 'longBreak' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'}">Pausa Longa (15m)</button>
            </div>

            <!-- Display Timer -->
            <div class="relative w-64 h-64 mx-auto flex items-center justify-center bg-slate-900/60 rounded-full border-4 border-slate-800 shadow-2xl">
                <span class="text-6xl font-black text-white font-mono tracking-tight">${minutes}:${seconds}</span>
            </div>

            <!-- Controles -->
            <div class="flex justify-center gap-4">
                <button onclick="togglePomodoroTimer()" class="px-8 py-3 rounded-xl font-bold text-slate-950 ${appState.pomodoro.isRunning ? 'bg-amber-400 hover:bg-amber-300' : 'bg-emerald-500 hover:bg-emerald-400'} transition shadow-lg">
                    ${appState.pomodoro.isRunning ? '<i class="fa-solid fa-pause mr-2"></i>Pausar' : '<i class="fa-solid fa-play mr-2"></i>Iniciar'}
                </button>
                <button onclick="resetPomodoroTimer()" class="px-5 py-3 rounded-xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
                    <i class="fa-solid fa-rotate-right"></i>
                </button>
            </div>
        </div>
    `;
}

window.togglePomodoroTimer = () => {
    appState.pomodoro.isRunning = !appState.pomodoro.isRunning;
    if (appState.pomodoro.isRunning) {
        timerInterval = setInterval(() => {
            if (appState.pomodoro.timeLeft > 0) {
                appState.pomodoro.timeLeft--;
                renderPomodoro();
            } else {
                clearInterval(timerInterval);
                appState.pomodoro.isRunning = false;
                playChime();
                if (appState.pomodoro.mode === 'work') {
                    appState.pomodoro.completedSessions++;
                }
                saveState();
                renderPomodoro();
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
    }
    renderPomodoro();
};

window.resetPomodoroTimer = () => {
    clearInterval(timerInterval);
    appState.pomodoro.isRunning = false;
    setPomoMode(appState.pomodoro.mode);
};

window.setPomoMode = (mode) => {
    appState.pomodoro.mode = mode;
    if (mode === 'work') appState.pomodoro.timeLeft = 25 * 60;
    if (mode === 'shortBreak') appState.pomodoro.timeLeft = 5 * 60;
    if (mode === 'longBreak') appState.pomodoro.timeLeft = 15 * 60;
    saveState();
    renderPomodoro();
};
