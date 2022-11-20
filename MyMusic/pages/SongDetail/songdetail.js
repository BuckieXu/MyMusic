// pages/SongDetail/songdetail.js
import moment from 'moment'
import request from '../../utils/request'
import PubSub from 'pubsub-js'
const appInstance=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isPlay:'false',
      musicId:'',
      songs:[],
      type:'',
      durationTime:'',
      Time:'00:00',
      currentWidth:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 格式化时间
    
    this.BackgroundAudioManager= wx.getBackgroundAudioManager()
    // 先获取歌曲id
    this.setData({
      musicId:options.musicId
    })
    let musicId=options.musicId
    // 获取歌曲详情
    this.getMusicInfo(musicId)
        // 判断当前音乐是否在播放 
    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId ===musicId){
          // 修改当前页面的播放状态为true
          this.setData({
            isPlay:true
          })
      }
      this.BackgroundAudioManager.onPlay(()=>{
        this.setData({
          isPlay:true
        })
        appInstance.globalData.isMusicPlay = true;
        appInstance.globalData.musicId=this.data.musicId
      });
      this.BackgroundAudioManager.onPause(()=>{
        this.setData({
          isPlay:false
        })  
        appInstance.globalData.isMusicPlay = false; 
      });
      this.BackgroundAudioManager.onStop(()=>{
        this.setData({
          isPlay:false
        })
        appInstance.globalData.isMusicPlay = false;
      });
      this.BackgroundAudioManager.onEnded(() => {
        // 自动切换至下一首音乐，并且自动播放
        PubSub.publish('GetType','next')
        PubSub.subscribe('GetmusicId',(msg,musicId)=>{
          this.getMusicInfo(musicId)
          this.musicControl(true,musicId)
          PubSub.unsubscribe('GetmusicId')
     })
        // 将实时进度条的长度还原成 0；时间还原成 0；
        this.setData({
          currentWidth: 0,
          Time: '00:00'
        })
      });
      this.BackgroundAudioManager.onTimeUpdate(() => {
        // 格式化实时的播放时间
        let Time = moment(this.BackgroundAudioManager.currentTime * 1000).format('mm:ss');
        let currentWidth = this.BackgroundAudioManager.currentTime/this.BackgroundAudioManager.duration * 450;
        this.setData({
          Time,
          currentWidth
        });
      })
    this.changePlay()
   
  },
  // 获取传来的类型
  handleSwitch(event){
     let type=event.currentTarget.id
     this.setData({
       type
     })
     this.BackgroundAudioManager.stop()
     PubSub.subscribe('GetmusicId',(msg,musicId)=>{
      this.getMusicInfo(musicId)
      this.musicControl(true,musicId)
      PubSub.unsubscribe('GetmusicId')
 })
   // 消息发布
   PubSub.publish('GetType',this.data.type)
  },
  //改变是否播放
  changePlay(){
    let isPlay=!this.data.isPlay
    let musicId=this.data.musicId
    this.musicControl(isPlay,musicId)
    this.setData({
      isPlay 
    })
    appInstance.globalData.isMusicPlay = isPlay;
    
    
  },
  // 获取歌曲详情
  async getMusicInfo(musicId){
      let result=await request('/song/detail',{ids:musicId})
      let durationTime=moment(result.songs[0].dt).format('mm:ss')
      this.setData({
        songs:result.songs,
        durationTime
      })
  },
  // 控制音乐播放、暂停的问题
  async musicControl(isPlay,musicId){
     if(isPlay){
        //  获取音乐播放连接
        let musicLinkData= await request('/song/url',{id:musicId})
        let musicLink=musicLinkData.data[0].url      
        this.BackgroundAudioManager.src=musicLink
        this.BackgroundAudioManager.title=this.data.songs[0].name  
     }else{
      this.BackgroundAudioManager.pause()
     }
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