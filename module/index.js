var mysql=require('mysql');

var pool=mysql.createPool({
	host:'127.0.0.1',
	database:'chengxu',
	user:'root',
	password:'123456'
})
exports.category=function(callback){
	//callback回调函数就有err result两个参数
	pool.query('select * from category',callback)
}

exports.article=function(callback){
	pool.query('select * from article',callback)//这个回调函数里有 err result两个形参
}
