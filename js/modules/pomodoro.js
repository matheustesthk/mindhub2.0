export function renderPomodoro() {
    const el = document.getElementById('tab-pomodoro');
    if (!el) return;
    el.innerHTML = `<h2 class="text-2xl font-bold text-white mb-4 text-center">Timer Pomodoro</h2><div class="text-center text-5xl font-mono py-8">25:00</div>`;
}
