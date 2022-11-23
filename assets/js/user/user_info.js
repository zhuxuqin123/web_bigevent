$(function(){
    let form = layui.form
    let layer = layui.layer
    //获取用户的基本信息
    getUserinfo()
    //重置
    $('.reset').on('click',function(e){
      e.preventDefault()
      getUserinfo()
    })
    //修改用户的基本信息
    $('.layui-form').on('submit',function(e){
       e.preventDefault();
       //获取用户基本信息
       $.ajax({
           type:'post',
           url:'/my/userinfo',
           data:$(this).serialize(),
           success:function(res){
              if(res.status!==0){
                  return layer.msg(res.message)
              }
              layer.msg(res.message)
              //window代表frame窗口,window.parent代表父窗口
              window.parent.getUserInfo()
           }
       })

    })
})
let form = layui.form
//获取用户的基本信息函数封装
function getUserinfo(){
$.ajax({
    type:'get',
    url:'/my/userinfo',
    success:function(res){
        if(res.status!==0){
            return layer.msg(res.message)
        }
        
        form.val('userinfo',res.data)
        // $('input[name=username]').val(res.data.username)
        // $('input[name=nickname]').val(res.data.nickname)
        // $('input[name=email]').val(res.data.email)
    }
})
}