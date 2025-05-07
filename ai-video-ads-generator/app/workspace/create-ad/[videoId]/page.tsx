"use client"
import { useParams }           from "next/navigation"
import { useConvex }           from "convex/react"
import { api }                 from "@/convex/_generated/api"
import VideoScript             from "@/components/VideoScript"
import { useEffect, useState } from "react"
import UploadFiles             from "@/components/UploadFiles"

export default function VideoDetail() {
  const [videoData, setVideoData] = useState<any | null>(null)
  const { videoId }               = useParams()
  const convex                    = useConvex()
  const GetVideoData              = async () => {
    const result = await convex.query( api.videoData.GetVideoDataById,
      { id: videoId } )
    setVideoData( result )
  }
  useEffect( () => {
    GetVideoData()
  }, [] )

  const onHandleInputChange = ( field: string, value: string ) => {
    setVideoData( ( prev ) => (
      {
        ...prev,
        [field]: value
      }
    ) )
  }

  return (
    <div>
      <h2 className="font-bold text-2xl">Create Video Ad</h2>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {
          videoData ?
            <div className="md:col-span-2">
              <VideoScript videoData={ videoData }
                           onHandleInputChange={ onHandleInputChange }/>
              <UploadFiles videoData={ videoData }/>
            </div>
            : null
        }
        <div>
          Preview
        </div>
      </div>
    </div>
  )
}
