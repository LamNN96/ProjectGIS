var express = require('express')
var query = require('./query')
var router = express.Router()


router.get('/getInfo', async (req, res) => {
    let lat = req.query.lat
    let lng = req.query.lng

    query.getInfo(lat, lng, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            //console.log(data)
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
});
router.get('/getMarker', async (req, res) => {
    let lat = req.query.lat
    let lng = req.query.lng

    query.getMarker(lat, lng, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            //console.log(data)
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
});

router.get('/getAllmarkers', async (req, res)=>{
    query.getAllMarkers((err, data) => {
        if (err) {
            console.log("Error", err)
            res.json({success: false, error : err})
        } else {
            res.json({
                success: true,
                data: data.rows
            })
        }
    })
})
router.post('/addMarker', async (req, res) => {
    let id_user = req.body.id_user; 
    let id_crop = req.body.id_crop;
    let sanluong = req.body.sanluong;
    let id_donvi = req.body.id_donvi;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let name = req.body.name;


    query.addMarker(id_user, id_crop, sanluong, id_donvi, name, lat, lng, (err, data) => {
        if(err){
            console.log("Router err", err)
            res.json({success: false, error : err})
        }
        else
        {
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
});
router.post('/updateMarker', async (req, res) => {
    let id = req.body.id; 
    let id_crop = req.body.id_crop;
    let sanluong = req.body.sanluong;
    let name = req.body.name;


    query.updateMarker(id, name, id_crop, sanluong, (err, data) => {
        if(err){
            console.log("Router err", err)
            res.json({success: false, error : err})
        }
        else
        {
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
});

router.get('/getCrop', async (req, res)=>{
    console.log(req.query.soil_id)
    let soil_id = req.query.soil_id
    query.getCrop(soil_id, (err, data) => {
        if (err) {
            res.json({success: false, error : err})
        } else {
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
})


router.get('/getAllCrop', async (req, res)=>{
    query.getAllCrop((err, data) => {
        if (err) {
            console.log("Error", err)
            res.json({success: false, error : err})
        } else {
            res.json({
                success: true,
                data: data.rows
            })
        }
    })
})
router.get('/filter', async (req, res)=>{
    let id_crop = req.query.id_crop;
    let sl = req.query.sl;
    query.filter(id_crop, sl, (err, data) => {
        if (err) {
            console.log("Error", err)
            res.json({success: false, error : err})
        } else {
            res.json({
                success: true,
                data: data.rows
            })
        }
    })
})

module.exports = router;