import { fabric } from 'fabric'
import type { FrameTemplateProps } from '@/types/type'
import FrameTemplate from '@/atoms/FrameTemplate'

const Gaming = ({ setActiveObject, frame, setFrame }: FrameTemplateProps) => {  
  const handleTemplate = () => {
    if(frame?.name === 'gaming') {
      setActiveObject(prev => {
        prev?.canvas?.remove(frame)
        return prev
      })
      setFrame(null)
      return
    }

    fabric.Image.fromURL('../../../../../frame/gaming.png', (img) => {
      
      setActiveObject(prev => {
        prev?.canvas?.width && img.width && img.scale(prev.canvas.width / img.width)
        img.name = 'gaming'
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
      name='ゲーミング'
      image='/frame/gaming.png'
      selected={ frame?.name === 'gaming' }
      handle={ handleTemplate }
    />
  )
}

export default Gaming