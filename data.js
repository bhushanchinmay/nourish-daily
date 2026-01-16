// ============================================
// NOURISH DAILY - DATA CONFIGURATION
// ============================================

// ---------- TIME SETTINGS ----------
// Morning: before 11 AM | Afternoon: 11 AM - 3 PM | Evening: 3 PM - 7 PM | Night: after 7 PM
const TIME_RANGES = {
    morning: { start: 0, end: 11 },
    afternoon: { start: 11, end: 15 },
    evening: { start: 15, end: 19 },
    night: { start: 19, end: 24 }
};

// ---------- WEEKLY MEAL PLAN ----------
const MEAL_DATA = {
    monday: {
        breakfast: { title: "Peanut & Kala Chana Chaat", desc: "High Protein start with Tomato/Lemon" },
        lunch: { title: "Palak Paneer Gravy", desc: "2 Rotis + Cucumber Salad. Eat Salad first" },
        dinner: { title: "Clear Veg Soup & Sautéed Paneer", desc: "No Roti. Light and early" },
        prep: ["Soak Soyabeans (Tue Lunch)", "Boil extra Chana (Tue Breakfast)"],
        groceries: ["Spinach/Palak", "Paneer", "Cucumber"]
    },
    tuesday: {
        breakfast: { title: "Moong Dal Chilla", desc: "Paneer Stuffed + Amla Chutney" },
        lunch: { title: "Soya (Nutrela) Curry", desc: "2 Rotis + Curd" },
        dinner: { title: "Steel Cut Oats Khichdi", desc: "70% Veggies (Gobhi/Peas). No Rice" },
        prep: ["Chop veggies for Upma", "Get Paneer ready (Wed Lunch)", "Soak Methi seeds"],
        groceries: ["Carrots & Beans", "Fresh Peas", "Onions & Tomatoes"]
    },
    wednesday: {
        breakfast: { title: "Ragi & Oats Uttapam", desc: "Veggie Topping + Chutney" },
        lunch: { title: "Kala Chana Sabji", desc: "Gravy + 2 Rotis + Tomato Salad" },
        dinner: { title: "Palak Corn Subzi", desc: "With Sautéed Mushrooms. No Roti" },
        prep: ["Soak Moong Dal (Thu Breakfast)", "Chop Mix Veggies (Thu Lunch)", "Soak Kabuli Chana"],
        groceries: ["Fresh Mushrooms", "Sweet Corn", "Capsicum"]
    },
    thursday: {
        breakfast: { title: "Chickpea (Chole) Chaat", desc: "Pressure cooked + Veggies" },
        lunch: { title: "Mushroom & Capsicum Masala", desc: "With Dal + 1-2 Rotis" },
        dinner: { title: "Quinoa Khichdi", desc: "With Moong Dal & Lauki" },
        prep: ["Soak Millet (Fri Dinner)", "Prepare Sattu stuffing"],
        groceries: ["Lauki/Bottle Gourd", "Ghee", "Fresh Lemons"]
    },
    friday: {
        breakfast: { title: "Sattu Paratha (1 pc)", desc: "With Curd + Amla Chutney" },
        lunch: { title: "Mix Veg Sabzi", desc: "Carrot/Beans + Paneer Slices + Roti" },
        dinner: { title: "Millet Khichdi", desc: "Foxtail/Barnyard. Easy digest" },
        prep: ["Soak Dosa Rice/Dal", "Soak Chickpeas (Sat Lunch)", "Get Cauliflower for Pav Bhaji"],
        groceries: ["Large Cauliflower", "Whole Wheat Pav", "Curd/Dahi"]
    },
    saturday: {
        breakfast: { title: "Paneer Paratha", desc: "With Curd + Pickle" },
        lunch: { title: "No-Potato Pav Bhaji", desc: "Cauliflower Base + WW Pav" },
        dinner: { title: "Besan Chilla", desc: "Thin/Crispy + Green Chutney" },
        prep: ["Check Idli Batter", "Chop Sambar veggies (Drumstick/Lauki)"],
        groceries: ["Drumsticks", "Sambar Dal (Toor)", "Fresh Coconut"]
    },
    sunday: {
        breakfast: { title: "2 Idlis + Sambhar", desc: "Drumstick/Lauki dominant" },
        lunch: { title: "Dosa + Sambhar", desc: "With Coconut Chutney" },
        dinner: { title: "Veg Clear Soup", desc: "With Dry Paneer Bhurji. No Carb" },
        prep: ["Soak Kala Chana & Peanuts", "Make Amla Chutney for week"],
        groceries: ["Peanuts & Kala Chana", "Fresh Coriander & Mint", "Ginger & Amla"]
    }
};

