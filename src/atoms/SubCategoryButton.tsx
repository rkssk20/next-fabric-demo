type Props = {
  name: string
  icon: JSX.Element
  handle: () => void
  disabled: boolean
  select: boolean
}

const SubCategoryButton = ({ name, icon, handle, disabled, select }: Props) => {
  return (
    <button
      className={
        `
          min-w-[88px]
          p-2
          flex
          flex-col
          items-center
          text-xs
          border-b-4
          ${ disabled ?
            // テキスト未選択時
            `text-gray-400
              border-transparent
            `
            :
            select ?
            // サブカテゴリ選択次
            `
              duration-200
              border-[#4c6cb3]
            `
            :
            // サブカテゴリ未選択時
            `
              duration-200
              border-transparent
              hover:bg-[#efefef]
              active:bg-[#e5e5e5]
            `
          }
        `
      }
      onClick={ handle }
      disabled={ disabled }
    >
      { icon }
      { name }
    </button>
  )
}

export default SubCategoryButton