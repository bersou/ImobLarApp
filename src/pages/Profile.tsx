import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  User,
  Heart,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
  FileText,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { icon: Heart, label: "Meus Favoritos", path: "/favoritos" },
  { icon: Bell, label: "Notificações", path: null },
  { icon: Settings, label: "Configurações", path: null },
  { icon: Shield, label: "Privacidade", path: null },
  { icon: FileText, label: "Termos de Uso", path: null },
  { icon: HelpCircle, label: "Ajuda", path: null },
];

const Profile = () => {
  const navigate = useNavigate();
  const { getFavoriteCount } = useFavorites();
  const { toast } = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const favoriteCount = getFavoriteCount();

  const handleMenuClick = (path: string | null, label: string) => {
    if (path) {
      navigate(path);
    } else {
      toast({
        title: "Em breve!",
        description: `A funcionalidade "${label}" estará disponível em breve.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative bg-gradient-to-b from-primary to-navy-light pt-4 pb-20 px-4">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 text-primary-foreground"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-display text-xl font-semibold text-primary-foreground">
            Meu Perfil
          </h1>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-4 right-4 -bottom-16 bg-card rounded-3xl p-6 shadow-elegant-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center">
              <User size={32} className="text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Visitante
              </h2>
              <p className="text-sm text-muted-foreground">
                Faça login para salvar seus favoritos
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowLoginModal(true)}
            className="w-full mt-4 btn-gold py-3"
          >
            Entrar ou Cadastrar
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-4 pt-24">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="text-center p-4 rounded-2xl bg-secondary">
            <span className="block text-2xl font-bold text-foreground">0</span>
            <span className="text-xs text-muted-foreground">Visitas</span>
          </div>
          <div className="text-center p-4 rounded-2xl bg-secondary">
            <span className="block text-2xl font-bold text-foreground">{favoriteCount}</span>
            <span className="text-xs text-muted-foreground">Favoritos</span>
          </div>
          <div className="text-center p-4 rounded-2xl bg-secondary">
            <span className="block text-2xl font-bold text-foreground">2</span>
            <span className="text-xs text-muted-foreground">Mensagens</span>
          </div>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-3xl overflow-hidden shadow-elegant"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.path, item.label)}
                className={`w-full flex items-center gap-4 p-4 transition-colors hover:bg-secondary ${index !== menuItems.length - 1 ? "border-b border-border" : ""
                  }`}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary">
                  <Icon size={20} className="text-muted-foreground" />
                </div>
                <span className="flex-1 text-left font-medium text-foreground">
                  {item.label}
                </span>
                {item.label === "Meus Favoritos" && favoriteCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-accent text-accent-foreground">
                    {favoriteCount}
                  </span>
                )}
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            );
          })}
        </motion.div>

        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => {
            toast({
              title: "Sessão encerrada",
              description: "Você saiu da sua conta.",
            });
          }}
          className="w-full flex items-center justify-center gap-2 mt-6 p-4 rounded-2xl bg-destructive/10 text-destructive font-medium"
        >
          <LogOut size={20} />
          Sair da Conta
        </motion.button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Versão 1.0.0
        </p>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl p-6 w-full max-w-sm shadow-elegant-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Entrar
                </h2>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">
                    Senha
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setShowLoginModal(false);
                  toast({
                    title: "Em breve!",
                    description: "O sistema de login estará disponível em breve.",
                  });
                }}
                className="w-full btn-primary py-3 mt-6"
              >
                Entrar
              </button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Não tem conta?{" "}
                <button className="text-primary font-medium">
                  Criar conta
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNavigation />
    </div>
  );
};

export default Profile;