// ---------- MEAL OPTIONS (For Selection) ----------
const MEAL_OPTIONS = {
    breakfast: [
        { id: "bf1", title: "Peanut & Kala Chana Chaat", desc: "High Protein start" },
        { id: "bf2", title: "Moong Dal Chilla", desc: "Paneer Stuffed + Chutney" },
        { id: "bf3", title: "Ragi & Oats Uttapam", desc: "Veggie Topping" },
        { id: "bf4", title: "Chickpea Chaat", desc: "Pressure cooked + Veggies" },
        { id: "bf5", title: "Sattu Paratha", desc: "With Curd + Chutney" },
        { id: "bf6", title: "Paneer Paratha", desc: "With Curd + Pickle" },
        { id: "bf7", title: "Idlis + Sambhar", desc: "Light South Indian" },
        { id: "bf8", title: "Besan Chilla", desc: "Thin + Green Chutney" },
        { id: "bf9", title: "Vegetable Poha", desc: "Light flattened rice" },
        { id: "bf10", title: "Sprouts Salad", desc: "Mixed sprouts + lime" }
    ],
    lunch: [
        { id: "ln1", title: "Palak Paneer Gravy", desc: "2 Rotis + Salad" },
        { id: "ln2", title: "Soya Curry", desc: "2 Rotis + Curd" },
        { id: "ln3", title: "Kala Chana Sabji", desc: "Gravy + Rotis" },
        { id: "ln4", title: "Mushroom Masala", desc: "With Dal + Rotis" },
        { id: "ln5", title: "Mix Veg Sabzi", desc: "Paneer + Roti" },
        { id: "ln6", title: "No-Potato Pav Bhaji", desc: "Cauliflower Base" },
        { id: "ln7", title: "Dosa + Sambhar", desc: "South Indian" },
        { id: "ln8", title: "Rajma Curry", desc: "Brown Rice + Salad" },
        { id: "ln9", title: "Paneer Bhurji Wrap", desc: "WW Wrap + Veggies" },
        { id: "ln10", title: "Dal Tadka + Roti", desc: "Comfort food" }
    ],
    dinner: [
        { id: "dn1", title: "Clear Soup + Paneer", desc: "Light, No Roti" },
        { id: "dn2", title: "Oats Khichdi", desc: "70% Veggies" },
        { id: "dn3", title: "Palak Corn Subzi", desc: "With Mushrooms" },
        { id: "dn4", title: "Quinoa Khichdi", desc: "Moong Dal & Lauki" },
        { id: "dn5", title: "Millet Khichdi", desc: "Easy digest" },
        { id: "dn6", title: "Besan Chilla", desc: "Thin + Chutney" },
        { id: "dn7", title: "Veg Clear Soup", desc: "Paneer Bhurji side" },
        { id: "dn8", title: "Grilled Paneer Salad", desc: "Large salad" },
        { id: "dn9", title: "Lauki Kofta (Baked)", desc: "Low oil" },
        { id: "dn10", title: "Moong Dal Soup", desc: "With veggies" }
    ]
};

// ---------- SNACKS (Time-based) ----------
const SNACKS = {
    morning: [
        { title: "Soaked Almonds (6)", desc: "Brain boost + protein" },
        { title: "Apple + Cinnamon", desc: "Quick fiber fix" },
        { title: "Methi Water Shot", desc: "Blood sugar control" }
    ],
    afternoon: [
        { title: "Buttermilk (Chaas)", desc: "Cooling, probiotic" },
        { title: "Roasted Makhana", desc: "Light, crunchy" },
        { title: "Apple + Peanut Butter", desc: "Filling snack" },
        { title: "Mixed Nuts (10-12)", desc: "Almonds, walnuts" }
    ],
    evening: [
        { title: "Sprouts Chaat", desc: "High protein, tangy" },
        { title: "Paneer Cubes", desc: "With chaat masala" },
        { title: "Guava Slices", desc: "Low GI fruit" },
        { title: "Green Tea + Khakhra", desc: "Light crunch" }
    ],
    night: [
        { title: "Warm Turmeric Milk", desc: "Aids sleep & digestion" },
        { title: "Chamomile Tea", desc: "Calming, zero cal" },
        { title: "5-6 Soaked Almonds", desc: "Light protein" }
    ]
};

// ---------- QUICK BITES (Emergency Protocol) ----------
const QUICK_BITES = {
    hungry: {
        title: "🆘 Very Hungry?",
        desc: "Quick filling options:",
        items: [
            { title: "Besan Chilla", desc: "5-min protein fix" },
            { title: "Curd + Cucumber Raita", desc: "Instant, low effort" },
            { title: "2 Boiled Egg Whites", desc: "Ready in 10 min" },
            { title: "Peanut Butter Toast", desc: "Multigrain + 1 tbsp PB" }
        ]
    },
    lateNight: {
        title: "⚠️ Late Night Warning",
        desc: "Eating now affects morning glucose!",
        items: [
            { title: "Warm Lemon Water", desc: "Hydration only" },
            { title: "Chamomile Tea", desc: "Appetite suppressant" },
            { title: "10 Makhana", desc: "Last resort" }
        ],
        tip: "💡 Hunger often = tiredness. Sleep by 10:30 PM!"
    }
};

// ---------- RECIPES ----------
const RECIPES = [
    {
        id: "r1",
        title: "Coriander & Amla Chutney",
        desc: "Lowers blood sugar, boosts immunity",
        content: "1 cup Coriander + ½ cup Mint + 2 Amlas (deseeded) + Ginger + Chilli. Blend smooth. Lasts 3 days."
    },
    {
        id: "r2",
        title: "No-Potato Pav Bhaji",
        desc: "Diabetic-friendly, zero starch",
        content: "Boil Cauliflower (50%), Peas (20%), Carrots (10%). Mash well. Sauté with Pav Bhaji Masala."
    },
    {
        id: "r3",
        title: "High-Protein Khichdi",
        desc: "Oats/Quinoa based, no rice spike",
        content: "1 Cup Oats/Quinoa + ½ Cup Moong Dal + 2 Cups Veggies. Pressure cook 2-3 whistles."
    },
    {
        id: "r4",
        title: "Besan Chilla",
        desc: "Quick protein fix",
        content: "Mix besan + water + ginger + chilli + spinach. Cook thin on iron tawa with minimal oil."
    }
];

// ---------- DAILY ESSENTIALS ----------
const DAILY_ESSENTIALS = [
    "Soak Methi Seeds",
    "Soak Almonds & Walnuts",
    "Check Amla + Coriander",
    "Check Milk & Protein",
    "Fresh Fruits (Apple/Guava)"
];
