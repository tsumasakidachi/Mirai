var lines = require("../repositories/linesRepository.js");
var echo = {};

echo.received = (l) => {
    // if(result = l.body.match(/^\[[^\[\]]+\]<(\w+)>\s+)?$/i))
    if(result = l.body.match(/bot/i))    
    {
        lines.send("BOTだよ！");
    }
};

lines.onReceived(echo.received);
module.exports = () => echo;