import {
  StyleSheet
} from 'react-native'
// @ts-ignore
import {ifIphoneX} from 'react-native-iphone-x-helper'
import {VIEW_LAYOUT} from './config'
let navH = ifIphoneX(VIEW_LAYOUT.TOP_VIEW_HEIGHT + 22, VIEW_LAYOUT.TOP_VIEW_HEIGHT)
let navTop = ifIphoneX(22, 0)
export default StyleSheet.create({
  navBarStyle: {
    marginTop: navTop,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  navBarContainer: {
    backgroundColor: '#FFFFFF',
    height: navH
  },
  titleBottom: {
    position: 'absolute',
    bottom: -7,
    height: 44,
    justifyContent: 'center'
  },
  rightButton: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center'
  },
  rightButtonText: {
    marginLeft: 5,
    fontWeight: 'bold'
  }
})
