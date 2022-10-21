type Props = {
  id: string
  name: string
  value: 0 | 1
  handle: () => void
}

const Toggle = ({ id, name, value, handle }: Props) => {
  return (
    <label
      className="
        inline-flex
        relative
        items-center
        cursor-pointer
      "
      htmlFor={ id }
    >
      <input
        id={ id }
        type='checkbox'
        className="sr-only peer"
        value={ value }
        onChange={ handle }
      />

      <div
        className={ `
          w-11
          h-6
          bg-gray-200
          peer-focus:outline-none
          peer-focus:ring-4
          peer-focus:ring-blue-300
          rounded-full
          peer
          after:content-['']
          after:absolute
          after:top-[2px]
          after:left-[2px]
          after:bg-white
          after:border-gray-300
          after:border
          after:rounded-full
          after:h-5
          after:w-5
          after:transition-all
          ${
            (value === 1) && `
              after:translate-x-full
              after:border-white
              bg-blue-600
            `
          }
        ` }
      />

      <span className="ml-4">
        { name }
      </span>
    </label>
  )
}

export default Toggle