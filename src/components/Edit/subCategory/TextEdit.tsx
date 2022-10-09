import { Dispatch, SetStateAction, useState } from 'react'
import { fabric } from 'fabric'
import SubCategoryButton from '@/atoms/SubCategoryButton'
import Input from '@/components/Edit/subCategory/text/Input'
import Format from '@/components/Edit/subCategory/text/Format'
import Color from '@/components/Edit/subCategory/text/Color'
import Align from '@/components/Edit/subCategory/text/Fonts'

type Props = {
  selectKey: string
  setSelectKey: Dispatch<SetStateAction<string>>
}

const TextEdit = ({ selectKey, setSelectKey }: Props) => {
  const [tabNumber, setTabNumber] = useState<number>(0)
  
  const subcategory_list = [{
    name: '入力',
    icon: <span className="pb-2 text-2xl material-symbols-rounded">&#xe312;</span>
  }, {
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
    setTabNumber(0)

    

    setSelectKey('')
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
        
        (tabNumber === 0) ?
        <Input selectKey={ selectKey } /> :
        (tabNumber === 1) ?
        <Format selectKey={ selectKey } /> :
        (tabNumber === 2) ?
        <Color selectKey={ selectKey } /> :
        (tabNumber === 3) &&
        <Align selectKey={ selectKey } />
      }
    </>
  )
}

export default TextEdit