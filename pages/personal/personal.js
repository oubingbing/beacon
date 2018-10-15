
const app = getApp();

Page({
  data: {
    user: '',
    newLetterNumber: 0,
    serviceId: ''
  },
  onLoad: function () {
    let userStorage = wx.getStorageSync('user');
    if (userStorage) {
      this.setData({
        user: userStorage
      })
    }
  },



  /**
   * 进入绑定页面
   */
  openBind: function () {
    wx.navigateTo({
      url: '/pages/bindPhone/bindPhone'
    })
  },

  /**
    * 进入收藏记录
    */
  openCollect: function () {
    wx.navigateTo({
      url: '/pages/viewLog/viewLog?type=1'
    })
  },

  /**
   * 进入浏览记录
   */
  openViewLog: function () {
    wx.navigateTo({
      url: '/pages/viewLog/viewLog?type=2'
    })
  },

  /**
   * 进入浏览记录
   */
  openFollowUser: function () {
    wx.navigateTo({
      url: '/pages/follow/follow'
    })
  },
})