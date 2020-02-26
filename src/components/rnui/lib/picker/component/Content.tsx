import React, { Component } from 'react'
import { 
  View, 
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'
import '../PropsType'
const width = Dimensions.get('window').width
interface State {
  index: number,
  pos: number
}

const style1 = StyleSheet.create({
  cell: {
    overflow: 'hidden',
    position: 'absolute',
    height: 180,
    zIndex: 10000
  },
  animtedView: {
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: 'transparent'
  }
})


export default class Content extends Component<CellProps, State> {
  state = {
    index: 0,
    pos: 0,
  }
  timer: any
  dragType: boolean = true
  index: number = 0
  move: number = 0
  wt: number = 45 // 一行数据的高度
  max: number = 7 // 一个滑动矩阵有多少数据
  // move: boolean = false
  constructor(props: CellProps) {
    super(props)
    this.max = this.props.data.length
  }

  /**
   * 触摸屏开始事件
   * move 手指滑动距离
   * this.move = this.start - move + Math.abs(this.trans) // 矩阵移动相对位置
   */

  _onTouchMove (event: any) : boolean {
    this.move= Math.round(event.nativeEvent.contentOffset.y)
    if (this.move < 0) this.move = 0
    return true
  }


  _onGragStart (event: any) : boolean {
    const { data } = this.props
    this.setState({
      pos: data.length
    })
    return true
  }

  /**
   * 触摸屏拖拽事件
   * this.dragType 在拖拽结束时是否执行动画
   * this.timer 延迟判断this.dragType, true, 执行位移动，false不执行
   */
  _onGragEnd (event: any) : boolean {
    this._onTouchMove(event)
    this.dragType = true
    this._clearfix()
    this.timer = setTimeout(() => {
      if (this.dragType) this._onTouchEnd(event)
    }, 400)
    return true
  }
  
  /**
   * 触摸屏滚动事件
   * this.dragType 在滚动事件中标明false, 阻止拖拽事件中的动画执行
   */
  _onScrollEnd (event: any) :boolean {
    this.dragType = false
    this._clearfix()
    this._onTouchEnd(event)
    return true
  }

  /**
   * 触摸屏开始事件
   * move 手指松开位置
   * pos 手指松开，当前指向的元素位置
   * offetWidth 手指松开，矫正移动距离为this.wt 的倍数
   */

  _onTouchEnd (event: any) : boolean {
    const { data } = this.props
    let obj : Values
    let pos: number = this.move / this.wt
    pos = pos - Math.floor(pos) > 0.53 ? Math.ceil(pos) : Math.floor(pos)
    let offetWidth = pos * this.wt
    if (offetWidth > (data.length - 1) * this.wt) {
      offetWidth = (data.length - 1) * this.wt
      pos = data.length - 1
    }
    this.refs['picker'] && (this.refs['picker'] as any).scrollTo({
      x: 0,
      y: offetWidth,
      animated: false
    })
    this._clearfix()

    this.timer = setTimeout(() => this.setState({
      pos: pos
    }, () => {
      this.props.data.forEach((el, num) => {
        if (num === pos) obj = el
      });
      this.props.onPos(pos, this.props.index, obj, true)
    }), 50)  
    return true
  }


  _clearfix () {
    if (this.timer) clearTimeout(this.timer)
  }
  /**
   * 联动picker，一级滚动初始化其他两级
   * 
   */

  componentWillReceiveProps (nextProps: CellProps) {
    if (nextProps.pos === 0 && nextProps.index === this.state.index) {
      this.refs['picker'] && (this.refs['picker'] as any).scrollTo({
        x: 0,
        y: 0,
        animated: false,
      })
      this.setState({
        pos: 0
      })
    }
  }

  /**
   * 记录当前所在的滑屏矩阵属于哪一列
   */

  componentDidMount () {
    this.setState({
      index: this.props.index || 0
    })
  }
  
  render() {
    const { data, styles } = this.props
    return (
      <View style={[style1.cell, {width: styles&&styles.width?styles.width:width}]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: 'transparent'}}
          onScroll={(event:any) => this._onTouchMove(event)}
          onScrollBeginDrag={(event: any) => this._onGragStart(event)}
          onMomentumScrollEnd={(event:any) => this._onScrollEnd(event)}
          onScrollEndDrag={(event:any) => this._onGragEnd(event)}
          ref="picker">
        <View    
        style={[{ width: styles&&styles.width?styles.width:width, height: 45 * (data.length + 3)}]}
        > 
        <View style={{height:45}}></View>
        {
            data.map((v, num) => <View style={{height: 45}} key={v.id}>
            <Text style={{
                textAlign: 'center',
                lineHeight: 45,
                color: this.state.pos === num ? '#444' : '#ccc',
                fontSize: this.state.pos === num ? 16 : 14
            }}> {v.text}</Text></View>)
        }        
        </View>
        </ScrollView>
       </View>
    )
  }
}
