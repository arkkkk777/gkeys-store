// demo.tsx

import { GameItemCard } from "@/components/ui/game-item-card";

const gameItems = [
  {
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    isBestSeller: true,
    isNew: false,
    title: "Cyberpunk 2077",
    price: 29.99,
    originalPrice: 59.99,
    platform: "Steam, PC",
    genre: "RPG, Action",
    releaseDate: "2020-12-10",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
    isBestSeller: false,
    isNew: true,
    title: "Elden Ring",
    price: 49.99,
    originalPrice: 59.99,
    platform: "Steam, PC, PlayStation, Xbox",
    genre: "Action, RPG",
    releaseDate: "2022-02-25",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    isBestSeller: true,
    isNew: false,
    title: "Red Dead Redemption 2",
    price: 39.99,
    originalPrice: 59.99,
    platform: "Steam, PC",
    genre: "Action, Adventure",
    releaseDate: "2019-11-05",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=800&h=600&fit=crop",
    isBestSeller: true,
    isNew: false,
    title: "Grand Theft Auto V",
    price: 19.99,
    originalPrice: 29.99,
    platform: "Steam, PC",
    genre: "Action, Adventure",
    releaseDate: "2015-04-14",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=600&fit=crop",
    isBestSeller: false,
    isNew: false,
    title: "The Witcher 3: Wild Hunt",
    price: 19.99,
    originalPrice: 39.99,
    platform: "Steam, PC, GOG",
    genre: "RPG, Action",
    releaseDate: "2015-05-19",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop",
    isBestSeller: false,
    isNew: true,
    title: "Hogwarts Legacy",
    price: 54.99,
            originalPrice: undefined,
    platform: "Steam, PC, PlayStation, Xbox",
    genre: "RPG, Adventure",
    releaseDate: "2023-02-10",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    isBestSeller: true,
    isNew: false,
    title: "Call of Duty: Modern Warfare III",
    price: 59.99,
    originalPrice: 69.99,
    platform: "Steam, PC, Battle.net",
    genre: "FPS, Action",
    releaseDate: "2023-11-10",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    isBestSeller: false,
    isNew: true,
    title: "Baldur's Gate 3",
    price: 49.99,
            originalPrice: undefined,
    platform: "Steam, PC",
    genre: "RPG, Strategy",
    releaseDate: "2023-08-03",
  },
];

export default function GameItemCardDemo() {
  const handleAddItem = (gameTitle: string) => {
    // In a real app, you'd add this to a cart state
    console.log(`Added ${gameTitle} to cart!`);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-background">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {gameItems.map((item) => (
          <GameItemCard
            key={item.title}
            imageUrl={item.imageUrl}
            isBestSeller={item.isBestSeller}
            isNew={item.isNew}
            title={item.title}
            price={item.price}
            originalPrice={item.originalPrice}
            platform={item.platform}
            genre={item.genre}
            releaseDate={item.releaseDate}
            onAdd={() => handleAddItem(item.title)}
          />
        ))}
      </div>
    </div>
  );
}
