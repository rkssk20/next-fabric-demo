import { useState, useEffect } from "react"

const Align = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [align, setAlign] = useState('')

  useEffect(() => {
    activeObject.textAlign && setAlign(activeObject.textAlign)
  }, [activeObject])

  // 整列の変更
  const handleAlign = (item: string) => {
    activeObject.textAlign = item
    activeObject.canvas?.renderAll()
    setAlign(item)
  }

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
              onClick={ () => handleAlign(item) }
            >
              {
                (item === 'left') ? 
                  <>
                    <div className="pb-2 text-2xl material-symbols-rounded">
                      &#xe236;
                    </div>
                    左
                  </>
                : (item === 'center') ?
                  <>
                    <div className="pb-2 text-2xl material-symbols-rounded">
                      &#xe234;
                    </div>
                    中央
                  </>
                :
                  <>
                    <div className="pb-2 text-2xl material-symbols-rounded">
                      &#xe237;
                    </div>
                    右
                  </>
              }
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default Align