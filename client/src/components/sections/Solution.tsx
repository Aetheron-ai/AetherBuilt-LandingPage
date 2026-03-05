import { motion } from "framer-motion";
import { Network, Cpu, FileText, Crosshair } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Solution() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Network,
      titleKey: 'solution.card1.title',
      descKey: 'solution.card1.desc',
    },
    {
      icon: Cpu,
      titleKey: 'solution.card2.title',
      descKey: 'solution.card2.desc',
    },
    {
      icon: FileText,
      titleKey: 'solution.card3.title',
      descKey: 'solution.card3.desc',
    },
    {
      icon: Crosshair,
      titleKey: 'solution.card4.title',
      descKey: 'solution.card4.desc',
    }
  ] as const;

  return (
    <section id="architecture" className="py-32 relative bg-background">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.03] hidden lg:block pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="font-display text-xs tracking-[0.2em] text-metallic uppercase block mb-4">
            {t('solution.header')}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-zinc-100">
            {t('solution.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-card p-8 rounded-lg group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
                <card.icon className="w-5 h-5 text-zinc-300 stroke-[1.5] relative z-10" />
              </div>
              <h3 className="font-display text-lg text-zinc-100 font-medium mb-3">
                {t(card.titleKey)}
              </h3>
              <p className="text-zinc-500 font-light text-sm leading-relaxed">
                {t(card.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
