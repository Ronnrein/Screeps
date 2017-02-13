var Creep = require("creep");
var utils = require("utils");

// Constructor
function CreepHarvester(creep) {
    Creep.call(this, creep);
}

// Static variables
CreepHarvester.role = "harvester";

// Static methods
CreepHarvester.create = function(spawn) {
    Creep.create(this.role, {WORK: 3, CARRY: 1, MOVE: 2}, spawn);
};

// Object methods
CreepHarvester.prototype.Update = function Update() {
    if(this.creep.carry.energy < this.creep.carryCapacity) {
        var source = this.creep.pos.findClosestByPath(FIND_SOURCES);
        if(source && this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(source);
        }
    }
    else {
        var structure = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure instanceof StructureExtension ||
                        structure instanceof StructureSpawn ||
                        structure instanceof StructureTower) &&
                        structure.energy < structure.energyCapacity;
            }
        })[0];
        if(!structure || structure.energy == structure.energyCapacity) {
            this.creep.moveTo(Game.flags.IdleSpot);
        }
        else if(this.creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(structure);
        }
    }
};

// Export
utils.extend(Creep, CreepHarvester);
module.exports = CreepHarvester;