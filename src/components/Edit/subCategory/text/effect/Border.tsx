import { useState, useEffect } from 'react'
import { fabric } from "fabric"
import Toggle from '@/atoms/Toggle'

const Border = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [value, setValue] = useState<string | undefined>(undefined)

  useEffect(() => {
    setValue(activeObject.stroke ?? undefined)
  }, [activeObject])    

  const handleBorder = () => {
    if(value === undefined) {
      setValue('rgba(255,255,255,0.5)')
      activeObject.set({
        stroke: 'rgba(255,255,255,0.5)',
        strokeWidth: 1
      })
      activeObject.canvas?.renderAll()
    } else {
      setValue(undefined)
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
        value={ value ? 1 : 0 }
        handle={ handleBorder }
      />
    </div>
  )
}

export default Border