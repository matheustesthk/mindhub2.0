import { state } from '../state.js';
export function renderWishlist() {
    const el = document.getElementById('tab-wishlist');
    if (!el) return;
    el.innerHTML = `<h2 class="text-2xl font-bold text-white mb-4">Lista de Desejos</h2><div class="space-y-3">${state.wishlist.map(w => `<div class="glass-card p-4 rounded-xl flex justify-between items-center"><span>${w.title}</span><span class="text-emerald-400 font-bold">R$ ${w.saved} / R$ ${w.total}</span></div>`).join('')}</div>`;
}
