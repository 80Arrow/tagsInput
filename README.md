tagsInput
===============
## 项目介绍

``` html
<div class="tagsDiv">
    <input type="text" id="inputTags" placeholder="回车生成标签" >
  </div>
 ```

* 在`html`文件`input`需要有`id`，父辈需要 `.tagsDiv`

 ``` js
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
  ```


  ## 常见问题
  * function(obj,value)
`obj` 为jquery object
`value` 为这次 回车/删除 的值
