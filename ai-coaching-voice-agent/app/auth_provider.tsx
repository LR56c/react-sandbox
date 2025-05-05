"use client"
import { useUser }     from "@stackframe/stack"
import { useEffect }   from "react"
import { useMutation } from "convex/react"
import { api }         from "@/convex/_generated/api"
import { useUserStore } from "@/store/use_user"

export default function AuthProvider( { children } ) {
  const user       = useUser()
  const CreateUser = useMutation( api.users.CreateUser )
  const setUser = useUserStore( state => state.setUser)
  useEffect( () => {
    if ( user ) {
      createNewUser()
    }
  }, [user] )

  const createNewUser = async () => {
    const result = await CreateUser( {
      name : user?.displayName,
      email: user?.primaryEmail
    } )
    console.log( "result", result )
    setUser( result )
  }
  return (
    <div>
      { children }
    </div>
  )
}
