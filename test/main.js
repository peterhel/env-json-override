it('can require a config file', () => {
	require('./subfolder/requirer');
});

it('can require a config file', () => {
	require('../index')('./testconf.json', __dirname);
});


