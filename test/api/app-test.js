require('../spec_helper');

describe('Allotments Controller Test', () => {
  const User = require('../../models/user');
  const Allotment = require('../../models/allotment');
  const Crop = require('../../models/crop');


  User.collection.drop();

  describe('GET /api/allotments', () => {

    beforeEach(done => {
      User.collection.drop();
      Allotment.collection.drop();
      done();
    });

    beforeEach(done => {
      User.create({
        username: 'amelbardis',
        firstName: 'Anton',
        lastName: 'Melbardis',
        email: 'melbardis@gmail.com',
        password: 'password',
        passwordConfirmation: 'password',
        postcode: 'ox164rq',
        allotments: ['5994269bb0c05d64ff88cc26'],
        forSale: ['599303f4ad6b6b3b50a3c645']
      })
      .then(() => {
        return Allotment.create({
          name: 'Adams Road',
          borough: 'Bromley',
          nearestPostcode: 'BR3 4AX',
          location: 'Alongside railway line at junction with Upper Elmers End Road',
          latitude: '51.393712',
          longitude: '-0.042996',
          allotmentFarmers: '59944291b9dbbf6ad789ccd9'
        });
      })

      .then(() => {
        return Crop.create({
          name: 'Buck Wheat',
          description: 'Yammi easter european desert',
          thumbnail: 'test_thumbnail.img',
          image: 'test.img'
        });
      })

      .then(() => done())
      .catch(done);
    });

    it('should return a 200 response', done => {
      api
        .get('/api/users')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should return a 200 response', done => {
      api
        .get('/api/allotments')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should return a 200 response', done => {
      api
        .get('/api/crops')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should return an array of allotments', function(done) {
      api
        .get('/api/allotments')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of crops', function(done) {
      api
        .get('/api/crops')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('should return an array of allotment objects', function(done) {
      api
        .get('/api/allotments')
        .set('Accept', 'application/json')
        .end((err, res) => {
          console.log(res.body);
          expect(res.body)
            .to.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              '_id',
              '__v',
              'name',
              'borough',
              'nearestPostcode',
              'location',
              'latitude',
              'longitude',
              'allotmentFarmers'
            ]);
          done();
        });
    });

    it('should return an array of crop objects', function(done) {
      api
        .get('/api/crops')
        .set('Accept', 'application/json')
        .end((err, res) => {
          console.log(res.body);
          expect(res.body)
            .to.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              '_id',
              '__v',
              'name',
              'description',
              'thumbnail',
              'image'
            ]);
          done();
        });
    });

  });
});
