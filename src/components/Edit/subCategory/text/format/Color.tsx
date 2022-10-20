import { useState, useEffect } from "react"
import { fabric } from "fabric";
import { HexColorPicker, HexColorInput } from "react-colorful";

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

      <div
        className="
          mt-2
          pl-4
          flex
          items-center
          justify-center
        "
      >
        <HexColorPicker color={ value } onChange={ handleColor } />

        <div
          className="
            ml-2
            pl-1
            bg-gray-200
            flex
            items-center
            rounded-xl
            resize-none
            line-break: anywhere
          "
        >
          <p className="px-1 text-gray-500 cursor-default">#</p>
          
          <HexColorInput
            className='
              max-w-[80px]
              p-2
              bg-gray-200
              rounded-xl
            '
            color={ value }
            onChange={ handleColor }
          />
        </div>
      </div>
    </div> 
  )
}

export default Color