import { fabric } from 'fabric'
import Range from "@/atoms/Range"
import { Dispatch, SetStateAction } from 'react'

type Props = {
  opacity: number
  setOpacity: Dispatch<SetStateAction<number | null>>
  rgb: string
  activeObject: fabric.Text
}

const Opacity = ({ opacity, setOpacity, rgb, activeObject }: Props) => {
  const handleOpacity = (number: number) => {
    setOpacity(number)

    activeObject.set({
      stroke: `rgba(${ rgb },${ number / 100 })`
    })

    activeObject.canvas?.renderAll()
  }

  return (
    <Range
      name='不透明度'
      min={ 1 }
      max={ 100 }
      value={ opacity }
      handle={ handleOpacity }
    />
  )
}

export default Opacity