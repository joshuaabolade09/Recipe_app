import { useSearchParams, useNavigate } from "react-router-dom";
import { ReactContext } from "../Context/Context";
import { useEffect, useState, useContext, useMemo, useCallback } from "react";
import ModalPlanner from "./ModalPlanner";

export default function MealPlannerWorldClass() {
  const { allRecipes } = useContext(ReactContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState(0);
  const [budgetError, setBudgetError] = useState(false);

  // 1. Safely parse initial local storage data once
  const savedPrefs = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("mealPlanned")) || {};
    } catch {
      return {};
    }
  }, []);

  // 2. Derive configuration safely from search params OR localStorage fallback
  const budget = Number(searchParams.get("budget") || savedPrefs?.budget || 0);
  const mealPeople = Number(searchParams.get("people") || savedPrefs?.mealPeople || 1);
  const mealNumber = searchParams.get("meals") || savedPrefs?.mealNumber || "3";
  const diet = searchParams.get("diet") || savedPrefs?.diet || "mixed";

  // 3. Initialize state directly from storage if it exists
  const [generatedMeals, setGenerateMeals] = useState(() => {
    if (savedPrefs && savedPrefs.plan && savedPrefs.plan.length > 0) {
      return savedPrefs.plan;
    }
    return [];
  });

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", 
    "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const sundayObj = useMemo(() => {
    const current = new Date();
    const sunday = new Date(current);
    sunday.setDate(current.getDate() - current.getDay());
    return sunday;
  }, []);

  function openEditBudgetModal() {
    navigate("/modal");
  }

  function formatDate(dateObj) {
    const dayIdx = dateObj.getDay();
    const mthIdx = dateObj.getMonth();
    const dates = dateObj.getDate();
    const fullYear = dateObj.getFullYear();

    return {
      dayName: daysOfWeek[dayIdx].slice(0, 3),
      fullDayName: daysOfWeek[dayIdx],
      monthName: monthNames[mthIdx].slice(0, 3),
      fullMonthName: monthNames[mthIdx],
      date: dates,
      fullDate: `${dates}, ${monthNames[mthIdx]} ${fullYear}`,
    };
  }

  const weekData = useMemo(() => {
    const weekInfo = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(sundayObj);
      currentDate.setDate(sundayObj.getDate() + i);
      weekInfo.push(formatDate(currentDate));
    }
    return weekInfo;
  }, [sundayObj]);

  const foodNames = useMemo(() => {
    if (String(mealNumber) === "3") return ["Breakfast", "Lunch", "Dinner"];
    if (String(mealNumber) === "2") return ["Lunch", "Dinner"];
    if (String(mealNumber) === "1") return ["Dinner"];
    return [];
  }, [mealNumber]);

  const DailyBudget = budget ? Math.floor(budget / 7) : 0;

  // 4. Wrapped generation core logic in useCallback to safely track dependencies
  const runMealGeneration = useCallback((selectedDiet) => {
    if (!allRecipes || allRecipes.length === 0) return [];
    setBudgetError(false);
    let filteredDiet = [];

    if (selectedDiet === "nigerian") {
      filteredDiet = allRecipes.filter((item) => item.category === "Nigerian");
    } else if (selectedDiet === "international") {
      filteredDiet = allRecipes.filter((item) => item.category === "International");
    } else {
      filteredDiet = allRecipes;
    }

    if (filteredDiet.length === 0) {
      setBudgetError(true);
      return [];
    }

    const allRecipeStored = [];
    for (let i = 0; i < 7; i++) {
      const recipeStore = [];
      for (let j = 0; j < foodNames.length; j++) {
        let mealBudget = 0;
        if (foodNames.length === 3) {
          if (j === 0) mealBudget = Math.floor(DailyBudget * 0.3);
          if (j === 1) mealBudget = Math.floor(DailyBudget * 0.3);
          if (j === 2) mealBudget = Math.floor(DailyBudget * 0.4);
        } else if (foodNames.length === 2) {
          if (j === 0) mealBudget = Math.floor(DailyBudget * 0.4);
          if (j === 1) mealBudget = Math.floor(DailyBudget * 0.6);
        } else if (foodNames.length === 1) {
          mealBudget = DailyBudget;
        }

        const budgetSafety = filteredDiet.filter(
          (item) => item.costEstimate * (mealPeople / item.servings) <= mealBudget
        );

        if (budgetSafety.length === 0) {
          setBudgetError(true);
          return [];
        }

        const randomIndex = Math.floor(Math.random() * budgetSafety.length);
        recipeStore.push(budgetSafety[randomIndex]);
    
      }
      allRecipeStored.push(recipeStore);
      
    }
    return allRecipeStored;
  }, [allRecipes, foodNames, DailyBudget, mealPeople]);

  // 5. Run generation ONLY if there is no pre-existing plan in state or storage
  useEffect(() => {
    if (!allRecipes || allRecipes.length === 0) return;
    
    if (generatedMeals.length === 0) {
      const newPlan = runMealGeneration(diet);
      if (newPlan.length > 0) {
        setGenerateMeals(newPlan);
      }
    }
  }, [allRecipes, diet, runMealGeneration, generatedMeals.length]);

  // 6. Dedicated Sync Effect: Automatically saves the plan whenever state changes manually
  useEffect(() => {
    if (generatedMeals.length > 0) {
      localStorage.setItem(
        "mealPlanned",
        JSON.stringify({
          mealPlan: sundayObj.toISOString(),
          plan: generatedMeals,
          mealNumber,
          diet,
          budget,
          mealPeople,
        })
      );
    }
  }, [generatedMeals, budget, mealPeople, mealNumber, diet, sundayObj]);
  let mealBudget;
  // 7. Manual Actions: Update a specific meal slot manually
  const handleSelectMeal = (dayIndex, mealIndex, newRecipe, ) => {
    setGenerateMeals((prevMeals) => {
    
if (mealIndex === 0 || mealIndex === 1) {
  mealBudget = Math.floor(DailyBudget * 0.3)
} else {
  mealBudget = Math.floor(DailyBudget * 0.4)
}
      const updated = [...prevMeals];
      updated[dayIndex] = [...updated[dayIndex]];
      updated[dayIndex][mealIndex] = newRecipe;
      return updated;
    });
  };

  const handleDeleteMeal = (dayIndex, mealIndex) => {
    setGenerateMeals((prevMeals) => {
      const updated = [...prevMeals];
      updated[dayIndex] = updated[dayIndex].filter((_, idx) => idx !== mealIndex);
      return updated;
    });
  };

  // Financial calculations
  const totalTime = generatedMeals[selectedDay]?.reduce((acc, mov) => acc + (mov?.cookTime || 0), 0) ?? 0;
  const totalCalories = generatedMeals[selectedDay]?.reduce((acc, mov) => acc + Number(mov?.calories || 0), 0) ?? 0;
  const totalCost = generatedMeals[selectedDay]?.reduce((acc, mov) => acc + (mov ? mov.costEstimate * (mealPeople / mov.servings) : 0), 0) ?? 0;
  const totalWeeklyCost = generatedMeals.flat().reduce((acc, mov) => acc + (mov ? mov.costEstimate * (mealPeople / mov.servings) : 0), 0) ?? 0;

  const totalWeeklyCost2 = Math.round(totalWeeklyCost);
  const totalCost2 = Math.round(totalCost);
  const foodPercentage = budget ? Math.min(Math.round((totalWeeklyCost / budget) * 100), 100) : 0;

  return (
    <div>
      {!budget ? (
        <ModalPlanner />
      ) : (
        <div className="min-h-dvh overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,116,23,.20),transparent_30%),linear-gradient(135deg,#fff7ed_0%,#ffe9d1_46%,#fffaf5_100%)] text-[#33211b] antialiased selection:bg-orange-200 selection:text-[#33211b]">
          <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,rgba(255,116,23,.18),transparent_32%),linear-gradient(135deg,#fff7ed_0%,#ffe9d1_48%,#fffaf5_100%)]">
            <main className="mx-auto min-h-screen w-full">
              <section className="border border-white/70 bg-[#fff8ef]/95 p-4 shadow-[0_18px_55px_rgba(112,66,31,.13)] backdrop-blur-xl transition duration-500 sm:p-6 lg:p-8">
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-orange-100 pb-5">
                  <div className="flex min-w-0 items-center gap-4">
                    <button 
                      onClick={() => navigate(-1)} 
                      className="group grid size-11 shrink-0 place-items-center rounded-xl border border-orange-100 bg-white text-[#8a5c45] shadow-[0_8px_24px_rgba(88,54,28,.08)] outline-none transition duration-300 hover:-translate-x-0.5 hover:border-orange-200 hover:bg-orange-50 focus-visible:ring-4 focus-visible:ring-orange-200" 
                      aria-label="Go back"
                    >
                      <svg className="size-5 transition duration-300 group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div className="min-w-0">
                      <h1 className="truncate text-2xl font-extrabold tracking-tight text-[#33211b] sm:text-3xl">Meal Planner</h1>
                      <p className="mt-1 text-sm font-medium leading-5 text-[#8a5c45] sm:text-base">Plan your weekly meals and stay on budget</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row">
                    <button className="group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-orange-100 bg-white px-3 py-2 text-[13px] leading-tight font-extrabold text-[#33211b] shadow-[0_8px_24px_rgba(88,54,28,.08)] transition duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 focus-visible:ring-4 focus-visible:ring-orange-200 sm:h-11 sm:w-auto sm:px-4 sm:text-sm">
                      <svg className="h-5 w-5 shrink-0 text-[#8a5c45] transition duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
                        <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                        <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
                        <path d="M8.65 10.55 15.35 6.45M8.65 13.45l6.7 4.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="whitespace-nowrap">Share Plan</span>
                    </button>

                    <button className="group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#ff7417] px-3 py-2 text-[13px] leading-tight font-extrabold text-white shadow-[0_10px_28px_rgba(255,116,23,.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e85f08] focus-visible:ring-4 focus-visible:ring-orange-200 sm:h-11 sm:w-auto sm:px-4 sm:text-sm">
                      <svg className="h-5 w-5 shrink-0 transition duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 4.8A2.8 2.8 0 0 1 8.8 2h6.4A2.8 2.8 0 0 1 18 4.8V21l-6-3.4L6 21V4.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      </svg>
                      <span className="whitespace-nowrap">Save Plan</span>
                    </button>
                  </div>
                </header>

                <section className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_.5fr] items-center">
                  <article className="overflow-hidden rounded-[28px] border border-[#f5d9bf] bg-[#fffaf5] p-4 shadow-[0_10px_35px_rgba(88,54,28,.07)] sm:p-5 lg:p-6">
                    <section className="rounded-[28px] border border-orange-100 bg-white/85 p-5 shadow-[0_18px_50px_rgba(120,72,32,0.10)] backdrop-blur sm:p-6">
                      <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-[1.45fr_1fr_1fr_auto] lg:items-center lg:gap-6">
                        <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-white p-4 ring-1 ring-orange-100/70 sm:p-5 lg:bg-transparent lg:p-0 lg:ring-0">
                          <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#9a674d]">Weekly Budget</p>
                          <h2 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#33211b] sm:text-[42px] lg:text-[44px]">
                            {budget ? `₦${Number(budget).toLocaleString()}` : "₦0"}
                          </h2>
                        </div>

                        <div className="rounded-2xl bg-[#fff8f1] p-4 ring-1 ring-orange-100/70 sm:p-5 lg:bg-transparent lg:p-0 lg:ring-0">
                          <p className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.14em] text-[#9a674d]">
                            <span className="size-2.5 rounded-full bg-[#ff7417] shadow-[0_0_0_5px_rgba(255,116,23,.12)]" />
                            Spent
                          </p>
                          <p className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#ff7417] sm:text-[28px]">
                            ₦{totalWeeklyCost2.toLocaleString()}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-emerald-50/70 p-4 ring-1 ring-emerald-100 sm:p-5 lg:bg-transparent lg:p-0 lg:ring-0">
                          <p className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.14em] text-[#7a604f]">
                            <span className="size-2.5 rounded-full bg-emerald-600 shadow-[0_0_0_5px_rgba(22,163,74,.12)]" />
                            Remaining
                          </p>
                          <p className="mt-2 text-2xl font-black tracking-[-0.03em] text-emerald-600 sm:text-[28px]">
                            ₦{(budget - totalWeeklyCost2).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center justify-start rounded-2xl bg-white/70 p-4 ring-1 ring-orange-100/70 sm:col-span-3 lg:col-span-1 lg:justify-end lg:bg-transparent lg:p-0 lg:ring-0">
                          <button
                            onClick={openEditBudgetModal}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-200 active:scale-95 shadow-sm"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit Plan
                          </button>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between text-sm font-extrabold text-[#9a674d]">
                          <span>Budget usage</span>
                          <span>{foodPercentage}% spent</span>
                        </div>
                        <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#ffe5ca] ring-1 ring-orange-100">
                          <div className="h-full rounded-full bg-gradient-to-r from-[#ff8a22] to-[#ff6414] shadow-[0_10px_24px_rgba(255,116,23,.24)] transition-all duration-700" style={{ width: `${foodPercentage}%` }}/>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#f7fff7] px-3 py-2 text-sm font-bold text-green-600">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full border border-green-200 bg-white">
                          <svg className="size-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="leading-relaxed">You're doing great! You're within your budget.</span>
                      </div>
                    </section>
                  </article>

                  <aside className="rounded-2xl border border-orange-100 bg-white/70 p-5 shadow-[0_8px_24px_rgba(88,54,28,.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(112,66,31,.13)]">
                    <p className="text-sm font-extrabold text-[#8a5c45]">{weekData[selectedDay]?.fullDayName} Summary</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-orange-50 p-4">
                        <svg className="size-7 text-[#ff7417]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 8h10M7 12h10M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <rect x="5" y="3" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <p className="mt-3 text-xs font-bold text-[#8a5c45]">Total Cost</p>
                        <p className="mt-1 text-lg font-black">₦{totalCost2.toLocaleString()}</p>
                      </div>

                      <div className="rounded-2xl bg-green-50 p-4">
                        <svg className="size-7 text-green-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 21c3.7-2.4 6-5.6 6-9.1 0-3.9-2.7-7-6-9-3.3 2-6 5.1-6 9 0 3.5 2.3 6.7 6 9Z" stroke="currentColor" strokeWidth="2" />
                          <path d="M12 8v6l3-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <p className="mt-3 text-xs font-bold text-[#8a5c45]">Total Calories</p>
                        <p className="mt-1 text-lg font-black">{totalCalories.toLocaleString()} cal</p>
                      </div>

                      <div className="rounded-2xl bg-amber-50 p-4">
                        <svg className="size-7 text-amber-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 3v8M11 3v8M7 11h4M9 11v10M16 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M16 3c2.4 1.6 3.6 3.8 3.2 6.4-.2 1.6-1.4 2.6-3.2 2.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <p className="mt-3 text-xs font-bold text-[#8a5c45]">Total Meals</p>
                        <p className="mt-1 text-lg font-black">{mealNumber} meals</p>
                      </div>

                      <div className="rounded-2xl bg-indigo-50 p-4">
                        <svg className="size-7 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-3 text-xs font-bold text-[#8a5c45]">Total Time</p>
                        <p className="mt-1 text-lg font-black">{totalTime} mins</p>
                      </div>
                    </div>
                  </aside>
                </section>

                <nav className="mt-5 flex items-center gap-3 overflow-x-auto rounded-2xl border border-orange-100 bg-white/80 p-3 shadow-[0_8px_24px_rgba(88,54,28,.08)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {weekData.map((day, index) => {
                    const active = index === selectedDay ? "bg-orange-500 text-white" : "bg-white/80 text-[#33211b]";
                    const labelColor = index === selectedDay ? "text-orange-100" : "text-[#8a5c45]";
                    return (
                      <button 
                        key={index} 
                        onClick={() => setSelectedDay(index)} 
                        className={`shrink-0 rounded-xl px-4 py-3 text-center transition hover:bg-orange-50 hover:text-[#33211b] ${active}`}
                      >
                        <span className="block text-sm font-black">{day.dayName}</span>
                        <span className={`mt-1 block text-xs font-semibold ${labelColor}`}>{day.date} {day.monthName}</span>
                      </button>
                    );
                  })}
                </nav>

                <section className="mt-5 rounded-2xl border border-orange-100 bg-white/75 p-4 shadow-[0_8px_24px_rgba(88,54,28,.08)] sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-bold text-[#33211b]">
                      {weekData[selectedDay]?.fullDayName} {weekData[selectedDay]?.fullDate}
                    </h2>
                    <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-4 text-sm font-extrabold text-[#ff7417] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-50 focus-visible:ring-4 focus-visible:ring-orange-200">
                      <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                      </svg>
                      Add Meal
                    </button>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {budgetError ? (
                      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
                        <h3 className="text-lg font-black text-[#33211b]">This budget may be too low</h3>
                        <p className="mt-2 text-sm font-semibold text-[#8a5c45]">
                          We could not create a full plan for {mealPeople} people, {mealNumber} meals daily, with a weekly budget of ₦{Number(budget).toLocaleString()}.
                        </p>
                        <button onClick={() => navigate(-1)} className="mt-4 rounded-xl bg-[#ff7417] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#e85f08]">
                          Edit Plan
                        </button>
                      </div>
                    ) : (
                      <>
                        {generatedMeals[selectedDay]?.map((mealItem, index) => (
                          <article key={index} className="group grid gap-3 rounded-2xl border border-orange-100 bg-white p-3 shadow-[0_8px_24px_rgba(88,54,28,.08)] transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_55px_rgba(112,66,31,.13)] sm:grid-cols-[112px_1fr_auto] sm:items-center lg:grid-cols-[140px_1fr_auto]">
                            <div className="flex items-center gap-3 sm:block">
                              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-50 text-[#ff7417]">
                                <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                  <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                  <circle cx="12" cy="12" r="4" fill="currentColor" />
                                </svg>
                              </div>
                              <div className="sm:mt-2">
                                <p className="text-sm font-black text-[#33211b]">{foodNames[index] || "Meal"}</p>
                                <p className="text-xs font-semibold text-[#8a5c45]">1 meal</p>
                              </div>
                            </div>

                            <div className="grid gap-3 min-[520px]:grid-cols-[112px_1fr] min-[520px]:items-center">
                              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-[#f7d794] via-[#fff7ed] to-[#d6a35d] shadow-inner">
                                <svg className="size-full p-6 transition duration-500 group-hover:scale-110" viewBox="0 0 120 90" fill="none" aria-hidden="true">
                                  <ellipse cx="60" cy="62" rx="46" ry="17" fill="#c77c32" opacity=".18" />
                                  <ellipse cx="60" cy="51" rx="42" ry="25" fill="#fff7ed" stroke="#d6a35d" strokeWidth="4" />
                                  <circle cx="45" cy="47" r="9" fill="#f5c542" />
                                  <circle cx="69" cy="43" r="8" fill="#f5c542" />
                                  <circle cx="77" cy="57" r="7" fill="#f5c542" />
                                  <path d="M35 56c12 5 34 8 52-4" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                              </div>
                              <div className="min-w-0">
                                <h3 className="truncate text-base font-black tracking-tight text-[#33211b]">{mealItem?.name || "No meal selected"}</h3>
                                <p className="mt-1 text-sm font-bold text-[#ff7417]">{mealItem?.cookTime || 0} mins</p>
                                <p className="mt-1 text-sm font-semibold text-[#8a5c45]">{Number(mealItem?.calories || 0)} cal · {mealPeople} servings</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                              <p className="text-sm font-black text-[#ff7417]">
                                ₦{mealItem ? Math.round(mealItem.costEstimate * (mealPeople / mealItem.servings)).toLocaleString() : 0}
                              </p>
                              <div className="flex gap-2">
                                {/* Wired up action handler triggers */}
                                <button 
                                  onClick={() => {
                                    let currentMealBudget = 0;
    if (foodNames.length === 3) {
      currentMealBudget = (index === 0 || index === 1) 
        ? Math.floor(DailyBudget * 0.3) 
        : Math.floor(DailyBudget * 0.4);
    } else if (foodNames.length === 2) {
      currentMealBudget = (index === 0) 
        ? Math.floor(DailyBudget * 0.4) 
        : Math.floor(DailyBudget * 0.6);
    } else if (foodNames.length === 1) {
      currentMealBudget = DailyBudget;
    }
                                    // Replace with your recipe picker modal context/trigger logic
                               const filteredResult = allRecipes.filter((item)=> item.costEstimate * (mealPeople / item.servings) <= currentMealBudget);
                                    const mockNewRecipe = filteredResult[Math.floor(Math.random() * filteredResult.length)];
                                    if(mockNewRecipe) handleSelectMeal(selectedDay, index, mockNewRecipe);
                                  }}
                                  className="grid px-2 py-1 place-items-center text-xs rounded-lg border border-orange-100 text-[#8a5c45] transition hover:bg-orange-50"
                                >
                                  Swap
                                </button>
                                <button 
                                  onClick={() => handleDeleteMeal(selectedDay, index)}
                                  className="grid px-2 py-1 place-items-center text-xs rounded-lg border border-orange-100 text-red-400 transition hover:bg-red-50"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </>
                    )}

                    <button className="group mt-2 flex min-h-[88px] items-center justify-center gap-4 rounded-2xl border border-dashed border-orange-200 bg-orange-50/45 px-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#ff7417] hover:bg-orange-50 focus-visible:ring-4 focus-visible:ring-orange-200">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#ff7417] text-white shadow-[0_10px_28px_rgba(255,116,23,.22)] transition duration-300 group-hover:rotate-90">
                        <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span>
                        <span className="block text-base font-black text-[#33211b]">
                          Add another meal to {weekData[selectedDay]?.fullDayName}
                        </span>
                        <span className="mt-1 block text-sm font-semibold text-[#8a5c45]">Click to add breakfast, lunch, dinner or snack</span>
                      </span>
                    </button>
                  </div>
                </section>

                <p className="mt-5 text-center text-sm font-semibold text-[#8a5c45]">ⓘ Tip: Drag and drop meals to reorder or move between days</p>
              </section>

              <button className="fixed bottom-5 right-5 z-50 grid size-20 place-items-center rounded-full bg-[#ff7417] text-white shadow-[0_10px_28px_rgba(255,116,23,.35)] outline-none transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#e85f08] focus-visible:ring-4 focus-visible:ring-orange-200 sm:bottom-8 sm:right-8 lg:size-24" aria-label="Quick add meal">
                <svg className="size-10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </button>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}