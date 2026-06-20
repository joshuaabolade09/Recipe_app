function PageLoader() {
  return (
    <div
      className="min-h-screen bg-[#FFF5EB] flex items-center justify-center px-4"
      role="status"
      aria-live="polite"
      aria-label="Loading recipes"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-orange-200" />

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 motion-safe:animate-spin" />

          <div className="absolute inset-3 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 10h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M8 10V7a4 4 0 0 1 8 0v3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M9 14h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-bold text-amber-950">
            Preparing recipes
          </p>
          <p className="mt-1 text-sm text-amber-800/70">
            Finding something delicious for you...
          </p>
        </div>

        <span className="sr-only">Loading recipes, please wait.</span>
      </div>
    </div>
  );
}

export default PageLoader;
