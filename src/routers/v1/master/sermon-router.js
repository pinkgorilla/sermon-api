var Router = require('restify-router').Router;
var router = new Router();
var db = require("../../../db");
var SermonManager = require("sermon-module").managers.SermonManager;
var resultFormatter = require("../../../result-formatter");

const apiVersion = '1.0.0';

router.get("/", function(request, response, next) {
    db.get().then(db => {
            var manager = new SermonManager(db, request.user);

            var query = request.queryInfo;
            manager.read(query)
                .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs.data);
                    delete docs.data;
                    result.info = docs;
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "Failed to fetch data.");
                });
        })
        .catch(e => {
            var error = resultFormatter.fail(apiVersion, 400, e);
            response.send(400, error);
        });
});

router.get('/:id', (request, response, next) => {
    db.get().then(db => {
            var manager = new SermonManager(db, request.user);

            var id = request.params.id;
            manager.getSingleById(id)
                .then(doc => {
                    var result = resultFormatter.ok(apiVersion, 200, doc);
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

router.post('/', (request, response, next) => {
    db.get().then(db => {
            var manager = new SermonManager(db, request.user);

            var data = request.body;

            manager.create(data)
                .then(docId => {
                    response.header('Location', `${request.url}/${docId.toString()}`);
                    var result = resultFormatter.ok(apiVersion, 201);
                    response.send(201, result);
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

router.put('/:id', (request, response, next) => {
    db.get().then(db => {
            var manager = new SermonManager(db, request.user);

            var id = request.params.id;
            var data = request.body;

            manager.update(data)
                .then(docId => {
                    var result = resultFormatter.ok(apiVersion, 204);
                    response.send(204, result);
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

router.del('/:id', (request, response, next) => {
    db.get().then(db => {
            var manager = new SermonManager(db, request.user);

            var id = request.params.id;
            var data = request.body;

            manager.delete(data)
                .then(docId => {
                    var result = resultFormatter.ok(apiVersion, 204);
                    response.send(204, result);
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
