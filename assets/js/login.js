$(function(){
    //接口基本地址
    // let baseURL='http://www.liulongbin.top:3007'
        //点击去注册按钮
        $('.go-register').on('click',function(){
            $('.login').toggle()
            $('.register').toggle()
            if($('.go-register').text()==='去注册账号'){
                $('.go-register').text('去登录')
            }else{
                $('.go-register').text('去注册账号')
            }
            
        })

    //获取表单
    let form=layui.form
    let layer = layui.layer
    //表单验证规则
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
          
          //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
          if(value === 'xxx'){
            alert('用户名不能为敏感词');
            return true;
          }
        },
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        passTwo:function(value,item){
         console.log(value,$('.passOne[name=password]').val());
            if(value!==$('.passOne[name=password]').val()){
            return '两次输入的密码不一致'
          }
        }
      });  
    //表单提交注册事件
    $('#form_register').on('submit', function(e){
          //阻止表单默认跳转
        e.preventDefault();
        //获取表单数据
        let username=$('#form_register [name=username]').val()
        let password=$('#form_register [name=password]').val()
        let data={
           username,
           password,
        }
     //发送注册请求
     $.ajax({
         type:'post',
         url:'/api/reguser',
         data,
         success:function(res) {
            console.log(res);
            if(res.status===1){
                layer.msg(res.message);
            }
            layer.msg(res.message);
            $('.go-register').click()
        }
     })
    });
    //表单提交登录事件
    $('#form_login').on('submit',function(e) {
        //阻止默认提交事件
        e.preventDefault()
        //获取表单数据
    //     let username=$('#form_login [name=username]').val()
    //     let password=$('#form_login [name=password]').val()
    // let data={
    //     username,
    //     password
    // }
        $.ajax({
        type:'post',
        url:`/api/login`,
        // data,
        data:$(this).serialize(),
        success:function(res){
            if(res.status===0){
              layer.msg(res.message)
              //登录成功把token保存到本地,并且跳转到首页
              localStorage.setItem('token',res.token)
              location.href='/index.html'
            }
            layer.msg(res.message)
           
        }
    })
    })
    })