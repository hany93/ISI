"use strict";
//import User from "../models/user";
const models = require("./../models"),
  Inv_Sys_Ob = models.INVERS_Sym_Obras,
  Usuario = models.Usuario,
  fs = require("fs"),
  dest = "./Documentos/Carousel/images/",
  destPdf = "./Documentos/Pdf/",
  pano = "./Documentos/Pano/",
  open = require("open");

var jwt = require("jsonwebtoken");

function generateToken(user) {
  var u = {
    username: user.usuario
  };
  return jwt.sign(u, "password", {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

// function copyFotos(d) {
// 	var arrayFotos = d.filelist;

// }

module.exports = {
  userLog: function userLog(req, res) {
    console.log(req.body.usuario)
    return Usuario.findOne({
      attributes: ['usuario', "contrasenna"],
      where: {
        usuario: req.body.usuario,
        contrasenna: req.body.contrasenna
      }
    })
      .then(async function(user) {
        console.log(user)
        let token = await generateToken(user);
        return res.status(200).send(token);
      })
      .catch(function(error) {
        res.status(400).send(error);
      });
  },
  list: function list(req, res) {
    return Inv_Sys_Ob.findAll({
      attributes: ['id', "Obra", "Constructor", "Provincia", "Municipio", "ValorInversion", "OSDE", "Programa", "Tipo", "Estado", "Inversionista"]
      // include: [
      // 	{
      // 		model: models.entidad,
      // 		as: 'entidad'
      // 	}
      // ]
    })
      .then(function (obra) {
        console.log(obra)
        return res.status(200).send(obra);
      })
      .catch(function (error) {
        res.status(400).send(error);
      });
  },
  // getById: function getById(req, res) {
  //   return User.findById(req.params.id, {
  //     // include: [
  //     // 	{
  //     // 		model: models.entidad,
  //     // 		as: 'infrastructure'
  //     // 	}
  //     // ]
  //   })
  //     .then(function(user) {
  //       if (!user) {
  //         return res.status(404).send({
  //           message: "user Not Found"
  //         });
  //       }
  //       return res.status(200).send(user);
  //     })
  //     .catch(function(error) {
  //       return res.status(400).send(error);
  //     });
  // },
  // add: function add(req, res) {
  //   return User.create({
  //     nickname: req.body.nickname,
  //     password: req.body.password,
  //     confirmpassword: req.body.confirm,
  //     email: req.body.email
  //   })
  //     .then(function(user) {
  //       return res.status(201).send(user);
  //     })
  //     .catch(function(error) {
  //       return res.status(400).send(error);
  //     });
  // },
  // eliminar: function eliminar(req, res) {
  //   return User.findById(req.body.id)
  //     .then(function(user) {
  //       if (!user) {
  //         return res.status(400).send({
  //           message: "user Not Found"
  //         });
  //       }
  //       return user
  //         .destroy()
  //         .then(function() {
  //           return res.status(204).send();
  //         })
  //         .catch(function(error) {
  //           return res.status(400).send(error);
  //         });
  //     })
  //     .catch(function(error) {
  //       return res.status(400).send(error);
  //     });
  // },
  // update: function update(req, res) {
  //   return User.findById(req.body.itemId)
  //     .then(function(user) {
  //       if (!user) {
  //         return res.status(404).send({
  //           message: "user Not Found"
  //         });
  //       }
  //       return user
  //         .update({
  //           nickname: req.body.valuesForm.nickname,
  //           password: req.body.valuesForm.password,
  //           confirmpassword: req.body.valuesForm.confirm,
  //           email: req.body.valuesForm.email
  //         })
  //         .then(function() {
  //           return res.status(200).send(user);
  //         })
  //         .catch(function(error) {
  //           return res.status(400).send(error);
  //         });
  //     })
  //     .catch(function(error) {
  //       return res.status(400).send(error);
  //     });
  // },
  leer: function leer(req, res) {
    console.log(req.body);
    var nom = req.body.TitObra;
    const NOMBRE_ARCHIVO =
      "Documentos/Carousel/" + String(nom).replace(/\s/g, "_") + ".html";
    return fs.readFile(NOMBRE_ARCHIVO, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log("error: ", err);
      } else {
        console.log("El contenido es: ", data);
        return res.status(200).send(data);
      }
    });
  },
  editFile: function editFile(req, res) {
    var arrayFotos = req.body.filelist;
    var datosF = req.body.datosform;
    const NOMBRE_ARCHIVO =
      "Documentos/Carousel/" + datosF.titulo.replace(/\s/g, "_") + ".html";
    //var textoCarousel = ``;

    fs.readdir(dest, function (err, files) {
      if (err) throw err;
      console.log("mmmm 1");
      for (const file of files) {
        //console.log(file)
        let a = file.toString().substring(0, file.length - 6);
        //console.log(a)
        if (datosF.titulo.replace(/\s/g, "_") === a) {
          fs.unlink(dest + file, err => {
            if (err) throw err;
            console.log("nnnn 2");
          });
        }
      }
    });

    fs.open(NOMBRE_ARCHIVO, "wx", (err, fd) => {
      if (err) {
        if (err.code === "EEXIST") {
          console.log("existttttt");
          fs.truncateSync(NOMBRE_ARCHIVO, 0);
        }
      }
      fs.appendFile(
        NOMBRE_ARCHIVO,
        '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>' +
        datosF.titulo +
        '</title>\n  <link rel="stylesheet" type="text/css" href="css\\bootstrap.min.css">\n  <link rel="stylesheet" type="text/css" href="css\\carousel.css">\n</head>\n<body>\n  ',
        "utf8",
        function (err) {
          if (err) throw err;
          // if no error
          console.log("Data is appended to file successfully...1");
          let data0 =
            '<div id="myCarousel" class="carousel slide" data-ride="carousel">\n    <ol class="carousel-indicators">\n        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>\n';
          fs.appendFile(NOMBRE_ARCHIVO, data0, "utf8", function (err) {
            if (err) throw err;
            // if no error
            console.log("Data is appended to file successfully...2");
            var data1 = "";
            if (arrayFotos.length > 1) {
              let data = "";
              for (let i = 1; i < arrayFotos.length; i++) {
                data =
                  data +
                  '        <li data-target="#myCarousel" data-slide-to="' +
                  i +
                  '"></li>\n';
              }
              data1 =
                data +
                '    </ol>\n    <div class="carousel-inner" role="listbox">\n';
            } else {
              data1 =
                '    </ol>\n    <div class="carousel-inner" role="listbox">\n';
            }
            fs.appendFile(NOMBRE_ARCHIVO, data1, "utf8", function (err) {
              if (err) throw err;
              // if no error
              console.log("Data is appended to file successfully...4");
              //var nombre = arrayFotos[0].nombrefoto ? String(arrayFotos[0].nombrefoto + ".jpg") : String(arrayFotos[0].name.substring(0, arrayFotos[0].name.length - 4) + ".jpg");
              var nombre0 = arrayFotos[0].nombrefoto
                ? String(arrayFotos[0].nombrefoto + ".jpg")
                : String(
                  arrayFotos[0].name.substring(
                    0,
                    arrayFotos[0].name.length - 4
                  ) + ".jpg"
                );
              //var nombre1 = nombre0.replace(/\s/g, "_");
              let data2 =
                '        <div class="item active">\n          <img src="images/' +
                datosF.titulo.replace(/\s/g, "_") + "_0" +
                '.jpg" alt="Granos">\n          <div class="carousel-caption">\n            <h2>' +
                datosF.titulo +
                "</h2>\n            <p>" +
                nombre0.substring(0, nombre0.length - 4) +
                "</p>\n            <p>" +
                datosF.date +
                "</p>\n          </div>\n        </div>\n";
              // textoCarousel =
              //   textoCarousel +
              //   `        <div class="item active">\n          <img src="` +
              //   arrayFotos[0].thumbUrl +
              //   `" alt="Granos"/>\n          <div class="carousel-caption">\n            <h2 id="car"><strong>` +
              //   datosF.titulo +
              //   `</strong></h2>\n            <p id="car"><strong>` +
              //   nombre0.substring(0, nombre0.length - 4) +
              //   `</strong></p>\n            <p id="car"><strong>` +
              //   datosF.date +
              //   `</strong></p>\n          </div>\n        </div>\n`;
              fs.appendFile(NOMBRE_ARCHIVO, data2, "utf8", function (err) {
                if (err) throw err;
                // if no error
                console.log("Data is appended to file successfully...5");
                if (arrayFotos.length > 1) {
                  for (let i = 1; i < arrayFotos.length; i++) {
                    //var nombre2 = arrayFotos[i].nombrefoto ? String(arrayFotos[i].nombrefoto + ".jpg") : String(arrayFotos[i].name.substring(0, arrayFotos[i].name.length - 4) + ".jpg");
                    var nombre4 = arrayFotos[i].nombrefoto
                      ? String(arrayFotos[i].nombrefoto + ".jpg")
                      : String(
                        arrayFotos[i].name.substring(
                          0,
                          arrayFotos[i].name.length - 4
                        ) + ".jpg"
                      );
                    //var nombre3 = nombre4.replace(/\s/g, "_");
                    let data3 =
                      '        <div class="item">\n          <img src="images/' +
                      datosF.titulo.replace(/\s/g, "_") + "_" + i +
                      '.jpg" alt="Granos">\n          <div class="carousel-caption">\n            <h2>' +
                      datosF.titulo +
                      "</h2>\n            <p>" +
                      nombre4.substring(0, nombre4.length - 4) +
                      "</p>\n            <p>" +
                      datosF.date +
                      "</p>\n          </div>\n        </div>\n";
                    // textoCarousel =
                    //   textoCarousel +
                    //   `        <div class="item">\n          <img src="` +
                    //   arrayFotos[i].thumbUrl +
                    //   `" alt="Granos"/>\n          <div class="carousel-caption">\n            <h2 id="car"><strong>` +
                    //   datosF.titulo +
                    //   `</strong></h2>\n            <p id="car"><strong>` +
                    //   nombre4.substring(0, nombre4.length - 4) +
                    //   `</strong></p>\n            <p id="car"><strong>` +
                    //   datosF.date +
                    //   `</strong></p>\n          </div>\n        </div>\n`;
                    fs.appendFile(NOMBRE_ARCHIVO, data3, "utf8", function (err) {
                      if (err) throw err;
                      // if no error
                      console.log(
                        "Data is appended to file successfullyyyyyyyyyyyyyy."
                      );
                      if (i + 1 === arrayFotos.length) {
                        //textoCarousel = textoCarousel + `</div>`;
                        fs.appendFile(
                          NOMBRE_ARCHIVO,
                          '  </div>\n   <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">\n    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n    <span class="sr-only">Anterior</span>\n  </a>\n  <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">\n    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n    <span class="sr-only">Siguiente</span>\n  </a>\n</div>\n',
                          "utf8",
                          function (err) {
                            if (err) throw err;
                            // if no error
                            console.log(
                              "Data is appended to file successfullyyyyyyyyyyyyyy."
                            );
                            fs.appendFile(
                              NOMBRE_ARCHIVO,
                              '<script type="text/javascript" src="lib\\jquery.min.js"></script>\n<script type="text/javascript" src="lib\\bootstrap.min.js"></script>\n</body>\n</html>',
                              "utf8",
                              function (err) {
                                if (err) throw err;
                                // if no error
                                console.log(
                                  "Data is appended to file successfullyyyyyyyyyyyyyy."
                                );
                                // var d = {
                                // 	filelist: arrayFotos
                                // };
                                //copyFotos(d);
                                for (let i = 0; i < arrayFotos.length; i++) {
                                  var cad = String(arrayFotos[i].thumbUrl);
                                  var cadena = cad.substring(
                                    cad.indexOf("base64") + 7,
                                    cad.length
                                  );
                                  // var nomb = arrayFotos[i].nombrefoto
                                  //   ? arrayFotos[i].nombrefoto.replace(
                                  //     /\s/g,
                                  //     "_"
                                  //   ) + ".jpg"
                                  //   : arrayFotos[i].name
                                  //     .substring(
                                  //       0,
                                  //       arrayFotos[i].name.length - 4
                                  //     )
                                  //     .replace(/\s/g, "_") + ".jpg";
                                  fs.writeFile(
                                    dest + datosF.titulo.replace(/\s/g, "_") + "_" + i + ".jpg",
                                    cadena,
                                    "base64",
                                    function (err) {
                                      if (err) throw err;
                                      console.log("La imagen fue copiada exitosamente.");
                                      // (async () => {
                                      //   // Opens the URL in the default browser.
                                      //   await open(encodeURI(NOMBRE_ARCHIVO), { app: 'chrome' });
                                      // })();
                                    }
                                  );
                                }
                                return res.status(200).send();
                              }
                            );
                          }
                        );
                      }
                    });
                  }
                } else {
                  fs.appendFile(
                    NOMBRE_ARCHIVO,
                    "  </div>\n</div>\n",
                    "utf8",
                    function (err) {
                      if (err) throw err;
                      // if no error
                      console.log(
                        "Data is appended to file successfullyyyyyyyyyyyyyy."
                      );
                      fs.appendFile(
                        NOMBRE_ARCHIVO,
                        '<script type="text/javascript" src="lib\\jquery.min.js"></script>\n<script type="text/javascript" src="lib\\bootstrap.min.js"></script>\n</body>\n</html>',
                        "utf8",
                        function (err) {
                          if (err) throw err;
                          // if no error
                          console.log(
                            "Data is appended to file successfullyyyyyyyyyyyyyy."
                          );
                          // var d = {
                          // 	filelist: arrayFotos
                          // };
                          //copyFotos(d);
                          for (let i = 0; i < arrayFotos.length; i++) {
                            var cad = String(arrayFotos[i].thumbUrl);
                            var cadena = cad.substring(
                              cad.indexOf("base64") + 7,
                              cad.length
                            );
                            // var nomb = arrayFotos[i].nombrefoto
                            //   ? arrayFotos[i].nombrefoto.replace(/\s/g, "_") +
                            //   ".jpg"
                            //   : arrayFotos[i].name
                            //     .substring(0, arrayFotos[i].name.length - 4)
                            //     .replace(/\s/g, "_") + ".jpg";
                            fs.writeFile(dest + datosF.titulo.replace(/\s/g, "_") + "_" + i + ".jpg", cadena, "base64", function (
                              err
                            ) {
                              if (err) throw err;
                              console.log("La imagen fue copiada exitosamente.");
                              // console.log(cad)
                              // console.log(cadena)
                              // (async () => {
                              //   // Opens the URL in the default browser.
                              //   await open(encodeURI(NOMBRE_ARCHIVO), { app: 'chrome' });
                              // })();
                            });
                          }
                          return res.status(200).send();
                        }
                      );
                    }
                  );
                }
              });
            });
          });
        }
      );
    });
  },
  editFilePdf: function editFilePdf(req, res) {
    var cad = String(req.body.fileUrl);
    var arrayFile = req.body.filelist;
    var cadena = cad.substring(cad.indexOf("base64") + 7, cad.length);

    fs.readdir(destPdf, function (err, files) {
      if (err) throw err;
      console.log("mmmm 1");
      for (const file of files) {
        fs.unlink(destPdf + file, err => {
          if (err) throw err;
          console.log("nnnn 2");
        });
      }
    });

    fs.writeFile(destPdf + arrayFile[0].name, cadena, "base64", function (err) {
      if (err) throw err;
      console.log("El file fue copiado exitosamente.");
      res.status(200).send(cadena);
      //res.redirect('http://localhost:3000/users/leera');
      // fs.readFile(destPdf + arrayFile[0].name, (err, data) => {
      // 	if (err) {
      // 		console.log('error: ', err);
      // 	} else {
      // 		console.log("El contenido es: " + destPdf + arrayFile[0].name + "......" + __dirname);
      // 		// var options = {
      // 		// 	root: destPdf
      // 		// };
      // 	}
      // });
    });
  },

  sendPanoXML: function editFilePdf(req, res) {
    var cad = String(req.body.fileUrl);
    var arrayFile = req.body.filelist;
    var cadena = cad.substring(cad.indexOf("base64") + 7, cad.length);

    fs.readdir(pano, function (err, files) {
      if (err) throw err;
      console.log("mmmm 1");
      for (const file of files) {
        fs.unlink(pano + file, err => {
          if (err) throw err;
          console.log("nnnn 2");
        });
      }
    });

    fs.writeFile(pano + arrayFile[0].name, cadena, "base64", function (err) {
      if (err) throw err;
      console.log("El file fue copiado exitosamente.");
      res.status(200).send(cadena);
      //res.redirect('http://localhost:3000/users/leera');
      // fs.readFile(pano + arrayFile[0].name, (err, data) => {
      // 	if (err) {
      // 		console.log('error: ', err);
      // 	} else {
      // 		console.log("El contenido es: " + pano + arrayFile[0].name + "......" + __dirname);
      // 		// var options = {
      // 		// 	root: pano
      // 		// };
      // 	}
      // });
    });
  },
  verCarousel: function verCarousel(req, res) {
    //console.log(req.body)
    var cad = String(req.body.titulo);
    const NOMBRE_ARCHIVO =
      "Documentos/Carousel/" + cad.replace(/\s/g, "_") + ".html";
    (async () => {
      // Opens the URL in the default browser.
      await open(encodeURI(NOMBRE_ARCHIVO), { app: 'chrome' });
    })();
    return res.status(200).send();
  },
  existObra: function existObra(req, res) {
    //console.log(req.body.titulo)
    var cad = String(req.body.titulo);
    const NOMBRE_ARCHIVO_CAROUSEL =
      "Documentos/Carousel/" + cad.replace(/\s/g, "_") + ".html";
    const NOMBRE_ARCHIVO_PDF =
      "Documentos/Pdf/" + cad.replace(/\s/g, "_") + ".pdf";
    var data = {};
    fs.stat(NOMBRE_ARCHIVO_CAROUSEL, function (err, stats) {
      if (err === null) {
        if (stats.isFile()) {
          data.carousel = true;
        } else {
          data.carousel = false;
        }
      } else {
        data.carousel = false;
      }
      fs.stat(NOMBRE_ARCHIVO_PDF, function (err, stats) {
        if (err === null) {
          if (stats.isFile()) {
            data.pdf = true;
          } else {
            data.pdf = false;
          }
        } else {
          data.pdf = false;
        }
        return res.status(200).send(data); 
      });
    });
  }

};
