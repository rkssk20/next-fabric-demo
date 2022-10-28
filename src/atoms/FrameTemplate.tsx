import Image from 'next/image'

type Props = {
  name: string
  image: string
  selected: boolean
  handle: () => void
}

const FrameTemplate = ({ name, image, selected, handle }: Props) => {
  return (
    <button
      className={ `
        w-24
        h-24
        mx-auto
        mb-4
        p-2
        flex
        flex-col
        items-center
        justify-center
        text-xs
        rounded-2xl
        duration-200
        border
        border-ogp-border
        border-solid
        ${
            selected ?
            'bg-[#e5e5e5]'
            :
            `
              hover:bg-[#efefef]
              active:bg-[#e5e5e5]
            `
        }
      ` }
      onClick={ handle }
    >
      <div
        className='
          w-20
          h-[45px]
          mb-2
          relative
          bg-opacity-pattern
          bg-opacity-size
          bg-opacity-position
        '
      >
        <Image
          className='absolute'
          src={ image }
          alt='フレーム'
          width='80'
          height='45'
        />
      </div>

      { name }
    </button>
  )
}

export default FrameTemplate