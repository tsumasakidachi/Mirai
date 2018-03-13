var express = require("express");
var qs = require("querystring");
var router = express.Router();
var bodyParser = require('body-parser');

// メッセージ
router.get('/lines', (req, res, next) => {
    let options = {
        hostName: req.minecraft.hostName,
        upper: parseInt(req.query.upper) || null,
        lower: parseInt(req.query.lower) || null,
        count: parseInt(req.query.count) || null
    };

    req.line.get(options, (error, rows, fields) => {
        let ids = rows.map((r) => r.id);

        res.json({
            upper: Math.max(...ids),
            lower: Math.min(...ids),
            lines: rows
        })

    });
});

// 新しいメッセージ
router.post("/lines/create", (req, res, next) => {
    if (!req.body.text) throw new Error("text が空です。");

    req.line.send(req.body.text);
    res.json(null);
});

// ログイン
router.post('/connection/connect', (req, res, next) => {
    if(req.minecraft.isConnected) return;

    req.minecraft.connect((error) => {
        if (error) throw error;

        res.json({
            "isConnected": true
        });
    });
});

// ログアウト
router.post('/connection/disconnect', (req, res, next) => {
    if(!req.minecraft.isConnected) return;
    
    req.minecraft.disconnect((error) => {
        if (error) throw error;

        res.json({
            "isConnected": false
        });
    });
});

module.exports = router;