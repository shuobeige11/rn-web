import React, { Component } from 'react'
import { 
  View, 
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native'
import '../PropsType'
const width = Dimensions.get('window').width

interface State {}

const styles = StyleSheet.create({
  titleBar: {
    width,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#efefef'
  },
  titles: {
    textAlign: 'left',
    fontSize: 16
  }
})
export default class TitleBar extends Component<Props, State> {
  onCancel = () => {
    this.props.onCancel && this.props.onCancel()
  }

  onSure = (json: any) => {
    this.props.onSure && this.props.onSure(json)
  }

  render() {
    const { text } = this.props 
    return (
      <View style={styles.titleBar}>
        <View style={{flex: 1.5, paddingLeft: 20}}>
            <TouchableOpacity onPress={this.onCancel} style={{width: 80, height: 40}}>
                <Text style={[styles.titles, {color: '#666', lineHeight: Platform.OS === 'ios' ? 40 : 32}]}>取消</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flex: 7 }}>
          <Text style={{textAlign: 'center', color: '#333', fontSize: 16}}>{text}</Text>
        </View>
        <View style={{flex: 1.5, paddingRight: 20}}>
           <TouchableOpacity onPress={this.onSure} style={{width: 80, height: 40}}>
              <Text style={[styles.titles, {color: '#FF5B00', textAlign: 'center', lineHeight: Platform.OS === 'ios' ? 40 : 32}]}>确定</Text>
           </TouchableOpacity>
        </View>
      </View>
    )
  }
}
