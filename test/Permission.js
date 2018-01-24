const chai = require('chai');
chai.use(require('chai-as-promised'));
const Permission = require('../Permission');

const assert = chai.assert;
chai.config.includeStack = true;

describe('Permission', () => {
	beforeEach(() => (Permission._status = 'authorized'));

	describe('must exist', () => {
		it('class', () => assert.typeOf(Permission, 'function'));
		it('status', () => assert.typeOf(Permission._status, 'string'));
		it('_access', () => assert.typeOf(Permission._access, 'string'));
		it('check function', () => assert.typeOf(Permission.check, 'function'));
		it('request function', () => assert.typeOf(Permission.request, 'function'));
	});

	describe('+_status', () => {
		it('status default', () => assert.equal(Permission._status, 'authorized'));
		it('status authorized', () => {
			Permission._status = 'authorized';
			assert.equal(Permission._status, 'authorized');
		});
		it('status denied', () => {
			Permission._status = 'denied';
			assert.equal(Permission._status, 'denied');
		});
		it('status restricted', () => {
			Permission._status = 'restricted';
			assert.equal(Permission._status, 'restricted');
		});
		it('status undetermined', () => {
			Permission._status = 'undetermined';
			assert.equal(Permission._status, 'undetermined');
		});
		it('status something else', () => {
			Permission._status = 'something else';
			assert.equal(Permission._status, 'authorized');
		});
	});

	describe('+_access', () => {
		beforeEach(() => (Permission._access = 'allow'));
		it('access default', () => assert.equal(Permission._access, 'allow'));
		it('access allow', () => {
			Permission._access = 'allow';
			assert.equal(Permission._access, 'allow');
		});
		it('access denied', () => {
			Permission._access = 'denied';
			assert.equal(Permission._access, 'denied');
		});
	});

	describe('+check()', () => {
		it('check.then = authorized', () => {
			Permission._status = 'authorized';
			return assert.becomes(Permission.check(), 'authorized');
		});
		it('check.then = denied', () => {
			Permission._status = 'denied';
			return assert.becomes(Permission.check(), 'denied');
		});
		it('check.then = restricted', () => {
			Permission._status = 'restricted';
			return assert.becomes(Permission.check(), 'restricted');
		});
		it('check.then = undetermined', () => {
			Permission._status = 'undetermined';
			return assert.becomes(Permission.check(), 'undetermined');
		});
		it('check.catch =  error', () => assert.isRejected(Permission.check('for some error')));
	});

	describe('+request()', () => {
		it('request.then = authorized', () => {
			Permission._access = 'allow';
			return assert.becomes(Permission.request(), 'authorized');
		});
		it('request.then = denied', () => {
			Permission._access = 'denied';
			return assert.becomes(Permission.request(), 'denied');
		});
		it('request.catch =  error', () => assert.isRejected(Permission.request('for some error')));
	});
});
