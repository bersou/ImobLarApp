import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import PropertyCard from "@/components/PropertyCard";
import BottomNavigation from "@/components/BottomNavigation";
import { properties, Property } from "@/data/properties";
import { Slider } from "@/components/ui/slider";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [statusFilter, setStatusFilter] = useState<"todos" | "venda" | "aluguel">("todos");
  const [bedroomFilter, setBedroomFilter] = useState<number | null>(null);
  const [parkingFilter, setParkingFilter] = useState<number | null>(null);
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 1000]);

  const maxPrice = useMemo(() => {
    return Math.max(...properties.map(p => p.price));
  }, []);

  const maxArea = useMemo(() => {
    return Math.max(...properties.map(p => p.features.area));
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Category filter
      if (selectedCategory !== "todos" && property.type !== selectedCategory) {
        return false;
      }

      // Status filter
      if (statusFilter !== "todos" && property.status !== statusFilter) {
        return false;
      }

      // Price filter
      if (property.price < priceRange[0] || property.price > priceRange[1]) {
        return false;
      }

      // Bedroom filter
      if (bedroomFilter !== null) {
        if (bedroomFilter === 4 && property.features.bedrooms < 4) {
          return false;
        } else if (bedroomFilter !== 4 && property.features.bedrooms !== bedroomFilter) {
          return false;
        }
      }

      // Parking filter
      if (parkingFilter !== null) {
        if (parkingFilter === 3 && property.features.parkingSpaces < 3) {
          return false;
        } else if (parkingFilter !== 3 && property.features.parkingSpaces !== parkingFilter) {
          return false;
        }
      }

      // Area filter
      if (property.features.area < areaRange[0] || property.features.area > areaRange[1]) {
        return false;
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          property.title.toLowerCase().includes(query) ||
          property.address.neighborhood.toLowerCase().includes(query) ||
          property.address.city.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, statusFilter, priceRange, bedroomFilter, parkingFilter, areaRange]);

  const clearFilters = () => {
    setPriceRange([0, 5000000]);
    setStatusFilter("todos");
    setBedroomFilter(null);
    setParkingFilter(null);
    setAreaRange([0, 1000]);
    setSelectedCategory("todos");
  };

  const hasActiveFilters =
    priceRange[0] > 0 ||
    priceRange[1] < 5000000 ||
    statusFilter !== "todos" ||
    bedroomFilter !== null ||
    parkingFilter !== null ||
    areaRange[0] > 0 ||
    areaRange[1] < 1000 ||
    selectedCategory !== "todos";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary text-secondary-foreground"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-display text-xl font-semibold text-foreground">
              Buscar Imóveis
            </h1>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onFilterClick={() => setShowFilters(true)}
          />

          <div className="mt-4">
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filteredProperties.length}
            </span>{" "}
            {filteredProperties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
          </p>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm font-medium text-destructive"
              >
                <RotateCcw size={14} />
                Limpar
              </button>
            )}
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 text-sm font-medium text-primary"
            >
              <SlidersHorizontal size={16} />
              Filtros
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-secondary mb-4">
              <SlidersHorizontal size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-4">
              Tente ajustar os filtros ou buscar por outras palavras-chave
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Limpar Filtros
            </button>
          </motion.div>
        )}
      </div>

      {/* Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Filtros
                </h2>
                <div className="flex items-center gap-2">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-destructive/10 text-destructive"
                    >
                      Limpar
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Status Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Tipo de Negócio
                </h3>
                <div className="flex gap-2">
                  {(["todos", "venda", "aluguel"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${statusFilter === status
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                        }`}
                    >
                      {status === "todos"
                        ? "Todos"
                        : status === "venda"
                          ? "Venda"
                          : "Aluguel"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Faixa de Preço
                </h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    max={maxPrice}
                    min={0}
                    step={50000}
                    className="mb-4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Mínimo
                    </label>
                    <div className="px-4 py-3 rounded-xl bg-secondary text-foreground text-sm">
                      R$ {priceRange[0].toLocaleString("pt-BR")}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Máximo
                    </label>
                    <div className="px-4 py-3 rounded-xl bg-secondary text-foreground text-sm">
                      R$ {priceRange[1].toLocaleString("pt-BR")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bedrooms Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Quartos
                </h3>
                <div className="flex gap-2">
                  {[null, 1, 2, 3, 4].map((num) => (
                    <button
                      key={num ?? "all"}
                      onClick={() => setBedroomFilter(num)}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${bedroomFilter === num
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                        }`}
                    >
                      {num === null ? "Todos" : num === 4 ? "4+" : num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parking Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Vagas de Garagem
                </h3>
                <div className="flex gap-2">
                  {[null, 1, 2, 3].map((num) => (
                    <button
                      key={num ?? "all"}
                      onClick={() => setParkingFilter(num)}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${parkingFilter === num
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                        }`}
                    >
                      {num === null ? "Todas" : num === 3 ? "3+" : num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Área (m²)
                </h3>
                <div className="px-2">
                  <Slider
                    value={areaRange}
                    onValueChange={(value) => setAreaRange(value as [number, number])}
                    max={maxArea}
                    min={0}
                    step={10}
                    className="mb-4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Mínimo
                    </label>
                    <div className="px-4 py-3 rounded-xl bg-secondary text-foreground text-sm">
                      {areaRange[0]} m²
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Máximo
                    </label>
                    <div className="px-4 py-3 rounded-xl bg-secondary text-foreground text-sm">
                      {areaRange[1]} m²
                    </div>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full btn-primary py-4 text-base"
              >
                Ver {filteredProperties.length} {filteredProperties.length === 1 ? "Imóvel" : "Imóveis"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNavigation />
    </div>
  );
};

export default Search;

