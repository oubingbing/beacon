var app = getApp()

Page({
  data: {
    list: [],
    pageSize: 10,
    pageNumber: 0,
    initPageNumber: 0,
  },

  onLoad: function (options) {
    if(options.type ==1){
      this.getCollectList();
      wx.setNavigationBarTitle({title:"收藏"})
    }else{
      this.getViewList();
      wx.setNavigationBarTitle({ title: "浏览记录" })
    }
  },

  getCollectList() {
    let _this = this;
    app.http("GET", "/collect_note" + `?pageSize=${this.data.pageSize}&pageNumber=${this.data.pageNumber}`, {}, function (res) {
      _this.setData({ showGeMoreLoadin: false })
      let resData = res.data;
      let list = _this.data.list;
      if (resData.error_code == 0) {
        if (resData.data != undefined) {
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

  getViewList() {
    let _this = this;
    app.http("GET", "/view_log" + `?pageSize=${this.data.pageSize}&pageNumber=${this.data.pageNumber}`, {}, function (res) {
      _this.setData({ showGeMoreLoadin: false })
      let resData = res.data;
      let list = _this.data.list;
      if (resData.error_code == 0) {
        if (resData.data != undefined) {
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
})