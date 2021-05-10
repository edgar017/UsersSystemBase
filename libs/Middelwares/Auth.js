const pool = require('../Configs/MySQL');

function AuthMiddel(req, res, next) {
    if(req.session.uid){
        pool.getConnection((err, Conexion) => {
            if(err){
                console.log(err.message);
            }else{
                Conexion.query({
                    sql: "SELECT * FROM Panel_Configuraciones WHERE id = ? LIMIT 0,1",
                    values: [1]
                }, (err, resp) => {
                    if(err){
                        Conexion.release();
                        console.log('Error en MiddelWare: '+err.message);
                    }else{
                        if(resp.length > 0)                    {

                            var Con1 = resp[0];

                            Conexion.query({
                                sql: "SELECT * FROM Panel_Configuraciones WHERE id = ? LIMIT 0,1",
                                values: [2]
                            }, (err, resp) => {
                                if(err){
                                    Conexion.release();
                                    console.log('Error en MiddelWare: '+err.message);
                                }else{
                                    if(resp.length > 0){
                
                                        var Con2 = resp[0];
                
                                        Conexion.query({
                                            sql: "SELECT * FROM Panel_Usuarios WHERE id = ? LIMIT 0,1",
                                            values: [req.session.uid]
                                        }, (err, resp) => {
                                            Conexion.release();
                                            if(err){
                                                console.log(err.message);
                                            }else{
                                                if(resp.length > 0){
                                                    var UsuarioData = resp[0];
                            
                                                    if(UsuarioData.Estado){
                                                        
                                                        next();

                                                    }else{
                                                        req.session.destroy();
                                                        res.redirect(Con2.Valor);
                                                    }
                                                }else{
                                                    req.session.destroy();
                                                    res.redirect(Con1.Valor);
                                                }
                                            }
                                        });
                
                
                                    }else{
                                        Conexion.release();
                                        console.log('No se encuentra la configuracion')
                                    }
                                }
                            });

                        }else{
                            Conexion.release();
                            console.log('No se encuentra la configuracion');
                        }
                    }
                });
                
            }
        });
    }else{
        res.redirect('/Auth/Login')
    }
}

module.exports = AuthMiddel;