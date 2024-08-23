import Anthropic from "@anthropic-ai/sdk";
import axios from "axios";

export async function POST(request) {
  const api_key =
    "";
  const simulatedResponse = { message: "Test response from backend" };
  return new Response(JSON.stringify(simulatedResponse), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  //   return "hi";
  const anthropic = new Anthropic({
    apiKey: apiKey,
  });
}
