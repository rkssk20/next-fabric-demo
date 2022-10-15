import { useState, useEffect } from "react"

type ActiveObjectType ={
  fontWeight: 'normal' | 'bold'
  fontStyle: 'normal' | 'italic'
  underline: boolean
  linethrough: boolean
}

const Style = ({ canvas }: { canvas: fabric.Canvas}) => {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)
  const [linethrough, setLinethrough] = useState(false)

  useEffect(() => {
    const activeObject = canvas.getActiveObject() as unknown as ActiveObjectType
    activeObject.fontWeight === 'bold' && setBold(true)
    activeObject.fontStyle === 'italic' && setItalic(true)
    activeObject.underline && setUnderline(true)
    activeObject.linethrough && setLinethrough(true)
  }, [canvas])

  // 文字を太くする
  const handleBold = () => {
    const activeObject = canvas.getActiveObject() as unknown as ActiveObjectType

    if(activeObject.fontWeight === 'normal') {
      activeObject.fontWeight = 'bold'
      setBold(true)
    } else {
      activeObject.fontWeight = 'normal'
      setBold(false)
    }

    canvas.renderAll()
  }

  // 文字を斜めにする
  const handleItalic = () => {
    const activeObject = canvas.getActiveObject() as unknown as ActiveObjectType

    if(activeObject.fontStyle === 'normal') {
      activeObject.fontStyle = 'italic'
      setItalic(true)
    } else {
      activeObject.fontStyle = 'normal'
      setItalic(false)
    }

    canvas.renderAll()
  }
  
  // 文字に下線をつける
  const handleUnderline = () => {
    const activeObject = canvas.getActiveObject() as unknown as ActiveObjectType    
  
    if(!activeObject.underline) {
      activeObject.underline = true
      setUnderline(true)
    } else {
      activeObject.underline = false
      setUnderline(false)
    }
  
    canvas.getActiveObject().set('dirty', true)
    canvas.renderAll()
  }
  
  // 文字に打ち消し線をつける
  const handleLinethrough = () => {
    const activeObject = canvas.getActiveObject() as unknown as ActiveObjectType
  
    if(!activeObject.linethrough) {
      activeObject.linethrough = true
      setLinethrough(true)
    } else {
      activeObject.linethrough = false
      setLinethrough(false)
    }
  
    canvas.getActiveObject().set('dirty', true)
    canvas.renderAll()
  }

  const styleList = [{
    value: 'bold',
    handle: handleBold,
    selected: bold,
    icon:
    <div className="text-2xl material-symbols-rounded">
      &#xe238;
    </div>
  }, {
    value: 'italic',
    handle: handleItalic,
    selected: italic,
    icon: <div className="text-2xl material-symbols-rounded">
    &#xe23f;
  </div>
  }, {
    value: 'underline',
    handle: handleUnderline,
    selected: underline,
    icon: <div className="text-2xl material-symbols-rounded">
    &#xe249;
  </div>
  }, {
    value: 'linethrough',
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
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default Style