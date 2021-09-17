import * as express from 'express'
import catRouter from './cats/cats.route'

class Server {
  public app: express.Application

  constructor() {
    const app = express()
    this.app = app
  }

  private setRouer() {
    this.app.use('/cats', catRouter)
  }

  private setMiddleware() {
    this.app.use(express.json())

    this.app.use((req: express.Request, res: express.Response, next) => {
      console.log(req.rawHeaders[1])
      next()
    })

    this.setRouer()

    this.app.use((req: express.Request, res: express.Response, next) => {
      console.log(req.rawHeaders[1])
      res.send({ error: '404 not found error' })
    })
  }

  public listen() {
    const port = 3000
    this.setMiddleware()
    this.app.listen(port, () => {
      console.log(`Start server: http://localhost:${port}`)
    })
  }
}

function init() {
  const server = new Server()
  server.listen()
}

init()
