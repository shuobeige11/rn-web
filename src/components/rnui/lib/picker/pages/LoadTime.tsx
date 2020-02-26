import React, { Component } from 'react'
import { 
  View, 
  StyleSheet,
  Dimensions,
} from 'react-native'
import moment from 'moment'
import TitleBar from '../component/TitleBar'
import Cell from '../component/Cell'
import MBModal from  '../component/YMMModal'
import '../PropsType'
const nowDay = moment().hours(23).minutes(59).seconds(59).valueOf()
const width = Dimensions.get('window').width
const cellWidth = Math.round(width / 3)

interface Pos {
  pos1: number, // 第一列滑动位置
  pos2: number, // 第二列滑动位置
  pos3: number  // 第三列滑动位置
}
interface Data {
  value1: Values,
  value2: Values,
  value3: Values
}

interface State {
  pos: Pos,
  value: Data,
  data1: Array<Values>, // 第一列数据
  data2: Array<Values>, // 第二列数据
  data3: Array<Values> // 第三列数据
}

interface LoadTimeProps extends Props {
  deliveryScene: number,
  spans: number
}

const pickers = StyleSheet.create({
  picker: {
    position: 'absolute',
    zIndex: 10000,
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    height: 255,
    borderRadius: 8
  },
  row: {
    width,
    flexDirection: 'row',
    height: 235
  }
})

export default class LoadTime extends Component<LoadTimeProps, State> {

  /**
   * 初始化相关信息
   */
  showBtn: boolean = false
  count: number = 0
  data1: Array<Values> = [{
    id: nowDay,
    text: '今天'
  }, {
    id: moment(nowDay).add(1, 'days').valueOf(),
    text: '明天'
  }, {
    id: moment(nowDay).add(2, 'days').valueOf(),
    text: moment(nowDay).add(2, 'days').format('MM月DD日')
  }, {
    id: moment(nowDay).add(3, 'days').valueOf(),
    text: moment(nowDay).add(3, 'days').format('MM月DD日')
  }, {
    id: moment(nowDay).add(4, 'days').valueOf(),
    text: moment(nowDay).add(4, 'days').format('MM月DD日')
  }, {
    id: moment(nowDay).add(5, 'days').valueOf(),
    text: moment(nowDay).add(5, 'days').format('MM月DD日')
  }, {
    id: moment(nowDay).add(6, 'days').valueOf(),
    text: moment(nowDay).add(6, 'days').format('MM月DD日')
  }]

  state: State = {
    pos: {
      pos1: 0,
      pos2: 0, 
      pos3: 0
    },
    value: {
      value1: {},
      value2: {},
      value3: {},
    },
    data1: this.data1,
    data2: [],
    data3: []
  }

  _onPos (pos: number, num: number, obj: Values, showBtn: boolean): boolean {
    /**
     * pos: 滑动结束的位置
     * num: 滑动矩阵属于哪一列
     * obj: 滑动返回参数
     */
    this.showBtn = showBtn
    switch (num) {
      case 0:
        this.setState({
          pos: Object.assign({}, {
            pos1: pos,
            pos2: 0,
            pos3: 0
          }),
          data2: this._getToday(pos) || [],
        }, () => {
          this.setState({
            data3: this._getHours(0, this.state.data2[0]) || []
          },  () => {
            this.setState({
              value: {
                value1: obj,
                value2: this.state.data2[0],
                value3: this.state.data3[0]
              }
            })
          })
        })
        return true
      case 1:
        this.setState({
          pos: Object.assign({}, { 
            ...this.state.pos,
            pos2: pos,
            pos3: 0
          }),
          data3: this._getHours(pos, obj) || []
        }, () => {
          this.setState({
            value: {
              ...this.state.value,
              value2: obj,
              value3: this.state.data3[0]
            }
          })
        })
        return true
      case 2:
        this.setState({
          pos: Object.assign({}, { ...this.state.pos, pos3: pos}) 
        }, () => {
          this.setState({
            value: {
              ...this.state.value,
              value3: obj
            }
          })
        })
        return true
      default:
        return true
    }
  }
  
  // 关闭控件事件
  _onCancel = () => {
    this.count = 0
    this.props && this.props.onCancel && this.props.onCancel()
  }
  
  // 点击确认事件
  _onSure = () => {
    if (!this.showBtn && this.count > 0) return
    this.props && this.props.onSure && this.props.onSure(this.state)
    this.count++
  }
  
