import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Conditions d&apos;utilisation</h1>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Acceptation des conditions</h2>
            <p className="text-slate-600">
              En accédant à Cooking Recipe, vous acceptez les présentes conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser ce site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Utilisation du site</h2>
            <p className="text-slate-600">
              Cooking Recipe est une plateforme de partage de recettes culinaires. Vous vous engagez à utiliser ce site de manière responsable et à ne pas publier de contenu illégal, offensant ou inapproprié.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Compte utilisateur</h2>
            <p className="text-slate-600">
              Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toutes les activités effectuées sous votre compte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Contenu utilisateur</h2>
            <p className="text-slate-600">
              En publiant du contenu sur Cooking Recipe, vous garantissez que vous en êtes l&apos;auteur ou que vous disposez des droits nécessaires pour le partager. Vous nous accordez une licence mondiale, non exclusive et gratuite pour utiliser, afficher et distribuer votre contenu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Propriété intellectuelle</h2>
            <p className="text-slate-600">
              Tous les éléments de Cooking Recipe (design, texte, images, logos) sont protégés par les lois sur la propriété intellectuelle. Toute reproduction non autorisée est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Limitation de responsabilité</h2>
            <p className="text-slate-600">
              Cooking Recipe ne peut être tenu responsable des dommages directs ou indirects résultant de l&apos;utilisation de ce site ou de l&apos;impossibilité de l&apos;utiliser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Modifications des conditions</h2>
            <p className="text-slate-600">
              Nous nous réservons le droit de modifier ces conditions d&apos;utilisation à tout moment. Les modifications prendront effet dès leur publication sur le site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Contact</h2>
            <p className="text-slate-600 mb-2">
              Pour toute question concernant ces conditions d&apos;utilisation, vous pouvez nous contacter à :
            </p>
            <a
              href="mailto:support@cookingrecipe.com"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              support@cookingrecipe.com
            </a>
          </section>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
