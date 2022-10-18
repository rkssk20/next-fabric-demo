import { useState, useEffect } from "react"

const Style = ({ activeObject }: { activeObject: fabric.Text }) => {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [linethrough, setLinethrough] = useState(false)

  useEffect(() => {
    activeObject.fontWeight === 'bold' && setBold(true)
    activeObject.fontStyle === 'italic' && setItalic(true)
    activeObject.underline && setUnderline(true)
    activeObject.linethrough && setLinethrough(true)
  }, [activeObject])

  // 文字を太くする
  const handleBold = () => {
    if(activeObject.fontWeight === 'normal') {
      activeObject.fontWeight = 'bold'
      setBold(true)
    } else {
      activeObject.fontWeight = 'normal'
      setBold(false)
    }

    activeObject.canvas?.renderAll()
  }

  // 文字を斜めにする
  const handleItalic = () => {
    if(activeObject.fontStyle === 'normal') {
      activeObject.fontStyle = 'italic'
      setItalic(true)
    } else {
      activeObject.fontStyle = 'normal'
      setItalic(false)
    }

    activeObject.canvas?.renderAll()
  }
  
  // 文字に下線をつける
  const handleUnderline = () => {
    if(!activeObject.underline) {
      activeObject.underline = true
      setUnderline(true)
    } else {
      activeObject.underline = false
      setUnderline(false)
    }
  
    activeObject.set('dirty', true)
    activeObject.canvas?.renderAll()
  }
  
  // 文字に打ち消し線をつける
  const handleLinethrough = () => {
    if(!activeObject.linethrough) {
      activeObject.linethrough = true
      setLinethrough(true)
    } else {
      activeObject.linethrough = false
      setLinethrough(false)
    }
  
    activeObject.set('dirty', true)
    activeObject.canvas?.renderAll()
  }

  const styleList = [{
    value: 'bold',
    name: '太字',
    handle: handleBold,
    selected: bold,
    icon:
    <div className="text-2xl material-symbols-rounded">
      &#xe238;
    </div>
  }, {
    value: 'italic',
    name: '斜体',
    handle: handleItalic,
    selected: italic,
    icon: <div className="text-2xl material-symbols-rounded">
    &#xe23f;
  </div>
  }, {
    value: 'underline',
    name: '下線',
    handle: handleUnderline,
    selected: underline,
    icon: <div className="text-2xl material-symbols-rounded">
    &#xe249;
  </div>
  }, {
    value: 'linethrough',
    name: '取消線',
    handle: handleLinethrough,
    selected: linethrough,
    icon: <div className="text-2xl material-symbols-rounded">
    &#xe246;
  </div>
  }]

  return (
    <div className="mt-6">
      <p>スタイル</p>

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
          styleList.map(item => (
            <button
              key={ item.value }
              className={
                `
                min-w-[70px]
                min-h-[70px]
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
                  ${ item.selected && 'bg-[#e5e5e5]' }
                  `
              }
              onClick={ item.handle }
            >
              { item.icon }
              { item.name }
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default Style