const app = getApp()

Page({


  data: {
    list: [],
    pageSize: 10,
    pageNumber: 0,
    initPageNumber: 0,
  },

  onLoad: function (options) {
    this.getFollowUsers();
  },

  getFollowUsers() {
    let _this = this;
    app.http("GET", "/follow_users" + `?pageSize=${this.data.pageSize}&pageNumber=${this.data.pageNumber}`, {}, function (res) {
      _this.setData({ showGeMoreLoadin: false })
      let resData = res.data;
      let list = _this.data.list;
      if (resData.error_code == 0) {
        if (resData.data != undefined) {
          console.log(resData.data.page_data)
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


})