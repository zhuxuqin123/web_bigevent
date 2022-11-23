$(function(){
    let layer=layui.layer
    let form=layui.form
    //获取文章分类列表
    getArtcate()
    //点击添加按钮,弹出添加分类框
    let indexAdd=null
    $('.addCate').on('click',function(){
        indexAdd=layer.open({
            type: 1,
            title: '添加文章分类',
            content:$('#addCateTem').html(),
            area: ['500px', '250px'] //自定义文本域宽高
          });
    })
    //利用委托事件给动态添加的元素添加提交绑定事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layer.msg('添加文章分类失败')
                }
                getArtcate()
                layer.msg(res.message)
                layer.close(indexAdd);  
            }
        })
    })
    //点击编辑按钮
    let indexEdit = null
    $('tbody').on('click','#editArt',function(){
        indexEdit=layer.open({
            type: 1,
            title: '修改文章分类',
            content:$('#editCateTem').html(),
            area: ['500px', '250px'] //自定义文本域宽高
          });
          //一进弹出层,获取文章分类信息,并显示在输入框上面
        //获取id
        let id=$(this).attr('data-id')
        getAtr(id)
    })
    //利用委托事件给动态添加的元素添加提交绑定事件
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                console.log(res,'11111');
                if(res.status!==0){
                    return layer.msg('更新文章分类失败')
                }
                getArtcate()
                layer.msg(res.message)
                layer.close(indexEdit);  
            }
        })
    })
    //点击添加按钮
    $('tbody').on('click','#delArt',function(){
        let id=$(this).attr('data-id')
        layer.confirm('确认删除吗?',{ icon: 3, title: '提示' }, function(index){
            //do something
            $.ajax({
                type:'get',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    console.log(res);
                    if(res.status!==0){
                        return layer.msg('删除文章分类失败')
                    }
                    getArtcate()
                    layer.msg(res.message)
                    layer.close(index);
                }
            })
            
          }); 
        
       
    })
})
let form=layui.form
//获取文章分类列表
function getArtcate(){
    $.ajax({
        type:'get',
        url:'/my/article/cates',
        success:function(res){
            console.log(res.data);
            if(res.status!==0){
                return layer.msg(res.message)
            }
            $('tbody').html(template('cateList',res))
            
        }
    })
}
//获取文章分类信息
function getAtr(id){
$.ajax({
    type:'get',
    url:'/my/article/cates/'+id,
success:function(res){
    if(res.status!==0){
        return layer.msg(res.message)
    }
    form.val('form-edit', res.data)
//    $('#form-edit [name=name]').val(res.data.name)
//    $('#form-edit [name=alias]').val(res.data.alias)
}
})
}