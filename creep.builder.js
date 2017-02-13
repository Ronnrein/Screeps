var Creep = require("creep");
var utils = require("utils");

// Constructor
function CreepBuilder(creep) {
    this.creep = creep;
}

// Static variables
CreepBuilder.role = "builder";

// Static methods
CreepBuilder.create = function(spawn) {
    Creep.create(this.role, {WORK: 3, CARRY: 1, MOVE: 2}, spawn);
};

// Object methods
CreepBuilder.prototype.Update = function Update() {
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
        var site = this.creep.room.find(FIND_CONSTRUCTION_SITES)[0];
        if(site && this.creep.build(site) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(site);
        }
    }
};

// Export
utils.extend(Creep, CreepBuilder);
module.exports = CreepBuilder;