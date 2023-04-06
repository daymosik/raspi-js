import 'module-alias/register'

import express from 'express'
import * as http from 'http'
import * as io from 'socket.io'

import { RaspiComponents } from '@raspi'
import soundPlayer from '@services/sound-player'
import { ApiRoutes } from './routes/api-routes'
import { SocketRoutes } from './routes/socket-routes'

const serverPort = 8090

export class App {
  public app: express.Application
  public server: http.Server
  public io: io.Server

  public socketRoutes = new SocketRoutes()
  public apiRoutes = new ApiRoutes()

  public raspiComponents: RaspiComponents

  constructor(raspiComponents: RaspiComponents) {
    this.raspiComponents = raspiComponents

    this.app = express()
    this.server = http.createServer(this.app)
    this.io = new io.Server(this.server, {
      path: '/chat/socket.io',
      // TODO
      cors: {
        origin: '*',
      },
    })
    this.server.listen(serverPort)

    this.apiRoutes.routes(this.app)

    this.io.on('connection', (client) => this.socketRoutes.routes(client, this.raspiComponents))

    this.raspiComponents.lcdDisplay.print('Hello World!')
    setTimeout(() => soundPlayer.playRandomSound(), 1000)
  }
}
