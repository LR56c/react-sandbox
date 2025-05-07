import { NextRequest, NextResponse } from "next/server"
import OpenAI                        from "openai"
import { GENERATE_SCRIPT_PROMPT }    from "@/services/prompt"

const openai = new OpenAI( {
  baseURL: "https://openrouter.ai/api/v1",
  apiKey : process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
} )

export async function POST( request: NextRequest ) {
  const {userInput} = await request.json()
  console.log("api userInput", userInput)
  const prompt = GENERATE_SCRIPT_PROMPT( userInput )
  const completion = await openai.chat.completions.create( {
    model   : "google/gemini-2.0-flash-exp:free",
    messages: [
      {
        role   : "user",
        content: prompt
      }
    ]
  } )
  console.log( "completion", completion )
  console.log( "completion", completion.choices[0].message?.content )
  return NextResponse.json(completion.choices[0].message?.content)
}
