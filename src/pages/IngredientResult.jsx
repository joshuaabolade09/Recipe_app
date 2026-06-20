import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import recipes from "../data/recipe.json"
import { uiReducer , init} from "../Reducer/Reducer"
import { useReducer } from "react"
import pantryItemsDetails from "../data/pantryDetails.json"
import { useNavigate } from "react-router-dom"


export default function SearchRecipe() {

 
  

    const [searchResult]= useSearchParams()
     const ingredientResult= searchResult.get("ingredientSearch")
     const [currentRecipe, setCurrentRecipe]= useState(1)
    const navigate= useNavigate()

   const ingredient = [
  ...new Set(
    ingredientResult
      .split(",")
      .map((ing) => ing.trim().toLowerCase())
  )
];

const details = ingredient.map((ing) =>
  pantryItemsDetails.find((item) =>
 item.label.toLowerCase() === ing.toLowerCase()
  ) || { emoji: "🥬", label: ing }
);
 const [state, dispatch]= useReducer(uiReducer, details,init )

    const [addIngredient, setAddIngredient] = useState(details)




  function handleAddIngredient() {
  if (!addIngredient.trim()) return;

  const incomingIngredients = addIngredient
    .split(",")
    .map((ing) => ing.trim())
    .filter(Boolean)
    .map((ing) => {
      const matchedItem = pantryItemsDetails.find((item) =>
        item.label.toLowerCase() === ing.toLowerCase() 
      );

      return matchedItem || { emoji: "🥬", label: ing };
    });

  dispatch({
    type: "ADD_INGREDIENT",
    payload: incomingIngredients,
  });

  setAddIngredient("");
}

const activeChip = [
  ...new Set(
    state.ingredients.map(
      (item) =>
        item.label[0].toUpperCase() + item.label.slice(1)
    )
  )
];
//Create activeChip and inactiveChip arrays by splitting activeChip into two parts
const activeChips = activeChip.slice(0, -2)
  const inactiveChips = activeChip.slice(-2)

const userIngredients = state.ingredients.map((item) =>
  item.label.trim().toLowerCase()
)

const recipeData = recipes
  .map((recipe) => {

    const missingIngredients = recipe.ingredientsAlternatives.filter((ingredient) => {

      // clean ALL names in the group — remove brackets and normalize dashes
      const ingredientGroup = [
        ingredient.name,
        ...ingredient.alternatives
      ].map((ing) =>
        ing
          .trim()
          .toLowerCase()
          .replace(/\(.*?\)/g, "")   // remove (fresh), (optional), (for frying)
          .replace(/‑/g, "-")        // replace unicode hyphen with regular hyphen
          .trim()
      )

      // check if user has ANY name in the group
      const isMatched = ingredientGroup.some((ing) =>
        userIngredients.some((u) =>
          ing.includes(u) || u.includes(ing)  // partial match both ways
        )
      )

      return !isMatched
    })

    const totalIngredients = recipe.ingredientsAlternatives.length
    const missingCount = missingIngredients.length
    const matchedCount = totalIngredients - missingCount
    const matchPercentage = Math.round(
      (matchedCount / totalIngredients) * 100
    )

    let status = "Needs a few items"
    if (matchPercentage >= 90) status = "Ready to cook"
    else if (matchPercentage >= 70) status = "Almost ready"

    return {
      ...recipe,
      missingIngredients,
      matchPercentage,
      status,
    }
  })
  .filter((recipe) => recipe.matchPercentage > 60)  // show anything with at least 1 match
  .sort((a, b) => b.matchPercentage - a.matchPercentage)


  //Show 4 recipeData per page
  const recipeDataPerpage = 4
  const startIndex=  (currentRecipe-1 )* recipeDataPerpage
  const endIndex= startIndex + recipeDataPerpage
  const filteredRecipeCard= recipeData.slice(startIndex, endIndex)


  function nextPage(){
  if(endIndex < recipeData.length){
    setCurrentRecipe(currentRecipe + 1)
  }
}

function prevPage(){
  if(currentRecipe  > 1){
    setCurrentRecipe(currentRecipe - 1)
  }
}

  /* ── animation delay per card index ── */
  const cardDelay = ['0.10s', '0.22s', '0.34s']

  /* ── chip animation delay ── */
  const chipDelay = ['0.05s','0.10s','0.15s','0.20s','0.25s','0.30s']

  /* ── shared style objects ── */
  const styles = {
    /* page */
    page: {
      fontFamily: "'Nunito', 'Trebuchet MS', sans-serif",
      backgroundColor: '#FFFAF6',
      color: '#1A1208',
      minHeight: '100vh',
    },

    /* navbar */
    navbar: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: '#fff',
      borderBottom: '1px solid #F0E0D0',
      boxShadow: '0 2px 12px rgba(232,96,10,.06)',
      animation: 'slideDown .5s ease both',
    },
    navInner: {
      maxWidth: '80rem',
      margin: '0 auto',
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '4rem',
    },
    logoIcon: {
      width: '2.25rem', height: '2.25rem',
      borderRadius: '0.75rem',
      backgroundColor: '#FFF4EC',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1.25rem', userSelect: 'none',
    },
    logoText: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '1.25rem', fontWeight: 800,
    },
    profileBtn: {
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      backgroundColor: '#E8600A',
      color: '#fff',
      fontWeight: 700, fontSize: '0.875rem',
      padding: '0.5rem 1.25rem',
      borderRadius: '10px', border: 'none', cursor: 'pointer',
      transition: 'background .15s, box-shadow .15s',
    },

    /* hero */
    hero: {
      background: 'linear-gradient(135deg,#FFF4EC 60%,#FFE8D4 100%)',
      borderBottom: '1px solid #F0E0D0',
      padding: '2.5rem 1.5rem',
      position: 'relative', overflow: 'hidden',
    },
    heroGlow: {
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse at 80% 50%, rgba(232,96,10,.08) 0%, transparent 70%)',
    },
    heroInner: {
      maxWidth: '80rem', margin: '0 auto', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
    },
    heroTextWrap: {
      animation: 'heroIn .6s .1s ease both', flex: 1, minWidth: 0,
    },
    backBtn: {
      width: '2.25rem', height: '2.25rem', borderRadius: '9999px',
      backgroundColor: '#fff', border: '1px solid #F0E0D0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
      transition: 'box-shadow .15s',
    },
    heroTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: 'clamp(1.4rem, 3vw, 2.25rem)',
      fontWeight: 800, color: '#1A1208', lineHeight: 1.2,
    },
    heroSub: {
      fontSize: '0.95rem', color: '#7A6A58', marginBottom: '1.5rem', maxWidth: '32rem',
    },
    searchRow: {
      display: 'flex', gap: '0.75rem', maxWidth: '36rem',
    },
    searchWrap: { position: 'relative', flex: 1 },
    searchIcon: {
      position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
      color: '#7A6A58', pointerEvents: 'none',
    },
    searchInput: {
      width: '100%',
      padding: '0.875rem 1rem 0.875rem 3rem',
      border: '1.5px solid #F0E0D0', borderRadius: '0.75rem',
      fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem',
      backgroundColor: '#fff', color: '#1A1208', outline: 'none',
      transition: 'border-color .2s, box-shadow .2s',
    },
    addBtn: {
      flexShrink: 0,
      backgroundColor: '#E8600A', color: '#fff',
      fontWeight: 700, fontSize: '0.875rem',
      padding: '0 2rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
      transition: 'background .15s, box-shadow .15s',
    },
    heroEmoji: {
      width: '10rem', height: '10rem', borderRadius: '9999px',
      background: 'rgba(232,96,10,.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '5rem', userSelect: 'none', flexShrink: 0,
      animation: 'heroIn .7s .25s ease both',
    },

    /* chips bar */
    chipsBar: {
      maxWidth: '80rem', margin: '0 auto', padding: '1rem 1.5rem',
    },
    chipsRow: {
      display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap',
    },
    chipsLabel: {
      fontSize: '0.82rem', fontWeight: 700, color: '#7A6A58', flexShrink: 0,
    },
    chipsScroll: {
      display: 'flex', alignItems: 'center', gap: '0.5rem',
      overflowX: 'auto', WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none', paddingBottom: '4px', flex: 1,
    },
    chipActive: {
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      backgroundColor: '#E8600A', color: '#fff',
      fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.02em',
      padding: '6px 12px 6px 16px', borderRadius: '9999px',
      cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none', border: 'none',
      transition: 'transform .15s, box-shadow .15s',
    },
    chipInactive: {
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      backgroundColor: '#fff', color: '#1A1208',
      border: '1.5px solid #F0E0D0',
      fontWeight: 700, fontSize: '0.82rem',
      padding: '6px 12px 6px 16px', borderRadius: '9999px',
      cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none',
      transition: 'transform .15s, box-shadow .15s, border-color .15s',
    },
    chipX: {
      background: 'none', border: 'none', cursor: 'pointer',
      fontSize: '0.7rem', fontWeight: 900, lineHeight: 1,
      color: 'inherit', opacity: 0.8, padding: 0,
    },
    addMore: {
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      color: '#E8600A', fontWeight: 700, fontSize: '0.85rem',
      background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
      transition: 'color .15s',
    },

    /* main layout */
    mainWrap: {
      maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem 3.5rem',
    },
    mainFlex: {
      display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
      flexWrap: 'wrap',
    },

    /* pantry */
    pantryAside: {
      width: '18rem', flexShrink: 0,
      animation: 'fadeUp .5s ease both',
    },
    pantryCard: {
      backgroundColor: '#fff', border: '1px solid #F0E0D0',
      borderRadius: '18px', padding: '1.25rem',
    },
    pantryTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '1.05rem', fontWeight: 700, color: '#1A1208',
      display: 'flex', alignItems: 'center', gap: '0.5rem',
      marginBottom: '1rem',
    },
    youHaveBadge: {
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      backgroundColor: '#E7F8EE', color: '#1BA94C',
      fontWeight: 700, fontSize: '0.82rem',
      borderRadius: '8px', padding: '6px 12px', marginBottom: '0.5rem',
    },
    pantryItem: {
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      padding: '0.75rem 0.875rem', borderRadius: '0.75rem', cursor: 'pointer',
      transition: 'background .15s, transform .12s',
    },
    pantryIcon: {
      width: '2.5rem', height: '2.5rem', borderRadius: '10px',
      backgroundColor: '#FFF4EC',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1.25rem', flexShrink: 0,
    },
    pantryLabel: { fontSize: '0.875rem', fontWeight: 600, color: '#1A1208', flex: 1 },

    /* recipe section */
    recipeCol: { flex: 1, minWidth: 0 },
    recipeHeader: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: '1rem', gap: '0.75rem', flexWrap: 'wrap',
    },
    recipeTitle: { fontSize: '1.15rem', fontWeight: 800, color: '#1A1208' },
    infoBtn: {
      width: '1.25rem', height: '1.25rem', borderRadius: '9999px',
      border: '1px solid #F0E0D0', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.7rem', fontWeight: 900, color: '#7A6A58', cursor: 'pointer',
      transition: 'border-color .15s, color .15s',
    },
    sortSelect: {
      border: '1.5px solid #F0E0D0', borderRadius: '10px',
      padding: '0.5rem 2rem 0.5rem 0.875rem',
      fontFamily: "'Nunito', sans-serif",
      fontSize: '0.85rem', fontWeight: 700,
      backgroundColor: '#fff', color: '#1A1208',
      cursor: 'pointer', outline: 'none',
      appearance: 'none', WebkitAppearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A6A58' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
    },

    /* recipe card */
    recipeCard: {
      backgroundColor: '#fff', border: '1px solid #F0E0D0',
      borderRadius: '18px', overflow: 'hidden',
      transition: 'box-shadow .25s, transform .25s',
      cursor: 'pointer', marginBottom: '1rem',
    },
    cardInner: { display: 'flex', flexWrap: 'wrap' },
    cardThumb: {
      width: '12rem', minHeight: '10rem', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '4rem', userSelect: 'none',
      transition: 'transform .4s ease',
    },
    cardBody: {
      display: 'flex', flex: 1, gap: '1rem',
      padding: '1.25rem', flexWrap: 'wrap',
    },
    cardInfo: { flex: 1, minWidth: 0 },
    cardName: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: '1.15rem', fontWeight: 700, color: '#E8600A', marginBottom: '0.5rem',
    },
    badgeRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' },
    badge: {
      display: 'inline-flex', alignItems: 'center',
      fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.03em',
      padding: '4px 10px', borderRadius: '9999px',
    },
    metaRow: { display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', fontWeight: 700, color: '#7A6A58' },
    metaItem: { display: 'flex', alignItems: 'center', gap: '4px' },

    /* missing + cta */
    cardRight: {
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
      alignItems: 'flex-start', justifyContent: 'space-between',
      minWidth: 0,
    },
    missingLabel: { fontSize: '0.75rem', fontWeight: 700, color: '#7A6A58', marginBottom: '0.5rem' },
    missingChips: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
    missingChip: {
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      backgroundColor: '#FFF6F1', border: '1px solid #FFE0CC',
      borderRadius: '8px', padding: '4px 10px',
      fontSize: '0.78rem', fontWeight: 600, color: '#6B3A1F',
    },
    viewBtn: {
      backgroundColor: '#E8600A', color: '#fff',
      fontWeight: 700, fontSize: '0.875rem',
      padding: '0.625rem 1.25rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
      transition: 'background .15s, transform .15s, box-shadow .15s',
      whiteSpace: 'nowrap', alignSelf: 'flex-end',
    },

    /* tip banner */
    tipBanner: {
      marginTop: '1.5rem',
      background: 'linear-gradient(90deg,#FFF4EC,#FFE8D4)',
      border: '1px solid #FFD4B3',
      borderRadius: '14px', padding: '0.875rem 1.25rem',
      display: 'flex', alignItems: 'center', gap: '0.625rem',
      animation: 'fadeUp .5s .4s ease both',
    },
    tipText: { fontSize: '0.875rem', fontWeight: 700, color: '#B84C00' },
    tipBold: { fontWeight: 800, color: '#E8600A' },
  }

  /* ── keyframes injected once via a <style> tag ── */
  const keyframes = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;500;600;700;800&display=swap');
    @keyframes slideDown {
      from { opacity:0; transform:translateY(-20px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes popIn {
      from { opacity:0; transform:scale(.7); }
      to   { opacity:1; transform:scale(1); }
    }
    @keyframes heroIn {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .chips-scroll::-webkit-scrollbar { display:none; }
    .pantry-item:hover { background:#FFF4EC !important; transform:translateX(4px) !important; }
    .recipe-card:hover { box-shadow:0 12px 40px rgba(232,96,10,.14) !important; transform:translateY(-4px) !important; }
    .recipe-card:hover .card-thumb { transform:scale(1.05) !important; }
    .chip-active:hover  { transform:scale(1.06) !important; box-shadow:0 4px 14px rgba(232,96,10,.30) !important; }
    .chip-inactive:hover { transform:scale(1.04) !important; border-color:#E8600A !important; }
    .view-btn:hover     { background:#B84C00 !important; box-shadow:0 6px 20px rgba(232,96,10,.30) !important; }
    .view-btn:active    { transform:scale(.97) !important; }
    .add-btn:hover      { background:#B84C00 !important; }
    .profile-btn:hover  { background:#B84C00 !important; }
    .search-input:focus { border-color:#E8600A !important; box-shadow:0 0 0 3px rgba(232,96,10,.12) !important; }
    @media (max-width: 768px) {
      .hero-emoji   { display:none !important; }
      .nav-links    { display:none !important; }
      .profile-btn  { display:none !important; }
      .hamburger    { display:flex !important; }
      .card-thumb   { width:100% !important; height:10rem !important; }
      .card-body    { flex-direction:column !important; }
      .pantry-aside { width:100% !important; }
      .main-flex    { flex-direction:column !important; }
    }
    @media (min-width: 769px) {
      .hamburger    { display:none !important; }
      .mobile-menu  { display:none !important; }
    }
    .mobile-menu.open { display:flex !important; }
  `

  return (
    <div style={styles.page}>
      <style>{keyframes}</style>

    
     

      {/* ════ HERO ════ */}
      <section style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.heroInner}>

          <div style={styles.heroTextWrap}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.75rem' }}>
              <button style={styles.backBtn} onClick={()=> navigate(-1)}>
                <svg width="16" height="16" fill="none" stroke="#1A1208" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <h1 style={styles.heroTitle}>Cook with what you have</h1>
            </div>
            <p style={styles.heroSub}>Add the ingredients you have in your kitchen and we'll find the best recipe matches!</p>
            <div style={styles.searchRow}>
              <div style={styles.searchWrap}>
                <svg style={styles.searchIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input value={addIngredient}
                  type="text" onChange={(e)=>setAddIngredient(e.target.value)}
                  placeholder="Add ingredients you have…"
                  className="search-input"
                  style={styles.searchInput}
                />
              </div>
              <button onClick={()=> handleAddIngredient()} className="add-btn" style={styles.addBtn}>Add</button>
            </div>
          </div>

          <div className="hero-emoji" style={styles.heroEmoji}>🥘</div>
        </div>
      </section>

      {/* ════ CHIPS BAR ════ */}
      <div style={styles.chipsBar}>
        <div style={styles.chipsRow}>
          <span style={styles.chipsLabel}>Your selected ingredients:</span>
          <div className="chips-scroll" style={styles.chipsScroll}>

            {activeChips.map((chip, i) => (
              <span key={chip} className="chip-active" style={{ ...styles.chipActive, animation:`popIn .35s ${chipDelay[i]} cubic-bezier(.34,1.56,.64,1) both` }}>
                {chip}
                <button style={styles.chipX}  onClick={()=> dispatch({ type: 'REMOVE_INGREDIENT', payload: chip })}>✕</button>
              </span>
            ))}

            {inactiveChips.map((chip, i) => (
              <span key={chip} className="chip-inactive" style={{ ...styles.chipInactive, animation:`popIn .35s ${chipDelay[i+4]} cubic-bezier(.34,1.56,.64,1) both` }}>
                {chip}
                <button style={styles.chipX}  onClick={()=> dispatch({ type: 'REMOVE_INGREDIENT', payload: chip })}>✕</button>
              </span>
            ))}

            <button style={styles.addMore}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
              </svg>
              Add more
            </button>
          </div>
        </div>
      </div>

      {/* ════ MAIN ════ */}
      <main style={styles.mainWrap}>
        <div className="main-flex" style={styles.mainFlex}>

          {/* ── PANTRY ── */}
          <aside className="pantry-aside" style={styles.pantryAside}>
            <div style={styles.pantryCard}>

              <div style={styles.pantryTitle}>
                <span>🧺</span> Your Pantry
              </div>

              <div style={styles.youHaveBadge}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                You have
              </div>

              <div style={{ marginTop:'0.25rem' }}>
                {state.ingredients.map(({ emoji, label }) => (
                  <div key={label} className="pantry-item" style={styles.pantryItem}>
                    <div style={styles.pantryIcon}>{emoji}</div>
                    <span style={styles.pantryLabel}>{label}</span>
                    <svg width="16" height="16" fill="none" stroke="#7A6A58" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ── RECIPES ── */}
          <div style={styles.recipeCol}>

            {/* Header */}
            <div style={styles.recipeHeader}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                <h2 style={styles.recipeTitle}>Best recipe matches</h2>
                <button style={styles.infoBtn}>i</button>
              </div>
              <select style={styles.sortSelect}>
                <option>Best Match</option>
                <option>Cook Time</option>
                <option>Difficulty</option>
              </select>
            </div>

            {/* Cards */}
            {filteredRecipeCard.map((recipe, idx) => {
  const badgeBg =
    recipe.matchPercentage >= 90
      ? "#E7F8EE"
      : recipe.matchPercentage >= 70
      ? "#FEF4E0"
      : "#FFF0E6";

  const badgeColor =
    recipe.matchPercentage >= 90
      ? "#1BA94C"
      : recipe.matchPercentage >= 70
      ? "#E8A00A"
      : "#E8600A";

  return (
    <div
      key={recipe.id}
      className="recipe-card"
      style={{
        ...styles.recipeCard,
        animation: `fadeUp .5s ${cardDelay[idx] || "0.1s"} ease both`,
      }}
    >
      <div className="card-inner" style={styles.cardInner}>
        {/* Thumb */}
        <div
          className="card-thumb"
          style={{
            ...styles.cardThumb,
            background:
              recipe.thumbBg ||
              "linear-gradient(135deg,#FFE8CC,#FFD4A3)",
          }}
        >
          {recipe.emoji || "🍲"}
        </div>

        {/* Body */}
        <div className="card-body" style={styles.cardBody}>
          <div style={styles.cardInfo}>
            <h3 style={styles.cardName}>{recipe.name}</h3>

            <div style={styles.badgeRow}>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor: badgeBg,
                  color: badgeColor,
                }}
              >
                {recipe.matchPercentage}%
              </span>

              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: badgeColor,
                }}
              >
                {recipe.status}
              </span>
            </div>

            <div style={styles.metaRow}>
              <span style={styles.metaItem}>
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {recipe.cookTime} mins
              </span>

              <span style={styles.metaItem}>
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8 2 4 6 4 10c0 5.5 8 12 8 12s8-6.5 8-12c0-4-4-8-8-8z" />
                </svg>
                {recipe.difficulty}
              </span>
            </div>
          </div>

          <div style={styles.cardRight}>
            <div>
              <p style={styles.missingLabel}>Missing ingredients</p>

              <div style={styles.missingChips}>
                {recipe.missingIngredients.length > 0 ? (
                  recipe.missingIngredients.map((ingredient) => (
                    <span key={ingredient.name} style={styles.missingChip}>
                     <p>{ingredient.name}</p>
                    </span>
                  ))
                ) : (
                  <span style={styles.missingChip}>✅ Nothing missing</span>
                )}
              </div>
            </div>

            <button
              className="view-btn"
              style={styles.viewBtn}
              onClick={() => navigate(`/details?q=${recipe.id}`)}
            >
              View Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
})}

           

            {/* Tip */}
            <div style={styles.tipBanner}>
              <span style={{ fontSize:'1.25rem', userSelect:'none', flexShrink:0 }}>💡</span>
              <p style={styles.tipText}>
                Tip: <span style={styles.tipBold}>The more ingredients you add, the better your matches!</span>
              </p>
            </div>
             <div className="flex justify-evenly items-center gap-4 mt-8">
        {currentRecipe >1 ? <button className="mt-8 px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600..." onClick={prevPage}>Previous Page</button> : null}
                { currentRecipe < Math.ceil(recipeData.length / recipeDataPerpage) ? <button className="mt-8 px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600..." onClick={nextPage}>Next Page</button> : null }
        
        </div>
       <p className="text-sm text-amber-900 font-medium tracking-tight mt-2">
  Page { currentRecipe} of {Math.ceil(recipeData.length / recipeDataPerpage)}
</p>
       
            

          </div>

          
        </div>
      </main>
    </div>
  )
}