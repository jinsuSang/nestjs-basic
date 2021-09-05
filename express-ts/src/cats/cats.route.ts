import {
  readAllCat,
  readCat,
  createCat,
  putCat,
  patchCat,
} from './cats.service'
import * as express from 'express'
import { deleteCat } from './cats.service'

const router = express.Router()

router.get('', readAllCat)

router.get('/:id', readCat)

router.post('', createCat)

router.put('/:id', putCat)

router.patch('/:id', patchCat)

router.delete('/:id', deleteCat)

export default router
