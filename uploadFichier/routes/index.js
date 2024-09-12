var express = require('express');
var router = express.Router();

var formidable = require('formidable');
const { default: nodemon } = require('nodemon');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req,res){
  var form = new formidable.IncomingForm();

  // form.maxFileSize = 2 * 1024 * 1024;
  form.parse(req);
  let fileTypes = ['image/jpeg','image/png','image/gif'];

  form.onPart = function(part){
    if (fileTypes.indexOf(part.mimetype) === -1 ){
      form._error(new Error('file type is not supporter : ' + part.mimetype));
  };

  if (!part.originalFilename || fileTypes.indexOf(part.mimetype) !== -1){
    form._handlePart(part);
  };
};

  form.on('fileBegin', function(name,file){
    console.log("fichier uploadé : " + file.originalFilename);
    file.filepath = __dirname + '/../public/uploads/' + file.originalFilename;
    console.log(file.filepath);
});

  form.on('file', function(name,file){
    console.log("nom original du fichier :" + file.originalFilename);
    console.log("taille du fichier :" + file.size);
    console.log("type de fichier :" + file.mimetype);

    res.render('uploaded',{title:'upload', nom: file.originalFilename, taille: file.size, type: file.mimetype});
   
    form.on('end',function(){
      console.log('upload ok!');
    });
    
    form.on('error',function(err){
      console.log('erreur :' + err);
      console.log('stack : ' + err.stack);

      res.render('error', {title:'erreur',message:'une erreur',error: err});
    });
    
  
  });

  });



module.exports = router;
