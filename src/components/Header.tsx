import { Bell, Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  showMenu?: boolean;
  title?: string;
}

const Header = ({ showMenu = true, title }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme, isDark } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const notifications = [
    { id: 1, text: "Novo imóvel na sua região!", time: "Agora" },
    { id: 2, text: "Seu favorito baixou de preço", time: "1h atrás" },
    { id: 3, text: "Corretor respondeu sua mensagem", time: "2h atrás" },
  ];

  const menuItems = [
    { label: "Início", path: "/" },
    { label: "Buscar Imóveis", path: "/buscar" },
    { label: "Favoritos", path: "/favoritos" },
    { label: "Mensagens", path: "/mensagens" },
    { label: "Meu Perfil", path: "/perfil" },
  ];

  return (
    <>
      <header className="flex items-center justify-between py-4">
        {showMenu ? (
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setShowSidebar(true)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <Menu size={22} />
            </button>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Bem-vindo à</p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Élite<span className="text-accent">Lar</span>{" "}
                <span className="text-primary/80 font-semibold">Imóveis</span>
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-6 mr-4">
              <div className="text-center">
                <p className="text-xl font-bold text-primary">2.5K+</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Imóveis</p>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <p className="text-xl font-bold text-accent">98%</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Satisfação</p>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="font-display text-2xl font-bold text-foreground">
            {title}
          </h1>
        )}

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary text-secondary-foreground"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={20} className="text-accent" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={20} className="text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-secondary text-secondary-foreground"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-72 bg-card rounded-2xl shadow-elegant-lg border border-border overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-border">
                    <h3 className="font-semibold text-foreground">Notificações</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <button
                        key={notif.id}
                        className="w-full p-3 text-left hover:bg-secondary/50 transition-colors border-b border-border last:border-0"
                      >
                        <p className="text-sm text-foreground">{notif.text}</p>
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-card z-50 shadow-elegant-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">
                      ÉliteLar <span className="text-accent">Imóveis</span>
                    </h2>
                    <p className="text-xs text-muted-foreground">Seu sonho, nossa missão</p>
                  </div>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setShowSidebar(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl text-foreground font-medium hover:bg-secondary transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-primary to-navy-light">
                  <p className="text-sm text-primary-foreground font-medium mb-2">
                    Quer vender seu imóvel?
                  </p>
                  <button
                    onClick={() => {
                      window.open("https://wa.me/5551999999999?text=Olá! Quero anunciar meu imóvel na ÉliteLar.", "_blank");
                    }}
                    className="btn-gold text-sm py-2 w-full"
                  >
                    Fale Conosco
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

