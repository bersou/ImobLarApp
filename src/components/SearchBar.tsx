import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
}

const SearchBar = ({ value, onChange, onFilterClick }: SearchBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex items-center gap-3"
    >
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Buscar por bairro, cidade ou tipo..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input pl-12 pr-4"
        />
      </div>
      <button
        onClick={onFilterClick}
        className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-elegant transition-transform hover:scale-105 active:scale-95"
      >
        <SlidersHorizontal size={20} />
      </button>
    </motion.div>
  );
};

export default SearchBar;
