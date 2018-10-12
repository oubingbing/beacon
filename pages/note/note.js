const app = getApp()

Page({
  data: {
    list: [],
  },
  onLoad: function (options) {
    let _this = this;
    this.getList();
  },

  getList() {
    let _this = this;
    app.http("GET", "/notes" + `?pageSize=${this.data.pageSize}&pageNumber=${this.data.pageNumber}&note_type=1`, {}, function (res) {
      _this.setData({ showGeMoreLoadin: false })
      let resData = res.data;
      let list = _this.data.list;
      if (resData.error_code == 0) {
        if (resData.data != undefined) {
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
  * 预览图片
  */
  previewMoreImage: function (e) {
    let _this = this;

    let images = e.currentTarget.dataset.images;
    let image = e.currentTarget.dataset.image;

    wx.previewImage({
      current: image,
      urls: images
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