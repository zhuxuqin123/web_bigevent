$(function(){
    let layer = layui.layer
    //获取用户信息
    getUserInfo()
    //点击退出按钮,弹出提示框
    $('.logout').on('click',function(){
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            //确定退出后,清空本地存储的token退回到登录页面
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
   
})
//获取用户信息函数封装
function getUserInfo(){
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        //   },
        success:function(res){
            //获取用户信息失败
            if(res.status!==0){
                return layer.msg(res.message)
            }
            // 获取用户信息成功
            // 渲染头像和用户名
            getAvatar(res.data)
        },
        //无论成功还是失败都会执行的回调函数
        // complete:function(res){
        //     //验证用户信息,验证失败就跳回登录页面
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         localStorage.removeItem('token'),
        //         location.href='/login.html'
        //     }
        // }
    })
}
//渲染头像和用户名函数封装
function getAvatar(data){
    //获取用户名称
    let name = data.nickname || data.username
    //设置用户名称
    $('.userinfo .username').text(name)
    //如果头像存在,就设置头像
    if(data.user_pic){
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src',res.data.user_pic).show()
    }else{
        //如果头像没有上传,则选择名称第一个字母大写为头像
        $('.layui-nav-img').hide()
        $('.text-avatar').show()
        $('.text-avatar').text(name[0].toUpperCase())
    }
}