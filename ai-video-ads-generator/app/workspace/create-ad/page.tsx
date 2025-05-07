"use client"
import { Input }  from "@/components/ui/input"
import { Button }                 from "@/components/ui/button"
import { LoaderCircle, Sparkles } from "lucide-react"
import Image                      from "next/image"
import { useState } from "react"
import axios from "axios"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useUserDetailStore } from "@/store/useUserDetail"
import { useRouter } from "next/navigation"

export default function CreateAd() {
  const router = useRouter()
  const [userInput, setUserInput] = useState("")
  const [loading, setLoading] = useState(false)
  const user = useUserDetailStore(state => state.user)
  const createNewVideoData = useMutation(api.videoData.CreateNewVideoData)
  const handleGenerateVideoScript = async ()=>{
    setLoading(true)
    const result = await axios.post('/api/generate-script',{
      userInput: userInput
    })
    const jsonContent = JSON.parse( result.data.replace( "```json", "" ).replace( "```", "" ) ) ?? []
    console.log("jsonContent", jsonContent)
    const saved = await createNewVideoData({
      userId: user?._id,
      topic: userInput,
      scriptVariant:jsonContent,
    })
    console.log("saved", saved)
    setLoading(false)
    router.push(`/workspace/create-ad/${saved}`)
  }
  return (
    <div className="p-10 mt-32 flex flex-col items-center justify-center w-full p-7 roder rounded-2xl border-dotted">
      <div>
        <Image src={'/advertisement.png'} alt="icon" width={150} height={150}/>
      </div>
      <h2 className="font-bold text-center text-2xl">Create AI Video Ads</h2>
      <p className="mt-3 text-lg text-gray-500">
        Turn your text into a stunning video ad in minutes. Our AI-powered
      </p>
      <Input className="w-md text-lg mt-5"
             onChange={(e)=>setUserInput(e.target.value)}
             placeholder="Enter the topic or product info"/>
      <Button disabled={loading} onClick={handleGenerateVideoScript} className="mt-5 w-md">
        {loading ? <LoaderCircle className="animate-spin"/> : <Sparkles/>}
        Generate</Button>
    </div>
  )
}
