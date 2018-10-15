const app = getApp()

Page({
  data: {
    list: [],
    pageSize: 10,
    pageNumber: 1,
    initPageNumber: 1,
    showGeMoreLoadin: false,
    notDataTips: false,
  },
  onLoad: function (options) {
    let _this = this;
    this.getList();
  },

  getList() {
    let _this = this;
    _this.setData({ notDataTips: false})
    app.http("GET", "/notes" + `?page_size=${this.data.pageSize}&page_number=${this.data.pageNumber}&note_type=1`, {}, function (res) {
      _this.setData({ showGeMoreLoadin: false })
      let resData = res.data;
      let list = _this.data.list;
      console.log(resData.data)
      if (resData.error_code == 0) {
        if (resData.data.page_data.length > 0) {
          resData.data.page_data.map(item => {
            list.push(item)
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
    this.getList();
  },
})