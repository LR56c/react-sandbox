import { v }               from "convex/values"
import { mutation, query } from "@/convex/_generated/server"

export const CreateNewRoom = mutation( {
  args   : {
    coachingOption: v.string(),
    topic         : v.string(),
    expertName    : v.string()
  },
  handler: async ( ctx, args ) => {
    const room = await ctx.db.insert( "discussionRoom", {
      coachingOption: args.coachingOption,
      topic         : args.topic,
      expertName    : args.expertName
    } )
    return room
  }
} )


export const GetDiscussionRoom = query( {
  args   : {
    id: v.string(),
  },
  handler: async ( ctx, args ) => {
    const room = await ctx.db.get( args.id )
    return room
  }
} )
