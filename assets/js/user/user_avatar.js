$(function(){
    let layer=layui.layer
      // 1.1 获取裁剪区域的 DOM 元素
  let $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)
  //点击上传按钮
  $('.upload').on('click',function(){
    $('#file').click()
  })
  //上传文件值发生变化时
  $('#file').on('change',function(e){
      //选择用户上传的文件
      let file=e.target.files[0]
      if(file.length===0){
          return layer.msg('请选择一张图片')
      }
      //根据选择的文件创建一个对应的url地址
      let newImgurl=URL.createObjectURL(file)
      //先销毁旧的裁剪区域,在重新设置图片路径,在创建新的裁剪区域
      $image.cropper('destroy').attr('src',newImgurl).cropper(options)
 
    })
    //点击确定按钮确定上传的裁剪图片
    $('.sureBtn').on('click',function(){
    // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 将裁剪后的图片，输出为 base64 格式的字符串
    let dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png') 
    //发送请求确认上传的图片
    $.ajax({
            type:'post',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
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