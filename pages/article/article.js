
var app = getApp()
Page({
  data: {
    content: {},
    id:'',
    article:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

        //设置数据
        that.setData({
          content: data,
          article: res.data.data
        });
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
  }
})