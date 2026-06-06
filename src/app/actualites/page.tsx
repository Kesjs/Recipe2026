import Navbar from "@/components/Navbar";
import { Wheat, Fish, Leaf, Droplets, Utensils, Carrot, Flame, Sparkles } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Focus Nutrition: L&apos;Amiwo au poulet",
    subtitle: "Énergie de la farine de maïs vs. bienfaits de la grillade",
    content: "L&apos;Amiwo est un plat traditionnel béninois à base de farine de maïs et de poulet. La farine de maïs fournit des glucides complexes pour une énergie durable, tandis que le poulet grillé apporte des protéines maigres essentielles à la construction musculaire. Ce plat équilibré est riche en fibres et en nutriments, idéal pour un repas complet et sain.",
    accent: "emerald",
    icon: Wheat
  },
  {
    id: 2,
    title: "L&apos;art d&apos;équilibre son Garba",
    subtitle: "Gérer les portions d&apos;Attiéké et contrôler l&apos;huile de friture",
    content: "Le Garba, composé d&apos;Attiéké et de poisson frit, est un délice ivoirien. Pour en faire un repas sain, privilégiez des portions modérées d&apos;Attiéké (environ 150g) et utilisez des méthodes de cuisson plus légères comme la cuisson au four ou à la vapeur pour le poisson. Réduisez la quantité d&apos;huile de palme et ajoutez plus de légumes frais pour un équilibre nutritionnel optimal.",
    accent: "amber",
    icon: Fish
  },
  {
    id: 3,
    title: "Les super-aliments de chez nous: Le Gombo et le Moringa",
    subtitle: "Fibres et antioxydants pour une santé optimale",
    content: "Le Gombo et le Moringa sont des trésors nutritionnels africains. Le Gombo est riche en fibres solubles qui aident à réguler la glycémie et le cholestérol. Le Moringa, surnommé l&apos;arbre miracle, contient plus de vitamines et minéraux que la plupart des légumes, avec des propriétés antioxydantes puissantes. Intégrez ces super-aliments dans votre alimentation quotidienne pour booster votre immunité.",
    accent: "green",
    icon: Leaf
  },
  {
    id: 4,
    title: "Hydratation et climat chaud",
    subtitle: "Promouvoir le Bissap sans sucre et les infusions de citronnelle",
    content: "Dans les climats chauds, l&apos;hydratation est essentielle. Remplacez les sodas sucrés par le Bissap (jus d&apos;hibiscus) naturel sans sucre ajouté, riche en antioxydants et en vitamine C. Les infusions de citronnelle sont également excellentes pour la digestion et le rafraîchissement naturel. Ces boissons locales sont non seulement délicieuses mais aussi bénéfiques pour votre santé, sans les calories vides des boissons industrielles.",
    accent: "red",
    icon: Droplets
  },
  {
    id: 5,
    title: "Les bienfaits du Thiéboudienne",
    subtitle: "Un plat complet équilibré en protéines et légumes",
    content: "Le Thiéboudienne est le plat national sénégalais, combinant riz, poisson et légumes. Ce plat offre un excellent équilibre nutritionnel avec des protéines de haute qualité du poisson, des glucides complexes du riz et une grande variété de vitamines et minéraux des légumes comme les carottes, le chou et l&apos;aubergine. C&apos;est un repas complet qui nourrit le corps et l&apos;esprit.",
    accent: "blue",
    icon: Utensils
  },
  {
    id: 6,
    title: "Aloco: Modération et plaisir",
    subtitle: "Profiter des bananes plantains sans excès",
    content: "L&apos;Aloco, ces délicieuses bananes plantains frites, est un plat très apprécié en Afrique de l&apos;Ouest. Bien que riche en glucides, les bananes plantains contiennent également du potassium et des fibres. Pour une version plus saine, réduisez la quantité d&apos;huile de friture et privilégiez une cuisson au four. Accompagnez-les de légumes frais pour un repas plus équilibré.",
    accent: "yellow",
    icon: Carrot
  },
  {
    id: 7,
    title: "Le Tilapia: Poisson maigre et nutritif",
    subtitle: "Une source de protéines idéale pour une alimentation saine",
    content: "Le Tilapia est un poisson d&apos;eau douce très populaire en Afrique. C&apos;est une excellente source de protéines maigres avec peu de calories et de graisses. Riche en vitamines B12 et en phosphore, le Tilapia contribue à la santé des os et au métabolisme énergétique. Privilégiez la cuisson au four ou au grill pour conserver tous ses bienfaits nutritionnels.",
    accent: "cyan",
    icon: Fish
  },
  {
    id: 8,
    title: "Épices et santé: Le gingembre et l&apos;ail",
    subtitle: "Propriétés anti-inflammatoires et digestives",
    content: "Le gingembre et l&apos;ail sont des épices fondamentales de la cuisine africaine aux propriétés médicinales reconnues. Le gingembre aide à la digestion et réduit les inflammations, tandis que l&apos;ail renforce le système immunitaire et améliore la santé cardiovasculaire. Utilisez-les généreusement dans vos recettes pour ajouter de la saveur et des bienfaits santé.",
    accent: "purple",
    icon: Sparkles
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
                  <article.icon className="w-8 h-8 text-slate-700" />
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
