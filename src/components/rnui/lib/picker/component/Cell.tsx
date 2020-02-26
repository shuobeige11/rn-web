import React, { Component } from 'react'
import { 
  View,
  StyleSheet,
  Platform
} from 'react-native'
import Content from './Content'
import '../PropsType'

const pickers = StyleSheet.create({
    column: {
      flex: 1,
    },
    checked: {
      height: 45,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: '#efefef',
      marginTop: Platform.OS === 'ios' ? 45 : 55
    }
  })

export default class Cell extends Component<CellProps> {
  shouldComponentUpdate (nextProps: CellProps) {
    if (nextProps.data.length === 0) return false
    return true
  }
  
  render () {
    return (
      <View style={pickers.column}>
        <View style={[pickers.checked, {width: this.props.width}]}></View>
        <Content 
          data={this.props.data} 
          styles={{width: this.props.width}}
          pos={this.props.pos}
          index={this.props.index}
          onPos={(pos: number, index: number, obj: Values, showBtn: boolean) => this.props.onPos(pos, index, obj, showBtn)}
        />
    </View>)
  }
}