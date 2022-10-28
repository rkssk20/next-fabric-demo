import { fabric } from 'fabric'
import type { ActiveProps } from '@/types/type'
import FrameTemplate from '@/atoms/FrameTemplate'

const Line = ({ activeObject, setActiveObject }: ActiveProps) => {  
  const handleTemplate = () => {
    if(activeObject.name === 'line') {
      setActiveObject(activeObject.canvas?.getObjects()[0])
      activeObject.canvas?.remove(activeObject)
      return
    }

    const width = activeObject.canvas?.width
    const height = activeObject.canvas?.height

    if(!width || !height) return

    fabric.Image.fromURL('../../../../../frame/line.png', (img) => {
      img.width && img.scale(width / img.width)
      img.name = 'line'
      img.evented = false


      if(activeObject.name) {
        setActiveObject(prev => {
          prev?.canvas?.remove(prev)
          return prev
        })
      }

      activeObject.canvas?.add(img)
      activeObject.canvas?.renderAll()
      setActiveObject(img)
    })
  }

  return (
    <FrameTemplate
      name='ライン'
      image='/frame/line.png'
      selected={ activeObject.name === 'line' }
      handle={ handleTemplate }
    />
  )
}

export default Line