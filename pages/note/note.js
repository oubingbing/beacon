const app = getApp()

Page({
  data: {
    leftList:[],
    rightList:[],
    leftLength:1,
    rightLength:0
  },
  onLoad: function (options) {
    let _this = this;
    app.http("GET", `/notes`, {}, function (res) {
      let resData = res.data;
      if(resData.error_code == 0){
        let list = resData.data.page_data;
        let leftArray = _this.data.leftList;
        let rightArray = _this.data.rightList;
        let leftLen = _this.data.leftLength;
        let rightLen = _this.data.rightLength;

        list.map(item=>{
          if (leftLen >= rightLen){
            rightArray.push(item);
            rightLen += item.title_length;
          }else{
            leftArray.push(item)
            leftLen += item.title_length;
          }
        })

        _this.setData({
          leftList: leftArray,
          rightList: rightArray,
          leftLength: leftLen,
          rightLength: rightLen
        })
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