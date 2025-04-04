const express=require('express');
const {add,listAll,update,deleteById,
    listById,searchByName,searchById}=require('../controllers/categories')
const router=express.Router()
const auth=require('../middlewares/authenticated');


router.route('/')
.post(auth,add)
.get(auth,listAll);

router.route('/:id')
.get(auth,listById)
.put(auth,update)
.delete(auth,deleteById)


router.get('/search/:name',auth,searchByName);

router.get('/search/:id',auth,searchById);



module.exports=router;