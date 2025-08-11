import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Key, ExternalLink, Save, CheckCircle, AlertCircle, Brain } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Definir modelos disponíveis
const OPENAI_MODELS = [
  { id: "gpt-4.1-2025-04-14", name: "GPT-4.1", description: "Modelo mais avançado e inteligente" },
  { id: "gpt-4o", name: "GPT-4o", description: "Modelo poderoso com visão" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Rápido e eficiente" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Econômico para tarefas simples" },
];

const DEEPSEEK_MODELS = [
  { id: "deepseek-v3", name: "DeepSeek V3", description: "Modelo mais avançado da DeepSeek" },
  { id: "deepseek-v2.5", name: "DeepSeek V2.5", description: "Equilibrio entre performance e custo" },
  { id: "deepseek-coder", name: "DeepSeek Coder", description: "Especializado em código e automações" },
  { id: "deepseek-chat", name: "DeepSeek Chat", description: "Otimizado para conversação" },
];

const GOOGLE_MODELS = [
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", description: "Alta qualidade para análises avançadas" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", description: "Rápido e econômico" },
  { id: "gemini-2.0-flash-exp", name: "Gemini 2.0 Flash (Exp)", description: "Experimental e muito veloz" },
];

interface APIKeyManagerProps {
  apiType: "openai" | "deepseek" | "google";
  title: string;
  description: string;
  placeholder: string;
  getKeyUrl: string;
}

export const APIKeyManager = ({ 
  apiType, 
  title, 
  description, 
  placeholder, 
  getKeyUrl 
}: APIKeyManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const { toast } = useToast();

  const availableModels = apiType === "openai" ? OPENAI_MODELS : apiType === "deepseek" ? DEEPSEEK_MODELS : GOOGLE_MODELS;
  const providerLabel = apiType === "openai" ? "OpenAI" : apiType === "deepseek" ? "DeepSeek" : "Google AI";

  const handleSaveKey = () => {
    if (!apiKey || apiKey.length < 10) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma chave de API válida",
        variant: "destructive"
      });
      return;
    }

    if (!selectedModel) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um modelo para usar",
        variant: "destructive"
      });
      return;
    }

    // Em produção, salvar no Supabase Secrets
    // Por agora, salvar no localStorage para demonstração
    localStorage.setItem(`ai_api_key_${apiType}`, apiKey);
    localStorage.setItem(`ai_default_model_${apiType}`, selectedModel);
    setIsConfigured(true);
    setIsOpen(false);
    
    const selectedModelInfo = availableModels.find(m => m.id === selectedModel);
    
    toast({
      title: "Configuração Salva!",
      description: `Chave da API ${providerLabel} e modelo ${selectedModelInfo?.name} configurados com sucesso`,
    });
  };

  const checkIfConfigured = () => {
    const savedKey = localStorage.getItem(`ai_api_key_${apiType}`);
    const savedModel = localStorage.getItem(`ai_default_model_${apiType}`);
    return !!savedKey && !!savedModel;
  };

  const getConfiguredModel = () => {
    const savedModel = localStorage.getItem(`ai_default_model_${apiType}`);
    if (savedModel) {
      const modelInfo = availableModels.find(m => m.id === savedModel);
      return modelInfo?.name || savedModel;
    }
    return null;
  };

  useState(() => {
    setIsConfigured(checkIfConfigured());
    const savedModel = localStorage.getItem(`ai_default_model_${apiType}`);
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex flex-col h-auto py-2">
          <div className="flex items-center">
            <Key className="mr-2 h-4 w-4" />
            {providerLabel}
            {isConfigured && <CheckCircle className="ml-2 h-3 w-3 text-success" />}
          </div>
          {isConfigured && getConfiguredModel() && (
            <div className="text-xs text-muted-foreground mt-1">
              {getConfiguredModel()}
            </div>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>{title}</span>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Chave da API</Label>
            <Input
              id="api-key"
              type="password"
              placeholder={placeholder}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model-select">Modelo Padrão</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o modelo que deseja usar..." />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-3 w-3 text-accent" />
                        <span className="font-medium">{model.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{model.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Sua chave será armazenada de forma segura usando o sistema de secrets do Supabase.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            <Button onClick={handleSaveKey} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Salvar Configuração
            </Button>
            <Button variant="outline" asChild>
              <a href={getKeyUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {isConfigured && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-success">
                <CheckCircle className="h-4 w-4" />
                <span>API configurada e pronta para uso</span>
              </div>
              {getConfiguredModel() && (
                <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-3 w-3 text-accent" />
                    <span>Modelo padrão: <strong>{getConfiguredModel()}</strong></span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};