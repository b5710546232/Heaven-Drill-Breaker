var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.hero_png);
        this.vy = 0;
        this.canJump = false;
        this.grounded = false;
        this.isStart = false;
        this.drillType = 'N';
        this.hp = 10;
        this.isRunning = false;
        this.isJummping = true;
        this.isDie = false;
        this.runningAction = this.runAnim();
        this.jumpAction = this.jumpAnim();
        this.runAction(this.jumpAction);
        this.drillDist = 0;
        this.drillDown = false;
        this.isHiting = false;
    },
    update: function(dt) {
        var pos = this.getPosition();
        this.setPosition(new cc.Point(pos.x, pos.y + this.vy));
        if (this.isStart) {
            this.vy += Player.G;
        }
        this.checkStatus();
        this.manangeAnim();
        this.drillDistMovement();
        this.switchDrillType();
    },

    drillDistMovement: function() {
        if (!this.drillDown) {
            this.drillDist += 0.4;
            if (this.drillDist > 4) {
                this.drillDown = true;
            }
        }

        if (this.drillDown) {
            this.drillDist -= 0.4;
            if (this.drillDist < 0) {
                this.drillDown = false;
            }
        }

    },

    playSoundHit: function() {
        if (!this.isHiting) {
            cc.audioEngine.playEffect(res.punch_mp3);
            this.isHiting = true;
        }
    },

    manangeAnim: function() {
        if ( !this.isRunning && this.grounded) {
            this.stopAction(this.jumpAction);
            this.runAction(this.runningAction);
            this.isRunning = true;
            this.isJummping = false
        } else if (this.canJump && !this.grounded) {
            this.isRunning = false;
            if (!this.isJummping) {
                this.stopAction(this.runningAction);
                this.runAction(this.jumpAction);
                this.isJummping = true;
            }
        }
    },
    jumpAnim: function() {
        var animation = new cc.Animation.create();
        animation.addSpriteFrameWithFile(res.hero_run01_png);
        animation.setDelayPerUnit(0.01);
        return cc.RepeatForever.create(cc.Animate.create(animation));
    },
    runAnim: function() {
        var animationRun = new cc.Animation.create();
        animationRun.addSpriteFrameWithFile(res.hero_run01_png);
        animationRun.addSpriteFrameWithFile(res.hero_run02_png);
        animationRun.addSpriteFrameWithFile(res.hero_run03_png);
        animationRun.addSpriteFrameWithFile(res.hero_run04_png);
        animationRun.addSpriteFrameWithFile(res.hero_run05_png);
        animationRun.addSpriteFrameWithFile(res.hero_run06_png);
        animationRun.addSpriteFrameWithFile(res.hero_run07_png);
        animationRun.addSpriteFrameWithFile(res.hero_run08_png);
        animationRun.addSpriteFrameWithFile(res.hero_run09_png);
        animationRun.addSpriteFrameWithFile(res.hero_run10_png);
        animationRun.setDelayPerUnit(0.05);
        // return cc.Animate.create( animationRun );
        return cc.RepeatForever.create(cc.Animate.create(animationRun));

    },
    checkStatus: function() {
        if (this.hp <= 0) {
            this.death();
        }
    },
    switchDrillType: function() {
        if (this.drillType != 'X') {
            if (GameLayer.KEYS[cc.KEY.left]) { //left
                this.drillType = "L";
            } else if (GameLayer.KEYS[cc.KEY.right]) { //right
                this.drillType = "R";
            } else if (GameLayer.KEYS[cc.KEY.up]) { //up
                this.drillType = "U";
            } else if (GameLayer.KEYS[cc.KEY.down]) { //down
                this.drillType = "D";
            } else
                this.drillType = 'N';
        }

    },
    startToPlay: function() {
        this.vy += Player.G;
        return !this.isStart
    },
    jump: function() {
        if (this.grounded) {
            this.canJump = true;
            this.vy = Player.JUMP;
            this.grounded = false;
        } else if (!this.grounded && this.canJump) {
            this.vy = Player.JUMP * Player.JUMP_SECOND_RATE;
            this.canJump = false;
        }

    },
    getPlayerRect: function() {
        var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();
        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect(spriteRect.x + dX,
            spriteRect.y + dY,
            spriteRect.width,
            spriteRect.height);
    },
    getPlayerBodyRect: function() {
        var spriteRect = this.getBoundingBoxToWorld();
        var bodyHeight = 30;
        var bodyWidth = 3;
        return cc.rect(spriteRect.x, spriteRect.y, bodyWidth, bodyHeight);
    },

    getPlayerRectFoot: function() {
        var spriteRect = this.getBoundingBoxToWorld();
        var footHeight = 10;
        var footWidth = 18;
        return cc.rect(spriteRect.x + this.getBoundingBox().width / 2, spriteRect.y, footWidth, footHeight);
    },
    getPlayerRectSideR: function() {
        var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();
        var Height = 32;
        var Width = 10;
        var RectPosX = this.x + (this.x - spriteRect.x) - Width;
        return cc.rect(RectPosX, this.y - Height / 2, Width, Height)
    },
    isOnGround: function() {
        this.vy = 0;
        this.grounded = true;

    },
    isOnAir: function() {
        this.vy += Player.G;
        this.grounded = false;
        this.canJump = false;
    },
    isFall: function() {
        if (this.y < 0) {
            return true;
        }
        return false;

    },
    death: function() {
        if (!this.isDie) {
            this.vy = Player.JUMP * 0.7;
        }
        this.hp = 0;
        this.isDie = true;
        this.grounded = false;
        this.canJump = false;
        return true;
    }
});
Player.HP_MAX = 10;
Player.JUMP = 12;
Player.G = -0.7;
Player.JUMP_SECOND_RATE = 0.9;
Player.STARTING_VELOCITY = 1;