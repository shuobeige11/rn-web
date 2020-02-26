import Picker from '../rnui/lib/picker/pages/Picker'
import React, { useState } from 'react'
import { 
  View, 
  Text,
  TouchableHighlight,
} from 'react-native'

export default () => {
  const data = [{ id: 1, text: '1'}, { id:2, text: '2' }]
  const [visible, setVisible] = useState(false)
  return (
    <View>
      <TouchableHighlight onPress={() => setVisible(true)}>
        <Text>点击展示picker</Text>
      </TouchableHighlight>
      <Picker 
        onSure={(json: object) => _onSure(json, setVisible)}
        visible={visible}
        onCancel={() => setVisible(false)}
        dataList={data}
      />
    </View>  
  )
}
function _onSure <T, U> (json: T, fn: Function) {
  console.log(json)
  fn(false)
}

