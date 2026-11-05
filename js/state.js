// Chave utilizada para salvar os dados no navegador
const STORAGE_KEY = 'mindhub_data_v2';

// Estado padrão inicial do aplicativo (caso o usuário não tenha dados salvos)
const defaultState = {
    tasks: [],
    finances: {
        transactions: [],
        balance: 0
    },
    habits: [],
    notes: [],
    wishlist: [],
    pomodoro: {
        timeSelected: 1500,
        timeLeft: 1500,
        isRunning: false,
        mode: 'work'
    }
};

// Variáveis de controle de estado
let state = loadState();
export let activeWishSavingsId = null;

// Função interna para carregar os dados do LocalStorage
function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Garante que todas as propriedades obrigatórias existam
            if (!parsed.tasks) parsed.tasks = defaultState.tasks;
            if (!parsed.finances) parsed.finances = defaultState.finances;
            if (!parsed.habits) parsed.habits = defaultState.habits;
            if (!parsed.notes) parsed.notes = defaultState.notes;
            if (!parsed.wishlist) parsed.wishlist = defaultState.wishlist;
            return parsed;
        } catch(e) {
            console.error('Erro ao ler do localStorage:', e);
        }
    }
    return JSON.parse(JSON.stringify(defaultState));
}

// Retorna o estado atual (usado pelos módulos para renderizar as telas)
export function getState() {
    return state;
}

// Salva o estado atual no LocalStorage e atualiza a interface gráfica
export function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (typeof window.refreshUI === 'function') {
        window.refreshUI();
    }
}

// Reseta todos os dados para as configurações de fábrica
export function resetState() {
    if (confirm("Tem certeza que deseja resetar todos os dados para o padrão?")) {
        localStorage.removeItem(STORAGE_KEY);
        state = JSON.parse(JSON.stringify(defaultState));
        saveState();
    }
}

// Getters e Setters para a Lista de Desejos (ActiveWishSavings)
export function getActiveWishSavingsId() {
    return activeWishSavingsId;
}

export function setActiveWishSavingsId(id) {
    activeWishSavingsId = id;
}
