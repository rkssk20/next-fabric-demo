import { Dispatch, SetStateAction, useState } from 'react'
import { fabric } from 'fabric'
import SubCategoryButton from '@/atoms/SubCategoryButton'
import Format from '@/components/Edit/subCategory/text/Format'
import Color from '@/components/Edit/subCategory/text/format/Color'
import Fonts from '@/components/Edit/subCategory/text/Fonts'

const TextEdit = ({ activeObject, setActiveObject }: { activeObject: fabric.Object, setActiveObject: Dispatch<SetStateAction<fabric.Object | undefined>> }) => {
  const [tabNumber, setTabNumber] = useState<number>(0)
  
  const subcategory_list = [{
    name: 'フォーマット',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe23c;</span>
  }, {
    name: 'フォント',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe167;</span>
  }, {
    name: 'エフェクト',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe65f;</span>
  }]

  const handleAdd = () => {
    const width = activeObject.canvas?.width
    const height = activeObject.canvas?.height
    const zoom = activeObject.canvas?.getZoom()

    const textCanvas = new fabric.Textbox('テキストを入力', {
      originX: 'center',
      originY: 'center',
      top: (height && zoom)? ((height / zoom) / 2) : 0,
      left: (width && zoom) ? ((width / zoom) / 2) : 0,
      hasControls: false,
      hoverCursor: 'pointer',
      moveCursor: 'pointer',
      fontFamily: 'Noto Sans JP',
      fontSize: 30,
      fill: 'black',
      textAlign: 'center'
    })

    activeObject.canvas?.add(textCanvas)
    activeObject.canvas?.setActiveObject(textCanvas)
    activeObject.canvas?.renderAll()

    setActiveObject(textCanvas)
    setTabNumber(0)
  }

  const handleDelete = () => {
    setActiveObject(prev => prev?.canvas?.getObjects()[0])
    activeObject.canvas?.remove(activeObject)
  }

  return (
    <>
      {/* テキスト編集 小カテゴリの選択 */}
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

        <button
          className={ `
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
            ${
                !(activeObject instanceof fabric.Text) &&
                `text-gray-400 border-transparent`
              }
          ` }
          disabled={ !(activeObject instanceof fabric.Text) }
          onClick={ handleDelete }
        >
          <span className="pb-2 text-2xl material-symbols-rounded">&#xe872;</span>
          削除
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
                disabled={ !(activeObject instanceof fabric.Text) }
                handle={ () => setTabNumber(index) }
                select={ (tabNumber === index) }
              />
            ))
          }
        </div>
      </div>

      {/* テキスト編集 */}
      {
        (activeObject instanceof fabric.Text) && (
          (tabNumber === 0) ?
          // <Input canvas={ canvas } /> :
          <Format activeObject={ activeObject as fabric.Text } /> :
          (tabNumber === 1) ?
          <Fonts activeObject={ activeObject as fabric.Text } /> :
          (tabNumber === 2) &&
          <Color activeObject={ activeObject as fabric.Text } />
          // (tabNumber === 3) &&
        )
      }
    </>
  )
}

export default TextEdit