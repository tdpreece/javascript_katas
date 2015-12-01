var app = angular.module('BowlingScorerApp', []);
app.controller('BowlingScorerController', function() {
    function Frame() {
        return {
            roll1: '0',
            roll2: '0',
        }
    }

    function initialFrames() {
        var frames = [];
        for (var i=0; i < 10; i +=1) {
            frames[i] = Frame();
        }
        return frames;
    }

    function Game() {
        return {
            frames: initialFrames(),
            getScore: function() {
                var sum = 0;
                this.frames.forEach(
                    function(frame) {
                        sum += get_roll_score(frame.roll1);
                        sum += get_roll_score(frame.roll2);
                    }   
                );
                return sum;
            }
        }
    }

    function get_roll_score(roll_value) {
        if (roll_value === 'X') {
            return 10;
        }
        return parseInt(roll_value);
    }

    this.game = Game();
});
