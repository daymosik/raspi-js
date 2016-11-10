import R from 'ramda';

import board from '../components/board.js';
import motorsFn from '../components/motors.js';
import servoFn from '../components/servo.js';
import sensorFn from '../components/sensor.js';

function Exploration() {

  const SAFE_DISTANCE = 40;
  const LOOK_TIMEOUT = 2000;

  let exploring = false;
  let isLooking = false;
  let isReversing = false;

  const sensorDistances = [{
    direction: 'straight',
    distance: null,
    command: 'goForward'
  }, {
    direction: 'left',
    distance: null,
    command: 'turnLeft'
  }, {
    direction: 'right',
    distance: null,
    command: 'turnRight'
  }];

  this.startExploring = () => {
    board.info('Exploration', 'Going into to the great journey!');
    exploring = true;
    lookAround();
  }

  this.stopExploring = () => {
    board.info('Exploration', '...');
    exploring = false;
    motorsFn.stop();
  }

  this.toggleExploration = () => (
    exploring 
      ? this.stopExploring() 
      : this.startExploring()
  );

  function startMoving(command) {
    isLooking = false;
    
    if (command) {
      board.info('Exploration', `Start moving with command - ${command}`, { command });

      board.info('Exploration', `Reversing`);
      isReversing = true;
      motorsFn.goBack(100);
      board.wait(getAutoStopTime(), () => {
        board.info('Exploration', command);
        isReversing = false;
        motorsFn[command]();
        board.wait(getAutoStopTime(), lookAround);
      });
    } else {
      board.info('Exploration', 'START moving');
      motorsFn.goForward(140);
    }  
  }

  function stopMoving() {
    board.info('Exploration', 'STOP moving');
    motorsFn.stop();
  }

  function lookAround() {
    isLooking = true;
    // Look straight
    servoFn.lookStraight();
    board.wait(LOOK_TIMEOUT, () => {
      setDistance('straight');
      // Look left
      servoFn.lookLeft();
      board.wait(LOOK_TIMEOUT, () => {
        setDistance('left');
        // Look right
        servoFn.lookRight();
        board.wait(LOOK_TIMEOUT, () => {
          setDistance('right');
          // Decide where to go
          decideMove();
        });
      });
    });
  }

  function decideMove() {
    const distance = R.last(R.sortBy(R.prop('distance'), sensorDistances));
    startMoving(isSafeDistance(distance.distance) ? distance.command : 'goBack');
  }

  // Helper functions
  function isSafeDistance(distance) {
    return (distance || getDistance()) > SAFE_DISTANCE;
  }

  function getDistance() {
    return sensorFn.sensor.cm;
  }

  function getAutoStopTime() {
    return motorsFn.autoStopTime + 1000;
  }

  function setDistance(direction, distance) {
    const dist = R.find(R.whereEq({ direction }), sensorDistances);
    dist.distance = distance || getDistance();
  }

}

export default Exploration;
