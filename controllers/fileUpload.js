var express = require('express');
var router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
var csv = require('csvtojson');

const parseHomeOwnerService = require('../libs/services/parseHomeOwnersService');


router.post('/',upload.single('file'), async function (req, res) {
    csv({ignoreEmpty:true}).fromFile(req.file.path).then((json) => {
        const result = parseHomeOwnerService.parseNames(json);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    });
});
module.exports = router;