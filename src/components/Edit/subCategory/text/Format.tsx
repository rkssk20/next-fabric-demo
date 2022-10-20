import { fabric } from "fabric"
import Style from '@/components/Edit/subCategory/text/format/Style'
import Align from '@/components/Edit/subCategory/text/format/Align'
import FontSize from '@/components/Edit/subCategory/text/format/FontSize'
import Angle from '@/components/Edit/subCategory/text/format/Angle'
import Color from '@/components/Edit/subCategory/text/format/Color'

const Format = ({ activeObject }: { activeObject: fabric.Text }) => {
   return (
    <div className="pb-6 px-4 overflow-y-scroll">
      <FontSize activeObject={ activeObject } />

      <Angle activeObject={ activeObject } />

      <Color activeObject={ activeObject } />

      <Style activeObject={ activeObject } />

      <Align activeObject={ activeObject } />
    </div>
  )
}

export default Format