import Link from "next/link";

export default function AidePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Centre d&apos;aide</h1>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Comment créer une recette ?</h2>
            <p className="text-slate-600 mb-4">
              Pour créer une recette, connectez-vous à votre compte et cliquez sur le bouton &quot;+&quot; dans la barre de navigation, puis sélectionnez &quot;Créer une recette&quot;.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Comment ajouter une recette aux favoris ?</h2>
            <p className="text-slate-600 mb-4">
              Sur chaque fiche recette, vous trouverez un bouton &quot;♥&quot; pour ajouter la recette à vos favoris. Vous pouvez retrouver toutes vos recettes favorites dans votre dashboard.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Comment modifier mon profil ?</h2>
            <p className="text-slate-600 mb-4">
              Accédez à votre dashboard en cliquant sur &quot;Mon Dashboard&quot; dans le menu utilisateur. Vous pourrez y modifier vos informations personnelles.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Besoin de plus d&apos;aide ?</h2>
            <p className="text-slate-600 mb-4">
              Si vous ne trouvez pas la réponse à votre question, n&apos;hésitez pas à nous contacter par email.
            </p>
            <a
              href="mailto:support@cookingrecipe.com"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
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
