"use client"
import { useParams }                   from "next/navigation"
import { useQuery }                    from "convex/react"
import { api }                         from "@/convex/_generated/api"
import { CoachingExpert }              from "@/services/Options"
import { useEffect, useRef, useState } from "react"
import Image                           from "next/image"
import { UserButton }                  from "@stackframe/stack"
import { Button }                      from "@/components/ui/button"
import RecordRTC                       from "recordrtc"
// const RecordRTC = dynamic( () => import("recordrtc"), { ssr: false } )

export default function DiscussionRoomDetail() {
  const { roomid }                = useParams()
  const [expert, setExpert]       = useState()
  const [enableMic, setEnableMic] = useState( false )
  const DiscussionRoomData        = useQuery(
    api.discussionRoom.GetDiscussionRoom,
    { id: roomid } )
  useEffect( () => {
    if ( !DiscussionRoomData ) return
    const expert = CoachingExpert.find(
      ( expert ) => expert.name === DiscussionRoomData.expertName )
    setExpert( expert )
  }, [DiscussionRoomData] )

  const recorder = useRef( null )
  let silenceTimeout: any

  const disconnect      = ( e ) => {
    e.preventDefault()
    recorder.current.pauseRecording()
    recorder.current = null
    setEnableMic( false )
  }
  const connectToServer = () => {
    setEnableMic( true )
    if ( typeof window !== "undefined" && typeof navigator !== "undefined" ) {
      navigator.mediaDevices.getUserMedia( { audio: true } )
               .then( ( stream ) => {
                 recorder.current = new RecordRTC( stream, {
                   type                 : "audio",
                   mimeType             : "audio/webm;codecs=pcm",
                   recorderType         : RecordRTC.StereoAudioRecorder,
                   timeSlice            : 250,
                   desiredSampRate      : 16000,
                   numberOfAudioChannels: 1,
                   bufferSize           : 4096,
                   audioBitsPerSecond   : 128000,
                   ondataavailable      : async ( blob ) => {
                     // if(!realtimeTranscriber.current) return
                     clearTimeout( silenceTimeout )
                     const buffer = await blob.arrayBuffer()
                     console.log( "buffer", buffer )
                     silenceTimeout = setTimeout( () => {
                       console.log( "Silence detected, stopping recording" )
                     }, 2000 )
                   }
                 } )
                 recorder?.current?.startRecording()
               } )
               .catch( ( error ) => {
                 console.error( "Error accessing microphone", error )
               } )
    }
  }

  return (
    <div className="-mt-12">
      <h2
        className="text-lg font-bold">{ DiscussionRoomData?.coachingOption }</h2>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div
            className="lg:col-span-2 h-[60vh] bg-secondary rounded-4xl relative flex flex-col justify-center items-center">
            <Image src={ expert?.avatar } alt="Avatar"
                   className="h-[80px] w-[80px] rounded-full object-cover animate-pulse"
                   width={ 100 } height={ 100 }/>
            <h2 className="text-gray-500">{ expert?.name }</h2>
            <div
              className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10">
              <UserButton/>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center">
            { !enableMic
              ? <Button onClick={ connectToServer }>Connect</Button>
              : <Button onClick={ disconnect }
                        variant="destructive">Disconnect</Button> }
          </div>
        </div>
        <div>
          <div
            className="h-[60vh] bg-secondary rounded-4xl flex flex-col justify-center items-center">
            <h2>Chat Section</h2>
          </div>
          <h2 className="mt-4 text-gray-4 00">At the end of your conversation we
            will automatically generate feedback/notes from your
            conversation</h2>
        </div>
      </div>
    </div>
  )
}
