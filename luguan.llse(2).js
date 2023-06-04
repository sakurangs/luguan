// LiteLoader-AIDS automatic generated
/// <reference path="e:\bds_api/dts/helperlib/src/index.d.ts"/> 
var CONFIG = data.openConfig(".\\plugins\\lugua\\config.json", "json", JSON.stringify({
    "pl_luguan_max": 3,//单日打飞机次数限制
    "randomNumber": 10,//单词打飞机累计次数数量发放加血效果
    "cd_m": 5,//cd，按照分钟计算
    "扣血": {
        "id": 19,
        "kick": 50,
        "level": 1
    },
    "失明": {
        "id": 15,
        "kick": 300,
        "level": 1
    },
    "虚弱": {
        "id": 18,
        "kick": 800,
        "level": 1
    },
    "加血效果": {
        "id": 6,
        "kick": 100,
        "level": 1
    }
    //对应代码：pl.addEffect(18, tick, 1, false)
}));
var pl_luguan_data_path = ".\\plugins\\lugua\\data.json"
var CONFIG_pl_luguan_data = data.openConfig(pl_luguan_data_path, "json");
mc.listen("onJoin", (pl) => {
    if (CONFIG_pl_luguan_data.get(pl.xuid) == null) {
        CONFIG_pl_luguan_data.set(pl.xuid, { number_max: 0, time_D: system.getTimeObj().D, time_cd: system.getTimeStr() })
    } else if (CONFIG_pl_luguan_data.get(pl.xuid).time_D != system.getTimeObj().D) {
        CONFIG_pl_luguan_data.set(pl.xuid, { number_max: 0, time_D: system.getTimeObj().D, time_cd: system.getTimeStr() })
    }
})
let pl_lig_nb = 0;
//服务器启动
mc.listen("onServerStarted", () => {
    colorLog("green", "[定制|撸个管先]");
});
mc.listen("onAttackBlock", (pl, block) => {
    const item = pl.getHand()
    if (pl.isSneaking && pl.direction.pitch > 40 && item.id == 387) {
        if (CONFIG_pl_luguan_data.get(pl.xuid).number_max > CONFIG.get("pl_luguan_max")) {
            //扣血
            pl.addEffect(CONFIG.get("扣血").id, CONFIG.get("扣血").kick, CONFIG.get("扣血").level, false)
            //失明
            pl.addEffect(CONFIG.get("失明").id, CONFIG.get("失明").kick, CONFIG.get("失明").level, false)
            //虚弱
            pl.addEffect(CONFIG.get("虚弱").id, CONFIG.get("虚弱").kick, CONFIG.get("虚弱").level, false)
            pl.tell("休息一下吧，明天~好不好~")
            //CONFIG_pl_luguan_data.set(pl.xuid, { number_max: number_max, time_D: time_D, time_cd: system.getTimeObj() })
        }
        else {
            if (calculateTimeDifferenceInMinutes(CONFIG_pl_luguan_data.get(pl.xuid).time_cd) > CONFIG.get("cd_m")) {
                let number_max = CONFIG_pl_luguan_data.get(pl.xuid).number_max;
                pl_lig_nb++;
                mc.runcmdEx('playsound mob.slime.big ' + pl.realName)
                let pos = pl.feetPos
                mc.spawnParticle(pos.x, pos.y + 0.5, pos.z, pos.dimid, "minecraft:basic_flame_particle");
                mc.spawnParticle(pos.x + 0.1, pos.y + 0.5, pos.z, pos.dimid, "minecraft:basic_flame_particle");
                mc.spawnParticle(pos.x, pos.y + 0.5, pos.z + 0.1, pos.dimid, "minecraft:basic_flame_particle");
                mc.spawnParticle(pos.x - 0.1, pos.y + 0.5, pos.z, pos.dimid, "minecraft:basic_flame_particle");
                mc.spawnParticle(pos.x, pos.y + 0.5, pos.z + 0.1, pos.dimid, "minecraft:basic_flame_particle");
                if (pl_lig_nb > CONFIG.get("randomNumber")) {

                    let max = number_max + 1;
                    
                    //加血效果
                    pl.addEffect(CONFIG.get("加血效果").id, CONFIG.get("加血效果").kick, CONFIG.get("加血效果").level, true)
                    pl_lig_nb = 0;
                    pl.tell("去了去了")
                    mc.runcmdEx('clear ' + pl.realName + ' paper 0 1')
                    CONFIG_pl_luguan_data.set(pl.xuid, { number_max: max, time_D: system.getTimeObj().D,time_cd: system.getTimeStr()})
                }
            }
            else {
                pl.tell("休息一下,还剩时间（分） ："+(CONFIG.get("cd_m")-calculateTimeDifferenceInMinutes(CONFIG_pl_luguan_data.get(pl.xuid).time_cd)))
            }
        }
    }
})

function calculateTimeDifferenceInMinutes(startTime) {
    let date1 = new Date(startTime);
    let date2 = new Date();

    let differenceInMilliseconds = date2 - date1;
    let differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));

    return differenceInMinutes;
}