import chai from 'chai';
import sinon from 'sinon';
const expect = chai.expect;
const assert = chai.assert;

import five from 'johnny-five';

import board from '../../johny/components/board.js';
import motorsFn from '../../johny/components/motors.js';
import servoFn from '../../johny/components/servo.js';
import sensorFn from '../../johny/components/sensor.js';
import Exploration from '../../johny/functions/exploration.js';

let exploration;

describe('Exploration', () => {

  beforeEach(() => {
    sinon.stub(board, 'wait', (timeout, callback) => {
      board.once('callItBack', () => callback());
    });
    sensorFn.sensor = {
      cm: 10
    };

    sinon.stub(servoFn, 'lookStraight', () => {});
    sinon.stub(servoFn, 'lookLeft', () => {});
    sinon.stub(servoFn, 'lookRight', () => {});

    sinon.stub(motorsFn, 'goForward', () => {});
    sinon.stub(motorsFn, 'goBack', () => {});
    sinon.stub(motorsFn, 'turnRight', () => {});
    sinon.stub(motorsFn, 'turnLeft', () => {});
    sinon.stub(motorsFn, 'swipeLeft', () => {});
    sinon.stub(motorsFn, 'swipeRight', () => {});
    sinon.stub(motorsFn, 'stop', () => {});
    motorsFn.autoStopTime = 2000;

    exploration = new Exploration();
  });

  afterEach(() => {
    exploration.stopExploring();

    board.wait.restore();
    servoFn.lookStraight.restore();
    servoFn.lookLeft.restore();
    servoFn.lookRight.restore();

    motorsFn.goForward.restore();
    motorsFn.goBack.restore();
    motorsFn.turnRight.restore();
    motorsFn.turnLeft.restore();
    motorsFn.swipeLeft.restore();
    motorsFn.swipeRight.restore();
    motorsFn.stop.restore();
  });

  it('should not fail', () => {
    expect(exploration).not.to.be.undefined;
  });

  it('should start to lookAround after fresh start', () => {
    exploration.startExploring();

    // Look straight
    sinon.assert.calledOnce(servoFn.lookStraight);
    sinon.assert.notCalled(servoFn.lookLeft);

    // Look left
    board.emit('callItBack');
    sinon.assert.calledOnce(servoFn.lookStraight);
    sinon.assert.calledOnce(servoFn.lookLeft);

    // Look right
    board.emit('callItBack');
    sinon.assert.calledOnce(servoFn.lookStraight);
    sinon.assert.calledOnce(servoFn.lookLeft);
    sinon.assert.calledOnce(servoFn.lookRight);

    // Go back twice - no way to go
    board.emit('callItBack');
    sinon.assert.calledOnce(motorsFn.goBack);
    board.emit('callItBack');
    sinon.assert.calledTwice(motorsFn.goBack);

    // Look straight again
    board.emit('callItBack');
    sinon.assert.calledTwice(servoFn.lookStraight);

    // Look left again - closed loop
    board.emit('callItBack');
    sinon.assert.calledTwice(servoFn.lookStraight);
    sinon.assert.calledTwice(servoFn.lookLeft);
  });

  it('should go right', () => {
    board.emit('callItBack');

    sensorFn.sensor.cm = 50;
    board.emit('callItBack');
    sinon.assert.calledOnce(motorsFn.goBack);

    board.emit('callItBack');
    sinon.assert.calledOnce(motorsFn.goBack);
    sinon.assert.calledOnce(motorsFn.swipeRight);
  });

  it('should go straight forward', () => {
    board.emit('callItBack');

    sensorFn.sensor.cm = 50;
    board.emit('callItBack');

    sensorFn.sensor.cm = 10;
    board.emit('callItBack');
    sinon.assert.notCalled(motorsFn.goBack);
    board.emit('callItBack');
    sinon.assert.calledOnce(motorsFn.goBack);

    board.emit('callItBack');
    sinon.assert.calledOnce(motorsFn.goForward);
  });

  it('should go left', () => {
    board.emit('callItBack');

    sensorFn.sensor.cm = 10;
    board.emit('callItBack');

    sensorFn.sensor.cm = 50;
    board.emit('callItBack');

    sensorFn.sensor.cm = 10;
    sinon.assert.notCalled(motorsFn.goBack);
    board.emit('callItBack');
    sinon.assert.calledOnce(motorsFn.goBack);

    board.emit('callItBack');
    sinon.assert.calledOnce(motorsFn.swipeLeft);
  });

});
