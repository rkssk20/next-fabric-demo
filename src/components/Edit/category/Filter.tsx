import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { fabric } from "fabric";
import { Image } from "fabric/fabric-impl";

type Props = {
  canvas: fabric.Canvas
  setCanvas: Dispatch<SetStateAction<fabric.Canvas | undefined>>
}

type StateType = {
  value: number,
  index: number
} | null

type applyFilterType = {
  filter: fabric.IBrightnessFilter | boolean
  value: number
  setState: Dispatch<SetStateAction<StateType>>
}

type applyFilterValueType = applyFilterType & {
  index: number
}

const Filter = ({ canvas, setCanvas }: Props) => {
  const [brightness, setBrightness] = useState<StateType>(null)
  const [contrast, setContrast] = useState<StateType>(null)
  const [saturation, setSaturation] = useState<StateType>(null)
  const [blur, setBlur] = useState<StateType>(null)
  const [pixelate, setPixelate] = useState<StateType>(null)
  const [sepia, setSepia] = useState<StateType>(null)

  useEffect(() => {
    // @ts-ignore
    const filters = canvas.getActiveObject().filters as fabric.Image.filters.Brightness[]

    if(filters.length > 0) {
      filters.map((item, index) => {
        (item instanceof fabric.Image.filters.Brightness) ? setBrightness({ value: filters[index].brightness, index }) :
        (item instanceof fabric.Image.filters.Contrast) ? setContrast({ value: filters[index].contrast, index }) :
        (item instanceof fabric.Image.filters.Saturation) ? setSaturation({ value: filters[index].saturation, index }) :
        // @ts-ignore
        (item instanceof fabric.Image.filters.Blur) ? setBlur({ value: filters[index].blur, index }) :
        (item instanceof fabric.Image.filters.Pixelate) ? setPixelate({ value: filters[index].blocksize, index }) :
        (item instanceof fabric.Image.filters.Sepia) && setSepia({ value: 1, index })
      })
    }
  }, [])

  // フィルターの追加
  const applyFilter = ({ filter, value, setState }: applyFilterType) => {
    const prev = canvas
    const obj = prev.getActiveObject() as unknown as Image
    const filters = obj.filters as (boolean | fabric.IBrightnessFilter)[]

    if(!filters) return

    const index = filters.length    

    filters[index] = filter

    setState({
      value,
      index
    })

    obj.applyFilters()
    prev.renderAll()

    setCanvas(prev)
  }
  
  // フィルターの値を変更
  const applyFilterValue = ({ filter, value, setState, index }: applyFilterValueType) => {
    const obj = canvas.getActiveObject() as unknown as Image

    if(!obj.filters) return
  
    // @ts-ignore
    obj.filters[index] = filter
  
    obj.applyFilters()
    canvas.renderAll()

    setState(prev => {
      if(!prev) return null

      return {
        value,
        index: prev.index
      }
    })
  }
  
  // 明るさ
  const handleBrightness = (number: number) => {
    const value = number / 20    

    if(brightness === null) {
      applyFilter({
        filter: (number !== 0) && new fabric.Image.filters.Brightness({
          brightness: value
        }),
        value,
        setState: setBrightness
      })
    } else {
      applyFilterValue({
        filter: (number !== 0) && new fabric.Image.filters.Brightness({
          brightness: value
        }),
        value,
        setState: setBrightness,
        index: brightness.index
      })
    }
  }

  // コントラスト
  const handleContrast = (number: number) => {
    const value = number / 20

    if(contrast === null) {
      applyFilter({
        filter:(number !== 0) &&  new fabric.Image.filters.Contrast({
          contrast: value
        }),
        value,
        setState: setContrast
      })
    } else {
      applyFilterValue({
        filter:(number !== 0) &&  new fabric.Image.filters.Contrast({
          contrast: value
        }),
        value,
        setState: setContrast,
        index: contrast.index
      })
    }
  }

  // 彩度
  const handleSaturation = (number: number) => {
    const value = number / 10

    if(saturation === null) {
      applyFilter({
        filter: (number !== 0) && new fabric.Image.filters.Saturation({
          saturation: value
        }),
        value,
        setState: setSaturation
      })
    } else {
      applyFilterValue({
        filter: (number !== 0) && new fabric.Image.filters.Saturation({
          saturation: value
        }),
        value,
        setState: setSaturation,
        index: saturation.index
      })
    }
  }

  // モザイク
  const handlePixelate = (number: number) => {
    const value = number * 5

    if(pixelate === null) {
      applyFilter({
        filter: (number !== 0) && new fabric.Image.filters.Pixelate({
          blocksize: value
        }),
        value,
        setState: setPixelate
      })
    } else {
      applyFilterValue({
        filter: (number !== 0) && new fabric.Image.filters.Pixelate({
          blocksize: value
        }),
        value,
        setState: setPixelate,
        index: pixelate.index
      })
    }
  }

  // ぼかし
  const handleBlur = (number: number) => {
    const value = number / 10

    if(blur === null) {
      applyFilter({
        // @ts-ignore
        filter: (number !== 0) && new fabric.Image.filters.Blur({
          blur: value
        }),
        value,
        setState: setBlur
      })
    } else {
      applyFilterValue({
        // @ts-ignore
        filter: (number !== 0) && new fabric.Image.filters.Blur({
          blur: value
        }),
        value,
        setState: setBlur,
        index: blur.index
      })
    }
  }

  // セピア
  const handleSepia = (number: number) => {
    if(sepia === null) {
      applyFilter({
        filter: (number !== 0) && new fabric.Image.filters.Sepia(),
        value: number,
        setState: setSepia
      })
    } else {
      applyFilterValue({
        filter: (number !== 0) && new fabric.Image.filters.Sepia(),
        value: number,
        setState: setSepia,
        index: sepia.index
      })
    }
  }

  const filter_list = [{
    name: '明るさ',
    handle: handleBrightness,
    value: (brightness === null) ? 0 : brightness.value * 20,
    min: -10,
    max: 10
  }, {
    name: 'コントラスト',
    handle: handleContrast,
    value: (contrast === null) ? 0 : contrast.value * 20,
    min: -10,
    max: 10
  }, {
    name: '彩度',
    handle: handleSaturation,
    value: (saturation === null) ? 0 : saturation.value * 10,
    min: -10,
    max: 10
  }, {
    name: 'モザイク',
    handle: handlePixelate,
    value: (pixelate === null) ? 0 : pixelate.value / 5,
    min: 0,
    max: 10
  }, {
    name: 'ぼかし',
    handle: handleBlur,
    value: (blur === null) ? 0 : blur.value * 10,
    min: 0,
    max: 10
  }, {
    name: 'セピア',
    handle: handleSepia,
    value:  (sepia === null) ? 0 : sepia.value,
    min: 0,
    max: 1
  }]

  return (
    <div className="px-6 overflow-y-scroll">
      {
        filter_list.map(item => (
          <div key={ item.name } className="mt-6">
            <p>{ item.name }</p>

            <div
              className="
                w-full
                mt-2
                flex
                justify-between
              "
            >
              <input
                className="w-[calc(100%-50px)]"
                type='range'
                min={ item.min }
                max={ item.max }
                value={ item.value }
                onChange={ e => item.handle(Number(e.target.value)) }
              />

              <span className="ml-2 select-none">
                { item.value }
              </span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Filter