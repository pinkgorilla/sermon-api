var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var SermonManager = require("sermon-module").managers.SermonManager;
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';

router.post('/', (request, response, next) => {
    db.get().then(db => {
            var manager = new SermonManager(db, request.user);

            var data = request.body;

            manager.reconcile()
                .then(numberOfDocs => {
                    var result = resultFormatter.ok(apiVersion, 200, numberOfDocs);
                    response.send(200, result);
                })
                .catch(e => {
                    var error = resultFormatter.fail(apiVersion, 400, e);
                    response.send(400, error);
                });
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        });
});


module.exports = router;
