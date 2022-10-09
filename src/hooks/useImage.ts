import { useState, useEffect  } from "react"
import { useRouter } from "next/router"

const useImage = (cropImage: string) => {
  const [image, setImage] = useState<HTMLImageElement>()
  const router = useRouter()
  
  useEffect(() => {
    if(!cropImage) {
      router.push({
        pathname: '/',
        query: null
      }, undefined, {
        shallow: true
      })
    }

    const handleImage = () => {
      setImage(newImage)
    }

    const newImage = new Image
    newImage.src = cropImage
    newImage.addEventListener('load', handleImage)
  
    return () => newImage.removeEventListener('load', handleImage)
  }, [cropImage])

  return image
}

export default useImage