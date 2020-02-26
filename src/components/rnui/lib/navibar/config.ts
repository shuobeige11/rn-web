// @ts-ignore
import {NAVBAR_HEIGHT} from 'react-native-pure-navigation-bar'
import {Dimensions} from 'react-native'

const MAP_HEIGHT = 135.0 + NAVBAR_HEIGHT + 20
const INFO_VIEW_RADIUS = 15

export const VIEW_LAYOUT = {
  TOP_VIEW_HEIGHT: NAVBAR_HEIGHT + 20,
  MAP_HEIGHT: MAP_HEIGHT,
  INFO_VIEW_RADIUS: INFO_VIEW_RADIUS,
  INFO_VIEW_MAX_TOP: MAP_HEIGHT - INFO_VIEW_RADIUS
}

const { width, height } = Dimensions.get('window')

export const SCREEN = {
  width: width,
  height: height
}
