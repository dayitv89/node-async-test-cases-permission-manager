let os = 'ios';

class Platform {
	static get OS() {
		return os;
	}
	static set OS(val) {
		os = val === 'android' ? val : 'ios';
	}
}

module.exports = Platform;
