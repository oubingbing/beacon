var app = getApp()

Page({
  data: {
    list: [],
    pageSize: 10,
    pageNumber: 1,
    initPageNumber: 1,
    showGeMoreLoadin: false,
    notDataTips: false,
    ObjType:""
  },

  onLoad: function (options) {
    if(options.type ==1){
      this.getCollectList();
      wx.setNavigationBarTitle({title:"收藏"})
    }else{
      this.getViewList();
      wx.setNavigationBarTitle({ title: "浏览记录" })
    }
    this.setData({ ObjType:options.type})
  },

  getCollectList() {
    let _this = this;
    app.http("GET", "/collect_note" + `?page_size=${this.data.pageSize}&page_number=${this.data.pageNumber}`, {}, function (res) {
      _this.setData({ showGeMoreLoadin: false })
      let resData = res.data;
      let list = _this.data.list;
      if (resData.error_code == 0) {
        if (resData.data.page_data.length > 0) {
          resData.data.page_data.map(item => {
            list.push(item.note)
          })
          _this.setData({
            list: list,
            pageNumber: _this.data.pageNumber + 1
          })
        } else {
          _this.setData({ notDataTips: true })
        }
      }
    })
  },

  getViewList() {
    let _this = this;
    app.http("GET", "/view_log" + `?page_size=${this.data.pageSize}&page_number=${this.data.pageNumber}`, {}, function (res) {
      _this.setData({ showGeMoreLoadin: false })
      let resData = res.data;
      let list = _this.data.list;
      if (resData.error_code == 0) {
        if (resData.data.page_data.length > 0) {
          console.log(resData.data.page_data)
          resData.data.page_data.map(item => {
            list.push(item.note)
          })
          _this.setData({
            list: list,
            pageNumber: _this.data.pageNumber + 1
          })
        } else {
          _this.setData({ notDataTips: true })
        }
      }
    })
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

  /** 上拉加载更多
  */
  onReachBottom: function () {
    this.setData({
      showGeMoreLoadin: true,
      notDataTips: false
    })

    if (this.data.ObjType == 1){
      this.getCollectList();
    }else{
      this.getViewList();
    }
  },
})