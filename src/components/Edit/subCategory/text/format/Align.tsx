import { Dispatch, SetStateAction } from "react"

type Props = {
  align: string
  setAlign: Dispatch<SetStateAction<string>>
  selectKey: string
}

const Align = ({ align, setAlign, selectKey }: Props) => {
  return (
    <div className="mt-6">
      <p>整列</p>

      <div
        className="
          max-w-[350px]
          mt-2
          mx-auto
          flex
          justify-between
          overflow-x-scroll
        "
      >
        {
          ['left', 'center', 'right'].map(item => (
            <button
              key={ item }
              className={
                `
                  min-w-[90px]
                  p-2
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-xs
                  rounded-2xl
                  duration-200
                  border
                  border-ogp-border
                  border-solid
                  hover:bg-[#efefef]
                  active:bg-[#e5e5e5]
                  ${
                    (item === align) && 'bg-[#e5e5e5]'
                  }
                  `
              }
              onClick={ () => {
                setAlign(item)
              }}
            >
              {
                (item === 'left') ? 
                  <div className="pb-2 text-2xl material-symbols-rounded">
                    &#xe236;
                  </div>
                : (item === 'center') ?
                  <div className="pb-2 text-2xl material-symbols-rounded">
                    &#xe234;
                  </div>
                :
                  <div className="pb-2 text-2xl material-symbols-rounded">
                    &#xe237;
                  </div>
              }

              {
                (item === 'left') ? '左' :
                (item === 'center') ? '中央' : '右'
              }
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default Align