	var base = require('base-framework'),
		aws2js = require('aws2js'),
		_ = require('underscore')

	var s3 = base.createChild();

	s3
		.addInstanceMethods({

			init : function( key, secret, bucket, callback ){

				var self = this;

				self.s3 = aws2js.load('s3', key, secret);
				self.s3.setBucket(bucket);

				if(_.isFunction(callback)){

					self.s3.get('/', 'xml', function(err, result){
						
						if(err){

							callback(err, result);

						}else{

							callback(false, 'ok');

						}

					});

				};

				return self;

			},

			loadFile : function(path, callback){

				var self = this;

				self.s3.get(path, 'buffer', function(err, result){

					if(!err){

						callback(false, result.buffer.toString('utf8'));

					}else{

						callback(err, 'error');

					}

				});

				return self;


			},

			saveFile : function(path, string, callback){

				var self = this,
					buffer;

				if(_.isString(string)){

					buffer = new Buffer(string)

				}else if(Buffer.isBuffer(string)){

					buffer = string;

				}

				self.s3.putBuffer(path, buffer, null, {'Content-Type' : 'text/plain'}, function(err, result){

					if(!err){

						callback(false, 'ok');

					}else{

						callback(err, 'error');

					}

				})

				return self;

			},

			deleteFile : function(path, callback){

				var self = this;

				self.s3.del(path, function(err, result){

					if(!err){

						callback(false, 'ok');

					}else{

						callback(err,'error');

					}

				});

				return self;

			}

		});


	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
		  exports = module.exports = s3;
		}
	}