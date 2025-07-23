
// Core creativity engine for generating unique design prompts with expert LinkedIn strategy
export interface CreativeElements {
  headlines: string[];
  taglines: string[];
  heroVisuals: string[];
  blueprints: string[];
}

export const creativeElements: CreativeElements = {
  headlines: [
    "Why You Need A {topic} Solution?",
    "The Future of {topic} is Here",
    "Transform Your {topic} Today",
    "Revolutionary {topic} Innovation",
    "Smart {topic} for Modern Business",
    "Next-Gen {topic} Technology",
    "Advanced {topic} Solutions",
    "Breakthrough {topic} Experience",
    "Professional {topic} Services",
    "Expert {topic} Consulting",
    "How {topic} Changed Everything",
    "The Secret to {topic} Success",
    "Why {topic} Matters Now",
    "Stop Struggling with {topic}",
    "The {topic} Game Changer"
  ],
  
  taglines: [
    "Because your {topic} idea is as ready as a penguin in flip-flops!",
    "Turn {topic} chaos into competitive advantage!",
    "Because manual {topic} is so last decade!",
    "Your {topic} success story starts here!",
    "Making {topic} simple, one solution at a time!",
    "Transform {topic} complexity into clarity!",
    "Because great {topic} deserves great technology!",
    "Your {topic} journey, powered by innovation!",
    "Making {topic} work smarter, not harder!",
    "Professional {topic} solutions that actually work!",
    "When {topic} meets cutting-edge innovation!",
    "Because your {topic} deserves the best!",
    "Turning {topic} challenges into opportunities!",
    "The {topic} revolution starts with you!",
    "Making {topic} effortless and effective!"
  ],

  heroVisuals: [
    "Formal cartoon penguin wearing a black tuxedo, bow-tie & bowler hat related to {topic}; front-facing; soft studio lighting; isolated on transparent background.",
    "Professional 3D rendered {topic} icon with navy and orange accents; clean minimal design; soft shadows; isolated on transparent background.",
    "Sleek {topic} dashboard interface mockup floating in 3D space; navy and orange UI elements; clean modern design; transparent background.",
    "Abstract geometric {topic} visualization with interconnected nodes; navy base with orange highlights; 3D rendered; minimal background.",
    "Professional team silhouettes working on {topic} solutions; clean vector style; navy and orange color scheme; transparent background.",
    "Modern {topic} workflow diagram with flowing arrows; 3D isometric style; brand colors; clean isolated design.",
    "Futuristic {topic} technology symbols arranged in a circle; glowing orange accents on navy base; 3D rendered; transparent background.",
    "Clean product mockup of {topic} tools and interfaces; professional photography style; navy and orange branding; isolated background.",
    "Dynamic {topic} data visualization charts and graphs; floating 3D elements; brand color palette; minimal transparent background.",
    "Stylized {topic} industry building or cityscape; modern vector illustration; navy and orange accents; clean isolated design."
  ],

  blueprints: [
    `##############################
### ANGRIO LINKEDIN POST – MASTER PROMPT
### (1080 × 1080 px, RGB, 300 ppi)
##############################

[EXPERT LINKEDIN STRATEGY CONTEXT]
You are an expert social media strategist and viral LinkedIn post writer with over ten years of hands-on experience, especially focused on LinkedIn. You have crafted thousands of posts and mastered the formula behind engagement, virality, timing, structure, tone, and audience psychology.

Apply these LinkedIn best practices:
• Hook readers within the first 2 lines
• Use storytelling and emotional triggers
• Include actionable insights
• Maintain professional yet conversational tone
• Structure for maximum readability and engagement
• Focus on value-driven content that sparks discussion

[STYLE  —  DO NOT EDIT]
• Canvas: 1 : 1 square, off-white (#FDFDFD) base.
• Subtle grid overlay: 40 px squares, 10 % opacity, #E7E7E7 lines.
• Primary colours: Navy #004BD6  |  Accent Orange #FF8828  |  Black #000000.
• Fonts: 
    – Headline: *DM Sans ExtraBold* (or Inter Black), sentence case, –20 tracking.  
    – Body & sub-lines: *DM Sans Regular*, 0 tracking.
• Highlight effect: words wrapped in rectangular orange badges (#FF8828) with 16 px vertical padding, white text, 8 px corner radius.
• Layout grid (margin → centre):
    1. Top bar: 48 px margin.  
    2. Logo (angriotechnologies_logo.png) top-right, width 140 px.  
    3. Optional tag (#angrio-team) top-left, DM Sans Medium 28 pt, navy.  
    4. Headline block on left half, max width 560 px, 72-96 pt leading.  
    5. Hero visual on right half, vertically centred, 40 % canvas width.  
    6. Sub-headline / witty one-liner below headline, 40 pt, 520 px width.  
    7. Footer strip: website + phone, DM Sans Medium 32 pt, centred, 64 px above bottom edge.
• Spacing: 60 px gutter between headline block and hero.
• Graphic style for hero: clean, semi-realistic 3-D render or flat vector matching brand palette; minimal background so copy dominates.

[ASSETS  —  DO NOT EDIT]
• angriotechnologies_logo.png  (white-space-trimmed)
• Contact copy: "www.angriotechnologies.com  |  +91 8141067657"

##############################
### SLOTS  —  YOU EDIT ONLY THESE
##############################

HEADLINE_LINE_1:   {headline}
HIGHLIGHT_WORD_1:  Tech
HIGHLIGHT_WORD_2:  Partner
SUBLINE/WITTY:     {tagline}

HERO_VISUAL_PROMPT: 
"{heroVisual}"

OPTIONAL_TOP_TAG:  #angrio-team
OPTIONAL_FOOTER_TAG: #BuildWithAngrio

##############################
### LINKEDIN CONTENT STRATEGY
##############################
• Create content that provides immediate value
• Use power words and emotional triggers
• Structure for scannable, digestible content
• Include clear call-to-action elements
• Focus on business outcomes and ROI
• Maintain Angrio's professional brand voice
• Ensure content sparks meaningful discussions

##############################
### OUTPUT INSTRUCTIONS  —  DO NOT EDIT
##############################
• Render the final post exactly to spec, embedding logo and footer text. 
• Centre all text blocks on the vertical grid. 
• Ensure highlight badges retain stroke-less orange fill and hug the highlighted words tightly.
• Apply LinkedIn viral content principles throughout the design.`
  ]
};

