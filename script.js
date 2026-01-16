// ============================================
// NOURISH DAILY - MAIN SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ---------- CONSTANTS ----------
    const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const today = new Date();
    const dayIndex = today.getDay();
    const dayKey = DAYS[dayIndex];
    const tomorrowKey = DAYS[(dayIndex + 1) % 7];
    const hour = today.getHours();

    // Storage keys
    const STORE = {
        selections: 'nd_selections',
        used: 'nd_used_meals',
        week: 'nd_week_start',
        customMeals: 'nd_custom_meals',
        customRecipes: 'nd_custom_recipes',
        theme: 'nd_theme'
    };

    // ---------- INIT ----------
    initTheme();
    initToday();
    initWeekly();
    initPrepare();
    initRecipes();
    setupTabs();
    setupCustomizeModal();
    setupAddModal();

    // ---------- THEME ----------
    function initTheme() {
        const btn = document.getElementById('theme-toggle');
        const savedTheme = localStorage.getItem(STORE.theme);

        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            btn.textContent = '☀️';
        }

        btn.onclick = () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            btn.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem(STORE.theme, isDark ? 'dark' : 'light');
        };
    }

    // ---------- TODAY TAB ----------
    function initToday() {
        // Date
        document.getElementById('date-display').textContent =
            today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        // Greeting
        let greeting = "Good Morning!";
        if (hour >= 12) greeting = "Good Afternoon!";
        if (hour >= 15) greeting = "Good Evening!";
        if (hour >= 19) greeting = "Good Night!";
        document.getElementById('greeting').textContent = greeting;

        // Focus
        let focus = "Focus: Breakfast";
        if (hour >= 11) focus = "Focus: Lunch";
        if (hour >= 15) focus = "Focus: Dinner";
        if (hour >= 19) focus = "Focus: Rest & Prep";
        document.getElementById('current-focus').textContent = focus;

        // Load meals
        loadMeals();
        highlightMeal();
        loadSnack();
        loadQuickBites();
    }

    function loadMeals() {
        const selections = getStore(STORE.selections);
        const todayKey = today.toDateString();
        const custom = selections[todayKey] || {};
        const defaults = MEAL_DATA[dayKey];

        const bf = custom.breakfast || defaults?.breakfast;
        const ln = custom.lunch || defaults?.lunch;
        const dn = custom.dinner || defaults?.dinner;

        if (bf) {
            document.getElementById('meal-breakfast-title').textContent = bf.title;
            document.getElementById('meal-breakfast-desc').textContent = bf.desc;
        }
        if (ln) {
            document.getElementById('meal-lunch-title').textContent = ln.title;
            document.getElementById('meal-lunch-desc').textContent = ln.desc;
        }
        if (dn) {
            document.getElementById('meal-dinner-title').textContent = dn.title;
            document.getElementById('meal-dinner-desc').textContent = dn.desc;
        }
    }

    function highlightMeal() {
        document.querySelectorAll('.meal-card').forEach(c => c.classList.remove('highlight'));

        let id = null;
        if (hour >= 6 && hour < 11) id = 'card-breakfast';
        else if (hour >= 11 && hour < 15) id = 'card-lunch';
        else if (hour >= 15 && hour < 22) id = 'card-dinner';

        if (id) document.getElementById(id)?.classList.add('highlight');
    }

    function loadSnack() {
        // Time-based snack selection
        let timeKey = 'morning';
        if (hour >= 11 && hour < 15) timeKey = 'afternoon';
        else if (hour >= 15 && hour < 19) timeKey = 'evening';
        else if (hour >= 19) timeKey = 'night';

        const snackList = SNACKS[timeKey] || SNACKS.morning;
        const snack = snackList[Math.floor(Math.random() * snackList.length)];

        const labels = {
            morning: '🌅 Morning Snack', afternoon: '☀️ Afternoon Snack',
            evening: '🌆 Evening Snack', night: '🌙 Night Snack'
        };

        document.getElementById('snack-header').textContent = labels[timeKey];
        document.querySelector('#snack-card .snack-title').textContent = snack.title;
        document.querySelector('#snack-card .snack-desc').textContent = snack.desc;
    }

    function loadQuickBites() {
        const container = document.getElementById('quick-list');
        container.innerHTML = '';

        // Show late night warning after 7 PM
        const data = hour >= 19 ? QUICK_BITES.lateNight : QUICK_BITES.hungry;

        document.getElementById('quick-title').textContent = data.title;

        data.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'quick-item';
            div.innerHTML = `<strong>${item.title}</strong><span>${item.desc}</span>`;
            container.appendChild(div);
        });

        if (data.tip) {
            const tip = document.createElement('div');
            tip.className = 'tip-box';
            tip.textContent = data.tip;
            container.appendChild(tip);
        }
    }

    // ---------- WEEKLY TAB ----------
    function initWeekly() {
        const container = document.getElementById('weekly-container');
        container.innerHTML = '';

        DAYS.forEach((day, i) => {
            const data = MEAL_DATA[day];
            if (!data) return;

            const card = document.createElement('div');
            card.className = `day-card${i === dayIndex ? ' today' : ''}`;

            card.innerHTML = `
                <div class="day-header">
                    <span class="day-name">${DAY_LABELS[i]}</span>
                    ${i === dayIndex ? '<span class="day-badge">Today</span>' : ''}
                </div>
                <div class="day-meals">
                    <div class="day-meal">
                        <span class="day-meal-type">🌅 Breakfast</span>
                        <span class="day-meal-name">${data.breakfast.title}</span>
                    </div>
                    <div class="day-meal">
                        <span class="day-meal-type">🍱 Lunch</span>
                        <span class="day-meal-name">${data.lunch.title}</span>
                    </div>
                    <div class="day-meal">
                        <span class="day-meal-type">🌙 Dinner</span>
                        <span class="day-meal-name">${data.dinner.title}</span>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // ---------- PREPARE TAB ----------
    function initPrepare() {
        const tomorrow = DAY_LABELS[(dayIndex + 1) % 7];
        document.getElementById('prep-label').textContent = `Preparing for ${tomorrow}`;

        const data = MEAL_DATA[dayKey];

        // Night tasks
        const tasksEl = document.getElementById('prep-tasks');
        tasksEl.innerHTML = '';
        (data?.prep || []).forEach((txt, i) => {
            tasksEl.appendChild(createCheckItem(`prep_${dayKey}_${i}`, txt));
        });
        // Static nightly
        tasksEl.appendChild(createCheckItem(`prep_${dayKey}_alm`, 'Soak 6 Almonds + 1 Walnut'));
        tasksEl.appendChild(createCheckItem(`prep_${dayKey}_met`, 'Soak Methi Seeds'));

        // Groceries
        const grocEl = document.getElementById('prep-groceries');
        grocEl.innerHTML = '';
        (data?.groceries || []).forEach((txt, i) => {
            grocEl.appendChild(createCheckItem(`groc_${dayKey}_${i}`, `🛒 ${txt}`));
        });

        // Daily essentials
        const essEl = document.getElementById('prep-essentials');
        essEl.innerHTML = '';
        DAILY_ESSENTIALS.forEach((txt, i) => {
            essEl.appendChild(createCheckItem(`ess_${today.toDateString()}_${i}`, txt));
        });

        // Custom ingredients from custom meals
        loadCustomIngredients();

        // Restore checked states
        loadCheckedStates();
    }

    function loadCustomIngredients() {
        const meals = getStore(STORE.customMeals);
        const container = document.getElementById('prep-custom');
        const group = document.getElementById('custom-ingredients-group');
        container.innerHTML = '';

        const ings = [];
        meals.forEach(m => {
            (m.ingredients || []).forEach(ing => {
                if (ing.trim()) ings.push({ text: `${ing} (${m.title})`, id: `cing_${ing.replace(/\s/g, '_')}` });
            });
        });

        if (ings.length > 0) {
            group.style.display = 'block';
            ings.forEach(ing => container.appendChild(createCheckItem(ing.id, ing.text)));
        } else {
            group.style.display = 'none';
        }
    }

    function createCheckItem(id, text) {
        const div = document.createElement('div');
        div.className = 'check-item';
        div.dataset.id = id;
        div.innerHTML = `<div class="check-box"></div><span>${text}</span>`;
        div.onclick = () => toggleCheck(div);
        return div;
    }

    function toggleCheck(el) {
        el.classList.toggle('done');
        localStorage.setItem(el.dataset.id, el.classList.contains('done'));
    }

    function loadCheckedStates() {
        document.querySelectorAll('.check-item').forEach(el => {
            if (localStorage.getItem(el.dataset.id) === 'true') {
                el.classList.add('done');
            }
        });
    }

    // ---------- RECIPES TAB ----------
    function initRecipes() {
        const container = document.getElementById('recipe-list');
        container.innerHTML = '';

        // Default recipes
        RECIPES.forEach(r => container.appendChild(createRecipeCard(r)));

        // Custom recipes
        getStore(STORE.customRecipes).forEach(r => container.appendChild(createRecipeCard(r, true)));
    }

    function createRecipeCard(recipe, isCustom = false) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        if (isCustom) card.style.borderLeft = '3px solid var(--purple)';

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p class="desc">${recipe.desc || ''}</p>
            <div class="content">${recipe.content || ''}</div>
        `;
        return card;
    }

    // ---------- TAB NAVIGATION ----------
    function setupTabs() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(btn.dataset.tab).classList.add('active');
            };
        });
    }

    // ---------- CUSTOMIZE MODAL ----------
    function setupCustomizeModal() {
        const modal = document.getElementById('customize-modal');
        const btn = document.getElementById('customize-btn');

        btn.onclick = () => {
            populateOptions();
            modal.classList.remove('hidden');
        };

        // Tab switching
        document.querySelectorAll('.modal-tabs .tab-btn').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.modal-tabs .tab-btn').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.options-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`options-${tab.dataset.meal}`).classList.add('active');
            };
        });

        // Close buttons
        modal.querySelectorAll('[data-close]').forEach(el => {
            el.onclick = () => modal.classList.add('hidden');
        });
        modal.onclick = e => { if (e.target === modal) modal.classList.add('hidden'); };

        // Save
        document.getElementById('save-btn').onclick = () => {
            saveSelections();
            loadMeals();
            modal.classList.add('hidden');
        };

        // Reset
        document.getElementById('reset-btn').onclick = () => {
            const selections = getStore(STORE.selections);
            delete selections[today.toDateString()];
            setStore(STORE.selections, selections);
            loadMeals();
            populateOptions();
        };
    }

    function populateOptions() {
        const customMeals = getStore(STORE.customMeals);
        const used = getStore(STORE.used);
        const selections = getStore(STORE.selections)[today.toDateString()] || {};

        ['breakfast', 'lunch', 'dinner'].forEach(type => {
            const panel = document.getElementById(`options-${type}`);
            panel.innerHTML = '';

            // Default options
            MEAL_OPTIONS[type].forEach(meal => {
                panel.appendChild(createOptionCard(meal, type, used, selections, false));
            });

            // Custom meals
            customMeals.filter(m => m.type === type).forEach(meal => {
                panel.appendChild(createOptionCard(meal, type, used, selections, true));
            });
        });
    }

    function createOptionCard(meal, type, used, selections, isCustom) {
        const card = document.createElement('div');
        card.className = 'option-card';
        if (isCustom) card.classList.add('custom');
        if (used.includes(meal.id)) card.classList.add('used');
        if (selections[type]?.id === meal.id) card.classList.add('selected');

        card.dataset.id = meal.id;
        card.dataset.type = type;
        card.dataset.title = meal.title;
        card.dataset.desc = meal.desc || '';

        card.innerHTML = `
            <div class="option-title">${meal.title}</div>
            <div class="option-desc">${meal.desc || ''}</div>
        `;

        card.onclick = () => {
            if (card.classList.contains('used')) return;
            card.parentElement.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        };

        return card;
    }

    function saveSelections() {
        const selections = getStore(STORE.selections);
        const used = getStore(STORE.used);
        const todayKey = today.toDateString();
        selections[todayKey] = {};

        ['breakfast', 'lunch', 'dinner'].forEach(type => {
            const selected = document.querySelector(`#options-${type} .option-card.selected`);
            if (selected) {
                const data = { id: selected.dataset.id, title: selected.dataset.title, desc: selected.dataset.desc };
                selections[todayKey][type] = data;
                if (!used.includes(data.id)) used.push(data.id);
            }
        });

        setStore(STORE.selections, selections);
        setStore(STORE.used, used);
    }

    // ---------- ADD MODAL (Meals & Recipes) ----------
    function setupAddModal() {
        const modal = document.getElementById('add-modal');
        const fab = document.getElementById('fab');
        const addRecipeBtn = document.getElementById('add-recipe-btn');
        let addingType = 'meal';

        // Open for meal
        fab.onclick = () => openAddModal('meal');

        // Open for recipe
        addRecipeBtn.onclick = () => openAddModal('recipe');

        function openAddModal(type) {
            addingType = type;
            document.getElementById('add-type').value = type;
            document.getElementById('add-modal-title').textContent = type === 'meal' ? 'Add New Meal' : 'Add New Recipe';
            document.getElementById('meal-type-group').style.display = type === 'meal' ? 'block' : 'none';
            document.getElementById('recipe-content-group').style.display = type === 'recipe' ? 'block' : 'none';
            document.getElementById('ingredients-group').style.display = type === 'meal' ? 'block' : 'none';

            // Reset form
            document.getElementById('add-form').reset();
            document.getElementById('ingredients-inputs').innerHTML = '<input type="text" class="ing-input" placeholder="Ingredient 1">';
            document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));

            modal.classList.remove('hidden');
        }

        // Close
        modal.querySelectorAll('[data-close]').forEach(el => {
            el.onclick = () => modal.classList.add('hidden');
        });
        modal.onclick = e => { if (e.target === modal) modal.classList.add('hidden'); };

        // Type buttons
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
        });

        // Add ingredient
        const addIngBtn = document.getElementById('add-ing-btn');
        addIngBtn.onclick = () => {
            const container = document.getElementById('ingredients-inputs');
            if (container.children.length >= 5) {
                addIngBtn.disabled = true;
                return;
            }
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'ing-input';
            input.placeholder = `Ingredient ${container.children.length + 1}`;
            container.appendChild(input);
            if (container.children.length >= 5) addIngBtn.disabled = true;
        };

        // Submit
        document.getElementById('submit-add').onclick = () => {
            const name = document.getElementById('add-name').value.trim();
            if (!name) return alert('Name is required!');

            const desc = document.getElementById('add-desc').value.trim();

            if (addingType === 'meal') {
                const typeBtn = document.querySelector('.type-btn.active');
                if (!typeBtn) return alert('Please select a meal type!');

                const mealType = typeBtn.dataset.value;
                const ingredients = [...document.querySelectorAll('.ing-input')]
                    .map(i => i.value.trim())
                    .filter(Boolean);

                const meals = getStore(STORE.customMeals);
                meals.push({
                    id: `cm_${Date.now()}`,
                    title: name,
                    desc: desc,
                    type: mealType,
                    ingredients: ingredients
                });
                setStore(STORE.customMeals, meals);
                initPrepare(); // Refresh to show new ingredients
            } else {
                const content = document.getElementById('add-content').value.trim();
                const recipes = getStore(STORE.customRecipes);
                recipes.push({
                    id: `cr_${Date.now()}`,
                    title: name,
                    desc: desc,
                    content: content
                });
                setStore(STORE.customRecipes, recipes);
                initRecipes();
            }

            modal.classList.add('hidden');
            loadCheckedStates();
        };
    }

    // ---------- STORAGE HELPERS ----------
    function getStore(key) {
        try { return JSON.parse(localStorage.getItem(key)) || (key.includes('used') ? [] : {}); }
        catch { return key.includes('used') ? [] : {}; }
    }

    function setStore(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
});
