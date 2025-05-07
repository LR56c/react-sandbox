export const GENERATE_SCRIPT_PROMPT=(topic : string)=>`Topic: ${topic}
Depends on user topic generate 3 different video script for 30 seconds video for user in the video, in JSON format.
Schema:[
{
content: string,
}
]
`
