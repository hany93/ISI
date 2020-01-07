// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
var express = require('express');
var router = express.Router();
var controllers = require('../db/controllers/user');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/users/list', controllers.list);
// router.get('/users/getById/:id', controllers.getById);

router.post('/users/userLog', controllers.userLog);

// router.post('/users/add', controllers.add);
// //router.post('/users/add', secure, controllers.add);

// //router.delete('/users/delete/:id', controllers.delete);
// router.post('/users/delete', controllers.eliminar);

// router.put('/users/update', controllers.update);

router.post('/users/leer', controllers.leer);

router.post('/users/editFile', controllers.editFile);

router.post('/users/editFilePdf', controllers.editFilePdf);

router.post('/users/sendPanoXML', controllers.sendPanoXML);

router.post('/users/verCarousel', controllers.verCarousel);

router.post('/users/existObra', controllers.existObra);

module.exports = router;

