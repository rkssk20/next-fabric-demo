import { Dispatch, SetStateAction } from "react"

export type ShadowState = {
  rgb: string
  hex: string
  opacity: number
  offsetX: number
  offsetY: number
  blur: number
}

export type ColorState = {
  hex: string
  rgb: string
}

export type ActiveProps = {
  activeObject: fabric.Object
  setActiveObject: Dispatch<SetStateAction<fabric.Object | undefined>>
}