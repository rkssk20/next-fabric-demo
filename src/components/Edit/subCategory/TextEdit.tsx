import { Dispatch, SetStateAction, useState } from 'react'
import { fabric } from 'fabric'
import SubCategoryButton from '@/atoms/SubCategoryButton'
import Input from '@/components/Edit/subCategory/text/Input'
import Format from '@/components/Edit/subCategory/text/Format'
import Color from '@/components/Edit/subCategory/text/Color'
import Align from '@/components/Edit/subCategory/text/Fonts'

type Props = {
  canvas: fabric.Canvas
  setCanvas: Dispatch<SetStateAction<fabric.Canvas | undefined>>
}

const TextEdit = ({ canvas, setCanvas }: Props) => {
  const [tabNumber, setTabNumber] = useState<number>(0)
  
  const subcategory_list = [{
    name: 'フォーマット',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe23c;</span>
  }, {
    name: 'カラー',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe40a;</span>
  }, {
    name: 'フォント',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe167;</span>
  }]

  const handleAdd = () => {
    const textCanvas = new fabric.Textbox('テキストを入力', {
      originX: 'center',
      originY: 'center',
      top: canvas.height ? ((canvas.height / canvas.getZoom()) / 2) : 0,
      left: canvas.width ? ((canvas.width / canvas.getZoom()) / 2) : 0,
      fontFamily: 'Noto Sans JP',
      fontSize: 30,
      fill: 'white'
    })

    setCanvas(prev => {
      if(!prev) return

      prev.add(textCanvas)
      prev.setActiveObject(textCanvas)
      prev.renderAll()

      return prev
    })

    canvas.renderAll()

    setTabNumber(0)
  }

  return (
    <>
      <div
        className='
          flex
          border-b
          border-ogp-border
          border-solid
        '
      >
        <button
          className='
            min-w-[90px]
            p-2
            flex
            flex-col
            items-center
            justify-center
            text-xs
            duration-200
            border-b-4
            border-transparent
            hover:bg-[#efefef]
            active:bg-[#e5e5e5]
          '
          onClick={ handleAdd }
        >
          <span className="pb-2 text-2xl material-symbols-rounded">&#xe145;</span>
          追加
        </button>

        <div className='border-r border-gray-300' />

        <div
          className='
            w-full
            flex
            overflow-x-scroll
          '
        >
          {
            subcategory_list.map((item, index) => (
              <SubCategoryButton
                key={ item.name }
                name={ item.name }
                icon={ item.icon }
                disabled={ false }
                handle={ () => setTabNumber(index) }
                select={ (tabNumber === index) }
              />
            ))
          }
        </div>
      </div>

      {
        (canvas.getActiveObject().type === 'textbox') && (
          (tabNumber === 0) ?
          // <Input canvas={ canvas } /> :
          <Format canvas={ canvas } /> :
          (tabNumber === 1) ?
          <Color canvas={ canvas } /> :
          (tabNumber === 2) &&
          <Align canvas={ canvas } />
          // (tabNumber === 3) &&
        )
      }
    </>
  )
}

export default TextEdit