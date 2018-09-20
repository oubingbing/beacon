
const app = getApp();

Page({
  data: {
    user: '',
    newLetterNumber: 0,
    serviceId: '',
    showNormal: false,
    showAudit: false
  },

  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#f78ca0'
    })
    let userStorage = wx.getStorageSync('user');
    if (userStorage) {
      this.setData({
        user: userStorage
      })
    }
    this.userInfo();
  },

  /**
   * 浏览历史记录
   */
  openLog: function (e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/history/history?type=' + type
    })
  },

  /**
   * 浏览历史记录
   */
  openAbout: function (e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  /**
   * 获取用户信息
   */
  userInfo: function () {
    let _this = this;
    app.http("GET", `/user/profile`, {}, function (res) {
      let resData = res.data;
      console.log(resData)
      if(resData.code == 0){
        _this.setData({user:resData.data});
        wx.setStorageSync('user', resData.data);
      }
    })
  },
 
  /**
  * 分享
  */
  onShareAppMessage: function (res) {
    return {
      title: '唯美图吧，唯美生活',
      path: '/pages/index/index',
      //imageUrl: '/image/share1.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 分享
   */
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.shareWord,
      path: '/pages/index/index',
      imageUrl: app.globalData.imageUrl + app.globalData.shareImage,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})