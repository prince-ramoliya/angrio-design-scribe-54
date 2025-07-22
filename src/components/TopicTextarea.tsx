
import React from 'react';
import { Pencil } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface TopicTextareaProps {
  topic: string;
  onTopicChange: (topic: string) => void;
}

const TopicTextarea: React.FC<TopicTextareaProps> = ({ topic, onTopicChange }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-3">
          <Pencil className="w-5 h-5 text-angrio-orange mt-1" />
          <div>
            <CardTitle className="text-lg font-semibold">Describe Your Post Idea or Campaign</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Auto-assigns Angrio layout, fonts, color palette, and post type
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="e.g., AI-powered customer service platform for e-commerce businesses that automates support tickets and provides 24/7 chat assistance"
          className="min-h-[120px] resize-none"
        />
      </CardContent>
    </Card>
  );
};

export default TopicTextarea;
