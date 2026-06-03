// French verbs from provided CSV
// group: 1 = -er, 2 = -ir, 3 = irregular
export const verbs = [
  // Group 1 (-er verbs)
  { id: 1, infinitive: "adorer", english: "to adore/love", group: 1, starter: true },
  { id: 2, infinitive: "acheter", english: "to buy", group: 1, starter: true },
  { id: 3, infinitive: "aider", english: "to help", group: 1, starter: true },
  { id: 4, infinitive: "aimer", english: "to love/like", group: 1, starter: true },
  { id: 5, infinitive: "appeler", english: "to call", group: 1, starter: true },
  { id: 6, infinitive: "bronzer", english: "to sunbathe/tan", group: 1, starter: false },
  { id: 7, infinitive: "commencer", english: "to begin", group: 1, starter: true },
  { id: 8, infinitive: "danser", english: "to dance", group: 1, starter: false },
  { id: 9, infinitive: "demander", english: "to ask", group: 1, starter: true },
  { id: 10, infinitive: "détester", english: "to hate", group: 1, starter: false },
  { id: 11, infinitive: "donner", english: "to give", group: 1, starter: true },
  { id: 12, infinitive: "écouter", english: "to listen (to)", group: 1, starter: true },
  { id: 13, infinitive: "entrer", english: "to enter", group: 1, starter: true },
  { id: 14, infinitive: "essayer", english: "to try", group: 1, starter: false },
  { id: 15, infinitive: "fermer", english: "to close", group: 1, starter: true },
  { id: 16, infinitive: "changer", english: "to change", group: 1, starter: false },
  { id: 17, infinitive: "jouer", english: "to play", group: 1, starter: true },
  { id: 18, infinitive: "laisser", english: "to leave/let", group: 1, starter: false },
  { id: 19, infinitive: "manger", english: "to eat", group: 1, starter: true },
  { id: 20, infinitive: "marcher", english: "to walk", group: 1, starter: true },
  { id: 21, infinitive: "nager", english: "to swim", group: 1, starter: false },
  { id: 22, infinitive: "parler", english: "to speak", group: 1, starter: true },
  { id: 23, infinitive: "payer", english: "to pay", group: 1, starter: true },
  { id: 24, infinitive: "penser", english: "to think", group: 1, starter: false },
  { id: 25, infinitive: "porter", english: "to carry/wear", group: 1, starter: false },
  { id: 26, infinitive: "préférer", english: "to prefer", group: 1, starter: false },
  { id: 27, infinitive: "regarder", english: "to watch/look at", group: 1, starter: true },
  { id: 28, infinitive: "rester", english: "to stay", group: 1, starter: true },
  { id: 29, infinitive: "travailler", english: "to work", group: 1, starter: true },
  { id: 30, infinitive: "trouver", english: "to find", group: 1, starter: false },
  { id: 31, infinitive: "utiliser", english: "to use", group: 1, starter: false },
  { id: 32, infinitive: "voyager", english: "to travel", group: 1, starter: false },
  
  // Group 2 (-ir verbs with -iss- conjugation)
  { id: 33, infinitive: "choisir", english: "to choose", group: 2, starter: false },
  { id: 34, infinitive: "finir", english: "to finish", group: 2, starter: true },
  
  // Group 3 (irregular verbs)
  { id: 35, infinitive: "aller", english: "to go", group: 3, starter: true },
  { id: 36, infinitive: "apprendre", english: "to learn", group: 3, starter: true },
  { id: 37, infinitive: "attendre", english: "to wait", group: 3, starter: true },
  { id: 38, infinitive: "avoir", english: "to have", group: 3, starter: true },
  { id: 39, infinitive: "boire", english: "to drink", group: 3, starter: false },
  { id: 40, infinitive: "comprendre", english: "to understand", group: 3, starter: true },
  { id: 41, infinitive: "connaître", english: "to know (people/places)", group: 3, starter: false },
  { id: 42, infinitive: "courir", english: "to run", group: 3, starter: false },
  { id: 43, infinitive: "devenir", english: "to become", group: 3, starter: false },
  { id: 44, infinitive: "dire", english: "to say/tell", group: 3, starter: false },
  { id: 45, infinitive: "dormir", english: "to sleep", group: 3, starter: false },
  { id: 46, infinitive: "écrire", english: "to write", group: 3, starter: false },
  { id: 47, infinitive: "entendre", english: "to hear", group: 3, starter: false },
  { id: 48, infinitive: "être", english: "to be", group: 3, starter: true },
  { id: 49, infinitive: "faire", english: "to do/make", group: 3, starter: true },
  { id: 50, infinitive: "lire", english: "to read", group: 3, starter: false },
  { id: 51, infinitive: "mettre", english: "to put", group: 3, starter: false },
  { id: 52, infinitive: "ouvrir", english: "to open", group: 3, starter: true },
  { id: 53, infinitive: "pouvoir", english: "to be able to/can", group: 3, starter: true },
  { id: 54, infinitive: "prendre", english: "to take", group: 3, starter: true },
  { id: 55, infinitive: "savoir", english: "to know (facts/how)", group: 3, starter: false },
  { id: 56, infinitive: "sentir", english: "to feel/smell", group: 3, starter: false },
  { id: 57, infinitive: "sortir", english: "to go out", group: 3, starter: false },
  { id: 58, infinitive: "vendre", english: "to sell", group: 3, starter: false },
  { id: 59, infinitive: "venir", english: "to come", group: 3, starter: true },
  { id: 60, infinitive: "vivre", english: "to live", group: 3, starter: false },
  { id: 61, infinitive: "voir", english: "to see", group: 3, starter: true },
  { id: 62, infinitive: "vouloir", english: "to want", group: 3, starter: true },
]

export function getVerbById(id: number) {
  return verbs.find(v => v.id === id)
}

export function getStarterVerbs() {
  return verbs.filter(v => v.starter)
}

export function getVerbGroupLabel(group: number): string {
  switch (group) {
    case 1: return "-er"
    case 2: return "-ir"
    case 3: return "irregular"
    default: return ""
  }
}
