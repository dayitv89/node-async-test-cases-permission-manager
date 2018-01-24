// type Status = 'authorized' | 'denied' | 'restricted' | 'undetermined'

let status = 'authorized';
let access = 'allow';

class Permission {
	static get _status() {
		return status;
	}

	static set _status(s) {
		switch (s) {
			case 'denied':
			case 'restricted':
			case 'undetermined':
				status = s;
				break;
			default:
				status = 'authorized';
		}
	}

	static get _access() {
		return access;
	}

	static set _access(s) {
		access = s === 'denied' ? 'denied' : 'allow';
	}

	static check(val = 'camera') {
		return val === 'camera' ? Promise.resolve(status) : Promise.reject('some permission error');
	}

	static request(val = 'camera') {
		return val === 'camera'
			? access === 'allow' ? Promise.resolve('authorized') : Promise.resolve('denied')
			: Promise.reject('some permission error');
	}
}

module.exports = Permission;
