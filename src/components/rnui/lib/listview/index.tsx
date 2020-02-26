import React, {Component} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import RefreshState from './RefreshState';
import RefreshFooter from './RefreshFooter';
import './PropsType'

type MoreProps = FlatListProps<any> & Props

interface State{
  isHeaderRefreshing: boolean
  isFooterRefreshing: boolean
  footerState: string,
  count: number,
  tabs: number
}

export default class RefreshListView extends Component<MoreProps, State> {
  constructor(props: MoreProps) {
    super(props);
    this.state = {
      isHeaderRefreshing: false,  // 头部是否正在刷新
      isFooterRefreshing: false,  // 尾部是否正在刷新
      footerState: RefreshState.Idle, // 尾部当前的状态，默认为Idle，不显示控件,
      count: 0,
      tabs: 0,
    }
  }

  componentWillReceiveProps (props: MoreProps) {
    if (props.tabs === this.state.tabs) return
    this.setState({
      isHeaderRefreshing: false,  // 头部是否正在刷新
      isFooterRefreshing: false,  // 尾部是否正在刷新
      footerState: RefreshState.Idle, // 尾部当前的状态，默认为Idle，不显示控件,
      count: 0
    })
  }

  render() {
    return (
      <FlatList
        {...this.props}
        onRefresh={()=>{ this.startHeaderRefreshing() }}
        refreshing={this.state.isHeaderRefreshing}
        onEndReached={() => { this.startFooterRefreshing() }}
        onEndReachedThreshold={0.1}  // 这里取值0.1，可以根据实际情况调整，取值尽量小
        ListFooterComponent={this._renderFooter}
      />
    )
  }
  
  _renderFooter = () => {
    return (
      <RefreshFooter
        state={this.state.footerState}
        data={this.props.data}
        tabs={this.props.tabs}
        count={this.props.data.length}
        onRetryLoading={()=>{
          this.startFooterRefreshing()
        }}
      />
    )
  };
  
  /// 下拉刷新，设置完刷新状态后再调用刷新方法，使页面上可以显示出加载中的UI，注意这里setState写法
  startHeaderRefreshing() {
    this.props.onHeaderRefresh && this.props.onHeaderRefresh().then((v: any) => this.setState({
      isHeaderRefreshing: false,
      isFooterRefreshing: true,
      footerState: RefreshState.Idle
    }))
  }
  
  /// 上拉加载更多，将底部刷新状态改为正在刷新，然后调用刷新方法，页面上可以显示出加载中的UI，注意这里setState写法
  startFooterRefreshing() {
    this.setState(
      { 
        isFooterRefreshing: true
      },
      () => {
        if (!this.props.after && this.state.footerState === RefreshState.Idle) {
          this.setState({
            footerState: this.state.footerState === RefreshState.Idle && this.props.tabs === this.state.tabs && this.props.tabs !== 0 ? RefreshState.refreshing : this.props.tabs === 0 ? RefreshState.NoMoreData : this.state.footerState,
            tabs: this.props.tabs
          })
          return
        }
        this.footRefreshing()
      }
    );
  }

  footRefreshing () {
    if (!this.props.after) {
      this.setState({
        footerState: RefreshState.NoMoreData,
        isFooterRefreshing: false,
        isHeaderRefreshing: false,
        count: 0
      })
      return
    }
    this.props.onFooterRefresh && this.props.onFooterRefresh().then(v => {
      this.setState({
        footerState: this.state.count !== this.props.data.length ? RefreshState.refreshing : RefreshState.NoMoreData,
        isFooterRefreshing: false,
        isHeaderRefreshing: false
      }, () => {
        this.setState({
          count: this.props.data.length
        })
      })
    })
  }
}
