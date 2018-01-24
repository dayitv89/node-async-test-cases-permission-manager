const chai = require('chai');
chai.use(require('chai-as-promised'));
const ManagePermission = require('../ManagePermission');

const Permission = require('../Permission');
const Platform = require('../Platform');

const assert = chai.assert;
chai.config.includeStack = true;

describe('ManagePermission', () => {
	describe('must exist', () => {
		it('class', () => assert.typeOf(ManagePermission, 'function'));
		it('handleCamera', () => assert.typeOf(ManagePermission.handleCamera, 'function'));
	});

	describe('+handleCamera()', () => {
		describe('ios', () => {
			beforeEach(() => (Platform.OS = 'ios'));
			it('authorized', () => {
				Permission._status = 'authorized';
				return assert.isFulfilled(ManagePermission.handleCamera());
			});
			it('restricted', () => {
				Permission._status = 'restricted';
				return assert.isRejected(ManagePermission.handleCamera());
			});
			it('denied', () => {
				Permission._status = 'denied';
				return assert.isRejected(ManagePermission.handleCamera());
			});
			describe('undetermined', () => {
				it('allow', () => {
					Permission._status = 'undetermined';
					Permission._access = 'allow';
					return assert.isFulfilled(ManagePermission.handleCamera());
				});
				it('denied', done => {
					Permission._status = 'undetermined';
					Permission._access = 'denied';
					ManagePermission.handleCamera()
						.then(() => assert(false))
						.catch(() => assert(false));
					setTimeout(done, 10);
				});
			});
		});

		describe('android', () => {
			beforeEach(() => (Platform.OS = 'android'));
			it('authorized', () => {
				Permission._status = 'authorized';
				return assert.isFulfilled(ManagePermission.handleCamera());
			});
			it('restricted', () => {
				Permission._status = 'restricted';
				return assert.isRejected(ManagePermission.handleCamera());
			});
			describe('denied', () => {
				it('allow', () => {
					Permission._status = 'denied';
					Permission._access = 'allow';
					return assert.isFulfilled(ManagePermission.handleCamera());
				});
				it('denied', done => {
					Permission._status = 'denied';
					Permission._access = 'denied';
					ManagePermission.handleCamera()
						.then(() => assert(false))
						.catch(() => assert(false));
					setTimeout(done, 10);
				});
			});
			describe('undetermined', () => {
				it('allow', () => {
					Permission._status = 'undetermined';
					Permission._access = 'allow';
					return assert.isFulfilled(ManagePermission.handleCamera());
				});
				it('denied', done => {
					Permission._status = 'undetermined';
					Permission._access = 'denied';
					ManagePermission.handleCamera()
						.then(() => assert(false))
						.catch(() => assert(false));
					setTimeout(done, 10);
				});
			});
		});
	});
});
