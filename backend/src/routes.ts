import { Router, Request, Response } from 'express';

import { CreateUserController } from './controllers/user/createUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateInovoiceController } from './controllers/invoice/CreateInovoiceController'
import { listAllInovoiceController } from './controllers/invoice/listAllInovoiceController'
import { DetailInovoiceController } from './controllers/invoice/DetailInovoiceController'
import { DeleteInovoiceController } from './controllers/invoice/DeleteInovoiceController'
import { UptadeInovoiceController } from './controllers/invoice/UptadeInovoiceController'

import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router();

router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/detail', isAuthenticated, new DetailUserController().handle);

router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

router.post('/inovoice', isAuthenticated, new CreateInovoiceController().handle);
router.get('/inovoice/all', isAuthenticated, new listAllInovoiceController().handle)
router.get('/inovoice/detail', isAuthenticated, new DetailInovoiceController().handle)
router.delete('/inovoice/delete', isAuthenticated, new DeleteInovoiceController().handle)
router.put('/inovoice/uptade', isAuthenticated, new UptadeInovoiceController().handle)

export { router }