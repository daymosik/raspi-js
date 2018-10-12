// import * as R from 'ramda'
//
// import boardsFn from '../components/board'
// import motorsFn from '../components/motors'
// import sensorFn from '../components/sensor'
// import servoFn from '../components/servo'
//
// function Exploration() {
//
//   const VERY_SAFE_DISTANCE = 100
//   const SAFE_DISTANCE = 30
//   const DANGER_DISTANCE = 10
//   const LOOK_TIMEOUT = 1000
//
//   let exploring = false
//   let lookAroundIndicator
//
//   const sensorDistances = [{
//     direction: 'straight',
//     distance: null,
//     command: 'goForward',
//   }, {
//     direction: 'left',
//     distance: null,
//     command: 'swipeLeft',
//   }, {
//     direction: 'right',
//     distance: null,
//     command: 'swipeRight',
//   }]
//
//   this.startExploring = () => {
//     boardsFn.boards[0].info('Exploration', 'Going into to the great journey!')
//     exploring = true
//     lookAround()
//   }
//
//   this.stopExploring = () => {
//     boardsFn.boards[0].info('Exploration', '...')
//     exploring = false
//     motorsFn.stop()
//   }
//
//   this.toggleExploration = () => (
//     exploring
//       ? this.stopExploring()
//       : this.startExploring()
//   )
//
//   function startMoving(command) {
//     if (command && !isAllVerySafeDistance()) {
//       boardsFn.boards[0].info('Exploration', `Start moving with command - ${command}`, { command })
//
//       if (isAnyDangerDistance()) {
//         boardsFn.boards[0].info('Exploration', `Reversing`)
//         motorsFn.goBack(100)
//       }
//       boardsFn.boards[0].wait(getAutoStopTime(), () => {
//         boardsFn.boards[0].info('Exploration', command)
//         motorsFn[command]()
//         boardsFn.boards[0].wait(getAutoStopTime(), lookAround)
//       })
//     } else {
//       boardsFn.boards[0].info('Exploration', 'START moving')
//       motorsFn.goForward(140)
//       boardsFn.boards[0].wait(getAutoStopTime(), lookAround)
//     }
//   }
//
//   function stopMoving() {
//     boardsFn.boards[0].info('Exploration', 'STOP moving')
//     motorsFn.stop()
//   }
//
//   function lookAround() {
//     lookAroundIndicator = !lookAroundIndicator
//     if (lookAroundIndicator && exploring) {
//       // Look straight
//       servoFn.lookStraight()
//       boardsFn.boards[0].wait(LOOK_TIMEOUT, () => {
//         setDistance('straight')
//         // Look left
//         servoFn.lookLeft()
//         boardsFn.boards[0].wait(LOOK_TIMEOUT, () => {
//           setDistance('left')
//           // Look right
//           servoFn.lookRight()
//           boardsFn.boards[0].wait(LOOK_TIMEOUT, () => {
//             setDistance('right')
//             // Decide where to go
//             decideMove()
//           })
//         })
//       })
//     } else if (!lookAroundIndicator && exploring) {
//       boardsFn.boards[0].wait(LOOK_TIMEOUT, () => {
//         setDistance('right')
//         // Look straight
//         servoFn.lookStraight()
//         boardsFn.boards[0].wait(LOOK_TIMEOUT, () => {
//           setDistance('straight')
//           // Look left
//           servoFn.lookLeft()
//           boardsFn.boards[0].wait(LOOK_TIMEOUT, () => {
//             setDistance('left')
//             // Decide where to go
//             decideMove()
//           })
//         })
//       })
//     }
//   }
//
//   function decideMove() {
//     const distance = R.last(R.sortBy(R.prop('distance'), sensorDistances))
//     startMoving(isSafeDistance(distance.distance) ? distance.command : 'goBack')
//   }
//
//   // Helper functions
//   function isSafeDistance(distance) {
//     return (distance || getDistance()) > SAFE_DISTANCE
//   }
//
//   function isVerySafeDistance(distance) {
//     return (distance || getDistance()) > VERY_SAFE_DISTANCE
//   }
//
//   function isAnyDangerDistance() {
//     return R.find(R.propSatisfies((dist) => dist < DANGER_DISTANCE, 'distance'), sensorDistances)
//   }
//
//   function isAllVerySafeDistance() {
//     return R.all(R.propSatisfies((dist) => dist > VERY_SAFE_DISTANCE, 'distance'), sensorDistances)
//   }
//
//   function getDistance() {
//     return sensorFn.leftSensor && sensorFn.leftSensor.cm
//   }
//
//   function getAutoStopTime() {
//     return motorsFn.autoStopTime + 1000
//   }
//
//   function setDistance(direction, distance?) {
//     const dist = R.find(R.whereEq({ direction }), sensorDistances)
//     dist.distance = distance || getDistance()
//     boardsFn.boards[0].info('Exploration', `Distance set for ${direction}: ${dist.distance}`)
//   }
//
// }
//
// export default Exploration
