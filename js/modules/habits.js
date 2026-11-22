// js/modules/habits.js
function renderHabits() {
    const daysName = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const container = document.getElementById('habits-matrix-container');
    container.innerHTML = '';

    state.habits.forEach(h => {
        let daysHtml = '';
        daysName.forEach((day, idx) => {
            const isDone = h.completedDays.includes(idx);
            daysHtml += `
                <button onclick="toggleHabitDay('${h.id}', ${idx})" class="flex flex-col items-center gap-1 p-2 rounded-xl border transition ${isDone ? 'bg-brand-500/20 border-brand-500 text-brand-400' : 'bg-dark-bg border-dark-border text-gray-500 hover:text-white'}">
                    <span class="text-[10px] font-bold">${day}</span>
                    <i class="fa-solid ${isDone ? 'fa-check' : 'fa-minus'} text-xs"></i>
                </button>
            `;
        });

        container.innerHTML += `
            <div class="glass-card p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center justify-between md:justify-start gap-4">
                    <div>
                        <h4 class="font-bold text-white text-sm">${escapeHtml(h.title)}</h4>
                        <span class="text-[10px] text-gray-400">${escapeHtml(h.category)}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1"><i class="fa-solid fa-fire"></i> ${Number(h.streak) || 0}d</div>
                        <button onclick="editHabit('${h.id}')" class="p-2 rounded-lg bg-dark-bg border border-dark-border text-gray-400 hover:text-brand-400 transition" title="Editar hábito"><i class="fa-solid fa-pen"></i></button>
                        <button onclick="deleteHabit('${h.id}')" class="p-2 rounded-lg bg-dark-bg border border-dark-border text-gray-400 hover:text-rose-400 transition" title="Excluir hábito"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <div class="grid grid-cols-7 gap-1.5 sm:gap-2">
                    ${daysHtml}
                </div>
            </div>
        `;
    });
}

function toggleHabitDay(habitId, dayIdx) {
    const habit = state.habits.find(h => h.id === habitId);
    if (habit) {
        if (habit.completedDays.includes(dayIdx)) {
            habit.completedDays = habit.completedDays.filter(d => d !== dayIdx);
        } else {
            habit.completedDays.push(dayIdx);
        }
        const todayIdx = (new Date().getDay() + 6) % 7;
        const anchorDay = habit.completedDays.includes(todayIdx) ? todayIdx : todayIdx - 1;
        let streak = 0;
        for (let day = anchorDay; day >= 0 && habit.completedDays.includes(day); day--) streak++;
        habit.streak = streak;
        saveState();
    }
}

function editHabit(id) {
 const habit=state.habits.find(item=>item.id===id); if(!habit)return;
 const title=prompt('Nome do hábito:',habit.title); if(title===null)return; if(!title.trim())return alert('O nome não pode ficar vazio.');
 const category=prompt('Categoria:',habit.category||'Geral'); if(category===null)return;
 habit.title=title.trim().slice(0,160); habit.category=category.trim().slice(0,60)||'Geral'; saveState();
}
function deleteHabit(id) {
 const habit=state.habits.find(item=>item.id===id); if(!habit)return;
 if(!confirm('Deseja excluir o hábito '+habit.title+'? Esta ação não pode ser desfeita.'))return;
 state.habits=state.habits.filter(item=>item.id!==id); saveState();
}
