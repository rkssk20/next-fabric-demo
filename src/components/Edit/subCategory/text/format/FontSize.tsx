import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from "react"
import { fabric } from 'fabric'
import Range from '@/atoms/Range'

const FontSize = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    (activeObject.fontSize !== undefined) && setValue(activeObject.fontSize)
  }, [activeObject])

  const handleFontSize = (number: number) => {
    setValue(number)
    activeObject.fontSize = number
    activeObject.canvas?.renderAll()
  }

  return (
    <div className="mt-6">
      <Range
        name='フォントサイズ'
        min={ 10 }
        max={ 100 }
        value={ value }
        handle={ handleFontSize }
      />
    </div>
  )
}

export default FontSize