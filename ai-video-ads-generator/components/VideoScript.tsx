import { Input }    from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface VideoScriptProps {
  videoData?: any
  onHandleInputChange ?: ( field: string, value: string ) => void
}

export default function VideoScript( { videoData, onHandleInputChange }: VideoScriptProps ) {

  return (
    <div className="p-5 shadow rounded-xl">
      <h2 className="font-bold text-lg">Video Ads Scripts</h2>
      <hr className="my-3"/>
      <div className="">
        <label className="text-gray-500">Video Project Topic</label>
        <Input value={ videoData.topic }/>
      </div>
      <div className="mt-3">
        <label className="text-gray-500">Video Script</label>
        <Textarea
          onChange={e=> onHandleInputChange( 'script', e.target.value )}
          className="text-lg" value={ videoData.script ??
          videoData.scriptVariant[0]?.content }/>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-3">
        { videoData.scriptVariant.map( ( script: any, index: number ) => (
          <div key={ index } className={`p-5 text-sm border rounded-lg cursor-pointer ${script.content === videoData.script ? 'border-primary bg-blue-100 text-primary' : ''}`}
               onClick={()=>onHandleInputChange('script', script.content)}
          >
            <h2 className="line-clamp-3">{ script.content }</h2>
          </div>
        ) ) }
      </div>
    </div>
  )
}
