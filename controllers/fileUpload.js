var express = require('express');
var router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
var csv = require('csvtojson');

const parseHomeOwnerService = require('../libs/services/parseHomeOwnersService');

router.get('/example', async function (req, res) {

        csv({ignoreEmpty: true}).fromFile('./example.csv').on('error',()=>{
            res.status(500).end();
        }).then((json) => {
            const result = parseHomeOwnerService.parseNames(json);

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        });

});

router.post('/',upload.single('file'), async function (req, res) {
    csv({ignoreEmpty:true}).fromFile(req.file.path).on('error',()=>{
        res.status(500).end();
    }).then((json) => {
        const result = parseHomeOwnerService.parseNames(json);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    });
});
module.exports = router;