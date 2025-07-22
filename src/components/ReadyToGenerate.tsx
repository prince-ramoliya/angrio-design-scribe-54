
import React from 'react';
import { Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReadyToGenerate: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Wand2 className="w-5 h-5 text-angrio-orange" />
          <CardTitle className="text-lg font-semibold">Ready to Generate</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Fill out the form on the left and click "Create Prompts" to generate unique, 
          professional design briefs tailored to your topic and brand guidelines.
        </p>
      </CardContent>
    </Card>
  );
};

export default ReadyToGenerate;
