import React, { Component } from 'react'
import { 
  View, 
  StyleSheet,
  Dimensions,
} from 'react-native'
import '../PropsType'
import TitleBar from '../component/TitleBar'
import Cell from '../component/Cell'
import MBModal from  '../component/YMMModal'
const width = Dimensions.get('window').width

interface Pos {
  pos1: number, // 第一列滑动位置
}
interface Data {
  value1: Values,
}
interface State {
  pos: Pos,
  value: Data
}

const pickers = StyleSheet.create({
  picker: {
    position: 'absolute',
    zIndex: 100,
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    height: 235,
    borderRadius: 8
  },
  row: {
    width,
    flexDirection: 'row',
    height: 235
  }
})

export default class Picker extends Component<Props, State> {
  /**
   * 初始化相关信息
   */
  showBtn: boolean = false
  count: number = 0
  state: State = {
    pos: {
      pos1: 0,
    },
    value: {
      value1: {},
    }
  }

  _onPos (pos: number, num: number, obj: Values, showBtn: boolean): boolean {
    /**
     * pos: 滑动结束的位置
     * num: 滑动矩阵属于哪一列
     * obj: 滑动返回参数
     */
    this.showBtn = showBtn
    this.setState({
      pos: Object.assign({}, {
        pos1: pos,
      }),
      value: {
        value1: obj
      }
    })
    return true
  }
  
  // 关闭控件事件
  _onCancel = () => {
    this.count = 0
    this.props && this.props.onCancel && this.props.onCancel()
  }
  
  // 点击确认事件
  _onSure = (json: object) => {
    if (!this.showBtn && this.count > 0) return
    this.props && this.props.onSure && this.props.onSure(this.state.value.value1)
    this.count++
  }
  
  /***
   * 初始化所有时间
   */

  render() {
    return (
      <View>
      {this.props.visible ? <MBModal 
        visible={this.props.visible}
        onCancel={this._onCancel}>
        <View style={pickers.picker}>
          <TitleBar 
            text={this.props.title}
            onCancel={() => this._onCancel()}
            onSure={(json: object) => this._onSure(json)}
          />
          <View style={pickers.row}>
            <Cell 
              data={this.props.dataList||[]} 
              width={width}
              pos={this.state.pos.pos1}
              index={1}
              onPos={(pos:number, index:number, obj:object, showBtn: boolean) => this._onPos(pos, index, obj, showBtn)}
            />
          </View>
        </View>
      </MBModal>:null}
      </View>
    )
  }
}
