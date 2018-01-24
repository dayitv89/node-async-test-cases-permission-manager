# node-async-test-cases
My first TDD with mocha and chai on node.js for async tasks

[![Build Status](https://travis-ci.org/dayitv89/node-async-test-cases.svg?branch=master)](https://travis-ci.org/dayitv89/node-async-test-cases)

1. install dependencies `$ npm i`
2. test the code `$npm test`


### Motivation:
I'm working on react-native where permission handling is a huge pain. I want such clean solution as some class name called `ManagerPermission` has some static method called `handleCamera` and this method must run fine on both Platform `iOS` and `android`.

It will return simple promise as If I have permission then I can freely access camera and If I don't have access then
- First time ManagerPermission will ask user for permission and on allow case it will return to `handleCamera.then`. Now I can freely use camera.
- Second time: User denied or restricted the permission then `handleCamera.catch` for open phone setting to allow camera permission by user.

##### Mocking
I mocked `Permission` & `Platform` class for my sample suits.

##### Sample code:
```javascript
ManagePermission.handleCamera()
	.then(() => console.log('do something'))
	.catch(() => console.log('open setting for fix the permission'))
```

##### Test Suits:
```
ManagePermission
    must exist
      ✓ class
      ✓ handleCamera
    +handleCamera()
      ios
        ✓ authorized
        ✓ restricted
        ✓ denied
        undetermined
          ✓ allow
          ✓ denied
      android
        ✓ authorized
        ✓ restricted
        denied
          ✓ allow
          ✓ denied
        undetermined
          ✓ allow
          ✓ denied
```
