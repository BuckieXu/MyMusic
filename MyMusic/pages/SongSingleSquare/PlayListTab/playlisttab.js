import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: [],
    sub: [],
    arr:[],
    categories:['语种','风格','场景','情感','主题']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPlayTabAll()

  },
  async getPlayTabAll() {
    let result = await request('/playlist/catlist');
    console.log(result);
    this.setData({
      sub: result.sub
    })
    this.getClassifyTab()
  },
  getTylpeList(sub, category) {
    let arr = []
    for (let i = 0; i < sub.length; i++) {
      if (i == 0) {
        let obj = {
          [category]: sub[0][category],
          list: [sub[0]]
        }
        arr.push(obj)
      } else {
        let is = -1;
        for (let j = 0; j < arr.length; j++) {
          if (sub[i][category] == arr[j][category]) {
            is = j;
            break;
          } else {
            is = -1;
          }
        }
        if (is == -1) {
          let obj = {
            [category]: sub[i][category],
            list: [sub[i]]
          }
          arr.push(obj)
        } else {
          arr[is].list.push(sub[i])
        }
      }
    }
    return arr;
  },
  // 计算不同种类的标签
  getClassifyTab() {
    let sub = this.data.sub;
    let arr = this.getTylpeList(sub, 'category');
    console.log(arr);
  this.setData({
    arr
  })
  },
  ToPlaylistDetail(event){
    console.log(event);
    let name=event.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/SongSingleSquare/songsinglesquare?name='+name

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