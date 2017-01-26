import R from 'ramda';

import boardsFn from '../components/board.js';
import motorsFn from '../components/motors.js';
import sensorFn from '../components/sensor.js';

function ExplorationNoServo() {

  const VERY_SAFE_DISTANCE = 100;
  const SAFE_DISTANCE = 30;
  const DANGER_DISTANCE = 10;
  const LOOK_TIMEOUT = 1000;

  let exploring = false;
  let lookAroundIndicator = undefined;

  const sensorDistances = [{
    direction: 'left',
    distance: null,
    command: 'swipeLeft'
  }, {
    direction: 'right',
    distance: null,
    command: 'swipeRight'
  }];

  this.startExploring = () => {
    boardsFn.boards[0].info('Exploration', 'Going into to the great journey!');
    exploring = true;
    lookAround();
  }

  this.stopExploring = () => {
    boardsFn.boards[0].info('Exploration', '...');
    exploring = false;
    motorsFn.stop();
  }

  this.toggleExploration = () => (
    exploring 
      ? this.stopExploring() 
      : this.startExploring()
  );

  function startMoving(command) {    
    if (command && !isAllSafeDistance(VERY_SAFE_DISTANCE)) {
      boardsFn.boards[0].info('Exploration', `Start moving with command - ${command}`, { command });
      boardsFn.boards[0].wait(getAutoStopTime(), () => {
        boardsFn.boards[0].info('Exploration', command);
        motorsFn[command]();
        boardsFn.boards[0].wait(getAutoStopTime(), lookAround);
      });
    } else {
      boardsFn.boards[0].info('Exploration', 'START moving');
      motorsFn.goForward(140);
      boardsFn.boards[0].wait(getAutoStopTime(), lookAround);
    }  
  }

  function stopMoving() {
    boardsFn.boards[0].info('Exploration', 'STOP moving');
    motorsFn.stop();
  }

  function lookAround() {
    boardsFn.boards[0].wait(LOOK_TIMEOUT, () => decideMove());
  }

  function decideMove() {
    setDistances();
    startMoving(isAllDangerDistance() 
      ? 'goBack' 
      : isAllSafeDistance() 
      ? 'goForward' 
      : getTheMostDangerousDistance().command 
    );
  }

  // Helper functions
  function isSafeDistance(distance) {
    return (distance || 0) > SAFE_DISTANCE;
  }

  function isVerySafeDistance(distance) {
    return (distance || 0) > VERY_SAFE_DISTANCE;
  }

  function isAnyDangerDistance() {
    return R.find(R.propSatisfies(dist => dist < DANGER_DISTANCE, 'distance'), sensorDistances);
  }

  function isAllDangerDistance(dangerDistance) {
    return R.find(R.propSatisfies(dist => dist <= (dangerDistance || DANGER_DISTANCE), 'distance'), sensorDistances); 
  }

  function isAllSafeDistance(safeDistance) {
    return R.all(R.propSatisfies(dist => dist > (safeDistance || SAFE_DISTANCE), 'distance'), sensorDistances);
  }

  function getTheMostDangerousDistance() {
    return R.last(R.sortBy(R.prop('distance'), sensorDistances));
  }

  function getDistances() {
    return {
      left: sensorFn.leftSensor.cm,
      right: sensorFn.rightSensor.cm
    };
  }

  function getAutoStopTime() {
    return motorsFn.autoStopTime + 1000;
  }

  function setDistances() {
    const leftDist = R.find(R.whereEq({ direction: 'left' }), sensorDistances);
    const rightDist = R.find(R.whereEq({ direction: 'right' }), sensorDistances);
    leftDist.distance = getDistances().left;
    rightDist.distance = getDistances().right;

    boardsFn.boards.info('Exploration', `Distance set for left: ${leftDist.distance} and for right: ${rightDist.distance}`);
  }

}

export default ExplorationNoServo;
