import { useSearchParams } from "react-router-dom"
import { useState, useReducer, useEffect } from "react"
import recipes from "../data/recipe.json"
import { uiReducer, init } from "../Reducer/Reducer"
import { useNavigate } from "react-router-dom"
import pantryItemsDetails from "../data/pantryDetails.json"

export default function SearchRecipe() {
  const [searchResult] = useSearchParams()
  const ingredientResult = searchResult.get("ingredientSearch") || ""
  const [currentRecipe, setCurrentRecipe] = useState(1)
  const navigate = useNavigate()

  const initialIngredients = [
    ...new Set(
      ingredientResult
        .split(",")
        .map((ing) => ing.trim().toLowerCase())
        .filter(Boolean)
    )
  ];

  const details = initialIngredients.map((ing) =>
    pantryItemsDetails.find((item) =>
      item.label.toLowerCase() === ing.toLowerCase()
    ) || { emoji: "🥬", label: ing }
  );

  const [state, dispatch] = useReducer(uiReducer, details, init)
  const [addIngredient, setAddIngredient] = useState("")

  function handleAddIngredient() {
    if (!addIngredient || !addIngredient.trim()) return;

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

  const activeChips = [
    ...new Set(
      (state?.ingredients || []).map(
        (item) => item.label[0].toUpperCase() + item.label.slice(1)
      )
    )
  ];

  const userIngredients = (state?.ingredients || []).map((item) =>
    item.label.trim().toLowerCase()
  )

  const cachedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
  const allAvailableRecipes = [...recipes, ...cachedRecipes];

  const recipeData = allAvailableRecipes
    .map((recipe) => {
      const targetIngredientsArray = recipe.ingredientsAlternatives || recipe.ingredients || [];
      
      const missingIngredients = targetIngredientsArray.filter((ingredient) => {
        const targetName = ingredient.name || ingredient.title || "";
        const targetAlternatives = ingredient.alternatives || [];

        const ingredientGroup = [
          targetName,
          ...targetAlternatives
        ].map((ing) =>
          ing
            .trim()
            .toLowerCase()
            .replace(/\(.*?\)/g, "")   
            .replace(/‑/g, "-")        
            .trim()
        )

        const isMatched = ingredientGroup.some((ing) =>
          userIngredients.some((u) =>
            ing.includes(u) || u.includes(ing)  
          )
        )
        return !isMatched
      })

      const totalIngredients = targetIngredientsArray.length || 1;
      const missingCount = missingIngredients.length;
      const matchedCount = totalIngredients - missingCount;
      const matchPercentage = Math.round((matchedCount / totalIngredients) * 100)

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
    .filter((recipe) => recipe.matchPercentage > 60)  
    .sort((a, b) => b.matchPercentage - a.matchPercentage)

  const recipeDataPerpage = 4
  const startIndex = (currentRecipe - 1) * recipeDataPerpage
  const endIndex = startIndex + recipeDataPerpage
  const filteredRecipeCard = recipeData.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentRecipe(1);
  }, [ingredientResult, state?.ingredients?.length]);

  function nextPage(){
    if(endIndex < recipeData.length){
      setCurrentRecipe(currentRecipe + 1)
    }
  }

  function prevPage(){
    if(currentRecipe > 1){
      setCurrentRecipe(currentRecipe - 1)
    }
  }

  const cardDelay = ['0.10s', '0.22s', '0.34s', '0.46s']
  const chipDelay = ['0.05s','0.10s','0.15s','0.20s','0.25s','0.30s']

  const styles = {
    page: { fontFamily: "'Nunito', 'Trebuchet MS', sans-serif", backgroundColor: '#FFFAF6', color: '#1A1208', minHeight: '100vh' },
    hero: { background: 'linear-gradient(135deg,#FFF4EC 60%,#FFE8D4 100%)', borderBottom: '1px solid #F0E0D0', padding: '2rem 1rem', position: 'relative', overflow: 'hidden' },
    heroGlow: { position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 80% 50%, rgba(232,96,10,.08) 0%, transparent 70%)' },
    heroInner: { maxWidth: '80rem', margin: '0 auto', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' },
    heroTextWrap: { animation: 'heroIn .6s .1s ease both', flex: '1 1 28rem', minWidth: 0 },
    backBtn: { width: '2.25rem', height: '2.25rem', borderRadius: '9999px', backgroundColor: '#fff', border: '1px solid #F0E0D0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'box-shadow .15s' },
    heroTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, color: '#1A1208', lineHeight: 1.2 },
    heroSub: { fontSize: '0.95rem', color: '#7A6A58', marginBottom: '1.5rem', maxWidth: '32rem' },
    searchRow: { display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '36rem', flexWrap: 'wrap' },
    searchWrap: { position: 'relative', flex: '1 1 18rem' },
    searchIcon: { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#7A6A58', pointerEvents: 'none' },
    searchInput: { width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', border: '1.5px solid #F0E0D0', borderRadius: '0.75rem', fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', backgroundColor: '#fff', color: '#1A1208', outline: 'none', transition: 'border-color .2s, box-shadow .2s' },
    addBtn: { flex: '1 1 auto', backgroundColor: '#E8600A', color: '#fff', fontWeight: 700, fontSize: '0.875rem', padding: '0.875rem 2rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', transition: 'background .15s, box-shadow .15s', minWidth: '80px' },
    heroEmoji: { width: '10rem', height: '10rem', borderRadius: '9999px', background: 'rgba(232,96,10,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', userSelect: 'none', flexShrink: 0, animation: 'heroIn .7s .25s ease both' },
    chipsBar: { maxWidth: '80rem', margin: '0 auto', padding: '1rem' },
    chipsRow: { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flexDirection: 'column' },
    chipsLabel: { fontSize: '0.82rem', fontWeight: 700, color: '#7A6A58', flexShrink: 0 },
    chipsScroll: { display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', paddingBottom: '4px', width: '100%' },
    chipActive: { display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#E8600A', color: '#fff', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.02em', padding: '6px 12px 6px 16px', borderRadius: '9999px', cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none', border: 'none', transition: 'transform .15s, box-shadow .15s' },
    chipInactive: { display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', color: '#1A1208', border: '1.5px solid #F0E0D0', fontWeight: 700, fontSize: '0.82rem', padding: '6px 12px 6px 16px', borderRadius: '9999px', cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none', transition: 'transform .15s, box-shadow .15s, border-color .15s' },
    chipX: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 900, lineHeight: 1, color: 'inherit', opacity: 0.8, padding: 0 },
    addMore: { display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#E8600A', fontWeight: 700, fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'color .15s' },
    mainWrap: { maxWidth: '80rem', margin: '0 auto', padding: '0 1rem 3.5rem' },
    mainFlex: { display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' },
    pantryAside: { width: '100%', maxWidth: '100%', flexShrink: 0, animation: 'fadeUp .5s ease both' },
    pantryCard: { backgroundColor: '#fff', border: '1px solid #F0E0D0', borderRadius: '18px', padding: '1.25rem' },
    pantryTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', fontWeight: 700, color: '#1A1208', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' },
    youHaveBadge: { display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#E7F8EE', color: '#1BA94C', fontWeight: 700, fontSize: '0.82rem', borderRadius: '8px', padding: '6px 12px', marginBottom: '0.5rem' },
    pantryItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.875rem', borderRadius: '0.75rem', cursor: 'pointer', transition: 'background .15s, transform .12s' },
    pantryIcon: { width: '2.5rem', height: '2.5rem', borderRadius: '10px', backgroundColor: '#FFF4EC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 },
    pantryLabel: { fontSize: '0.875rem', fontWeight: 600, color: '#1A1208', flex: 1 },
    recipeCol: { flex: '1 1 32rem', minWidth: 0 },
    recipeHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: '0.75rem', flexWrap: 'wrap' },
    recipeTitle: { fontSize: '1.15rem', fontWeight: 800, color: '#1A1208' },
    infoBtn: { width: '1.25rem', height: '1.25rem', borderRadius: '9999px', border: '1px solid #F0E0D0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900, color: '#7A6A58', cursor: 'pointer', transition: 'border-color .15s, color .15s' },
    sortSelect: { border: '1.5px solid #F0E0D0', borderRadius: '10px', padding: '0.5rem 2rem 0.5rem 0.875rem', fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#fff', color: '#1A1208', cursor: 'pointer', outline: 'none', appearance: 'none', WebkitAppearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A6A58' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' },
    recipeCard: { backgroundColor: '#fff', border: '1px solid #F0E0D0', borderRadius: '18px', overflow: 'hidden', transition: 'box-shadow .25s, transform .25s', cursor: 'pointer', marginBottom: '1rem' },
    cardInner: { display: 'flex', flexWrap: 'wrap', flexDirection: 'column' },
    cardThumb: { width: '100%', height: '11rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', userSelect: 'none', transition: 'transform .4s ease' },
    cardBody: { display: 'flex', flex: 1, gap: '1.25rem', padding: '1.25rem', flexWrap: 'wrap', flexDirection: 'column' },
    cardInfo: { flex: '1 1 auto', minWidth: 0 },
    cardName: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.15rem', fontWeight: 700, color: '#E8600A', marginBottom: '0.5rem' },
    badgeRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' },
    badge: { display: 'inline-flex', alignItems: 'center', fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.03em', padding: '4px 10px', borderRadius: '9999px' },
    metaRow: { display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', fontWeight: 700, color: '#7A6A58' },
    metaItem: { display: 'flex', alignItems: 'center', gap: '4px' },
    cardRight: { display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'stretch', justifyContent: 'space-between', width: '100%' },
    missingLabel: { fontSize: '0.75rem', fontWeight: 700, color: '#7A6A58', marginBottom: '0.5rem' },
    missingChips: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
    missingChip: { display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: '#FFF6F1', border: '1px solid #FFE0CC', borderRadius: '8px', padding: '4px 10px', fontSize: '0.78rem', fontWeight: 600, color: '#6B3A1F' },
    viewBtn: { backgroundColor: '#E8600A', color: '#fff', fontWeight: 700, fontSize: '0.875rem', padding: '0.75rem 1.25rem', borderRadius: '10px', border: 'none', cursor: 'pointer', transition: 'background .15s, transform .15s, box-shadow .15s', whiteSpace: 'nowrap', width: '100%', textAlign: 'center', marginTop: '0.5rem' },
    tipBanner: { marginTop: '1.5rem', background: 'linear-gradient(90deg,#FFF4EC,#FFE8D4)', border: '1px solid #FFD4B3', borderRadius: '14px', padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.625rem', animation: 'fadeUp .5s .4s ease both' },
    tipText: { fontSize: '0.875rem', fontWeight: 700, color: '#B84C00' },
    tipBold: { fontWeight: 800, color: '#E8600A' },
    paginationRow: { display: 'flex', flexDirection: 'column', smDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '2rem' }
  }

  const keyframes = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;500;600;700;800&display=swap');
    @keyframes slideDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes popIn { from { opacity:0; transform:scale(.7); } to { opacity:1; transform:scale(1); } }
    @keyframes heroIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    
    .chips-scroll::-webkit-scrollbar { display:none; }
    .pantry-item:hover { background:#FFF4EC !important; transform:translateX(4px) !important; }
    .recipe-card:hover { box-shadow:0 12px 40px rgba(232,96,10,.14) !important; transform:translateY(-4px) !important; }
    .recipe-card:hover .card-thumb { transform:scale(1.05) !important; }
    .chip-active:hover { transform:scale(1.06) !important; box-shadow:0 4px 14px rgba(232,96,10,.30) !important; }
    .chip-inactive:hover { transform:scale(1.04) !important; border-color:#E8600A !important; }
    .view-btn:hover { background:#B84C00 !important; box-shadow:0 6px 20px rgba(232,96,10,.30) !important; }
    .view-btn:active { transform:scale(.97) !important; }
    .add-btn:hover { background:#B84C00 !important; }
    .search-input:focus { border-color:#E8600A !important; box-shadow:0 0 0 3px rgba(232,96,10,.12) !important; }

    /* RESPONSIVE LAYOUT MEDIA QUERY TARGETS */
    @media (min-width: 640px) {
      .chips-row-el { flex-direction: row !important; align-items: center !important; }
      .chips-scroll-el { width: auto !important; }
      .card-inner-el { flex-direction: row !important; }
      .card-thumb-el { width: 12rem !important; height: auto !important; }
      .card-body-el { flex-direction: row !important; }
      .card-right-el { width: 14rem !important; align-items: flex-start !important; }
      .view-btn-el { width: auto !important; }
      .pagination-row-el { flex-direction: row !important; }
    }

    @media (min-width: 1024px) {
      .pantry-aside-el { width: 18rem !important; }
    }

    @media (max-width: 900px) {
      .hero-emoji { display:none !important; }
    }
  `

  return (
    <div style={styles.page}>
      <style>{keyframes}</style>

      {/* HERO SECTION */}
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
                <input 
                  value={addIngredient}
                  type="text" 
                  onChange={(e)=>setAddIngredient(e.target.value)}
                  placeholder="Add ingredients you have…"
                  className="search-input"
                  style={styles.searchInput}
                />
              </div>
              <button onClick={handleAddIngredient} className="add-btn" style={styles.addBtn}>Add</button>
            </div>
          </div>
          <div className="hero-emoji" style={styles.heroEmoji}>🥘</div>
        </div>
      </section>

      {/* CHIPS BAR */}
      <div style={styles.chipsBar}>
        <div className="chips-row-el" style={styles.chipsRow}>
          <span style={styles.chipsLabel}>Your selected ingredients:</span>
          <div className="chips-scroll chips-scroll-el" style={styles.chipsScroll}>
            {activeChips.map((chip, i) => (
              <span key={chip} className="chip-active" style={{ ...styles.chipActive, animation:`popIn .35s ${chipDelay[i] || '0.1s'} cubic-bezier(.34,1.56,.64,1) both` }}>
                {chip}
                <button style={styles.chipX} onClick={()=> dispatch({ type: 'REMOVE_INGREDIENT', payload: chip.toLowerCase() })}>✕</button>
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

      {/* MAIN LAYOUT */}
      <main style={styles.mainWrap}>
        <div className="main-flex" style={styles.mainFlex}>
          {/* PANTRY ASIDE */}
          <aside className="pantry-aside-el" style={styles.pantryAside}>
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
                {(state?.ingredients || []).map(({ emoji, label }, idx) => (
                  <div key={`${label}-${idx}`} className="pantry-item" style={styles.pantryItem}>
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

          {/* RECIPES LIST */}
          <div style={styles.recipeCol}>
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

            {/* RECIPE CARDS */}
            {filteredRecipeCard.map((recipe, idx) => {
              const badgeBg = recipe.matchPercentage >= 90 ? "#E7F8EE" : recipe.matchPercentage >= 70 ? "#FEF4E0" : "#FFF0E6";
              const badgeColor = recipe.matchPercentage >= 90 ? "#1BA94C" : recipe.matchPercentage >= 70 ? "#E8A00A" : "#E8600A";

              return (
                <div
                  key={recipe.id}
                  className="recipe-card"
                  style={{ ...styles.recipeCard, animation: `fadeUp .5s ${cardDelay[idx] || "0.1s"} ease both` }}
                  onClick={() => navigate(`/details?q=${recipe.id}`)}
                >
                  <div className="card-inner-el" style={styles.cardInner}>
                    <div className="card-thumb card-thumb-el" style={{ ...styles.cardThumb, background: recipe.thumbBg || "linear-gradient(135deg,#FFE8CC,#FFD4A3)" }}>
                      {recipe.emoji || "🍲"}
                    </div>

                    <div className="card-body card-body-el" style={styles.cardBody}>
                      <div style={styles.cardInfo}>
                        <h3 style={styles.cardName}>{recipe.name || recipe.title}</h3>
                        <div style={styles.badgeRow}>
                          <span style={{ ...styles.badge, backgroundColor: badgeBg, color: badgeColor }}>
                            {recipe.matchPercentage}%
                          </span>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: badgeColor }}>
                            {recipe.status}
                          </span>
                        </div>

                        <div style={styles.metaRow}>
                          <span style={styles.metaItem}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                            </svg>
                            {recipe.cookTime || recipe.readyInMinutes || "25"} mins
                          </span>
                          <span style={styles.metaItem}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M12 2C8 2 4 6 4 10c0 5.5 8 12 8 12s8-6.5 8-12c0-4-4-8-8-8z" />
                            </svg>
                            {recipe.difficulty || "Medium"}
                          </span>
                        </div>
                      </div>

                      <div className="card-right-el" style={styles.cardRight}>
                        <div>
                          <p style={styles.missingLabel}>Missing ingredients</p>
                          <div style={styles.missingChips}>
                            {recipe.missingIngredients && recipe.missingIngredients.length > 0 ? (
                              recipe.missingIngredients.map((ingredient, i) => (
                                <span key={`${ingredient.name || ingredient.title}-${i}`} style={styles.missingChip}>
                                  {ingredient.name || ingredient.title}
                                </span>
                              ))
                            ) : (
                              <span style={styles.missingChip}>✅ Nothing missing</span>
                            )}
                          </div>
                        </div>
                        <button className="view-btn view-btn-el" style={styles.viewBtn}>
                          View Recipe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={styles.tipBanner}>
              <span style={{ fontSize:'1.25rem', userSelect:'none', flexShrink:0 }}>💡</span>
              <p style={styles.tipText}>
                Tip: <span style={styles.tipBold}>The more ingredients you add, the better your matches!</span>
              </p>
            </div>

            {/* PAGINATION PANEL */}
            <div className="pagination-row-el" style={styles.paginationRow}>
              {currentRecipe > 1 && (
                <button className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600" onClick={prevPage}>
                  Previous Page
                </button>
              )}
              {currentRecipe < Math.ceil(recipeData.length / recipeDataPerpage) && (
                <button className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600" onClick={nextPage}>
                  Next Page
                </button>
              )}
            </div>
            <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Page {currentRecipe} of {Math.max(1, Math.ceil(recipeData.length / recipeDataPerpage))}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}