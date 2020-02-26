import React, { Component } from 'react'
import { View } from 'react-native'
// import Spinner from 'react-native-loading-spinner-overlay'

import Toast from 'react-native-root-toast'

import { Router, Route } from './common/route'
import { observer } from 'mobx-react'
import GlobalStore from './GlobalModel'
let Store = new GlobalStore()

// global.self = global // 0.44 + bug width fetch

import HomeScreen from './screens/Home'
console.disableYellowBox = true
@observer
class App extends Component {
  constructor(props: any) {
    super(props)
  }

  componentDidMount () {
    console.log('.router', Router)
  }
 
  render() {
    return (
      <Router>
        <View>
          <Route path='/' exact={true} render={(props: any) => (<HomeScreen {...props} />)}></Route>
        </View>
      </Router>
    )
  }
}

export default App

