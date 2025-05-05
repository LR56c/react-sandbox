import Image from "next/image"
import { UserButton } from "@stackframe/stack"

export default function AppHeader() {
  return (
   <div className="p-3 shadow-sm flex justify-between items-center">
     <Image src={'./logo.svg'} width={200} height={160} alt=""/>
     <UserButton/>
   </div>
  )
}
