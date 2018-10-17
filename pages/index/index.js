const app = getApp()

Page({
  data: {
    show_auth:app.globalData.show_auth,
    userInfo: {},
    list:[],
    imageUrl: app.globalData.imageUrl,
    pageSize: 10,
    pageNumber: 1,
    initPageNumber: 1,
    showGeMoreLoadin: false,
    notDataTips:false,
    sharecomeIn:false,
    detailId:'',
    optionType:''
  },

  onLoad: function (e) {
    if(e.id != undefined){
      this.setData({ sharecomeIn: true, detailId: e.id, optionType:e.type})
    }
    let eId = e.id;
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            show_auth:true
          });
        }else{
          if (eId != undefined) {
            that.setData({ sharecomeIn: false })
            if (that.data.optionType == 1){
              wx.navigateTo({
                url: '/pages/noteBookList/noteBookList?id=' + eId
              })
            }else if(that.data.optionType == 2){
              wx.navigateTo({
                url: '/pages/article/article?id=' + eId
              })
            }
          
          }
        }
      }
    })

    this.getList();
  },

  onReady(){
    //this.shareInfo()
  },
  
  onShow: function (option) {
    
  },

  /**
   * 获取文章列表
   */
  getList(){
    let _this = this;
    app.http("GET", "/notes"+`?page_size=${ this.data.pageSize }&page_number=${ this.data.pageNumber }&note_type=2`, {}, function (res) {
      _this.setData({ showGeMoreLoadin: false })
      let resData = res.data;
      let list = _this.data.list;
      if (resData.error_code == 0) {
        if (resData.data.page_data.length > 0){
          resData.data.page_data.map(item => {
            list.push(item)
          })
          _this.setData({
            list: list,
            pageNumber: _this.data.pageNumber + 1
          })
        }else{
          _this.setData({ notDataTips:true})
        }
      }
    })
  },

  /**
   * 上拉加载更多
   */
  onReachBottom: function () {
    this.setData({ 
      showGeMoreLoadin: true,
      notDataTips:false
    })
    this.getList();
  },

  /**
   * 监听用户点击授权按钮
   */
  getAuthUserInfo:function(data){
    app.globalData.show_auth = false;
    this.setData({
      show_auth:false
    });

    let _this = this;
    app.login(null, null, null, function(){
      let sharecomeIn = _this.data.sharecomeIn;
      let detailId = _this.data.detailId;
      if(sharecomeIn == true){
        _this.setData({ sharecomeIn: false })

        if (that.data.optionType == 1) {
          wx.navigateTo({
            url: '/pages/noteBookList/noteBookList?id=' + detailId
          })
        } else if (_this.data.optionType == 2) {
          wx.navigateTo({
            url: '/pages/article/article?id=' + detailId
          })
        }
      }
      _this.getList();
    });
  },

  /**
   * 进入专辑详情页面
   */
  openDetail: function (e) {
    let id = e.currentTarget.dataset.id;

    console.log(e)

    wx.navigateTo({
      url: '/pages/article/article?id='+id
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