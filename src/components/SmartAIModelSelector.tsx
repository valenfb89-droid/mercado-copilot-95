import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  Key, 
  CheckCircle, 
  AlertCircle,
  Settings
} from "lucide-react";
import { useState } from "react";
import { useAllAIConfigurations } from "@/hooks/useAIConfiguration";
import { APIKeyManager } from "./APIKeyManager";
import { AIModelSelector, type AnalysisType } from "./AIModelSelector";

interface SmartAIModelSelectorProps {
  analysisType: AnalysisType;
  selectedModel?: string;
  onModelSelect: (modelId: string) => void;
  onExecute?: () => void;
  isExecuting?: boolean;
}

export const SmartAIModelSelector = ({ 
  analysisType,
  selectedModel, 
  onModelSelect, 
  onExecute,
  isExecuting = false 
}: SmartAIModelSelectorProps) => {
  const { openai, deepseek, google, hasAnyConfigured } = useAllAIConfigurations();

  // Se nenhuma API está configurada, mostrar configuração primeiro
  if (!hasAnyConfigured) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-warning/10 text-warning">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Configure suas APIs primeiro</CardTitle>
              <CardDescription>
                Para usar as funcionalidades de IA, você precisa configurar pelo menos uma API
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert>
            <Key className="h-4 w-4" />
            <AlertDescription>
              Configure suas chaves de API OpenAI, DeepSeek ou Google AI Studio para começar a usar os modelos de IA.
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-3">
              <h3 className="font-medium">OpenAI</h3>
              <APIKeyManager
                apiType="openai"
                title="Configurar OpenAI API"
                description="Configure sua chave da API OpenAI para usar GPT-4, GPT-3.5 e outros modelos"
                placeholder="sk-..."
                getKeyUrl="https://platform.openai.com/api-keys"
              />
            </div>

            <div className="text-center space-y-3">
              <h3 className="font-medium">DeepSeek</h3>
              <APIKeyManager
                apiType="deepseek"
                title="Configurar DeepSeek API"
                description="Configure sua chave da API DeepSeek para usar modelos especializados"
                placeholder="sk-..."
                getKeyUrl="https://platform.deepseek.com/api_keys"
              />
            </div>

            <div className="text-center space-y-3">
              <h3 className="font-medium">Google AI Studio</h3>
              <APIKeyManager
                apiType="google"
                title="Configurar Google AI Studio"
                description="Configure sua chave para usar os modelos Gemini"
                placeholder="AIza..."
                getKeyUrl="https://aistudio.google.com/app/apikey"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Se pelo menos uma API está configurada, mostrar o seletor normal
  return (
    <div className="space-y-4">
      {/* Status das configurações */}
      <Card className="bg-muted/20">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">APIs Configuradas:</span>
              <div className="flex space-x-2">
                {openai.isConfigured && (
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="mr-1 h-3 w-3 text-success" />
                    OpenAI
                  </Badge>
                )}
                {deepseek.isConfigured && (
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="mr-1 h-3 w-3 text-success" />
                    DeepSeek
                  </Badge>
                )}
                {google.isConfigured && (
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="mr-1 h-3 w-3 text-success" />
                    Google AI
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              {!openai.isConfigured && (
                <APIKeyManager
                  apiType="openai"
                  title="Configurar OpenAI API"
                  description="Configure sua chave da API OpenAI"
                  placeholder="sk-..."
                  getKeyUrl="https://platform.openai.com/api-keys"
                />
              )}
              {!deepseek.isConfigured && (
                <APIKeyManager
                  apiType="deepseek"
                  title="Configurar DeepSeek API"
                  description="Configure sua chave da API DeepSeek"
                  placeholder="sk-..."
                  getKeyUrl="https://platform.deepseek.com/api_keys"
                />
              )}
              {!google.isConfigured && (
                <APIKeyManager
                  apiType="google"
                  title="Configurar Google AI Studio"
                  description="Configure sua chave da API Google AI Studio"
                  placeholder="AIza..."
                  getKeyUrl="https://aistudio.google.com/app/apikey"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seletor de modelo AI normal */}
      <AIModelSelector
        analysisType={analysisType}
        selectedModel={selectedModel}
        onModelSelect={onModelSelect}
        onExecute={onExecute}
        isExecuting={isExecuting}
      />
    </div>
  );
};