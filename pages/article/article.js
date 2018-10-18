
var app = getApp()
Page({
  data: {
    content: {},
    id:'',
    article:'',
    showQrCode:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    let id = options.id;
    this.getNote(id);
    this.setData({id:id})
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

        let qrCode = res.data.data.poster.donation_qr_code;

        //设置数据
        that.setData({
          content: data,
          article: res.data.data,
          showQrCode: qrCode?true:false
        });
        wx.hideLoading();
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.view();
  },

  /**
   * 点赞
   */
  view: function () {
    app.http('POST', `/view_log`,
      {
        obj_id: this.data.id,
        type: 3
      }, res => {
        console.log(res);
      })
  },

  /**
   * 点赞
   */
  praise:function(){
    app.http('POST', `/praise`,
    {
      obj_id:this.data.id,
      type:3
    }, res => {
      let article = this.data.article;
      article.praise = true;
      this.setData({article:article})
    })
  },
  /**
   * 取消点赞
   */
  cancelPraise:function(){
    app.http('POST', `/cancel_praise`,
      {
        obj_id: this.data.id,
        type: 3
      }, res => {
        let article = this.data.article;
        article.praise = false;
        this.setData({ article: article })
      })
  },

  /**
   * 关注作者或者文章
   */
  follow: function (e) {
    let objType = e.currentTarget.dataset.type;
    let objId = '';

    if(objType == 1){
      objId = this.data.article.poster_id;
    }else{
      objId = this.data.article.id;
    }

    app.http('POST', `/follow`,
      {
        obj_id: objId,
        type: objType
      }, res => {
        let article = this.data.article;
        if(objType == 1){
          article.follow_author = true; 
        }else{
          article.follow_note = true;
        }
        this.setData({ article: article })
      })
  },

  /**
 * 关注作者或者文章
 */
  cancelFollow: function (e) {
    let objType = e.currentTarget.dataset.type;
    let objId = '';

    if (objType == 1) {
      objId = this.data.article.poster_id;
    } else {
      objId = this.data.article.id;
    }

    app.http('POST', `/cancel_follow`,
      {
        obj_id: objId,
        type: objType
      }, res => {
        console.log(res.data);
        let resData = res.data;
        if (resData.error_code == 0) {
          let article = this.data.article;
          if (objType == 1) {
            article.follow_author = false;
          } else {
            article.follow_note = false;
          }
          this.setData({ article: article })
        }
      })
  },

  /**
 * 分享
 */
  onShareAppMessage: function (res) {
    let id = this.data.article.id;
    let url = this.data.article.attachments[0];
    console.log("url:" + url)

    return {
      title: this.data.article.title,
      path: '/pages/index/index?type=2&id=' + id,
      imageUrl: url,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  categoryDetail:function(){
    wx.navigateTo({
      url: '/pages/noteBookList/noteBookList?id=' + this.data.article.category_id
    })
  },
  /**
* 预览图片
*/
  previewQrCode: function () {
    wx.previewImage({
      current: this.data.article.poster.donation_qr_code,
      urls: [this.data.article.poster.donation_qr_code]
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