import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { fabric } from "fabric";
import Range from '@/atoms/Range'

type StateType = {
  index: number,
  value: number
} | null

type FiltersType = {
  brightness: number | undefined
  contrast: number | undefined
  saturation: number | undefined
  blur: number | undefined
  blocksize: number | undefined
  sepia: typeof fabric.Image.filters.Sepia | undefined
}[]

type applyFilterType = {
  setState: Dispatch<SetStateAction<StateType>>
  value: number
  filter: fabric.IBaseFilter | boolean
}

type applyFilterValueType = applyFilterType & {
  index: number
}

type handleFilterProps = {
  state: StateType
  setState: Dispatch<SetStateAction<StateType>>
  value: number
  filter: false | fabric.IBaseFilter
}

const Filter = ({ activeObject }: { activeObject: fabric.Image }) => {
  const [brightness, setBrightness] = useState<StateType>(null)
  const [contrast, setContrast] = useState<StateType>(null)
  const [saturation, setSaturation] = useState<StateType>(null)
  const [blur, setBlur] = useState<StateType>(null)
  const [pixelate, setPixelate] = useState<StateType>(null)
  const [sepia, setSepia] = useState<StateType>(null)

  useEffect(() => {
    const filters = activeObject.filters as unknown as FiltersType

    filters && filters.map((item, index) => {
      (item.brightness) ? setBrightness({ index, value: item.brightness }) :
      (item.contrast) ? setContrast({ index, value: item.contrast }) :
      (item.saturation) ? setSaturation({ index, value: item.saturation }) :
      (item.blur) ? setBlur({ index, value: item.blur }) :
      (item.blocksize) ? setPixelate({ index, value: item.blocksize }) :
      (item.sepia) && setSepia({ index, value: 1 })
    })
  }, [])

  // フィルターの追加
  const applyFilter = async ({ setState, value, filter }: applyFilterType) => {
    const index = activeObject.filters?.length
    
    if(index === undefined) return

    // フィルターの変更
    // @ts-ignore
    activeObject.filters[index] = filter

    // フィルターの状態を変更
    setState({ value, index })

    // レンダリング
    activeObject.applyFilters()
    activeObject.canvas?.renderAll()
  }
  
  // フィルターの値を変更
  const applyFilterValue = async ({ setState, value, filter, index }: applyFilterValueType) => {
    // フィルターの変更
    // @ts-ignore
    activeObject.filters[index] = filter

    // フィルターの状態を変更
    setState(prev => {
      return { value, index: prev?.index ?? 0 }
    })
  
    // レンダリング
    activeObject.applyFilters()
    activeObject.canvas?.renderAll()
  }

  // フィルターの変更
  const handleFilter = ({ state, setState, value, filter }: handleFilterProps) => {
    if(state === null) {
      applyFilter({ filter, value, setState })
    } else {
      applyFilterValue({ filter, value, setState, index: state.index })
    }
  }  

  const filter_list = [{
    name: '明るさ',
    value: (brightness === null) ? 0 : Math.round(brightness.value * 200),
    min: -100,
    max: 100,
    handle: (number: number) => handleFilter({
      state: brightness,
      setState: setBrightness,
      value: number / 200,
      filter: (number !== 0) && new fabric.Image.filters.Brightness({
        brightness: number / 200
      })
    })
  }, {
    name: 'コントラスト',
    min: -100,
    max: 100,
    value: (contrast === null) ? 0 : Math.round(contrast.value * 200),
    handle: (number: number) => handleFilter({
      state: contrast,
      setState: setContrast,
      value: number / 200,
      filter: (number !== 0) && new fabric.Image.filters.Contrast({
        contrast: number / 200
      })
    })
  }, {
    name: '彩度',
    min: -100,
    max: 100,
    value: (saturation === null) ? 0 : Math.round(saturation.value * 100),
    handle: (number: number) => handleFilter({
      state: saturation,
      setState: setSaturation,
      value: number / 100,
      filter: (number !== 0) && new fabric.Image.filters.Saturation({
        saturation: number / 100
      })
    })
  }, {
    name: 'モザイク',
    min: 0,
    max: 100,
    value: (pixelate === null) ? 0 : (pixelate.value * 2),
    handle: (number: number) => handleFilter({
      state: pixelate,
      setState: setPixelate,
      value: number / 2,
      filter: (number !== 0) && new fabric.Image.filters.Pixelate({
        blocksize: number / 2
      })
    })
  }, {
    name: 'ぼかし',
    min: 0,
    max: 100,
    value: (blur === null) ? 0 : Math.round(blur.value * 100),
    handle: (number: number) => handleFilter({
      state: blur,
      setState: setBlur,
      value: number /100,
      // @ts-ignore
      filter: (number !== 0) && new fabric.Image.filters.Blur({
        blur: number /100
      })
    })
  }, {
    name: 'セピア',
    min: 0,
    max: 1,
    value:  (sepia === null) ? 0 : (sepia.value),
    handle: (number: number) => handleFilter({
      state: sepia,
      setState: setSepia,
      value: number,
      filter: (number !== 0) && new fabric.Image.filters.Sepia()
    })
  }]

  return (
    <div className="pb-6 px-4 overflow-y-scroll">
      {
        filter_list.map(item => (
          <Range
            key={ item.name }
            name={ item.name }
            min={ item.min }
            max={ item.max }
            value={ item.value }
            handle={ item.handle }
          />
        ))
      }
    </div>
  )
}

export default Filter