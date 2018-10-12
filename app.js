const Towxml = require('/towxml/main');
App({
  onLaunch: function () {

    //设置基本接口全局变量
    this.globalData.apiUrl = 'https://www.qiuhuiyi.cn/api/wechat';
    //this.globalData.apiUrl = 'http://article.com/api/wechat';
    
    this.globalData.imageUrl = 'http://article.qiuhuiyi.cn/';

    this.newTravelPlan = false;
    let token = wx.getStorageSync('token');
    console.log('token=' + token);
    if (!token) {
      let _this = this;
      this.login();
    } else {
      console.log('token=' + token);
    }
  },

  towxml: new Towxml(),

  /**
  * 登录获取token
  */
  login: function (_method = null, _url = null, _data = null, callback = null) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.getUserInfo(res.code, _method, _url, _data, callback);
      }
    })
  },

  /**
   * 获取用户信息 
   */
  getUserInfo: function (code, _method = null, _url = null, _data = null, callback = null) {
    console.log('get user info');
    let that = this;
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.request({
                url: this.globalData.apiUrl + '/auth/login?type=bingbing',
                header: {
                  'content-type': 'application/json'
                },
                method: 'POST',
                data: {
                  encrypted_data: res.encryptedData,
                  code: code,
                  iv: res.iv
                },
                success: function (res) {
                  wx.setStorageSync('token', res.data.data);
                  if (_method) {
                    that.http(_method, _url, _data, callback);
                  }

                  if (callback) {
                    callback();
                  }
                }
              })
            }
          })
        } else {
          console.log('未授权');
        }
      }
    })
  },

  /** 
  * 封装微信http请求
  */
  http: function (_method, _url, _data, callback) {
    let token = wx.getStorageSync('token');
    let _this = this;

    wx.request({
      url: this.globalData.apiUrl + _url,
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: _method,
      data: _data,
      success: function (res) {
        if (res.data.error_code == '4001' || res.data.error_code == '4000' || res.data.error_code == '5000') {
          console.log('token过期了');
          _this.login(_method, _url, _data, callback);
        } else {
          callback(res);
        }

      },
      fail: function (res) {
        console.log(res);
        console.log('出错了');
      }
    })

  },

  /**
   * 收集form id
   */
  collectFormId: function (formId) {
    this.http('POST', `/save_form_id`, {
      form_id: formId
    }, function (res) {
      console.log(res);
    });
  },

  globalData: {
    appId: null,
    userInfo: null,
    apiUrl: null,
    color: '0aecc3',
    bgColor: '#1296DB',
    imageUrl: '',
    bgImage: '',
    newTravelPlan: false
  }
})