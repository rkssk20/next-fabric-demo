import { useState, useEffect } from "react"
import type { ActiveProps } from "@/types/type"
import Simple from '@/components/Edit/subCategory/frame/template/part/Simple'
import Line from '@/components/Edit/subCategory/frame/template/part/Line'
import Beauty from '@/components/Edit/subCategory/frame/template/part/Beauty'
import Kawaii from '@/components/Edit/subCategory/frame/template/part/Kawaii'
import Neon from '@/components/Edit/subCategory/frame/template/part/Neon'
import Gaming from '@/components/Edit/subCategory/frame/template/part/Gaming'

const Frame = ({ activeObject, setActiveObject }: ActiveProps) => {
  const [frame, setFrame] = useState<fabric.Image | null>(null)

  useEffect(() => {
    activeObject.canvas?.getObjects().map(item => {
      if(item.name) {
        setFrame(item as fabric.Image)
      }
    })
  }, [])

  return (
    <div className='w-full mt-6 grid grid-cols-3 overflow-y-scroll'>      
      <Simple
        setActiveObject={ setActiveObject }
        frame={ frame }
        setFrame={ setFrame }
        />

      <Line
        setActiveObject={ setActiveObject }
        frame={ frame }
        setFrame={ setFrame }
      />

      <Beauty
        setActiveObject={ setActiveObject }
        frame={ frame }
        setFrame={ setFrame }
        />
      
      <Kawaii
        setActiveObject={ setActiveObject }
        frame={ frame }
        setFrame={ setFrame }
        />
      
      <Neon
        setActiveObject={ setActiveObject }
        frame={ frame }
        setFrame={ setFrame }
        />
      
      <Gaming
        setActiveObject={ setActiveObject }
        frame={ frame }
        setFrame={ setFrame }
      />
    </div>
  )
}

export default Frame