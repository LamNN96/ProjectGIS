var express = require('express')
var query = require('./query')
var router = express.Router()


router.get('/checkpoint', async (req, res) => {
    let lat = req.query.lat
    let lng = req.query.lng

    query.checkPoint(lat, lng, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
})

router.post('/login', async(req, res) => {
    console.log(req.body)
    let login = req.body.login
    let password = req.body.password

    query.login(login, password, (err, data) => {
        if(err)
            res.json({success: false, error : err})
        else
        {
            res.json({
                success: true,
                data: data.rows[0]
            })
        }
    })
})

module.exports = router;