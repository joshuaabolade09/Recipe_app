import { useNavigate } from "react-router-dom";

function NoResultFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[80vh] bg-[#FFF5EB] flex flex-col justify-center items-center px-4 py-16 text-center antialiased font-poppins">
      
      {/* Central Brand Illustration */}
      <div className="relative max-w-xs w-48 md:w-56 aspect-square flex items-center justify-center">
        <img 
          src="/src/img/noImageFound.png" 
          alt="No Recipe Image" 
          className="w-full h-full object-contain filter drop-shadow-sm select-none"
        />
      </div>

      {/* Primary Message */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-6 text-amber-900">
        No Results Found
      </h2>
      
      <p className="max-w-md text-sm md:text-base font-medium text-amber-900/60 mt-2.5 leading-relaxed px-2">
        We couldn't find any recipes matching your criteria. Try adjusting your ingredient filters or running a fresh search.
      </p>

      {/* Primary Action Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center justify-center bg-orange-500 text-white font-semibold text-sm md:text-base px-6 py-3 mt-6 rounded-xl hover:bg-orange-600 active:scale-95 shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200 cursor-pointer"
      >
        Try Another Search
      </button> 

      {/* Decorative Text Divider */}
      <div className="flex items-center gap-4 w-full max-w-xl mt-14 px-4">
        <div className="flex-1 h-[1px] bg-amber-200/60"></div>
        <p className="text-xs uppercase tracking-widest font-bold text-amber-800/50">Troubleshooting Tips</p>
        <div className="flex-1 h-[1px] bg-amber-200/60"></div>
      </div>      

      {/* Dynamic Recommendation Grid */}
      <div className="mt-8 grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        
        {/* Tip 1 */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm shadow-amber-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50/30 hover:shadow-md hover:border-orange-200">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-orange-50 text-orange-600 shrink-0">
            <svg className="h-5 w-5 stroke-[2.2]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" stroke="currentColor" />
              <path d="M20 20L17 17" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-left text-amber-900 leading-snug">
            Check your spelling
          </p>
        </div>

        {/* Tip 2 */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm shadow-amber-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50/30 hover:shadow-md hover:border-orange-200">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-orange-50 text-orange-600 shrink-0">
            <svg className="h-5 w-5 stroke-[2.2]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M3 12h14M3 18h10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-left text-amber-900 leading-snug">
            Try more general terms
          </p>
        </div>

        {/* Tip 3 */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm shadow-amber-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50/30 hover:shadow-md hover:border-orange-200">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-orange-50 text-orange-600 shrink-0">
            <svg className="h-5 w-5 stroke-[2.2]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" />
              <path d="M12 7v5l3 3" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-left text-amber-900 leading-snug">
            Use ingredients you have
          </p>
        </div>

        {/* Tip 4 */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm shadow-amber-900/5 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50/30 hover:shadow-md hover:border-orange-200">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-orange-50 text-orange-600 shrink-0">
            <svg className="h-5 w-5 stroke-[2.2]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5h16v14H4z" stroke="currentColor" />
              <path d="M4 9h16M9 5v14" stroke="currentColor" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-left text-amber-900 leading-snug">
            Explore our categories
          </p>
        </div>

      </div>
    </div>
  );
}

export default NoResultFound;