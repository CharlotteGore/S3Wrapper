#S3-Wrapper

## Intro

Save a text file and load a text file from a pre-existing Amazon S3 bucket. Uses aws2js.

This absolutely isn't worth a repo of its own but it's a module in something else I'm working on. ;)

### The Code

To install

	npm install s3-wrapper
	// then satisfy the dependencies...
	cd node_modules/s3-wrapper
	npm install

To use

	// get a simply object..
	var s3 = require('s3-wrapper')(key, secret, bucket); // bucket must already exist

	// OR if you want to check the bucket is valid, pass a callback function
	var s3wrapper = require('s3-wrapper');
	var s3 = s3wrapper(key, secret, bucket, function(err, result){

		if(!err){

			// then the bucket exists and we have successfully done a directory listing on it.

		}

	})


	// put a file
	s3.putFile(path, String || Buffer, callback ) // err === false, result === 'ok' if okay.

	// get a file
	s3.getFile(path, callback ) // err === false, result === String if okay.

	// delete a file
	s3.deleteFile(path, callback ) // err === false, result === String if okay.



### Run the tests

To run the tests you need Mocha and Should.js. You should also put your AWS key, secret and a valid bucket you control to use in common.js by editing common.EDIT_ME.js and renaming it to 'common.js'

Then: 

	make test
