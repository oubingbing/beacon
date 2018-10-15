
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
      console.log(userStorage)
      this.setData({
        user: userStorage
      })
    }

    this.getPersonalInfo();
  },

  /**
   * 获取个人信息
   */
  getPersonalInfo() {

    let _this = this;

    app.http('get', `/user`, {}, res => {
      console.log(res.data.data);
      _this.setData({
        user: res.data.data
      })
      wx.setStorageSync('user', res.data.data);
    });
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
   * 进入关注
   */
  openFollowUser: function () {
    wx.navigateTo({
      url: '/pages/follow/follow'
    })
  },

  /**
   * 进入关注
   */
  openAbout: function () {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
})