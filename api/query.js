const db = require('../utils/connect')


function getInfo(lat, lng, callback) {
    db.query(`SELECT * from  vnm_adm2, tho_nhuong where st_contains(vnm_adm2.geom, ST_GeomFromText('POINT(${lng} ${lat})')) and st_contains(tho_nhuong.geom, ST_GeomFromText('POINT(${lng} ${lat})'))`, (err, res) => {
        callback(err, res)
    })
}

function getCrop(soil_id, callback) {
    db.query(`SELECT * from crop, crop_detail, soil_detail 
                where soil_detail.crops = crop_detail.id 
                and crop_detail.id_crop = crop.id_crop and domsoil = '${soil_id}'`
        , (err, res) => {
            callback(err, res)
        })
}

function getAllCrop(callback){
    db.query(`SELECT * from crop`, (err, res) =>{
        callback(err, res);
    })
}

function login(username, password, callback) {
    db.query(`SELECT * from users where users.username like '${username}' and users.password like '${password}'`, (err, res) => {
        callback(err, res)
    })
}
function addMarker(name, crop, sl, callback) {
    db.query(`SELECT * from users where users.username like '${username}' and users.password like '${password}'`, (err, res) => {
        callback(err, res)
    })
}
function filter(id_crop, sl, callback) {
    db.query(`select * from marker where id_crop = ${id_crop} and sanluong > ${sl}`, (err, res) => {
        callback(err, res)
    })
}





module.exports = { getInfo, getCrop, login, getAllCrop, addMarker, filter}