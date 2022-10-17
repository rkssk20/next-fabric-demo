import { useState } from "react"
import { fabric } from "fabric"
import Style from '@/components/Edit/subCategory/text/format/Style'
import Align from '@/components/Edit/subCategory/text/format/Align'
import FontSize from '@/components/Edit/subCategory/text/format/FontSize'

const Format = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [fontSize, setFontSize] = useState<number | null>(null)

   return (
    <div className="px-6 overflow-y-scroll">
      <Style activeObject={ activeObject } />

      <Align activeObject={ activeObject } />

      {
        fontSize &&
        <FontSize
          fontSize={ fontSize }
          setFontSize={ setFontSize }
          activeObject={ activeObject }
        />
      }
    </div>
  )
}

export default Format