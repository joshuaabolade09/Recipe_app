import { useNavigate } from "react-router-dom"
function SavedRecipe() {

  const navigate = useNavigate()
    return (
        <div>
             <div className="min-h-screen bg-[#080706] font-sans text-ink antialiased grid place-items-center">
    <main className="relative min-h-[1038px] w-full max-w-7xl overflow-hidden bg-[radial-gradient(circle_at_18%_4%,rgba(255,127,28,.13),transparent_24%),linear-gradient(180deg,#fff8ef_0%,#fff4e8_46%,#fff7ef_100%)] px-[22px] pb-7 pt-[27px] max-[560px]:px-3.5 max-[560px]:pb-24">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-[18px]">
          <button onClick={()=> navigate(-1)} className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-line bg-[#fffaf4] text-[#4a2a20] shadow-[0_6px_16px_rgba(129,69,18,.07)]" aria-label="Back">
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="m-0 text-[27px] font-extrabold leading-none tracking-[-.02em] text-[#3a2119]">Saved Recipes</h1>
            <p className="mt-[7px] text-xs font-bold text-clay">Your favorite meals, ready when you need them</p>
          </div>
        </div>

        <div className="flex gap-2.5 max-[560px]:hidden">
          <button className="inline-flex h-[38px] items-center gap-2 rounded-[9px] border border-line bg-[#fffaf4] px-[15px] text-[11px] font-extrabold text-[#3c241c]">
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Recipe
          </button>
          <button className="inline-flex h-[38px] items-center gap-2 rounded-[9px] border border-ember bg-ember px-[15px] text-[11px] font-extrabold text-white">
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            Saved
          </button>
        </div>
      </header>

      <section className="mt-[26px] grid grid-cols-3 gap-3 max-[560px]:grid-cols-1">
        <div className="min-h-[92px] rounded-[14px] border border-line bg-paper/85 p-[18px] shadow-card"> 
          <small className="flex items-center gap-2 text-[11px] font-extrabold text-clay">
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" stroke="currentColor" strokeWidth="2" /></svg>
            Total Saved
          </small>
          <strong className="mt-[9px] block text-2xl font-extrabold tracking-[-.03em]">24</strong>
        </div>

        <div className="min-h-[92px] rounded-[14px] border border-line bg-paper/85 p-[18px] shadow-card">
          <small className="flex items-center gap-2 text-[11px] font-extrabold text-clay">
            <svg className="h-[18px] w-[18px] text-ember" viewBox="0 0 24 24" fill="none"><path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /></svg>
            Avg. Time
          </small>
          <strong className="mt-[9px] block text-2xl font-extrabold tracking-[-.03em] text-ember">35 min</strong>
        </div>

        <div className="min-h-[92px] rounded-[14px] border border-line bg-paper/85 p-[18px] shadow-card">
          <small className="flex items-center gap-2 text-[11px] font-extrabold text-clay">
            <svg className="h-[18px] w-[18px] text-[#38a136]" viewBox="0 0 24 24" fill="none"><path d="M20 7c-6 1-9 4-10 10-3-2-4-5-2-8 2-4 7-5 12-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
            Healthy Picks
          </small>
          <strong className="mt-[9px] block text-2xl font-extrabold tracking-[-.03em] text-[#38a136]">12</strong>
        </div>
      </section>

      <section className="mt-[22px] rounded-[14px] border border-line bg-paper/90 p-[15px] shadow-card">
        <div className="flex h-[47px] items-center gap-[11px] rounded-xl border border-line bg-white px-[15px] text-[13px] font-bold text-[#97715e]">
          <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none"><path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Search saved recipes...
        </div>
        <div className="mt-[13px] flex gap-2.5 overflow-hidden">
          <span className="shrink-0 rounded-full border border-ember bg-ember px-3.5 py-2 text-xs font-extrabold text-white">All</span>
          <span className="shrink-0 rounded-full border border-line bg-[#fff7ed] px-3.5 py-2 text-xs font-extrabold text-[#7a4a31]">Nigerian</span>
          <span className="shrink-0 rounded-full border border-line bg-[#fff7ed] px-3.5 py-2 text-xs font-extrabold text-[#7a4a31]">Quick Meals</span>
          <span className="shrink-0 rounded-full border border-line bg-[#fff7ed] px-3.5 py-2 text-xs font-extrabold text-[#7a4a31]">Budget</span>
          <span className="shrink-0 rounded-full border border-line bg-[#fff7ed] px-3.5 py-2 text-xs font-extrabold text-[#7a4a31]">Dinner</span>
        </div>
      </section>

      <section className="mt-[22px] rounded-[14px] border border-line bg-paper/85 p-[18px] shadow-card">
        <div className="mb-[15px] flex items-center justify-between">
          <h2 className="m-0 text-lg font-extrabold text-[#3a2119]">Recently Saved</h2>
          <span className="text-xs font-black text-ember">View All</span>
        </div>

        <article className="mt-[13px] grid min-h-[105px] grid-cols-[112px_1fr_auto] items-center gap-[17px] rounded-xl border border-[#f1dfcd] bg-white/85 p-[10px_13px_10px_10px] shadow-soft max-[560px]:grid-cols-[92px_1fr]">
       <div
  className="h-[84px] w-28 rounded-[9px] bg-cover bg-center max-[560px]:h-[76px] max-[560px]:w-[92px]"
  style={{
    backgroundImage:
      "radial-gradient(circle at 70% 30%,#f8e0a8 0 10%,transparent 11%), radial-gradient(circle at 33% 60%,#94431c 0 19%,transparent 20%), linear-gradient(135deg,#e86423,#f0ad3d 45%,#76381b)"
  }}
></div>
          <div>
            <h3 className="mb-[7px] mt-0 text-base font-extrabold tracking-[-.015em] text-[#3a2119]">Jollof Rice & Chicken</h3>
            <div className="text-[11px] font-black text-ember">Nigerian • 40 mins</div>
            <div className="mt-2 flex gap-2 text-[11px] font-bold text-clay"><span>650 kcal</span><span>•</span><span>2 servings</span></div>
          </div>
          <div className="flex items-center gap-[9px] max-[560px]:col-span-2 max-[560px]:justify-end">
            <button className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-[#fffaf4] text-[#d95510]"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none"><path d="M8 2.8v3.6M16 2.8v3.6M4 9h16M5 4.5h14v16H5z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <button className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-[#fffaf4] text-[#d95510]"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="#ff7419"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" /></svg></button>
          </div>
        </article>

        <article className="mt-[13px] grid min-h-[105px] grid-cols-[112px_1fr_auto] items-center gap-[17px] rounded-xl border border-[#f1dfcd] bg-white/85 p-[10px_13px_10px_10px] shadow-soft max-[560px]:grid-cols-[92px_1fr]">
          <div className="h-[84px] w-28 rounded-[9px] bg-cover bg-center max-[560px]:h-[76px] max-[560px]:w-[92px]" style={{backgroundImage:"radial-gradient(circle at 58% 38%,#e2a53b 0 22%,transparent 23%),radial-gradient(circle at 30% 65%,#395f23 0 20%,transparent 21%),linear-gradient(135deg,#d86c1c,#7e3e1d 55%,#f6e7c8)"}}></div>
          <div>
            <h3 className="mb-[7px] mt-0 text-base font-extrabold tracking-[-.015em] text-[#3a2119]">Egusi Soup & Pounded Yam</h3>
            <div className="text-[11px] font-black text-ember">Traditional • 55 mins</div>
            <div className="mt-2 flex gap-2 text-[11px] font-bold text-clay"><span>720 kcal</span><span>•</span><span>3 servings</span></div>
          </div>
          <div className="flex items-center gap-[9px] max-[560px]:col-span-2 max-[560px]:justify-end">
            <button className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-[#fffaf4] text-[#d95510]"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none"><path d="M8 2.8v3.6M16 2.8v3.6M4 9h16M5 4.5h14v16H5z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <button className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-[#fffaf4] text-[#d95510]"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="#ff7419"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" /></svg></button>
          </div>
        </article>

        <article className="mt-[13px] grid min-h-[105px] grid-cols-[112px_1fr_auto] items-center gap-[17px] rounded-xl border border-[#f1dfcd] bg-white/85 p-[10px_13px_10px_10px] shadow-soft max-[560px]:grid-cols-[92px_1fr]">
          <div className="h-[84px] w-28 rounded-[9px] bg-cover bg-center max-[560px]:h-[76px] max-[560px]:w-[92px]" style={{backgroundImage:"radial-gradient(circle at 32% 45%,#f4c460 0 22%,transparent 23%),radial-gradient(circle at 72% 64%,#bf4d23 0 16%,transparent 17%),linear-gradient(135deg,#fde7aa,#f29d32 50%,#8b3d22)"}}></div>
          <div>
            <h3 className="mb-[7px] mt-0 text-base font-extrabold tracking-[-.015em] text-[#3a2119]">Moi Moi with Pepper Sauce</h3>
            <div className="text-[11px] font-black text-ember">Healthy • 35 mins</div>
            <div className="mt-2 flex gap-2 text-[11px] font-bold text-clay"><span>310 kcal</span><span>•</span><span>4 servings</span></div>
          </div>
          <div className="flex items-center gap-[9px] max-[560px]:col-span-2 max-[560px]:justify-end">
            <button className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-[#fffaf4] text-[#d95510]"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none"><path d="M8 2.8v3.6M16 2.8v3.6M4 9h16M5 4.5h14v16H5z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <button className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-[#fffaf4] text-[#d95510]"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="#ff7419"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" /></svg></button>
          </div>
        </article>

        <article className="mt-[13px] grid min-h-[105px] grid-cols-[112px_1fr_auto] items-center gap-[17px] rounded-xl border border-[#f1dfcd] bg-white/85 p-[10px_13px_10px_10px] shadow-soft max-[560px]:grid-cols-[92px_1fr]">
          <div className="h-[84px] w-28 rounded-[9px] bg-cover bg-center max-[560px]:h-[76px] max-[560px]:w-[92px]" style={{backgroundImage:"repeating-linear-gradient(25deg,#7b2c18 0 13px,#cf6c2a 14px 28px,#edc783 29px 34px),linear-gradient(135deg,#2c130c,#e16a1e)"}}></div>
          <div>
            <h3 className="mb-[7px] mt-0 text-base font-extrabold tracking-[-.015em] text-[#3a2119]">Spicy Beef Suya</h3>
            <div className="text-[11px] font-black text-ember">Street Food • 25 mins</div>
            <div className="mt-2 flex gap-2 text-[11px] font-bold text-clay"><span>420 kcal</span><span>•</span><span>2 servings</span></div>
          </div>
          <div className="flex items-center gap-[9px] max-[560px]:col-span-2 max-[560px]:justify-end">
            <button className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-[#fffaf4] text-[#d95510]"><svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none"><path d="M8 2.8v3.6M16 2.8v3.6M4 9h16M5 4.5h14v16H5z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <button className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-[#fffaf4] text-[#d95510]"><svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="#ff7419"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" /></svg></button>
          </div>
        </article>
      </section>

      <section className="mt-[22px] rounded-[14px] border border-line bg-paper/85 p-[18px] shadow-card">
        <div className="grid grid-cols-4 gap-3 max-[560px]:grid-cols-1">
          <div className="flex items-center gap-[11px]">
            <span className="grid h-[43px] w-[43px] place-items-center rounded-full bg-[#fff0df] text-ember"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none"><path d="M12 6v6h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /></svg></span>
            <span><small className="block text-[10px] font-extrabold text-clay">Quickest</small><strong class="mt-[3px] block text-sm font-extrabold text-[#3a2119]">25 mins</strong></span>
          </div>
          <div className="flex items-center gap-[11px]">
            <span className="grid h-[43px] w-[43px] place-items-center rounded-full bg-[#fff0df] text-ember"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none"><path d="M12 2.8 14.9 8l5.8 1.1-4 4.3.8 5.8-5.5-2.5-5.5 2.5.8-5.8-4-4.3L9.1 8 12 2.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg></span>
            <span><small className="block text-[10px] font-extrabold text-clay">Top Rating</small><strong class="mt-[3px] block text-sm font-extrabold text-[#3a2119]">4.9</strong></span>
          </div>
          <div className="flex items-center gap-[11px]">
            <span className="grid h-[43px] w-[43px] place-items-center rounded-full bg-[#fff0df] text-ember"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none"><path d="M6 3v8M10 3v8M8 11v10M17 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
            <span><small className="block text-[10px] font-extrabold text-clay">Categories</small><strong class="mt-[3px] block text-sm font-extrabold text-[#3a2119]">7 types</strong></span>
          </div>
          <div className="flex items-center gap-[11px]">
            <span className="grid h-[43px] w-[43px] place-items-center rounded-full bg-[#fff0df] text-ember"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" stroke="currentColor" strokeWidth="2" /></svg></span>
            <span><small className="block text-[10px] font-extrabold text-clay">This Week</small><strong class="mt-[3px] block text-sm font-extrabold text-[#3a2119]">6 saved</strong></span>
          </div>
        </div>
      </section>

      <button className="fixed bottom-[26px] right-[max(26px,calc((100vw-691px)/2+26px))] grid h-[78px] w-[78px] place-items-center rounded-full bg-ember text-white shadow-fab">
        <span>
          <svg className="mx-auto block h-[34px] w-[34px]" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" /></svg>
          <span className="-mt-1.5 block text-[10px] font-black">Quick Save</span>
        </span>
      </button>
    </main>
  </div>
            
        </div>
    )
}

export default SavedRecipe
