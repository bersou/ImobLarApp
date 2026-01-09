import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  Bed,
  Bath,
  Car,
  Maximize,
  Ruler,
  Check,
  Phone,
  MessageCircle,
} from "lucide-react";
import { getPropertyById, formatPrice, getPropertyTypeLabel } from "@/data/properties";
import ImageGallery from "@/components/ImageGallery";
import AgentCard from "@/components/AgentCard";
import PropertyMap from "@/components/PropertyMap";
import BottomNavigation from "@/components/BottomNavigation";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();

  const property = getPropertyById(id || "");

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Imóvel não encontrado</p>
      </div>
    );
  }

  const isRent = property.status === "aluguel";
  const favorited = isFavorite(property.id);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá ${property.agent.name}! Tenho interesse no imóvel: ${property.title}. Podemos conversar?`
    );
    window.open(`https://wa.me/${property.agent.whatsapp}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.open(`tel:${property.agent.phone.replace(/\D/g, "")}`, "_self");
  };

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Confira este imóvel: ${property.title} - ${formatPrice(property.price, isRent)}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copiado!",
          description: "O link do imóvel foi copiado para a área de transferência.",
        });
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm text-foreground"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm text-foreground"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={() => toggleFavorite(property.id)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm text-foreground"
          >
            <Heart
              size={18}
              className={favorited ? "fill-destructive text-destructive" : ""}
            />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={property.images} title={property.title} />

      {/* Content */}
      <div className="px-4 py-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${isRent
              ? "bg-navy-light text-primary-foreground"
              : "bg-accent text-accent-foreground"
              }`}
          >
            {isRent ? "Aluguel" : "Venda"}
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
            {getPropertyTypeLabel(property.type)}
          </span>
          {property.isPremium && <span className="badge-premium">⭐ Premium</span>}
        </div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <span className="price-tag text-3xl">
            {formatPrice(property.price, isRent)}
          </span>
          {property.pricePerMeter && (
            <span className="block text-sm text-muted-foreground mt-1">
              R$ {property.pricePerMeter.toLocaleString("pt-BR")}/m²
            </span>
          )}
        </motion.div>

        {/* Title */}
        <h1 className="font-display text-2xl font-bold text-foreground mb-3">
          {property.title}
        </h1>

        {/* Location */}
        <div className="location-badge mb-6">
          <MapPin size={16} className="text-accent" />
          <span>
            {property.address.street}, {property.address.neighborhood} -{" "}
            {property.address.city}/{property.address.state}
          </span>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/20">
              <Bed size={20} className="text-accent" />
            </div>
            <div>
              <span className="block text-lg font-bold text-foreground">
                {property.features.bedrooms}
              </span>
              <span className="text-xs text-muted-foreground">Quartos</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/20">
              <Bath size={20} className="text-accent" />
            </div>
            <div>
              <span className="block text-lg font-bold text-foreground">
                {property.features.bathrooms}
              </span>
              <span className="text-xs text-muted-foreground">Banheiros</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/20">
              <Car size={20} className="text-accent" />
            </div>
            <div>
              <span className="block text-lg font-bold text-foreground">
                {property.features.parkingSpaces}
              </span>
              <span className="text-xs text-muted-foreground">Vagas</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/20">
              <Maximize size={20} className="text-accent" />
            </div>
            <div>
              <span className="block text-lg font-bold text-foreground">
                {property.features.area}m²
              </span>
              <span className="text-xs text-muted-foreground">Área Útil</span>
            </div>
          </div>
        </motion.div>

        {/* Suites & Total Area */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bed size={16} />
            <span>{property.features.suites} suítes</span>
          </div>
          {property.features.totalArea && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Ruler size={16} />
              <span>{property.features.totalArea}m² total</span>
            </div>
          )}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Descrição
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {property.description}
          </p>
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Comodidades
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {property.amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50"
              >
                <Check size={16} className="text-accent flex-shrink-0" />
                <span className="text-sm text-foreground">{amenity}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Location Map */}
        <div className="mb-6">
          <PropertyMap address={property.address} />
        </div>

        {/* Agent */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Corretor Responsável
          </h2>
          <AgentCard agent={property.agent} />
        </motion.div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 z-30 px-4 py-3 bg-card/95 backdrop-blur-xl border-t border-border">
        <div className="flex gap-3">
          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-secondary text-secondary-foreground font-semibold transition-colors hover:bg-secondary/80"
          >
            <Phone size={20} />
            Ligar
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 text-white font-semibold transition-opacity hover:opacity-90"
          >
            <MessageCircle size={20} />
            WhatsApp
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PropertyDetail;
