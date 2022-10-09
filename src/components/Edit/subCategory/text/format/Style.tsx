import { Dispatch, SetStateAction } from "react"

type Props = {
  style: string[]
  setStyle: Dispatch<SetStateAction<string[]>>
  selectKey: string
}

const Style = ({ style, setStyle, selectKey }: Props) => {
  return (
    <div className="mt-6">
      <p>スタイル</p>

      <div
        className="
          max-w-[350px]
          mt-2
          mx-auto
          flex
          justify-center
          overflow-x-scroll
        "
      >
        {
          ['bold', 'italic'].map(item => (
            <button
              key={ item }
              className={
                `
                  min-w-[70px]
                  min-h-[70px]
                  p-2
                  mx-4
                  text-xs
                  rounded-2xl
                  duration-200
                  border
                  border-ogp-border
                  border-solid
                  hover:bg-[#efefef]
                  active:bg-[#e5e5e5]
                  ${ (style.includes(item)) && 'bg-[#e5e5e5]' }
                  `
              }
              onClick={ () => {
                if(style.includes(item)) {
                  setStyle(prev => prev.filter(i => i !== item))
                } else {
                  if(style.length === 1) {
                    setStyle(prev => [...prev, item]);
                  } else {
                    setStyle(prev => [...prev, item]);
                  }
                }
              }}
            >
              {
                (item === 'bold') ? 
                  <div className="text-2xl material-symbols-rounded">
                    &#xe238;
                  </div>
                  :
                  <div className="text-2xl material-symbols-rounded">
                    &#xe23f;
                  </div>
              }
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default Style