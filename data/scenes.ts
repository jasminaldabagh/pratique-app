export interface Scene {
  id: string
  image: string
  label: string
}

export const scenes: Scene[] = [
  { id: "market", image: "/scenes/market.jpg", label: "Au marché" },
  { id: "cafe", image: "/scenes/cafe.jpg", label: "Au café" },
  { id: "street", image: "/scenes/street.jpg", label: "Dans la rue" },
  { id: "park", image: "/scenes/park.jpg", label: "Au parc" },
  { id: "kitchen", image: "/scenes/kitchen.jpg", label: "Dans la cuisine" },
  { id: "restaurant", image: "/scenes/restaurant.jpg", label: "Au restaurant" },
  { id: "train", image: "/scenes/train.jpg", label: "Dans le train" },
  { id: "beach", image: "/scenes/beach.jpg", label: "À la plage" },
]

export function getSceneById(id: string) {
  return scenes.find(s => s.id === id)
}

export function getRandomScene(excludeId?: string): Scene {
  const available = excludeId 
    ? scenes.filter(s => s.id !== excludeId)
    : scenes
  return available[Math.floor(Math.random() * available.length)]
}
