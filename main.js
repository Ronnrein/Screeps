var CreepHarvester = require("creep.harvester");
var CreepUpgrader = require("creep.upgrader");
var CreepBuilder = require("creep.builder");
var utils = require("utils");

var creepClasses = [CreepHarvester, CreepUpgrader, CreepBuilder];

module.exports.loop = function() {
    var creeps = [];

    // Clear memory of dead units
    utils.clearMemory();

    // Generate new units
    for(var i = 0; i < creepClasses.length; i++) {
        var c = creepClasses[i];
        var count = _.filter(Game.creeps, (creep) => creep.memory.role == c.role).length;
        if(count < Memory.creepAmount[c.role]) {
            c.create();
        }
    }

    // Create objects for all units
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        for(var i = 0; i < creepClasses.length; i++) {
            var c = creepClasses[i];
            if(creep.memory.role == c.role) {
                creeps.push(new c(creep));
            }
        }
    }

    // Update each unit
    for(var i = 0; i < creeps.length; i++) {
        creeps[i].Update();
    }

};