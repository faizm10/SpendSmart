import { createOpenAI } from "@ai-sdk/openai";

const apiKey = process.env.OPENAI_API_KEY;
const organizationId = process.env.OPENAI_ORGANIZATION_ID;

// Create and configure the OpenAI instance with strict typing
export const openai = createOpenAI({
  apiKey,
  organization: organizationId,
  compatibility: "strict",
  headers: {
    "User-Agent": "Boilerplate/1.0",
  },
});

// Type-safe model configurations
export const OPENAI_MODELS = {
  GPT4: "gpt-4-turbo",
  GPT35: "gpt-3.5-turbo",
  EMBEDDING: "text-embedding-3-large",
} as const;

// Helper function to get specific model instances with type safety
export const getOpenAIModel = (modelId: keyof typeof OPENAI_MODELS) => {
  return openai(OPENAI_MODELS[modelId]);
};

// Pre-configured model instances
export const GPT4 = openai(OPENAI_MODELS.GPT4);
export const GPT35 = openai(OPENAI_MODELS.GPT35);
export const EMBEDDING_MODEL = openai.embedding(OPENAI_MODELS.EMBEDDING);

// Enhanced error handling wrapper with specific error types
export class OpenAIError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = "OpenAIError";
  }
}

export async function withErrorHandling<T>(
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof Error && "response" in error) {
      const responseError = error as { response?: { status?: number } };
      if (responseError.response?.status === 429) {
        throw new OpenAIError(
          "Rate limit exceeded. Please try again later.",
          429,
          "rate_limit_exceeded"
        );
      }
    }
    if (error instanceof Error && "response" in error) {
      const responseError = error as { response?: { status?: number } };
      if (responseError.response?.status === 401) {
        throw new OpenAIError(
          "Invalid API key or unauthorized access.",
          401,
          "unauthorized"
        );
      }
    }
    throw error;
  }
}
