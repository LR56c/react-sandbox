import { Image } from "lucide-react"

interface UploadFilesProps {
  videoData: any
}

export default function UploadFiles( { videoData }: UploadFilesProps ) {
  return (
    <div className="p-5 shadow rounded-xl mt-5">
      <h2 className="font-bold text-lg flex gap-2 items-center">
        <Image className="p-2 bg-green-600 text-white h-10 w-10 rounded-md"/>
        Image/Video Upload
      </h2>
    </div>
  )
}
