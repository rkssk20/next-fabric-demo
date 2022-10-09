import { useState, useEffect } from "react"
import { HexColorPicker, HexColorInput } from "react-colorful";

const Color = ({ selectKey }: { selectKey: string }) => {
  const [value, setValue] = useState('')

  console.log(value);
  
  
  useEffect(() => {
    setValue('')
  }, [selectKey])

  const handleColor = (e: string) => {
    setValue(e)
  }

  return (
    <div
      className="
        mt-4
        px-6
        flex
        items-center
        justify-center
        flex-1
        overflow-y-scroll
      "
    >
      <HexColorPicker
        className="mt-4 pb-6"
        color={ value }
        onChange={ handleColor }
      />

      <div
        className="
          ml-4
          pl-1
          bg-gray-200
          flex
          items-center
          rounded-xl
          resize-none
          line-break: anywhere
        "
      >
        <p className="px-1 text-gray-500">#</p>
        
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
  )
}

export default Color