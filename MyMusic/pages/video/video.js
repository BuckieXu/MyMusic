import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navVideoList:[],
    navId:'',
    VideoList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取导航数据
    this.getVideoGroupListData();
    let navId=this.data.navId
    this.getVideoListData(navId)
  },
  //  获取导航数据
  async getVideoGroupListData(){ 
    let result= await request('/video/group/list') 
    
    this.setData({
      navVideoList:result.data.slice(0,14),
      navId:result.data[0].id
    })   
    console.log(this.data.navId);
  },
  changeNav(event){
    let navId=event.currentTarget.dataset.id;
    this.setData({
      navId: navId>>>0,
    })
    this.getVideoListData(navId)
  },
  toSearch(){
      wx.navigateTo({
        url: '/pages/search/search',
      })
  },
  // 获取视频标签下方的视频
  async getVideoListData(navId){
      let result= await request('/video/group',{id:navId})
      console.log(result);
      let VideoList=result.datas
      this.setData({
        VideoList,
      })
  },
  // 控制点击下一个视屏，之前的替换为照片

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
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '自定义转发标题'
        })
      }, 2000)
    })
    return {
      title: 'menu转发',
      promise,
      imageUrl:"../../static/images/nvsheng.jpg"
    }
  }
})