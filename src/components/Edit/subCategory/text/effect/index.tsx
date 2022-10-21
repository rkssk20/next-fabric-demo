import { fabric } from "fabric"
import Shadow from "@/components/Edit/subCategory/text/effect/Shadow"
import Border from "@/components/Edit/subCategory/text/effect/Border"
import Background from "@/components/Edit/subCategory/text/effect/Background"

const Effect = ({ activeObject }: { activeObject: fabric.Text }) => {
  return (
    <div className="pb-6 px-4 overflow-y-scroll">
      <Shadow activeObject={ activeObject } />
      <Border activeObject={ activeObject } />
      <Background activeObject={ activeObject } />
    </div>
  )
}

export default Effect