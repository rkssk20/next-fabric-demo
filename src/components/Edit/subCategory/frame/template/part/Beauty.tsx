import { fabric } from 'fabric'
import type { FrameTemplateProps } from '@/types/type'
import FrameTemplate from '@/atoms/FrameTemplate'

const Beauty = ({ setActiveObject, frame, setFrame }: FrameTemplateProps) => {
  const handleTemplate = () => {
    if(frame?.name === 'beauty') {
      setActiveObject(prev => {
        prev?.canvas?.remove(frame)
        return prev
      })
      setFrame(null)
      return
    }

    fabric.Image.fromURL('../../../../../frame/beauty.png', (img) => {
      setActiveObject(prev => {
        prev?.canvas?.width && img.width && img.scale(prev.canvas.width / img.width)
        img.name = 'beauty'
        img.evented = false

        if(frame?.name) {
          prev?.canvas?.remove(frame)
        }

        prev?.canvas?.add(img)
        prev?.canvas?.renderAll()
        
        return prev
      })

      setFrame(img)
    })
  }

  return (
    <FrameTemplate
      name='キレイ'
      image='/frame/beauty.png'
      selected={ frame?.name === 'beauty' }
      handle={ handleTemplate }
    />
  )
}

export default Beauty