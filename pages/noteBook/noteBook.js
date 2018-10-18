var app = getApp()

Page({

  data: {
    showNoteList:false,
    myList:[],
    notes:"",
    select:1,
    pageSize: 10,
    pageNumber: 1,
    initPageNumber: 1,
    selectId:'',
    title:'',
    showNone:false
  },

  onLoad: function (options) {
    this.myCategories();
  },

  onReady: function () {
  
  },

  /**
   * 获取我的笔记簿
   */
  myCategories:function(){
    let _this = this;
    app.http('get', `/my_categories`,{}, res => {
      let resData = res.data;
      if (resData.error_code == 0){
        _this.setData({myList:resData.data});
        if(_this.data.myList == ''){
          _this.setData({ showNone:true})
        }
      }
    })
  },

  /**
   * 获取我的笔记簿列表
   */
  categoryNotes:function(id){
    let _this = this;
    app.http('get', `/category_notes/${id}`, {}, res => {
      let resData = res.data;
      if (resData.error_code == 0) {
        _this.setData({ notes: resData.data, showNoteList: true });
      }
    })
  },

  triggerNoteList:function(e){
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    if(this.data.select != "1"){
      //去往共享和收藏的笔记簿列表
      wx.navigateTo({
        url: `/pages/noteBookList/noteBookList?id=${id}`
      })
      return false;
    }else{
      //打开我的笔记簿列表
      this.setData({ notes: "", selectId:id,title:name })
      let show = this.data.showNoteList;
      if (show) {
        this.setData({
          showNoteList: false
        })
      } else {
        this.categoryNotes(id);
      }
    }
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

  /**
   * 分享
   */
  onShareAppMessage: function (res) {
    let pathValue = '';
    let titleValue = '';
    if(this.data.select == "1"){
      titleValue = this.data.title;
      pathValue = '/pages/index/index?type=1&id=' + this.data.selectId;
    }else{
      pathValue = '/pages/index/index';
      titleValue = '好似一叶扁舟独自远航，迷茫时才发现，灯塔早已亮起';
    }

    return {
      title: titleValue,
      path: pathValue,
      imageUrl: "",
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 获取共享笔记簿列表
   */
  shareCategoryList:function(){
    app.http('get', `/category?page_size=${this.data.pageSize}&page_number=${this.data.pageNumber}`, {}, res => {
      let resData = res.data;
      if (resData.error_code == 0) {
        let tempArray = this.data.myList;
        resData.data.page_data.map(item => {
          tempArray.push(item);
        })
        this.setData({ 
          myList: tempArray,
          showNone: this.data.myList.length==0?true:false,
          pageNumber: this.data.pageNumber + 1
        });
      }
    })
  },

  /**
   * 获取我收藏的笔记簿列表
   */
  followCategoies:function(){
    app.http('get', `/follow_categories?page_size=${this.data.pageSize}&page_number=${this.data.pageNumber}`, {}, res => {
      let resData = res.data;
      if (resData.error_code == 0) {
        let tempArray = this.data.myList;
        resData.data.page_data.map(item=>{
          tempArray.push(item.categories);
        })
        this.setData({
          myList: tempArray,
          pageNumber: this.data.pageNumber + 1,
          showNone: this.data.myList.length == 0 ? true : false,
        });
      }
    })
  },

  /**
 * 获取具体类型的贴子
 */
  selected(e) {
    let objType = e.currentTarget.dataset.type;
    this.setData({
      select: objType,
      myList:[],
      pageNumber: this.data.initPageNumber,
      showNone:false
    })

    switch(objType){
      case "1":
        this.myCategories();
        break;
      case "2":
        this.shareCategoryList();
        break;
      case "3":
        this.followCategoies();
        break;
    }

  },

  /**
   * 下拉加载更多
   */
  getMoreData:function(){
    console.log("触底了");

    switch (this.data.select) {
      case "2":
        this.shareCategoryList();
        break;
      case "3":
        this.followCategoies();
        break;
    }
  },
})