  /**
   * 初始化时间数据
   */
  _init () {
    this.setState({
      data2: this._getToday(0) || []
    }, () => {
      this.setState({
        data3: this._getHours(0, this.state.data2[0]) || []
      }, () => {
        this.setState({
          value: {
            value1: this.state.data1[0],
            value2: this.state.data2[0],
            value3: this.state.data3[0]
          },
          pos: {
            pos1: 0,
            pos2: 0,
            pos3: 0
          }
        })
      })
    })
  }

  /***
   * 获取日期
   */
  _getDate () {
    let nowHours = moment().hour() + (this.props.deliveryScene !== 3 ? 1 : (this.props.spans || 1))
    if (nowHours > 24) this.data1.shift()
    return this.data1
  }

  /***
   * 获取当日时间分段
   */
  _getToday (pos: number) {
    let nowHours = moment().hour() + (this.props.deliveryScene !== 3 ? 1 : (this.props.spans || 1))
    if (nowHours > 24) nowHours = nowHours - 24
    let list: Array<Values> = [
    { id: 0, text: '全天' },
    { id: 1, text: '凌晨' }, 
    { id: 2, text: '上午' }, 
    { id: 3, text: '下午' }, 
    { id: 4, text: '晚上' }]
    let cache: Array<Values> = [list[0]]
    let dayArray: Array<Values> = []
    if (pos !== 0) return list
    if (nowHours < 1 || nowHours >= 19) {
      dayArray = list.splice(4) 
    }
    if (nowHours >= 13 && nowHours < 19) {
      dayArray = list.splice(3)
    }
    if (nowHours >= 7 && nowHours < 13) {
      dayArray = list.splice(2)
    }
    if (nowHours >= 1 && nowHours < 7) {
      dayArray = list.splice(1)
    }
    if (this.props.deliveryScene !== 3) dayArray = cache.concat(dayArray)
    return dayArray
  }

  /***
   * 获取当前精确时间点
   */
  _getHours (pos: number, obj: Values) {

    let list: Array<Values> = [{ id: 0, text: '都可以' }]
    let list1: Array<Values> = []
    let nowHours = moment().hour() + (this.props.deliveryScene !== 3 ? 1 : (this.props.spans || 1))
    if (nowHours > 24) nowHours = nowHours - 24
    for (let j : number = 1; j < 25; j++) {
      list1.push({id: j, text: j + ': 00'})
    } 
    for (let i: number = 0; i < 5; i++) {
      if (obj.id === i && i === 0) {
        return list
      }
      if (obj.id === i && this.state.pos.pos3 === 0) {
        let cache = list1.splice(i * 6 - 6, 6)
        if (this.state.pos.pos1 === 0) cache = cache.filter((v: any) => v.id >= nowHours)
        return pos === 0 ? cache : list.concat(cache)
      }
      if (obj.id === i) {
        return list.concat(list1.splice(i * 6 - 6, 6))
      }
    }
  }
  
  /***
   * 关闭弹出框初始化所有时间
   */
  componentWillReceiveProps (nextProps: Props) {
    if (!nextProps.visible) {
      this._init()
      this.showBtn = false
      this.count = 0
    }
  }

  /***
   * 初始化所有时间
   */
  componentDidMount () {
    this.setState({
      data1: this._getDate()
    }, () => {
      this._init()
    })
  }
  
  render() {
    return (
      <View>
      {this.props.visible ? <MBModal 
        visible={this.props.visible}
        onCancel={this._onCancel}>
        <View style={pickers.picker}>
          <TitleBar 
            text={'请选择装货时间'}
            onCancel={this._onCancel}
            onSure={this._onSure}
          />
          <View style={pickers.row}>
            <Cell 
              data={this.state.data1} 
              width={cellWidth}
              pos={this.state.pos.pos1}
              index={0}
              onPos={(pos:number, index:number, obj:object, showBtn: boolean) => this._onPos(pos, index, obj, showBtn)}
            />
            <Cell 
              data={this.state.data2} 
              width={cellWidth}
              pos={this.state.pos.pos2}
              index={1}
              onPos={(pos:number, index:number, obj:object, showBtn: boolean) => this._onPos(pos, index, obj, showBtn)}
            />
            <Cell 
              data={this.state.data3} 
              pos={this.state.pos.pos3}
              width={cellWidth}
              index={2}
              onPos={(pos:number, index:number, obj:object, showBtn: boolean) => this._onPos(pos, index, obj, showBtn)}
            />
          </View>
        </View>
      </MBModal> : null}
      </View>
    )
  }
}
