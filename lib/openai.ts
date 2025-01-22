import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface GenerateContentOptions {
  title: string
  content: string
  platform: 'TWITTER' | 'LINKEDIN' | 'FACEBOOK' | 'INSTAGRAM'
  maxLength?: number
}

const PLATFORM_PROMPTS = {
  TWITTER: `Create a concise and engaging tweet that captures the essence of the content. 
    Include relevant hashtags and maintain a professional tone. 
    Focus on the most interesting or impactful aspect.
    Maximum length: 280 characters.`,
  
  LINKEDIN: `Create a professional LinkedIn post that highlights the key insights and value of the content. 
    Use a business-appropriate tone and format with paragraphs for readability. 
    Include relevant hashtags and a call to action.
    Maximum length: 3000 characters.`,
  
  FACEBOOK: `Create an engaging Facebook post that presents the content in a conversational yet professional way. 
    Include relevant hashtags and encourage engagement.
    Focus on creating a discussion around the main topic.
    Maximum length: 63,206 characters.`,
  
  INSTAGRAM: `Create an Instagram-style caption that's both visually descriptive and engaging. 
    Include relevant hashtags and maintain a professional yet approachable tone.
    Focus on the visual aspects and key takeaways.
    Maximum length: 2,200 characters.`,
}

export async function generateSocialContent({
  title,
  content,
  platform,
  maxLength,
}: GenerateContentOptions): Promise<string> {
  const prompt = PLATFORM_PROMPTS[platform]
  
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional social media content creator for a geological consulting firm. 
          Your task is to create platform-specific content that maintains a professional tone while being engaging.
          ${prompt}`
      },
      {
        role: "user",
        content: `Title: ${title}\n\nContent: ${content}`
      }
    ],
    max_tokens: maxLength ? Math.floor(maxLength / 4) : 500,
    temperature: 0.7,
  })

  return response.choices[0]?.message?.content || ''
}

export async function generateExcerpt(content: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Create a concise and engaging excerpt (150-200 words) that summarizes the main points 
          and value proposition of the content. The excerpt should be professional and informative, 
          encouraging readers to read the full article.`
      },
      {
        role: "user",
        content: content
      }
    ],
    max_tokens: 100,
    temperature: 0.7,
  })

  return response.choices[0]?.message?.content || ''
} 