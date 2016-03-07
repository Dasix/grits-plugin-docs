module.exports = function(value) {
	if (typeof value === 'string') {
		return value.replace('horse', 'unicorn');
	}
	return value;
};
