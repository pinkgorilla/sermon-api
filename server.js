'use strict'

var restify = require('restify');
var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS({
    headers: ['Content-Disposition']
}));

server.use(function(request, response, next) {
    var query = request.query;
    query.order = !query.order ? {} : JSON.parse(query.order);
    query.filter = !query.filter ? {} : JSON.parse(query.filter);
    request.queryInfo = query;
    request.user = {
        username: 'api'
    }
    next();
});


var v1SermonReconcileRouter = require('./src/routers/v1/master/sermon-reconcile-router');
v1SermonReconcileRouter.applyRoutes(server, "/v1/sermons/reconcile");

var v1SermonRouter = require('./src/routers/v1/master/sermon-router');
v1SermonRouter.applyRoutes(server, "/v1/sermons");


server.listen(process.env.PORT, process.env.IP);
console.log(`server created at ${process.env.IP}:${process.env.PORT}`);
