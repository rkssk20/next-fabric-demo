import { useState } from "react"
import { fabric } from "fabric"
import Style from '@/components/Edit/subCategory/text/format/Style'
import Align from '@/components/Edit/subCategory/text/format/Align'
import FontSize from '@/components/Edit/subCategory/text/format/FontSize'

const Format = ({ canvas }: { canvas: fabric.Canvas }) => {
  const [fontSize, setFontSize] = useState<number | null>(null)

   return (
    <div className="px-6 overflow-y-scroll">
      <Style canvas={ canvas } />

      <Align canvas={ canvas } />

      {
        fontSize &&
        <FontSize
          fontSize={ fontSize }
          setFontSize={ setFontSize }
          canvas={ canvas }
        />
      }
    </div>
  )
}

export default Format