import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Layout, 
  Box, 
  Send, 
  Loader2, 
  ExternalLink, 
  CheckCircle2,
  Cpu,
  Layers,
  Palette,
  Eye,
  ArrowLeft
} from "lucide-react";
import { cn } from "./lib/utils";
import { GeneratedSite } from "./components/GeneratedSite";
import { generateSitePlan as fetchSitePlan } from "./services/aiService";

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

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sitePlan, setSitePlan] = useState<SitePlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const plan = await fetchSitePlan(prompt);
      setSitePlan(plan);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (showPreview && sitePlan) {
    return (
      <div className="relative">
        <button 
          onClick={() => setShowPreview(false)}
          className="fixed bottom-8 right-8 z-[100] flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 font-bold rounded-full shadow-2xl hover:scale-105 transition-transform active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          Exit Preview
        </button>
        <GeneratedSite sitePlan={sitePlan} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 sm:p-10 font-sans selection:bg-brand-cyan/30 overflow-x-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="max-w-7xl mx-auto w-full z-10 flex-1 flex flex-col">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 mb-10 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="w-3 h-3 bg-brand-cyan rounded-full shadow-[0_0_12px_rgba(34,211,238,0.6)] animate-pulse" />
              <h1 className="text-[10px] font-mono tracking-[0.3em] text-brand-cyan uppercase font-bold">
                Nexus v4.2.0 // Node: ACTIVE
              </h1>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight italic text-white"
            >
              ARCHITECT-OS <span className="font-thin text-white/30 not-italic">/ MULTI-PAGE ENGINE</span>
            </motion.h2>
          </div>
          
          <div className="text-left md:text-right font-mono">
            <div className="text-[10px] text-white/30 uppercase tracking-tighter mb-1">System Environment</div>
            <div className="text-sm border-l-2 md:border-l-0 md:border-r-2 border-brand-cyan pr-4 pl-4 md:pl-0">production.nexus.cloud</div>
          </div>
        </header>

        <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Sidebar Area */}
          <section className="md:col-span-3 space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
              <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Layers className="w-3 h-3" />
                Pipeline Stages
              </h3>
              <ul className="space-y-6">
                {[
                  { id: "01", label: "Semantic Input", active: true },
                  { id: "02", label: "AI Blueprinting", active: isGenerating || !!sitePlan },
                  { id: "03", label: "Schema Validation", active: !!sitePlan },
                  { id: "04", label: "3D Rendering", active: !!sitePlan }
                ].map((stage) => (
                  <li key={stage.id} className={cn(
                    "flex items-center gap-4 transition-colors",
                    stage.active ? "text-brand-cyan" : "text-white/20"
                  )}>
                    <div className={cn(
                      "w-8 h-8 border flex items-center justify-center text-[10px] italic transition-colors font-mono",
                      stage.active ? "border-brand-cyan" : "border-white/10"
                    )}>
                      {stage.id}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">{stage.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-sm flex-1 flex flex-col">
              <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Execution Unit</h3>
              <div className="space-y-4 flex-1">
                <div>
                  <div className="text-[9px] text-white/30 uppercase font-mono">Input Buffer</div>
                  <div className="text-xs mt-1 text-white/70 line-clamp-2 italic">{prompt || "WAITING_FOR_DATA..."}</div>
                </div>
                {sitePlan && (
                  <>
                    <div>
                      <div className="text-[9px] text-white/30 uppercase font-mono">Generated Style</div>
                      <div className="text-xs font-mono uppercase text-brand-cyan">{sitePlan.architecture.theme.style}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-white/30 uppercase font-mono">Entity Count</div>
                      <div className="text-xs font-mono text-brand-cyan">{sitePlan.architecture.pages.length} INSTANCES</div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="pt-8">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className={cn(
                    "w-full py-4 bg-brand-cyan text-black font-bold text-xs uppercase tracking-[0.2em] transition-all relative overflow-hidden group",
                    "hover:bg-white active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none"
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isGenerating ? "Processing..." : "Generate Site"}
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Main Visualizer Area */}
          <section className="md:col-span-9 flex flex-col gap-10">
            {/* Input Overlay */}
            {!sitePlan && !isGenerating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 border border-white/10 p-10 flex flex-col items-center justify-center text-center space-y-8 min-h-[400px] relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                   <div className="w-[600px] h-[600px] border border-white/20 rounded-full flex items-center justify-center">
                     <div className="w-[400px] h-[400px] border border-white/20 rounded-full" />
                   </div>
                </div>
                
                <div className="space-y-4 max-w-xl z-10">
                  <h3 className="text-2xl font-bold italic">Ready to Manifest Architecture?</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    Define your digital vision in natural language. Our neural engine will architect a multi-page 3D environment including routing, design systems, and interactive components.
                  </p>
                </div>
                
                <div className="w-full max-w-lg z-10">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-brand-cyan/20 blur opacity-0 group-focus-within:opacity-100 transition" />
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="ENTER_PROMPT: Futuristic dashboard, dark neon aesthetic..."
                      className="w-full bg-black/40 border border-white/20 px-8 py-5 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-cyan/50 text-sm font-mono transition-colors"
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {isGenerating && (
              <div className="bg-white/5 border border-brand-cyan/20 p-20 flex flex-col items-center justify-center text-center space-y-10 min-h-[600px]">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-brand-cyan animate-spin" />
                  <div className="absolute inset-0 blur-xl bg-brand-cyan/30 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-widest text-white uppercase font-mono">Synthesizing Neural Map</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] animate-pulse">Consulting Gemini-2.0-Flash // Building Nodes</p>
                </div>
              </div>
            )}

            {/* Site Plan Visualization */}
            <AnimatePresence>
              {sitePlan && !isGenerating && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid grid-rows-6 gap-8"
                >
                  {/* Top Viewport */}
                  <div className="row-span-4 bg-white/5 border border-white/10 relative overflow-hidden min-h-[450px]">
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <span className="px-3 py-1 bg-black/80 border border-brand-cyan/40 text-brand-cyan text-[10px] font-mono uppercase">
                        Render_Viewport: Site_Preview_01
                      </span>
                      <span className="px-3 py-1 bg-black/80 border border-white/20 text-white/40 text-[10px] font-mono uppercase italic">
                        {sitePlan.architecture.theme.style}
                      </span>
                    </div>

                    {/* Content Preview Simulation */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                       <div className="w-[500px] h-[500px] border border-white/5 rounded-full absolute" />
                       <div className="w-[350px] h-[350px] border border-brand-cyan/10 rounded-full absolute animate-[ping_10s_infinite]" />
                       
                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full p-12 relative z-10">
                          {sitePlan.architecture.pages.map((p, i) => (
                             <motion.div 
                               initial={{ opacity: 0, y: 20 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: i * 0.1 }}
                               key={i} 
                               className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-sm space-y-4 hover:border-brand-cyan/40 transition-colors cursor-default group"
                             >
                                <div className="flex justify-between items-start">
                                  <div className="text-[10px] font-mono text-brand-cyan">0{i+1}</div>
                                  <Eye className="w-4 h-4 text-white/20 group-hover:text-brand-cyan transition-colors" />
                                </div>
                                <h4 className="text-lg font-bold italic tracking-tight">{p.name}_PAGE</h4>
                                <div className="space-y-1">
                                  {p.sections.map((s, si) => (
                                    <div key={si} className="text-[9px] text-white/40 uppercase tracking-widest">{s}</div>
                                  ))}
                                </div>
                             </motion.div>
                          ))}
                       </div>

                       <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2">
                          <button 
                            onClick={() => setShowPreview(true)}
                            className="px-8 py-3 bg-brand-cyan text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95 transition-all"
                          >
                            Launch Full Preview
                          </button>
                       </div>
                    </div>
                    {/* Grid overlay */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  </div>

                  {/* Bottom Panels */}
                  <div className="row-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="terminal-box group">
                      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                        <span className="text-white/40 uppercase tracking-widest font-bold">Metadata_Blueprint.json</span>
                        <div className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                           <span className="text-emerald-400 font-bold uppercase">Ready</span>
                        </div>
                      </div>
                      <pre className="text-brand-cyan/70 leading-relaxed overflow-y-auto max-h-[150px] custom-scrollbar text-[10px]">
                        {JSON.stringify(sitePlan, null, 2)}
                      </pre>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 flex flex-col">
                       <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Design Integration</h3>
                       <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className="bg-black/40 border border-white/5 p-4 rounded-sm flex flex-col justify-between">
                            <span className="text-[9px] text-white/30 uppercase font-mono">Primary Color</span>
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 shadow-[0_0_8px_rgba(34,211,238,0.4)]" style={{ backgroundColor: sitePlan.architecture.theme.primary }} />
                              <span className="text-xs font-mono text-white/60">{sitePlan.architecture.theme.primary}</span>
                            </div>
                          </div>
                          <div className="bg-black/40 border border-white/5 p-4 rounded-sm flex flex-col justify-between">
                            <span className="text-[9px] text-white/30 uppercase font-mono">Accent Tokens</span>
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 shadow-[0_0_8px_rgba(34,211,238,0.4)]" style={{ backgroundColor: sitePlan.architecture.theme.accent }} />
                              <span className="text-xs font-mono text-white/60">{sitePlan.architecture.theme.accent}</span>
                            </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </main>

        {/* Footer Status Bar */}
        <footer className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[9px] text-white/30 tracking-widest uppercase">
          <div className="flex gap-8">
            <span className="flex items-center gap-2">
              <span className="text-brand-cyan">Latency:</span> 12.4ms
            </span>
            <span className="flex items-center gap-2">
              <span className="text-brand-cyan">Model:</span> Gemini-2.0-Flash
            </span>
            <span className="flex items-center gap-2">
              <span className="text-brand-cyan">Uptime:</span> 99.99%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-brand-cyan rounded-full animate-ping" />
              <span className="text-brand-cyan font-bold">System_Optimized</span>
            </div>
            <span className="text-white/10">|</span>
            <span>Ref: 0xNEXUS_ARCH</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

