// js/theme.js
const THEME_STORAGE_KEY = 'mindhub_theme';

function applyTheme(theme) {
    const selectedTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.classList.toggle('light', selectedTheme === 'light');
    document.documentElement.classList.toggle('dark', selectedTheme === 'dark');
    try {
        localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
    } catch (error) {
        console.warn('Não foi possível salvar a preferência de tema:', error);
    }

    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-toggle-icon');
    const label = document.getElementById('theme-toggle-label');
    if (toggle) {
        toggle.setAttribute('aria-pressed', String(selectedTheme === 'light'));
        toggle.setAttribute('aria-label', selectedTheme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    }
    if (icon) icon.className = selectedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    if (label) label.textContent = selectedTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
}

function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    applyTheme(nextTheme);
}

(function initializeTheme() {
    let savedTheme = 'dark';
    try {
        savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
    } catch (error) {
        console.warn('Não foi possível ler a preferência de tema:', error);
    }
    applyTheme(savedTheme);
})();
