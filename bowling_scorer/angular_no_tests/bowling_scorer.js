var app = angular.module('BowlingScorerApp', []);
app.controller('BowlingScorerController', function() {
    this.rolls = Array.apply(null, Array(20)).map(Number.prototype.valueOf,0);
    this.get_score = function() {
        return this.rolls.reduce(function(a, b) {
            return get_roll_score(a) + get_roll_score(b);
        });
    }

    function get_roll_score(roll_value) {
        return parseInt(roll_value)
    }
});
