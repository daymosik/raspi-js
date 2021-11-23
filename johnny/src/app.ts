import { RaspiComponents } from '@raspi'
import 'module-alias/register'

import * as express from 'express'

import soundPlayer from '@services/sound-player'
import { ApiRoutes } from './routes/api-routes'
import { SocketRoutes } from './routes/socket-routes'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http')
const serverPort = 8090

export class App {
  public app: express.Application
  public server
  public io
  public ioListen

  public socketRoutes = new SocketRoutes()
  public apiRoutes = new ApiRoutes()

  public raspiComponents: RaspiComponents

  constructor(raspiComponents: RaspiComponents) {
    this.raspiComponents = raspiComponents

    this.app = express()
    this.server = http.createServer(this.app)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.io = require('socket.io')(this.server, { path: '/chat/socket.io' })
    this.ioListen = this.io.listen(this.server)
    this.server.listen(serverPort)

    this.apiRoutes.routes(this.app)

    this.ioListen.on('connection', (client) => this.socketRoutes.routes(client, this.raspiComponents))

    setTimeout(() => soundPlayer.playRandomSound(), 10000)
  }
}
