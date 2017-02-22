/*兼容getElementsByClassName方法*/
function getElementsByClass(node,classname){

	var childNode = [];

	if(node.getELementsByClassName){

		childNode = node.getElementsByClassName(classname);
	}else{

		var elems = node.getElementsByTagName("*");

		for(var i=0; i<elems.length; i++){

			var classArr = elems[i].className.split(" ");

			for(var j=0; j<classArr.length; j++){

				if(classArr[j] === classname){

					childNode.push(elems[i]);

				}

			}

		}

		return childNode;

	}

}


/*Ajax方法*/
function Ajax(method,url,data,callback){

	var xhr = null;

	try{

		xhr = new XMLHttpRequest();

	}catch(e){

		try{

			xhr = new ActiveXObject("Msxml2.XMLHTTP");

		}catch(e){

			try{

				xhr = new ActiveXObject("Microsoft.XMLHTTP");

			}catch(e){

				alert("出错了！无法获取ActiveX对象");

				return false;

			}

		}

	}

	if(method === "get" && url.indexOf("?") === -1){

		url += "?" + data + "&" + new Date().getTime();

	}

	xhr.open(method,url,true);

	if(method === "get"){

		xhr.send();

	}else{

		xhr.setRequestHeader("COntent-Type","applicaton/x-www-form-URIencoded");

		xhr.send(data);

	}

	xhr.onreadystatechange = function(){

		if(xhr.readyState == 4){

			if(xhr.status == 200 || xhr.status == 0){

				callback && callback(xhr.responseText);

			}else{

				alert("出错了！Err:" + xhr.status + " " + xhr.statusText);

			}

		}

	}

}


/*获取元素样式getStyle方法*/
function getStyle(obj,attr){

	return obj.currentStyle? obj.currentStyle(attr) : getComputedStyle(obj,0)[attr];

}


/*EventUnit对象封装*/
var EventUnit = {
	// 添加事件处理程序
	addHandler : function(element,type,fn){

		if(element.addEventListener){

			element.addEventListener(type,fn,false);

		}else if(element.attachEvent){

			element.attachEvent("on" + type,fn);

		}else{

			element["on" + type] = fn;

		}

	},
	// 移除事件处理程序
	removeHandler : function(element,type,fn){

		if(element.removeEventListener){

			element.removeEventListener(type,fn,false);

		}else if(element.detachEvent){

			element.detachEvent("on" + type,fn);

		}else{

			element["on" + type] = null;

		}

	},
	// 获取事件对象event
	getEvent : function(event){

		return event? event : window.event;

	},
	// 获取事件目标
	getTarget : function(event){

		return event.target || event.srcElement;

	},
	// 阻止事件默认行为
	preventDefault : function(event){

		if(event.preventDefault){

			event.preventDefault();

		}else{

			event.returnValue = false;

		}

	},
	// 取消事件冒泡
	stopPropagation : function(event){

		if(event.stopPropagation){

			event.stopPropagation();

		}else{

			event.cancelBubble = true;

		}

	}

}
