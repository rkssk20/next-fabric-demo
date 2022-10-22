import type { Dispatch, SetStateAction } from 'react'
import { ShadowState } from '@/types/type'
import Range from '@/atoms/Range'

type Props = {
  value: ShadowState
  setValue: Dispatch<SetStateAction<ShadowState | null>>
  activeObject: fabric.Text
}

const Blur = ({ value, setValue, activeObject }:Props) => {
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

  return (
    <Range
      name='ぼかし'
      min={ 1 }
      max={ 15 }
      value={ value?.blur }
      handle={ handleBlur }
    />
  )
}

export default Blur