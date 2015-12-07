var app = angular.module('BowlingScorerApp', []);
app.controller('BowlingScorerController', function() {
    function Frame() {
        return {
            roll1: '0',
            roll2: '0',
            isStrike: function() {
                if (this.roll1 == 'X'){
                    return true;
                }
                return false;
            },
            isSpare: function() {
                if (this.roll2 == '/') {
                    return true;
                }
                return false;
            },
            get_pins_knocked_down_in_roll1: function() {
                if (this.isStrike()) {
                    return 10;
                }
                return parseInt(this.roll1);
            },
            get_number_of_pins_knocked_down: function() {
                if (this.isStrike()) {
                    return 10;
                }
                if (this.isSpare()) {
                    return 10;
                }
                return parseInt(this.roll1) + parseInt(this.roll2);
            }
        }
    }

    function BonusRoll() {
        return {
            value: '0',
            isStrike: function() {
                if (this.value == 'X'){
                    return true;
                }
                return false;
            },
            get_pins_knocked_down: function() {
                if (this.isStrike()) {
                    return 10;
                }
                return parseInt(this.value);
            }
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
            bonusRoll1: BonusRoll(),
            bonusRoll2: BonusRoll(),
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
        score = frame.get_number_of_pins_knocked_down();
        if (frame.isSpare()) {
            score += frames[index+1].get_pins_knocked_down_in_roll1();
        }
        if (frame.isStrike()) {
            score += frames[index+1].get_number_of_pins_knocked_down();
        }
        return score;
    }

    this.game = Game();
});
