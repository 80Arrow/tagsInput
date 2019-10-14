HTML

<div class="tagsDiv">
    <input type="text" id="inputTags" placeholder="回车生成标签" >
  </div>

input 需要有id，父辈需要 .tagsDiv  


JS

layui.use(['tagsInput'],function(){
    var tagsInput= layui.tagsInput;
    tagsInput.render({
      elem:'#inputTags',
      done: function(obj,value){ //回车后的回调
        console.log(obj)
        console.log(value)
      },
      remove: function(obj,value){ //删除后的回调
        console.log(obj)
        console.log(value)
      }
    })
  })

function(obj,value)

obj 为jquery object
value 为这次 回车/删除 的值
