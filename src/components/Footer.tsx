import Link from "next/link";
import { ChefHat, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-zinc-900 text-lg">Cooking Recipe</span>
            </div>
            <p className="text-zinc-600 text-sm">
              Découvrez, partagez et créez des recettes saines et nutritives qui célèbrent les richesses culinaires africaines.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#recettes-section" className="text-zinc-600 hover:text-zinc-950 text-sm transition-colors">
                  Recettes
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="text-zinc-600 hover:text-zinc-950 text-sm transition-colors">
                  Nutrition
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="text-zinc-600 hover:text-zinc-950 text-sm transition-colors">
                  Actualités
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 mb-4">Aide</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-zinc-600 hover:text-zinc-950 text-sm transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-600 hover:text-zinc-950 text-sm transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <a href="mailto:support@cookingrecipe.com" className="flex items-center space-x-2 text-zinc-600 hover:text-zinc-950 text-sm transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>support@cookingrecipe.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200/80 mt-8 pt-8 text-center">
          <p className="text-zinc-500 text-sm">
            © 2024 Cooking Recipe. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
