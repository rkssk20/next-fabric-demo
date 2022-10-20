import { useState, useEffect } from "react"
import { fabric } from 'fabric'
import Range from '@/atoms/Range'

const Angle = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    (activeObject.angle !== undefined) && setValue(activeObject.angle)
  }, [activeObject])

  const handleRotation = (number: number) => {
    setValue(number)
    activeObject.angle = number
    activeObject.canvas?.renderAll()
  }

  return (
    <div className="mt-6">
      <Range
        name='角度'
        min={ -180 }
        max={ 180 }
        value={ value }
        handle={ handleRotation }
      />
    </div>
  )
}

export default Angle