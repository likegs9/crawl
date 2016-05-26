var mysql=require('mysql');
var async=require('async');
var pool=mysql.createPool({
	host:'127.0.0.1',
	database:'chengxu',
	user:'root',
	password:'123456'
})
exports.category=function(list,callback){
	async.forEach(list,function(item,next){
		//循环list数组中的每一项 分别存入数据库中
		pool.query('replace into category(id,name,url) values(?,?,?)',[item.id,item.name,item.url],function(err,result){
			//每循环一次执行next 才能再循环下一次
			next()
		})
	},callback)
}
exports.article=function(list,callback){
	async.forEach(list,function(item,next){
		//循环list数组中的每一项 分别存入数据库中
		pool.query('replace into article(name,url,cid) values(?,?,?)',[item.name,item.url,item.cid],function(err,result){
			//每循环一次执行next 才能再循环下一次
			next()
		})
		//放在最后一个参数就是要执行callback，执行这个回调函数之后执行的回调函数
	},callback)
}

