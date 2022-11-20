// pages/search/search.js
import request from '../../utils/request'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeDefault: '',
    searchContent: '',
    searchresult: [],
    historyList: [],
    hotlist: [],
    isSend: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSearchPlace()
    this.getHotRank()
  },
  // 获取默认搜索关键字
  async getSearchPlace() {
    let result = await request('/search/default')
    this.setData({
      placeDefault: result.data.showKeyword
    })

  },
  // 从搜索框输入模糊查询
  handleInputChange(event) {
    this.setData({
      searchContent: event.detail.value,
    })
    if (this.data.isSend) {
      return
    }
    this.setData({
      isSend: true
    })
    this.getSearchInfo()
    setInterval(() => {
      this.setData({
        isSend: false
      })
    }, 1000);
 


  },
  //  进行模糊查询
  async getSearchInfo() {
    let result = await request('/search', {
      keywords: this.data.searchContent
    })
    this.setData({
      searchresult: result.result.songs.slice(0, 10)
    })
  },
  // 删除搜索历史记录
  deleteSearchHistory() {
    wx.showModal({
      content: '确认删除吗?',
      success: (res) => {
        if (res.confirm) {
          // 清空data中historyList
          this.setData({
            historyList: []
          })
          // 移除本地的历史记录缓存
          wx.removeStorageSync('searchHistory');
        }
      }
    })
  },
  // 热搜榜
  async getHotRank() {
    let result = await request('/search/hot/detail')
    this.setData({
      hotlist: result.data
    })
    console.log(this.data.hotlist);
  },
  changeInput(event){
    let msg=event.currentTarget.dataset.msg
    this.setData({
      searchContent:msg
    })
    this.getSearchInfo()
  },
  //  清除搜索框内容
  clearSearchContent() {
    this.setData({
      searchContent: '',
      searchresult: [],
    })
  },
  //播放歌曲，前往歌曲详情页
  bofang(event) {
    let musicId = event.currentTarget.dataset.id;
    console.log(musicId);
    PubSub.publish('GetmusicId', musicId)
    wx: wx.navigateTo({
      url: '/pages/SongDetail/songdetail?musicId=' + musicId,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})