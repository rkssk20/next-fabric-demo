import { useState, ChangeEvent } from "react";
import { fabric } from "fabric";

const Filter = ({ canvas }: { canvas: fabric.Canvas }) => {
  const [brightness, setBrightness] = useState<number>()
  const [contrast, setContrast] = useState<number>()
  const [saturation, setSaturation] = useState<number>()
  const [blur, setBlur] = useState<number>()
  const [pixelate, setPixelate] = useState<number>()
  const [noise, setNoise] = useState<number>()
  const [sepia, setSepia] = useState<number>()
  
  // 明るさ
  const handleBrightness = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    setBrightness(number)
  }

  // コントラスト
  const handleContrast = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    setContrast(number)
  }

  // 彩度
  const handleSadturation = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    setSaturation(number)
  }

  // ぼかし
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    setBlur(number)
  }

  // モザイク
  const handlePixelate = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    setPixelate(number)
  }

  // ノイズ
  const handleNoise = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value)
    setNoise(number)
  }

  // セピア
  const handleSepia = (e: ChangeEvent<HTMLInputElement>) => {
    setSepia(Number(e.target.value))
  }

  const filter_list = [{
    name: '明るさ',
    handle: handleBrightness,
    value: brightness,
    min: -10,
    max: 10,
    step: 1
  }, {
    name: 'コントラスト',
    handle: handleContrast,
    value: contrast,
    min: -10,
    max: 10,
    step: 1
  }, {
    name: '彩度',
    handle: handleSadturation,
    value: saturation,
    min: -10,
    max: 10,
    step: 1
  }, {
    name: 'ぼかし',
    handle: handleBlur,
    value: blur,
    min: 0,
    max: 10,
    step: 1
  }, {
    name: 'モザイク',
    handle: handlePixelate,
    value: pixelate,
    min: 0,
    max: 10,
    step: 1
  }, {
    name: 'ノイズ',
    handle: handleNoise,
    value: noise,
    min: 0,
    max: 10,
    step: 1
  }, {
    name: 'セピア',
    handle: handleSepia,
    value: sepia,
    min: 0,
    max: 1,
    step: 1
  }]

  return (
    <div
      className="
        px-6
        overflow-y-scroll
      "
    >
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
                step={ item.step }
                value={ item.value }
                onChange={ item.handle }
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