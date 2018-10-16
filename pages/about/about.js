const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    about:'',
    imageUrl: app.globalData.imageUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 分享
   */
  onShareAppMessage: function (res) {
    return {
      title: "好似一叶扁舟独自远航，迷茫时才发现，灯塔早已亮起",
      path: '/pages/index/index',
      imageUrl: "",
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})