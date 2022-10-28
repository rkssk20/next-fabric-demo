import { useState, useEffect } from 'react'
import { fabric } from 'fabric'
import type { FrameTemplateProps } from '@/types/type'
import FrameTemplate from '@/atoms/FrameTemplate'

const Kawaii = ({ setActiveObject, frame, setFrame }: FrameTemplateProps) => {  
  const handleTemplate = () => {
    if(frame?.name === 'kawaii') {
      setActiveObject(prev => {
        prev?.canvas?.remove(frame)
        return prev
      })
      setFrame(null)
      return
    }

    fabric.Image.fromURL('../../../../../frame/kawaii.png', (img) => {
      
      setActiveObject(prev => {
        prev?.canvas?.width && img.width && img.scale(prev.canvas.width / img.width)
        img.name = 'kawaii'
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
      name='かわいい'
      image='/frame/kawaii.png'
      selected={ frame?.name === 'kawaii' }
      handle={ handleTemplate }
    />
  )
}

export default Kawaii