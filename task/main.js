/**
 * Created by xue on 2016-5-25.
 */
var read=require('./read.js');
var async=require('async')
var save=require('./save.js');
var url='http://top.baidu.com/category?c=10&fr=topindex';
var article='http://top.baidu.com/buzz?b=353&c=10&fr=topcategory_c10';
//把所有找到的文章分类列表放在数组里
var categories=[];
var articles=[];
async.series([
	//先获取所有文章列表
	function(down){
		read.category(url,function(err,result){
			categories=result;
			down(err,result)
		})

	},
	//把所有文章保存起来
	function(down){
		save.category(categories,down)
	},
	//获取某个文章分类的所有书籍
	function(down){
		//获取所有类别里所有的文章 放在articles这个数组里
		//async.forEach 第三个参数是执行完第二个参数执行的回调
		async.forEach(categories,function(category,next){
			//获取一个类别里所有的文章
			//把cid存到read.article方法里
			read.article('http://top.baidu.com/buzz?b='+category.id+'&c=10&fr=topcategory_c10',category.id,function(err,result){
				//result获取所有文章 是个数组 里面就有cid的值
				//每次都复制result里的数据
				articles=articles.concat(result);
				//next只能放在这里面
				next()
			})

		},down)
	},
	//把所有文章放进数据库中
	function(down){
		//down执行回调函数
		save.article(articles,down)
	}
],function (err,result) {
	//console.log(articles)
	console.log(result)
})
