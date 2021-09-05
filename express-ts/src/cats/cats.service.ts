import * as express from 'express'
import { Cat, CatType } from './cats.model'

export const readAllCat = (req: express.Request, res: express.Response) => {
  try {
    const cats = Cat
    res.status(201).send({ data: cats })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message })
    }
  }
}

export const readCat = (req: express.Request, res: express.Response) => {
  try {
    const cat = Cat.find((cat) => cat.id == req.params.id)
    res.status(201).send({ data: cat })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message })
    }
  }
}

export const createCat = (req: express.Request, res: express.Response) => {
  try {
    const data = req.body
    Cat.push(data)
    res.status(200).send({ data })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message })
    }
  }
}

export const putCat = (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id
    const data = req.body
    let result
    Cat.forEach((cat) => {
      if (cat.id == id) {
        cat = data
        result = cat
      }
    })
    res.status(200).send({ data: result })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message })
    }
  }
}

export const patchCat = (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id
    const data = req.body
    let result
    Cat.forEach((cat) => {
      if (cat.id == id) {
        cat = { ...cat, ...data }
        result = cat
      }
    })
    res.status(200).send({ data: result })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message })
    }
  }
}

export const deleteCat = (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id
    const newCat = Cat.filter((cat) => cat.id != id)
    res.status(200).send({ data: newCat })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message })
    }
  }
}
