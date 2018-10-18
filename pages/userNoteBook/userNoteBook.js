var app = getApp()

Page({

  data: {
    user:'',
    id: '',
    followAuthor:false,
    folowNumber:0
  },
  onLoad: function (options) {
    let _this = this;
    this.setData({ id: options.id })
    this.getList();
  },

  getList() {
    let _this = this;
    let id = _this.data.id;
    app.http("GET", `/user/${id}/category`, {}, function (res) {
      _this.setData({ showGeMoreLoadin: false })
      let resData = res.data;
      console.log(resData)
      _this.setData({
          user: resData.data, 
          followAuthor: resData.data.follow_author,
          folowNumber: resData.data.follow_number
        })
    })
  },

  openCategory:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/noteBookList/noteBookList?id=${id}`
    })
  },

  /**
 * 关注作者或者文章
 */
  followAuthor: function (e) {
    let objType = 1;
    let objId = this.data.user.id;

    app.http('POST', `/follow`,
      {
        obj_id: objId,
        type: objType
      }, res => {
        this.setData({ followAuthor: true, folowNumber: this.data.folowNumber+1 })
      })
  },

  /**
   * 取消关注作者
   */
  cancelFollowAuthor: function (e) {
    let objType = 1;
    let objId = this.data.user.id;

    app.http('POST', `/cancel_follow`,
      {
        obj_id: objId,
        type: objType
      }, res => {
        console.log(res.data);
        let resData = res.data;
        if (resData.error_code == 0) {
          this.setData({ followAuthor: false, folowNumber: this.data.folowNumber-1 })
        }
      })
  },

  /**
* 进入专辑详情页面
*/
  openUser: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/userNoteBook/userNoteBook?id=' + id
    })
  },
})