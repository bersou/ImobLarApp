import { Heart, MapPin, Bed, Bath, Car, Maximize } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Property, formatPrice, getPropertyTypeLabel } from "@/data/properties";
import { useFavorites } from "@/hooks/useFavorites";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isRent = property.status === "aluguel";
  const favorited = isFavorite(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="property-card cursor-pointer"
      onClick={() => navigate(`/imovel/${property.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="property-image w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isPremium && (
            <span className="badge-premium">
              ⭐ Premium
            </span>
          )}
          {property.isNew && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
              Novo
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-all duration-200 hover:scale-110"
        >
          <Heart
            size={18}
            className={`transition-colors ${favorited ? "fill-destructive text-destructive" : "text-foreground"
              }`}
          />
        </button>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${isRent
                ? "bg-navy-light text-primary-foreground"
                : "bg-accent text-accent-foreground"
              }`}
          >
            {isRent ? "Aluguel" : "Venda"}
          </span>
        </div>

        {/* Type Label */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-card/80 backdrop-blur-sm text-foreground">
            {getPropertyTypeLabel(property.type)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-2">
          <span className="price-tag">
            {formatPrice(property.price, isRent)}
          </span>
          {property.pricePerMeter && (
            <span className="ml-2 text-xs text-muted-foreground">
              R$ {property.pricePerMeter.toLocaleString("pt-BR")}/m²
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-semibold text-foreground mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
          <MapPin size={14} className="text-accent flex-shrink-0" />
          <span className="text-sm truncate">
            {property.address.neighborhood}, {property.address.city}
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 pt-3 border-t border-border">
          {property.features.bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground font-medium">
                {property.features.bedrooms}
              </span>
            </div>
          )}
          {property.features.bathrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bath size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground font-medium">
                {property.features.bathrooms}
              </span>
            </div>
          )}
          {property.features.parkingSpaces > 0 && (
            <div className="flex items-center gap-1.5">
              <Car size={14} className="text-muted-foreground" />
              <span className="text-sm text-foreground font-medium">
                {property.features.parkingSpaces}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 ml-auto">
            <Maximize size={14} className="text-muted-foreground" />
            <span className="text-sm text-foreground font-medium">
              {property.features.area}m²
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;

