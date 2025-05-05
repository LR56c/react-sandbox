import { mutation } from "@/convex/_generated/server"
import { v }        from "convex/values"

export const CreateUser = mutation( {
  args   : {
    name : v.string(),
    email: v.string()
  },
  handler: async ( ctx, args ) => {
    const user = await ctx.db.query( "users" ).filter(
      ( q ) => q.eq( q.field( "email" ), args.email )
    ).first()

    if ( user ) {
      throw  new Error( "User already exists" )
    }
    return await ctx.db.insert( "users", {
      name         : args.name,
      email        : args.email,
      credits      : 5000,
    } )
  }
} )
