import { fabric } from 'fabric'
import type { FrameTemplateProps } from '@/types/type'
import FrameTemplate from '@/atoms/FrameTemplate'

const Neon = ({ setActiveObject, frame, setFrame }: FrameTemplateProps) => {  
  const handleTemplate = () => {
    if(frame?.name === 'neon') {
      setActiveObject(prev => {
        prev?.canvas?.remove(frame)
        return prev
      })
      setFrame(null)
      return
    }

    fabric.Image.fromURL('../../../../../frame/neon.png', (img) => {
      
      setActiveObject(prev => {
        prev?.canvas?.width && img.width && img.scale(prev.canvas.width / img.width)
        img.name = 'neon'
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
      name='ネオン'
      image='/frame/neon.png'
      selected={ frame?.name === 'neon' }
      handle={ handleTemplate }
    />
  )
}

export default Neon