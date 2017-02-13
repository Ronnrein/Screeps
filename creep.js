function Creep(creep) {
    this.creep = creep;
}

Creep.create = function(role, parts, spawn) {
    spawn = spawn === undefined ? "Spawn1" : spawn;
    parts = parts === undefined ? {WORK: 1, MOVE: 1, CARRY: 1} : parts;
    partList = [];
    for(var part in parts) {
        if(typeof amount !== "function") {
            for(var i = 0; i < parts[part]; i++) {
                partList.push(global[part]);
            }
        }
    }
    var name = Game.spawns[spawn].createCreep(partList, undefined, {role: role, gathering: false});
    if(isNaN(name)) {
        console.log("Spawning "+name+" ("+role+") at "+spawn);
    }
};

module.exports = Creep;