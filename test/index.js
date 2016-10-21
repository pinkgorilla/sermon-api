function test(name, path) {
    describe(name, function () {
        require(path);
    })
}

var server = require('./test-server');

before('initialize server', function (done) {
    server
        .then(uri => {
            console.log(uri);
            done();
        })
        .catch(e => done(e));
})



describe('@sermon-api', function () {
    this.timeout(2 * 60000);
    //Master
    test("/v1/sermons", "./routers/v1/master/sermon-router-test"); 
});
