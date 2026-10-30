tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace']
            },
            colors: {
                brand: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    900: '#14532d',
                },
                dark: {
                    bg: '#090d16',
                    card: '#111827',
                    border: '#1f2937',
                    hover: '#1e293b'
                },
                accent: {
                    cyan: '#06b6d4',
                    purple: '#a855f7',
                    amber: '#f59e0b',
                    rose: '#f43f5e',
                    pink: '#ec4899',
                    emerald: '#10b981'
                }
            }
        }
    }
};

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
