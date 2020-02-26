import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import Picker from '../components/base/Picker'

export default class HomeScreen extends Component <any, any> {
  render () {
    return (
      <View style={{ marginTop: 130}}>
        <Text>111</Text>  
        <Picker/>
      </View>
    )
  }
}

