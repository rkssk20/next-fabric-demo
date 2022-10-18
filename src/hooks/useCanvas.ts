import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { fabric } from "fabric"
import useScreenWidth from "@/hooks/useScreenWidth"

const useCanvas = (
  image: HTMLImageElement | undefined,
  setCategory: Dispatch<SetStateAction<number | null>>
) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>()
  const [activeObject, setActiveObject] = useState<fabric.Object>()
  useScreenWidth(canvas)

  // キャンバスの作成、画像の追加
  useEffect(() => {
    if(!image) return

    const parent = document.querySelector('#stage-parent')

    if(!parent) return
    const width = parent.clientWidth
    const height = parent.clientHeight

    const fabricCanvas = new fabric.Canvas('canvas', {
      width,
      height,
      preserveObjectStacking: true,
      hoverCursor: 'pointer'
    })

    fabric.Object.prototype.set({
      cornerColor: 'rgb(178,204,255,0.3)',
      cornerStrokeColor: 'rgba(178,204,255)',
      transparentCorners: false
    })

    const fabricImage = new fabric.Image(image, {
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      scaleX: width / image.width,
      scaleY: height / image.height,
      filters: []
    })

    fabricCanvas.add(fabricImage)
    fabricCanvas.setActiveObject(fabricImage)
    setActiveObject(fabricImage)

    const handleSelected = (target: fabric.Object | undefined) => {
      setActiveObject(target)

      if(target instanceof fabric.Image) {
        setCategory(0)
      } else if(target instanceof fabric.Text) {
        setCategory(1)
      }
    }

    fabricCanvas.on('mouse:down', (e) => {
      handleSelected(e.target)
    }).on('touch:start', (e) => {
      handleSelected(e.target)
    });

    ['ml', 'mt', 'mr', 'mb'].map(item => {
      fabric.Object.prototype.setControlVisible(item, false)
    })

    fabricCanvas.renderAll()

    setCanvas(fabricCanvas)
    setCategory(0)

    return () => {
      fabricCanvas.off()
      fabricCanvas.dispose()
    }
  }, [image])

  return { activeObject, setActiveObject }
}

export default useCanvas