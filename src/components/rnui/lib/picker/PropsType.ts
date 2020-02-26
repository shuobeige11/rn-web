interface Style {
  width?: number,
  height?: number,
  left?: number,
  top?: number,
  bottom?: number,
  right?: number,
  paddingLeft?: number,
  paddingTop?: number,
  paddingRight?: number,
  paddingBottom?: number,
}

interface Values {
  id?: number | string,
  key?: number | string,
  text?: number | string
}

interface Props {
  text?: string,
  onCancel?: Function,
  onSure?: (json:any) => void,
  value?: object,
  visible?: boolean,
  title?: string,
  dataList?: Array<Values>
}

interface CellProps extends Props {
  width?: number,
  data: Array<Values>,
  pos: number,
  index?: number,
  onPos: Function,
  styles?: Style,
}