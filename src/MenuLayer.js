var MenuLayer = cc.LayerColor.extend({
    init: function() {
        this._super(new cc.Color(127, 127, 127, 255));
        this.setPosition(new cc.Point(0, 0));
        this.scheduleUpdate();
        this.initComponent();
        this.playSoundBG();
        return true;
    },

    createMenuBG:function(){
        this.bg = new MenuBackGround();
        this.createPlayButton();
        this.addChild(this.bg,0);

    },

    initComponent: function() {
        this.createMenuBG();
        this.createPlayButton();
        this.createHowToButton();
        this.createCreditButton();
    },

    playSoundBG: function() {
        if (!isPlayingSong) {
            cc.audioEngine.playMusic(res.thePassing_mp3, true);
            isPlayingSong = true;
        }
    },

    createPlayButton: function() {
        this.playButItem = new cc.MenuItemImage(
            res.play_but_png,
            res.play2_but_png,
            function() {
                cc.audioEngine.stopMusic(res.lostVilage_mp3);
                isPlayingSong = false;
                cc.audioEngine.playEffect(res.press_mp3);
                cc.director.runScene(new cc.TransitionFade(0.2,new GamePlayScene()));
            }, this);
        this.playButton = new cc.Menu(this.playButItem);
        this.addChild(this.playButton,1);
    },
    createHowToButton: function() {
        this.howToButItem = new cc.MenuItemImage(
            res.howToPlay_but_png,
            res.howtoPlay2_But_png,
            function() {
                cc.audioEngine.playEffect(res.press_mp3);
                cc.director.runScene(new cc.TransitionFade(0.5,new HowToScene()));
            }, this);
        this.howToButton = new cc.Menu(this.howToButItem);
        this.addChild(this.howToButton,1);
        var deltaDistance = -80;
        this.howToButton.setPosition(screenWidth / 2, (screenHeight / 2) + deltaDistance);
    },
    createCreditButton: function() {
        this.creditButItem = new cc.MenuItemImage(
            res.credit_But_png,
            res.credit2_But_png,
            function() {
                cc.audioEngine.playEffect(res.press_mp3);
                cc.director.runScene(new cc.TransitionFade(0.5,new CreditScene()));
            }, this);
        this.creditButton = new cc.Menu(this.creditButItem);
        this.addChild(this.creditButton,1);
        var deltaDistance = -80 * 2;
        this.creditButton.setPosition(screenWidth / 2, (screenHeight / 2) + deltaDistance);
    },
});




var MenuBackGround = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.mainBG_png);
        this.setPosition(screenWidth / 2, screenHeight / 2);
    },
});




var GamePlayScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    },
});


var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    },
});
var isPlayingSong = false;