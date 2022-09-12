import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react"
import { useRouter } from "next/router"
import Cropper from "react-easy-crop"
import { Point, Area } from "react-easy-crop/types"
import getCroppedImg from "@/lib/getCroppedImg"
import Header from '@/atoms/Header'

type Props = {
  selectImage: string
  setCropImage: Dispatch<SetStateAction<string>>
}

const Crop = ({ selectImage, setCropImage }: Props) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropArea, setCropArea] = useState<Area>()
  const router = useRouter()

  useEffect(() => {
    !selectImage && router.push({ pathname: '/', query: null }, undefined, { shallow: true })
  }, [selectImage])

  const onCropComplete = useCallback(( _: Area, croppedAreaPixels: Area ) => {
    setCropArea(croppedAreaPixels)
  }, [])

  const handleNext = async () => {
    if(!cropArea) return

    try {
      const result = await getCroppedImg(selectImage, cropArea)

      if(!result) throw 'error'

      setCropImage(result)

      router.push({
        pathname: '/',
        query: { step: 'edit' }
      }, undefined, {
        shallow: true
      })
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <>
      <Header
        title='範囲を選択'
        backIcon={
          <button
            onClick={ () => router.push('/') }
          >
            戻る
          </button>
        }
        forwardIcon={
          <button
            className="text-[#2cb696]"
            onClick={ handleNext }
          >
            次へ
          </button>
        }
      />

      <div className="mt-4 flex flex-col items-center">
        <div
          className='
            w-[calc(100%-32px)]
            h-auto
            aspect-square
            relative
          '
        >
          <Cropper
            image={ selectImage }
            crop={ crop }
            zoom={ zoom }
            aspect={ 16 / 9 }
            onCropChange={ setCrop }
            onCropComplete={onCropComplete}
            onZoomChange={ setZoom }
          />
        </div>

        <div
          className="
            w-full
            mt-4
            flex
            items-center
          "
        >
          <span className="text-2xl mr-1 select-none material-symbols-rounded">
            縮小
          </span>

          <input
            className="grow mx-1"
            type='range'
            min={ 1 }
            max={ 3 }
            step={ 0.1 }
            value={ zoom }
            onChange={ (e) => setZoom(Number(e.target.value)) }
          />

          <span className="text-2xl mr-1 select-none material-symbols-rounded">
            拡大
          </span>
        </div>
      </div>
    </>
  )
}

export default Crop