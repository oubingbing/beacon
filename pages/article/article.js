
var app = getApp()
Page({
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
    this.getNote(id);
  },

  /**
   * 获取日志详情
   */
  getNote:function(id){
    var that = this;
    app.http('get', `/note/` + id,
      {}, res => {
        let data = app.towxml.toJson(res.data.data.content, 'markdown', that);
        data.theme = 'light';
        this['event_bind_tap'] = (event) => {
          console.log(event.target.dataset._el);
          let element = event.target.dataset._el;
          if (element.tag == 'image') {
            wx.previewImage({
              current: element.attr.src,
              urls: [element.attr.src]
            })
          }
        };

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