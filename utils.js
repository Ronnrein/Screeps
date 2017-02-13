module.exports = {
    extend: function(base, sub) {
        var origProto = sub.prototype;
        sub.prototype = Object.create(base.prototype);
        for (var key in origProto)  {
            sub.prototype[key] = origProto[key];
        }
        Object.defineProperty(sub.prototype, 'constructor', {
            enumerable: false,
            value: sub
        });
    },
    clearMemory: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                console.log(name+" ("+Memory.creeps[name].role+") has died, removing from memory");
                delete Memory.creeps[name];
            }
        }
    }
};