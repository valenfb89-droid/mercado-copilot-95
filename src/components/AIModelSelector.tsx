import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Zap, 
  DollarSign, 
  Clock, 
  Target,
  BarChart3,
  MessageSquare,
  FileText,
  Users,
  Settings,
  Info,
  Star,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

// Tipos de modelos disponíveis
export type AIModel = {
  id: string;
  name: string;
  provider: "openai" | "deepseek" | "google";
  cost: "low" | "medium" | "high";
  speed: "fast" | "medium" | "slow";
  quality: "good" | "excellent" | "superior";
  description: string;
  bestFor: string[];
  pricePerToken?: string;
};

export type AnalysisType = "diagnosis" | "copywriting" | "benchmarking" | "simulation" | "automation";

const AI_MODELS: AIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    cost: "high",
    speed: "medium",
    quality: "superior",
    description: "Modelo mais avançado para análises complexas e estratégicas",
    bestFor: ["Diagnóstico estratégico", "Justificativas detalhadas", "Análise de contexto"],
    pricePerToken: "$0.005"
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "openai", 
    cost: "medium",
    speed: "fast",
    quality: "excellent",
    description: "Equilibrio perfeito entre qualidade e velocidade",
    bestFor: ["Simulações", "Análise comparativa", "Relatórios médios"],
    pricePerToken: "$0.003"
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    cost: "low",
    speed: "fast", 
    quality: "good",
    description: "Rápido e econômico para tarefas simples",
    bestFor: ["Geração de texto", "Títulos", "Descrições básicas"],
    pricePerToken: "$0.001"
  },
  {
    id: "deepseek-v2",
    name: "DeepSeek-V2",
    provider: "deepseek",
    cost: "medium",
    speed: "medium",
    quality: "excellent", 
    description: "Especialista em análise de dados e benchmarking",
    bestFor: ["Comparação com concorrentes", "Análise quantitativa", "Dados estruturados"],
    pricePerToken: "$0.002"
  },
  {
    id: "deepseek-coder",
    name: "DeepSeek Coder",
    provider: "deepseek",
    cost: "low",
    speed: "fast",
    quality: "good",
    description: "Otimizado para automações e análises técnicas",
    bestFor: ["Automações", "Scripts", "Análises técnicas", "Atributos estruturados"],
    pricePerToken: "$0.001"
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "google",
    cost: "medium",
    speed: "fast",
    quality: "excellent",
    description: "Modelo Google Gemini para análises e texto",
    bestFor: ["Diagnóstico", "Copy", "Simulações"],
    pricePerToken: "$0.002"
  }
];

const ANALYSIS_TYPES = {
  diagnosis: {
    name: "Diagnóstico Estratégico",
    description: "Análise profunda do anúncio, identificação de problemas e oportunidades",
    icon: Target,
    recommended: ["gpt-4o", "gpt-4-turbo"],
    color: "text-red-500"
  },
  copywriting: {
    name: "Copywriting & SEO", 
    description: "Criação de títulos, descrições e textos otimizados",
    icon: FileText,
    recommended: ["gpt-4o", "gpt-3.5-turbo"],
    color: "text-blue-500"
  },
  benchmarking: {
    name: "Benchmarking",
    description: "Comparação detalhada com concorrentes",
    icon: BarChart3,
    recommended: ["deepseek-v2", "gpt-4-turbo"],
    color: "text-purple-500"
  },
  simulation: {
    name: "Simulação de Impacto",
    description: "Previsão de resultados baseada em dados históricos",
    icon: Brain,
    recommended: ["deepseek-v2", "gpt-4o"],
    color: "text-green-500"
  },
  automation: {
    name: "Automação & Scripts",
    description: "Automações técnicas e processamento estruturado",
    icon: Zap,
    recommended: ["deepseek-coder", "gpt-3.5-turbo"],
    color: "text-orange-500"
  }
};

interface AIModelSelectorProps {
  analysisType: AnalysisType;
  selectedModel?: string;
  onModelSelect: (modelId: string) => void;
  onExecute?: () => void;
  isExecuting?: boolean;
}

