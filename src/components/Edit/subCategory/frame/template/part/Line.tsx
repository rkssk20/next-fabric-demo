import { fabric } from 'fabric'
import type { FrameTemplateProps } from '@/types/type'
import FrameTemplate from '@/atoms/FrameTemplate'

const Line = ({ setActiveObject, frame, setFrame }: FrameTemplateProps) => {  
  const handleTemplate = () => {
    if(frame?.name === 'line') {
      setActiveObject(prev => {
        prev?.canvas?.remove(frame)
        return prev
      })
      setFrame(null)
      return
    }

    fabric.Image.fromURL('../../../../../frame/line.png', (img) => {
      
      setActiveObject(prev => {
        prev?.canvas?.width && img.width && img.scale(prev.canvas.width / img.width)
        img.name = 'line'
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
      name='ライン'
      image='/frame/line.png'
      selected={ frame?.name === 'line' }
      handle={ handleTemplate }
    />
  )
}

export default Line