
// Core creativity engine for generating unique design prompts with expert LinkedIn strategy
export interface CreativeElements {
  headlines: string[];
  taglines: string[];
  heroVisuals: string[];
  blueprints: string[];
}

export const creativeElements: CreativeElements = {
  headlines: [
    "Why {topic} Matters Now",
    "The Future of {topic}",
    "Mastering {topic} in 2024",
    "Your {topic} Strategy",
    "Building Better {topic}",
    "Unlock {topic} Success",
    "Transform with {topic}",
    "Scale Your {topic}",
    "Perfect {topic} Solution",
    "Next-Level {topic}",
    "Revolutionary {topic}",
    "Smart {topic} Approach",
    "Advanced {topic} Methods",
    "Professional {topic} Guide",
    "Essential {topic} Tips"
  ],
  
  taglines: [
    "Transform your business with {topic}",
    "Discover the power of {topic}",
    "Professional {topic} solutions that work",
    "Advanced {topic} strategies for growth",
    "Expert {topic} guidance you need",
    "Revolutionary {topic} approach",
    "Smart {topic} for modern teams",
    "Essential {topic} for success",
    "Professional {topic} made simple",
    "Next-generation {topic} solutions",
    "Proven {topic} strategies",
    "Innovative {topic} methods",
    "Strategic {topic} implementation",
    "Results-driven {topic} approach",
    "Future-ready {topic} solutions"
  ],

  heroVisuals: [
    "Professional {topic} dashboard interface with clean design; modern glassmorphism elements; navy and orange accents; floating data visualization cards; subtle depth shadows.",
    "Minimalist {topic} workspace setup with 3D elements; clean white background; navy geometric shapes; orange highlight accents; professional lighting.",
    "Abstract {topic} network visualization; flowing connections; navy nodes with orange pathways; clean white canvas; depth and dimension.",
    "Sleek {topic} mobile app interface; modern flat design; white background; navy UI elements; orange interactive buttons; clean typography.",
    "Professional {topic} team collaboration scene; clean office environment; navy and orange brand elements; natural lighting; modern workspace.",
    "Geometric {topic} infographic design; clean vector illustrations; white background; navy primary elements; orange accent highlights; organized layout.",
    "Modern {topic} analytics dashboard; clean data visualization; white interface; navy charts; orange progress indicators; professional design.",
    "Stylized {topic} process flow diagram; clean arrows and shapes; white background; navy workflow elements; orange completion states; minimal design.",
    "Professional {topic} product showcase; clean product photography; white studio background; navy packaging; orange brand accents; premium feel.",
    "Clean {topic} comparison chart; organized data presentation; white background; navy text; orange highlight bars; professional layout."
  ],

  blueprints: [
    `##############################
### ANGRIO LINKEDIN POST – MINIMAL CREATIVE
### (1080 × 1080 px, RGB, 300 ppi)
##############################

[EXPERT LINKEDIN STRATEGY CONTEXT]
You are an expert social media strategist and viral LinkedIn post writer with over ten years of hands-on experience, especially focused on LinkedIn. You have crafted thousands of posts and mastered the formula behind engagement, virality, timing, structure, tone, and audience psychology.

Apply these LinkedIn best practices:
• Hook with powerful opening line that creates curiosity
• Use storytelling elements to build connection
• Include specific examples and actionable insights
• Create visual hierarchy with strategic text placement
• Include compelling call-to-action that drives engagement
• Focus on value and tangible outcomes
• Maintain professional yet approachable brand voice
• Use psychological triggers for maximum engagement

[STYLE — MINIMAL & CREATIVE]
• Canvas: 1:1 square format for optimal LinkedIn display
• Background: ONLY white (#FFFFFF) or orange (#FF8828) - no other colors allowed
• Background patterns: geometric grid, diagonal lines, dot matrix, hexagonal pattern, wave overlay, triangular mesh, circuit lines, crystalline texture - all in subtle opacity
• Primary colors: Navy #004BD6 | Orange #FF8828 | White #FFFFFF
• Typography: 
    – Headline: Bold, impactful, large (80-120pt)
    – Tagline: Clean, readable, engaging (40-50pt)
    – Body text: Professional, scannable (32-40pt)
    – Spacing: Generous white space for readability
• Visual elements: Clean, geometric, professional depth
• Layout: Asymmetric but balanced, modern hierarchy
• Hero visual: Right side, 40% width, professionally integrated
• Text: Left side, value-focused hierarchy

[ENHANCED CONTENT STRATEGY]
• Headlines: 3-6 words, curiosity-driven, benefit-focused
• Taglines: 4-8 words, action-oriented, value-specific
• Include subtle urgency and social proof elements
• Focus on transformation and professional growth
• Use power words that drive engagement
• Create content that professionals want to share
• Balance inspiration with practical value

[ASSETS]
• angriotechnologies_logo.png (top-right, 120px width)
• Contact: "angriotechnologies.com | +91 8141067657" (bottom center, 28pt)

##############################
### SLOTS
##############################

HEADLINE:          {headline}
TAGLINE:           {tagline}
HERO_VISUAL:       "{heroVisual}"
BACKGROUND_STYLE:  White or orange background with subtle pattern overlay
TOP_TAG:           #ProfessionalGrowth
FOOTER_TAG:        #BuildWithAngrio

##############################
### ENHANCED CONTENT GUIDELINES
##############################
• Create posts that spark meaningful professional conversations
• Include specific, actionable insights professionals can implement
• Use storytelling elements that build emotional connection
• Focus on transformation and measurable business outcomes
• Include subtle urgency that motivates immediate action
• Design for maximum shareability and engagement
• Maintain consistent brand voice across all variations
• Optimize for LinkedIn's algorithm preferences

##############################
### OUTPUT INSTRUCTIONS
##############################
• Create visually striking, professional design
• Use ONLY white or orange backgrounds with subtle patterns
• Ensure high visual impact with strategic text placement
• Apply modern, clean aesthetic with professional depth
• Focus on brand consistency and recognition
• Design content that stops the scroll in LinkedIn feed
• Balance visual appeal with clear value proposition
• Create designs that professionals want to engage with`
  ]
};

export function buildCreativePrompt(topic: string, elements: CreativeElements): string {
  console.log('Building creative prompt for topic:', topic);
  
  // Randomly select elements for variety
  const headline = elements.headlines[Math.floor(Math.random() * elements.headlines.length)];
  const tagline = elements.taglines[Math.floor(Math.random() * elements.taglines.length)];
  const heroVisual = elements.heroVisuals[Math.floor(Math.random() * elements.heroVisuals.length)];
  const blueprint = elements.blueprints[0];

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
  
  for (let i = 0; i < count; i++) {
    console.log(`Generating prompt ${i + 1} of ${count}`);
    
    try {
      const prompt = buildCreativePrompt(topic, creativeElements);
      prompts.push(prompt);
      console.log(`Successfully generated prompt ${i + 1}`);
    } catch (error) {
      console.error(`Error generating prompt ${i + 1}:`, error);
    }
  }

  console.log(`Final result: Generated ${prompts.length} prompts`);
  return prompts;
}
