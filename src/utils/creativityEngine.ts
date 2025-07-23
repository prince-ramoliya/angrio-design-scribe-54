// Core creativity engine for generating unique design prompts with expert LinkedIn strategy
export interface CreativeElements {
  headlines: string[];
  taglines: string[];
  heroVisuals: string[];
  blueprints: string[];
}

export const creativeElements: CreativeElements = {
  headlines: [
    "Why {topic}?",
    "Meet {topic}",
    "New {topic}",
    "Try {topic}",
    "Get {topic}",
    "Use {topic}",
    "Win with {topic}",
    "Build {topic}",
    "Start {topic}",
    "Go {topic}",
    "Own {topic}",
    "Live {topic}",
    "Be {topic}",
    "Do {topic}",
    "Make {topic}"
  ],
  
  taglines: [
    "Less talk, more {topic}",
    "Simply {topic}",
    "Just {topic}",
    "Pure {topic}",
    "Smart {topic}",
    "Quick {topic}",
    "Easy {topic}",
    "Fresh {topic}",
    "Bold {topic}",
    "Clean {topic}",
    "Fast {topic}",
    "New {topic}",
    "Real {topic}",
    "True {topic}",
    "Live {topic}"
  ],

  heroVisuals: [
    "Minimalist {topic} icon with geometric shapes; gradient from navy to orange; floating 3D elements; clean white background with subtle grid pattern.",
    "Abstract {topic} visualization with flowing particles; navy and orange color palette; dynamic motion blur; transparent background with dot matrix overlay.",
    "Clean {topic} interface mockup with glassmorphism effect; soft shadows; navy UI with orange accents; diagonal grid background pattern.",
    "Isometric {topic} illustration with bold colors; 3D rendered; navy base with orange highlights; hexagonal background pattern.",
    "Futuristic {topic} hologram with neon effects; glowing orange elements; navy background with circuit board pattern.",
    "Sleek {topic} dashboard with data visualization; modern flat design; brand colors; wave pattern background.",
    "Stylized {topic} workspace with floating elements; minimalist 3D; navy and orange palette; triangular mesh background.",
    "Dynamic {topic} flow chart with animated arrows; clean vector style; gradient background with geometric shapes.",
    "Professional {topic} tools arrangement; product photography style; soft lighting; fabric texture background pattern.",
    "Abstract {topic} network nodes with connections; 3D rendered spheres; navy base with orange links; crystalline background pattern."
  ],

  blueprints: [
    `##############################
### ANGRIO LINKEDIN POST – MINIMAL CREATIVE
### (1080 × 1080 px, RGB, 300 ppi)
##############################

[EXPERT LINKEDIN STRATEGY CONTEXT]
You are an expert social media strategist and viral LinkedIn post writer with over ten years of hands-on experience, especially focused on LinkedIn. You have crafted thousands of posts and mastered the formula behind engagement, virality, timing, structure, tone, and audience psychology.

Apply these LinkedIn best practices:
• Hook with powerful opening line
• Use minimal, impactful copy
• Create visual hierarchy
• Include strong call-to-action
• Focus on value and outcomes
• Maintain professional brand voice

[STYLE  —  MINIMAL & CREATIVE]
• Canvas: 1 : 1 square, dynamic background pattern (changes each time).
• Background options: geometric grid, diagonal lines, dot matrix, hexagonal pattern, wave overlay, triangular mesh, circuit lines, crystalline texture, fabric weave, flowing particles.
• Primary colours: Navy #004BD6  |  Accent Orange #FF8828  |  White #FFFFFF.
• Typography: 
    – Headline: Bold, large, impactful (80-120pt)
    – Body: Clean, readable (40-50pt)
    – Spacing: Generous white space
• Visual elements: Minimal, geometric, 3D depth
• Layout: Asymmetric, dynamic, modern
• Hero visual: Right side, 45% width, vertically centered
• Text: Left side, hierarchy-focused

[CONTENT STRATEGY]
• Ultra-short, punchy headlines (2-4 words max)
• Minimal taglines (3-5 words max)
• Strong visual impact over text
• Immediate value proposition
• Professional yet approachable tone

[ASSETS]
• angriotechnologies_logo.png (top-right, 120px width)
• Contact: "angriotechnologies.com  |  +91 8141067657" (bottom center, 28pt)

##############################
### SLOTS
##############################

HEADLINE:          {headline}
TAGLINE:           {tagline}
HERO_VISUAL:       "{heroVisual}"
BACKGROUND_STYLE:  Random geometric pattern with brand colors
TOP_TAG:           #minimal
FOOTER_TAG:        #BuildWithAngrio

##############################
### OUTPUT INSTRUCTIONS
##############################
• Create visually striking, minimal design
• Use different background pattern each time
• Ensure high visual impact with minimal text
• Apply modern, clean aesthetic
• Focus on brand consistency
• Make it scroll-stopping content for LinkedIn feed`
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
