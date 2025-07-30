
// 4th
import { Router } from "express";
import * as  user from './reqhandler.js'

const router = Router()
router.route('/sign').post(user.signUp)
router.route('/signin').post(user.signIn)
export default router;