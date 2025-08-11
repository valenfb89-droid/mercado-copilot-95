import { Layout } from "@/components/Layout";
import { AIInsights } from "@/components/AIInsights";
import { AIAnalysisPanel } from "@/components/AIAnalysisPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Lightbulb, Settings } from "lucide-react";

const Insights = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span>IA Insights</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Central de Análise</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights">
            <AIInsights />
          </TabsContent>

          <TabsContent value="analysis">
            <AIAnalysisPanel />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Insights;