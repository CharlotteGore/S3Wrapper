	var should = require('should'),
		s3 = require('../lib/s3-wrapper.js'),
		config = require('./common.js'); // remember to turn common.EDIT_ME.js into common.js to run real tests.

		describe('Using s3-wrapper', function(){

			describe('with config details', function(){


				it('initialises', function(done){

					var store = s3(config.key, config.secret, config.bucket);

					should.exist(store.s3);

					done();

				});

				it('initialises with check for valid bucket', function(done){

					s3(config.key, config.secret, config.bucket, function(err, result){

						result.should.equal('ok');

						done();

					});

				});

			});

			describe('after being initialised', function(){

				var store;

				before(function(done){

					store = s3(config.key, config.secret, config.bucket);

					done();

				});

				after(function(done){

					store.deleteFile('patch01', function(){

						done();

					});

				});

				describe('with text strings', function(done){

					it('can save as a file', function(done){

						store.saveFile('patch01', '@@ -0,0 +1,11 @@\n+Hello world\n', function(err, result){

							err.should.equal(false);
							result.should.equal('ok');

							done();

						});

					});

					it('can load the file', function(done){

						store.loadFile('patch01', function(err, result){

							err.should.equal(false);
							result.should.equal('@@ -0,0 +1,11 @@\n+Hello world\n');

							done();

						});


					});


				});


			});



		});