import chai from 'chai';
import sinon from 'sinon';
const expect = chai.expect;
const assert = chai.assert;

import five from 'johnny-five';

import boardsFn from '../../johnny/src/components/board.ts';
import motorsFn from '../../johnny/src/components/motors.ts';
import sensorFn from '../../johnny/src/components/sensor.ts';
import ExplorationNoServo from '../../johnny/src/services/exploration-no-servo.ts';

const DANGER_DISTANCE = 10;
const SAFE_DISTANCE = 30;
const VERY_SAFE_DISTANCE = 100;

const exploration = new ExplorationNoServo();;

describe('ExplorationNoServo', () => {

  beforeEach(() => {
    sinon.stub(boardsFn.boards[0], 'wait', (timeout, callback) => {
      boardsFn.boards[0].once('callItBack', () => callback());
    });
    sensorFn.leftSensor = {
      cm: VERY_SAFE_DISTANCE
    };
    sensorFn.rightSensor = {
      cm: VERY_SAFE_DISTANCE
    };

    sinon.stub(motorsFn, 'goForward', () => {});
    sinon.stub(motorsFn, 'goBack', () => {});
    sinon.stub(motorsFn, 'turnRight', () => {});
    sinon.stub(motorsFn, 'turnLeft', () => {});
    sinon.stub(motorsFn, 'swipeLeft', () => {});
    sinon.stub(motorsFn, 'swipeRight', () => {});
    sinon.stub(motorsFn, 'stop', () => {});
    motorsFn.autoStopTime = 2000;
  });

  afterEach(() => {
    boardsFn.boards[0].wait.restore();

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

  // Order of the tests matters!!!
  it('should go straight forward', () => {
    exploration.startExploring();

    boardsFn.boards[0].emit('callItBack');
    sinon.assert.calledOnce(motorsFn.goForward);
  });

  it('should swipe right', () => {
    sensorFn.leftSensor.cm = SAFE_DISTANCE;

    boardsFn.boards[0].emit('callItBack');
    boardsFn.boards[0].emit('callItBack');
    sinon.assert.calledOnce(motorsFn.swipeRight);
  });

  it('should go forward', () => {
    sensorFn.leftSensor.cm = VERY_SAFE_DISTANCE;

    boardsFn.boards[0].emit('callItBack');
    boardsFn.boards[0].emit('callItBack');
    sinon.assert.calledOnce(motorsFn.goForward);
  });

  it('should swipe left', () => {
    sensorFn.rightSensor.cm = SAFE_DISTANCE;

    boardsFn.boards[0].emit('callItBack');
    boardsFn.boards[0].emit('callItBack');
    sinon.assert.calledOnce(motorsFn.swipeLeft);
  });

  it('should turn left', () => {
    sensorFn.rightSensor.cm = DANGER_DISTANCE;

    boardsFn.boards[0].emit('callItBack');
    boardsFn.boards[0].emit('callItBack');
    sinon.assert.calledOnce(motorsFn.turnLeft);
  });

  it('should turn right', () => {
    sensorFn.leftSensor.cm = DANGER_DISTANCE;
    sensorFn.rightSensor.cm = VERY_SAFE_DISTANCE;

    boardsFn.boards[0].emit('callItBack');
    boardsFn.boards[0].emit('callItBack');
    sinon.assert.calledOnce(motorsFn.turnRight);
  });

  it('should go back', () => {
    sensorFn.leftSensor.cm = DANGER_DISTANCE;
    sensorFn.rightSensor.cm = DANGER_DISTANCE;

    boardsFn.boards[0].emit('callItBack');
    boardsFn.boards[0].emit('callItBack');
    sinon.assert.calledOnce(motorsFn.goBack);
  });

  it('should not goForward if last move was goBack', () => {
    sensorFn.leftSensor.cm = VERY_SAFE_DISTANCE;
    sensorFn.rightSensor.cm = VERY_SAFE_DISTANCE-10;

    boardsFn.boards[0].emit('callItBack');
    boardsFn.boards[0].emit('callItBack');
    sinon.assert.notCalled(motorsFn.goForward);
    sinon.assert.calledOnce(motorsFn.swipeLeft);
  });


});
