
const app = getApp();

Page({
  data: {
    imageUrl: app.globalData.imageUrl,
    id: '',
    leftList: [],
    rightList: [],
    leftHeight: 0,
    rightHeigt: 1,
    pageSize: 20,
    pageNumber: 0,
    initPageNumber: 0,
    showGeMoreLoadin: false,
    notDataTips: false,
    objType:''
  },
  onLoad: function (option) {
    this.setData({ objType:option.type})
    let objType = option.type;
    this.getList(objType);
  },

  onReady: function () {

  },

  /**
   * 收藏图片
   */
  collectImage: function (e) {
    let id = e.currentTarget.dataset.id;
    let _this = this;
    app.http("POST", `/picture/collect/${id}`, {}, function (res) {
      let resData = res.data;
      let leftList = _this.data.leftList;
      let rightList = _this.data.rightList;
      console.log(resData)
      if (resData.code == 0) {
        leftList.map(item => {
          if (item.pictureInfo.id == id) {
            item.collect = 1;
          }
          return item;
        })
        rightList.map(item => {
          if (item.pictureInfo.id == id) {
            item.collect = 1;
          }
          return item;
        })

        _this.setData({
          leftList: leftList,
          rightList: rightList,
        })
      }
    })
  },

  /**
   * 取消收藏
   */
  cancelCollect: function (e) {
    let id = e.currentTarget.dataset.id;
    let _this = this;
    app.http("POST", `/picture/collect/${id}/cancel`, {}, function (res) {
      let resData = res.data;
      let leftList = _this.data.leftList;
      let rightList = _this.data.rightList;
      console.log(resData)
      if (resData.code == 0) {
        leftList.map(item => {
          if (item.pictureInfo.id == id) {
            item.collect = 0;
          }
          return item;
        })
        rightList.map(item => {
          if (item.pictureInfo.id == id) {
            item.collect = 0;
          }
          return item;
        })

        _this.setData({
          leftList: leftList,
          rightList: rightList,
        })
      }
    })
  },

  /**
   * 获取列表
   */
  getList: function (objType){
    switch (objType) {
      case "1":
        this.getViewList();
        wx.setNavigationBarTitle({title: '我的浏览'})
        break;
      case "2":
        this.getCollectList();
        wx.setNavigationBarTitle({ title: '我的收藏'})
        break;
      case "3":
        this.getDownloadList();
        wx.setNavigationBarTitle({ title: '我的下载' })
        break;
    }
  },

  /**
   * 上拉加载更多
   */
  onReachBottom: function () {
    console.log('到底了');
    this.setData({ showGeMoreLoadin: true, notDataTips: false })
    this.getList(this.data.objType)
  },

  /**
   * 获取下载历史列表
   */
  getDownloadList: function () {
    let _this = this;
    app.http("GET", "/picture/download/history" + `?pageSize=${this.data.pageSize}&pageNumber=${this.data.pageNumber}`, {}, function (res) {

      _this.setData({ showGeMoreLoadin: false })

      let resData = res.data;
      let leftList = _this.data.leftList;
      let rightList = _this.data.rightList;
      let leftHeight = _this.data.leftHeight;
      let rightHeigt = _this.data.rightHeigt;

      if (resData.code == 0) {
        if (resData.data.length > 0) {
          resData.data.map(item => {
            if (item.pictureInfo != null){
              if(item.pictureInfo != null){
                if (leftHeight <= rightHeigt) {
                  leftList.push(item);
                  leftHeight += item.pictureInfo.height;
                } else {
                  rightList.push(item)
                  rightHeigt += item.pictureInfo.height;
                }
              }
            }
          })
          _this.setData({
            leftList: leftList,
            rightList: rightList,
            leftHeight: leftHeight,
            rightHeigt: rightHeigt,
            pageNumber: _this.data.pageNumber + 1
          })
        } else {
          _this.setData({ notDataTips: true })
        }
      }
    })

  },

  /**
   * 获取收藏列表
   */
  getCollectList: function () {
    let _this = this;
    app.http("GET", "/picture/collect/history" + `?pageSize=${this.data.pageSize}&pageNumber=${this.data.pageNumber}`, {}, function (res) {

      _this.setData({ showGeMoreLoadin: false })

      let resData = res.data;
      let leftList = _this.data.leftList;
      let rightList = _this.data.rightList;
      let leftHeight = _this.data.leftHeight;
      let rightHeigt = _this.data.rightHeigt;

      if (resData.code == 0) {
        if (resData.data.length > 0) {
          resData.data.map(item => {
            if(item.pictureInfo != null){
              if (leftHeight <= rightHeigt) {
                leftList.push(item);
                leftHeight += item.pictureInfo.height;
              } else {
                rightList.push(item)
                rightHeigt += item.pictureInfo.height;
              }
            }
          })
          _this.setData({
            leftList: leftList,
            rightList: rightList,
            leftHeight: leftHeight,
            rightHeigt: rightHeigt,
            pageNumber: _this.data.pageNumber + 1
          })
        } else {
          _this.setData({ notDataTips: true })
        }
      }
    })

  },

  /**
   * 获取浏览记录
   */
  getViewList: function () {
    let _this = this;
    app.http("GET", "/picture/view/history" + `?pageSize=${this.data.pageSize}&pageNumber=${this.data.pageNumber}`, {}, function (res) {

      _this.setData({ showGeMoreLoadin: false })

      let resData = res.data;
      let leftList = _this.data.leftList;
      let rightList = _this.data.rightList;
      let leftHeight = _this.data.leftHeight;
      let rightHeigt = _this.data.rightHeigt;

      if (resData.code == 0) {
        if (resData.data.length > 0) {
          resData.data.map(item => {
            if(item.pictureInfo != null){
              if (leftHeight <= rightHeigt) {
                leftList.push(item);
                leftHeight += item.pictureInfo.height;
              } else {
                rightList.push(item)
                rightHeigt += item.pictureInfo.height;
              }
            }
          })
          _this.setData({
            leftList: leftList,
            rightList: rightList,
            leftHeight: leftHeight,
            rightHeigt: rightHeigt,
            pageNumber: _this.data.pageNumber + 1
          })
        } else {
          _this.setData({ notDataTips: true })
        }
      }
    })

  },

  /**
   * 下载图片
   */
  downloadImage: function (e) {
    let id = e.currentTarget.dataset.id;
    let objId = e.currentTarget.dataset.objid;
    let _this = this;
    wx.showLoading({
      title: '图片保存中...',
    });
    console.log(id)
    wx.downloadFile({
      url: id,
      success: function (res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.hideLoading();
              _this.saveDownload(objId, 2);
            },
            fail(res) {
              wx.showToast({
                title: '保存图片失败！',
              })
            }
          })
        }
      }
    })

  },

  saveDownload: function (id, type) {
    app.http("POST", `/picture/download_log/${id}`, { type: type }, function (res) {
      let resData = res.data;
      console.log(resData)
    })
  },

  /**
   * 预览图片
   */
  previewImage: function (event) {
    let url = event.target.id;
    let id = event.currentTarget.dataset.imageid;
    console.log(id);

    wx.previewImage({
      current: '',
      urls: [url]
    })
    this.viewPicture(id, 2);
  },
  /**
 * 分享
 */
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.shareWord,
      path: '/pages/index/index',
      imageUrl: app.globalData.imageUrl + app.globalData.shareImage,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})