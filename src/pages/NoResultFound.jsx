import { useNavigate } from "react-router-dom"

function NoResultFound() {
  const navigate = useNavigate()
    return (
        <div className="mx-auto bg-[#FFF5EB] flex flex-col justify-center items-center pt-20 gap-4 antialiased">
            <img src="/src/img/noImageFound.png" alt="No Recipe Image" className=" max-w-3xl w-[256px] object-contain"/>

           <h2 className="md:text-4xl text-xl font-bold mt-4 text-amber-900">No results Found</h2>
            <p className="md:text-base text-sm font-normal text-amber-900/70 mt-1 ">We couldn't find any recipes matching your search <br/> Try different ingredients or a new search</p>
       
           <button onClick={()=>navigate(-1)} className="block bg-orange-600 text-white hover:bg-orange-700 px-4 py-3 mt-2 rounded-md ">Try Another Search</button> 
        
          <div className="flex flex-row items-center gap-3 max-w-3xl">
    <div className="flex-1 h-[1px] bg-gray-600"></div>

    <p className="text-sm text-amber-900">You can also</p>

    <div className="flex-1 h-[1px] bg-gray-600"></div>
</div>       

<div className="mt-4 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-[0_4px_14px_rgba(120,72,32,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-orange-100 hover:shadow-[0_10px_24px_rgba(120,72,32,0.12)]">
    <svg
      className="h-8 w-8 shrink-0 text-[#a85a1f]"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M20 20L17 17"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>

    <p className="text-sm font-medium leading-snug text-amber-900">
      Check your spelling
    </p>
  </div>

  <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-[0_4px_14px_rgba(120,72,32,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-orange-100 hover:shadow-[0_10px_24px_rgba(120,72,32,0.12)]">
    <svg
      className="h-8 w-8 shrink-0"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 30C14 22 22 16 32 16C42 16 50 22 50 30V36H14V30Z" fill="#F59E0B" />
      <path d="M18 36H46L42 48H22L18 36Z" fill="#D97706" />
      <circle cx="24" cy="24" r="4" fill="#22C55E" />
      <circle cx="34" cy="20" r="4" fill="#EF4444" />
      <circle cx="42" cy="26" r="4" fill="#84CC16" />
    </svg>

    <p className="text-sm font-medium leading-snug text-amber-900">
      Try more general terms
    </p>
  </div>

  <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-[0_4px_14px_rgba(120,72,32,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-orange-100 hover:shadow-[0_10px_24px_rgba(120,72,32,0.12)]">
    <svg
      className="h-8 w-8 shrink-0"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="12" y="24" width="40" height="24" rx="4" fill="#C2410C" />
      <path d="M12 28H52" stroke="#7C2D12" strokeWidth="2" />
      <path
        d="M22 20C22 16 26 14 29 16C32 10 40 12 40 18"
        stroke="#84CC16"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="26" cy="18" r="3" fill="#F97316" />
      <circle cx="38" cy="18" r="3" fill="#22C55E" />
    </svg>

    <p className="text-sm font-medium leading-snug text-amber-900">
      Use ingredients you have
    </p>
  </div>

  <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-[0_4px_14px_rgba(120,72,32,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-orange-100 hover:shadow-[0_10px_24px_rgba(120,72,32,0.12)]">
    <svg
      className="h-8 w-8 shrink-0 text-[#E7B97A]"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10V7C7 4.8 8.8 3 11 3H13C15.2 3 17 4.8 17 7V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 10H19V17C19 19.2 17.2 21 15 21H9C6.8 21 5 19.2 5 17V10Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path d="M5 10H19" stroke="currentColor" strokeWidth="2" />
    </svg>

    <p className="text-sm font-medium leading-snug text-amber-900">
      Explore our categories
    </p>
  </div>
</div>

        </div>
    )
}

export default NoResultFound
