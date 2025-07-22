
// Core creativity engine for generating unique design prompts
export interface CreativeElements {
  headlines: string[];
  taglines: string[];
  heroVisuals: string[];
  blueprints: string[];
}

export const creativeElements: CreativeElements = {
  headlines: [
    "The Future of {topic} is Here",
    "Why Your {topic} Needs a Tech Upgrade",
    "Revolutionary {topic} Solutions",
    "Transform Your {topic} Today",
    "Next-Gen {topic} Innovation",
    "Breakthrough {topic} Technology",
    "The Ultimate {topic} Experience",
    "Redefining {topic} Excellence",
    "Advanced {topic} Solutions",
    "Smart {topic} for Modern Business"
  ],
  
  taglines: [
    "Turn {topic} ideas into investor-ready products",
    "Innovative tech for modern {topic} challenges",
    "Streamline your {topic} workflow with AI",
    "Professional {topic} solutions that scale",
    "Cutting-edge {topic} for competitive advantage",
    "Transform complexity into {topic} simplicity",
    "Your {topic} success, powered by innovation",
    "Enterprise-grade {topic} made accessible",
    "Data-driven {topic} for better results",
    "Future-proof your {topic} strategy"
  ],

  heroVisuals: [
    "A 3D render of a glowing '{topic}' icon floating above a modern workspace with soft blue lighting and geometric patterns",
    "Minimalist line art showing the process of '{topic}' transformation with flowing arrows and clean typography",
    "Professional photography of diverse team members collaborating on {topic} solutions in a bright, modern office",
    "Abstract gradient background featuring interconnected nodes representing {topic} innovation and connectivity",
    "Sleek dashboard interface mockup displaying {topic} analytics with clean data visualizations and modern UI elements",
    "Dynamic illustration of {topic} workflow automation with floating icons and connecting pathways",
    "High-tech laboratory setting showcasing {topic} development with glowing screens and advanced equipment",
    "Modern cityscape silhouette with {topic} technology elements integrated into the skyline at golden hour",
    "Clean product photography of {topic} tools arranged on a white surface with strategic lighting and shadows",
    "Futuristic holographic display showing {topic} data streams and interactive elements in a dark environment"
  ],

  blueprints: [
    `**LAYOUT: Hero Right**
Primary Headline: {headline}
Supporting Text: {tagline}
Visual Element: {heroVisual}
Call-to-Action: Positioned bottom-left
Brand Colors: Angrio Orange (#FF7A00) and Navy (#0B2C5F)
Typography: Clean sans-serif headers, readable body text
Logo Placement: Top-right corner`,

    `**LAYOUT: Centered Focus**
Main Title: {headline}
Subtitle: {tagline}
Hero Image: {heroVisual}
Button Placement: Center-bottom
Color Scheme: Primary Angrio Orange with white background
Font Weight: Bold headlines, medium body text
Spacing: Generous white space for clean look`,

    `**LAYOUT: Split Vertical**
Left Section: {headline}
Right Section: {heroVisual}
Bottom Banner: {tagline}
CTA Position: Right-aligned
Brand Identity: Consistent Angrio color palette
Text Hierarchy: Large title, medium subtitle, small footer
Visual Balance: 60/40 text to image ratio`,

    `**LAYOUT: Grid System**
Header Zone: {headline}
Content Grid: {heroVisual}
Footer Strip: {tagline}
Action Button: Floating bottom-right
Color Treatment: Gradient overlay with brand colors
Typography Scale: Progressive size reduction
Alignment: Left-aligned text, centered visuals`,

    `**LAYOUT: Card Design**
Card Header: {headline}
Card Body: {heroVisual}
Card Footer: {tagline}
Interactive Element: Hover effect on CTA
Background: Subtle gradient or solid white
Text Styling: Contrasting colors for readability
Corner Radius: Consistent 12px border radius`,

    `**LAYOUT: Magazine Style**
Feature Headline: {headline}
Editorial Visual: {heroVisual}
Byline Text: {tagline}
Navigation: Breadcrumb style
Color Story: Monochromatic with orange accents
Editorial Layout: Multi-column text flow
Image Treatment: Full-bleed or contained`
  ]
};

export function buildCreativePrompt(topic: string, elements: CreativeElements): string {
  // Randomly select elements
  const headline = elements.headlines[Math.floor(Math.random() * elements.headlines.length)];
  const tagline = elements.taglines[Math.floor(Math.random() * elements.taglines.length)];
  const heroVisual = elements.heroVisuals[Math.floor(Math.random() * elements.heroVisuals.length)];
  const blueprint = elements.blueprints[Math.floor(Math.random() * elements.blueprints.length)];

  // Replace placeholders in all elements
  const processedHeadline = headline.replace(/{topic}/g, topic);
  const processedTagline = tagline.replace(/{topic}/g, topic);
  const processedHeroVisual = heroVisual.replace(/{topic}/g, topic);
  const processedBlueprint = blueprint
    .replace(/{headline}/g, processedHeadline)
    .replace(/{tagline}/g, processedTagline)
    .replace(/{heroVisual}/g, processedHeroVisual);

  return `**ANGRIO DESIGN BRIEF**

${processedBlueprint}

**BRAND SPECIFICATIONS:**
- Primary Brand Color: Angrio Orange (#FF7A00)
- Secondary Brand Color: Angrio Navy (#0B2C5F)
- Background: Clean white (#FFFFFF) or light gray (#F9FAFB)
- Typography: Professional sans-serif (Inter/DM Sans)
- Logo: Angrio logo placement as specified
- Dimensions: 1080x1080px (Instagram) or 1200x628px (LinkedIn)

**CREATIVE DIRECTION:**
Topic Focus: ${topic}
Style: Professional, modern, trustworthy
Tone: Innovative, expert, solution-oriented
Target: Business professionals and decision-makers

**DELIVERABLE:**
High-resolution social media post optimized for ${topic} audience engagement.`;
}

export function generateMultiplePrompts(topic: string, count: number): string[] {
  const prompts: string[] = [];
  const usedCombinations = new Set<string>();

  while (prompts.length < count) {
    const prompt = buildCreativePrompt(topic, creativeElements);
    
    // Create a simple hash to avoid exact duplicates
    const hash = prompt.substring(0, 100);
    
    if (!usedCombinations.has(hash)) {
      usedCombinations.add(hash);
      prompts.push(prompt);
    }
    
    // Prevent infinite loop in edge cases
    if (usedCombinations.size >= creativeElements.blueprints.length * 2) {
      break;
    }
  }

  return prompts;
}
