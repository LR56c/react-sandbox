import { mutation } from "@/convex/_generated/server"
import { v }        from "convex/values"

export const CreateNewUser = mutation( {
  args   : {
    name   : v.string(),
    email  : v.string(),
    picture: v.string()
  },
  handler: async ( ctx, args ) => {
    const user = await ctx.db.query( "users" ).filter(
      q => q.eq( q.field( "email" ), args.email )
    ).first()
    if ( user ) throw new Error( "User already exists" )
    const data   = {
      name   : args.name,
      email  : args.email,
      picture: args.picture,
      credits: 5000
    }
    const result = await ctx.db.insert( "users", data )
    return { _id: result, ...data }
  }
} )
