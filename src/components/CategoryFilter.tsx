import { motion } from "framer-motion";
import { Building2, Home, Building, MapPinned, Briefcase, LayoutGrid } from "lucide-react";

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { id: "todos", label: "Todos", icon: LayoutGrid },
  { id: "apartamento", label: "Apartamentos", icon: Building },
  { id: "casa", label: "Casas", icon: Home },
  { id: "cobertura", label: "Coberturas", icon: Building2 },
  { id: "terreno", label: "Terrenos", icon: MapPinned },
  { id: "comercial", label: "Comercial", icon: Briefcase },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (id: string) => void;
}

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4">
      {categories.map((category, index) => {
        const Icon = category.icon;
        const isSelected = selected === category.id;

        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(category.id)}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${isSelected
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-secondary-foreground hover:bg-secondary border border-border/50 hover:border-primary/30"
              }`}
            style={{
              boxShadow: isSelected
                ? "0 8px 24px -4px hsl(215 60% 25% / 0.3)"
                : "0 2px 8px -2px hsl(215 60% 25% / 0.08)"
            }}
          >
            <Icon size={20} className={isSelected ? "text-accent" : ""} />
            <span className="text-base font-semibold tracking-tight">{category.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;

