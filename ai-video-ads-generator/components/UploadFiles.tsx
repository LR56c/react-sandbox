import { FilePlus2, Image as ImageIcon, X } from "lucide-react"
import { useState }                         from "react"
import Image from "next/image"

interface UploadFilesProps {
  videoData: any
}

export default function UploadFiles( { videoData }: UploadFilesProps ) {
  const [files, setFiles] = useState<File[]>( [] )
  const handleFileChange  = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const files = event.target.files
    if ( files ) {
      const fileArray = Array.from( files )
      setFiles( (prevFiles) => [ ...prevFiles, ...fileArray ] )
      // const fileUrls = fileArray.map( ( file ) => URL.createObjectURL( file ) )
    }
  }
  const removeIndex = ( index: number ) => {
    const newFiles = files.filter( ( file, i ) => i !== index )
    setFiles( newFiles )
  }
  return (
    <div className="p-5 shadow rounded-xl mt-5">
      <h2 className="font-bold text-lg flex gap-2 items-center">
        <ImageIcon className="p-2 bg-green-600 text-white h-10 w-10 rounded-md"/>
        Image/Video Upload
      </h2>
      <hr className="my-3"/>
      <div className="">
        <label className="text-gray-500">Upload Image or video for yours
          ads</label>
        <label htmlFor="fileUpload">
          <div
            className="p-6 bg-secondary cursor-pointer border border-dashed mt-2 rounded-xl flex items-center flex-col">
            <FilePlus2 className="h-10 w-10 text-gray-400"/>
            <h2>Click here to Upload files</h2>
          </div>
        </label>
      </div>
      <input type="file" id="fileUpload" className="hidden"
             accept="image/*, video/*" multiple={ true }
             onChange={ handleFileChange }
      />
      <div className="grid grid-cols2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">
        { files.map( ( file, index ) => {
          const previewUrl = URL.createObjectURL( file )
          return <div className="relative" key={index}>
            <X className="absolute text-sm" onClick={()=>removeIndex(index)}/>
            <Image src={previewUrl} alt="images" width={150} height={150} className="w-[90px] h-[70px] object-cover rounded-lg"/>
          </div>
        } ) }
      </div>
    </div>
  )
}
