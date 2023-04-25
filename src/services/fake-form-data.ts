const frenchFirstNames = [
  "Emma",
  "Lucas",
  "Chloé",
  "Louis",
  "Léa",
  "Hugo",
  "Jade",
  "Adam",
  "Lina",
  "Gabriel",
  "Inès",
  "Raphaël",
  "Manon",
  "Arthur",
  "Louise",
  "Noah",
  "Alice",
  "Théo",
  "Rose",
  "Ethan",
  "Juliette",
  "Gabin",
  "Anna",
  "Timéo",
  "Clara",
  "Eliott",
  "Alix",
];

const frenchLastNames = [
  "Dupont",
  "Dubois",
  "Martin",
  "Bernard",
  "Thomas",
  "Petit",
  "Robert",
  "Richard",
  "Durand",
  "Moreau",
  "Simon",
  "Laurent",
  "Lefebvre",
  "Michel",
  "Girard",
  "Roux",
  "Vincent",
  "Fournier",
  "Morel",
  "Garnier",
  "Barbier",
  "Perrin",
  "Gauthier",
  "Dumont",
  "Moulin",
  "Gonzalez",
  "Bertrand",
  "Renaud",
  "Fontaine",
  "Caron",
  "Faure",
  "Mercier",
  "Blanc",
  "Legrand",
  "Guillaume",
];

const universeQuotes = [
  "La vie est une chance, saisis-la. La vie est beauté, admire-la. La vie est béatitude, savoure-la. La vie est un rêve, fais-en une réalité.",
  "La science de l'univers, c'est d'abord l'amour de l'univers.",
  "L'univers est une symphonie harmonieuse où chaque élément a sa place et son rôle.",
  "Nous sommes tous des poussières d'étoiles.",
  "L'univers est plein de magie et il attend patiemment que notre intelligence s'affine.",
  "La science n'a pas de patrie, parce que la connaissance est le patrimoine de l'humanité, l'émancipation de l'homme de toute contrainte et de toute oppression.",
  "Il y a des moments où les étoiles, comme les gens, doivent se mettre à nu pour révéler leur vrai caractère.",
  "Les étoiles sont les yeux du ciel.",
  "L'univers est un livre dont on n'a lu que la première page quand on n'a vu que son propre pays.",
  "Nous sommes des êtres éphémères, mais notre univers est éternel.",
];

const funThemeColors = [
  "Bubblegum Pink",
  "Lemon Yellow",
  "Mint Green",
  "Sky Blue",
  "Lavender Purple",
  "Tangerine Orange",
  "Watermelon Red",
  "Ocean Blue",
  "Sunny Orange",
  "Cotton Candy Blue",
];

const slufigy = (str: string) => str.toLowerCase().replace(/[^\w]/g, "-");

const pick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

export const generateFormData = () => {
  const firstName = pick(frenchFirstNames);
  const lastName = pick(frenchLastNames);
  return {
    firstName,
    lastName,
    message: pick(universeQuotes),
    email: `${slufigy(firstName)}.${slufigy(lastName)}@mel.com`,
    color: pick(funThemeColors),
    newsletter: pick([0, 1]),
    alerts: pick([0, 1]),
  };
};
