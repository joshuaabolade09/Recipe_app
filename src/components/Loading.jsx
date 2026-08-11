function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-cream px-4">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Glow */}
        <div className="absolute h-24 w-24 rounded-full bg-orange-500/10 animate-ping duration-1000" />
        
        {/* Inner Spinning Ring */}
        <div className="h-16 w-16 rounded-full border-4 border-amber-200 border-t-orange-500 animate-spin" />
        
        {/* Center Theme Icon (Pot/Bowl emoji) */}
        <div className="absolute text-2xl animate-bounce">
          🍲
        </div>
      </div>
      
      {/* Loading Text */}
      <p className="mt-6 text-base font-poppins font-semibold text-amber-900 tracking-wide animate-pulse">
        Cooking up something good...
      </p>
    </div>
  )
}

export default Loading