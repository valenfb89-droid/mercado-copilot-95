// import { supabase } from "@/integrations/supabase/client";

// Mocks removidos. Conecte o backend (Supabase) para habilitar as análises.

export interface AIAnalysisRequest {
  model: string;
  prompt: string;
  analysisType: string;
  productData?: any;
}

export interface AIAnalysisResponse {
  success: boolean;
  model: string;
  analysisType: string;
  response: string;
  usage?: any;
  timestamp: string;
  error?: string;
}

export class AIAnalysisService {
  static async callOpenAI(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    throw new Error('Análises de IA desabilitadas até conectar o backend.');
  }

  static async callDeepSeek(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    throw new Error('Análises de IA desabilitadas até conectar o backend.');
  }

  static async callGoogle(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    throw new Error('Análises de IA desabilitadas até conectar o backend.');
  }
  
  static async executeAnalysis(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const { model } = request;
    
    // Determinar qual API chamar baseado no modelo
    if (model.startsWith('gpt-')) {
      return this.callOpenAI(request);
    } else if (model.startsWith('deepseek-')) {
      return this.callDeepSeek(request);
    } else if (model.startsWith('gemini-')) {
      return this.callGoogle(request);
    } else {
      throw new Error(`Modelo não suportado: ${model}`);
    }
  }

  // Método para salvar resultados no banco (desabilitado)
  static async saveAnalysisResult(
    userId: string,
    productId: string,
    result: AIAnalysisResponse
  ) {
    console.warn('saveAnalysisResult desabilitado sem backend');
    return { success: false } as any;
  }
}