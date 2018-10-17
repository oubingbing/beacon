var app = getApp()

Page({

  data: {
    list: [],
    id:'',
    authorId:'',
    followAuthor:'',
    followCategory:'',
    showInfo:false
  },
  onLoad: function (options) {
    let _this = this;
    this.setData({id:options.id})
    this.getList();
  },

  getList() {
    let _this = this;
    let id = _this.data.id;
    app.http("GET", `/category/${id}`, {}, function (res) {
      _this.setData({ showGeMoreLoadin: false })
      let resData = res.data;
      let list = _this.data.list;
      console.log(resData.data)
      _this.setData({
        followAuthor: resData.data.follow_author,
        followCategory: resData.data.follow_category,
        showInfo:true,
        authorId:resData.data.poster_id
      })
      if (resData.error_code == 0) {
        if (resData.data.notes.length > 0) {
          resData.data.notes.map(item => {
            list.push(item)
          })
          _this.setData({
            list: list,
          })
        } 
      }
    })
  },

  /**
   * 关注作者或者文章
   */
  followAuthor: function (e) {
    let objType = 1;
    let objId = this.data.authorId;

    app.http('POST', `/follow`,
      {
        obj_id: objId,
        type: objType
      }, res => {
        this.setData({ followAuthor: true })
      })
  },

  /**
   * 取消关注作者
   */
  cancelFollowAuthor: function (e) {
    let objType = 1;
    let objId = this.data.authorId;

    app.http('POST', `/cancel_follow`,
      {
        obj_id: objId,
        type: objType
      }, res => {
        console.log(res.data);
        let resData = res.data;
        if (resData.error_code == 0) {
          this.setData({ followAuthor: false })
        }
      })
  },

  /**
   * 收藏笔记簿
   */
  followCategory: function (e) {
    let objType = 2;
    let objId = this.data.authorId;

    app.http('POST', `/follow`,
      {
        obj_id: objId,
        type: objType
      }, res => {
        this.setData({ followCategory: true })
      })
  },

  /**
   * 取消收藏笔记簿
   */
  cancelFollowCategory: function (e) {
    let objType = 2;
    let objId = this.data.authorId;

    app.http('POST', `/cancel_follow`,
      {
        obj_id: objId,
        type: objType
      }, res => {
        console.log(res.data);
        let resData = res.data;
        if (resData.error_code == 0) {
          this.setData({ followCategory: false })
        }
      })
  },

  onShareAppMessage: function () {
  
  }
})