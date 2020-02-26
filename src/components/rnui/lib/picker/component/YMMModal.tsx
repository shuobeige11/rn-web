import React, { Component } from 'react'
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'
import '../PropsType'
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
export default class YMMModal extends Component<Props, any> {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.props.visible}
        onRequestClose={() => this.props.onCancel && this.props.onCancel()}
      >
        <TouchableWithoutFeedback style={styles.mask} onPress={() => this.props.onCancel && this.props.onCancel()}>
          <View style={styles.mask}></View>
        </TouchableWithoutFeedback>
        { this.props.children }
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  mask: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    bottom: 0,
    height: height + 150
  },
  contentBox: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflow: 'hidden',
  },

})
