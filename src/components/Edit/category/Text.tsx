import { useState, useEffect } from 'react'
import { fabric } from 'fabric'
import type { ActiveProps } from '@/types/type'
import SubCategoryButton from '@/atoms/SubCategoryButton'
import Explanation from '@/components/Edit/subCategory/text/Explanation'
import Format from '@/components/Edit/subCategory/text/format'
import Fonts from '@/components/Edit/subCategory/text/Fonts'
import Effect from '@/components/Edit/subCategory/text/effect'

const Text = ({ activeObject, setActiveObject  }: ActiveProps) => {
  const [subCategory, setSubCategory] = useState<number | null>(null)
  
  const subcategory_list = [{
    name: 'フォーマット',
    icon: <span className="material-symbols-rounded">&#xe23c;</span>
  }, {
    name: 'フォント',
    icon: <span className="material-symbols-rounded">&#xe167;</span>
  }, {
    name: 'エフェクト',
    icon: <span className="material-symbols-rounded">&#xe65f;</span>
  }]

  useEffect(() => {
    (activeObject instanceof fabric.Text) && setSubCategory(0)
  }, [activeObject])

  const handleAdd = () => {
    const width = activeObject?.canvas?.width
    const height = activeObject?.canvas?.height
    const zoom = activeObject?.canvas?.getZoom();

    const textCanvas = new fabric.Textbox('タイトルテキスト', {
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

    activeObject?.canvas?.add(textCanvas)
    activeObject?.canvas?.setActiveObject(textCanvas)
    activeObject?.canvas?.renderAll()

    setActiveObject(textCanvas)
  }

  const handleDelete = () => {
    setActiveObject(prev => prev?.canvas?.getObjects()[0])
    activeObject?.canvas?.remove(activeObject)
    setSubCategory(null)
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
            min-w-[80px]
            p-2
            flex
            flex-col
            items-center
            text-xs
            duration-200
            border-b-4
            border-transparent
            hover:bg-[#efefef]
            active:bg-[#e5e5e5]
          '
          onClick={ handleAdd }
        >
          <span className="pb-2 material-symbols-rounded">&#xe145;</span>
          追加
        </button>

        <button
          className={ `
            min-w-[80px]
            p-2
            flex
            flex-col
            items-center
            text-xs
            duration-200
            border-b-4
            border-transparent
            ${
                !(activeObject instanceof fabric.Text) ?
                `
                  text-gray-400
                  border-transparent
                `
                :
                `
                  hover:bg-[#efefef]
                  active:bg-[#e5e5e5]
                `
              }
          ` }
          disabled={ !(activeObject instanceof fabric.Text) }
          onClick={ handleDelete }
        >
          <span className="pb-2 material-symbols-rounded">&#xe872;</span>
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
                handle={ () => setSubCategory(index) }
                select={ (subCategory === index) }
              />
            ))
          }
        </div>
      </div>

      {/* テキスト編集 */}
      {
        (subCategory === null) ?
        <Explanation /> :
        (subCategory === 0) ?
        <Format activeObject={ activeObject as fabric.Text } /> :
        (subCategory === 1) ?
        <Fonts activeObject={ activeObject as fabric.Text } /> :
        (subCategory === 2) &&
        <Effect activeObject={ activeObject as fabric.Text } />
      }
    </>
  )
}

export default Text