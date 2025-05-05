import FeatureAssistant from "@/components/FeatureAssistant"
import History          from "@/components/History"
import Feedback         from "@/components/Feedback"

export default function Page() {
  return (
   <div>
     <FeatureAssistant/>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
       <History/>
       <Feedback/>
     </div>
   </div>
  )
}
