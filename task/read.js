var request=require('request');//拉取网页内容
var cheerio=require('cheerio');//实现jquery功能
var iconv=require('iconv-lite');//把gbk转成utf-8
var fs=require('fs')

exports.category=function(url,callback){
	request({url:url,encoding:null},function(err,res,body){
		if(err){
			return console.log(err)
		}
		//默认把流转成utf-8编码格式
		//把GBK编码的buffer转成utf-8编码的字符串
		var body=iconv.decode(body,'gbk');
		//$代表所有元素
		var $=cheerio.load(body);
		//放所有找到的链接对象
		var items=[];
		//循环所有链接
		$('.hd .title a').each(function(){
			var item={
				name:$(this).text(),
				url:$(this).attr('href')
			}
			var result=regParam(item.url);
			item.id=result.b;
			//获取所有的文章分类
			items.push(item)
		})
       return callback(err,items)
	})
}

function regParam(url){
	var obj={};
	var reg=/([^?&=]*)=([^&?=]*)/g
	url.replace(reg,function(src,$1,$2){
		obj[$1]=$2
	})
	return obj
}
exports.article=function (url,cid,callback) {
	request({url:url,encoding:null},function(err,res,body){
		if(err){
			return console.log(err)
		}
		var body=iconv.decode(body,'gbk');
		var $=cheerio.load(body);
		var items=[];
		$('.keyword .list-title').each(function(){
			var item={
				name:$(this).text(),
				url:$(this).attr('href'),
				cid:cid
			}
			items.push(item)
		});
		return callback(err,items)
	})
}

//任何响应都可以输出到文件流。
//request('http://top.baidu.com/category?c=10&fr=topindex').pipe(fs.createWriteStream('1.txt'))
