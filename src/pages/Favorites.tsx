import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { useFavorites } from "@/hooks/useFavorites";

const Favorites = () => {
  const navigate = useNavigate();
  const { getFavoriteIds } = useFavorites();

  const favoriteIds = getFavoriteIds();
  const favoriteProperties = properties.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary text-secondary-foreground"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display text-xl font-semibold text-foreground">
            Favoritos
          </h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {favoriteProperties.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              <span className="font-semibold text-foreground">
                {favoriteProperties.length}
              </span>{" "}
              {favoriteProperties.length === 1 ? "imóvel salvo" : "imóveis salvos"}
            </p>
            <div className="space-y-4">
              {favoriteProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-secondary mb-4">
              <Heart size={40} className="text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Salve os imóveis que você mais gostou clicando no coração ❤️
            </p>
            <button onClick={() => navigate("/buscar")} className="btn-primary">
              Explorar Imóveis
            </button>
          </motion.div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Favorites;

