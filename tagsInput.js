/*
* @Author: 80arrow
* @Date:   2019-10-16 10:22:20
* @by:   layui-2.5.5
* @Last Modified time: 2019-10-16 10:22:20
*/
layui.define(['jquery','layer'],function(exports){
  "use strict";
  var $ = layui.jquery,layer = layui.layer
  //外部接口
  ,tagsInput = {
    config: {}
    //设置全局项
    ,set: function(options){
      var that = this;
      that.config = $.extend({}, that.config, options);
      return that;
    }
    // 事件监听
    ,on: function(events, callback){
      return layui.onevent.call(this, MOD_NAME, events, callback)
    }
  }
   //操作当前实例
  ,thistagsInput = function(){
    var that = this,options = that.config;
    return {
      config: options
    }
  }
  //字符常量
  ,MOD_NAME = 'tagsInput'
  // 构造器
  ,Class = function(options){
    var that = this;
    that.config = $.extend({}, that.config, tagsInput.config, options);
    that.render();
  };

   //默认配置
  Class.prototype.config = {
    close: false  //默认:不开启关闭按钮
  };

  // 初始化
  Class.prototype.init = function(){
    var that = this
    ,spans
    ,options = that.config
    ,showInput = document.createElement("input"),tagObj = options.elem,nodeObj,ObjValArr;
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
    that.events();
    that.enter();
  }

  Class.prototype.render = function(){
    var that = this
    ,options = that.config
    options.elem = $(options.elem);
  };

  // 回车生成标签
  Class.prototype.enter = function(){
    var that = this
    ,spans = ''
    ,options = that.config;
    options.elem.prevAll(".tagsInput").keypress(function(event){
      var keynum = (event.keyCode ? event.keyCode : event.which);  
      if(keynum == '13'){
        var $val = $(this).val().trim(),objID=$(this).attr("rel"),nowObj = $(objID),haveArr=new Array();
        //console.log($val + "|" + nowObj.val());
        if(!$val) return false;
        if(nowObj.val()){
          haveArr = nowObj.val().split(",")
        }

        if(haveArr.indexOf($val) == -1){
          haveArr.push($val)
          that.render();
          spans ='<span rel="' +objID+ '"><em>'+$val+'</em><button type="button" class="close">×</button></span>';
          $(this).before(spans);
          //console.log(haveArr);
          nowObj.val(haveArr.toString());
        }
        options.done && typeof options.done === 'function' && options.done(nowObj,$val);
        $(this).val('');
      }
    })
  };
  
  //事件处理
  Class.prototype.events = function(){
     var that = this
    ,options = that.config;
    $('.tagsDiv').on('click','.close',function(){
      var Thisremov = $(this).parent('span'),
      ThisText = $(Thisremov).find('em').text().toString(),nowObj=$($(Thisremov).attr("rel")),haveArr = new Array();
      Thisremov.remove();
      if(nowObj.val()){
        haveArr = nowObj.val().split(",");
        haveArr.splice($.inArray(ThisText,haveArr),1);
        nowObj.val(haveArr.toString());
      }else{
        nowObj.val("");
      }
      options.remove && typeof options.remove === 'function' && options.remove(nowObj,ThisText);
    });
  };

  //核心入口
  tagsInput.render = function(options){
    var inst = new Class(options);
    inst.init();
    return thistagsInput.call(inst);
  };
  exports('tagsInput',tagsInput);
}).link('/layuimini/tagsInput/tagsInput.min.css')
