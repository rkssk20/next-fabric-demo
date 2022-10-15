import { useState, MouseEvent as MouseEventType } from "react"
import { useRouter } from "next/router"
import useCanvas from "@/hooks/useCanvas";
import useImage from "@/hooks/useImage";
import Header from '@/atoms/Header'
import CategoryButton from "@/atoms/CategoryButton";
import TextEdit from '@/components/Edit/subCategory/TextEdit'
import DrawEdit from '@/components/Edit/subCategory/DrawEdit'
import Filter from '@/components/Edit/category/Filter'

type Props = {
  cropImage: string
}

const Edit = ({ cropImage }: Props) => {
  const [category, setCategory] = useState<number | null>(null)
  const [selectKey, setSelectKey] = useState('')
  const router = useRouter()
  const image = useImage(cropImage)
  const { canvas, setCanvas } = useCanvas(image, setCategory)

  console.log(canvas);

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

  const handleNext = () => {
    router.push({
      pathname: '/',
      query: { step: 'result' }
    }, undefined, {
      shallow: true
    })
  }

  const handleCategory = (e: MouseEventType<HTMLButtonElement>, index: number) => {
    (index === 0) && canvas && canvas.setActiveObject(canvas.getObjects()[0])

    setCategory(index)
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
                select={ category === index }
                index={ index }
              />
            ))
          }
        </div>

        {
          canvas && (category !== null) && (
            (category === 0) ?
            <Filter canvas={ canvas } /> :
            (category === 1) ?
            <TextEdit canvas={ canvas } setCanvas={ setCanvas } /> :
            <DrawEdit selectKey={ selectKey } />
          )
        }
      </div>
    </div>
  )
}

export default Edit