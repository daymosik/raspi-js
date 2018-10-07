// import chai from 'chai';
// import sinon from 'sinon';
// const expect = chai.expect;
// const assert = chai.assert;

// import five from 'johnny-five';

// import boardsFn from '../../johny/components/board.ts';
// import motorsFn from '../../johny/components/motors.ts';
// import servoFn from '../../johny/components/servo.ts';
// import sensorFn from '../../johny/components/sensor.ts';
// import Exploration from '../../johny/functions/exploration.ts';

// let exploration;

// describe('Exploration', () => {

//   beforeEach(() => {
//     sinon.stub(boardsFn.boards[0], 'wait', (timeout, callback) => {
//       boardsFn.boards[0].once('callItBack', () => callback());
//     });
//     sensorFn.sensor = {
//       cm: 10
//     };

//     sinon.stub(servoFn, 'lookStraight', () => {});
//     sinon.stub(servoFn, 'lookLeft', () => {});
//     sinon.stub(servoFn, 'lookRight', () => {});

//     sinon.stub(motorsFn, 'goForward', () => {});
//     sinon.stub(motorsFn, 'goBack', () => {});
//     sinon.stub(motorsFn, 'turnRight', () => {});
//     sinon.stub(motorsFn, 'turnLeft', () => {});
//     sinon.stub(motorsFn, 'swipeLeft', () => {});
//     sinon.stub(motorsFn, 'swipeRight', () => {});
//     sinon.stub(motorsFn, 'stop', () => {});
//     motorsFn.autoStopTime = 2000;

//     exploration = new Exploration();
//   });

//   afterEach(() => {
//     exploration.stopExploring();

//     boardsFn.boards[0].wait.restore();
//     servoFn.lookStraight.restore();
//     servoFn.lookLeft.restore();
//     servoFn.lookRight.restore();

//     motorsFn.goForward.restore();
//     motorsFn.goBack.restore();
//     motorsFn.turnRight.restore();
//     motorsFn.turnLeft.restore();
//     motorsFn.swipeLeft.restore();
//     motorsFn.swipeRight.restore();
//     motorsFn.stop.restore();
//   });

//   it('should not fail', () => {
//     expect(exploration).not.to.be.undefined;
//   });

//   it('should start to lookAround after fresh start', () => {
//     exploration.startExploring();

//     // Look straight
//     sinon.assert.calledOnce(servoFn.lookStraight);
//     sinon.assert.notCalled(servoFn.lookLeft);

//     // Look left
//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledOnce(servoFn.lookStraight);
//     sinon.assert.calledOnce(servoFn.lookLeft);

//     // Look right
//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledOnce(servoFn.lookStraight);
//     sinon.assert.calledOnce(servoFn.lookLeft);
//     sinon.assert.calledOnce(servoFn.lookRight);

//     // Go back twice - no way to go
//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledOnce(motorsFn.goBack);
//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledTwice(motorsFn.goBack);

//     // Look straight again
//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledTwice(servoFn.lookStraight);

//     // Look left again - closed loop
//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledTwice(servoFn.lookStraight);
//     sinon.assert.calledTwice(servoFn.lookLeft);
//   });

//   it('should go right', () => {
//     boardsFn.boards[0].emit('callItBack');

//     sensorFn.sensor.cm = 50;
//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledOnce(motorsFn.goBack);

//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledOnce(motorsFn.goBack);
//     sinon.assert.calledOnce(motorsFn.swipeRight);
//   });

//   it('should go straight forward', () => {
//     boardsFn.boards[0].emit('callItBack');

//     sensorFn.sensor.cm = 50;
//     boardsFn.boards[0].emit('callItBack');

//     sensorFn.sensor.cm = 10;
//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.notCalled(motorsFn.goBack);
//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledOnce(motorsFn.goBack);

//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledOnce(motorsFn.goForward);
//   });

//   it('should go left', () => {
//     boardsFn.boards[0].emit('callItBack');

//     sensorFn.sensor.cm = 10;
//     boardsFn.boards[0].emit('callItBack');

//     sensorFn.sensor.cm = 50;
//     boardsFn.boards[0].emit('callItBack');

//     sensorFn.sensor.cm = 10;
//     sinon.assert.notCalled(motorsFn.goBack);
//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledOnce(motorsFn.goBack);

//     boardsFn.boards[0].emit('callItBack');
//     sinon.assert.calledOnce(motorsFn.swipeLeft);
//   });

// });
