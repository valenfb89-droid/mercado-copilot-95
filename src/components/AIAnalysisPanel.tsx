import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APIKeyManager } from "./APIKeyManager";
import { AIModelSelector, useAIModelSelection, type AnalysisType } from "./AIModelSelector";
import { AIAnalysisService, type AIAnalysisRequest } from "@/services/aiAnalysisService";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Target, 
  FileText, 
  BarChart3, 
  Zap,
  Play,
  Settings,
  History,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Key,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

// Resultados mock removidos

interface AnalysisResultProps {
  type: AnalysisType;
  result: any;
}

const AnalysisResult = ({ type, result }: AnalysisResultProps) => {
  const getStatusIcon = () => {
    switch (result.status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending": return <Clock className="h-4 w-4 text-warning" />;
      case "error": return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Brain className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = () => {
    switch (result.priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{result.title}</CardTitle>
            <CardDescription className="flex items-center space-x-2 mt-1">
              {getStatusIcon()}
              <span>{result.timestamp}</span>
              <Badge variant="outline">{result.model}</Badge>
            </CardDescription>
          </div>
          <Badge variant={getPriorityColor() as any}>
            {result.priority}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Resultados específicos por tipo */}
        {type === "diagnosis" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Score de Otimização</span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-accent">{result.score || 85}%</span>
                <TrendingUp className="h-4 w-4 text-success" />
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Análise:</span>
              {result.insights ? (
                result.insights.map((insight: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-2 text-sm">
                    <AlertCircle className="h-3 w-3 text-warning mt-0.5 flex-shrink-0" />
                    <span>{insight}</span>
                  </div>
                ))
              ) : result.response ? (
                <div className="text-sm p-3 bg-muted/20 rounded border-l-2 border-primary whitespace-pre-wrap">
                  {result.response}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Nenhum resultado disponível</div>
              )}
            </div>
          </div>
        )}

        {type === "copywriting" && result.status === "completed" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Impacto Estimado</span>
              <Badge className="bg-success/10 text-success border-success/20">
                {result.estimatedImpact || "+15% melhoria estimada"}
              </Badge>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Análise:</span>
              {result.suggestions ? (
                result.suggestions.map((suggestion: string, idx: number) => (
                  <div key={idx} className="text-sm p-2 bg-muted/20 rounded border-l-2 border-primary">
                    {suggestion}
                  </div>
                ))
              ) : result.response ? (
                <div className="text-sm p-3 bg-muted/20 rounded border-l-2 border-primary whitespace-pre-wrap">
                  {result.response}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Nenhum resultado disponível</div>
              )}
            </div>
          </div>
        )}

        {type === "benchmarking" && (
          <div className="space-y-3">
            <span className="text-sm font-medium text-muted-foreground">Análise:</span>
            {result.competitors ? (
              <>
                <span className="text-sm font-medium text-muted-foreground">Top 3 Concorrentes:</span>
                {result.competitors.map((competitor: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">#{competitor.position}</Badge>
                      <span className="font-medium">{competitor.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{competitor.advantage}</span>
                  </div>
                ))}
                <div className="text-sm text-accent font-medium">{result.opportunities}</div>
              </>
            ) : result.response ? (
              <div className="text-sm p-3 bg-muted/20 rounded border-l-2 border-primary whitespace-pre-wrap">
                {result.response}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">Nenhum resultado disponível</div>
            )}
          </div>
        )}

        {/* Ações */}
        <div className="flex space-x-2 pt-2 border-t">
          {result.status === "completed" ? (
            <>
              <Button size="sm" variant="ai">
                <Play className="mr-2 h-3 w-3" />
                Aplicar Sugestões
              </Button>
              <Button size="sm" variant="outline">
                <History className="mr-2 h-3 w-3" />
                Ver Detalhes
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" disabled>
              <Clock className="mr-2 h-3 w-3" />
              Processando...
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const AIAnalysisPanel = () => {
  const { selectedModels, selectModel, getSelectedModel } = useAIModelSelection();
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisType>("diagnosis");
  const [executingAnalysis, setExecutingAnalysis] = useState<Record<AnalysisType, boolean>>({
    diagnosis: false,
    copywriting: false,
    benchmarking: false,
    simulation: false,
    automation: false
  });
  const [analysisResults, setAnalysisResults] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleExecuteAnalysis = async (type: AnalysisType) => {
    const selectedModel = getSelectedModel(type);
    
    if (!selectedModel) {
      toast({
        title: "Erro",
        description: "Selecione um modelo de IA antes de executar a análise",
        variant: "destructive"
      });
      return;
    }

    setExecutingAnalysis(prev => ({ ...prev, [type]: true }));

    try {
      const request: AIAnalysisRequest = {
        model: selectedModel,
        prompt: `Realize uma análise ${type} detalhada.`,
        analysisType: type,
        productData: undefined
      };

      const result = await AIAnalysisService.executeAnalysis(request);

      if (result.success) {
        setAnalysisResults(prev => ({
          ...prev,
          [type]: {
            ...result,
            title: getAnalysisTitle(type),
            status: "completed",
            timestamp: "Agora mesmo",
            priority: "high"
          }
        }));

        toast({
          title: "Análise Concluída!",
          description: `Análise ${type} executada com sucesso usando ${selectedModel}`,
        });
      } else {
        throw new Error(result.error || "Erro na análise");
      }

    } catch (error: any) {
      console.error('Error executing analysis:', error);
      
      toast({
        title: "Erro na Análise",
        description: error.message || "Falha ao executar análise. Verifique as configurações da API.",
        variant: "destructive"
      });
    } finally {
      setExecutingAnalysis(prev => ({ ...prev, [type]: false }));
    }
  };

  const getAnalysisTitle = (type: AnalysisType) => {
    const titles = {
      diagnosis: "Diagnóstico Estratégico Completo",
      copywriting: "Otimização de Copy & SEO", 
      benchmarking: "Análise Competitiva",
      simulation: "Simulação de Impacto",
      automation: "Automação Inteligente"
    };
    return titles[type];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Central de Análise IA</h1>
          <p className="text-muted-foreground">
            Configure e execute análises inteligentes com diferentes modelos de IA
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:justify-end">
          <APIKeyManager
            apiType="openai"
            title="Configurar OpenAI API"
            description="Insira sua chave da API do OpenAI para usar GPT-4o, GPT-4-Turbo e GPT-3.5"
            placeholder="sk-..."
            getKeyUrl="https://platform.openai.com/api-keys"
          />
          
          <APIKeyManager
            apiType="deepseek"
            title="Configurar DeepSeek API"
            description="Insira sua chave da API do DeepSeek para análises avançadas"
            placeholder="sk-..."
            getKeyUrl="https://platform.deepseek.com/api_keys"
          />

          <APIKeyManager
            apiType="google"
            title="Configurar Google AI Studio"
            description="Insira sua chave do Google AI Studio para usar Gemini"
            placeholder="AIza..."
            getKeyUrl="https://aistudio.google.com/app/apikey"
          />
          
          <Button size="sm" variant="ai" className="w-full sm:w-auto" onClick={() => handleExecuteAnalysis(activeAnalysis)}>
            <Brain className="mr-2 h-4 w-4" />
            Análise Completa
          </Button>
        </div>
      </div>

      {/* Alerta de configuração */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Configuração necessária:</strong> Para usar as análises de IA, configure suas chaves de API acima.
          <div className="mt-2 space-x-2">
            <Button variant="outline" size="sm" asChild>
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-3 w-3" />
                Obter chave OpenAI
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-3 w-3" />
                Obter chave DeepSeek
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-3 w-3" />
                Obter chave Google AI
              </a>
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <Tabs value={activeAnalysis} onValueChange={(v) => setActiveAnalysis(v as AnalysisType)}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="diagnosis">
            <Target className="mr-2 h-4 w-4" />
            Diagnóstico
          </TabsTrigger>
          <TabsTrigger value="copywriting">
            <FileText className="mr-2 h-4 w-4" />
            Copywriting
          </TabsTrigger>
          <TabsTrigger value="benchmarking">
            <BarChart3 className="mr-2 h-4 w-4" />
            Benchmarking
          </TabsTrigger>
          <TabsTrigger value="simulation">
            <Brain className="mr-2 h-4 w-4" />
            Simulação
          </TabsTrigger>
          <TabsTrigger value="automation">
            <Zap className="mr-2 h-4 w-4" />
            Automação
          </TabsTrigger>
        </TabsList>

        {(["diagnosis", "copywriting", "benchmarking", "simulation", "automation"] as AnalysisType[]).map((type) => (
          <TabsContent key={type} value={type} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Seletor de Modelo */}
              <AIModelSelector
                analysisType={type}
                selectedModel={getSelectedModel(type)}
                onModelSelect={(modelId) => selectModel(type, modelId)}
                onExecute={() => handleExecuteAnalysis(type)}
                isExecuting={executingAnalysis[type]}
              />

              {/* Resultados */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold">Últimos Resultados</h3>
                </div>
                
                {analysisResults[type] ? (
                  <AnalysisResult 
                    type={type} 
                    result={analysisResults[type]} 
                  />
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <Brain className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="font-medium mb-2">Nenhuma análise executada</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Selecione um modelo de IA e execute a análise para ver os resultados
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => handleExecuteAnalysis(type)}
                        disabled={!getSelectedModel(type)}
                      >
                        Executar Primeira Análise
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Resumo das Configurações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Configuração Atual dos Modelos</span>
          </CardTitle>
          <CardDescription>
            Modelos de IA configurados para cada tipo de análise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(['diagnosis','copywriting','benchmarking','simulation','automation'] as AnalysisType[]).map((type) => {
              const selectedModelId = getSelectedModel(type);
              const analysisConfig = {
                diagnosis: { name: "Diagnóstico", icon: Target, color: "text-red-500" },
                copywriting: { name: "Copywriting", icon: FileText, color: "text-blue-500" },
                benchmarking: { name: "Benchmarking", icon: BarChart3, color: "text-purple-500" },
                simulation: { name: "Simulação", icon: Brain, color: "text-green-500" },
                automation: { name: "Automação", icon: Zap, color: "text-orange-500" }
              }[type];
              
              return (
                <div key={type} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                  <analysisConfig.icon className={`h-4 w-4 ${analysisConfig.color}`} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{analysisConfig.name}</div>
                    <div className="text-xs text-muted-foreground">{selectedModelId}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};