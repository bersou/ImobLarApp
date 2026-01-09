import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import { agents } from "@/data/properties";

interface Conversation {
  id: string;
  agent: typeof agents[0];
  lastMessage: string;
  time: string;
  unread: number;
}

const conversations: Conversation[] = [
  {
    id: "1",
    agent: agents[0],
    lastMessage: "Olá! O apartamento ainda está disponível para visita amanhã às 14h?",
    time: "14:32",
    unread: 2,
  },
  {
    id: "2",
    agent: agents[1],
    lastMessage: "Claro! Posso agendar para você. Qual o melhor horário?",
    time: "Ontem",
    unread: 0,
  },
];

const Messages = () => {
  const navigate = useNavigate();

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
              Mensagens
            </h1>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Buscar conversa..."
              className="w-full px-11 py-3 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {conversations.length > 0 ? (
          <div className="space-y-2">
            {conversations.map((conversation, index) => (
              <motion.button
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card transition-colors hover:bg-secondary"
              >
                <div className="relative">
                  <img
                    src={conversation.agent.photo}
                    alt={conversation.agent.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {conversation.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-accent text-accent-foreground">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {conversation.agent.name}
                    </h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {conversation.time}
                    </span>
                  </div>
                  <p
                    className={`text-sm truncate ${
                      conversation.unread > 0
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {conversation.lastMessage}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-secondary mb-4">
              <MessageCircle size={40} className="text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Nenhuma mensagem
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              Entre em contato com um corretor para iniciar uma conversa
            </p>
            <button onClick={() => navigate("/")} className="btn-primary">
              Ver Imóveis
            </button>
          </motion.div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Messages;
