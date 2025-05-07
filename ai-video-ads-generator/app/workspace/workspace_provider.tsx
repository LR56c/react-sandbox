"use client"
import { useMutation }                     from "convex/react"
import { api }                             from "@/convex/_generated/api"
import { useUser }                         from "@clerk/nextjs"
import { useEffect }                       from "react"
import { useUserDetailStore }              from "@/store/useUserDetail"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar                          from "@/components/AppSidebar"

export default function WorkspaceProvider( { children } ) {
  const newUser  = useMutation( api.users.CreateNewUser )
  const setUser  = useUserDetailStore( ( state ) => state.setUser )
  const { user } = useUser()
  useEffect( () => {
    if ( user ) {
      handleNewUser()
    }
  }, [user] )
  const handleNewUser = async () => {
    const result = await newUser( {
      name   : user?.fullName,
      email  : user?.primaryEmailAddress,
      picture: user?.imageUrl
    } )
    setUser( result )
  }
  return (
    <div>
      <SidebarProvider>
        <AppSidebar/>
        <div className="w-full p-10">
          <SidebarTrigger/>
          { children }
        </div>
      </SidebarProvider>
    </div>
  )
}
