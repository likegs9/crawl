var express = require('express');
var router = express.Router();
var async=require('async');
var db=require('../module/index.js');

/* 继续做
  * 1分页查询
  * 2可以查询
  * 3点击分类切换文章
  * 4 点击文章还可以看详情
  * */
router.get('/', function(req, res, next) {
    //用并行 同时读取两个表的内容
  async.parallel({
    categories:function(next){
      db.category(next)
    },
    articles:function(next){
      db.article(next)
    }
 },function(err,result){
    res.render('index', {
        category:result.categories[0],
        article:result.articles[0]
    });
  })
  //
});

module.exports = router;
