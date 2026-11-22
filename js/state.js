// js/state.js
const STORAGE_KEY = 'mindhub_gui_data_v2';

const defaultState = {
    tasks: [
        { id: '1', title: 'Revisar relatório trimestral', priority: 'Alta', status: 'In Progress', category: 'Trabalho', dueDate: '2026-10-10' },
        { id: '2', title: 'Treino de cardio 30min', priority: 'Média', status: 'Done', category: 'Saúde', dueDate: '2026-10-08' },
        { id: '3', title: 'Comprar livros de produtividade', priority: 'Baixa', status: 'To Do', category: 'Pessoal', dueDate: '2026-10-15' }
    ],
    finances: [
        { id: '1', title: 'Salário Mensal', amount: 4500, type: 'income', category: 'Salário', date: '2026-10-01' },
        { id: '2', title: 'Aluguel & Condomínio', amount: 1400, type: 'expense', category: 'Moradia', date: '2026-10-02' },
        { id: '3', title: 'Feira Semanal', amount: 320, type: 'expense', category: 'Alimentação', date: '2026-10-05' }
    ],
    habits: [
        { id: '1', title: 'Beber 2L de água', category: 'Saúde', streak: 7, completedDays: [0, 1, 2, 3] },
        { id: '2', title: 'Ler 20 páginas', category: 'Estudo', streak: 4, completedDays: [0, 2, 3] },
        { id: '3', title: 'Meditar 10min', category: 'Bem-estar', streak: 5, completedDays: [1, 3] }
    ],
    notes: [
        { id: '1', title: 'Ideias de Projeto 2026', content: 'Criar uma plataforma de cursos com interface dark mode moderna.', tags: ['ideias', 'dev'], favorite: true, date: '2026-10-06' },
        { id: '2', title: 'Checklist da Viagem', content: 'Passaporte, carregadores, fone de ouvido, protetor solar.', tags: ['pessoal'], favorite: false, date: '2026-10-07' }
    ],
    pomodoro: {
        focusMinutesToday: 75,
        sessionsToday: 3,
        mode: 'focus',
        timeLeft: 25 * 60,
        isRunning: false
    },
    wishlist: [
        { 
            id: '1', 
            title: 'MacBook Pro M3', 
            targetAmount: 12000, 
            savedAmount: 8500, 
            category: 'Tecnologia', 
            priority: 'Alta', 
            conquered: false, 
            url: 'https://apple.com', 
            notes: 'Para acelerar os projetos de programação e design.' 
        },
        { 
            id: '2', 
            title: 'Viagem para o Japão', 
            targetAmount: 18000, 
            savedAmount: 6200, 
            category: 'Viagens', 
            priority: 'Alta', 
            conquered: false, 
            url: '', 
            notes: 'Roteiro Tóquio, Kyoto e Osaka durante a primavera.' 
        },
        { 
            id: '3', 
            title: 'Cadeira Ergonômica Herman Miller', 
            targetAmount: 4500, 
            savedAmount: 4500, 
            category: 'Casa', 
            priority: 'Média', 
            conquered: true, 
            url: '', 
            notes: 'Investimento na saúde da coluna para o home office.' 
        }
    ]
};

let state = loadState();

function loadState() {
    const cloneDefaults = () => JSON.parse(JSON.stringify(defaultState));
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return cloneDefaults();

        const parsed = JSON.parse(saved);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return cloneDefaults();

        // Migração aditiva: preserva os dados existentes e completa campos ausentes.
        const migrated = { ...cloneDefaults(), ...parsed };
        ['tasks', 'finances', 'habits', 'notes', 'wishlist'].forEach((key) => {
            if (!Array.isArray(migrated[key])) migrated[key] = cloneDefaults()[key];
        });
        migrated.pomodoro = {
            ...cloneDefaults().pomodoro,
            ...(parsed.pomodoro && typeof parsed.pomodoro === 'object' ? parsed.pomodoro : {}),
            endAt: Number.isFinite(Number(parsed.pomodoro?.endAt)) ? Number(parsed.pomodoro.endAt) : null
        };

        migrated.tasks = migrated.tasks.map((item) => ({
            ...item,
            id: String(item.id ?? Date.now()),
            title: String(item.title ?? ''),
            priority: item.priority || 'Média',
            status: item.status || 'To Do',
            category: item.category || 'Geral',
            dueDate: item.dueDate || ''
        }));
        migrated.finances = migrated.finances.map((item) => ({
            ...item,
            id: String(item.id ?? Date.now()),
            title: String(item.title ?? ''),
            amount: Number.isFinite(Number(item.amount)) ? Number(item.amount) : 0,
            type: item.type === 'income' ? 'income' : 'expense',
            category: item.category || 'Outros',
            date: item.date || ''
        }));
        migrated.habits = migrated.habits.map((item) => ({
            ...item,
            id: String(item.id ?? Date.now()),
            title: String(item.title ?? ''),
            category: item.category || 'Geral',
            completedDays: Array.isArray(item.completedDays) ? item.completedDays.filter(day => Number.isInteger(day) && day >= 0 && day <= 6) : [],
            streak: Math.max(0, Number(item.streak) || 0)
        }));
        migrated.notes = migrated.notes.map((item) => ({
            ...item,
            id: String(item.id ?? Date.now()),
            title: String(item.title ?? ''),
            content: String(item.content ?? ''),
            tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
            favorite: Boolean(item.favorite)
        }));
        migrated.wishlist = migrated.wishlist.map((item) => ({
            ...item,
            id: String(item.id ?? Date.now()),
            title: String(item.title ?? ''),
            targetAmount: Math.max(0, Number(item.targetAmount) || 0),
            savedAmount: Math.max(0, Number(item.savedAmount) || 0),
            category: item.category || 'Outros',
            priority: item.priority || 'Média',
            conquered: Boolean(item.conquered),
            url: String(item.url ?? ''),
            notes: String(item.notes ?? '')
        }));

        return migrated;
    } catch (error) {
        console.error('Não foi possível carregar os dados salvos do MindHub:', error);
        return cloneDefaults();
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    refreshUI();
}

function resetDataModal() {
    if (confirm("Tem certeza que deseja resetar todos os dados para o padrão?")) {
        state = JSON.parse(JSON.stringify(defaultState));
        saveState();
    }
}
