import { ReactNode } from "react"

const Page = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className='
        w-full
        lg:max-w-[640px]
        h-[calc(100vh-54px)]
        lg:h-[calc(100vh-86px)]
        mt-[54px]
        lg:mt-[69px]
        lg:mx-auto
        p-4
        md:px-[calc((100%-496px)/2)]
        lg:p-4
        bg-white
        lg:rounded-2xl
      '
    >
      { children }
    </div>
  )
}

export default Page