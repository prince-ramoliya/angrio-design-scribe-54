
import React from 'react';
import { Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-angrio-orange" />
          <div>
            <CardTitle className="text-lg font-semibold">Select AI Model</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Advanced model for richer, more detailed prompts
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
            <SelectItem value="dalle-3">DALL·E 3</SelectItem>
            <SelectItem value="midjourney-v6">Midjourney V6</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default ModelSelector;
