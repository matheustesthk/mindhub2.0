import { renderAll } from '../app.js';

export function switchTab(tab) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    const panel = document.getElementById(`tab-${tab}`);
    const nav = document.getElementById(`nav-${tab}`);
    
    if(panel) panel.classList.remove('hidden');
    if(nav) nav.classList.add('active');
    
    renderAll();
}
