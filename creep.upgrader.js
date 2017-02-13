var Creep = require("creep");
var utils = require("utils");

// Constructor
function CreepUpgrader(creep) {
    this.creep = creep;
}

// Static variables
CreepUpgrader.role = "upgrader";

// Static methods
CreepUpgrader.create = function(spawn) {
    Creep.create(this.role, {WORK: 3, CARRY: 1, MOVE: 2}, spawn);
};

// Object methods
CreepUpgrader.prototype.Update = function Update() {
    if(!this.creep.memory.gathering && this.creep.carry.energy == 0) {
        this.creep.memory.gathering = true;
    }
    if(this.creep.memory.gathering && this.creep.carry.energy == this.creep.carryCapacity) {
        this.creep.memory.gathering = false;
    }

    if(this.creep.memory.gathering) {
        var source = this.creep.pos.findClosestByPath(FIND_SOURCES);
        if(source && this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(source);
        }
    }
    else{
        if(this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.creep.room.controller);
        }
    }
};

// Export
utils.extend(Creep, CreepUpgrader);
module.exports = CreepUpgrader;