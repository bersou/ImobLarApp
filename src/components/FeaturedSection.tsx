import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { properties } from "@/data/properties";
import PropertyCard from "./PropertyCard";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const featuredProperties = properties.filter((p) => p.isPremium).slice(0, 3);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Imóveis em Destaque
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Seleção especial para você
          </p>
        </div>
        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => navigate("/buscar")}
          className="flex items-center gap-1 text-sm font-medium text-primary"
        >
          Ver todos
          <ArrowRight size={16} />
        </motion.button>
      </div>

      <div className="space-y-4">
        {featuredProperties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
