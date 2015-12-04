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
                        sum += get_frame_score(frame.roll1, frame.roll2);
                    }   
                );
                return sum;
            }
        }
    }

    function get_frame_score(roll1, roll2) {
        if (roll1 === 'X') {
            return 10;
        }
        if (roll2 === '/') {
            return 10;
        }
        return parseInt(roll1) + parseInt(roll2);
    }

    this.game = Game();
});
