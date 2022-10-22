import { useState, useEffect } from 'react'
import { fabric } from "fabric"
import { ColorState } from '@/types/type'
import RGBtoHex from '@/lib/RGBtoHEX'
import Toggle from '@/atoms/Toggle'
import Width from '@/components/Edit/subCategory/text/effect/stroke/Width'
import Opacity from '@/components/Edit/subCategory/text/effect/stroke/Opacity'
import Color from '@/components/Edit/subCategory/text/effect/stroke/Color'

const Stroke = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [color, setColor] = useState<ColorState | null>(null)
  const [opacity, setOpacity] = useState<number | null>(null)
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    if(!activeObject.stroke) return
    const rgba = activeObject.stroke.replace('rgba(', '').replace(')', '').split(',')
    const hex = RGBtoHex(rgba.slice(0, 3))

    setColor({
      rgb: `${ rgba[0] },${ rgba[1] },${ rgba[2] }`,
      hex
    })
    setOpacity(Math.round(Number(rgba[3]) * 100))
    setWidth(activeObject.strokeWidth ?? 0)
  }, [activeObject])

  const handleBorder = () => {
    if(!color && !opacity && !width) {
      setColor({
        rgb: '255,255,255',
        hex: '#000000'
      })
      setOpacity(100)
      setWidth(1)

      activeObject.set({
        stroke: 'rgba(255,255,255,1)',
        strokeWidth: 1
      })
      activeObject.canvas?.renderAll()
    } else {
      setColor(null)
      setOpacity(null)
      setWidth(null)

      activeObject.set({
        stroke: '',
        strokeWidth: 1
      })

      activeObject.canvas?.renderAll()
    }
  }  

  return (
    <div className='mt-6'>
      <Toggle
        id='border'
        name='縁'
        value={ (color && opacity && width) ? 1 : 0 }
        handle={ handleBorder }
      />

      {
        color && opacity && width &&
        <div className='ml-[60px]'>
          <Width
            width={ width }
            setWidth={ setWidth }
            activeObject={ activeObject }
          />

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

export default Stroke