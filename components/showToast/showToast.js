// components/showToast/showToast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propTip: { 
      type: String, 
      value: '', 
      observer: function (newVal, oldVal, changedPath) {
        this.setData({tip:newVal})
        console.log(changedPath)
        console.log(newVal)
        console.log(oldVal)
        if (this.data.tip != undefined){
          this.showToast();
        }
      }
    },
    propDuration: {
      type: Number,
      value: '2000',
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal);
        this.setData({ duration: newVal })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tip:"",
    display:"none",
    duration:2000
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showToast:function(){
      this.setData({ display: '' })
      setTimeout(function () {
        this.setData({ display: 'none' })
      }.bind(this), this.data.duration)
    }
  }
})
