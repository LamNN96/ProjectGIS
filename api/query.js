const db = require('../utils/connect')


function getInfo(lat, lng, callback) {
    db.query(`SELECT * from  vnm_adm2, tho_nhuong where st_contains(vnm_adm2.geom, ST_GeomFromText('POINT(${lng} ${lat})')) and st_contains(tho_nhuong.geom, ST_GeomFromText('POINT(${lng} ${lat})'))`, (err, res) => {
        callback(err, res)
      })
}


module.exports = {getInfo}