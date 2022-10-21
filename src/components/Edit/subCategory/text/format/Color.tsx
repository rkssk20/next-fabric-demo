import { useState, useEffect } from "react"
import { fabric } from "fabric";
import HexColor from "@/atoms/HexColor";

const Color = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [value, setValue] = useState('')

  useEffect(() => {    
    if(typeof activeObject.fill === 'string') {
      if(activeObject.fill === 'black') {
        setValue('#000000')
      } else {
        setValue(activeObject.fill)
      }
    }
  }, [activeObject])

  const handleColor = (e: string) => {
    activeObject.set('fill', e)
    activeObject.canvas?.renderAll()
    setValue(e)
  }

  return (
    <div className="mt-6">
      <p>カラー</p>
      <HexColor value={ value } handle={ handleColor } />
    </div> 
  )
}

export default Color