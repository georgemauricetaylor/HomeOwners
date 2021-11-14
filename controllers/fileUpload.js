var express = require('express');
var router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
var csv = require('csvtojson');

router.post('/',upload.single('file'), async function (req, res) {
    csv({ignoreEmpty:true}).fromFile(req.file.path).then((json) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json));
    });
});
module.exports = router;