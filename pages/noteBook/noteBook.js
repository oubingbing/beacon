// pages/noteBook/noteBook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNoteList:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  triggerNoteList:function(){
    console.log("tap");
    let show = this.data.showNoteList;
    if(show){
      this.setData({
        showNoteList: false
      })
    }else{
      this.setData({
        showNoteList: true
      })
    }
  }
})