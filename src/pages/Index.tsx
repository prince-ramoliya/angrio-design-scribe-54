
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ExternalLink } from 'lucide-react';
import ModelSelector from '@/components/ModelSelector';
import TopicTextarea from '@/components/TopicTextarea';
import GenerationSettings from '@/components/GenerationSettings';
import ReadyToGenerate from '@/components/ReadyToGenerate';
import PromptCard from '@/components/PromptCard';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { generateMultiplePrompts } from '@/utils/creativityEngine';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [topic, setTopic] = useState('AI-powered customer service platform for e-commerce businesses that automates support tickets and provides 24/7 chat assistance');
  const [promptCount, setPromptCount] = useState(3);
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic or campaign description to generate prompts.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const prompts = generateMultiplePrompts(topic.trim(), promptCount);
      setGeneratedPrompts(prompts);
      
      toast({
        title: "Prompts created!",
        description: `${prompts.length} unique design brief${prompts.length > 1 ? 's' : ''} generated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Unable to generate prompts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendToDesigner = () => {
    if (generatedPrompts.length === 0) {
      toast({
        title: "No prompts to send",
        description: "Please generate some prompts first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sent to AI Designer!",
      description: "Your design briefs have been sent to the AI Designer for processing.",
    });
  };

  const handleOpenInBrowser = () => {
    if (generatedPrompts.length === 0) {
      toast({
        title: "No prompts to open",
        description: "Please generate some prompts first.",
        variant: "destructive",
      });
      return;
    }

    try {
      generatedPrompts.forEach((prompt, index) => {
        // Encode the prompt for URL
        const encodedPrompt = encodeURIComponent(prompt);
        
        // Create ChatGPT URL with the prompt
        const chatGptUrl = `https://chat.openai.com/?q=${encodedPrompt}`;
        
        // Open each prompt in a new tab with a small delay to prevent browser blocking
        setTimeout(() => {
          window.open(chatGptUrl, `_blank_${index}`);
        }, index * 100);
      });

      toast({
        title: "Opening in browser!",
        description: `${generatedPrompts.length} ChatGPT tab${generatedPrompts.length > 1 ? 's' : ''} opened with your prompts.`,
      });
    } catch (error) {
      toast({
        title: "Failed to open browser",
        description: "Unable to open ChatGPT tabs. Please check your browser settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Angrio's AI Graphic Designer
              </h1>
              <p className="text-muted-foreground mt-1">
                Generate professional design briefs with AI-powered creativity
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Controls (60%) */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TopicTextarea
                topic={topic}
                onTopicChange={setTopic}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GenerationSettings
                promptCount={promptCount}
                onPromptCountChange={setPromptCount}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                disabled={!topic.trim()}
              />
            </motion.div>
          </div>

          {/* Right Column - Results (40%) */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8 space-y-4">
              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button
                    onClick={handleOpenInBrowser}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                    disabled={generatedPrompts.length === 0}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Browser
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Button
                    onClick={handleSendToDesigner}
                    className="w-full"
                    size="lg"
                    disabled={generatedPrompts.length === 0}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send to AI Designer
                  </Button>
                </motion.div>
              </div>

              {/* Results Section */}
              <AnimatePresence mode="wait">
                {generatedPrompts.length === 0 ? (
                  <motion.div
                    key="ready-state"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ReadyToGenerate />
                  </motion.div>
                ) : (
                  <motion.div
                    key="results-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {generatedPrompts.map((prompt, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <PromptCard prompt={prompt} index={index} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
