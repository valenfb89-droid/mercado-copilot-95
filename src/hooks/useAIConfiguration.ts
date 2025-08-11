import { useState, useEffect } from "react";

export type AIProvider = "openai" | "deepseek" | "google";

export interface AIConfiguration {
  apiKey: string | null;
  defaultModel: string | null;
  isConfigured: boolean;
}

export const useAIConfiguration = (provider: AIProvider) => {
  const [config, setConfig] = useState<AIConfiguration>({
    apiKey: null,
    defaultModel: null,
    isConfigured: false
  });

  const loadConfiguration = () => {
    const apiKey = localStorage.getItem(`ai_api_key_${provider}`);
    const defaultModel = localStorage.getItem(`ai_default_model_${provider}`);
    
    setConfig({
      apiKey,
      defaultModel,
      isConfigured: !!(apiKey && defaultModel)
    });
  };

  const updateConfiguration = (apiKey: string, model: string) => {
    localStorage.setItem(`ai_api_key_${provider}`, apiKey);
    localStorage.setItem(`ai_default_model_${provider}`, model);
    loadConfiguration();
  };

  const clearConfiguration = () => {
    localStorage.removeItem(`ai_api_key_${provider}`);
    localStorage.removeItem(`ai_default_model_${provider}`);
    loadConfiguration();
  };

  useEffect(() => {
    loadConfiguration();
  }, [provider]);

  return {
    config,
    loadConfiguration,
    updateConfiguration,
    clearConfiguration,
    isConfigured: config.isConfigured
  };
};

// Hook para obter todas as configurações
export const useAllAIConfigurations = () => {
  const openai = useAIConfiguration("openai");
  const deepseek = useAIConfiguration("deepseek");
  const google = useAIConfiguration("google");

  return {
    openai,
    deepseek,
    google,
    hasAnyConfigured: openai.isConfigured || deepseek.isConfigured || google.isConfigured,
    hasAllConfigured: openai.isConfigured && deepseek.isConfigured && google.isConfigured
  };
};