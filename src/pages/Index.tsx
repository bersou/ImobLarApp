import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import QuickStats from "@/components/QuickStats";
import FeaturedSection from "@/components/FeaturedSection";
import PropertyCard from "@/components/PropertyCard";
import BottomNavigation from "@/components/BottomNavigation";
import { properties } from "@/data/properties";
import { ArrowRight, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const navigate = useNavigate();

  // Filter properties based on search query and category
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Category filter
      const matchesCategory = selectedCategory === "todos" || property.type === selectedCategory;

      // Search filter (title, city, neighborhood)
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        property.title.toLowerCase().includes(query) ||
        property.address.city.toLowerCase().includes(query) ||
        property.address.neighborhood.toLowerCase().includes(query) ||
        property.type.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredProperties = filteredProperties.filter(p => p.isPremium).slice(0, 3);
  const recentProperties = filteredProperties.filter(p => !p.isPremium).slice(0, 4);
  const hasResults = filteredProperties.length > 0;
  const isSearching = searchQuery.trim().length > 0 || selectedCategory !== "todos";

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4">
        <Header />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onFilterClick={() => navigate("/buscar")}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-5"
        >
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </motion.div>

        <QuickStats />

        {/* No results message */}
        <AnimatePresence mode="wait">
          {!hasResults && isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <SearchX size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Nenhum imóvel encontrado
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Tente buscar por outro termo ou selecione outra categoria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("todos");
                }}
                className="mt-4 text-sm font-medium text-primary hover:underline"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Section - only show if not searching or has results */}
        {hasResults && !isSearching && <FeaturedSection />}

        {/* Search Results or Recent Properties */}
        {hasResults && (
          <section className="py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {isSearching ? `Resultados (${filteredProperties.length})` : "Adicionados Recentemente"}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {isSearching
                    ? `Imóveis encontrados para "${searchQuery || selectedCategory}"`
                    : "Novos imóveis no mercado"
                  }
                </p>
              </div>
              {!isSearching && (
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => navigate("/buscar")}
                  className="flex items-center gap-1 text-sm font-medium text-primary"
                >
                  Ver todos
                  <ArrowRight size={16} />
                </motion.button>
              )}
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {(isSearching ? [...featuredProperties, ...recentProperties] : recentProperties).map((property, index) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PropertyCard property={property} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative overflow-hidden rounded-3xl p-6 mb-6"
          style={{ background: "var(--gradient-primary)" }}
        >
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-accent text-accent-foreground">
              Exclusivo
            </span>
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
              Quer vender ou alugar seu imóvel?
            </h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Conte com nossos especialistas para encontrar o melhor negócio.
            </p>
            <button
              onClick={() => window.open("https://wa.me/5551999999999?text=Olá! Gostaria de falar com um corretor sobre imóveis.", "_blank")}
              className="btn-gold"
            >
              Fale com um Corretor
            </button>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute right-16 -top-8 w-24 h-24 rounded-full bg-accent/30 blur-2xl" />
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
