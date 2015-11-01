var app = angular.module('BowlingScorerApp', []);
app.controller('BowlingScorerController', function() {
    this.rolls = [0, 0];
    this.get_score = function() {
        return parseInt(this.rolls[0]) + parseInt(this.rolls[1]);
    }
});
