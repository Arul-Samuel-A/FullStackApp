import express from 'express';
import addBook from '../controllers/addBook.js';
import deleteBook from '../controllers/deleteBook.js';
import viewBooks from '../controllers/viewBooks.js';
import updateBook from '../controllers/updateBook.js';
import showDetails from '../controllers/showDetails.js';
import adminLogin from '../controllers/adminLogin.js';
import handleAuthReq from '../controllers/handleAuthReq.js'
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', viewBooks)
router.post('/add',authMiddleware,addBook)
router.delete('/delete/:id',authMiddleware,deleteBook)
router.put('/update/:id',authMiddleware,updateBook)
router.get("/details/:id",showDetails)
router.post("/login",adminLogin)
router.get("/auth/check",authMiddleware,handleAuthReq)



export default router;