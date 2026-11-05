// js/state.js

let state = loadState();
let activeWishSavingsId = null;

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (!parsed.wishlist) parsed.wishlist = defaultState.wishlist;
            return parsed;
        } catch(e) {
            console.error('Erro ao ler do localStorage:', e);
        }
    }
    return JSON.parse(JSON.stringify(defaultState));
}

function getState() {
    return state;
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (typeof window.refreshUI === 'function') {
        window.refreshUI();
    }
}

function resetState() {
    if (confirm("Tem certeza que deseja resetar todos os dados para o padrão?")) {
        localStorage.removeItem(STORAGE_KEY);
        state = JSON.parse(JSON.stringify(defaultState));
        saveState();
    }
}
