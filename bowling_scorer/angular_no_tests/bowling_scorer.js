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
                    function(frame, index, frames) {
                        sum += get_frame_score(frame, index, frames);
                    }   
                );
                return sum;
            }
        }
    }

    function get_frame_score(frame, index, frames) {
        return get_number_of_pins_knocked_down(frame);
    }

    function get_number_of_pins_knocked_down(frame) {
        if (frame.roll1 === 'X') {
            return 10;
        }
        if (frame.roll2 === '/') {
            return 10;
        }
        return parseInt(frame.roll1) + parseInt(frame.roll2);
    }

    this.game = Game();
});
