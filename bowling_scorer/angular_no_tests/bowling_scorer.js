var app = angular.module('BowlingScorerApp', []);
app.directive('bowlingScoreCard', function() {
    controller = function() {
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
                getPinsKnockedDownInRoll1: function() {
                    if (this.isStrike()) {
                        return 10;
                    }
                    return parseInt(this.roll1);
                },
                getPinsKnockedDownInRoll2: function() {
                    if (this.isStrike()) {
                        return 10;
                    }
                    if (this.isSpare()) {
                        return 10 - this.roll1;
                    }
                    return parseInt(this.roll2);
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

        function Game() {
            var numberOfFrames = 10;
            function initialFrames(numberOfFrames) {
                var frames = [];
                for (var i=0; i < numberOfFrames; i +=1) {
                    frames[i] = Frame();
                }
                return frames;
            }
            return {
                frames: initialFrames(numberOfFrames),
                bonusRoll1: BonusRoll(),
                bonusRoll2: BonusRoll(),
                getScore: function() {
                    var sum = 0;
                    for (var i=0; i<this.frames.length; i++) {
                        sum += this.getFrameScore(i);
                    }
                    return sum;
                },
                getFrameScore: function(index) {
                    score = 0;
                    frame = this.frames[index];
                    score = frame.get_number_of_pins_knocked_down();
                    if (frame.isSpare()) {
                        score += this.getPinsKnockedDownInNextRoll(index)
                    }
                    if (frame.isStrike()) {
                        score += this.getPinsKnockedDownInNextTwoRolls(index);
                    }
                    return score;
                },
                getPinsKnockedDownInNextRoll(frameIndex) {
                    pinsKnockedDown = 0;
                    if (this.isFinalFrame(frameIndex)) {
                        pinsKnockedDown  += this.bonusRoll1.get_pins_knocked_down();
                    } else {
                        pinsKnockedDown  += this.frames[frameIndex+1].getPinsKnockedDownInRoll1();
                    }
                    return pinsKnockedDown;
                },
                getPinsKnockedDownInRollAfterNext(frameIndex) {
                    if (this.isFinalFrame(frameIndex)) {
                        pinsKnockedDown = this.bonusRoll2.get_pins_knocked_down();
                    } else if (this.frames[frameIndex+1].isStrike()) {
                        if (this.isPenultimareFrame(frameIndex)) {
                            pinsKnockedDown = this.bonusRoll1.get_pins_knocked_down();
                        } else {
                            pinsKnockedDown = this.frames[frameIndex+2].getPinsKnockedDownInRoll1();
                        }
                    } else {
                        pinsKnockedDown = this.frames[frameIndex+1].getPinsKnockedDownInRoll2();
                    }
                    return pinsKnockedDown;

                },
                getPinsKnockedDownInNextTwoRolls(frameIndex) {
                    pinsKnockedDown = this.getPinsKnockedDownInNextRoll(frameIndex);
                    pinsKnockedDown += this.getPinsKnockedDownInRollAfterNext(frameIndex);
                    return pinsKnockedDown;
                },
                isFinalFrame(frameIndex) {
                    if (frameIndex === numberOfFrames - 1) {
                        return true;
                    }
                    return false;
                },
                isPenultimareFrame(frameIndex) {
                    if (frameIndex === numberOfFrames - 2) {
                        return true;
                    }
                    return false;
                }
            }
        }


        this.game = Game();
    };
    return {
        controller: controller,
        controllerAs: 'bowling_scorer',
        bindToController: true,
        templateUrl: 'bowling_score_sheet.html'
    };
});
