import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { ThreeScene } from "./ThreeScene";
import { ArrowRight, ChevronRight } from "lucide-react";

interface SitePlan {
  architecture: {
    pages: Array<{ name: string; route: string; sections: string[] }>;
    sharedComponents: string[];
    theme: {
      primary: string;
      accent: string;
      style: string;
    };
  };
  content: Record<string, any>;
}

function Navbar({ sitePlan }: { sitePlan: SitePlan }) {
  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-6 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-black/40">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.4)] animate-pulse" style={{ backgroundColor: sitePlan.architecture.theme.primary }} />
        <div className="text-sm font-bold tracking-[0.2em] font-mono" style={{ color: sitePlan.architecture.theme.primary }}>
          {sitePlan.architecture.pages[0].name.toUpperCase()} // SYS.01
        </div>
      </div>
      <div className="flex gap-10 items-center">
        {sitePlan.architecture.pages.map((page) => (
          <Link
            key={page.route}
            to={page.route}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <span className="text-[8px] text-white/10 group-hover:text-brand-cyan transition-colors italic">/ {page.name}</span>
          </Link>
        ))}
        <button className="px-5 py-2 border border-white/20 text-[9px] font-bold uppercase tracking-widest hover:border-white transition-colors">
          Connect
        </button>
      </div>
    </nav>
  );
}

function DynamicPage({ page, sitePlan }: { page: any; sitePlan: SitePlan }) {
  const content = sitePlan.content[page.name] || {};

  return (
    <div className="pt-24 min-h-screen">
      {page.sections.map((section: string, idx: number) => {
        const sectionContent = content[section];
        
        if (section === "Hero") {
          return (
            <section key={idx} className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
               {/* Background Technical Decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/5 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-white/5 rounded-full pointer-events-none rotate-45" />

              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10"
              >
                <div className="inline-block px-3 py-1 mb-8 border border-white/20 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
                  Instance: {sitePlan.architecture.theme.style}
                </div>
                <h1 
                  className="text-7xl md:text-[10rem] font-display font-bold tracking-tighter mb-8 max-w-5xl leading-[0.8] italic uppercase"
                >
                  {sectionContent?.title}
                </h1>
                <p 
                  className="text-sm font-light text-white/40 max-w-xl mx-auto mb-16 uppercase tracking-[0.3em] font-mono"
                >
                  {sectionContent?.subtitle}
                </p>
                
                {sectionContent?.threeD && (
                  <div className="w-full max-w-5xl mt-8 border-y border-white/5 py-12 relative">
                    <div className="absolute top-0 left-0 text-[8px] font-mono p-2 text-white/20 uppercase tracking-widest">3D_Renderer: R3F_CORE</div>
                    <ThreeScene type={sectionContent.sceneType} color={sitePlan.architecture.theme.primary} />
                    <div className="absolute bottom-0 right-0 text-[8px] font-mono p-2 text-white/20 uppercase tracking-widest italic">Status: Stable</div>
                  </div>
                )}
              </motion.div>
            </section>
          );
        }

        if (section === "Features") {
          return (
            <section key={idx} className="py-40 px-6 max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-20 border-b border-white/10 pb-8">
                 <div className="w-1 h-8" style={{ backgroundColor: sitePlan.architecture.theme.primary }} />
                 <h2 className="text-3xl font-display font-bold italic uppercase">Capabilities_V2</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {sectionContent?.map((feature: any, i: number) => (
                  <div key={i} className="group relative">
                    <div className="text-[10px] font-mono text-white/20 mb-4 tracking-widest">MODULE: 0{i+1}</div>
                    <h3 className="text-2xl font-bold mb-6 italic tracking-tight uppercase">{feature.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed group-hover:text-white transition-colors">{feature.description}</p>
                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                       <span className="text-[8px] font-bold tracking-widest text-white/20 uppercase font-mono">Verified Connection</span>
                       <ChevronRight className="w-4 h-4 text-white/20 group-hover:translate-x-2 transition-transform group-hover:text-brand-cyan" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (section === "Story") {
           return (
            <section key={idx} className="py-40 px-6 max-w-4xl mx-auto border-y border-white/5">
                <div className="flex flex-col md:flex-row gap-20">
                  <div className="md:w-1/3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20">Chronicle</span>
                    <h2 className="text-4xl font-display font-bold uppercase italic mt-4">The Evolution</h2>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-xl text-white/60 leading-relaxed font-light italic">
                      "{sectionContent?.text}"
                    </p>
                  </div>
                </div>
            </section>
           )
        }

        return null;
      })}
    </div>
  );
}

function Footer({ sitePlan }: { sitePlan: SitePlan }) {
  return (
    <footer className="py-20 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 mt-40 font-mono text-[9px] text-white/20 uppercase tracking-[0.2em]">
       <div className="flex gap-10">
          <span>Nexus_OS_Deployment</span>
          <span>© 2026 {sitePlan.architecture.pages[0].name}</span>
       </div>
       <div className="flex items-center gap-2">
          <span className="w-1 h-1 bg-brand-cyan rounded-full" />
          <span>Authenticated_Node</span>
       </div>
    </footer>
  );
}

export function GeneratedSite({ sitePlan }: { sitePlan: SitePlan }) {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050508] text-white selection:bg-brand-cyan/20 overflow-x-hidden font-sans">
        <Navbar sitePlan={sitePlan} />
        <Routes>
          {sitePlan.architecture.pages.map((page) => (
            <Route
              key={page.route}
              path={page.route}
              element={<DynamicPage page={page} sitePlan={sitePlan} />}
            />
          ))}
        </Routes>
        <Footer sitePlan={sitePlan} />
      </div>
    </BrowserRouter>
  );
}
