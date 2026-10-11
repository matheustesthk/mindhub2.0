const defaultState = {
    tasks: [{ id: '1', title: 'Apresentação do Projeto MindHub', category: 'Trabalho', status: 'pending' }],
    finances: [{ id: '1', title: 'Projeto Freelance', amount: 3500.00, type: 'income', category: 'Trabalho', date: '2026-10-05' }],
    habits: [{ id: '1', title: 'Beber 2.5L de Água', days: [true, true, true, false, false, false, false], category: 'Saúde' }],
    notes: [{ id: '1', title: 'Anotações MindHub', content: 'Estrutura modular carregada com sucesso.', updatedAt: '2026-10-11' }],
    wishlist: [{ id: '1', title: 'Monitor Ultrawide 34"', saved: 1800.00, total: 2500.00, category: 'Tecnologia', status: 'pending' }],
    pomodoro: { mode: 'work', timeLeft: 1500, isRunning: false, completedSessions: 0 }
};

export let state = JSON.parse(localStorage.getItem('mindhub_data')) || defaultState;

export function saveState() {
    localStorage.setItem('mindhub_data', JSON.stringify(state));
}

export function resetState() {
    if(confirm("Deseja realmente resetar todos os dados?")) {
        localStorage.removeItem('mindhub_data');
        location.reload();
    }
}
