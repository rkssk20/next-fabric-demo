import { useState, useEffect } from 'react'
import { fabric } from "fabric"
import Toggle from '@/atoms/Toggle'

const Background = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue(activeObject.textBackgroundColor ?? '')
  }, [activeObject])  

  const handleBackground = () => {
    if(value.length === 0) {
      setValue('rgba(0,0,0,0.3)')
      activeObject.set({ textBackgroundColor: 'rgba(0,0,0,0.3)' })
      activeObject.canvas?.renderAll()
    } else {
      setValue('')
      activeObject.set({ textBackgroundColor: undefined })
      activeObject.canvas?.renderAll()
    }
  }

  return (
    <div className='mt-6'>
      <Toggle
        id='background'
        name='背景'
        value={ (value.length > 0) ? 1 : 0 }
        handle={ handleBackground }
      />
    </div>
  )
}

export default Background