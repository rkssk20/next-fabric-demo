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

    // キャンバスの初期化
    const fabricCanvas = new fabric.Canvas('canvas', {
      width,
      height,
      preserveObjectStacking: true,
      selectionFullyContained: true
    })

    // 画像の初期化
    const fabricImage = new fabric.Image(image, {
      lockMovementX: true,
      lockMovementY: true,
      scaleX: width / image.width,
      scaleY: height / image.height,
      hasControls: false,
      selectable: false,
      hoverCursor: 'default',
      filters: []
    })

    // X軸の中央線の初期化
    const fabricLineX = new fabric.Line([
      (width / 2) - 0.5, 0, (width / 2) - 0.5, height
    ], {
      strokeWidth: 1,
      stroke: '#6B9AFF',
      selectable: false,
      hoverCursor: 'default',
      visible: false
    })
    
    // Y軸の中央線の初期化
    const fabricLineY = new fabric.Line([
      0, (height / 2) - 0.5, width, (height / 2) - 0.5
    ], {
      strokeWidth: 1,
      stroke: '#6B9AFF',
      selectable: false,
      hoverCursor: 'default',
      visible: false
    })

    // 選択処理(テキストのみ)
    const handleSelected = (target: fabric.Object | undefined) => {
      if(target instanceof fabric.Text) {
        setActiveObject(target)
        setCategory(1)
      }
    }

    // 選択の検知
    fabricCanvas.on('mouse:down', (e) => {
      handleSelected(e.target)
    }).on('touch:start', (e) => {
      handleSelected(e.target)
    });

    // 画像と中央線の追加
    fabricCanvas.add(fabricImage, fabricLineX, fabricLineY)
    // 画像の選択
    fabricCanvas.setActiveObject(fabricImage)
    // 画像を選択状態にする
    setActiveObject(fabricImage);

    // 移動の検知
    fabricCanvas.on('object:moving', (e) => {      
      if(!e.target?.left || !e.target?.top) return
    
      // x軸で中央に近いた場合
      if(Math.abs(e.target.left - (width / 2)) <= 5) {
        // x軸の中央線を表示
        fabricCanvas.getObjects()[1].set({ visible: true }).setCoords()
        // オブジェクトをx軸の中央にセット
        e.target.set({ left: width / 2 }).setCoords()
        
        // x軸で中央から離れた場合
      } else {
        // x軸の中央線を非表示
        fabricCanvas.getObjects()[1].set({ visible: false }).setCoords()
      }
      
      // y軸で中央に近づいた場合
      if(Math.abs(e.target.top - (height / 2)) <= 5) {
        // y軸の中央線を表示
        fabricCanvas.getObjects()[2].set({ visible: true }).setCoords()
        // オブジェクトをy軸の中央にセット
        e.target.set({ top: height / 2 }).setCoords()
        
        // y軸で中央から離れた場合
      } else {
        // y軸の中央線を非表示
        fabricCanvas.getObjects()[2].set({ visible: false }).setCoords()
      }
    })

    // 移動終了の検知
    fabricCanvas.on('object:modified', (e) => {
      if(!(e.target instanceof fabric.Text)) return

      // 表示されている中央線を非表示
      (fabricCanvas.getObjects()[1].visible) && fabricCanvas.getObjects()[1].set({ visible: false }).setCoords();
      (fabricCanvas.getObjects()[2].visible) && fabricCanvas.getObjects()[2].set({ visible: false }).setCoords();      
      
      if(!e.target.isOnScreen()) {
        const zoom = fabricCanvas.getZoom()
        
        e.target.set({
          left: (width && zoom) ? ((width / zoom) / 2) : 0,
          top: (height && zoom)? ((height / zoom) / 2) : 0
        }).setCoords()
      }
    })
    
    // レンダリング
    fabricCanvas.renderAll()
    // キャンバスの状態をセット
    setCanvas(fabricCanvas)
    // カテゴリをフィルターにセット
    setCategory(0)

    return () => {
      fabricCanvas.off()
      fabricCanvas.dispose()
    }
  }, [image])

  return { activeObject, setActiveObject }
}

export default useCanvas