import R from 'ramda';

import board from '../components/board.js';
import motorsFn from '../components/motors.js';
import servoFn from '../components/servo.js';
import sensorFn from '../components/sensor.js';

function Exploration() {

  const VERY_SAFE_DISTANCE = 100;
  const SAFE_DISTANCE = 30;
  const DANGER_DISTANCE = 10;
  const LOOK_TIMEOUT = 1000;

  let exploring = false;
  let lookAroundIndicator = undefined;

  const sensorDistances = [{
    direction: 'straight',
    distance: null,
    command: 'goForward'
  }, {
    direction: 'left',
    distance: null,
    command: 'swipeLeft'
  }, {
    direction: 'right',
    distance: null,
    command: 'swipeRight'
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
    if (command && !isAllVerySafeDistance()) {
      board.info('Exploration', `Start moving with command - ${command}`, { command });

      if (isAnyDangerDistance()) {
        board.info('Exploration', `Reversing`);
        motorsFn.goBack(100);  
      }
      board.wait(getAutoStopTime(), () => {
        board.info('Exploration', command);
        motorsFn[command]();
        board.wait(getAutoStopTime(), lookAround);
      });
    } else {
      board.info('Exploration', 'START moving');
      motorsFn.goForward(140);
      board.wait(getAutoStopTime(), lookAround);
    }  
  }

  function stopMoving() {
    board.info('Exploration', 'STOP moving');
    motorsFn.stop();
  }

  function lookAround() {
    lookAroundIndicator = !lookAroundIndicator;
    if (lookAroundIndicator && exploring) {
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
    } else if (!lookAroundIndicator && exploring) {
      board.wait(LOOK_TIMEOUT, () => {
        setDistance('right');
        // Look straight
        servoFn.lookStraight();
        board.wait(LOOK_TIMEOUT, () => {
          setDistance('straight');
          // Look left
          servoFn.lookLeft();
          board.wait(LOOK_TIMEOUT, () => {
            setDistance('left');
            // Decide where to go
            decideMove();
          });
        });
      });
    }
  }

  function decideMove() {
    const distance = R.last(R.sortBy(R.prop('distance'), sensorDistances));
    startMoving(isSafeDistance(distance.distance) ? distance.command : 'goBack');
  }

  // Helper functions
  function isSafeDistance(distance) {
    return (distance || getDistance()) > SAFE_DISTANCE;
  }

  function isVerySafeDistance(distance) {
    return (distance || getDistance()) > VERY_SAFE_DISTANCE;
  }

  function isAnyDangerDistance() {
    return R.find(R.propSatisfies(dist => dist < DANGER_DISTANCE, 'distance'), sensorDistances);
  }

  function isAllVerySafeDistance() {
    return R.all(R.propSatisfies(dist => dist > VERY_SAFE_DISTANCE, 'distance'), sensorDistances);
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
    board.info('Exploration', `Distance set for ${direction}: ${dist.distance}`);
  }

}

export default Exploration;
