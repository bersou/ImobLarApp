import { Phone, MessageCircle, Star, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Agent } from "@/data/properties";

interface AgentCardProps {
  agent: Agent;
  compact?: boolean;
}

const AgentCard = ({ agent, compact = false }: AgentCardProps) => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Olá! Vi seu anúncio no app e gostaria de mais informações sobre os imóveis disponíveis."
    );
    window.open(`https://wa.me/${agent.whatsapp}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.open(`tel:${agent.phone.replace(/\D/g, "")}`, "_self");
  };

  const handleEmail = () => {
    window.open(`mailto:${agent.email}`, "_self");
  };

  if (compact) {
    return (
      <div className="agent-card">
        <img
          src={agent.photo}
          alt={agent.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{agent.name}</h4>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star size={14} className="text-accent fill-accent" />
            <span>{agent.rating}</span>
            <span className="mx-1">•</span>
            <span>CRECI {agent.creci}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCall}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground"
          >
            <Phone size={18} />
          </button>
          <button
            onClick={handleWhatsApp}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white"
          >
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-3xl p-6 shadow-elegant"
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={agent.photo}
          alt={agent.name}
          className="w-20 h-20 rounded-2xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {agent.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            CRECI: {agent.creci}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-accent fill-accent" />
              <span className="font-semibold text-foreground">{agent.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">
              {agent.totalSales} vendas
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {agent.specialties.map((specialty) => (
          <span key={specialty} className="feature-pill">
            {specialty}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleCall}
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          <Phone size={20} />
          <span className="text-xs font-medium">Ligar</span>
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-green-500 text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle size={20} />
          <span className="text-xs font-medium">WhatsApp</span>
        </button>
        <button
          onClick={handleEmail}
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
        >
          <Mail size={20} />
          <span className="text-xs font-medium">E-mail</span>
        </button>
      </div>
    </motion.div>
  );
};

export default AgentCard;
