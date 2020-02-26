import React from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import styles from './styles'
// @ts-ignore
import NavigationBar from 'react-native-navbar'

export interface CommonNavBarProps {
  titleEelement: any
  rightElement?: any
  leftElement?: any
  onRight?: () => void // 右边点击事件
  onLeft: () => void // 左边点击事件
}
export default class YMMCommonNavBar extends React.Component<CommonNavBarProps> {
  constructor(props: any) {
    super(props)
  }
  render() {
    let { titleEelement } = this.props

    return (
      <View>
        <NavigationBar
          containerStyle={styles.navBarContainer}
          style={styles.navBarStyle}
          title={<View style={styles.titleBottom}>{titleEelement}</View>}
          leftButton={this.leftElement()}
          rightButton={this.rightElement()}
        />
      </View>)
  }

  leftElement = () => {
    return (
      <TouchableOpacity onPress={() => this.props.onLeft()}>
        <View style={{ width: 60, height: 44, justifyContent: 'center' }}>
          {this.props.leftElement}
        </View>
      </TouchableOpacity>
    )
  }

  rightElement = () => {
    if (this.props.rightElement === undefined) {
      return (<View />)
    } else {
      return (
        <TouchableOpacity onPress={this.rightClick}>
          <View style={{ marginRight: 15 }}>
            {this.props.rightElement}
          </View>
        </TouchableOpacity>
      )
    }
  }

  rightClick = () => {
    if (this.props.onRight) {
      this.props.onRight()
    }
  }
}
