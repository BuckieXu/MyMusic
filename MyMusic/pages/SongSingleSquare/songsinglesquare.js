import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlistTag:[],
    navId:[],
    playlists:[],
    ouname:'',
    TabName:'',
    isplay:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let TabName=options.name
    this.setData({
      TabName
    })
    if(TabName){
      this.getPlaylistBycat(TabName)
      this.setData({
        isplay:false
      })
    }else{
      this.getPlaylistHot()
      let name=this.data.ouname
      this.getPlaylistBycat(name)
    }
   
  },
  // 获取热门歌单分类，导航栏的数据
  async getPlaylistHot(){
       let result=await request('/playlist/hot')
       this.setData({
        playlistTag:result.tags,
        navId:result.tags[0].id,
        ouname:result.tags[0].name
       })
      //  console.log(this.data.playlistTag);
  },
  // 切换导航栏
  changeNav(event){
    let name=event.currentTarget.dataset.name
    let navId=event.currentTarget.dataset.type
    this.setData({
      navId
    })
    this.getPlaylistBycat(name)
  },
  // 通过导航的值获取歌曲分类详细列表
  async getPlaylistBycat(name){
    let result=await request('/top/playlist',{cat:name})
    console.log(result);
    this.setData({
      playlists:result.playlists,
      
    })
  },
  // 去歌曲详情页
  goPlaylist(event){
    let id=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/playlist/playlist?id='+id,
    })
  },
  // 去歌曲标签页
  toPlaylistTab(){
    wx.navigateTo({
      url: '/pages/SongSingleSquare/PlayListTab/playlisttab',
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