// LiteLoader-AIDS automatic generated
/// <reference path="e:\bds_api/dts/helperlib/src/index.d.ts"/> 
var CONFIG = data.openConfig(".\\plugins\\lugua\\dahuoji\\config.json", "json", JSON.stringify({
    "power": 5,
    "range": 5,
    "isDestroy": true,
    "isFire": true,
    "probability":0.65
}));
mc.listen("onUseItem", (pl, it) => {
    if (it.id == 300) {
        var result = setProbability(CONFIG.get("probability"));
        if (result) {
            mc.explode(pl.pos, null, CONFIG.get("power"), CONFIG.get("range"), CONFIG.get("isDestroy"), CONFIG.get("isFire"))
            mc.broadcast("来!"+pl.realName+"整个活！")
        }
    }
})

function setProbability(chance) {
    var random = Math.random();
    return random <= chance;
}