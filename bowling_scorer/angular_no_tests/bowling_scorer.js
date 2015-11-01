var app = angular.module('BowlingScorerApp', []);
app.controller('BowlingScorerController', function() {
    this.rolls = Array.apply(null, Array(2)).map(Number.prototype.valueOf,0);
    this.get_score = function() {
        return parseInt(this.rolls[0]) + parseInt(this.rolls[1]);
    }
});
