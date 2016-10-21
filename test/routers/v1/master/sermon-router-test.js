require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var Sermon = require('sermon-model').master.Sermon;
    var sermon = new Sermon();

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    sermon.title = code;
    sermon.artist = `artist[${code}]`;
    sermon.duration = 0;
    sermon.year = 0;
    sermon.month = 0;
    sermon.description = `description [${code}]`;
    sermon.uri = `uri [${code}]`;
    return sermon;
}

it('#01. Should be able to get list', function(done) {
    request(uri)
        .get('/v1/sermons')
        .expect(200)
        .end(function(err, response) {
            if (err)
                done(err);
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property('data');
                result.data.should.instanceOf(Array);
                done();
            }
        });
});

it('#02. should success when create new data', function(done) {
    var data = getData();
    request(uri)
        .post('/v1/sermons')
        .send(data)
        .expect(201)
        .end(function(err, res) {
            if (err) {
                done(err);
            }
            else {
                done();

            }
        });

});

// var createdData;
// it(`#03. should success when update created data`, function (done) {
//     request(uri).put('/v1/sermons')
//         .send({ name: 'Manny', code: 'cat' })
//         .end(function (err, res) {
//             if (err) {
//                 done(err);
//             } else {
//                 done();
//             }
//         });
// });

// var createdId;
// it("#04. should success when delete data", function (done) {
//     request(uri).del('/v1/sermons/:id')
//         .query({ _id: createdId })
//         .end(function (err, res) {
//             if (err) {
//                 done(err);
//             } else {
//                 done();
//             }
//         });
// });
