import { useRouter } from "next/router"
import Page from "@/atoms/Page"
import Header from "@/atoms/Header"

const Post = ({ resultImage }: { resultImage: string }) => {
  const router = useRouter()

  const handleBack = () => {
    router.push({
      pathname: '/',
      query: { step: 'edit' }
    }, undefined, {
      shallow: true
    })
  }

  const handlePost = () => {
    fetch(resultImage)
    .then(res => res.blob())
    .then(blob => console.log(blob.size))
  }

  return (
    <Page>
      <Header
        title='画像を選択'
        backIcon={
          <button
            onClick={ handleBack }
          >
            戻る
          </button>
        }
        forwardIcon={
          <button
            className="text-[#2cb696]"
            onClick={ handlePost }
          >
            投稿 (仮)
          </button>
        }
      />

      <img src={ resultImage } alt='作成したサムネイル' />
    </Page>
  )
}

export default Post