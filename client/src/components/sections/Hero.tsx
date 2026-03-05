import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const scrollToContact = () => {
    document.getElementById("deployment")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden scanlines">
      {/* Abstract structural background elements */}
      <div className="absolute top-1/4 left-0 w-[800px] h-[1px] bg-gradient-to-r from-zinc-800 to-transparent -rotate-45 opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[800px] h-[1px] bg-gradient-to-l from-zinc-800 to-transparent -rotate-45 opacity-30 pointer-events-none" />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] border border-white/[0.03] rounded-full" />
        <div className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] border border-white/[0.04] rounded-full" />
        <div className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] border border-white/[0.05] rounded-full bg-white/[0.01] backdrop-blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <Activity className="w-4 h-4 text-metallic animate-pulse" />
            <span className="font-display text-xs tracking-[0.2em] text-metallic uppercase">
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-zinc-100 leading-[1.1] mb-8 whitespace-pre-line"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed mb-12"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <button 
              onClick={scrollToContact}
              className="group relative px-8 py-4 bg-zinc-100 text-zinc-900 font-display text-sm uppercase tracking-widest font-medium rounded hover:bg-white transition-all overflow-hidden flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span>{t('hero.cta.primary')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => document.getElementById("architecture")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 glass text-zinc-300 font-display text-sm uppercase tracking-widest rounded hover:bg-white/10 transition-all border-white/20"
            >
              {t('hero.cta.secondary')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
