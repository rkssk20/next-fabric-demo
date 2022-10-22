import { useState, useEffect } from 'react'
import { fabric } from "fabric"
import { ShadowState } from '@/types/type'
import RGBtoHex from '@/lib/RGBtoHEX'
import Toggle from '@/atoms/Toggle'
import Blur from '@/components/Edit/subCategory/text/effect/shadow/Blur'
import Opacity from '@/components/Edit/subCategory/text/effect/shadow/Opacity'
import Color from '@/components/Edit/subCategory/text/effect/shadow/Color'
import OffsetY from '@/components/Edit/subCategory/text/effect/shadow/OffsetY'
import OffsetX from '@/components/Edit/subCategory/text/effect/shadow/OffsetX'

const Shadow = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [value, setValue] = useState<ShadowState | null>(null)
  
  useEffect(() => {
    if(activeObject.shadow) {
      const shadow = activeObject.shadow as fabric.Shadow
      const rgba = shadow.color?.replace('rgba(', '').replace(')', '').split(',')
      const hex = rgba ? RGBtoHex(rgba.slice(0, 3)) : '#000000'

      setValue({
        rgb: rgba ? `${ rgba[0] },${ rgba[1] },${ rgba[2] }` : '0,0,0',
        hex,
        opacity: rgba ? Number(rgba[3]) : 0.3,
        offsetX: shadow.offsetX ?? 1,
        offsetY: shadow.offsetY ?? 1,
        blur: shadow.blur ?? 1
      })
    }
  }, [activeObject])

  const handleShadow = () => {
    if(!value) {
      setValue({
        rgb: '0,0,0',
        hex: '#000000',
        opacity: 0.3,
        offsetX: 3,
        offsetY: 3,
        blur: 1
      })
      activeObject.set({ shadow: 'rgba(0,0,0,0.3) 5px 5px 1px' })
      activeObject.canvas?.renderAll()
    } else {
      setValue(null)
      activeObject.set({ shadow: undefined })
      activeObject.canvas?.renderAll()
    }
  }

  return (
    <div className='mt-6'>
      <Toggle
        id='shadow'
        name='影'
        value={ value ? 1 : 0 }
        handle={ handleShadow }
      />

      {
        value &&
        <div className='ml-[60px]'>
          <Blur
            value={ value }
            setValue={ setValue }
            activeObject={ activeObject }
          />

          <Opacity
            value={ value }
            setValue={ setValue }
            activeObject={ activeObject }
          />

          <Color
            value={ value }
            setValue={ setValue }
            activeObject={ activeObject }
          />

          <OffsetY
            value={ value }
            setValue={ setValue }
            activeObject={ activeObject }
          />

          <OffsetX
            value={ value }
            setValue={ setValue }
            activeObject={ activeObject }
          />
        </div>
      }
    </div>
  )
}

export default Shadow