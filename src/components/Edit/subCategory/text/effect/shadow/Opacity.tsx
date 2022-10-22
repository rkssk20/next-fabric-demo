import type { Dispatch, SetStateAction } from 'react'
import { ShadowState } from '@/types/type'
import Range from '@/atoms/Range'

type Props = {
  value: ShadowState
  setValue: Dispatch<SetStateAction<ShadowState | null>>
  activeObject: fabric.Text
}

const Opacity = ({ value, setValue, activeObject }:Props) => {
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

  return (
    <Range
      name='不透明度'
      min={ 1 }
      max={ 100 }
      value={ Math.round(value.opacity * 100) }
      handle={ handleOpacity }
    />
  )
}

export default Opacity