import { useState, useEffect } from "react"
import { fabric } from 'fabric'
import Range from '@/atoms/Range'

const Opacity = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    (activeObject.opacity !== undefined) && setValue(Math.round(activeObject.opacity * 100))
  }, [activeObject])  

  const handleOpacity = (number: number) => {
    setValue(number)
    activeObject.opacity = number * 0.01
    activeObject.canvas?.renderAll()
  }

  return (
    <div className="mt-6">
      <Range
        name='不透明度'
        min={ 1 }
        max={ 100 }
        value={ value }
        handle={ handleOpacity }
      />
    </div>
  )
}

export default Opacity