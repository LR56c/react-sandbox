"use client"
import { useConvex, useMutation, useQuery } from "convex/react"
import { api }                              from "@/convex/_generated/api"
import { useUser }                         from "@clerk/nextjs"
import { useEffect }                       from "react"
import { useUserDetailStore }              from "@/store/useUserDetail"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar                          from "@/components/AppSidebar"

export default function WorkspaceProvider( { children } ) {
  const newUser  = useMutation( api.users.CreateNewUser )
  const convex = useConvex()
  const setUser  = useUserDetailStore( ( state ) => state.setUser )
  const userDetail  = useUserDetailStore( ( state ) => state.user )
  const { user } = useUser()
  useEffect( () => {
    if ( user ) {
      handleNewUser()
    }
  }, [user] )
  const handleNewUser = async () => {
    if( userDetail ) return

    const userDb = await convex.query(api.users.GetUserByEmail, { email: user?.primaryEmailAddress?.emailAddress })
    if( userDb ) {
      setUser( userDb )
      return
    }

    const result = await newUser( {
      name   : user?.fullName!,
      email  : user?.primaryEmailAddress?.emailAddress!,
      picture: user?.imageUrl!,
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
