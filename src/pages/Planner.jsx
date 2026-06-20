import { useSearchParams } from "react-router-dom";
import { ReactContext } from "../Context/Context"
import { useContext } from "react";




export default function MealPlannerWorldClass() {

  const {allRecipes}= useContext(ReactContext)
  const [searchParams] = useSearchParams();

  const budget = searchParams.get("budget");
  const mealPeople = searchParams.get("people");
  const mealNumber = searchParams.get("meals");
  const diet=searchParams.get("diet")


  //Get current date and format it to display the day of the week and the date in a readable format
  const date= new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
 

  //Link Day of the week to the day
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  
function formatDate(date){
const days = date.getDay()
const month = date.getMonth() + 1;
const dates = date.getDate();

return {
  dayName: daysOfWeek[days].slice(0,3),
  monthName: monthNames[month - 1].slice(0,3),
  date: date.getDate(),
  fullDate: `${dates},${monthNames[month - 1]} ${year}`
}


}

function weeklyData(){
const weekInfo = [];

for(let i = 0; i < 7; i++){
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + i);
  weekInfo.push(formatDate(currentDate));

}
return weekInfo
}

const weekData = weeklyData();

const thisDay=  `${day},${monthNames[month - 1]} ${year}`


console.log(allRecipes)
//Sort out the meals based on the diet and meal number and people


const DailyBudget = Math.floor(budget/7)
console.log(DailyBudget)

function generateMeals(diet) {
  let filteredDiet;
  if (diet === "nigerian") {
    filteredDiet = allRecipes.filter((item) => item.category === "Nigerian");
  } else if (diet === "international") {
    filteredDiet = allRecipes.filter((item) => item.category === "International");
  } else if (diet === "Mixed") {
    filteredDiet = allRecipes;
  }

  const allRecipeStored = [];

  for (let i = 0; i < 7; i++) {
    const recipeStore = [];

    let foodNames;
    if (mealNumber === "3") {
      foodNames = ["Breakfast", "Lunch", "Dinner"];
    } else if (mealNumber === "2") {
      foodNames = ["Lunch", "Dinner"];
    } else if (mealNumber === "1") {
      foodNames = ["Dinner"];
    }

    for (let j = 0; j < foodNames.length; j++) {
      if (foodNames.length === 3) {
        if (j === 0) {
          const morningBudget = Math.floor(DailyBudget * 0.3);
          const budgetSafety = filteredDiet.filter((item) => item.costEstimate * (mealPeople / item.servings) <= morningBudget);
          const randomIndex = Math.floor(Math.random() * budgetSafety.length);
          const morningFood = budgetSafety[randomIndex];
          recipeStore.push(morningFood);
        }
        if (j === 1) {
          const afternoonBudget = Math.floor(DailyBudget * 0.3);
          const budgetSafety2 = filteredDiet.filter((item) => item.costEstimate * (mealPeople / item.servings) <= afternoonBudget);
          const randomIndex2 = Math.floor(Math.random() * budgetSafety2.length);
          const afternoonFood = budgetSafety2[randomIndex2];
          recipeStore.push(afternoonFood);
        }
        if (j === 2) {
          const eveningBudget = Math.floor(DailyBudget * 0.4);
          const budgetSafety3 = filteredDiet.filter((item) => item.costEstimate * (mealPeople / item.servings) <= eveningBudget);
          const randomIndex3 = Math.floor(Math.random() * budgetSafety3.length);
          const eveningFood = budgetSafety3[randomIndex3];
          recipeStore.push(eveningFood);
        }
      }

      if (foodNames.length === 2) {
        if (j === 0) {
          const morningBudget = Math.floor(DailyBudget * 0.4);
          const budgetSafety = filteredDiet.filter((item) => item.costEstimate * (mealPeople / item.servings) <= morningBudget);
          const randomIndex = Math.floor(Math.random() * budgetSafety.length);
          const morningFood = budgetSafety[randomIndex];
          recipeStore.push(morningFood);
        }
        if (j === 1) {
          const afternoonBudget = Math.floor(DailyBudget * 0.6);
          const budgetSafety2 = filteredDiet.filter((item) => item.costEstimate * (mealPeople / item.servings) <= afternoonBudget);
          const randomIndex2 = Math.floor(Math.random() * budgetSafety2.length);
          const afternoonFood = budgetSafety2[randomIndex2];
          recipeStore.push(afternoonFood);
        }
      }

      if (foodNames.length === 1) {
        if (j === 0) {
          const morningBudget = Math.floor(DailyBudget * 1);
          const budgetSafety = filteredDiet.filter((item) => item.costEstimate * (mealPeople / item.servings) <= morningBudget);
          const randomIndex = Math.floor(Math.random() * budgetSafety.length);
          const morningFood = budgetSafety[randomIndex];
          recipeStore.push(morningFood);

       
        }
        
      }
    }

    allRecipeStored.push(recipeStore);
    console.log(allRecipeStored)
    
  }

  return allRecipeStored;
}
  
