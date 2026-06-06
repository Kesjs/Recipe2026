import Navbar from "@/components/Navbar";

const articles = [
  {
    id: 1,
    title: "Focus Nutrition: L&apos;Amiwo au poulet",
    subtitle: "Énergie de la farine de maïs vs. bienfaits de la grillade",
    content: "L&apos;Amiwo est un plat traditionnel béninois à base de farine de maïs et de poulet. La farine de maïs fournit des glucides complexes pour une énergie durable, tandis que le poulet grillé apporte des protéines maigres essentielles à la construction musculaire. Ce plat équilibré est riche en fibres et en nutriments, idéal pour un repas complet et sain.",
    accent: "emerald",
    icon: "🌽"
  },
  {
    id: 2,
    title: "L&apos;art d&apos;équilibre son Garba",
    subtitle: "Gérer les portions d&apos;Attiéké et contrôler l&apos;huile de friture",
    content: "Le Garba, composé d&apos;Attiéké et de poisson frit, est un délice ivoirien. Pour en faire un repas sain, privilégiez des portions modérées d&apos;Attiéké (environ 150g) et utilisez des méthodes de cuisson plus légères comme la cuisson au four ou à la vapeur pour le poisson. Réduisez la quantité d&apos;huile de palme et ajoutez plus de légumes frais pour un équilibre nutritionnel optimal.",
    accent: "amber",
    icon: "🐟"
  },
  {
    id: 3,
    title: "Les super-aliments de chez nous: Le Gombo et le Moringa",
    subtitle: "Fibres et antioxydants pour une santé optimale",
    content: "Le Gombo et le Moringa sont des trésors nutritionnels africains. Le Gombo est riche en fibres solubles qui aident à réguler la glycémie et le cholestérol. Le Moringa, surnommé l&apos;arbre miracle, contient plus de vitamines et minéraux que la plupart des légumes, avec des propriétés antioxydantes puissantes. Intégrez ces super-aliments dans votre alimentation quotidienne pour booster votre immunité.",
    accent: "green",
    icon: "🌿"
  },
  {
    id: 4,
    title: "Hydratation et climat chaud",
    subtitle: "Promouvoir le Bissap sans sucre et les infusions de citronnelle",
    content: "Dans les climats chauds, l&apos;hydratation est essentielle. Remplacez les sodas sucrés par le Bissap (jus d&apos;hibiscus) naturel sans sucre ajouté, riche en antioxydants et en vitamine C. Les infusions de citronnelle sont également excellentes pour la digestion et le rafraîchissement naturel. Ces boissons locales sont non seulement délicieuses mais aussi bénéfiques pour votre santé, sans les calories vides des boissons industrielles.",
    accent: "red",
    icon: "🥤"
  }
];

export default function ActualitesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight">Actualités Nutritionnelles</h1>
          <p className="text-slate-600">Découvrez nos conseils et articles sur la nutrition saine et les saveurs locales</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`p-8 bg-${article.accent}-50`}>
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <span className="text-3xl">{article.icon}</span>
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-3 tracking-tight">{article.title}</h2>
                <p className="text-slate-600 font-medium mb-4">{article.subtitle}</p>
              </div>
              <div className="p-8">
                <p className="text-slate-700 leading-relaxed">{article.content}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
