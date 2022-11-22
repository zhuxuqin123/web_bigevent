$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
// 统一为有权限的接口，设置 headers 请求头
if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
   
  }
   //无论成功还是失败都会执行的回调函数  挂载成全局的
   options.complete=function(res){
    //验证用户信息,验证失败就跳回登录页面
    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        localStorage.removeItem('token'),
        location.href='/login.html'
    }
}

})