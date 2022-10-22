import { fabric } from 'fabric'
import Range from "@/atoms/Range"
import { Dispatch, SetStateAction } from 'react'

type Props = {
  width: number
  setWidth: Dispatch<SetStateAction<number | null>>
  activeObject: fabric.Text
}

const Width = ({ width, setWidth, activeObject }: Props) => {
  const handleBlur = (number: number) => {
    setWidth(number)

    activeObject.set({
      strokeWidth: number
    })

    activeObject.canvas?.renderAll()
  }

  return (
    <Range
      name='太さ'
      min={ 1 }
      max={ 5 }
      value={ width }
      handle={ handleBlur }
    />
  )
}

export default Width