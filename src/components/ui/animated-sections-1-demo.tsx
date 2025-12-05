// demo.tsx

import AnimatedSections from "@/components/ui/animated-sections-1";

export default function AnimatedSectionsDemo() {
  const gameSections = [
    {
      text: "Cyberpunk 2077",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop"
    },
    {
      text: "Elden Ring",
      img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop"
    },
    {
      text: "Red Dead Redemption 2",
      img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&fit=crop"
    },
    {
      text: "The Witcher 3: Wild Hunt",
      img: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=1920&h=1080&fit=crop"
    },
    {
      text: "Grand Theft Auto V",
      img: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=1920&h=1080&fit=crop"
    }
  ];

  return (
    <div className="h-screen w-screen">
      <AnimatedSections sections={gameSections} />
    </div>
  );
}
