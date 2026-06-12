"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqGroups = [
  {
    category: "Nutrition & Aliments",
    items: [
      {
        q: "Le manioc fait-il grossir ?",
        a: "Non, en soi. Le manioc est riche en glucides complexes (38g/100g) mais pauvre en lipides. C'est la façon de le préparer — frit ou avec des sauces riches — qui peut faire pencher la balance.",
      },
      {
        q: "Le moringa est-il vraiment un superaliment ?",
        a: "Oui, avec des preuves. 100g de feuilles fraîches contiennent plus de vitamine C que l'orange, plus de calcium que le lait, et plus de fer que les épinards. À intégrer régulièrement dans vos plats.",
      },
      {
        q: "Les plats africains sont-ils compatibles avec un régime ?",
        a: "Absolument. La cuisine africaine traditionnelle est naturellement riche en légumes, légumineuses et céréales complètes. Ce sont les versions modernisées — friture, sucre ajouté — qui peuvent poser problème.",
      },
      {
        q: "Quelle différence entre attiéké et couscous ?",
        a: "L'attiéké est à base de manioc fermenté, le couscous à base de semoule de blé. L'attiéké est naturellement sans gluten et légèrement fermenté, ce qui améliore sa digestibilité.",
      },
      {
        q: "Comment calculer mes besoins caloriques ?",
        a: "Utilisez le calculateur en haut de cette page. Il applique la formule de Mifflin-St Jeor — la plus précise pour les adultes — en tenant compte de votre métabolisme de base et de votre niveau d'activité.",
      },
    ],
  },
  {
    category: "Recettes & Plateforme",
    items: [
      {
        q: "Comment publier une recette sur Naya ?",
        a: "Créez un compte, puis cliquez sur \"Publier une recette\" dans le menu. Vous pouvez ajouter les étapes, ingrédients, temps de préparation et photos. Les valeurs nutritionnelles sont calculées automatiquement.",
      },
      {
        q: "Qui valide les informations nutritionnelles ?",
        a: "Les valeurs de notre bibliothèque sont basées sur les tables de composition nutritionnelle de la FAO pour les aliments africains. Les recettes sont calculées automatiquement à partir de ces données de référence.",
      },
      {
        q: "Puis-je modifier une recette après publication ?",
        a: "Oui, depuis votre espace \"Mes recettes\". Les modifications sont visibles immédiatement. Les utilisateurs qui ont sauvegardé votre recette verront automatiquement la version mise à jour.",
      },
      {
        q: "Faut-il un compte pour accéder aux recettes ?",
        a: "Non. Toutes les recettes sont accessibles sans compte. Un compte est nécessaire uniquement pour publier, sauvegarder des favoris ou utiliser le calculateur nutritionnel personnalisé.",
      },
      {
        q: "Naya est-il gratuit ?",
        a: "Oui, entièrement gratuit. La plateforme est conçue pour être accessible à tous, sans abonnement ni fonctionnalité payante cachée.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left text-sm font-medium text-zinc-900 hover:text-emerald-600 transition-colors"
      >
        {q}
        {open ? (
          <Minus className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={1.5} />
        ) : (
          <Plus className="w-4 h-4 text-zinc-400 flex-shrink-0" strokeWidth={1.5} />
        )}
      </button>
      {open && (
        <p className="text-sm text-zinc-500 leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="mt-16 mb-8">
      <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-8">
        Questions fréquentes
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {faqGroups.map((group) => (
          <div
            key={group.category}
            className="bg-white border border-zinc-100 rounded-2xl p-6"
          >
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-4">
              {group.category}
            </p>
            {group.items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}