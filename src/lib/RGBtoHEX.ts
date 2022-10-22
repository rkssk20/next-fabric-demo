// ['0', '0', '0']の形式でやってきたRGBを#000000に変換
const RGBtoHex = (rgb: string[]) => {
  return rgb ? (
    "#" + rgb.map(value => {
      return ("0" + Number(value).toString( 16 )).slice( -2 )
    }).join( "" )
  ) : '#000000'
}

export default RGBtoHex