import { useState, useEffect } from 'react'
import { fabric } from "fabric"
import Toggle from '@/atoms/Toggle'
import Range from '@/atoms/Range'
import HexColor from '@/atoms/HexColor'

type valueState = {
  rgb: string
  hex: string
  opacity: number
  offsetX: number
  offsetY: number
  blur: number
} | null

const Shadow = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [value, setValue] = useState<valueState>(null)
  
  useEffect(() => {
    if(activeObject.shadow) {
      const shadow = activeObject.shadow as fabric.Shadow
      const rgba = shadow.color?.replace('rgba(', '').replace(')', '').split(',')

      const hex = rgba ? (
        "#" + rgba.map(value => {
          return ("0" + Number(value).toString( 16 )).slice( -2 )
        }).join( "" )
      ) : '#000000'

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

  const handleBlur = (number: number) => {
    setValue(prev => {
      if(!prev) return null

      return {
        ...prev,
        blur: number
      }
    })

    activeObject.set({
      shadow: `rgba(${ value?.rgb },${ value?.opacity }) ${ value?.offsetX }px ${ value?.offsetY }px ${ number }px`
    })

    activeObject.canvas?.renderAll()
  }

  const handleOpacity = (number: number) => {
    const opacity = number / 100

    setValue(prev => {
      if(!prev) return null

      return {
        ...prev,
        opacity
      }
    })    

    activeObject.set({
      shadow: `rgba(${ value?.rgb },${ opacity }) ${ value?.offsetX }px ${ value?.offsetY }px ${ value?.blur }px`
    })

    activeObject.canvas?.renderAll()
  }

  const handleColor = (e: string) => {
    const red = parseInt(e[1]+e[2], 16)
    const green = parseInt(e[3]+e[4], 16)
    const blue = parseInt(e[5]+e[6], 16)
    const rgb = `${ red },${ green },${ blue }`

    setValue(prev => {
      if(!prev) return null

      return {
        ...prev,
        hex: e,
        rgb
      }
    })

    activeObject.set({
      shadow: `rgba(${ rgb },${ value?.opacity }) ${ value?.offsetX }px ${ value?.offsetY }px ${ value?.blur }px`
    })

    activeObject.canvas?.renderAll()
  }

  const handleOffsetY = (number: number) => {
    setValue(prev => {
      if(!prev) return null

      return {
        ...prev,
        offsetY: number
      }
    })

    activeObject.set({
      shadow: `rgba(${ value?.rgb },${ value?.opacity }) ${ value?.offsetX }px ${ number }px ${ value?.blur }px`
    })

    activeObject.canvas?.renderAll()
  }

  const handleOffsetX = (number: number) => {
    setValue(prev => {
      if(!prev) return null

      return {
        ...prev,
        offsetX: number
      }
    })

    activeObject.set({
      shadow: `rgba(${ value?.rgb },${ value?.opacity }) ${ number }px ${ value?.offsetY }px ${ value?.blur }px`
    })

    activeObject.canvas?.renderAll()
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
          <Range
            name='ぼかし'
            min={ 1 }
            max={ 15 }
            value={ value.blur }
            handle={ handleBlur }
          />

          <Range
            name='不透明度'
            min={ 1 }
            max={ 100 }
            value={ Math.round(value.opacity * 100) }
            handle={ handleOpacity }
          />

          <div className='mt-6'>
            <p>カラー</p>
            <HexColor value={ value.hex } handle={ handleColor } />
          </div>

          <Range
            name='縦移動'
            min={ -30 }
            max={ 30 }
            value={ value.offsetY }
            handle={ handleOffsetY }
          />

          <Range
            name='横移動'
            min={ -30 }
            max={ 30 }
            value={ value.offsetX }
            handle={ handleOffsetX }
          />
        </div>
      }
    </div>
  )
}

export default Shadow