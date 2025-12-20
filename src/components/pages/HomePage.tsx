// HPI 1.6-V
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { TrendingUp, Brain, BarChart3, Zap, Upload, LineChart, Target, ChevronDown, ArrowRight, Activity, Layers, PieChart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

// --- Utility Components for "Living" Experience ---

// 1. Intersection Observer Reveal (Mandatory Pattern)
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, threshold = 0.1, delay = '0ms' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      className={`reveal-base ${className || ''}`}
      style={{ transitionDelay: delay } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// 2. Sticky Scroll Progress Tracker (Safe Method)
const ScrollProgressTracker = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-limegreen origin-left z-50 mix-blend-difference"
      style={{ scaleX }}
    />
  );
};

// 3. Noise Texture Overlay (Atmosphere)
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay">
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

// --- Main Page Component ---

export default function HomePage() {
  // Mouse position for interactive gradients
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <div 
      className="min-h-screen bg-primary text-primary-foreground overflow-x-clip selection:bg-limegreen selection:text-primary font-paragraph"
      onMouseMove={handleMouseMove}
    >
      <style>{`
        .reveal-base {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-base.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #000;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #CFFF00;
        }

        /* Text Stroke Utility */
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
        
        /* Gradient Animation */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>

      <ScrollProgressTracker />
      <NoiseOverlay />
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-primary z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-limegreen/10 rounded-full blur-[100px] mix-blend-screen" />
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{
              background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(106, 142, 255, 0.15), transparent 80%)`
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 lg:px-12 flex flex-col h-full justify-between py-12">
          
          {/* Top Bar Info */}
          <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-12">
            <div className="flex gap-4">
              <span className="font-heading text-xs md:text-sm text-limegreen tracking-[0.2em] uppercase">[ SYSTEM ONLINE ]</span>
              <span className="font-heading text-xs md:text-sm text-white/50 tracking-[0.2em] uppercase hidden md:inline-block">[ V.2.0.4 ]</span>
            </div>
            <div className="font-heading text-xs md:text-sm text-white/50 tracking-[0.2em] uppercase">
              [ AI-POWERED FORECASTING ]
            </div>
          </div>

          {/* Main Typography */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatedElement className="mb-4">
              <h1 className="font-heading text-[12vw] leading-[0.85] font-black tracking-tighter text-white mix-blend-difference">
                PREDICT
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-limegreen via-brightblue to-secondary animate-gradient">
                  TOMORROW
                </span>
              </h1>
            </AnimatedElement>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-end">
              <div className="lg:col-span-5">
                <AnimatedElement delay="200ms">
                  <p className="font-paragraph text-xl md:text-2xl text-softgray leading-relaxed max-w-xl">
                    Stop guessing. Start knowing. Leverage advanced AI to transform historical data into precise revenue forecasts and demand predictions.
                  </p>
                </AnimatedElement>
              </div>
              
              <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 justify-end items-start md:items-center">
                <AnimatedElement delay="400ms">
                  <Link to="/dashboard">
                    <Button className="group relative overflow-hidden bg-limegreen text-primary hover:bg-white transition-colors duration-300 rounded-none px-10 py-8 text-lg font-bold tracking-wider">
                      <span className="relative z-10 flex items-center gap-2">
                        LAUNCH DASHBOARD <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </AnimatedElement>
                
                <AnimatedElement delay="500ms">
                  <div className="flex items-center gap-4">
                    <div className="h-px w-12 bg-white/20" />
                    <span className="font-heading text-sm text-white/60 tracking-widest uppercase">
                      SCROLL TO EXPLORE
                    </span>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>

          {/* Bottom Year/Ticker */}
          <div className="mt-20 border-t border-white/10 pt-6 flex justify-between items-end">
            <div className="hidden md:block">
               <span className="font-heading text-9xl font-black text-white/5 leading-none -mb-8 select-none">
                2025
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
               <span className="font-heading text-xs text-limegreen tracking-[0.3em] uppercase">[ REVENUE INTELLIGENCE ]</span>
               <ChevronDown className="w-6 h-6 text-white/40 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* --- MARQUEE SECTION --- */}
      <section className="w-full bg-secondary py-6 overflow-hidden border-y border-white/10">
        <div className="flex whitespace-nowrap">
          <motion.div 
            className="flex gap-12 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-4xl md:text-6xl font-black text-primary font-heading uppercase tracking-tight">
                  DATA DRIVEN DECISIONS
                </span>
                <Zap className="w-8 h-8 md:w-12 md:h-12 text-limegreen fill-limegreen" />
                <span className="text-4xl md:text-6xl font-black text-transparent text-stroke font-heading uppercase tracking-tight">
                  PREDICTIVE ANALYTICS
                </span>
                <div className="w-4 h-4 bg-primary rounded-full" />
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CORE CAPABILITIES (Bento Grid) --- */}
      <section className="w-full bg-primary py-32 relative">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <AnimatedElement>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-4">
                CORE <span className="text-stroke">CAPABILITIES</span>
              </h2>
            </AnimatedElement>
            <AnimatedElement delay="200ms">
              <p className="font-paragraph text-softgray max-w-md text-right">
                [ SYSTEM MODULES ]<br/>
                Our AI engine processes millions of data points to deliver three key strategic advantages.
              </p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(400px,auto)]">
            
            {/* Card 1: Sales Forecasting (Large) */}
            <AnimatedElement className="md:col-span-2 row-span-1 h-full">
              <div className="group relative h-full w-full bg-white/5 border border-white/10 hover:border-limegreen/50 transition-colors duration-500 overflow-hidden p-10 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-secondary rounded-none flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Sales Forecasting</h3>
                  <p className="font-paragraph text-lg text-white/70 max-w-xl">
                    Deploy ARIMA, Prophet, and LSTM networks. Our algorithms analyze historical patterns and seasonal trends to predict future sales with unprecedented accuracy.
                  </p>
                </div>

                <div className="relative z-10 mt-8">
                  <div className="w-full h-32 flex items-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    {[40, 65, 45, 80, 55, 90, 70, 95].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="flex-1 bg-limegreen"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Card 2: Demand Prediction */}
            <AnimatedElement delay="200ms" className="md:col-span-1 h-full">
              <div className="group relative h-full w-full bg-white/5 border border-white/10 hover:border-brightblue/50 transition-colors duration-500 overflow-hidden p-10 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-bl from-brightblue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 bg-brightblue rounded-none flex items-center justify-center mb-8">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">Demand Prediction</h3>
                <p className="font-paragraph text-base text-white/70 mb-8">
                  Anticipate purchasing behavior. Optimize inventory levels to eliminate stockouts and reduce holding costs.
                </p>

                <div className="mt-auto flex justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
                    <div className="absolute inset-0 border-4 border-brightblue rounded-full border-t-transparent animate-spin duration-[3s]" />
                    <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-brightblue">
                      98%
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Card 3: Scenario Analysis */}
            <AnimatedElement delay="300ms" className="md:col-span-1 h-full">
              <div className="group relative h-full w-full bg-white/5 border border-white/10 hover:border-pastelpink/50 transition-colors duration-500 overflow-hidden p-10 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-tr from-pastelpink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 bg-pastelpink rounded-none flex items-center justify-center mb-8">
                  <Activity className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">Scenario Analysis</h3>
                <p className="font-paragraph text-base text-white/70">
                  Simulate the future. Test price changes, promotions, and market shifts before they happen.
                </p>
              </div>
            </AnimatedElement>

            {/* Card 4: Visual Image Anchor */}
            <AnimatedElement delay="400ms" className="md:col-span-2 h-full min-h-[400px]">
              <div className="relative h-full w-full overflow-hidden group">
                <Image 
                  src="https://static.wixstatic.com/media/70d151_896f283522184e66b260ae5b69762613~mv2.png?originWidth=768&originHeight=384"
                  alt="Abstract data visualization showing connected nodes"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 z-10">
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">Visual Intelligence</h3>
                  <p className="font-paragraph text-white/70">Transform raw CSVs into actionable strategic maps.</p>
                </div>
              </div>
            </AnimatedElement>

          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Sticky Stack) --- */}
      <section className="w-full bg-primary py-24 relative">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="mb-24 text-center">
            <span className="font-heading text-sm text-limegreen tracking-[0.3em] uppercase block mb-4">[ PROCESS FLOW ]</span>
            <h2 className="font-heading text-5xl md:text-8xl font-black text-white">
              HOW IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-pastelpink">WORKS</span>
            </h2>
          </div>

          <div className="relative">
            {/* Step 1 */}
            <div className="sticky top-32 mb-24 min-h-[60vh] bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02]">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="p-12 lg:p-20 flex flex-col justify-center">
                  <div className="font-heading text-8xl font-black text-white/5 mb-8">01</div>
                  <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Upload Data</h3>
                  <p className="font-paragraph text-xl text-softgray leading-relaxed mb-8">
                    Import your historical sales datasets directly. We support CSV and Excel formats. Our system instantly validates structure and integrity.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-white/80">
                      <Upload className="w-5 h-5 text-limegreen" /> Drag & Drop Interface
                    </li>
                    <li className="flex items-center gap-3 text-white/80">
                      <Upload className="w-5 h-5 text-limegreen" /> Auto-Validation
                    </li>
                  </ul>
                </div>
                <div className="relative h-full min-h-[400px] bg-secondary/10 border-l border-white/5">
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-80 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 rotate-[-6deg] transform transition-transform hover:rotate-0 duration-500">
                        <div className="w-full h-4 bg-white/10 rounded mb-4" />
                        <div className="space-y-2">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-full h-2 bg-white/5 rounded" />
                          ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                          <div className="w-12 h-12 rounded-full border-2 border-limegreen border-t-transparent animate-spin" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="sticky top-36 mb-24 min-h-[60vh] bg-[#161616] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02]">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="p-12 lg:p-20 flex flex-col justify-center order-2 lg:order-1">
                  <div className="font-heading text-8xl font-black text-white/5 mb-8">02</div>
                  <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">AI Processing</h3>
                  <p className="font-paragraph text-xl text-softgray leading-relaxed mb-8">
                    Our engine selects the optimal model (ARIMA, Prophet, etc.) based on your data's characteristics. It detects seasonality, trends, and anomalies automatically.
                  </p>
                  <div className="flex gap-4">
                    <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-pastelpink border border-pastelpink/20">Pattern Recognition</span>
                    <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-brightblue border border-brightblue/20">Trend Analysis</span>
                  </div>
                </div>
                <div className="relative h-full min-h-[400px] bg-pastelpink/5 border-l border-white/5 order-1 lg:order-2">
                   <Image 
                    src="https://static.wixstatic.com/media/70d151_68dd1103e98c4fe897460262ac9aca69~mv2.png?originWidth=640&originHeight=384"
                    alt="AI processing visualization"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#161616] to-transparent" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="sticky top-40 min-h-[60vh] bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02]">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="p-12 lg:p-20 flex flex-col justify-center">
                  <div className="font-heading text-8xl font-black text-white/5 mb-8">03</div>
                  <h3 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Actionable Insights</h3>
                  <p className="font-paragraph text-xl text-softgray leading-relaxed mb-8">
                    Visualize the future. Export reports, view interactive dashboards, and make decisions backed by data, not intuition.
                  </p>
                  <Link to="/dashboard">
                    <Button className="bg-brightblue hover:bg-brightblue/90 text-white px-8 py-6 text-lg rounded-none">
                      View Demo Dashboard
                    </Button>
                  </Link>
                </div>
                <div className="relative h-full min-h-[400px] bg-brightblue/5 border-l border-white/5 flex items-center justify-center p-12">
                   <div className="w-full max-w-md bg-black/40 backdrop-blur border border-white/10 p-6 rounded-lg">
                      <div className="flex justify-between items-center mb-6">
                        <div className="text-sm text-white/60">Forecast Accuracy</div>
                        <div className="text-limegreen font-bold">94.2%</div>
                      </div>
                      <div className="h-32 flex items-end gap-1">
                        {[30, 45, 35, 60, 50, 75, 65, 90, 80, 95, 85, 100].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-brightblue to-secondary rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BUSINESS IMPACT (Split Parallax) --- */}
      <section className="w-full bg-white text-primary py-32 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div className="order-2 lg:order-1">
              <AnimatedElement>
                <span className="font-heading text-sm text-secondary tracking-[0.3em] uppercase block mb-6">[ ROI ANALYSIS ]</span>
                <h2 className="font-heading text-6xl md:text-8xl font-black text-primary mb-12 leading-[0.9]">
                  IMPACT <br/>
                  <span className="text-secondary">AT SCALE</span>
                </h2>
              </AnimatedElement>

              <div className="space-y-12">
                <AnimatedElement delay="100ms">
                  <div className="flex gap-6 group">
                    <div className="w-16 h-16 border-2 border-secondary rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                      <Target className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-heading text-2xl font-bold mb-2">Minimize Financial Loss</h4>
                      <p className="font-paragraph text-lg text-primary/70 leading-relaxed">
                        Eliminate the "bullwhip effect". Reduce overstock holding costs by up to 30% and prevent revenue loss from stockouts.
                      </p>
                    </div>
                  </div>
                </AnimatedElement>

                <AnimatedElement delay="200ms">
                  <div className="flex gap-6 group">
                    <div className="w-16 h-16 border-2 border-secondary rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                      <PieChart className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-heading text-2xl font-bold mb-2">Strategic Resource Planning</h4>
                      <p className="font-paragraph text-lg text-primary/70 leading-relaxed">
                        Align marketing spend with inventory availability. Plan workforce allocation based on predicted demand spikes.
                      </p>
                    </div>
                  </div>
                </AnimatedElement>

                <AnimatedElement delay="300ms">
                  <div className="flex gap-6 group">
                    <div className="w-16 h-16 border-2 border-secondary rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                      <Layers className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-heading text-2xl font-bold mb-2">Supply Chain Efficiency</h4>
                      <p className="font-paragraph text-lg text-primary/70 leading-relaxed">
                        Streamline procurement. Provide suppliers with accurate forecasts to negotiate better terms and lead times.
                      </p>
                    </div>
                  </div>
                </AnimatedElement>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative h-[80vh] w-full">
              <div className="absolute inset-0 bg-secondary/5 -rotate-3 rounded-3xl transform scale-95" />
              <div className="absolute inset-0 bg-primary overflow-hidden rounded-3xl shadow-2xl">
                <Image 
                  src="https://static.wixstatic.com/media/70d151_500dbc8e783f467e85279332bbed2d05~mv2.png?originWidth=1280&originHeight=704"
                  alt="Team analyzing data on a large screen"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                
                {/* Floating Stats Card */}
                <div className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl text-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm uppercase tracking-widest mb-2">Efficiency Gain</div>
                      <div className="text-5xl font-black text-limegreen">+42%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm uppercase tracking-widest mb-2">Cost Reduction</div>
                      <div className="text-5xl font-black text-brightblue">-28%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative w-full py-40 overflow-hidden flex items-center justify-center bg-primary">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-primary opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-limegreen/20 via-transparent to-transparent opacity-40" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <AnimatedElement>
            <h2 className="font-heading text-6xl md:text-9xl font-black text-white mb-8 leading-none tracking-tighter">
              READY TO <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-limegreen to-brightblue">TRANSFORM?</span>
            </h2>
          </AnimatedElement>
          
          <AnimatedElement delay="200ms">
            <p className="font-paragraph text-xl md:text-2xl text-softgray mb-12 max-w-2xl mx-auto">
              Join the forward-thinking businesses using AI to predict the future. Your data holds the answers. Let's unlock them.
            </p>
          </AnimatedElement>
          
          <AnimatedElement delay="400ms">
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link to="/dashboard">
                <Button className="bg-white text-primary hover:bg-limegreen hover:text-primary transition-all duration-300 text-xl px-12 py-8 rounded-none font-bold tracking-wider min-w-[250px]">
                  START FORECASTING
                </Button>
              </Link>
              <span className="text-white/40 text-sm uppercase tracking-widest">OR</span>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xl px-12 py-8 rounded-none font-bold tracking-wider min-w-[250px]">
                VIEW DOCUMENTATION
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}