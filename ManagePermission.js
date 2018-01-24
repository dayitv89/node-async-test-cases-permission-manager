const Permission = require('./Permission');
const Platform = require('./Platform');

// ManagePermission.handleCamera()
// 	.then(() => console.log('do something'))
// 	.catch(() => console.log('open setting for fix the permission'));
class ManagePermission {
	static handleCamera() {
		const _askPermission = res => {
			Permission.request('camera')
				.then(status => status === 'authorized' && res())
				.catch(console.log);
		};
		return new Promise((res, rej) => {
			Permission.check('camera')
				.then(status => {
					switch (status) {
						case 'authorized':
							res();
							break;
						case 'denied':
							Platform.OS === 'ios' ? rej() : _askPermission(res);
							break;
						case 'restricted':
							rej();
							break;
						case 'undetermined':
							_askPermission(res);
							break;
					}
				})
				.catch(console.log);
		});
	}
}

module.exports = ManagePermission;
