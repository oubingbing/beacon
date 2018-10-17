var app = getApp()

Page({

  data: {
    showNoteList:false,
    myList:"",
    notes:""
  },

  onLoad: function (options) {
    this.myCategories();
  },

  onReady: function () {
  
  },

  myCategories:function(){
    let _this = this;
    app.http('get', `/my_categories`,{}, res => {
      let resData = res.data;
      if (resData.error_code == 0){
        _this.setData({myList:resData.data});
      }
    })
  },

  categoryNotes:function(id){
    let _this = this;
    app.http('get', `/category_notes/${id}`, {}, res => {
      let resData = res.data;
      if (resData.error_code == 0) {
        _this.setData({ notes: resData.data, showNoteList: true });
      }
    })
  },

  triggerNoteList:function(e){
    let id = e.currentTarget.dataset.id;
    this.setData({ notes:""})
    let show = this.data.showNoteList;
    if(show){
      this.setData({
        showNoteList: false
      })
    }else{
      this.categoryNotes(id);
    }
  },
  /**
   * 进入专辑详情页面
   */
  openDetail: function (e) {
    let id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/article/article?id=' + id
    })
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