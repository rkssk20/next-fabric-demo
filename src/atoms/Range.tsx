import styles from '@/styles/range.module.css'

type RangeType = {
  name: string
  min: number
  max: number
  value: number
  handle: (number: number) => void
}

const Range = ({ name, min, max, value, handle }: RangeType) => {
  return (
    <div key={ name } className="mt-6">
      <p>{ name }</p>

      <div
        className="
          w-full
          mt-2
          flex
          justify-between
          items-center
        "
      >
        <input
          className={
            `w-full ${ styles.range }`
          }
          type='range'
          min={ min }
          max={ max }
          value={ value }
          onChange={ e => handle(Number(e.target.value)) }
        />

        <span className="min-w-[36px] ml-2 select-none">
          { value }
        </span>
      </div>
    </div>
  )
}

export default Range