import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    const result = await streamText({
      model: openai("gpt-4-turbo"),
      messages,
      tools: {
        weather: tool({
          description: "Get the weather in a location (farenheit)",
          parameters: z.object({
            location: z
              .string()
              .describe("The location to get the weather for"),
          }),
          execute: async ({ location }) => {
            try {
              const temperature = Math.round(Math.random() * (90 - 32) + 32);
              return {
                location,
                temperature,
              };
            } catch (error) {
              console.error("Weather tool error:", error);
              throw new Error("Failed to get weather information");
            }
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API error:", (error as Error).message);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
