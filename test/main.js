it('can require a config file', () => {
	require('./subfolder/requirer');
});

it('can require a config file', () => {
	const config = require('../index')('./testconf.json', __dirname);
	console.log(config)
});


