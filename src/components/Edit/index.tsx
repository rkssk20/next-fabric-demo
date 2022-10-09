import { useState, useEffect, useRef, MouseEvent as MouseEventType } from "react"
import { useRouter } from "next/router"
import { fabric } from 'fabric'
import useImage from "@/hooks/useImage";
import useScreenWidth from '@/hooks/useScreenWidth'
import Header from '@/atoms/Header'
import CategoryButton from "@/atoms/CategoryButton";
import TextEdit from '@/components/Edit/subCategory/TextEdit'
import DrawEdit from '@/components/Edit/subCategory/DrawEdit'
import Filter from '@/components/Edit/category/Filter'

type Props = {
  cropImage: string
}

const Edit = ({ cropImage }: Props) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>()
  const [selectKey, setSelectKey] = useState('')
  const image = useImage(cropImage)
  const router = useRouter()
  const ref = useRef<HTMLCanvasElement | null>(null)
  const defaultWidth = useScreenWidth(setCanvas)

  console.log(canvas?.getObjects()[0]);
  

  const category_list = [{
    name: 'フィルター',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe43b;</span>
  }, {
    name: 'テキスト',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe264;</span>
  }, {
    name: '手書き',
    icon:  <span className="pb-2 text-2xl material-symbols-rounded">&#xe3ae;</span>
  }]

  // キャンバスの作成、画像の追加
  useEffect(() => {
    if(!image || !defaultWidth) return

    const fabricCanvas = new fabric.Canvas('canvas', {
      width: defaultWidth,
      height:  defaultWidth * 0.5625
    })

    const fabricImage = new fabric.Image(image, {
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      scaleX: defaultWidth / image.width,
      scaleY: (defaultWidth * 0.5625) / image.height
    })

    fabricImage.on('mousedown', () => {
      setCanvas(fabricCanvas)
    }).on('touchstart', () => {
      setCanvas(fabricCanvas)
    })

    fabricCanvas.add(fabricImage)
    fabricCanvas.setActiveObject(fabricImage)
    // fabricCanvas.renderAll()
    setCanvas(fabricCanvas)

    return () => {
      fabricImage.off()
      fabricCanvas.dispose()
    }
  }, [image, defaultWidth])

  const handleNext = () => {
    router.push({
      pathname: '/',
      query: { step: 'result' }
    }, undefined, {
      shallow: true
    })
  }

  const handleCategory = (e: MouseEventType<HTMLButtonElement>, index: number) => {
    if(index === 0) {
       canvas && canvas.setActiveObject(canvas.getObjects()[0])
    }
  }
  
  return (
    <div
      className="
        w-full
        md:w-[528px]
        lg:w-[calc(100%-32px)]
        max-w-5xl
        h-[calc(100vh-85px)]
        mt-[69px]
        mx-auto
        p-4
        lg:flex
        lg:justify-between
        bg-white
        rounded-2xl
        overflow-hidden
      "
    >
      <Header
        title='画像を編集'
        backIcon={
          <button
            onClick={ () => router.push({
              pathname: '/',
              query: { step: 'crop' }
            }, undefined, {
              shallow: true
            }) }
          >
            戻る
          </button>
        }
        forwardIcon={
          <button
            className="text-[#2cb696]"
            onClick={ handleNext }
          >
            次へ
          </button>
        }
      />

      <div
        id='stage-parent'
        className="
          w-full
          md:w-[496px]
          lg:w-[calc((100%-16px)-376px)]
          xl:w-[600px]
          aspect-video
          mb-2
          lg:my-auto
          shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]
        "
      >
        <canvas id='canvas' ref={ ref } />
      </div>

      <div
        className="
          w-full
          lg:w-[376px]
          flex
          flex-col
          border
          border-ogp-border
          border-solid
          rounded-2xl
        "
        style={{
          height: (window.innerWidth < 768) ? `calc(100% - ${ document.querySelector('#stage-parent')?.clientHeight }px)` : '100%'
        }}
      >
        <div
          className="
            w-full
            min-h-[85px]
            flex
            overflow-x-scroll
            border-b
            border-ogp-border
            border-solid
            rounded-t-2xl
          "
        >
          {
            category_list.map((item, index) => (
              <CategoryButton
                key={ item.name }
                name={ item.name }
                icon={ item.icon }
                handle={ handleCategory }
                select={  true }
                index={ index }
              />
            ))
          }
        </div>

        {
          canvas && (
            (canvas.getActiveObject() instanceof fabric.Image) ?
            <Filter canvas={ canvas } /> :
            (canvas.getActiveObject() instanceof fabric.Text) ?
            <TextEdit selectKey={ selectKey } setSelectKey={ setSelectKey } /> :
            <DrawEdit selectKey={ selectKey } />
          )
        }
      </div>
    </div>
  )
}

export default Edit