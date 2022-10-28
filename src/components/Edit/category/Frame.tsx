import type { ActiveProps } from "@/types/type"
import Simple from '@/components/Edit/subCategory/frame/template/part/Simple'
import Line from '@/components/Edit/subCategory/frame/template/part/Line'
import Beauty from '@/components/Edit/subCategory/frame/template/part/Beauty'
import Kawaii from '@/components/Edit/subCategory/frame/template/part/Kawaii'
import Neon from '@/components/Edit/subCategory/frame/template/part/Neon'
import Gaming from '@/components/Edit/subCategory/frame/template/part/Gaming'

const Frame = ({ activeObject, setActiveObject }: ActiveProps) => {

  return (
    <div className='w-full mt-6 grid grid-cols-3'>      
      <Simple
        activeObject={ activeObject }
        setActiveObject={ setActiveObject }
      />

      <Line
        activeObject={ activeObject }
        setActiveObject={ setActiveObject }
      />

      <Beauty
        activeObject={ activeObject }
        setActiveObject={ setActiveObject }
      />
      
      <Kawaii
        activeObject={ activeObject }
        setActiveObject={ setActiveObject }
      />
      
      <Neon
        activeObject={ activeObject }
        setActiveObject={ setActiveObject }
      />
      
      <Gaming
        activeObject={ activeObject }
        setActiveObject={ setActiveObject }
      />
    </div>
  )
}

export default Frame