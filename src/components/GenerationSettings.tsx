
import React from 'react';
import { Settings, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface GenerationSettingsProps {
  promptCount: number;
  onPromptCountChange: (count: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

const GenerationSettings: React.FC<GenerationSettingsProps> = ({
  promptCount,
  onPromptCountChange,
  onGenerate,
  isGenerating,
  disabled
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-angrio-orange" />
          <CardTitle className="text-lg font-semibold">Generation Settings</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt-count" className="text-sm font-medium">
            How many creative prompts?
          </Label>
          <Select 
            value={promptCount.toString()} 
            onValueChange={(value) => onPromptCountChange(parseInt(value))}
          >
            <SelectTrigger id="prompt-count">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} prompt{num > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={onGenerate}
          disabled={disabled || isGenerating}
          className="w-full bg-angrio-orange hover:bg-angrio-orange/90 text-white"
          size="lg"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isGenerating ? 'Creating Prompts...' : 'Create Prompts'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GenerationSettings;
