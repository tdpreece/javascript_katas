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
        score = 0;
        score = get_number_of_pins_knocked_down(frame);
        if (frame.roll2 === '/') {
            score += get_number_of_pins_knocked_down_in_roll(frames[index+1].roll1);
        }
        return score;
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

    function get_number_of_pins_knocked_down_in_roll(roll) {
        if (roll === 'X') {
            return 10;
        }
        return parseInt(roll);
    }

    this.game = Game();
});
