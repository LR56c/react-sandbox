import { v }               from "convex/values"
import { mutation, query } from "@/convex/_generated/server"

export const CreateNewVideoData = mutation( {
  args   : {
    userId       : v.string(),
    topic        : v.string(),
    scriptVariant: v.any()
  },
  handler: async ( ctx, args ) => {
    const result = await ctx.db.insert( "videoData", {
        userId       : args.userId,
        topic        : args.topic,
        scriptVariant: args.scriptVariant
      }
    )
    return result
  }
} )

export const GetVideoDataById = query({
  args   : {
    id: v.id('videoData')
  },
  handler: async ( ctx, args ) => {
    const result = await ctx.db.get(  args.id )
    return result
  }
})
