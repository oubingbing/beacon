// pages/test/test.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    id:'',
    article:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;

    var that = this;
    app.http('get', `/article/`+id,
      {}, res => {
        let data = app.towxml.toJson(res.data.data.content, 'markdown');

        data.theme = 'light';

        //设置数据
        that.setData({
          content: data,
          article: res.data.data
        });
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})