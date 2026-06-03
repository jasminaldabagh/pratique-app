// Sentence starter placeholders for the textarea
export const sentenceStarters = [
  "Il y a…",
  "Ce matin…",
  "Je vois…",
  "Dans cette image…",
  "On peut voir…",
  "Aujourd'hui…",
  "Je pense que…",
  "Il fait…",
  "C'est…",
  "Nous allons…",
]

export function getRandomStarter(): string {
  return sentenceStarters[Math.floor(Math.random() * sentenceStarters.length)]
}
