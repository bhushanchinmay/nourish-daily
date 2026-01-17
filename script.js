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

    // Security: Sanitize user input to prevent XSS
    function sanitize(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ---------- INIT ----------
    initTheme();
    initToday();
    initWeekly();
    initPrepare();
    initRecipes();
    initManage();
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
        document.getElementById('date-display').textContent =
            today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        let greeting = "Good Morning!";
        if (hour >= 12) greeting = "Good Afternoon!";
        if (hour >= 17) greeting = "Good Evening!";
        document.getElementById('greeting').textContent = greeting;

        let focus = "Focus: Breakfast";
        if (hour >= 11) focus = "Focus: Lunch";
        if (hour >= 15) focus = "Focus: Dinner";
        if (hour >= 20) focus = "Focus: Rest & Prep";
        document.getElementById('current-focus').textContent = focus;

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

        if (bf) updateMealCard('breakfast', bf);
        if (ln) updateMealCard('lunch', ln);
        if (dn) updateMealCard('dinner', dn);
    }

    function updateMealCard(type, data) {
        document.getElementById(`meal-${type}-title`).textContent = data.title;
        document.getElementById(`meal-${type}-desc`).textContent = data.desc;
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
        let timeKey = 'morning';
        if (hour >= 11 && hour < 15) timeKey = 'afternoon';
        else if (hour >= 15 && hour < 19) timeKey = 'evening';
        else if (hour >= 19) timeKey = 'night';

        const snackList = SNACKS[timeKey] || SNACKS.morning;
        const snack = snackList[Math.floor(Math.random() * snackList.length)];
        const labels = { morning: '🌅 Morning Snack', afternoon: '☀️ Afternoon Snack', evening: '🌆 Evening Snack', night: '🌙 Night Snack' };

        document.getElementById('snack-header').textContent = labels[timeKey];
        document.querySelector('#snack-card .snack-title').textContent = snack.title;
        document.querySelector('#snack-card .snack-desc').textContent = snack.desc;
    }

    function loadQuickBites() {
        const container = document.getElementById('quick-list');
        container.innerHTML = '';
        const data = hour >= 19 ? QUICK_BITES.lateNight : QUICK_BITES.hungry;
        document.getElementById('quick-title').textContent = data.title;

        data.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'quick-item';
            div.innerHTML = `<strong>${item.title}</strong> <span>${item.desc}</span>`;
            container.appendChild(div);
        });
    }

    // ---------- WEEKLY TAB ----------
    function initWeekly() {
        const container = document.getElementById('weekly-container');
        container.innerHTML = '';
        const selections = getStore(STORE.selections);

        DAYS.forEach((day, i) => {
            const data = MEAL_DATA[day];
            if (!data) return;

            // For today, check if there are custom selections
            let breakfast = data.breakfast;
            let lunch = data.lunch;
            let dinner = data.dinner;

            if (i === dayIndex) {
                const todayKey = today.toDateString();
                const custom = selections[todayKey];
                if (custom) {
                    breakfast = custom.breakfast || breakfast;
                    lunch = custom.lunch || lunch;
                    dinner = custom.dinner || dinner;
                }
            }

            const card = document.createElement('div');
            card.className = `day-card${i === dayIndex ? ' today' : ''}`;
            card.innerHTML = `
                <div class="day-header">
                    <span class="day-name">${DAY_LABELS[i]}</span>
                    ${i === dayIndex ? '<span class="day-badge">Today</span>' : ''}
                </div>
                <div class="day-rows">
                    <div class="day-row"><span>🌅 Breakfast</span><span>${breakfast.title}</span></div>
                    <div class="day-row"><span>🍱 Lunch</span><span>${lunch.title}</span></div>
                    <div class="day-row"><span>🌙 Dinner</span><span>${dinner.title}</span></div>
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

        const tasksEl = document.getElementById('prep-tasks');
        tasksEl.innerHTML = '';
        (data?.prep || []).forEach((txt, i) => tasksEl.appendChild(createCheckItem(`prep_${dayKey}_${i}`, txt)));
        tasksEl.appendChild(createCheckItem(`prep_${dayKey}_alm`, 'Soak 6 Almonds + 1 Walnut'));
        tasksEl.appendChild(createCheckItem(`prep_${dayKey}_met`, 'Soak Methi Seeds'));

        const grocEl = document.getElementById('prep-groceries');
        grocEl.innerHTML = '';
        (data?.groceries || []).forEach((txt, i) => grocEl.appendChild(createCheckItem(`groc_${dayKey}_${i}`, `🛒 ${txt}`)));

        const essEl = document.getElementById('prep-essentials');
        essEl.innerHTML = '';
        DAILY_ESSENTIALS.forEach((txt, i) => essEl.appendChild(createCheckItem(`ess_${today.toDateString()}_${i}`, txt)));

        loadCustomIngredients();
        loadCheckedStates();
    }

    function loadCustomIngredients() {
        const meals = getStore(STORE.customMeals);
        const container = document.getElementById('prep-custom');
        const group = document.getElementById('custom-ingredients-group');
        container.innerHTML = '';

        // Use Set to deduplicate ingredients (diet-friendly meals appear 3x)
        const uniqueIngs = new Map(); // Map<ingredient, Set<mealTitles>>

        meals.forEach(m => {
            (m.ingredients || []).forEach(ing => {
                const key = ing.trim().toLowerCase();
                if (key) {
                    if (!uniqueIngs.has(key)) {
                        uniqueIngs.set(key, new Set());
                    }
                    // Only add meal title if not diet-friendly duplicate
                    if (!m.isDietFriendly || !uniqueIngs.get(key).size) {
                        uniqueIngs.get(key).add(m.title.replace(' 🥗', ''));
                    }
                }
            });
        });

        if (uniqueIngs.size > 0) {
            group.style.display = 'block';
            uniqueIngs.forEach((titles, ing) => {
                const titleList = Array.from(titles).join(', ');
                // Capitalize first letter only
                const displayIng = capitalizeFirst(ing);
                const text = `${displayIng} (${titleList})`;
                const id = `cing_${ing.replace(/\s/g, '_')}`;
                container.appendChild(createCheckItem(id, text));
            });
        } else {
            group.style.display = 'none';
        }
    }

    function capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function createCheckItem(id, text) {
        const div = document.createElement('div');
        div.className = 'check-item';
        div.dataset.id = id;
        div.innerHTML = `<div class="check-circle"></div><span>${text}</span>`;
        div.onclick = () => {
            div.classList.toggle('done');
            localStorage.setItem(id, div.classList.contains('done'));
        };
        return div;
    }

    function loadCheckedStates() {
        document.querySelectorAll('.check-item').forEach(el => {
            if (localStorage.getItem(el.dataset.id) === 'true') el.classList.add('done');
        });
    }

    // ---------- RECIPES TAB ----------
    function initRecipes() {
        const container = document.getElementById('recipe-list');
        container.innerHTML = '';

        // Collect ALL meals from all sources
        const allMeals = [];

        // Add default meal options with type tag
        ['breakfast', 'lunch', 'dinner'].forEach(type => {
            (MEAL_OPTIONS[type] || []).forEach(meal => {
                allMeals.push({ ...meal, mealType: type, isDefault: true });
            });
        });

        // Add default recipes (diet-friendly)
        RECIPES.forEach(r => {
            allMeals.push({ ...r, mealType: 'diet', isDietFriendly: true, isDefault: true });
        });

        // Add custom meals
        getStore(STORE.customMeals).forEach(meal => {
            // Avoid duplicates from diet-friendly meals (appear 3x)
            if (meal.isDietFriendly) {
                const baseId = meal.id.split('_')[0] + '_' + meal.id.split('_')[1];
                if (!allMeals.find(m => m.id && m.id.startsWith(baseId))) {
                    allMeals.push({ ...meal, mealType: 'diet' });
                }
            } else {
                allMeals.push(meal);
            }
        });

        // Add custom recipes
        getStore(STORE.customRecipes).forEach(r => {
            if (!allMeals.find(m => m.id === r.id)) {
                allMeals.push({ ...r, mealType: 'diet', isDietFriendly: true });
            }
        });

        // Render all meals
        allMeals.forEach(meal => container.appendChild(createMealCard(meal)));

        // Setup filter buttons
        setupRecipeFilters();
    }

    function setupRecipeFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;

                document.querySelectorAll('#recipe-list .meal-card').forEach(card => {
                    const type = card.dataset.type;
                    const isDiet = card.dataset.diet === 'true';

                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else if (filter === 'diet') {
                        card.style.display = isDiet ? 'block' : 'none';
                    } else {
                        card.style.display = type === filter ? 'block' : 'none';
                    }
                });
            };
        });
    }

    function createMealCard(meal) {
        const card = document.createElement('div');
        card.className = 'meal-card recipe-card';
        card.dataset.type = meal.mealType || meal.type || 'other';
        card.dataset.diet = meal.isDietFriendly ? 'true' : 'false';

        // Build tag badges
        let tags = '';
        const typeIcons = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', diet: '🥗' };
        const typeLabels = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', diet: 'Recipe' };

        const mealType = meal.mealType || meal.type;
        if (mealType) {
            tags += `<span class="tag tag-${mealType}">${typeIcons[mealType] || ''} ${typeLabels[mealType] || mealType}</span>`;
        }
        if (meal.isDietFriendly) {
            tags += `<span class="tag tag-diet">🥗 Diet-Friendly</span>`;
        }
        if (!meal.isDefault) {
            tags += `<span class="tag tag-custom">✨ Custom</span>`;
        }

        // Build content
        let contentHtml = '';
        if (meal.content) {
            contentHtml = `<div class="content">${meal.content}</div>`;
        } else if (meal.ingredients && meal.ingredients.length) {
            contentHtml = `<div class="content"><strong>Ingredients:</strong> ${meal.ingredients.map(i => capitalizeFirst(i)).join(', ')}</div>`;
        }

        card.innerHTML = `
            <div class="tags-row">${tags}</div>
            <h3>${meal.title}</h3>
            <p class="desc">${meal.desc || ''}</p>
            ${contentHtml}
        `;

        return card;
    }

    function createRecipeCard(recipe, isCustom = false) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        // Remove style.css purple border override, handle in css if needed or keep subtle

        let headerHtml = `<h3>${recipe.title}</h3>`;
        if (isCustom) {
            headerHtml = `
                <div class="recipe-header">
                    <h3>${recipe.title}</h3>
                    <button class="delete-btn" title="Delete Recipe">✕</button>
                </div>
            `;
        }

        card.innerHTML = `
            ${headerHtml}
            <p class="desc">${recipe.desc || ''}</p>
            <div class="content">${recipe.content || ''}</div>
        `;

        if (isCustom) {
            card.querySelector('.delete-btn').onclick = (e) => {
                e.stopPropagation();
                if (confirm(`Delete recipe "${recipe.title}"?`)) {
                    deleteCustomRecipe(recipe.id);
                }
            };
        }

        return card;
    }

    function deleteCustomRecipe(id) {
        let recipes = getStore(STORE.customRecipes);
        recipes = recipes.filter(r => r.id !== id);
        setStore(STORE.customRecipes, recipes);
        initRecipes();
    }

    // ---------- TAB NAVIGATION ----------
    function setupTabs() {
        document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
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
        const saveBtn = document.getElementById('save-btn');
        const resetBtn = document.getElementById('reset-btn');

        btn.onclick = () => {
            // Render custom options (from imports)
            renderOptions('breakfast');
            renderOptions('lunch');
            renderOptions('dinner');

            populateOptions();

            // Determine active tab based on time (issue #9)
            let activeTab = 'breakfast';
            if (hour >= 11 && hour < 15) activeTab = 'lunch';
            else if (hour >= 15) activeTab = 'dinner';

            // Reset all tabs and panels
            document.querySelectorAll('.modal-tabs .tab-btn').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.options-panel').forEach(p => p.classList.remove('active'));

            // Activate time-appropriate tab
            const targetTab = document.querySelector(`.modal-tabs .tab-btn[data-meal="${activeTab}"]`);
            if (targetTab) {
                targetTab.classList.add('active');
                document.getElementById(`options-${activeTab}`).classList.add('active');
            }

            modal.classList.remove('hidden');
        };

        // Modal Tabs
        document.querySelectorAll('.modal-tabs .tab-btn').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.modal-tabs .tab-btn').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.options-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(`options-${tab.dataset.meal}`).classList.add('active');
            };
        });

        modal.querySelectorAll('[data-close]').forEach(el => el.onclick = () => modal.classList.add('hidden'));
        modal.onclick = (e) => { if (e.target === modal) modal.classList.add('hidden'); };

        saveBtn.onclick = () => {
            saveSelections();
            loadMeals();
            initWeekly(); // Refresh Weekly tab to show updated meals
            modal.classList.add('hidden');
        };

        resetBtn.onclick = () => {
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
            MEAL_OPTIONS[type].forEach(m => panel.appendChild(createOptionCard(m, type, used, selections, false)));
            customMeals.filter(m => m.type === type).forEach(m => panel.appendChild(createOptionCard(m, type, used, selections, true)));
        });
    }

    function createOptionCard(meal, type, used, selections, isCustom) {
        const card = document.createElement('div');
        card.className = 'option-card'; // Styling handles validation

        // Add delete button for custom meals
        let deleteHtml = '';
        if (isCustom) {
            deleteHtml = `<button class="delete-btn" style="position: absolute; right: 10px; top: 10px;">✕</button>`;
            card.style.position = 'relative';
        }

        if (used.includes(meal.id)) card.classList.add('used');
        if (selections[type]?.id === meal.id) card.classList.add('selected');

        card.dataset.id = meal.id;
        card.innerHTML = `
            <div class="option-title">${meal.title}</div>
            <div class="option-desc">${meal.desc || ''}</div>
            ${deleteHtml}
        `;

        card.onclick = (e) => {
            if (e.target.classList.contains('delete-btn')) {
                e.stopPropagation();
                if (confirm(`Delete meal "${meal.title}"?`)) {
                    deleteCustomMeal(meal.id);
                    populateOptions(); // Refresh
                }
                return;
            }
            if (!card.classList.contains('used')) {
                card.parentElement.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            }
        };
        return card;
    }

    function renderOptions(mealType) {
        const container = document.getElementById(`options-${mealType}`);
        if (!container) return;

        // Get default + custom imported options
        const defaultOptions = MEAL_OPTIONS[mealType] || [];
        const customOptions = (getStore('customMealOptions') || {})[mealType] || [];
        const allOptions = [...defaultOptions, ...customOptions];

        container.innerHTML = '';
        allOptions.forEach(opt => {
            const card = document.createElement('div');
            card.className = 'meal-option-card';
            card.innerHTML = `
                <h4>${opt.title}</h4>
                <p>${opt.desc || ''}</p>
            `;
            card.onclick = () => {
                document.querySelectorAll(`#options-${mealType} .meal-option-card`).forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                customizeOptions[mealType] = opt;
            };
            // Pre-select if already selected
            const existing = getStore(STORE[`used${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`]);
            if (existing.includes(opt.id)) card.classList.add('selected');
            container.appendChild(card);
        });
    }
    function deleteCustomMeal(id) {
        let meals = getStore(STORE.customMeals);
        meals = meals.filter(m => m.id !== id);
        setStore(STORE.customMeals, meals);
        initPrepare(); // Update grocery list
    }

    function saveSelections() {
        const selections = getStore(STORE.selections);
        const used = getStore(STORE.used);
        const dayKey = today.toDateString();
        selections[dayKey] = {};

        ['breakfast', 'lunch', 'dinner'].forEach(type => {
            const selected = document.querySelector(`#options-${type} .option-card.selected`);
            if (selected) {
                const title = selected.querySelector('.option-title').textContent;
                const desc = selected.querySelector('.option-desc').textContent;
                const id = selected.dataset.id;
                selections[dayKey][type] = { id, title, desc };
                if (!used.includes(id)) used.push(id);
            }
        });
        setStore(STORE.selections, selections);
        setStore(STORE.used, used);
    }

    // ---------- ADD MODAL ----------
    function setupAddModal() {
        const modal = document.getElementById('add-modal');
        const fab = document.getElementById('fab');
        const mealTypeGroup = document.getElementById('meal-type-group');
        const recipeContentGroup = document.getElementById('recipe-content-group');
        const ingredientsGroup = document.getElementById('ingredients-group');

        // Only FAB opens modal now
        fab.onclick = () => openAddModal();

        // Diet-friendly toggle buttons
        document.querySelectorAll('.diet-option').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.diet-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const isDiet = btn.dataset.value === 'yes';
                mealTypeGroup.style.display = isDiet ? 'none' : 'block';
                recipeContentGroup.style.display = isDiet ? 'block' : 'none';
            };
        });

        function openAddModal() {
            document.getElementById('add-modal-title').textContent = 'Add New Meal';
            document.getElementById('add-form').reset();

            // Reset to normal meal mode (No selected)
            document.querySelectorAll('.diet-option').forEach(b => b.classList.remove('active'));
            document.querySelector('.diet-option[data-value="no"]').classList.add('active');
            mealTypeGroup.style.display = 'block';
            recipeContentGroup.style.display = 'none';
            ingredientsGroup.style.display = 'block';

            // Properly reset ingredients section
            ingContainer.innerHTML = '';
            ingContainer.classList.add('hidden');
            addIngBtn.classList.add('hidden');
            showIngBtn.classList.remove('hidden');

            // Reset meal type toggles
            document.querySelectorAll('.type-btn').forEach(t => t.classList.remove('active'));

            modal.classList.remove('hidden');
        }

        modal.querySelectorAll('[data-close]').forEach(el => el.onclick = () => modal.classList.add('hidden'));
        modal.onclick = e => { if (e.target === modal) modal.classList.add('hidden'); };

        // Handle meal type selection with new class system
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
        });

        const ingGroup = document.getElementById('ingredients-group');
        const ingContainer = document.getElementById('ingredients-inputs');
        const addIngBtn = document.getElementById('add-ing-btn');
        const showIngBtn = document.getElementById('show-ing-btn');

        // Toggle ingredients visibility
        showIngBtn.onclick = () => {
            ingContainer.classList.remove('hidden');
            addIngBtn.classList.remove('hidden');
            showIngBtn.classList.add('hidden');
            // Add first input if empty
            if (ingContainer.children.length === 0) {
                addIngInput();
            }
        };

        addIngBtn.onclick = () => addIngInput();

        function addIngInput() {
            if (ingContainer.children.length < 5) {
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-bottom: 8px;';

                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'ing-input';
                input.placeholder = `Ingredient ${ingContainer.children.length + 1}`;
                input.style.marginBottom = '0'; // Override default margin

                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.textContent = '✕';
                removeBtn.className = 'remove-ing-btn';
                removeBtn.style.cssText = 'background: var(--tint-danger); color: white; border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; font-size: 14px; flex-shrink: 0;';
                removeBtn.onclick = () => wrapper.remove();

                wrapper.appendChild(input);
                wrapper.appendChild(removeBtn);
                ingContainer.appendChild(wrapper);
            }
        }

        document.getElementById('submit-add').onclick = () => {
            const name = document.getElementById('add-name').value.trim();
            if (!name) return alert('Name is required');
            const desc = document.getElementById('add-desc').value.trim();
            const isDiet = document.querySelector('.diet-option.active')?.dataset.value === 'yes';
            const ings = [...document.querySelectorAll('.ing-input')].map(i => i.value.trim()).filter(Boolean);

            if (isDiet) {
                // Diet-friendly meal/recipe
                const content = document.getElementById('add-content').value.trim();
                if (!content) return alert('Please add recipe steps/instructions for diet-friendly meals');

                // Save as BOTH meal and recipe
                const id = `df_${Date.now()}`;

                // Add to recipes for display in Recipes tab
                const recipes = getStore(STORE.customRecipes);
                recipes.push({ id, title: name, desc, content, isDietFriendly: true });
                setStore(STORE.customRecipes, recipes);

                // Also add to all meal types so it appears in customization for any meal
                const meals = getStore(STORE.customMeals);
                ['breakfast', 'lunch', 'dinner'].forEach(type => {
                    meals.push({
                        id: `${id}_${type}`,
                        title: `${name} 🥗`,
                        desc,
                        type,
                        ingredients: ings,
                        isDietFriendly: true,
                        recipeContent: content
                    });
                });
                setStore(STORE.customMeals, meals);

                // Dynamic refresh - no page reload needed!
                initPrepare();
                initRecipes();
                initManage();

                alert(`✅ "${name}" added as diet-friendly meal!`);
            } else {
                // Normal meal
                const activeType = document.querySelector('.type-btn.active');
                if (!activeType) return alert('Please select a meal type (Breakfast, Lunch, or Dinner)');
                const mType = activeType.dataset.value;

                const meals = getStore(STORE.customMeals);
                meals.push({ id: `cm_${Date.now()}`, title: name, desc, type: mType, ingredients: ings });
                setStore(STORE.customMeals, meals);

                // Dynamic refresh
                initPrepare();
                initManage();

                alert(`✅ "${name}" added successfully!`);
            }
            modal.classList.add('hidden');
        };
    }

    // ---------- HELPERS ----------
    function getStore(key) {
        try {
            const val = JSON.parse(localStorage.getItem(key));
            if (key.includes('used') || key.includes('custom')) return val || [];
            return val || {};
        } catch { return key.includes('used') || key.includes('custom') ? [] : {}; }
    }
    function setStore(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

    // ---------- MANAGE TAB ----------
    // ---------- MANAGE TAB ----------
    function initManage() {
        const mealsContainer = document.getElementById('manage-meals-list');
        mealsContainer.innerHTML = '';

        // Get all custom meals
        const customMeals = getStore(STORE.customMeals);
        const customRecipes = getStore(STORE.customRecipes);

        // Group meals by base ID to avoid showing diet-friendly 3x
        const mealGroups = new Map();
        customMeals.forEach(meal => {
            const baseId = meal.isDietFriendly ? meal.id.split('_')[0] + '_' + meal.id.split('_')[1] : meal.id;
            if (!mealGroups.has(baseId)) {
                mealGroups.set(baseId, meal);
            }
        });

        // Also add custom recipes that aren't diet-friendly duplicates
        customRecipes.forEach(recipe => {
            if (!mealGroups.has(recipe.id)) {
                mealGroups.set(recipe.id, { ...recipe, isDietFriendly: true });
            }
        });

        if (mealGroups.size === 0) {
            mealsContainer.innerHTML = '<p style="opacity:0.6; grid-column: 1/-1;">No custom meals yet. Add one using the + button!</p>';
        } else {
            mealGroups.forEach(meal => {
                mealsContainer.appendChild(createManageMealCard(meal));
            });
        }
    }

    function createManageMealCard(meal) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        const typeLabel = meal.isDietFriendly ? 'Diet-Friendly (All meals)' : meal.type.charAt(0).toUpperCase() + meal.type.slice(1);

        card.innerHTML = `
            <div class="recipe-header" style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <h3>${meal.title}</h3>
                    <small style="opacity: 0.7;">${typeLabel}</small>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-secondary edit-meal-btn" data-id="${meal.id}" style="padding: 8px 12px;">✏️ Edit</button>
                    <button class="delete-btn" data-id="${meal.id}" title="Delete">✕</button>
                </div>
            </div>
            <p class="desc">${meal.desc || 'No description'}</p>
            ${meal.ingredients && meal.ingredients.length > 0 ? `<p style="font-size: 0.85em; opacity: 0.7;"><strong>Ingredients:</strong> ${meal.ingredients.join(', ')}</p>` : ''}
        `;

        card.querySelector('.edit-meal-btn').onclick = () => editMeal(meal);
        card.querySelector('.delete-btn').onclick = () => deleteMeal(meal.id, meal.isDietFriendly);
        return card;
    }

    function createManageRecipeCard(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card';

        card.innerHTML = `
            <div class="recipe-header" style="display: flex; justify-content: space-between; align-items: start;">
                <h3>${recipe.title}</h3>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-secondary edit-recipe-btn" data-id="${recipe.id}" style="padding: 8px 12px;">✏️ Edit</button>
                    <button class="delete-btn" data-id="${recipe.id}" title="Delete">✕</button>
                </div>
            </div>
            <p class="desc">${recipe.desc || 'No description'}</p>
        `;

        card.querySelector('.edit-recipe-btn').onclick = () => editRecipe(recipe);
        card.querySelector('.delete-btn').onclick = () => deleteRecipe(recipe.id, recipe.isDietFriendly);
        return card;
    }

    function editMeal(meal) {
        // Populate add modal with existing data
        const modal = document.getElementById('add-modal');
        document.getElementById('add-modal-title').textContent = 'Edit Meal';
        document.getElementById('add-name').value = meal.title.replace(' 🥗', '');
        document.getElementById('add-desc').value = meal.desc || '';

        // Set diet-friendly toggle
        document.querySelectorAll('.diet-option').forEach(b => b.classList.remove('active'));
        if (meal.isDietFriendly) {
            document.querySelector('.diet-option[data-value="yes"]').classList.add('active');
            document.getElementById('meal-type-group').style.display = 'none';
            document.getElementById('recipe-content-group').style.display = 'block';
            document.getElementById('add-content').value = meal.recipeContent || '';
        } else {
            document.querySelector('.diet-option[data-value="no"]').classList.add('active');
            document.getElementById('meal-type-group').style.display = 'block';
            document.getElementById('recipe-content-group').style.display = 'none';

            // Select meal type
            document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`.type-btn[data-value="${meal.type}"]`)?.classList.add('active');
        }

        // Populate ingredients
        const ingContainer = document.getElementById('ingredients-inputs');
        const showIngBtn = document.getElementById('show-ing-btn');
        const addIngBtn = document.getElementById('add-ing-btn');

        if (meal.ingredients && meal.ingredients.length > 0) {
            ingContainer.innerHTML = '';
            ingContainer.classList.remove('hidden');
            addIngBtn.classList.remove('hidden');
            showIngBtn.classList.add('hidden');

            meal.ingredients.forEach(ing => {
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-bottom: 8px;';

                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'ing-input';
                input.value = ing;
                input.style.marginBottom = '0';

                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.textContent = '✕';
                removeBtn.style.cssText = 'background: var(--tint-danger); color: white; border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; font-size: 14px; flex-shrink: 0;';
                removeBtn.onclick = () => wrapper.remove();

                wrapper.appendChild(input);
                wrapper.appendChild(removeBtn);
                ingContainer.appendChild(wrapper);
            });
        }

        // Change submit to update
        const submitBtn = document.getElementById('submit-add');
        submitBtn.textContent = 'Update';
        submitBtn.onclick = () => updateMeal(meal.id, meal.isDietFriendly);

        modal.classList.remove('hidden');
    }

    function editRecipe(recipe) {
        const modal = document.getElementById('add-modal');
        document.getElementById('add-modal-title').textContent = 'Edit Recipe';
        document.getElementById('add-name').value = recipe.title;
        document.getElementById('add-desc').value = recipe.desc || '';
        document.getElementById('add-content').value = recipe.content || '';

        // Set to recipe mode
        document.querySelectorAll('.diet-option').forEach(b => b.classList.remove('active'));
        document.querySelector('.diet-option[data-value="yes"]').classList.add('active');
        document.getElementById('meal-type-group').style.display = 'none';
        document.getElementById('recipe-content-group').style.display = 'block';
        document.getElementById('ingredients-group').style.display = 'block';

        const submitBtn = document.getElementById('submit-add');
        submitBtn.textContent = 'Update';
        submitBtn.onclick = () => updateRecipe(recipe.id);

        modal.classList.remove('hidden');
    }

    function updateMeal(oldId, isDietFriendly) {
        const name = document.getElementById('add-name').value.trim();
        if (!name) return alert('Name is required');

        const desc = document.getElementById('add-desc').value.trim();
        const ings = [...document.querySelectorAll('.ing-input')].map(i => i.value.trim()).filter(Boolean);

        const meals = getStore(STORE.customMeals);

        if (isDietFriendly) {
            // Update all 3 instances
            const baseId = oldId.split('_')[0] + '_' + oldId.split('_')[1];
            const content = document.getElementById('add-content').value.trim();

            meals.forEach(m => {
                if (m.id.startsWith(baseId)) {
                    m.title = `${name} 🥗`;
                    m.desc = desc;
                    m.ingredients = ings;
                    m.recipeContent = content;
                }
            });

            // Update recipe too
            const recipes = getStore(STORE.customRecipes);
            const recipeIndex = recipes.findIndex(r => r.id.startsWith(baseId));
            if (recipeIndex !== -1) {
                recipes[recipeIndex].title = name;
                recipes[recipeIndex].desc = desc;
                recipes[recipeIndex].content = content;
                setStore(STORE.customRecipes, recipes);
            }
        } else {
            const mealIndex = meals.findIndex(m => m.id === oldId);
            if (mealIndex !== -1) {
                const activeType = document.querySelector('.type-btn.active');
                meals[mealIndex].title = name;
                meals[mealIndex].desc = desc;
                meals[mealIndex].type = activeType?.dataset.value || meals[mealIndex].type;
                meals[mealIndex].ingredients = ings;
            }
        }

        setStore(STORE.customMeals, meals);
        initManage();
        initPrepare();
        initRecipes();
        document.getElementById('add-modal').classList.add('hidden');
        alert('✅ Meal updated successfully!');

        // Reset submit button
        const submitBtn = document.getElementById('submit-add');
        submitBtn.textContent = 'Save';
        setupAddModal(); // Re-setup original save handler
    }

    function updateRecipe(oldId) {
        const name = document.getElementById('add-name').value.trim();
        if (!name) return alert('Name is required');

        const desc = document.getElementById('add-desc').value.trim();
        const content = document.getElementById('add-content').value.trim();

        const recipes = getStore(STORE.customRecipes);
        const index = recipes.findIndex(r => r.id === oldId);

        if (index !== -1) {
            recipes[index].title = name;
            recipes[index].desc = desc;
            recipes[index].content = content;
            setStore(STORE.customRecipes, recipes);
        }

        initManage();
        initRecipes();
        document.getElementById('add-modal').classList.add('hidden');
        alert('✅ Recipe updated successfully!');

        // Reset submit button
        const submitBtn = document.getElementById('submit-add');
        submitBtn.textContent = 'Save';
        setupAddModal();
    }

    function deleteMeal(id, isDietFriendly) {
        if (!confirm('Are you sure you want to delete this meal?')) return;

        const meals = getStore(STORE.customMeals);

        if (isDietFriendly) {
            // Delete all 3 instances
            const baseId = id.split('_')[0] + '_' + id.split('_')[1];
            const filtered = meals.filter(m => !m.id.startsWith(baseId));
            setStore(STORE.customMeals, filtered);

            // Delete from recipes too
            const recipes = getStore(STORE.customRecipes);
            const filteredRecipes = recipes.filter(r => !r.id.startsWith(baseId));
            setStore(STORE.customRecipes, filteredRecipes);
            initRecipes(); // Refresh recipes tab
        } else {
            const filtered = meals.filter(m => m.id !== id);
            setStore(STORE.customMeals, filtered);
        }

        initManage(); // Refresh manage tab
        initPrepare(); // CRITICAL: Refresh Prep tab to remove deleted meal's ingredients
        initToday(); // Refresh Today tab to remove deleted meal
        alert('✅ Meal deleted successfully!');
    }

    function deleteRecipe(id, isDietFriendly) {
        if (!confirm('Are you sure you want to delete this recipe?')) return;

        const recipes = getStore(STORE.customRecipes);
        const filtered = recipes.filter(r => r.id !== id);
        setStore(STORE.customRecipes, filtered);

        // If diet-friendly, also delete from meals
        if (isDietFriendly) {
            const meals = getStore(STORE.customMeals);
            const baseId = id.split('_')[0] + '_' + id.split('_')[1];
            const filteredMeals = meals.filter(m => !m.id.startsWith(baseId));
            setStore(STORE.customMeals, filteredMeals);
            initPrepare();
        }

        initManage();
        initRecipes();
        initToday(); //  Refresh Today tab
        alert('✅ Recipe deleted successfully!');
    }

    // ---------- IMPORT/EXPORT DATA ----------
    function setupImportExport() {
        const exportBtn = document.getElementById('export-data-btn');
        const downloadSampleBtn = document.getElementById('download-sample-btn');
        const importBtn = document.getElementById('import-data-btn');
        const fileInput = document.getElementById('import-file-input');

        if (exportBtn) {
            exportBtn.onclick = exportData;
        }

        if (downloadSampleBtn) {
            downloadSampleBtn.onclick = downloadSamplePlan;
        }

        if (importBtn && fileInput) {
            importBtn.onclick = () => fileInput.click();
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) importData(file);
                fileInput.value = ''; // Reset for re-import
            };
        }
    }

    function downloadSamplePlan() {
        // Create sample plan with default meals from data.js
        const samplePlan = {
            version: '1.3.0',
            exportDate: new Date().toISOString(),
            appName: 'Nourish Daily - Sample Meal Plan',
            description: 'This is a sample meal plan. Import this to see example meals and recipes.',
            data: {
                customMeals: [],
                customRecipes: [],
                mealOptions: {
                    breakfast: MEAL_OPTIONS.breakfast || [],
                    lunch: MEAL_OPTIONS.lunch || [],
                    dinner: MEAL_OPTIONS.dinner || []
                },
                used_breakfast: [],
                used_lunch: [],
                used_dinner: []
            }
        };

        const json = JSON.stringify(samplePlan, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nourish-daily-sample-plan.json';
        a.click();
        URL.revokeObjectURL(url);

        const optionCount = (samplePlan.data.mealOptions.breakfast?.length || 0) +
            (samplePlan.data.mealOptions.lunch?.length || 0) +
            (samplePlan.data.mealOptions.dinner?.length || 0);

        alert(`✅ Sample plan downloaded!\n\n${optionCount} meal options included\n\nImport this file to see example meals.`);
    }

    function exportData() {
        const data = {
            version: '1.2.0',
            exportDate: new Date().toISOString(),
            appName: 'Nourish Daily',
            data: {
                customMeals: getStore(STORE.customMeals),
                customRecipes: getStore(STORE.customRecipes),
                used_breakfast: getStore(STORE.usedBreakfast),
                used_lunch: getStore(STORE.usedLunch),
                used_dinner: getStore(STORE.usedDinner)
            }
        };

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const dateStr = new Date().toISOString().split('T')[0];
        a.href = url;
        a.download = `nourish-daily-backup-${dateStr}.json`;
        a.click();
        URL.revokeObjectURL(url);

        const itemCount = data.data.customMeals.length + data.data.customRecipes.length;
        alert(`✅ Data exported!\n\n${itemCount} items saved to:\n${a.download}`);
    }

    function importData(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);

                // Validate structure
                if (!imported.data || !imported.version) {
                    throw new Error('Invalid backup file format');
                }

                // Confirm with user
                const itemCount = (imported.data.customMeals?.length || 0) +
                    (imported.data.customRecipes?.length || 0);

                const action = confirm(
                    `Import ${itemCount} items from backup?\n\n` +
                    `✅ MERGE: Keep existing data and add imported items\n` +
                    `❌ CANCEL: Keep current data unchanged\n\n` +
                    `Click OK to MERGE, Cancel to abort.`
                );

                if (!action) {
                    alert('Import cancelled.');
                    return;
                }

                // Merge data
                const currentMeals = getStore(STORE.customMeals);
                const currentRecipes = getStore(STORE.customRecipes);

                // Merge avoiding duplicates by ID
                const mergedMeals = [...currentMeals];
                (imported.data.customMeals || []).forEach(meal => {
                    if (!mergedMeals.find(m => m.id === meal.id)) {
                        mergedMeals.push(meal);
                    }
                });

                const mergedRecipes = [...currentRecipes];
                (imported.data.customRecipes || []).forEach(recipe => {
                    if (!mergedRecipes.find(r => r.id === recipe.id)) {
                        mergedRecipes.push(recipe);
                    }
                });

                // Save merged data
                setStore(STORE.customMeals, mergedMeals);
                setStore(STORE.customRecipes, mergedRecipes);

                //Also import used meals if available
                if (imported.data.used_breakfast) setStore(STORE.usedBreakfast, imported.data.used_breakfast);
                if (imported.data.used_lunch) setStore(STORE.usedLunch, imported.data.used_lunch);
                if (imported.data.used_dinner) setStore(STORE.usedDinner, imported.data.used_dinner);

                // Import mealOptions as custom meals (adds to Recipes tab)
                let importedMealsCount = 0;
                if (imported.data.mealOptions) {
                    const existingMeals = getStore(STORE.customMeals);
                    const existingTitles = new Set(existingMeals.map(m => m.title.toLowerCase().trim()));

                    // Also check default MEAL_OPTIONS titles
                    ['breakfast', 'lunch', 'dinner'].forEach(type => {
                        (MEAL_OPTIONS[type] || []).forEach(m => {
                            existingTitles.add(m.title.toLowerCase().trim());
                        });
                    });

                    ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
                        const importedOptions = imported.data.mealOptions[mealType] || [];

                        importedOptions.forEach(option => {
                            const titleLower = option.title.toLowerCase().trim();

                            // Skip if title already exists (deduplication by title)
                            if (!existingTitles.has(titleLower)) {
                                existingMeals.push({
                                    id: `imported_${mealType}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                                    title: option.title,
                                    desc: option.desc || '',
                                    type: mealType,
                                    ingredients: option.ingredients || [],
                                    isImported: true
                                });
                                existingTitles.add(titleLower);
                                importedMealsCount++;
                            }
                        });
                    });

                    setStore(STORE.customMeals, existingMeals);
                }

                // Refresh all tabs
                initToday();
                initWeekly();
                initPrepare();
                initRecipes();
                initManage();

                const added = (mergedMeals.length - currentMeals.length) +
                    (mergedRecipes.length - currentRecipes.length);

                alert(
                    `✅ Data imported successfully!\n\n` +
                    `${importedMealsCount} new meals added to Recipes\n` +
                    `${added} custom items merged\n` +
                    `Total: ${mergedMeals.length + importedMealsCount} meals`
                );

            } catch (error) {
                alert(`❌ Import failed: ${error.message}\n\nPlease check the file and try again.`);
                console.error('Import error:', error);
            }
        };

        reader.onerror = () => {
            alert('❌ Error reading file. Please try again.');
        };

        reader.readAsText(file);
    }

    // Initialize import/export
    setupImportExport();

});
