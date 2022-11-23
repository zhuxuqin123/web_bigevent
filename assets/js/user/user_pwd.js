$(function(){
    let form =layui.form
    let layer=layui.layer
        //表单验证规则
        form.verify({
            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            pass: [
              /^[\S]{6,12}$/
              ,'密码必须6到12位，且不能出现空格'
            ] ,
            passTwo:function(value,item){
                if(value!==$('[name=newPwd]').val()){
                return '两次输入的密码不一致'
              }
            },
            repass:function(value,item){
                   if(value===$('[name=oldPwd]').val()){
                   return '新密码不能与旧密码一致'
                 }
               }
          }); 
    $('.layui-form').on('submit',function(e){
       e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:form.val('pwd'),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //更新密码后清空表单  reset是dom元素方法,表单需要转换为dom元素
                $('.layui-form')[0].reset()
            }
        })

    })
})