console.log("diet value:", diet)
console.log("allRecipes count:", allRecipes.length)
console.log("mealNumber:", mealNumber)
console.log("DailyBudget:", DailyBudget)

const generatedMeals = generateMeals(diet)






  return (


    
    <div className="min-h-dvh overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,116,23,.20),transparent_30%),linear-gradient(135deg,#fff7ed_0%,#ffe9d1_46%,#fffaf5_100%)] text-[#33211b] antialiased selection:bg-orange-200 selection:text-[#33211b]">
      <body className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,116,23,.18),transparent_32%),linear-gradient(135deg,#fff7ed_0%,#ffe9d1_48%,#fffaf5_100%)] text-[#33211b] antialiased selection:bg-orange-200 selection:text-[#33211b]">
    <main className="mx-auto min-h-screen w-full  ">
      <section className=" border border-white/70 bg-[#fff8ef]/95 p-4 shadow-[0_18px_55px_rgba(112,66,31,.13)] backdrop-blur-xl transition duration-500 sm:p-6 lg:p-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-orange-100 pb-5">
          <div className="flex min-w-0 items-center gap-4">
            <button className="group grid size-11 shrink-0 place-items-center rounded-xl border border-orange-100 bg-white text-[#8a5c45] shadow-[0_8px_24px_rgba(88,54,28,.08)] outline-none transition duration-300 hover:-translate-x-0.5 hover:border-orange-200 hover:bg-orange-50 focus-visible:ring-4 focus-visible:ring-orange-200" aria-label="Go back">
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
  {/* Share Button */}
  <button
    className="
      group flex min-h-[52px] w-full items-center justify-center gap-2
      rounded-xl border border-orange-100 bg-white
      px-3 py-2
      text-[13px] leading-tight font-extrabold text-[#33211b]
      shadow-[0_8px_24px_rgba(88,54,28,.08)]
      transition duration-300
      hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50
      focus-visible:ring-4 focus-visible:ring-orange-200
      sm:h-11 sm:w-auto sm:px-4 sm:text-sm
    "
  >
    <svg
      className="h-5 w-5 shrink-0 text-[#8a5c45] transition duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8.65 10.55 15.35 6.45M8.65 13.45l6.7 4.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>

    <span className="whitespace-nowrap">Share Plan</span>
  </button>

  {/* Save Button */}
  <button
    className="
      group flex min-h-[52px] w-full items-center justify-center gap-2
      rounded-xl bg-[#ff7417]
      px-3 py-2
      text-[13px] leading-tight font-extrabold text-white
      shadow-[0_10px_28px_rgba(255,116,23,.22)]
      transition duration-300
      hover:-translate-y-0.5 hover:bg-[#e85f08]
      focus-visible:ring-4 focus-visible:ring-orange-200
      sm:h-11 sm:w-auto sm:px-4 sm:text-sm
    "
  >
    <svg
      className="h-5 w-5 shrink-0 transition duration-300 group-hover:scale-110"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 4.8A2.8 2.8 0 0 1 8.8 2h6.4A2.8 2.8 0 0 1 18 4.8V21l-6-3.4L6 21V4.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>

    <span className="whitespace-nowrap">Save Plan</span>
  </button>
</div>
        </header>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_.5fr] items-center">
        <article
  className="
    overflow-hidden rounded-[28px]
    border border-[#f5d9bf]
    bg-[#fffaf5]
    p-4
    shadow-[0_10px_35px_rgba(88,54,28,.07)]

    sm:p-5
    lg:p-6
  "
>
  {/* Top Section */}
  <section className="rounded-[28px] border border-orange-100 bg-white/85 p-5 shadow-[0_18px_50px_rgba(120,72,32,0.10)] backdrop-blur sm:p-6">
  <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-[1.45fr_1fr_1fr_auto] lg:items-center lg:gap-6">
    <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-white p-4 ring-1 ring-orange-100/70 sm:p-5 lg:bg-transparent lg:p-0 lg:ring-0">
      <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#9a674d]">
        Weekly Budget
      </p>

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
        ₦14,500
      </p>
    </div>

    <div className="rounded-2xl bg-emerald-50/70 p-4 ring-1 ring-emerald-100 sm:p-5 lg:bg-transparent lg:p-0 lg:ring-0">
      <p className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.14em] text-[#7a604f]">
        <span className="size-2.5 rounded-full bg-emerald-600 shadow-[0_0_0_5px_rgba(22,163,74,.12)]" />
        Remaining
      </p>

      <p className="mt-2 text-2xl font-black tracking-[-0.03em] text-emerald-600 sm:text-[28px]">
        ₦5,500
      </p>
    </div>

    <div className="flex justify-start rounded-2xl bg-white/70 p-4 ring-1 ring-orange-100/70 sm:col-span-3 lg:col-span-1 lg:justify-end lg:bg-transparent lg:p-0 lg:ring-0">
      <div className="relative grid size-[92px] place-items-center sm:size-[98px]">
        <svg
          className="size-full -rotate-90 drop-shadow-[0_10px_18px_rgba(255,116,23,.16)]"
          viewBox="0 0 88 88"
          aria-hidden="true"
        >
          <circle
            cx="44"
            cy="44"
            r="35"
            fill="none"
            stroke="#ffe5ca"
            strokeWidth="8"
          />

          <circle
            cx="44"
            cy="44"
            r="35"
            fill="none"
            stroke="#ff7417"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset="62"
          />
        </svg>

       
      </div>
    </div>
  </div>

  <div className="mt-6">
    <div className="flex items-center justify-between text-sm font-extrabold text-[#9a674d]">
      <span>Budget usage</span>
      <span>72% spent</span>
    </div>

    <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#ffe5ca] ring-1 ring-orange-100">
      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#ff8a22] to-[#ff6414] shadow-[0_10px_24px_rgba(255,116,23,.24)] transition-all duration-700" />
    </div>
  </div>

  <div
    className="
      mt-4 flex items-center gap-2
      rounded-xl bg-[#f7fff7]
      px-3 py-2
      text-sm font-bold text-green-600
    "
  >
    <span
      className="
        grid size-5 shrink-0 place-items-center
        rounded-full border border-green-200
        bg-white
      "
    >
      <svg
        className="size-3"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m5 12 4 4L19 6"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>

    <span className="leading-relaxed">
      You're doing great! You're within your budget.
    </span>
  </div>
</section>



  {/* Status */}
 
</article>

          <aside className="rounded-2xl border border-orange-100 bg-white/70 p-5 shadow-[0_8px_24px_rgba(88,54,28,.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(112,66,31,.13)]">
            <p className="text-sm font-extrabold text-[#8a5c45]">Wednesday Summary</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-orange-50 p-4">
                <svg className="size-7 text-[#ff7417]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 8h10M7 12h10M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <rect x="5" y="3" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
                </svg>
                <p className="mt-3 text-xs font-bold text-[#8a5c45]">Total Cost</p>
                <p className="mt-1 text-lg font-black">₦10,500</p>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <svg className="size-7 text-green-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21c3.7-2.4 6-5.6 6-9.1 0-3.9-2.7-7-6-9-3.3 2-6 5.1-6 9 0 3.5 2.3 6.7 6 9Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8v6l3-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="mt-3 text-xs font-bold text-[#8a5c45]">Total Calories</p>
                <p className="mt-1 text-lg font-black">1,600 kcal</p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-4">
                <svg className="size-7 text-amber-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 3v8M11 3v8M7 11h4M9 11v10M16 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 3c2.4 1.6 3.6 3.8 3.2 6.4-.2 1.6-1.4 2.6-3.2 2.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="mt-3 text-xs font-bold text-[#8a5c45]">Total Meals</p>
                <p className="mt-1 text-lg font-black">4 meals</p>
              </div>

              <div className="rounded-2xl bg-indigo-50 p-4">
                <svg className="size-7 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
                  <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-3 text-xs font-bold text-[#8a5c45]">Total Time</p>
                <p className="mt-1 text-lg font-black">100 mins</p>
              </div>
            </div>
          </aside>
        </section>

        <nav className="mt-5 flex items-center gap-3 overflow-x-auto rounded-2xl border border-orange-100 bg-white/80 p-3 shadow-[0_8px_24px_rgba(88,54,28,.08)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button className="grid size-10 shrink-0 place-items-center rounded-xl border border-orange-100 text-[#8a5c45] transition hover:bg-orange-50" aria-label="Previous week">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {weekData.map((day, index) => {
              const active = thisDay === day.fullDate ? "bg-orange-500" : "bg-white/80";
              return (
            
            <button key={index} className={`shrink-0 rounded-xl px-4 py-3 text-center transition hover:bg-orange-50 ${active}`}>
             
              <span className="block text-sm font-black">{day.dayName}</span>
                   <span className="mt-1 block text-xs font-semibold text-[#8a5c45]">{day.date} {day.monthName}</span>
            </button>
)})}

          <button className="grid size-10 shrink-0 place-items-center rounded-xl border border-orange-100 text-[#8a5c45] transition hover:bg-orange-50" aria-label="Next week">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button className="hidden h-10 shrink-0 items-center gap-2 rounded-xl border border-orange-100 bg-white px-4 text-sm font-extrabold text-[#33211b] transition hover:bg-orange-50 sm:inline-flex">
            <svg className="size-4 text-[#8a5c45]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            This Week
            <svg class="size-4 text-[#8a5c45]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </nav>

        <section className="mt-5 rounded-2xl border border-orange-100 bg-white/75 p-4 shadow-[0_8px_24px_rgba(88,54,28,.08)] sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black tracking-tight text-[#33211b]">Wednesday, 14 May</h2>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-4 text-sm font-extrabold text-[#ff7417] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-50 focus-visible:ring-4 focus-visible:ring-orange-200">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
              Add Meal
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            <article className="group grid gap-3 rounded-2xl border border-orange-100 bg-white p-3 shadow-[0_8px_24px_rgba(88,54,28,.08)] transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_55px_rgba(112,66,31,.13)] sm:grid-cols-[112px_1fr_auto] sm:items-center lg:grid-cols-[140px_1fr_auto]">
              <div className="flex items-center gap-3 sm:block">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-50 text-[#ff7417]">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                  </svg>
                </div>
                <div className="sm:mt-2">
                  <p className="text-sm font-black text-[#33211b]">Breakfast</p>
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
                  <h3 className="truncate text-base font-black tracking-tight text-[#33211b]">Banana Oatmeal</h3>
                  <p className="mt-1 text-sm font-bold text-[#ff7417]">Healthy · 15 mins</p>
                  <p className="mt-1 text-sm font-semibold text-[#8a5c45]">320 kcal · {mealPeople}servings</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <p className="text-sm font-black text-[#ff7417]">₦1,200</p>
                <div className="flex gap-2">
                  <button className="grid size-9 place-items-center rounded-lg border border-orange-100 text-[#8a5c45] transition hover:bg-orange-50" aria-label="Edit breakfast">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="grid size-9 place-items-center rounded-lg border border-orange-100 text-red-400 transition hover:bg-red-50" aria-label="Delete breakfast">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 7h14M10 11v6M14 11v6M9 7l1-3h4l1 3M7 7l1 14h8l1-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            <article className="group grid gap-3 rounded-2xl border border-orange-100 bg-white p-3 shadow-[0_8px_24px_rgba(88,54,28,.08)] transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_55px_rgba(112,66,31,.13)] sm:grid-cols-[112px_1fr_auto] sm:items-center lg:grid-cols-[140px_1fr_auto]">
              <div className="flex items-center gap-3 sm:block">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-50 text-[#ff7417]">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                  </svg>
                </div>
                <div className="sm:mt-2">
                  <p className="text-sm font-black text-[#33211b]">Lunch</p>
                  <p className="text-xs font-semibold text-[#8a5c45]">1 meal</p>
                </div>
              </div>

              <div className="grid gap-3 min-[520px]:grid-cols-[112px_1fr] min-[520px]:items-center">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 via-[#fff7ed] to-green-700 shadow-inner">
                  <svg className="size-full p-6 transition duration-500 group-hover:scale-110" viewBox="0 0 120 90" fill="none" aria-hidden="true">
                    <ellipse cx="60" cy="60" rx="45" ry="20" fill="#78350f" opacity=".16" />
                    <ellipse cx="58" cy="49" rx="42" ry="27" fill="#f97316" stroke="#7c2d12" strokeWidth="3" />
                    <circle cx="58" cy="45" r="16" fill="#fff7ed" />
                    <path d="M80 35c14 7 17 21 4 31-10 8-29 6-40-4" stroke="#7c2d12" strokeWidth="5" strokeLinecap="round" />
                    <circle cx="35" cy="58" r="5" fill="#22c55e" />
                    <circle cx="42" cy="65" r="4" fill="#16a34a" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-black tracking-tight text-[#33211b]">Jollof Rice & Chicken</h3>
                  <p className="mt-1 text-sm font-bold text-[#ff7417]">Nigerian · 40 mins</p>
                  <p className="mt-1 text-sm font-semibold text-[#8a5c45]">650 kcal · {mealPeople} servings</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <p className="text-sm font-black text-[#ff7417]">₦4,500</p>
                <div className="flex gap-2">
                  <button className="grid size-9 place-items-center rounded-lg border border-orange-100 text-[#8a5c45] transition hover:bg-orange-50" aria-label="Edit lunch">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="grid size-9 place-items-center rounded-lg border border-orange-100 text-red-400 transition hover:bg-red-50" aria-label="Delete lunch">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 7h14M10 11v6M14 11v6M9 7l1-3h4l1 3M7 7l1 14h8l1-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            <article className="group grid gap-3 rounded-2xl border border-orange-100 bg-white p-3 shadow-[0_8px_24px_rgba(88,54,28,.08)] transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_55px_rgba(112,66,31,.13)] sm:grid-cols-[112px_1fr_auto] sm:items-center lg:grid-cols-[140px_1fr_auto]">
              <div className="flex items-center gap-3 sm:block">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-50 text-[#ff7417]">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 15.5A7.5 7.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="sm:mt-2">
                  <p className="text-sm font-black text-[#33211b]">Dinner</p>
                  <p className="text-xs font-semibold text-[#8a5c45]">1 meal</p>
                </div>
              </div>

              <div className="grid gap-3 min-[520px]:grid-cols-[112px_1fr] min-[520px]:items-center">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-amber-800 via-[#fff7ed] to-amber-500 shadow-inner">
                  <svg className="size-full p-6 transition duration-500 group-hover:scale-110" viewBox="0 0 120 90" fill="none" aria-hidden="true">
                    <ellipse cx="61" cy="61" rx="42" ry="18" fill="#78350f" opacity=".18" />
                    <circle cx="58" cy="48" r="31" fill="#b45309" stroke="#78350f" stroke-width="4" />
                    <path d="M35 45c12-11 29 4 48-8M33 56c19-7 31 9 51-2" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
                    <circle cx="77" cy="46" r="5" fill="#166534" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-black tracking-tight text-[#33211b]">Egusi Soup & Pounded Yam</h3>
                  <p className="mt-1 text-sm font-bold text-[#ff7417]">Nigerian · 35 mins</p>
                  <p className="mt-1 text-sm font-semibold text-[#8a5c45]">480 kcal · {mealPeople} servings</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <p className="text-sm font-black text-[#ff7417]">₦3,800</p>
                <div className="flex gap-2">
                  <button className="grid size-9 place-items-center rounded-lg border border-orange-100 text-[#8a5c45] transition hover:bg-orange-50" aria-label="Edit dinner">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="grid size-9 place-items-center rounded-lg border border-orange-100 text-red-400 transition hover:bg-red-50" aria-label="Delete dinner">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 7h14M10 11v6M14 11v6M9 7l1-3h4l1 3M7 7l1 14h8l1-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            <article className="group grid gap-3 rounded-2xl border border-orange-100 bg-white p-3 shadow-[0_8px_24px_rgba(88,54,28,.08)] transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_18px_55px_rgba(112,66,31,.13)] sm:grid-cols-[112px_1fr_auto] sm:items-center lg:grid-cols-[140px_1fr_auto]">
              <div className="flex items-center gap-3 sm:block">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-50 text-[#ff7417]">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M8 14c-2.4 0-4 1.5-4 3.5S5.6 21 8 21s4-1.5 4-3.5S10.4 14 8 14ZM16 3c-2.4 0-4 1.5-4 3.5S13.6 10 16 10s4-1.5 4-3.5S18.4 3 16 3ZM17 15c-1.7 0-3 1.1-3 2.5s1.3 2.5 3 2.5 3-1.1 3-2.5-1.3-2.5-3-2.5Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="sm:mt-2">
                  <p className="text-sm font-black text-[#33211b]">Snacks</p>
                  <p className="text-xs font-semibold text-[#8a5c45]">1 meal</p>
                </div>
              </div>

              <div className="grid gap-3 min-[520px]:grid-cols-[112px_1fr] min-[520px]:items-center">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-lime-500 via-[#fff7ed] to-red-500 shadow-inner">
                  <svg className="size-full p-6 transition duration-500 group-hover:scale-110" viewBox="0 0 120 90" fill="none" aria-hidden="true">
                    <ellipse cx="60" cy="62" rx="43" ry="15" fill="#78350f" opacity=".13" />
                    <circle cx="41" cy="45" r="11" fill="#ef4444" />
                    <circle cx="58" cy="41" r="10" fill="#84cc16" />
                    <circle cx="73" cy="50" r="11" fill="#facc15" />
                    <circle cx="51" cy="60" r="9" fill="#a855f7" />
                    <circle cx="84" cy="61" r="9" fill="#ef4444" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-black tracking-tight text-[#33211b]">Fruit Salad</h3>
                  <p className="mt-1 text-sm font-bold text-[#ff7417]">Healthy · 10 mins</p>
                  <p className="mt-1 text-sm font-semibold text-[#8a5c45]">150 kcal · {mealPeople} serving</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <p className="text-sm font-black text-[#ff7417]">₦1,000</p>
                <div className="flex gap-2">
                  <button className="grid size-9 place-items-center rounded-lg border border-orange-100 text-[#8a5c45] transition hover:bg-orange-50" aria-label="Edit snacks">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="grid size-9 place-items-center rounded-lg border border-orange-100 text-red-400 transition hover:bg-red-50" aria-label="Delete snacks">
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 7h14M10 11v6M14 11v6M9 7l1-3h4l1 3M7 7l1 14h8l1-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>

            <button className="group mt-2 flex min-h-[88px] items-center justify-center gap-4 rounded-2xl border border-dashed border-orange-200 bg-orange-50/45 px-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#ff7417] hover:bg-orange-50 focus-visible:ring-4 focus-visible:ring-orange-200">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#ff7417] text-white shadow-[0_10px_28px_rgba(255,116,23,.22)] transition duration-300 group-hover:rotate-90">
                <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </span>
              <span>
                <span className="block text-base font-black text-[#33211b]">Add another meal to Wednesday</span>
                <span className="mt-1 block text-sm font-semibold text-[#8a5c45]">Click to add breakfast, lunch, dinner or snack</span>
              </span>
            </button>
          </div>
        </section>

        <p className="mt-5 text-center text-sm font-semibold text-[#8a5c45]">
          ⓘ Tip: Drag and drop meals to reorder or move between days
        </p>
      </section>

      <button className="fixed bottom-5 right-5 z-50 grid size-20 place-items-center rounded-full bg-[#ff7417] text-white shadow-[0_10px_28px_rgba(255,116,23,.35)] outline-none transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#e85f08] focus-visible:ring-4 focus-visible:ring-orange-200 sm:bottom-8 sm:right-8 lg:size-24" aria-label="Quick add meal">
        <svg className="size-10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>
    </main>
  </body>
    </div>
  );
}
