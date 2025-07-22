import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, ExternalLink, Copy, Check, Sparkles, Palette, Target } from 'lucide-react';

/**
 * BackgroundBeamsWithCollision Component
 * Creates animated background beams with collision effects using Angrio brand colors
 * Converted from TypeScript to JavaScript and styled with brand colors
 */
const BackgroundBeamsWithCollision = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const containerRef = useRef(null);
  const parentRef = useRef(null);

  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2,
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4,
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      className: "h-6",
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4,
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      className: "h-20",
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 4,
      repeatDelay: 2,
      className: "h-12",
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6",
    },
  ];

  return (
    <div
      ref={parentRef}
      className={`h-screen relative flex items-center w-full justify-center overflow-hidden bg-gradient-to-br from-background to-muted ${className}`}
    >
      {beams.map((beam, index) => (
        <CollisionMechanism
          key={`beam-${index}`}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full h-40"
        style={{
          background: `linear-gradient(to right, hsl(var(--background)), hsl(var(--muted)), hsl(var(--background)))`,
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.memo(({ beamOptions, containerRef, parentRef }: {
  beamOptions: any;
  containerRef: React.MutableRefObject<any>;
  parentRef: React.MutableRefObject<any>;
}) => {
  const beamRef = useRef(null);
  const [collision, setCollision] = useState({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "1800px",
            translateX: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={`absolute top-0 m-auto h-14 w-px rounded-full bg-gradient-to-t from-angrio-orange via-angrio-navy to-transparent ${
          beamOptions.className || ""
        }`}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`explosion-${beamKey}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

const Explosion = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div className={`absolute z-50 h-2 w-2 ${className}`} style={style}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-angrio-orange to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-angrio-orange to-angrio-navy"
        />
      ))}
    </div>
  );
};

/**
 * ShinyButton Component
 * Premium button with shimmer effect using Angrio brand colors
 * Converted from TypeScript to JavaScript
 */
const ShinyButton = ({ 
  children, 
  className = "", 
  variant = "primary", 
  onClick,
  disabled = false,
  icon: Icon,
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  icon?: any;
  [key: string]: any;
}) => {
  const baseClasses = "relative inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-xl transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-angrio-orange text-white hover:shadow-lg hover:shadow-angrio-orange/25 hover:scale-105",
    secondary: "bg-angrio-navy text-white hover:shadow-lg hover:shadow-angrio-navy/25 hover:scale-105"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {Icon && <Icon className="w-5 h-5 relative z-10" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

/**
 * Professional Prompt Generation Engine
 * Core functionality that generates high-quality, brand-specific design prompts
 * Built around 10 professional creative blueprints derived from successful brand visuals
 */
const generatePromptVariations = (userText: string, industry: string, style: string, callToAction: string) => {
  // 10 Professional Creative Blueprints - Each based on proven successful brand visuals
  const creativeBlueprints = [
    {
      headline: "Transform Your Business Today",
      keyHighlight: "Transform",
      visualConcept: "Modern corporate office with sleek glass windows, professional team in business attire collaborating around a conference table with laptops and documents, soft natural lighting, clean minimal aesthetic",
      tag: "#BusinessTransformation"
    },
    {
      headline: "Innovation Starts Here",
      keyHighlight: "Innovation",
      visualConcept: "Futuristic tech workspace with holographic displays, person in modern business casual pointing at floating digital interfaces, blue and orange accent lighting, high-tech environment",
      tag: "#Innovation"
    },
    {
      headline: "Unlock Your Potential",
      keyHighlight: "Unlock",
      visualConcept: "Person standing at the peak of a mountain at sunrise, arms raised in victory pose, sweeping landscape view below, inspirational and aspirational mood, warm golden lighting",
      tag: "#Success"
    },
    {
      headline: "Results That Matter",
      keyHighlight: "Results",
      visualConcept: "Clean data visualization dashboard on multiple monitors, professional analyst reviewing charts and graphs, modern office environment, emphasis on growth metrics and KPIs",
      tag: "#Results"
    },
    {
      headline: "Your Success Story",
      keyHighlight: "Success",
      visualConcept: "Diverse group of professionals celebrating achievement, handshakes and smiles, modern corporate lobby with company branding, natural lighting, professional photography style",
      tag: "#SuccessStory"
    },
    {
      headline: "Leading the Future",
      keyHighlight: "Leading",
      visualConcept: "Executive in sharp business suit standing confidently in front of modern city skyline through floor-to-ceiling windows, dynamic composition, professional portrait lighting",
      tag: "#Leadership"
    },
    {
      headline: "Expert Solutions",
      keyHighlight: "Expert",
      visualConcept: "Professional consultant presenting to clients in modern meeting room, whiteboard with strategic diagrams, attentive audience, collaborative business environment",
      tag: "#Expertise"
    },
    {
      headline: "Game-Changing Innovation",
      keyHighlight: "Game-Changing",
      visualConcept: "Product showcase with dramatic lighting, innovative device or service displayed prominently, modern studio setup, clean background with subtle geometric patterns",
      tag: "#GameChanger"
    },
    {
      headline: "Proven Track Record",
      keyHighlight: "Proven",
      visualConcept: "Timeline infographic showing company milestones and achievements, award ceremonies and recognition events, professional documentation of success metrics",
      tag: "#ProvenResults"
    },
    {
      headline: "Excellence Delivered",
      keyHighlight: "Excellence",
      visualConcept: "Premium service delivery scene, attention to detail in professional environment, quality craftsmanship or service being provided, luxurious and refined aesthetic",
      tag: "#Excellence"
    }
  ];

  // Randomly select 4 blueprints for variety
  const shuffled = [...creativeBlueprints].sort(() => 0.5 - Math.random());
  const selectedBlueprints = shuffled.slice(0, 4);

  return selectedBlueprints.map((blueprint, index) => {
    // Dynamic content integration - weave user text into supporting copy
    const supportingCopy = `${userText}. Perfect for ${industry.toLowerCase()} professionals who demand quality and results.`;
    
    // Assemble comprehensive design brief with brand guidelines
    const finalPrompt = `
**DESIGN BRIEF - ANGRIO SOCIAL MEDIA POST**

**BRAND GUIDELINES:**
- Primary Color: Angrio Orange (#FF7A00)
- Secondary Color: Angrio Navy (#0B2C5F)
- Font: Modern sans-serif (Helvetica/Arial family)
- Logo: Place Angrio logo in top-right corner (small, professional)
- Background: Clean white or subtle light gray
- Style: ${style}, professional, modern

**CREATIVE CONCEPT:**
Headline: "${blueprint.headline}"
Key Highlight: Style "${blueprint.keyHighlight}" in Angrio Orange
Supporting Copy: "${supportingCopy}"

**VISUAL DIRECTION:**
${blueprint.visualConcept}

**LAYOUT SPECIFICATIONS:**
- Format: 1080x1080px square (Instagram/LinkedIn)
- Headline: Large, bold text at top
- Supporting copy: Medium size, positioned below headline
- CTA Button: "${callToAction}" in Angrio Orange with white text
- Footer: "Powered by Angrio" in small text at bottom

**CALL TO ACTION:**
Primary CTA: "${callToAction}"
Hashtag: ${blueprint.tag}

**FINAL OUTPUT:**
High-resolution social media post ready for ${industry} audience with professional design standards.
    `.trim();

    return {
      id: index + 1,
      headline: blueprint.headline,
      keyHighlight: blueprint.keyHighlight,
      visualConcept: blueprint.visualConcept,
      supportingCopy,
      tag: blueprint.tag,
      finalPrompt
    };
  });
};

/**
 * Main Application Component
 * Angrio's AI Graphic Designer - Professional design prompt generator
 */
const Index = () => {
  const [userText, setUserText] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [style, setStyle] = useState('Modern & Professional');
  const [callToAction, setCallToAction] = useState('Get Started');
  const [generatedPrompts, setGeneratedPrompts] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Generate prompts using the professional prompt engine
  const handleGeneratePrompts = useCallback(async () => {
    if (!userText.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const prompts = generatePromptVariations(userText, industry, style, callToAction);
    setGeneratedPrompts(prompts);
    setIsGenerating(false);
  }, [userText, industry, style, callToAction]);

  // Copy prompt to clipboard
  const handleCopyPrompt = useCallback(async (prompt: string, index: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);

  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header with animated brand name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span 
              className="bg-gradient-to-r from-angrio-orange via-angrio-navy to-angrio-orange bg-300% text-transparent bg-clip-text animate-gradient-wave"
            >
              Angrio's
            </span>
            <span className="text-foreground"> AI Design Studio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate professional, on-brand design prompts for social media posts with our AI-powered creative engine
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Panel - Input Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-angrio-orange" />
              <h2 className="text-2xl font-bold text-foreground">Creative Brief</h2>
            </div>

            <div className="space-y-6">
              {/* Main Text Input */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <textarea
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  placeholder="Describe your product, service, or message..."
                  className="w-full h-32 px-4 py-3 border border-border rounded-xl bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-angrio-orange focus:border-transparent resize-none"
                />
              </div>

              {/* Industry Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-angrio-orange focus:border-transparent"
                >
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                  <option>Marketing</option>
                  <option>Education</option>
                  <option>Real Estate</option>
                  <option>Consulting</option>
                  <option>E-commerce</option>
                </select>
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Design Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-angrio-orange focus:border-transparent"
                >
                  <option>Modern & Professional</option>
                  <option>Creative & Bold</option>
                  <option>Minimal & Clean</option>
                  <option>Corporate & Trustworthy</option>
                  <option>Innovative & Tech</option>
                </select>
              </div>

              {/* Call to Action */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Call to Action
                </label>
                <input
                  type="text"
                  value={callToAction}
                  onChange={(e) => setCallToAction(e.target.value)}
                  placeholder="Get Started"
                  className="w-full px-4 py-3 border border-border rounded-xl bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-angrio-orange focus:border-transparent"
                />
              </div>

              {/* Generate Button */}
              <ShinyButton
                variant="primary"
                onClick={handleGeneratePrompts}
                disabled={!userText.trim() || isGenerating}
                icon={Wand2}
                className="w-full"
              >
                {isGenerating ? 'Creating Magic...' : 'Create Prompts'}
              </ShinyButton>
            </div>
          </motion.div>

          {/* Right Panel - Generated Prompts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-angrio-navy" />
              <h2 className="text-2xl font-bold text-foreground">Generated Prompts</h2>
            </div>

            {generatedPrompts.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4 animate-float" />
                <p className="text-muted-foreground">
                  {userText.trim() ? 'Click "Create Prompts" to generate professional design briefs' : 'Enter your message to get started'}
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {generatedPrompts.map((prompt, index) => (
                    <motion.div
                      key={prompt.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{prompt.headline}</h3>
                          <span className="text-xs text-angrio-orange font-medium">{prompt.tag}</span>
                        </div>
                        <button
                          onClick={() => handleCopyPrompt(prompt.finalPrompt, index)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{prompt.supportingCopy}</p>
                      <div className="text-xs text-muted-foreground">
                        Visual: {prompt.visualConcept.substring(0, 100)}...
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>

        {/* Action Buttons */}
        {generatedPrompts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <ShinyButton
              variant="secondary"
              icon={ExternalLink}
              onClick={() => window.open('https://angrio.com', '_blank')}
            >
              Start Designing
            </ShinyButton>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16 text-muted-foreground"
        >
          <p>&copy; 2024 Angrio. All rights reserved.</p>
        </motion.div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default Index;
