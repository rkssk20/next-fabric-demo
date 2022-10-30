import { fabric } from 'fabric'
import type { FrameTemplateProps } from '@/types/type'
import FrameTemplate from '@/atoms/FrameTemplate'

const Simple = ({ setActiveObject, frame, setFrame }: FrameTemplateProps) => {  
  const handleTemplate = () => {
    if(frame?.name === 'simple') {
      setActiveObject(prev => {
        prev?.canvas?.remove(frame)
        return prev
      })
      setFrame(null)
      return
    }

    fabric.Image.fromURL('../../../../../frame/simple.png', (img) => {
      
      setActiveObject(prev => {
        prev?.canvas?.width && img.width && img.scale(prev.canvas.width / img.width)
        img.name = 'simple'
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
      name='シンプル'
      image='/frame/simple.png'
      selected={ frame?.name === 'simple' }
      handle={ handleTemplate }
    />
  )
}

export default Simple