export function buildCreativePrompt(topic: string, elements: CreativeElements): string {
  console.log('Building creative prompt for topic:', topic);
  
  // Randomly select elements for variety
  const headline = elements.headlines[Math.floor(Math.random() * elements.headlines.length)];
  const tagline = elements.taglines[Math.floor(Math.random() * elements.taglines.length)];
  const heroVisual = elements.heroVisuals[Math.floor(Math.random() * elements.heroVisuals.length)];
  const blueprint = elements.blueprints[0]; // Use the enhanced blueprint template

  console.log('Selected elements:', { headline, tagline, heroVisual });

  // Replace placeholders in all elements
  const processedHeadline = headline.replace(/{topic}/g, topic);
  const processedTagline = tagline.replace(/{topic}/g, topic);
  const processedHeroVisual = heroVisual.replace(/{topic}/g, topic);
  const processedBlueprint = blueprint
    .replace(/{headline}/g, processedHeadline)
    .replace(/{tagline}/g, processedTagline)
    .replace(/{heroVisual}/g, processedHeroVisual);

  console.log('Processed blueprint length:', processedBlueprint.length);
  
  return processedBlueprint;
}

export function generateMultiplePrompts(topic: string, count: number): string[] {
  console.log('Generating multiple prompts:', { topic, count });
  
  const prompts: string[] = [];
  
  // Generate each prompt with different random combinations
  for (let i = 0; i < count; i++) {
    console.log(`Generating prompt ${i + 1} of ${count}`);
    
    try {
      const prompt = buildCreativePrompt(topic, creativeElements);
      prompts.push(prompt);
      console.log(`Successfully generated prompt ${i + 1}`);
    } catch (error) {
      console.error(`Error generating prompt ${i + 1}:`, error);
      // Continue with next prompt instead of breaking
    }
  }

  console.log(`Final result: Generated ${prompts.length} prompts`);
  return prompts;
}
