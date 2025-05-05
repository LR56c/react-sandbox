"use client"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
}                         from "@/components/ui/dialog"
import { Textarea }       from "@/components/ui/textarea"
import { CoachingExpert } from "@/services/Options"
import Image              from "next/image"
import { useState }       from "react"
import { Button }         from "@/components/ui/button"
import { useMutation }    from "convex/react"
import { api }            from "@/convex/_generated/api"
import { LoaderCircle }   from "lucide-react"
import { useRouter }      from "next/router"


export default function UserInputDialog( { children, coachingOption } ) {
  const router = useRouter()

  const [selectedExpert, setSelectedExpert] = useState()
  const [topic, setTopic]                   = useState()
  const [loading, setLoading]               = useState( false )
  const [openDialog, setOpenDialog] = useState(true)
  const createDiscussionRoom                = useMutation(
    api.discussionRoom.CreateNewRoom )
  const onClickNext                         = async () => {
    setLoading( true )
    const result = await createDiscussionRoom( {
      coachingOption: coachingOption.name,
      topic         : topic,
      expertName    : selectedExpert
    } )
    setLoading( false )
    setOpenDialog(false)
    await router.push( `/discussion-room/${ result }` )
  }
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>{ children }</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ coachingOption.name }</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-3">
              <h2 className="text-black">Enter a topic to master your skills
                in { coachingOption.name }</h2>
              <Textarea placeholder="Enter your topic here.." className="mt-2"
                        onChange={ ( e ) => setTopic( e.target.value ) }/>
              <h2 className="text-black mt-5">Select yorr coaching expert</h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mt-3">
                { CoachingExpert.map( ( option, index ) => (
                  <div key={ index }
                       className={ `` }
                       onClick={ () => setSelectedExpert( option.name ) }>
                    <Image src={ option.avatar }
                           alt={ option.name }
                           key={ index }
                           width={ 100 }
                           height={ 100 }
                           className={ `rounded-2xl h-[80px] w-[80px] object-cover hover:scale-105 transition-all cursor-pointer p-1 ${ selectedExpert ===
                           option.name ? "border-2 border-blue-500" : "" }` }
                    />
                    <h2 className="text-center">{ option.name }</h2>
                  </div>
                ) ) }
              </div>
              <div className="flex gap-5 justify-end mt-5">
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button onClick={ onClickNext }
                        disabled={ !topic || !selectedExpert || loading }>
                  { loading ? <LoaderCircle className="animate-spin"/> : null }
                  Next
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
