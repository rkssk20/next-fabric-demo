import { fabric } from "fabric"
import FontSize from '@/components/Edit/subCategory/text/format/FontSize'
import Angle from '@/components/Edit/subCategory/text/format/Angle'
import Opacity from '@/components/Edit/subCategory/text/format/Opacity'
import Color from '@/components/Edit/subCategory/text/format/Color'
import Align from '@/components/Edit/subCategory/text/format/Align'
import Style from '@/components/Edit/subCategory/text/format/Style'

const Format = ({ activeObject }: { activeObject: fabric.Text }) => {
   return (
    <div className="pb-6 px-4 overflow-y-scroll">
      <FontSize activeObject={ activeObject } />
      <Angle activeObject={ activeObject } />
      <Opacity activeObject={ activeObject } />
      <Color activeObject={ activeObject } />
      <Style activeObject={ activeObject } />
      <Align activeObject={ activeObject } />
    </div>
  )
}

export default Format