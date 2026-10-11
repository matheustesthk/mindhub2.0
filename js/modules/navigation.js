// Controle de Troca de Abas
export function switchTab(tabName) {
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
    
    const targetPanel = document.getElementById(`tab-${tabName}`);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
    }

    // Atualiza botões da Sidebar
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const navBtn = document.getElementById(`nav-${tabName}`);
    if (navBtn) navBtn.classList.add('active');

    // Atualiza botões Mobile
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.classList.remove('text-emerald-400');
        btn.classList.add('text-slate-400');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
