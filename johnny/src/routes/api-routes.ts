import * as express from 'express'

import yamaha from '@services/yamaha'

export class ApiRoutes {
  public routes(app: express.Application): void {
    app.get('/', (req, res) => {
      res.send('hello')
    })

    app.get('/api/yamaha/power-on', async (req, res) => {
      await yamaha.turnOn()
      res.send('ok')
    })

    app.get('/api/yamaha/power-off', async (req, res) => {
      await yamaha.turnOff()
      res.send('ok')
    })

    app.get('/api/yamaha/power-status', async (req, res) => {
      const isOn = await yamaha.isOn()
      res.send(isOn ? '1' : '0')
    })
  }
}