const ModelCard = ({ 
  model, 
  isSelected, 
  isRecommended, 
  onSelect 
}: { 
  model: AIModel; 
  isSelected: boolean; 
  isRecommended: boolean; 
  onSelect: () => void;
}) => {
  const getCostColor = () => {
    switch (model.cost) {
      case "low": return "text-green-600 bg-green-50 border-green-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high": return "text-red-600 bg-red-50 border-red-200";
    }
  };

  const getQualityColor = () => {
    switch (model.quality) {
      case "good": return "text-blue-600";
      case "excellent": return "text-purple-600";
      case "superior": return "text-accent";
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
        isSelected ? "ring-2 ring-primary shadow-glow" : ""
      } ${isRecommended ? "border-primary/50" : ""}`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{model.name}</CardTitle>
              {isRecommended && <Badge className="bg-primary/10 text-primary border-primary/20">Recomendado</Badge>}
              {isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
            </div>
            <Badge variant="outline" className="text-xs">
              {model.provider === "openai" ? "OpenAI" : "DeepSeek"}
            </Badge>
          </div>
          <div className="text-right">
            <Badge className={getCostColor()}>
              {model.cost === "low" ? "Econômico" : model.cost === "medium" ? "Moderado" : "Premium"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{model.description}</p>
        
        {/* Características */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="h-3 w-3 mr-1" />
              <span className="font-medium">Custo</span>
            </div>
            <Badge variant="outline" className={getCostColor()}>
              {model.cost}
            </Badge>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-3 w-3 mr-1" />
              <span className="font-medium">Velocidade</span>
            </div>
            <span className="text-muted-foreground">{model.speed}</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="h-3 w-3 mr-1" />
              <span className="font-medium">Qualidade</span>
            </div>
            <span className={getQualityColor()}>{model.quality}</span>
          </div>
        </div>

        {/* Melhor para */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-2">Melhor para:</div>
          <div className="flex flex-wrap gap-1">
            {model.bestFor.slice(0, 2).map((use, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {use}
              </Badge>
            ))}
            {model.bestFor.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{model.bestFor.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Preço */}
        {model.pricePerToken && (
          <div className="text-xs text-muted-foreground">
            <DollarSign className="h-3 w-3 inline mr-1" />
            {model.pricePerToken}/1K tokens
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const AIModelSelector = ({ 
  analysisType, 
  selectedModel, 
  onModelSelect, 
  onExecute,
  isExecuting = false 
}: AIModelSelectorProps) => {
  const [selectedTab, setSelectedTab] = useState<"recommended" | "all">("recommended");
  
  const analysisConfig = ANALYSIS_TYPES[analysisType];
  const Icon = analysisConfig.icon;
  
  const recommendedModels = AI_MODELS.filter(model => 
    analysisConfig.recommended.includes(model.id)
  );
  
  const allModels = AI_MODELS;
  const modelsToShow = selectedTab === "recommended" ? recommendedModels : allModels;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-muted/20 ${analysisConfig.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">{analysisConfig.name}</CardTitle>
            <CardDescription>{analysisConfig.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recommended">Recomendados</TabsTrigger>
            <TabsTrigger value="all">Todos os Modelos</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {recommendedModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  isSelected={selectedModel === model.id}
                  isRecommended={true}
                  onSelect={() => onModelSelect(model.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  isSelected={selectedModel === model.id}
                  isRecommended={analysisConfig.recommended.includes(model.id)}
                  onSelect={() => onModelSelect(model.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Seleção rápida via dropdown */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Seleção Rápida:</span>
          </div>
          <Select value={selectedModel} onValueChange={onModelSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha um modelo de IA..." />
            </SelectTrigger>
            <SelectContent>
              {AI_MODELS.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center space-x-2">
                    <span>{model.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {model.provider}
                    </Badge>
                    {analysisConfig.recommended.includes(model.id) && (
                      <Badge className="text-xs bg-primary/10 text-primary">Rec.</Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Informações do modelo selecionado */}
        {selectedModel && (
          <div className="p-4 bg-muted/20 rounded-lg space-y-2">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-accent" />
              <span className="font-medium text-accent">Modelo Selecionado:</span>
            </div>
            {(() => {
              const model = AI_MODELS.find(m => m.id === selectedModel);
              return model ? (
                <div>
                  <div className="font-medium">{model.name} ({model.provider})</div>
                  <div className="text-sm text-muted-foreground">{model.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Custo: {model.cost} • Velocidade: {model.speed} • Qualidade: {model.quality}
                    {model.pricePerToken && ` • ${model.pricePerToken}/1K tokens`}
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}

        {/* Botão de execução */}
        {onExecute && selectedModel && (
          <Button 
            onClick={onExecute} 
            disabled={isExecuting}
            className="w-full"
            variant="ai"
          >
            {isExecuting ? (
              <>
                <Brain className="mr-2 h-4 w-4 animate-spin" />
                Executando Análise...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Executar {analysisConfig.name}
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// Hook para usar a seleção de modelo
export const useAIModelSelection = () => {
  const [selectedModels, setSelectedModels] = useState<Record<AnalysisType, string>>({
    diagnosis: "gpt-4o",
    copywriting: "gpt-4o", 
    benchmarking: "deepseek-v2",
    simulation: "deepseek-v2",
    automation: "deepseek-coder"
  });

  const selectModel = (analysisType: AnalysisType, modelId: string) => {
    setSelectedModels(prev => ({
      ...prev,
      [analysisType]: modelId
    }));
  };

  const getSelectedModel = (analysisType: AnalysisType) => {
    return selectedModels[analysisType];
  };

  const getModelInfo = (modelId: string) => {
    return AI_MODELS.find(model => model.id === modelId);
  };

  return {
    selectedModels,
    selectModel,
    getSelectedModel,
    getModelInfo,
    allModels: AI_MODELS,
    analysisTypes: ANALYSIS_TYPES
  };
};