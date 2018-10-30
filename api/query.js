const db = require('../utils/connect')


function getInfo(lat, lng, callback) {
    db.query(`SELECT * from  vnm_adm2, tho_nhuong where st_contains(vnm_adm2.geom, ST_GeomFromText('POINT(${lng} ${lat})')) and ST_Overlaps(vnm_adm2.geom, tho_nhuong.geom) limit 1`, (err, res) => {
        
        callback(err, res)
      })
}


module.exports = {getInfo}