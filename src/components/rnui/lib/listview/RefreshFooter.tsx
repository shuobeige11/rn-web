import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import RefreshState from './RefreshState';
import './PropsType'
export default class RefreshFooter extends Component<Props> {
  
  static defaultProps = {
    footerRefreshingText: "努力加载中",
    footerLoadMoreText: "上拉加载更多",
    footerFailureText: "点击重新加载",
    footerNoMoreDataText: "已全部加载完毕"
  };
  
  render() {
    let {state, empty, data} = this.props;
    let footer = null;
    switch (state) {
      case RefreshState.Idle:
        // Idle情况下为null，不显示尾部组件
        footer = data && data.length === 0 && this.props.tabs !== 0? 
          <View style={styles.loadingView}>
            <Text style={styles.footerText}>{this.props.footerNoMoreDataText}</Text>
          </View> : null
        break;
      case RefreshState.refreshing:
        footer =
          <View style={styles.loadingView}>
            <ActivityIndicator size="small"/>
            <Text style={styles.refreshingText}>{this.props.footerRefreshingText}</Text>
          </View>;
        break;
      case RefreshState.CanLoadMore:
        footer =
          <View style={styles.loadingView}>
            <Text style={styles.footerText}>{this.props.footerLoadMoreText}</Text>
          </View>;
        break;
      case RefreshState.NoMoreData:
        footer = this.props.tabs !== 0 || this.props.count !== 0 ?
          <View style={styles.loadingView}>
            <Text style={styles.footerText}>{this.props.footerNoMoreDataText}</Text>
          </View> : <View style={styles.loadingView}>
            {{ empty }}
          </View>;
        break;
      case RefreshState.Failure:
        footer =
          <TouchableOpacity style={styles.loadingView} onPress={()=>{
            this.props.onRetryLoading && this.props.onRetryLoading();
          }}>
            <Text style={styles.footerText}>{this.props.footerFailureText}</Text>
          </TouchableOpacity>;
        break;
    }
    return footer;
  }
}

const styles = StyleSheet.create({
  loadingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  refreshingText: {
    fontSize: 12,
    color: "#666666",
    paddingLeft: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#666666"
  }
});
