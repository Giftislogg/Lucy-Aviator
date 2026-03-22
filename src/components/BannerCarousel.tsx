import { useRef, useEffect } from "react";
import aviatorGame from "@/assets/aviator-betting-game.jpg";
import aviatorPromo from "@/assets/aviator-how-to-play.webp";
import freeData from "@/assets/Aviator-Data-Free_Blog.png";

const bannerImages = [
  {
    id: 1,
    url: aviatorGame,
    alt: "Aviator Game"
  },
  {
    id: 2,
    url: aviatorPromo,
    alt: "Aviator Promo"
  },
  {
    id: 3,
    url: freeData,
    alt: "Free Data"
  }
];

export const BannerCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: scrollContainer.clientWidth, behavior: 'smooth' });
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {bannerImages.map((banner) => (
          <div
            key={banner.id}
            className="flex-shrink-0 w-64 h-32 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <img
              src={banner.url}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};