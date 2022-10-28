import { useState, useEffect } from 'react'
import { fabric } from "fabric"
import { ColorState } from '@/types/type'
import RGBtoHex from '@/lib/RGBtoHEX'
import Toggle from '@/atoms/Toggle'
import Opacity from '@/components/Edit/subCategory/text/effect/background/Opacity'
import Color from '@/components/Edit/subCategory/text/effect/background/Color'

const Background = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [color, setColor] = useState<ColorState | null>(null)
  const [opacity, setOpacity] = useState<number | null>(null)

  useEffect(() => {
    if(!activeObject.textBackgroundColor) return

    const rgba = activeObject.textBackgroundColor.replace('rgba(', '').replace(')', '').split(',')
    const hex = RGBtoHex(rgba.slice(0, 3))    

    setColor({
      rgb: `${ rgba[0] },${ rgba[1] },${ rgba[2] }`,
      hex
    })
    setOpacity(Math.round(Number(rgba[3]) * 100))
  }, [activeObject])  

  const handleBackground = () => {
    if(!color && !opacity) {
      setColor({
        rgb: '0,0,0',
        hex: '000000'
      })
      setOpacity(30)
      activeObject.set({ textBackgroundColor: 'rgba(0,0,0,0.3)' })
      activeObject.canvas?.renderAll()
    } else {
      setColor(null)
      setOpacity(null)
      activeObject.set({ textBackgroundColor: undefined })
      activeObject.canvas?.renderAll()
    }
  }

  return (
    <div className='mt-6'>
      <Toggle
        id='background'
        name='背景'
        value={ (color && opacity) ? 1 : 0 }
        handle={ handleBackground }
      />

      {
        color && opacity &&
        <div className='ml-[60px]'>
          <Opacity
            opacity={ opacity }
            setOpacity={ setOpacity }
            rgb={ color.rgb }
            activeObject={ activeObject }
          />

          <Color
            color={ color }
            setColor={ setColor }
            opacity={ opacity }
            activeObject={ activeObject }
          />
        </div>
      }
    </div>
  )
}

export default Background