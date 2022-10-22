import { fabric } from "fabric"
import Shadow from "@/components/Edit/subCategory/text/effect/shadow"
import Stroke from "@/components/Edit/subCategory/text/effect/stroke"
import Background from "@/components/Edit/subCategory/text/effect/background"

const Effect = ({ activeObject }: { activeObject: fabric.Text }) => {
  return (
    <div className="pb-6 px-4 overflow-y-scroll">
      <Shadow activeObject={ activeObject } />
      <Stroke activeObject={ activeObject } />
      <Background activeObject={ activeObject } />
    </div>
  )
}

export default Effect