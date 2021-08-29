import * as express from 'express'

const app: express.Express = express()
const port = 8000

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({
    name: 'jinsu',
    age: 27,
  })
})

app.listen(port, () => {
  console.log(`Server start: port ${port}`)
})
