import { appState, saveState } from '../state.js';
import { formatCurrency, escapeHtml, triggerConfetti } from '../utils.js';
import { openModal } from './modal.js';

export function renderWishlist() {
    const container = document.getElementById('tab-wishlist');
    if (!container) return;

    // Atualiza badge na Sidebar
    const badge = document.getElementById('badge-wishlist');
    if (badge) {
        const pendingCount = appState.wishlist.filter(w => w.status !== 'conquered').length;
        badge.innerText = pendingCount;
        badge.classList.toggle('hidden', pendingCount === 0);
    }

    container.innerHTML = `
        <div class="space-y-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-white">Lista de Desejos</h2>
                    <p class="text-slate-400 text-sm">Planeje suas futuras aquisições e conquistas.</p>
                </div>
                <button onclick="openModal('wish')" class="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl transition flex items-center gap-2">
                    <i class="fa-solid fa-plus"></i> Novo Desejo
                </button>
            </div>

            <!-- Cards da Wishlist -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${appState.wishlist.map(w => {
                    const perc = Math.min(100, Math.round((w.saved / w.total) * 100));
                    const isConquered = w.status === 'conquered' || perc >= 100;

                    return `
                        <div class="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 relative overflow-hidden">
                            ${isConquered ? '<span class="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-emerald-500/30">Conquistado!</span>' : ''}
                            
                            <div>
                                <div class="flex items-start justify-between gap-2 mb-2 pr-16">
                                    <h3 class="font-bold text-slate-200 text-base">${escapeHtml(w.title)}</h3>
                                </div>
                                <span class="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">${escapeHtml(w.category)}</span>

                                <div class="mt-4 space-y-2">
                                    <div class="flex justify-between text-xs">
                                        <span class="text-slate-400">Economizado: <strong class="text-emerald-400">${formatCurrency(w.saved)}</strong></span>
                                        <span class="text-slate-400">Meta: <strong>${formatCurrency(w.total)}</strong></span>
                                    </div>
                                    <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300" style="width: ${perc}%"></div>
                                    </div>
                                    <div class="text-right text-[11px] font-bold text-slate-400">${perc}% acumulado</div>
                                </div>
                            </div>

                            <!-- Ações -->
                            <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                                <div class="flex items-center gap-1">
                                    <button onclick="addWishDeposit('${w.id}')" class="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg font-semibold transition" title="Adicionar valor">+ Aporte</button>
                                    ${!isConquered ? `<button onclick="markConquered('${w.id}')" class="px-2.5 py-1 text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg transition">Conquistar</button>` : ''}
                                </div>

                                <!-- Ícone de Caneta de Edição + Botão de Apagar -->
                                <div class="flex items-center gap-1">
                                    <button onclick="editWish('${w.id}')" class="p-1.5 text-slate-400 hover:text-amber-400 transition" title="Editar">
                                        <i class="fa-solid fa-pen text-xs"></i>
                                    </button>
                                    <button onclick="deleteWish('${w.id}')" class="p-1.5 text-slate-400 hover:text-rose-400 transition" title="Excluir">
                                        <i class="fa-solid fa-trash text-xs"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('') || '<p class="text-slate-500 text-sm">Nenhum desejo na lista.</p>'}
            </div>
        </div>
    `;
}

window.addWishDeposit = (id) => {
    const wish = appState.wishlist.find(w => w.id === id);
    if (wish) {
        const val = prompt(`Aporte para "${wish.title}":`, "100");
        if (val && !isNaN(val)) {
            wish.saved += parseFloat(val);
            saveState();
            renderWishlist();
        }
    }
};

window.markConquered = (id) => {
    const wish = appState.wishlist.find(w => w.id === id);
    if (wish) {
        wish.status = 'conquered';
        wish.saved = wish.total;
        saveState();
        triggerConfetti();
        renderWishlist();
    }
};

window.editWish = (id) => {
    const item = appState.wishlist.find(w => w.id === id);
    if (item) openModal('wish', item);
};

window.deleteWish = (id) => {
    if (confirm("Remover este item da Wishlist?")) {
        appState.wishlist = appState.wishlist.filter(w => w.id !== id);
        saveState();
        renderWishlist();
    }
};
