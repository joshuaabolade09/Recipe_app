import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function ModalPlanner({ onClose }) {
  const navigate = useNavigate()

  const [weeklyBudget, setWeeklyBudget] = useState("")
  const [weeklyPeople, setWeeklyPeople] = useState("")
  const [weeklyMeals, setWeeklyMeals] = useState("")
  const [weeklyDiet, setWeeklyDiet] = useState("")

  function handleWeeklyPeople(num) {
    setWeeklyPeople(num)
  }

  function handleWeeklyMeals(num) {
    setWeeklyMeals(num)
  }

  function handleWeeklyDiet(diet) {
    setWeeklyDiet(diet)
  }

  function openPlannerRecipe() {
    if (weeklyBudget === "" || weeklyPeople === "" || weeklyMeals === "" || weeklyDiet === "") {
      return alert("Please fill in all fields before generating your plan.")
    }
    navigate(`/planner?budget=${weeklyBudget}&people=${weeklyPeople}&meals=${weeklyMeals}&diet=${weeklyDiet}`)

    setWeeklyBudget("")
    setWeeklyPeople("")
    setWeeklyMeals("")
    setWeeklyDiet("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_24px_60px_rgba(88,54,28,.18)] overflow-hidden my-auto">

        {/* Header */}
        <div className="bg-gradient-to-br from-orange-50 to-white px-6 pt-6 pb-5 border-b border-orange-100">
          <div className="flex items-center justify-between mb-1">
            <div className="grid size-10 place-items-center rounded-xl bg-[#ff7417] text-white shadow-[0_8px_20px_rgba(255,116,23,.30)]">
              <svg className="size-5" viewBox="0 0 24 24" fill="none">
                <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <button 
              onClick={onClose}
              className="grid size-9 place-items-center rounded-xl border border-orange-100 text-[#8a5c45] hover:bg-orange-50 transition focus:outline-none"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none">
                <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-[#33211b]">Set up your meal plan</h2>
          <p className="mt-1 text-sm font-medium text-[#8a5c45]">Tell us your preferences and we will build your weekly plan.</p>
        </div>

        {/* Fields */}
        <div className="px-6 py-5 flex flex-col gap-5 max-h-[60vh] overflow-y-auto no-scrollbar">

          {/* Weekly budget */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-[0.12em] text-[#8a5c45] mb-2">
              Weekly budget
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-extrabold text-[#ff7417]">₦</span>
              <input
                type="number" 
                value={weeklyBudget} 
                onChange={(e) => setWeeklyBudget(e.target.value)}
                placeholder="20,000"
                className="w-full rounded-2xl border border-orange-200 bg-orange-50/40 py-3 pl-9 pr-4 text-sm font-bold text-[#33211b] placeholder:text-[#c4a898] outline-none transition focus:border-[#ff7417] focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </div>

          {/* Number of people */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-[0.12em] text-[#8a5c45] mb-2">
              Number of people
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num} 
                  onClick={() => handleWeeklyPeople(num)}
                  data-selected={weeklyPeople === num}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-orange-200 bg-orange-50/40 py-3 text-sm font-extrabold text-[#33211b] transition hover:border-[#ff7417] hover:bg-orange-50 focus:border-[#ff7417] focus:ring-4 focus:ring-orange-100 data-[selected=true]:border-[#ff7417] data-[selected=true]:bg-[#fff3ea] data-[selected=true]:text-[#ff7417]"
                >
                  <span className="text-lg">{['👤','👥','👨‍👩‍👦','👨‍👩‍👧‍👦'][num - 1]}</span>
                  <span className="text-xs sm:text-sm">{num} {num === 1 ? 'person' : 'people'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Meals per day */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-[0.12em] text-[#8a5c45] mb-2">
              Meals per day
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { num: 1, label: 'Dinner only' },
                { num: 2, label: 'Lunch & Dinner' },
                { num: 3, label: 'All meals' },
              ].map((option) => (
                <button
                  key={option.num} 
                  onClick={() => handleWeeklyMeals(option.num)}
                  data-selected={weeklyMeals === option.num}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-orange-200 bg-orange-50/40 py-3 text-sm font-extrabold text-[#33211b] transition hover:border-[#ff7417] hover:bg-orange-50 data-[selected=true]:border-[#ff7417] data-[selected=true]:bg-[#fff3ea] data-[selected=true]:text-[#ff7417]"
                >
                  <span className="text-xl font-black text-[#ff7417]">{option.num}</span>
                  <span className="text-center text-[11px] font-bold text-[#8a5c45] leading-tight">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dietary preference */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-[0.12em] text-[#8a5c45] mb-2">
              Dietary preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'nigerian', label: 'Nigerian', emoji: '🍲' },
                { value: 'international', label: 'International', emoji: '🌍' },
                { value: 'mixed', label: 'Mixed', emoji: '🥘' },
              ].map((option) => (
                <button
                  key={option.value} 
                  onClick={() => handleWeeklyDiet(option.value)}
                  data-selected={weeklyDiet === option.value}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-orange-200 bg-orange-50/40 py-3 transition hover:border-[#ff7417] hover:bg-orange-50 data-[selected=true]:border-[#ff7417] data-[selected=true]:bg-[#fff3ea]"
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-xs font-extrabold text-[#33211b]">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 pb-6 border-t border-orange-50 pt-4">
          <button 
            onClick={openPlannerRecipe} 
            className="group w-full flex items-center justify-center gap-2 rounded-2xl bg-[#ff7417] py-3.5 text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(255,116,23,.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e85f08] hover:shadow-[0_16px_40px_rgba(255,116,23,.35)] focus:outline-none focus:ring-4 focus:ring-orange-200 active:scale-[0.98]"
          >
            Generate my plan
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="mt-3 text-center text-xs font-semibold text-[#c4a898]">You can adjust your plan anytime after generating it.</p>
        </div>

      </div>
    </div>
  )
}