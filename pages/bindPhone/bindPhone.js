const app = getApp()

Page({

  data: {
    phone:"",
    code:"",
    tip:"",
    showTime:false,
    time:90
  },

  onLoad: function (options) {
  
  },

  /**
   * 发送验证码
   */
  getMessageCode:function(){
    let phone = this.data.phone;
    if(phone == ''){
      wx:wx.showToast({
        title: '手机号不能为空',
        icon: "none",
      })
      return false;
    }

    let _this = this;

    app.http("POST", `/send_message`, {phone:phone}, function (res) {
      let resData = res.data;
      if (resData.error_code == 0) {
        _this.showTimeInfo();
        wx: wx.showToast({
          title: '验证码已发送',
          icon: "none",
        })
      }else{
        wx: wx.showToast({
          title: resData.error_message,
          icon: "none",
        })
      }
    })
  },

  postBind:function(){

    console.log("post")

    let phone = this.data.phone;
    let code = this.data.code;

    if (phone == '') {
      wx: wx.showToast({
        title: '手机号不能为空',
        icon: "none",
      })
      return false;
    }

    if (code == '') {
      wx: wx.showToast({
        title: '验证码不能为空',
        icon: "none",
      })
      return false;
    }

    app.http("POST", `/bind_user`, { phone: phone,code:code }, function (res) {
      let resData = res.data;
      if (resData.error_code == 0) {
        wx: wx.showToast({
          title: "绑定成功",
          icon: "none",
        })

      } else {
        wx: wx.showToast({
          title: resData.error_message,
          icon: "none",
        })
      }
    })
  },

  /**
   * 显示倒计时
   */
  showTimeInfo:function(){
    let limitTime = 90;
    this.setData({ showTime: true });
    let int = setInterval(function () {
      this.setData({ time: (limitTime--) });
      if (limitTime < 0) {
        clearInterval(int);
        this.setData({ showTime: false });
      }
    }.bind(this), 1000)
  },

  /**
   * 绑定手机号码输入框的值
   */
  bindPhoneInput:function(e){
    this.setData({ phone: e.detail.value})
  },

  /**
   * 绑定验证码输入框的值
   */
  bindCodeInput: function (e) {
    this.setData({ code: e.detail.value })
  }

})