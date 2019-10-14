/*
* @Author: 80arrow
* @Date:   2019-10-16 10:22:20
* @by:   layui-2.5.5
* @Last Modified time: 2019-10-16 10:22:20
*/
layui.define(['jquery','layer'],function(exports){
  "use strict";
  var $ = layui.jquery,layer = layui.layer,tagObj,paramObj
  //外部接口
  ,tagsInput = {
    render: function (param) {
      paramObj = param;
      tagsInput.init(param);
      return this;
    }
    ,init: function (param) {
      if (!param.elem) {
        layer.msg('参数 elem 不能为空', {icon: 5});
        return false;
      }
      // if($("#Arrow80tagsInput").length==0){
      //   $("body").append('<style id="Arrow80tagsInput" type="text/css">.tagsDiv em{font-style:normal}.tagsDiv{width:80%;padding:.5em;color:#777;border:1px solid #d5d5d5;background-color:#fff}.tagsDiv span{font-size:12px;font-weight:400;line-height:16px;position:relative;display:inline-block;height:16px;margin-right:3px;margin-bottom:3px;padding:4px 22px 5px 9px;cursor:pointer;transition:all .2s ease 0s;vertical-align:baseline;white-space:nowrap;color:#fff;background-color:#009688;text-shadow:1px 1px 1px rgba(0,0,0,.15)}.tagsDiv .close{font-size:12px;font-weight:700;line-height:20px;position:absolute;top:0;right:0;bottom:0;float:none;width:18px;padding:0;cursor:pointer;text-align:center;opacity:1;color:#fff;border:0 none;background:transparent none repeat scroll 0 0;text-shadow:none}.tagsDiv .close:hover{background:#ffb800}.tagsInput[type=text],.tagsInput[type=text]:focus{line-height:25px;display:inline;margin:0;padding:0 6px;border:0 none;outline:0 none;box-shadow:none}.albtn{line-height:30px;display:block;width:100px;height:30px;margin:0 auto;cursor:pointer;text-align:center;color:#fff;background:#ffb800}</style>');
      // }
      var nodeObj,ObjValArr,spans;
      tagObj = $(param.elem);
      for(var i=0;i<tagObj.length;i++){
        spans="";
        nodeObj=$(tagObj[i]);
        if(nodeObj.val()){
          //replace(", ",",").replace(" ,",",").
          ObjValArr = nodeObj.val().split(",");
          $.each(ObjValArr,function(index,item){
            spans +='<span rel="#' + tagObj[i].id + '"><em>'+item+'</em><button type="button" class="close">×</button></span>';
          });
        }
        if(spans!=""){nodeObj.before(spans);}
        nodeObj.before('<input type="text" rel="#' + tagObj[i].id + '" autocomplete="off" class="tagsInput"' + (nodeObj.attr('placeholder')?' placeholder="' + nodeObj.attr('placeholder') + '"':"") + ' />').removeClass("tagsInput").removeAttr("placeholder").hide();
      }
      tagsInput.event();
      tagsInput.enter();
  }
  ,event:function (){
    $('.tagsDiv').on('click','.close',function(){
      var Thisremov = $(this).parent('span'),AIndex,
      ThisText = $(Thisremov).find('em').text().toString(),nowObj=$($(Thisremov).attr("rel")),haveArr = new Array();
      // console.log($(Thisremov).attr("rel"));
      // console.log(ThisText);
      Thisremov.remove();
      if(nowObj.val()){
        haveArr = nowObj.val().split(",");
        AIndex = haveArr.indexOf(ThisText);
        if(AIndex>-1){
          haveArr.splice(AIndex,1);
        }
        nowObj.val(haveArr.toString());
      }else{
        nowObj.val("");
      }
      // console.log(nowObj.val());
      paramObj.remove && typeof paramObj.remove === 'function' && paramObj.remove(nowObj,ThisText);
    });
  }
  ,add:function(val,nowObj){
    var spans,haveArr=new Array();
    val = val.trim();
    if(!nowObj){nowObj=tagObj}
    //console.log($val + "|" + nowObj.val());
    if(!val) return false;
    if(nowObj.val()){
      haveArr = nowObj.val().split(",")
    }
    if(haveArr.indexOf(val) == -1){
      haveArr.push(val)
      spans ='<span rel="#' +nowObj[0].id+ '"><em>'+val+'</em><button type="button" class="close">×</button></span>';
      $(nowObj.prevAll(".tagsInput")[0]).before(spans);
      //console.log(haveArr);
      nowObj.val(haveArr.toString());
    }
    // console.log(nowObj[0].id);
    // console.log(haveArr);
    paramObj.done && typeof paramObj.done === 'function' && paramObj.done(nowObj,val);
  }
  ,enter:function(){
    tagObj.prevAll(".tagsInput").keypress(function(event){
      var keynum = (event.keyCode ? event.keyCode : event.which);  
      if(keynum == '13'){
        var $val = $(this).val(),objID=$(this).attr("rel");
        tagsInput.add($val,$(objID));
        $(this).val('');
      }
    })
  }
};
  layui.link(layui.cache.base + 'tagsInput/tagsInput.min.css');
  exports('tagsInput',tagsInput);
})
