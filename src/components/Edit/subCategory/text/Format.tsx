import { useState } from "react"
import { fabric } from "fabric"
import Style from '@/components/Edit/subCategory/text/format/Style'
import Align from '@/components/Edit/subCategory/text/format/Align'
import FontSize from '@/components/Edit/subCategory/text/format/FontSize'
import Rotation from '@/components/Edit/subCategory/text/format/Rotation'

const Format = ({ activeObject }: { activeObject: fabric.Text }) => {
   return (
    <div className="px-6 overflow-y-scroll">
      <FontSize activeObject={ activeObject } />

      <Rotation activeObject={ activeObject } />

      <Style activeObject={ activeObject } />

      <Align activeObject={ activeObject } />
    </div>
  )
}

export default Format