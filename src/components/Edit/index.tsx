import { useState, MouseEvent, Dispatch, SetStateAction } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic";
import useCanvas from "@/hooks/useCanvas";
import useScreenWidth from "@/hooks/useScreenWidth";
import useImage from "@/hooks/useImage";
import Header from '@/atoms/Header'
import Loader from "@/atoms/Loader";
import CategoryButton from "@/atoms/CategoryButton";
import Filter from'@/components/Edit/category/Filter'

const Text = dynamic(() => import('@/components/Edit/category/Text'), { loading: () => <Loader /> })
const Frame = dynamic(() => import('@/components/Edit/category/Frame'), { loading: () => <Loader /> })

type Props = {
  cropImage: string
  setResultImage: Dispatch<SetStateAction<string>>
}

const Edit = ({ cropImage, setResultImage }: Props) => {
  const [category, setCategory] = useState<number | null>(null)
  const router = useRouter()
  const image = useImage(cropImage)
  const { activeObject, setActiveObject } = useCanvas(image, setCategory)
  const innerWidth = useScreenWidth()

  const category_list = [{
    name: 'フィルター',
    icon: <span className="material-symbols-rounded">&#xe43b;</span>
  }, {
    name: 'テキスト',
    icon: <span className="material-symbols-rounded">&#xe264;</span>
  }, {
    name: 'フレーム',
    icon:  <span className="material-symbols-rounded">&#xf0d9;</span>
  }]

  const handleNext = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const image = canvas.toDataURL('image/jpeg')
    setResultImage(image)

    router.push({
      pathname: '/',
      query: { step: 'post' }
    }, undefined, {
      shallow: true
    })
  }

  const handleCategory = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    if((index === 0) || (index === 2)) setActiveObject(prev => prev?.canvas?.getObjects()[0])

    setCategory(index)
  }
  
  return (
    <div
      className="
        w-full
        lg:w-[calc(100%-32px)]
        max-w-5xl
        mt-[54px]
        lg:mt-[69px]
        lg:mx-auto
        px-4
        py-2
        md:px-[calc((100%-496px)/2)]
        lg:px-4
        lg:py-4
        lg:flex
        lg:justify-between
        bg-white
        lg:rounded-2xl
        overflow-hidden
      "
      style={{
        height:
          (innerWidth && (innerWidth < 768)) ?  (window.innerHeight - 54) : (window.innerHeight - 85)
      }}
    >
      {/* ヘッダー */}
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

      {/* canvas */}
      <div
        id='stage-parent'
        className="
          w-full
          lg:w-[calc((100%-16px)-376px)]
          xl:w-[600px]
          aspect-video
          mb-2
          lg:my-auto
          shadow-[0_0_5px_1px_rgba(0,0,0,0.3)]
        "
      >
        <canvas id='canvas' />
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
          height: (window.innerWidth < 768) ?
            `calc(100% - ${ document.querySelector('#stage-parent')?.clientHeight }px - 8px)` :
            '100%'
        }}
      >
        {/* 大カテゴリの選択 */}
        <div
          className="
            w-full
            min-h-[69px]
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
                select={ category === index }
                index={ index }
              />
            ))
          }
        </div>

        {/* 画像の編集 */}
        {
          activeObject && (category !== null) && (
            (category === 0) ?
            <Filter activeObject={ activeObject as fabric.Image } /> :
            (category === 1) ?
            <Text activeObject={ activeObject } setActiveObject={ setActiveObject } />
            :
            <Frame activeObject={ activeObject } setActiveObject={ setActiveObject } />
          )
        }
      </div>
    </div>
  )
}

export default Edit