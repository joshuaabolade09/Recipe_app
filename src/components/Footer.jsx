import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-amber-950 text-orange-100/80 border-t border-amber-900 font-poppins mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* BRAND SPLIT CONTAINER */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <span className="text-xl font-semibold tracking-tight text-white">
              Naija<span className="italic text-orange-400">Cook</span>
            </span>
            <p className="text-xs text-orange-200/60 leading-relaxed">
              Bringing the authentic taste of Nigerian and global home kitchens directly to your countertop workspace.
            </p>
          </div>

          {/* NAV BLOCKS */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-orange-400 uppercase mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/home" className="hover:text-white transition-colors">Recipes</Link></li>
              <li><Link to="/ingredientResult" className="hover:text-white transition-colors">Pantry Matching</Link></li>
              <li><Link to="/modal" className="hover:text-white transition-colors">Meal Planner</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-wider text-orange-400 uppercase mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-pointer hover:text-white transition-colors">Budget Estimator</span></li>
              <li><Link to="/favourites" className="hover:text-white transition-colors">Saved Kitchens</Link></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Trending spices</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-wider text-orange-400 uppercase mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-amber-900 pt-6 text-center text-xs text-orange-200/40">
          <p>&copy; {new Date().getFullYear()} NaijaCook. Built for home and international chefs everywhere by Abolade Joshua.</p>
        </div>
      </div>
    </footer>
  );
}