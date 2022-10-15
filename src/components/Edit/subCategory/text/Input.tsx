import { useState, useEffect } from 'react'
import { fabric } from 'fabric'

const Input = ({ canvas }: { canvas: fabric.Canvas }) => {
  const [text, setText] = useState('')

  useEffect(() => {
    setText('')
  }, [])

  return (
    <textarea
      className='
        mt-6
        mx-6
        p-2
        bg-gray-200
        rounded-xl
        resize-none
        line-break: anywhere
      '
      placeholder='テキストを入力'
      rows={ 5 }
      value={ text }
      onChange={ e => {
        setText(e.target.value)
        // @ts-ignore 
        Konva.shapes[selectKey].text(e.target.value)
      }}
    />
  )
}

export default Input