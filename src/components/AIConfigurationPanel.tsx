import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APIKeyManager } from "./APIKeyManager";
import { useAllAIConfigurations } from "@/hooks/useAIConfiguration";
import { Brain, Settings, CheckCircle, AlertCircle } from "lucide-react";

export const AIConfigurationPanel = () => {
  const { openai, deepseek, google, hasAnyConfigured, hasAllConfigured } = useAllAIConfigurations();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-accent/10 text-accent">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Configuração de APIs</CardTitle>
            <CardDescription>
              Configure suas chaves de API e modelos padrão para começar a usar as funcionalidades de IA
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status Geral */}
        <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
          <div className="flex items-center space-x-2">
            {hasAllConfigured ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : hasAnyConfigured ? (
              <AlertCircle className="h-4 w-4 text-warning" />
            ) : (
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="font-medium">
              {hasAllConfigured 
                ? "Todas as APIs configuradas"
                : hasAnyConfigured 
                ? "Configuração parcial" 
                : "Nenhuma API configurada"
              }
            </span>
          </div>
          <Badge variant={hasAllConfigured ? "default" : "outline"}>
            {(openai.isConfigured ? 1 : 0) + (deepseek.isConfigured ? 1 : 0) + (google.isConfigured ? 1 : 0)} / 3
          </Badge>
        </div>

        {/* Configurações das APIs */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* OpenAI */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-accent" />
                <span className="font-medium">OpenAI</span>
                {openai.isConfigured && <CheckCircle className="h-3 w-3 text-success" />}
              </div>
              <APIKeyManager
                apiType="openai"
                title="Configurar OpenAI API"
                description="Configure sua chave da API OpenAI para usar GPT-4, GPT-3.5 e outros modelos"
                placeholder="sk-..."
                getKeyUrl="https://platform.openai.com/api-keys"
              />
            </div>
            {openai.config.defaultModel && (
              <div className="text-xs text-muted-foreground bg-muted/10 p-2 rounded">
                Modelo padrão: <strong>{openai.config.defaultModel}</strong>
              </div>
            )}
          </div>

          {/* DeepSeek */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-accent" />
                <span className="font-medium">DeepSeek</span>
                {deepseek.isConfigured && <CheckCircle className="h-3 w-3 text-success" />}
              </div>
              <APIKeyManager
                apiType="deepseek"
                title="Configurar DeepSeek API"
                description="Configure sua chave da API DeepSeek para usar modelos especializados em análise de dados"
                placeholder="sk-..."
                getKeyUrl="https://platform.deepseek.com/api_keys"
              />
            </div>
            {deepseek.config.defaultModel && (
              <div className="text-xs text-muted-foreground bg-muted/10 p-2 rounded">
                Modelo padrão: <strong>{deepseek.config.defaultModel}</strong>
              </div>
            )}
          </div>

          {/* Google AI Studio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-accent" />
                <span className="font-medium">Google AI Studio</span>
                {google.isConfigured && <CheckCircle className="h-3 w-3 text-success" />}
              </div>
              <APIKeyManager
                apiType="google"
                title="Configurar Google AI Studio"
                description="Configure sua chave da API Google AI Studio para usar modelos Gemini"
                placeholder="AIza..."
                getKeyUrl="https://aistudio.google.com/app/apikey"
              />
            </div>
            {google.config.defaultModel && (
              <div className="text-xs text-muted-foreground bg-muted/10 p-2 rounded">
                Modelo padrão: <strong>{google.config.defaultModel}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Próximos passos */}
        {hasAllConfigured && (
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 text-success">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Pronto para usar!</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Agora você pode usar todas as funcionalidades de IA do sistema para análises, 
              diagnósticos, copywriting e muito mais.
            </p>
          </div>
        )}

        {!hasAnyConfigured && (
          <div className="p-4 bg-muted/10 border border-muted/20 rounded-lg">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Configure ao menos uma API</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Para começar a usar as funcionalidades de IA, configure pelo menos uma das APIs acima.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};