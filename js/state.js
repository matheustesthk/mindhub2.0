// Estado Inicial Padrão
export const defaultState = {
    tasks: [
        { id: '1', title: 'Apresentação do Projeto MindHub', category: 'Trabalho', dueDate: '2026-10-15', status: 'pending', priority: 'high' },
        { id: '2', title: 'Revisar orçamento financeiro mensal', category: 'Finanças', dueDate: '2026-10-12', status: 'in-progress', priority: 'medium' },
        { id: '3', title: 'Treino de Pernas e Cardio', category: 'Saúde', dueDate: '2026-10-11', status: 'completed', priority: 'low' }
    ],
    finances: [
        { id: '1', title: 'Projeto Freelance Frontend', amount: 3500.00, type: 'income', category: 'Trabalho', date: '2026-10-05' },
        { id: '2', title: 'Assinatura Servidor Cloud', amount: 120.00, type: 'expense', category: 'Tecnologia', date: '2026-10-08' },
        { id: '3', title: 'Supermercado Mensal', amount: 650.00, type: 'expense', category: 'Alimentação', date: '2026-10-10' }
    ],
    habits: [
        { id: '1', title: 'Beber 2.5L de Água', days: [true, true, true, true, false, false, false], category: 'Saúde' },
        { id: '2', title: 'Ler 15 Páginas de Livro', days: [true, true, false, true, true, false, false], category: 'Estudos' },
        { id: '3', title: 'Meditar por 10 Minutos', days: [false, true, true, true, false, false, false], category: 'Mente' }
    ],
    notes: [
        { id: '1', title: 'Ideias para o WebApp MindHub', content: 'Criar uma arquitetura modularizada para importar direto no GitHub com arquivos separados.', color: 'emerald', updatedAt: '2026-10-11' },
        { id: '2', title: 'Lista de Livros Recomendados', content: '1. Hábitos Atômicos\n2. Essencialismo\n3. Princípios de Ray Dalio', color: 'blue', updatedAt: '2026-10-09' }
    ],
    wishlist: [
        { id: '1', title: 'Monitor Ultrawide 34"', saved: 1800.00, total: 2500.00, category: 'Tecnologia', priority: 'high', link: 'https://amazon.com', status: 'pending' },
        { id: '2', title: 'Viagem para Floripa', saved: 1200.00, total: 1200.00, category: 'Viagens', priority: 'medium', link: '', status: 'conquered' }
    ],
    pomodoro: {
        mode: 'work', // work, shortBreak, longBreak
        timeLeft: 25 * 60,
        isRunning: false,
        completedSessions: 0
    }
};

// Gerenciamento de Persistência no LocalStorage
export let appState = loadState();

export function loadState() {
    const saved = localStorage.getItem('mindhub_data');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Erro ao carregar localStorage:", e);
        }
    }
    return JSON.parse(JSON.stringify(defaultState));
}

export function saveState() {
    localStorage.setItem('mindhub_data', JSON.stringify(appState));
}

export function resetState() {
    if (confirm("Tem certeza de que deseja resetar todos os dados para o padrão?")) {
        localStorage.removeItem('mindhub_data');
        location.reload();
    }
}
