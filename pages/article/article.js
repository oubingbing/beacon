// pages/test/test.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.http('get', `/article`,
      {}, res => {
        let data = app.towxml.toJson(res.data.data.content, 'markdown');

        data.theme = 'light';

        //设置数据
        that.setData({
          article: data
        });
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})