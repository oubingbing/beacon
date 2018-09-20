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
    let aboutStorage = wx.getStorageSync('about');
    console.log(aboutStorage)
    if (aboutStorage) {
      this.setData({
        about: aboutStorage
      })
    }
    this.getAbout();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
 * 获取用户信息
 */
  getAbout: function () {
    let _this = this;
    app.http("GET", `/user/about`, {}, function (res) {
      let resData = res.data;
      console.log(resData)
      if (resData.code == 0) {
        _this.setData({ about: resData.data });
        wx.setStorageSync('about', resData.data);
      }
    })
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