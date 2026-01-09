import { motion } from "framer-motion";
import { Home, Users, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface StatItem {
  icon: typeof Home;
  value: number;
  suffix: string;
  label: string;
  path: string;
  color: string;
}

const stats: StatItem[] = [
  { icon: Home, value: 2500, suffix: "+", label: "Imóveis", path: "/buscar", color: "text-primary" },
  { icon: Users, value: 150, suffix: "+", label: "Corretores", path: "/buscar", color: "text-emerald-500" },
  { icon: TrendingUp, value: 98, suffix: "%", label: "Satisfação", path: "/", color: "text-accent" },
  { icon: Award, value: 15, suffix: "", label: "Anos", path: "/", color: "text-rose-500" },
];

// Animated counter hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

const StatCard = ({ stat, index }: { stat: StatItem; index: number }) => {
  const Icon = stat.icon;
  const navigate = useNavigate();
  const animatedValue = useCounter(stat.value, 2000 + index * 300);

  const formatValue = (val: number) => {
    if (val >= 1000) {
      return (val / 1000).toFixed(1).replace(".0", "") + "K";
    }
    return val.toString();
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{
        scale: 1.08,
        y: -4,
        transition: { type: "spring", stiffness: 400 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(stat.path)}
      className="stat-card cursor-pointer group relative overflow-hidden"
    >
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Animated icon container */}
      <motion.div
        className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-accent/20 mb-2"
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: index * 0.5,
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1 + index * 0.3,
            ease: "easeInOut"
          }}
        >
          <Icon size={20} className={`${stat.color} transition-colors`} />
        </motion.div>

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-accent/30"
          animate={{
            scale: [1, 1.4],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 2 + index * 0.5,
            ease: "easeOut"
          }}
        />
      </motion.div>

      {/* Animated counter */}
      <span className={`text-xl font-bold ${stat.color} transition-colors`}>
        {formatValue(animatedValue)}{stat.suffix}
      </span>

      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
        {stat.label}
      </span>
    </motion.button>
  );
};

const QuickStats = () => {
  return (
    <div className="grid grid-cols-4 gap-3 py-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  );
};

export default QuickStats;

