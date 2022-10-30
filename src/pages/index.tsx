import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Loader from '@/atoms/Loader'
import Upload from '@/components/Upload'

const Crop = dynamic(() => import('@/components/Crop'), { loading: ()=> <Loader /> })
const Edit = dynamic(() => import('@/components/Edit'), { loading: () => <Loader />, ssr: false })

const Home: NextPage = () => {
  const [selectImage, setSelectImage] = useState('')
  const [cropImage, setCropImage] = useState('')
  const router = useRouter()

  return (
    (router.query.step === 'crop') ?
    <Crop selectImage={ selectImage } setCropImage={ setCropImage } />
    :
    (router.query.step === 'edit') ?
    <Edit cropImage={ cropImage } />
    :
    <Upload setSelectImage={ setSelectImage } />
  )
}

export default Home
