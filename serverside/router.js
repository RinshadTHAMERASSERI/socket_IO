
// 4th
import { Router } from "express";
import * as  user from './reqhandler.js'
import Auth from './middleware/Auth.js'

const router = Router()
router.route('/sign').post(user.signUp)
router.route('/signin').post(user.signIn)
router.route('/profile').get(Auth,user.profile)
export default router;