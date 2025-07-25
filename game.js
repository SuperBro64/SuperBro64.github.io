// Setup for the start of the game
function startGame()
{
    gameArea.start(1024, 768, "border: 5px solid black", colors.LightGray, 0, 0, 0, 20); 
    saveProgress.load("saveProgress");
    music = new componentSound("", "BGM"), sfx = new componentSound("", "SFX");

    levelSetup.titleScreen();
}

// Variables for all game objects along with important global variables
var player, walls = [], holes = [], treasure = [], warps = [], switches = [], resizers = [];
var gameStarted = false, gameIsOver = false;
var hud = [], music, sfx;

// Constant containing the HSL color values for all 140+ HTML color names to easily identify them
const colors =
{
    // Red Colors -----------------------------------------------------------------------------------
    IndianRed            : "hsl(  0,  53%,  58%)", LightCoral           : "hsl(  0,  79%,  72%)",
    Salmon               : "hsl(  6,  93%,  71%)", DarkSalmon           : "hsl( 15,  72%,  70%)",
    LightSalmon          : "hsl( 17, 100%,  74%)", Crimson              : "hsl(348,  83%,  47%)",
    Red                  : "hsl(  0, 100%,  50%)", FireBrick            : "hsl(  0,  68%,  42%)",
    DarkRed              : "hsl(  0, 100%,  27%)",
    // Pink Colors ----------------------------------------------------------------------------------
    Pink                 : "hsl(350, 100%,  88%)", LightPink            : "hsl(351, 100%,  86%)",
    HotPink              : "hsl(330, 100%,  71%)", DeepPink             : "hsl(328, 100%,  54%)",
    MediumVioletRed      : "hsl(322,  81%,  43%)", PaleVioletRed        : "hsl(340,  60%,  65%)",
    // Orange Colors --------------------------------------------------------------------------------
    Coral                : "hsl( 16, 100%,  66%)", Tomato               : "hsl(  9, 100%,  64%)",
    OrangeRed            : "hsl( 16, 100%,  50%)", DarkOrange           : "hsl( 33, 100%,  50%)",
    Orange               : "hsl( 39, 100%,  50%)",
    // Yellow Colors --------------------------------------------------------------------------------
    Gold                 : "hsl( 51, 100%,  50%)", Yellow               : "hsl( 60, 100%,  50%)",
    LightYellow          : "hsl( 60, 100%,  94%)", LemonChiffon         : "hsl( 54, 100%,  90%)",
    LightGoldenrodYellow : "hsl( 60,  80%,  90%)", PapayaWhip           : "hsl( 37, 100%,  92%)",
    Moccasin             : "hsl( 38, 100%,  85%)", PeachPuff            : "hsl( 28, 100%,  86%)",
    PaleGoldenrod        : "hsl( 55,  67%,  80%)", Khaki                : "hsl( 54,  77%,  75%)",
    DarkKhaki            : "hsl( 56,  38%,  58%)",
    // Purple Colors --------------------------------------------------------------------------------
    Lavender             : "hsl(240,  67%,  94%)", Thistle              : "hsl(300,  24%,  80%)",
    Plum                 : "hsl(300,  47%,  75%)", Violet               : "hsl(300,  76%,  72%)",
    Orchid               : "hsl(302,  59%,  65%)", Fushsia              : "hsl(300, 100%,  50%)",
    Magenta              : "hsl(300, 100%,  50%)", MediumOrchid         : "hsl(288,  59%,  58%)",
    MediumPurple         : "hsl(260,  60%,  65%)", RebeccaPurple        : "hsl(270,  50%,  40%)",
    BlueViolet           : "hsl(271,  76%,  53%)", DarkViolet           : "hsl(282, 100%,  41%)",
    DarkOrchid           : "hsl(280,  61%,  50%)", DarkMagenta          : "hsl(300, 100%,  27%)",
    Purple               : "hsl(300, 100%,  25%)", Indigo               : "hsl(275, 100%,  25%)",
    SlateBlue            : "hsl(248,  53%,  58%)", DarkSlateBlue        : "hsl(248,  39%,  39%)",
    MediumSlateBlue      : "hsl(249,  80%,  67%)",
    // Green Colors ---------------------------------------------------------------------------------
    GreenYellow          : "hsl( 84, 100%,  59%)", Chartreuse           : "hsl( 90, 100%,  50%)",
    LawnGreen            : "hsl( 90, 100%,  49%)", Lime                 : "hsl(120, 100%,  50%)",
    LimeGreen            : "hsl(120,  61%,  50%)", PaleGreen            : "hsl(120,  93%,  79%)",
    LightGreen           : "hsl(120,  73%,  75%)", MediumSpringGreen    : "hsl(157, 100%,  49%)",
    SpringGreen          : "hsl(150, 100%,  50%)", MediumSeaGreen       : "hsl(147,  50%,  47%)",
    SeaGreen             : "hsl(146,  50%,  36%)", ForestGreen          : "hsl(120,  61%,  34%)",
    Green                : "hsl(120, 100%,  25%)", DarkGreen            : "hsl(120, 100%,  20%)",
    YellowGreen          : "hsl( 80,  61%,  50%)", OliveDrab            : "hsl( 80,  60%,  35%)",
    Olive                : "hsl( 60, 100%,  25%)", DarkOliveGreen       : "hsl( 82,  39%,  30%)",
    MediumAquamarine     : "hsl(160,  51%,  60%)", DarkSeaGreen         : "hsl(115,  27%,  64%)",
    LightSeaGreen        : "hsl(177,  70%,  41%)", DarkCyan             : "hsl(180, 100%,  27%)",
    Teal                 : "hsl(180, 100%,  25%)",
    // Blue Colors ----------------------------------------------------------------------------------
    Aqua                 : "hsl(180, 100%,  50%)", Cyan                 : "hsl(180, 100%,  50%)",
    LightCyan            : "hsl(180, 100%,  94%)", PaleTurquoise        : "hsl(180,  65%,  81%)",
    Aquamarine           : "hsl(160, 100%,  75%)", Turquoise            : "hsl(174,  72%,  56%)",
    MediumTurquoise      : "hsl(178,  60%,  55%)", DarkTurquoise        : "hsl(181, 100%,  41%)",
    CadetBlue            : "hsl(182,  25%,  50%)", SteelBlue            : "hsl(207,  44%,  49%)",
    LightSteelBlue       : "hsl(214,  41%,  78%)", PowderBlue           : "hsl(187,  52%,  80%)",
    LightBlue            : "hsl(195,  53%,  79%)", SkyBlue              : "hsl(197,  71%,  73%)",
    LightSkyBlue         : "hsl(203,  92%,  75%)", DeepSkyBlue          : "hsl(195, 100%,  50%)",
    DodgerBlue           : "hsl(210, 100%,  56%)", CornflowerBlue       : "hsl(219,  79%,  66%)",
    RoyalBlue            : "hsl(225,  73%,  57%)", Blue                 : "hsl(240, 100%,  50%)",
    MediumBlue           : "hsl(240, 100%,  40%)", DarkBlue             : "hsl(240, 100%,  27%)",
    Navy                 : "hsl(240, 100%,  25%)", MidnightBlue         : "hsl(240,  64%,  27%)",
    // Brown Colors ---------------------------------------------------------------------------------
    Cornsilk             : "hsl( 48, 100%,  93%)", BlanchedAlmond       : "hsl( 36, 100%,  90%)",
    Bisque               : "hsl( 33, 100%,  88%)", NavajoWhite          : "hsl( 36, 100%,  84%)",
    Wheat                : "hsl( 39,  77%,  83%)", BurlyWood            : "hsl( 34,  57%,  70%)",
    Tan                  : "hsl( 34,  44%,  69%)", RosyBrown            : "hsl(  0,  25%,  65%)",
    SandyBrown           : "hsl( 28,  87%,  67%)", Goldenrod            : "hsl( 43,  74%,  49%)",
    DarkGoldenrod        : "hsl( 43,  89%,  38%)", Peru                 : "hsl( 30,  59%,  53%)",
    Chocolate            : "hsl( 25,  75%,  47%)", SaddleBrown          : "hsl( 25,  76%,  31%)",
    Sienna               : "hsl( 19,  56%,  40%)", Brown                : "hsl(  0,  59%,  41%)",
    Maroon               : "hsl(  0, 100%,  25%)",
    // White Colors ---------------------------------------------------------------------------------
    White                : "hsl(  0,   0%, 100%)", Snow                 : "hsl(  0, 100%,  99%)",
    HoneyDew             : "hsl(120, 100%,  97%)", MintCream            : "hsl(150, 100%,  98%)",
    Azure                : "hsl(180, 100%,  97%)", AliceBlue            : "hsl(208, 100%,  97%)",
    GhostWhite           : "hsl(240, 100%,  99%)", WhiteSmoke           : "hsl(  0,   0%,  96%)",
    SeaShell             : "hsl( 25, 100%,  97%)", Beige                : "hsl( 60,  56%,  91%)",
    OldLace              : "hsl( 39,  85%,  95%)", FloralWhite          : "hsl( 40, 100%,  97%)",
    Ivory                : "hsl( 60, 100%,  97%)", AntiqueWhite         : "hsl( 34,  78%,  91%)",
    Linen                : "hsl( 30,  67%,  94%)", LavenderBlush        : "hsl(340, 100%,  97%)",
    MistyRose            : "hsl(  6, 100%,  94%)",
    // Gray Colors ----------------------------------------------------------------------------------
    Gainsboro            : "hsl(  0,   0%,  86%)", LightGray            : "hsl(  0,   0%,  83%)",
    Silver               : "hsl(  0,   0%,  75%)", DarkGray             : "hsl(  0,   0%,  66%)",
    Gray                 : "hsl(  0,   0%,  50%)", DimGray              : "hsl(  0,   0%,  41%)",
    LightSlateGray       : "hsl(210,  14%,  53%)", SlateGray            : "hsl(210,  13%,  50%)",
    DarkSlateGray        : "hsl(180,  25%,  25%)", Black                : "hsl(  0,   0%,   0%)",

    // Code for changing a color's shade, originally by Chalarangelo (Angelos Chalaris) on GitHub
    shading: function(color, delta)
    {
        var [hue, saturation, lightness] = color.match(/\d+/g).map(Number);
        var newLightness = Math.max(0, Math.min(100, lightness + Number.parseFloat(delta)));
        var shade = "hsl(" + hue + ", " + saturation + "%, " + newLightness + "%)";

        return shade;
    },

    // Code for causing a color to cycle through the rainbow, based on Chalarangelo's shading code above
    rainbow: function(color, delta)
    {
        var [hue, saturation, lightness] = color.match(/\d+/g).map(Number);
        var newHue = Math.max(0, Math.min(360, hue + Number.parseFloat(delta))) % 360;
        var rainbowChange = "hsl(" + newHue + ", " + saturation + "%, " + lightness + "%)";

        return rainbowChange;
    }
};

// Variable for storing and manipulating the player's game completion progress through the use of web storage
var saveProgress =
{
    completion: [["Level 1", 0], ["Level 2", 0], ["Level 3", 0], ["Level 4", 0], ["Level 5", 0],
                 ["Level 6", 0], ["Level 7", 0], ["Level 8", 0], ["Level 9", 0], ["Level 10", 0],
                 ["Level A", 0], ["Level B", 0], ["Level C", 0], ["Level ?", 0], ["Percentage", 0]],

    save: function(storageName)
    {
        for (i = 0; i < this.completion.length - 1; i++)
        {
            if (this.completion[i][0] == gameArea.currentLevel)
            {
                if (hud[1].treasureCollected == treasure.length) { this.completion[i][1] = 2; }
                else if (this.completion[i][1] != 2) { this.completion[i][1] = 1; } break;
            }
        }

        this.completion[14][1] = 0.00;
        for (i = 0; i < this.completion.length - 2; i++) { this.completion[14][1] += this.completion[i][1]; }
        this.completion[14][1] = Math.min(Math.round((this.completion[14][1] / (13 * 2)) * 100), 100);

        if (this.completion[14][1] == 100 && this.completion[13][1] == 2) { this.completion[14][1] = 101; }

        if (typeof(Storage) !== "undefined") { localStorage.setItem(storageName, this.completion); }
    },

    load: function(storageName)
    {
        if (typeof(Storage) !== "undefined" && localStorage.getItem(storageName) != null)
        {
            var decodedStorage = localStorage.getItem(storageName).split(',');

            for (i = 0, j = 1; i < this.completion.length && j < decodedStorage.length; i++, j += 2)
            {
                this.completion[i][1] = Number(decodedStorage[j]);
            }
        }
    },

    delete: function(storageName)
    {
        for (i = 0; i < this.completion.length; i++) { this.completion[i][1] = 0; }

        if (typeof(Storage) !== "undefined") { localStorage.removeItem(storageName); }
    }
}

// Variable for the playable game area
var gameArea =
{
    canvas: document.createElement("canvas"), currentLevel: "", mirrorMode: false,

    start: function(width, height, style, fillColor, x, y, frameNum, updateSpeed)
    {
        this.canvas.width = width, this.canvas.height = height;
        this.canvas.style = style, this.fillColor = fillColor;
        this.x = x, this.y = y;
        this.frameNum = frameNum, this.updateSpeed = updateSpeed;

        this.context = this.canvas.getContext("2d");

        this.context.fillStyle = this.fillColor;
        this.context.fillRect(this.x, this.y, this.canvas.width, this.canvas.height);

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, this.updateSpeed);
    },

    clear: function()
    {
        this.context.clearRect(this.x, this.y, this.canvas.width, this.canvas.height);
        this.context.fillStyle = this.fillColor;
        this.context.fillRect(this.x, this.y, this.canvas.width, this.canvas.height);

        this.applyMirrorMode(false); if (this.mirrorMode) { this.applyMirrorMode(true); }
    },

    // Applies a diagonal gradient to the canvas background, using the given color and a darker shade of the color
    gradient: function(color)
    {
        var grad = this.context.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        var shade = colors.shading(color, -25);

        grad.addColorStop(0.0, shade); grad.addColorStop(0.5, color); grad.addColorStop(1.0, shade);
        this.fillColor = grad;
    },

    // Turns Mirror Mode on or off
    applyMirrorMode: function(state)
    {
        if (state)
        {
            this.context.translate(this.canvas.width, 0); this.context.scale(-1, 1);
            this.context.drawImage(this.canvas, this.canvas.width * -1, 0);
        }
        else if (!state)
        {
            this.context.resetTransform();
            this.context.drawImage(this.canvas, this.canvas.width, 0);
        }
    }
}

// Variable containing the object setup for every level in the game
var levelSetup =
{
    // Setup for the title screen
    titleScreen: function()
    {
        gameArea.gradient(colors.DarkGray); gameArea.currentLevel = "Title Screen"; gameArea.frameNum = 0;
        gameStarted = false; gameArea.mirrorMode = false;

        player = new componentPlayer(512, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [(new componentTreasure(86, 76, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(938, 76, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(86, 692, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(938, 692, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [];
        switches = [];
        resizers = [];

        hud = [(new componentHud("100px NewSuperMarioFontU", colors.White, colors.Black, 230, 210, "HYPERION'S", 0, "Level")),
               (new componentHud("60px NewSuperMarioFontU", colors.White, colors.Black, 55, 280, "TREASURE-MAXED LABYRINTH", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 300, 755, "©️ 2025 SuperBro64", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 310, 500, "Click on 🚩 to play!", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 220, 550,
                    "Read below for instructions!", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 165, 660, "TOTAL GAME COMPLETION:", 0, "N/A")),
               (new componentHud("70px NewSuperMarioFontU", colors.Red, colors.Black, 705, 660, "000%", 0, "Completion"))];
        music.sound.src = ""; music.stop();

        document.querySelector("#actionButton").innerHTML = "🚩";
        document.querySelector("#pauseButton").innerHTML = "❌";

    },

    // Setup for the menu screen
    menuScreen: function()
    {
        gameArea.gradient(colors.LightGray); gameArea.currentLevel = "Menu Screen"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [];
        warps = [(new componentWarp(120, 100, 30, 30, 0, colors.SeaGreen, 2, colors.Black, "Credits", "N/A")),
                 (new componentWarp(512, 100, 30, 30, 0, colors.SeaGreen, 2, colors.Black, "Main Hub", "N/A")),
                 (new componentWarp(120, 718, 30, 30, 0, colors.RoyalBlue, 2, colors.Black, "Title Screen", "N/A")),
                 (new componentWarp(512, 718, 30, 30, 0, colors.Orange, 2, colors.Black, "Menu Screen", "Mirror")),
                 (new componentWarp(904, 718, 30, 30, 0, colors.Crimson, 2, colors.Black, "Menu Screen", "Deletion"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("60px NewSuperMarioFontU", colors.White, colors.Black, 360, 50, "MAIN MENU", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 400, 160, "Start Game!", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 45, 160, "Credits", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 25, 680, "Quit Game", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 395, 680, "Mirror Mode", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 780, 680, "Erase Game", 0, "N/A")),
               (new componentHud("60px NewSuperMarioFontU", colors.White, colors.Black, 440, 360, "⬉", 0, "N/A")),
               (new componentHud("60px NewSuperMarioFontU", colors.White, colors.Black, 535, 360, "⬈", 0, "N/A")),
               (new componentHud("60px NewSuperMarioFontU", colors.White, colors.Black, 440, 450, "⬋", 0, "N/A")),
               (new componentHud("60px NewSuperMarioFontU", colors.White, colors.Black, 535, 450, "⬊", 0, "N/A"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_Title.mp3"; music.play();
    },

    // Setup for the credits screen
    credits: function()
    {
        gameArea.gradient(colors.DarkSlateBlue); gameArea.currentLevel = "Credits Screen"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 500, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [];
        warps = [(new componentWarp(512, 688, 30, 30, 0, colors.SeaGreen, 2, colors.Black, "Menu Screen", "N/A"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("60px NewSuperMarioFontU", colors.White, colors.Black, 380, 50, "CREDITS", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 470, 750, "Exit", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 50, 120,
                "Game Creator . . . . . . . . . . SuperBro64", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 50, 170,
                "Background Music . . . . . Super Monkey Ball 2", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 50, 220,
                "Sound Effects . . . . . . . . . Super Mario 64", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 50, 270,
                "Font . . . . . . . . . . . . . . . . . . . . New Super Mario Bros. U", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 50, 320,
                "Joystick Code . . . . . . . . . . Bobboteck", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 50, 370,
                "Color Shading Code . . . . Chalarangelo", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 50, 420,
                "Special Thanks . . . . . . . . Bryce Pavlakos", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 30, 620,
                "❤️ Thank you so much for a-playing my game! ❤️", 0, "N/A"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_Credits.mp3"; music.play();
    },

    // Setup for the main hub
    mainHub: function()
    {
        gameArea.gradient(colors.AntiqueWhite); gameArea.currentLevel = "Main Hub"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 604, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [(new componentWall(328, 272, 40, 224, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(328, 232, 368, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(328, 496, 368, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(-1, 384, 329, 30, colors.Crimson, 2, colors.Black, true, "Progression", 2)),
                 (new componentWall(452, -1, 30, 233, colors.Crimson, 2, colors.Black, true, "Progression", 4)),
                 (new componentWall(666, 272, 30, 224, colors.Crimson, 2, colors.Black, true, "Progression", 7)),
                 (new componentWall(696, 496, 329, 30, colors.Crimson, 2, colors.Black, true, "Progression", 10)),
                 (new componentWall(666, 536, 30, 233, colors.Crimson, 2, colors.Black, true, "Progression", 10))];
        holes = [];
        treasure = [];
        warps = [(new componentWarp(512, 688, 30, 30, 0, colors.SeaGreen, 2, colors.Black, "Menu Screen", "N/A")),
                 (new componentWarp(370, 644, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level 1", "Level 1")),
                 (new componentWarp(45, 728, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level 2", "Level 2")),
                 (new componentWarp(150, 504, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level 3", "Level 3")),
                 (new componentWarp(240, 310, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level 4", "Level 4")),
                 (new componentWarp(75, 90, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level 5", "Level 5")),
                 (new componentWarp(390, 170, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level 6", "Level 6")),
                 (new componentWarp(700, 110, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level 7", "Level 7")),
                 (new componentWarp(940, 230, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level 8", "Level 8")),
                 (new componentWarp(830, 430, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level 9", "Level 9")),
                 (new componentWarp(512, 384, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level 10", "Level 10")),
                 (new componentWarp(865, 604, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level A", "Level A")),
                 (new componentWarp(765, 704, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level B", "Level B")),
                 (new componentWarp(965, 704, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level C", "Level C"))];
        if (saveProgress.completion[14][1] >= 100)
        { warps.push(new componentWarp(410, 460, 30, 30, 0, colors.Sienna, 2, colors.Black, "Level ?", "Level ?")); }

        switches = [];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Main Hub", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 510, 35, "Game Completion: ", 0, "N/A")),
               (new componentHud("60px NewSuperMarioFontU", colors.Red, colors.Black, 880, 45, "000%", 0, "Completion")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 470, 750, "Exit", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 360, 637, "1", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 35, 721, "2", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 140, 497, "3", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 230, 303, "4", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 65, 83, "5", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 380, 163, "6", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 690, 103, "7", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 930, 223, "8", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 820, 423, "9", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 494, 377, "10", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 852, 597, "A", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 752, 697, "B", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 952, 697, "C", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 80, 411, "2 Levels", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 456, 40, "4", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 456, 90, "L", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 456, 113, "e", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 456, 136, "v", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 456, 159, "e", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 461, 188, "l", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 456, 211, "s", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 310, "7", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 360, "L", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 383, "e", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 406, "v", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 429, "e", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 675, 458, "l", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 481, "s", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 672, 564, "1", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 672, 592, "0", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 642, "L", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 665, "e", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 688, "v", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 711, "e", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 675, 740, "l", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 670, 763, "s", 0, "N/A")),
               (new componentHud("40px NewSuperMarioFontU", colors.Salmon, colors.Black, 775, 523, "10 Levels", 0, "N/A"))];
        if (saveProgress.completion[14][1] >= 100)
        { hud.push(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 400, 453, "?", 0, "N/A")); }

        if (saveProgress.completion[14][1] == 101) { music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_Clear.mp3"; }
        else { music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_Menu.mp3"; } music.play();
    },

    // Setup for level 1
    level1: function()
    {
        gameArea.gradient(colors.YellowGreen); gameArea.currentLevel = "Level 1"; gameArea.frameNum = 0;

        player = new componentPlayer(110, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [(new componentWall(350, -1, 40, 151, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(215, 150, 175, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(215, 190, 40, 450, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(550, 190, 40, 110, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(550, 500, 40, 269, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(550, 300, 175, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(550, 460, 175, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(685, 340, 40, 120, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(550, 150, 175, 40, colors.Gray, 2, colors.Black, true, "N/A", 0))];
        holes = [(new componentHole(725, 150, 182, 40, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(843, 300, 182, 40, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(725, 460, 182, 40, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(867, 500, 40, 160, colors.Black, 2, colors.Black, false, "N/A", 0))];
        treasure = [(new componentTreasure(110, 220, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(110, 546, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(300, 80, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(234, 700, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(300, 230, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(510, 730, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(400, 520, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(635, 400, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(635, 245, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(635, 545, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(780, 80, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(886, 245, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(886, 400, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(886, 715, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(965, 580, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(730, 620, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level 1", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_World_1.mp3"; music.play();
    },

    // Setup for level 2
    level2: function()
    {
        gameArea.gradient(colors.LightCoral); gameArea.currentLevel = "Level 2"; gameArea.frameNum = 0;

        player = new componentPlayer(964, 710, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [(new componentWall(865, 622, 160, 30, colors.SaddleBrown, 2, colors.Black, true, "Door", 1)),
                 (new componentWall(667, 157, 158, 30, colors.SaddleBrown, 2, colors.Black, true, "Door", 2)),
                 (new componentWall(-1, 157, 159, 30, colors.SaddleBrown, 2, colors.Black, true, "Door", 3)),
                 (new componentWall(168, 352, 30, 145, colors.SaddleBrown, 2, colors.Black, true, "Door", 4)),
                 (new componentWall(-1, 612, 159, 30, colors.SaddleBrown, 2, colors.Black, true, "Door", 5)),
                 (new componentWall(158, 497, 40, 272, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(425, 612, 40, 157, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(465, 612, 360, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(825, 157, 40, 495, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(158, 157, 509, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(-1, 312, 426, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(158, 197, 40, 115, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(425, 312, 40, 205, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(627, 312, 40, 205, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(465, 392, 162, 40, colors.Gray, 2, colors.Black, true, "N/A", 0))];
        holes = [];
        treasure = [(new componentTreasure(700, 710, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(990, 476, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(900, 292, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(990, 76, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(545, 126, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(260, 76, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(80, 246, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(790, 575, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(545, 356, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(390, 386, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(230, 575, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(80, 436, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(80, 710, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [(new componentSwitch(507, 690, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 1)),
                    (new componentSwitch(60, 80, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 2)),
                    (new componentSwitch(292, 690, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 3)),
                    (new componentSwitch(240, 235, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 4)),
                    (new componentSwitch(525, 455, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 5))];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level 2", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_World_2.mp3"; music.play();
    },

    // Setup for level 3
    level3: function()
    {
        gameArea.gradient(colors.DarkTurquoise); gameArea.currentLevel = "Level 3"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 100, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [(new componentWall(412, 172, 200, 30, colors.SaddleBrown, 2, colors.Black, true, "Door", 1)),
                 (new componentWall(412, 322, 200, 30, colors.SaddleBrown, 2, colors.Black, true, "Door", 2)),
                 (new componentWall(412, 472, 200, 30, colors.SaddleBrown, 2, colors.Black, true, "Door", 3)),
                 (new componentWall(412, 622, 200, 30, colors.SaddleBrown, 2, colors.Black, true, "Door", 4)),
                 (new componentWall(372, 172, 40, 597, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(612, 172, 40, 597, colors.Gray, 2, colors.Black, true, "N/A", 0))];
        holes = [(new componentHole(100, 172, 272, 40, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(250, 322, 122, 40, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(250, 472, 122, 40, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(250, 622, 122, 40, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(100, 212, 40, 450, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(652, 172, 132, 40, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(893, 172, 132, 40, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(744, 212, 40, 350, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(893, 212, 40, 350, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(744, 667, 40, 102, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(893, 667, 40, 102, colors.Black, 2, colors.Black, false, "N/A", 0))];
        treasure = [(new componentTreasure(172, 100, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(322, 100, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(702, 100, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(980, 100, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(50, 270, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(50, 420, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(50, 570, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(326, 420, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(326, 715, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(120, 715, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(839, 215, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(839, 365, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(839, 515, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(699, 420, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(699, 715, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(980, 420, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(980, 715, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(839, 715, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(512, 710, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [(new componentSwitch(679, 250, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 1)),
                    (new componentSwitch(306, 550, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 2)),
                    (new componentSwitch(960, 250, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 3)),
                    (new componentSwitch(306, 250, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 4))];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level 3", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_World_3.mp3"; music.play();
    },

    // Setup for level 4
    level4: function()
    {
        gameArea.gradient(colors.DodgerBlue); gameArea.currentLevel = "Level 4"; gameArea.frameNum = 0;

        player = new componentPlayer(100, 670, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [(new componentWall(-1, 450, 201, 30, colors.SkyBlue, 2, colors.Black, true, "Flip", -2)),
                 (new componentWall(200, 300, 30, 150, colors.Orange, 2, colors.Black, false, "Flip", -1)),
                 (new componentWall(-1, 140, 201, 30, colors.Orange, 2, colors.Black, false, "Flip", -1)),
                 (new componentWall(400, -1, 30, 121, colors.SkyBlue, 2, colors.Black, true, "Flip", -2)),
                 (new componentWall(400, 140, 30, 120, colors.Orange, 2, colors.Black, false, "Flip", -1)),
                 (new componentWall(605, -1, 30, 121, colors.Orange, 2, colors.Black, false, "Flip", -1)),
                 (new componentWall(605, 140, 30, 120, colors.SkyBlue, 2, colors.Black, true, "Flip", -2)),
                 (new componentWall(810, -1, 30, 121, colors.SkyBlue, 2, colors.Black, true, "Flip", -2)),
                 (new componentWall(810, 140, 30, 120, colors.Orange, 2, colors.Black, false, "Flip", -1)),
                 (new componentWall(840, 260, 185, 30, colors.SkyBlue, 2, colors.Black, true, "Flip", -2)),
                 (new componentWall(410, 650, 30, 119, colors.SkyBlue, 2, colors.Black, true, "Flip", -2)),
                 (new componentWall(914, 650, 30, 119, colors.Orange, 2, colors.Black, false, "Flip", -1)),
                 (new componentWall(200, 450, 40, 319, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(240, 450, 160, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(400, 300, 40, 350, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(240, 260, 600, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(200, 140, 40, 160, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(400, 120, 625, 20, colors.Gray, 2, colors.Black, true, "N/A", 0))];
        holes = [(new componentHole(670, 400, 120, 75, colors.SkyBlue, 2, colors.Black, true, "Flip", -2)),
                 (new componentHole(550, 575, 120, 75, colors.SkyBlue, 2, colors.Black, true, "Flip", -2)),
                 (new componentHole(792, 575, 120, 75, colors.Black, 2, colors.Orange, false, "Flip", -1)),
                 (new componentHole(440, 400, 228, 75, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(792, 400, 233, 75, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(440, 575, 108, 75, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(672, 575, 118, 75, colors.Black, 2, colors.Black, false, "N/A", 0)),
                 (new componentHole(914, 575, 111, 75, colors.Black, 2, colors.Black, false, "N/A", 0))];
        treasure = [(new componentTreasure(30, 738, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(100, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(320, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(30, 76, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(520, 76, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(725, 76, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(520, 184, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(725, 184, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(994, 76, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(934, 350, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(472, 522, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(994, 522, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(472, 738, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(994, 738, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(320, 670, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(320, 540, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [(new componentSwitch(80, 520, 40, 40, colors.White, 2, colors.Black, "Flip", "OFF", 0)),
                    (new componentSwitch(80, 210, 40, 40, colors.White, 2, colors.Black, "Flip", "OFF", 0)),
                    (new componentSwitch(300, 110, 40, 40, colors.White, 2, colors.Black, "Flip", "OFF", 0)),
                    (new componentSwitch(500, 110, 40, 40, colors.White, 2, colors.Black, "Flip", "OFF", 0)),
                    (new componentSwitch(705, 110, 40, 40, colors.White, 2, colors.Black, "Flip", "OFF", 0)),
                    (new componentSwitch(914, 180, 40, 40, colors.White, 2, colors.Black, "Flip", "OFF", 0)),
                    (new componentSwitch(470, 330, 40, 40, colors.White, 2, colors.Black, "Flip", "OFF", 0)),
                    (new componentSwitch(710, 502, 40, 40, colors.White, 2, colors.Black, "Flip", "OFF", 0))];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level 4", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_World_4.mp3"; music.play();
    },

    // Setup for level 5
    level5: function()
    {
        gameArea.gradient(colors.HotPink); gameArea.currentLevel = "Level 5"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [(new componentTreasure(256, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(256, 576, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 576, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(512, 100, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level 5", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_World_5.mp3"; music.play();
    },

    // Setup for level 6
    level6: function()
    {
        gameArea.gradient(colors.Tan); gameArea.currentLevel = "Level 6"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [(new componentTreasure(256, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(256, 576, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 576, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(512, 100, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level 6", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_World_6.mp3"; music.play();
    },

    // Setup for level 7
    level7: function()
    {
        gameArea.gradient(colors.MediumPurple); gameArea.currentLevel = "Level 7"; gameArea.frameNum = 0;

        player = new componentPlayer(984, 75, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [(new componentWall(502, 629, 30, 140, colors.SaddleBrown, 2, colors.Black, true, "Door", 1)),
                 (new componentWall(332, 160, 160, 30, colors.SaddleBrown, 2, colors.Black, true, "Door", 2)),
                 (new componentWall(199, 309, 93, 30, colors.SaddleBrown, 2, colors.Black, true, "Door", 3)),
                 (new componentWall(159, 599, 173, 30, colors.Tomato, 2, colors.Black, true, "Cracked", 0)),
                 (new componentWall(-1, 459, 120, 30, colors.Tomato, 2, colors.Black, true, "Cracked", 0)),
                 (new componentWall(372, 459, 120, 30, colors.Tomato, 2, colors.Black, true, "Cracked", 0)),
                 (new componentWall(-1, 160, 160, 30, colors.Tomato, 2, colors.Black, true, "Cracked", 0)),
                 (new componentWall(492, 59, 40, 570, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(748, -1, 40, 740, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(532, 59, 100, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(592, -1, 40, 60, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(788, 180, 140, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(958, 180, 67, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(908, 200, 20, 150, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(958, 200, 20, 304, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(788, 350, 140, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(815, 394, 20, 110, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(835, 394, 123, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(835, 484, 123, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(815, 529, 20, 150, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(835, 529, 123, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(958, 529, 20, 150, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(815, 679, 210, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(788, 719, 210, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(532, 180, 185, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(697, 200, 20, 105, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(532, 305, 185, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(560, 350, 188, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(532, 395, 185, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(557, 440, 115, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(557, 460, 20, 100, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(557, 560, 160, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(697, 415, 20, 145, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(532, 609, 185, 20, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(697, 629, 20, 110, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(-1, 589, 160, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(332, 589, 160, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(119, 449, 253, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(159, 309, 40, 140, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(292, 309, 40, 140, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(50, 309, 109, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(332, 309, 160, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(159, -1, 40, 191, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(292, -1, 40, 191, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(50, 140, 109, 20, colors.Gray, 2, colors.Black, true, "N/A", 0))];
        holes = [];
        treasure = [(new componentTreasure(1002, 225, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(1002, 655, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(610, 485, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(665, 485, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(610, 535, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(665, 535, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(815, 155, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(670, 655, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(690, 100, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(245, 700, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(60, 540, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(430, 540, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(360, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(465, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(130, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(412, 250, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(245, 160, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(245, 410, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [(new componentSwitch(670, 25, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 1)),
                    (new componentSwitch(90, 65, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 2)),
                    (new componentSwitch(377, 60, 70, 70, colors.White, 2, colors.Black, "Door", "OFF", 3))];
        resizers = [(new componentResizer(834, 75, 15, 0, 2, colors.SkyBlue, 2, colors.Black, "Tiny")),
                    (new componentResizer(575, 140, 15, 0, 2, colors.SkyBlue, 2, colors.Black, "Tiny")),
                    (new componentResizer(50, 700, 15, 0, 2, colors.Orange, 2, colors.Black, "Huge")),
                    (new componentResizer(245, 55, 15, 0, 2, colors.Orange, 2, colors.Black, "Huge"))];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level 7", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_World_7.mp3"; music.play();
    },

    // Setup for level 8
    level8: function()
    {
        gameArea.gradient(colors.DarkOrange); gameArea.currentLevel = "Level 8"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [(new componentTreasure(256, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(256, 576, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 576, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(512, 100, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level 8", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_World_8.mp3"; music.play();
    },

    // Setup for level 9
    level9: function()
    {
        gameArea.gradient(colors.DimGray); gameArea.currentLevel = "Level 9"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [(new componentTreasure(256, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(256, 576, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 576, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(512, 100, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level 9", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_World_9.mp3";  music.play();
    },

    // Setup for level 10
    level10: function()
    {
        gameArea.gradient(colors.SlateGray); gameArea.currentLevel = "Level 10"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [(new componentTreasure(256, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(256, 576, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 576, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(512, 100, 30, 30, 0, colors.Cyan, 2, colors.Black, "Credits", "Goal"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level 10", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_World_10.mp3"; music.play();
    },

    // Setup for level A
    levelA: function()
    {
        gameArea.gradient(colors.Khaki); gameArea.currentLevel = "Level A"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 504, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [(new componentWall(462, 300, 100, 10, colors.SaddleBrown, 2, colors.Black, true, "Door", 1)),
                 (new componentWall(462, 310, 100, 10, colors.SaddleBrown, 2, colors.Black, true, "Door", 2)),
                 (new componentWall(462, 320, 100, 10, colors.SaddleBrown, 2, colors.Black, true, "Door", 3)),
                 (new componentWall(462, 330, 100, 10, colors.SaddleBrown, 2, colors.Black, true, "Door", 4)),
                 (new componentWall(422, 420, 180, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(422, 300, 40, 120, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(562, 300, 40, 120, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(282, 546, 460, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(492, 667, 40, 102, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(342, 586, 40, 100, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(642, 586, 40, 100, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(112, 646, 120, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(792, 646, 120, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(112, 546, 40, 100, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(872, 546, 40, 100, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(-1, 420, 293, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(732, 420, 293, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(282, 300, 140, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(602, 300, 140, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(112, 146, 40, 194, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(872, 146, 40, 154, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(152, 146, 300, 40, colors.Gray, 2, colors.Black, true, "N/A", 0)),
                 (new componentWall(572, 146, 300, 40, colors.Gray, 2, colors.Black, true, "N/A", 0))];
        holes = [];
        treasure = [(new componentTreasure(215, 90, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(355, 90, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(512, 90, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(669, 90, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(809, 90, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(50, 240, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(215, 240, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(355, 240, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(512, 240, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(669, 240, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(809, 240, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(974, 240, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(50, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(215, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(355, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(669, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(809, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(974, 375, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(50, 504, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(215, 504, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(355, 504, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(669, 504, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(809, 504, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(974, 504, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(50, 604, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(215, 604, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(440, 624, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(584, 624, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(809, 604, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(974, 604, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(165, 725, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(285, 725, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(440, 725, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(584, 725, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(739, 725, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(859, 725, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(512, 380, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [(new componentSwitch(30, 70, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 1)),
                    (new componentSwitch(954, 70, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 2)),
                    (new componentSwitch(30, 698, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 3)),
                    (new componentSwitch(954, 698, 40, 40, colors.White, 2, colors.Black, "Door", "OFF", 4))];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level A", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_Bonus.mp3"; music.play();
    },

    // Setup for level B
    levelB: function()
    {
        gameArea.gradient(colors.Orchid); gameArea.currentLevel = "Level B"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [(new componentTreasure(256, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(256, 576, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 576, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(512, 100, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level B", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_Target.mp3"; music.play();
    },

    // Setup for level C
    levelC: function()
    {
        gameArea.gradient(colors.MediumSeaGreen); gameArea.currentLevel = "Level C"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [(new componentTreasure(256, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(256, 576, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 576, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(512, 100, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level C", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_Soccer.mp3"; music.play();
    },

    // Setup for level ?
    level$: function()
    {
        gameArea.gradient(colors.Brown); gameArea.currentLevel = "Level ?"; gameArea.frameNum = 0;

        player = new componentPlayer(512, 384, 20, 0, 2, colors.Red, 2, colors.Black);
        walls = [];
        holes = [];
        treasure = [(new componentTreasure(256, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(256, 576, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 192, 10, 0, 2, colors.Gold, 2, colors.Black)),
                    (new componentTreasure(768, 576, 10, 0, 2, colors.Gold, 2, colors.Black))];
        warps = [(new componentWarp(512, 100, 30, 30, 0, colors.Cyan, 2, colors.Black, "Main Hub", "Goal"))];
        switches = [];
        resizers = [];

        hud = [(new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 10, 35, "Level ?", 0, "Level")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 430, 35, "🪙", 0, "Treasure")),
               (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 870, 35, "⏱️", 200, "Timer"))];
        music.sound.src = "resources/sounds/Super_Monkey_Ball_2_-_Billiards.mp3"; music.play();
    }
}

// Code for the player
function componentPlayer(x, y, radius, startAngle, endAngle, fillColor, lineWidth, lineColor)
{
    this.speedX = 0, this.speedY = 0;
    this.x = x, this.y = y, this.radius = radius;
    this.startAngle = startAngle, this.endAngle = endAngle;
    this.fillColor = fillColor, this.lineWidth = lineWidth, this.lineColor = lineColor;
    this.action = false, this.falling = false;
    this.originalX = x, this.originalY = y, this.originalRadius = radius;

    this.update = function()
    {
        this.context = gameArea.context;

        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle * Math.PI);
        this.context.fillStyle = this.fillColor;
        this.context.fill();

        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.lineColor;
        this.context.stroke();

        this.action = false;

        if (this.falling)
        {
            this.radius -= 0.15;

            if (this.radius <= 0)
            {
                this.falling = false;
                this.x = this.originalX; this.y = this.originalY; this.radius = this.originalRadius;

                document.querySelector("#actionButton").innerHTML = "🅰️";
                document.querySelector("#pauseButton").innerHTML = "⏸️";
            }
        }
    }

    // Calculates each frame the new x and y positions of the player as they move around
    this.newPosition = function()
    {
        if (!gameStarted || this.falling) { return; }

        var stickX = joystick.getX(), stickY = joystick.getY();
        var stickAngle = Math.atan2(stickY, stickX) * 180 / Math.PI;

        if (stickAngle < 0) { stickAngle += 360; }

        if (stickX < 25 && stickX > -25 && stickY < 25 && stickY > -25) { this.stopMoving(); }
        else
        {
            if ((stickAngle >= 0 && stickAngle < 11.25) || (stickAngle >= 348.75 && stickAngle < 360)) { this.moveRight(); }
            else if (stickAngle >= 11.25 && stickAngle < 33.75) { this.moveRightDownRight(); }
            else if (stickAngle >= 33.75 && stickAngle < 56.25) { this.moveDownRight(); }
            else if (stickAngle >= 56.25 && stickAngle < 78.75) { this.moveDownDownRight(); }
            else if (stickAngle >= 78.75 && stickAngle < 101.25) { this.moveDown(); }
            else if (stickAngle >= 101.25 && stickAngle < 123.75) { this.moveDownDownLeft(); }
            else if (stickAngle >= 123.75 && stickAngle < 146.25) { this.moveDownLeft(); }
            else if (stickAngle >= 146.25 && stickAngle < 168.75) { this.moveLeftDownLeft(); }
            else if (stickAngle >= 168.75 && stickAngle < 191.25) { this.moveLeft(); }
            else if (stickAngle >= 191.25 && stickAngle < 213.75) { this.moveLeftUpLeft(); }
            else if (stickAngle >= 213.75 && stickAngle < 236.25) { this.moveUpLeft(); }
            else if (stickAngle >= 236.25 && stickAngle < 258.75) { this.moveUpUpLeft(); }
            else if (stickAngle >= 258.75 && stickAngle < 281.25) { this.moveUp(); }
            else if (stickAngle >= 281.25 && stickAngle < 303.75) { this.moveUpUpRight(); }
            else if (stickAngle >= 303.75 && stickAngle < 326.25) { this.moveUpRight(); }
            else if (stickAngle >= 326.25 && stickAngle < 348.75) { this.moveRightUpRight(); }

            if (stickX < 75 && stickX > -75) { this.speedX /= 2; }
            if (stickY < 75 && stickY > -75) { this.speedY /= 2; }

            if (gameArea.mirrorMode) { this.speedX *= -1; }
        }

        this.x += this.speedX; this.y += this.speedY;

        this.x = Math.max(0 + this.radius, Math.min(this.x, gameArea.canvas.width - this.radius));
        this.y = Math.max(0 + this.radius, Math.min(this.y, gameArea.canvas.height - this.radius));
    }

    // The speed values associated with all 16 movement directions as well as no direction
    this.moveRight = function()          { this.speedX = 4,      this.speedY = 0; }
    this.moveRightDownRight = function() { this.speedX = 3.464,  this.speedY = -2; }
    this.moveDownRight = function()      { this.speedX = 2.828,  this.speedY = -2.828; }
    this.moveDownDownRight = function()  { this.speedX = 2,      this.speedY = -3.464; }
    this.moveDown = function()           { this.speedX = 0,      this.speedY = -4; }
    this.moveDownDownLeft = function()   { this.speedX = -2,     this.speedY = -3.464; }
    this.moveDownLeft = function()       { this.speedX = -2.828, this.speedY = -2.828; }
    this.moveLeftDownLeft = function()   { this.speedX = -3.464, this.speedY = -2; }
    this.moveLeft = function()           { this.speedX = -4,     this.speedY = 0; }
    this.moveLeftUpLeft = function()     { this.speedX = -3.464, this.speedY = 2; }
    this.moveUpLeft = function()         { this.speedX = -2.828, this.speedY = 2.828; }
    this.moveUpUpLeft = function()       { this.speedX = -2,     this.speedY = 3.464; }
    this.moveUp = function()             { this.speedX = 0,      this.speedY = 4; }
    this.moveUpUpRight = function()      { this.speedX = 2,      this.speedY = 3.464; }
    this.moveUpRight = function()        { this.speedX = 2.828,  this.speedY = 2.828; }
    this.moveRightUpRight = function()   { this.speedX = 3.464,  this.speedY = 2; }
    this.stopMoving = function()         { this.speedX = 0,      this.speedY = 0; }

    // Check for collision with any object
    this.objectCollision = function(object)
    {
        var left = this.x - this.radius, right = this.x + this.radius;
        var top = this.y - this.radius, bottom = this.y + this.radius;

        var objLeft, objRight, objTop, objBottom;

        if (object.radius > 0)
        {
            objLeft = object.x - object.radius, objRight = object.x + object.radius;
            objTop = object.y - object.radius, objBottom = object.y + object.radius;
        }
        else
        {
            objLeft = object.x, objRight = object.x + object.width;
            objTop = object.y, objBottom = object.y + object.height;
        }

        return ((bottom > objTop) && (top < objBottom) && (right > objLeft) && (left < objRight));
    }

    // Handle collision with solid walls, pushing the player away from them
    this.handleWallCollision = function(wall)
    {
        if (!wall.tangibility) { return; }
        
        var overlapX = Math.min(this.x + this.radius, wall.x + wall.width) - Math.max(this.x - this.radius, wall.x);
        var overlapY = Math.min(this.y + this.radius, wall.y + wall.height) - Math.max(this.y - this.radius, wall.y);

        if (wall.type == "Cracked" && this.radius >= 35) { wall.x = -1000; wall.y = -1000; wall.sfx.play(); }
        else
        {
            if (overlapX < overlapY)
            {
                if (this.x < wall.x) { this.x -= overlapX; }
                else { this.x += overlapX; }
            }
            else
            {
                if (this.y < wall.y) { this.y -= overlapY; }
                else { this.y += overlapY; }
            }
        }
    }

    // Handle the player falling into a bottomless hole
    this.handleHoleFalling = function(hole)
    {
        if (hole.walkability || this.falling) { return; }

        this.radius = 20;

        var overlapX = Math.min(this.x + this.radius, hole.x + hole.width) - Math.max(this.x - this.radius, hole.x);
        var overlapY = Math.min(this.y + this.radius, hole.y + hole.height) - Math.max(this.y - this.radius, hole.y);

        if (this.x < hole.x) { this.x -= (overlapX - (this.radius * 2)); } else { this.x += (overlapX - (this.radius * 2)); }
        if (this.y < hole.y) { this.y -= (overlapY - (this.radius * 2)); } else { this.y += (overlapY - (this.radius * 2)); }

        this.falling = true; hole.sfx.play();

        document.querySelector("#actionButton").innerHTML = "❌";
        document.querySelector("#pauseButton").innerHTML = "❌";
    }
}

// Code for the walls
function componentWall(x, y, width, height, fillColor, lineWidth, lineColor, tangibility, type, value)
{
    this.x = x, this.y = y, this.width = width, this.height = height;
    this.fillColor = fillColor, this.lineWidth = lineWidth, this.lineColor = lineColor;
    this.tangibility = tangibility, this.type = type, this.value = value;
    this.sfx = new componentSound("resources/sounds/Super_Mario_64_-_Break_Box.wav", "SFX");

    if (this.type == "Progression" && this.value > 0)
    {
        var levelsCompleted = 0;

        for (i = 0; i < saveProgress.completion.length - 1; i++) { if (saveProgress.completion[i][1] >= 1) { levelsCompleted++; } }

        if (levelsCompleted >= this.value) { this.tangibility = false; }
    }

    this.update = function()
    {
        this.context = gameArea.context;

        if (!this.tangibility) { this.context.globalAlpha = 0.5; }

        this.context.fillStyle = this.fillColor;
        this.context.fillRect(this.x, this.y, this.width, this.height);

        this.context.globalAlpha = 1.0;

        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.lineColor;
        this.context.strokeRect(this.x, this.y, this.width, this.height);

        if (this.type == "Cracked")
        {
            this.context.beginPath();
            this.context.moveTo(this.x, this.y); this.context.lineTo(this.x + this.width, this.y + this.height);
            this.context.stroke();

            this.context.beginPath();
            this.context.moveTo(this.x, this.y + this.height); this.context.lineTo(this.x + this.width, this.y);
            this.context.stroke();
        }
    }
}

// Code for the bottomless holes
function componentHole(x, y, width, height, fillColor, lineWidth, lineColor, walkability, type, value)
{
    this.x = x, this.y = y, this.width = width, this.height = height;
    this.fillColor = fillColor, this.lineWidth = lineWidth, this.lineColor = lineColor;
    this.walkability = walkability, this.type = type, this.value = value;
    this.sfx = new componentSound("resources/sounds/Super_Mario_64_-_Falling.mp3", "SFX");

    this.update = function()
    {
        this.context = gameArea.context;

        if (this.type == "Flip")
        {
            if (this.walkability)
            {
                if (this.value == -1) { this.fillColor = colors.Orange; }
                else if (this.value == -2) { this.fillColor = colors.SkyBlue; }

                this.lineColor = colors.Black;
            }
            else if (!this.walkability)
            {
                if (this.value == -1) { this.lineColor = colors.Orange; }
                else if (this.value == -2) { this.lineColor = colors.SkyBlue; }

                this.fillColor = colors.Black;
            }
        }

        this.context.fillStyle = this.fillColor;
        this.context.fillRect(this.x, this.y, this.width, this.height);

        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.lineColor;
        this.context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

// Code for the treasure
function componentTreasure(x, y, radius, startAngle, endAngle, fillColor, lineWidth, lineColor)
{
    this.x = x, this.y = y, this.radius = radius;
    this.startAngle = startAngle, this.endAngle = endAngle;
    this.fillColor = fillColor, this.lineWidth = lineWidth, this.lineColor = lineColor;
    this.animationCycle = 0;
    this.sfx = new componentSound("resources/sounds/Super_Mario_64_-_Coin.wav", "SFX");

    this.update = function()
    {
        this.context = gameArea.context;

        this.animationCycle++;
        if (this.animationCycle == 20)
        {
            this.animationCycle = 0;

            if (this.fillColor == colors.Gold) { this.fillColor = colors.Yellow; }
            else if (this.fillColor == colors.Yellow) { this.fillColor = colors.Gold; }
        }

        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle * Math.PI);
        this.context.fillStyle = this.fillColor;
        this.context.fill();

        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.lineColor;
        this.context.stroke();
    }

    this.disappear = function() { this.x = -1000; this.y = -1000; this.sfx.play(); }
}

// Code for the warps
function componentWarp(x, y, width, height, angle, fillColor, lineWidth, lineColor, destination, type)
{
    this.x = x, this.y = y, this.width = width, this.height = height, this.angle = angle;
    this.fillColor = fillColor, this.lineWidth = lineWidth, this.lineColor = lineColor;
    this.rotationSpeed = 180, this.destination = destination, this.type = type;
    this.sfx = new componentSound("resources/sounds/Super_Mario_64_-_Enter_Course.wav", "SFX");

    for (i = 0; i < saveProgress.completion.length - 1; i++)
    {
        if (saveProgress.completion[i][0] == this.type)
        {
            if (saveProgress.completion[i][1] == 0) { this.fillColor = colors.Sienna; }
            else if (saveProgress.completion[i][1] == 1) { this.fillColor = colors.Silver; }
            else if (saveProgress.completion[i][1] == 2) { this.fillColor = colors.Gold; }
            break;
        }
    }

    this.update = function()
    {
        this.context = gameArea.context;
        this.context.save();

        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);

        this.context.fillStyle = this.fillColor;
        this.context.fillRect(this.width / -2, this.height / -2, this.width, this.height);

        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.lineColor;
        this.context.strokeRect(this.width / -2, this.height / -2, this.width, this.height);

        this.context.restore();

        this.angle += (1 * Math.PI / this.rotationSpeed);
    }

    this.toDestination = function()
    {
        music.stop(); this.sfx.play();

        if (this.type == "Goal") { saveProgress.save("saveProgress"); }
        else if (this.type == "Deletion") { saveProgress.delete("saveProgress"); }
        else if (this.type == "Mirror")
        {
            if (!gameArea.mirrorMode) { gameArea.mirrorMode = true; }
            else if (gameArea.mirrorMode) { gameArea.mirrorMode = false; }
        }

        switch (this.destination)
        {
            case "Title Screen": levelSetup.titleScreen(); break;
            case "Menu Screen":  levelSetup.menuScreen(); break;
            case "Credits":      levelSetup.credits(); break;
            case "Main Hub":     levelSetup.mainHub(); break;
            case "Level 1":      levelSetup.level1(); break;
            case "Level 2":      levelSetup.level2(); break;
            case "Level 3":      levelSetup.level3(); break;
            case "Level 4":      levelSetup.level4(); break;
            case "Level 5":      levelSetup.level5(); break;
            case "Level 6":      levelSetup.level6(); break;
            case "Level 7":      levelSetup.level7(); break;
            case "Level 8":      levelSetup.level8(); break;
            case "Level 9":      levelSetup.level9(); break;
            case "Level 10":     levelSetup.level10(); break;
            case "Level A":      levelSetup.levelA(); break;
            case "Level B":      levelSetup.levelB(); break;
            case "Level C":      levelSetup.levelC(); break;
            case "Level ?":      levelSetup.level$(); break;
            default:             levelSetup.titleScreen(); break;
        }
    }
}

// Code for the switches
function componentSwitch(x, y, width, height, fillColor, lineWidth, lineColor, type, state, value)
{
    this.x = x, this.y = y, this.width = width, this.height = height;
    this.fillColor = fillColor, this.lineWidth = lineWidth, this.lineColor = lineColor;
    this.type = type, this.state = state, this.value = value; this.activatable = false;
    this.sfx = new componentSound("resources/sounds/Super_Mario_64_-_Camera_Click.wav", "SFX");

    this.update = function()
    {
        this.context = gameArea.context;

        if (this.type == "Door")
        {
            if (this.state == "OFF")
            {
                if (this.activatable) { this.fillColor = colors.shading(colors.Crimson, 10); }
                else if (!this.activatable) { this.fillColor = colors.Crimson; }
            }
            else if (this.state == "ON")
            {
                if (this.activatable) { this.fillColor = colors.shading(colors.ForestGreen, 10); }
                else if (!this.activatable) { this.fillColor = colors.ForestGreen; }
            }
        }
        else if (this.type == "Flip")
        {
            if (this.state == "OFF")
            {
                if (this.activatable) { this.fillColor = colors.shading(colors.Orange, 10); }
                else if (!this.activatable) { this.fillColor = colors.Orange; }
            }
            else if (this.state == "ON")
            {
                if (this.activatable) { this.fillColor = colors.shading(colors.SkyBlue, 10); }
                else if (!this.activatable) { this.fillColor = colors.SkyBlue; }
            }
        }

        this.context.fillStyle = this.fillColor;
        this.context.fillRect(this.x, this.y, this.width, this.height);

        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.lineColor;
        this.context.strokeRect(this.x, this.y, this.width, this.height);
    }

    this.changeState = function()
    {
        if (!this.sfx.sound.paused || !this.activatable) { return; }
        
        this.sfx.play();

        if (this.type == "Door")
        {
            for (i = 0; i < walls.length; i++)
            {
                if (walls[i].type == "Door" && walls[i].value == this.value)
                {
                    if (this.state == "OFF") { this.state = "ON"; walls[i].tangibility = false; }
                    else if (this.state == "ON") { this.state = "OFF"; walls[i].tangibility = true; }
                    break;
                }
            }
        }
        else if (this.type == "Flip")
        {
            for (i = 0; i < walls.length; i++)
            {
                if (walls[i].type == "Flip" && walls[i].value < 0)
                {
                    if (this.state == "OFF")
                    {
                        if (walls[i].value == -1) { walls[i].tangibility = true; }
                        else if (walls[i].value == -2) { walls[i].tangibility = false; }
                    }
                    else if (this.state == "ON")
                    {
                        if (walls[i].value == -1) { walls[i].tangibility = false; }
                        else if (walls[i].value == -2) { walls[i].tangibility = true; }
                    }
                }
            }

            for (i = 0; i < holes.length; i++)
            {
                if (holes[i].type == "Flip" && holes[i].value < 0)
                {
                    if (this.state == "OFF")
                    {
                        if (holes[i].value == -1) { holes[i].walkability = true; }
                        else if (holes[i].value == -2) { holes[i].walkability = false; }
                    }
                    else if (this.state == "ON")
                    {
                        if (holes[i].value == -1) { holes[i].walkability = false; }
                        else if (holes[i].value == -2) { holes[i].walkability = true; }
                    }
                }
            }

            for (i = 0; i < switches.length; i++)
            {
                if (switches[i].type == "Flip" && switches[i].state == "OFF") { switches[i].state = "ON"; }
                else if (switches[i].type == "Flip" && switches[i].state == "ON") { switches[i].state = "OFF"; }
            }
        }
    }

    this.enoughPlayerWeightToActivate = function()
    {
        if ((this.width >= 40 && this.height >= 40) && player.radius < 20) { this.activatable = false; }
        else if ((this.width >= 70 && this.height >= 70) && player.radius < 35) { this.activatable = false; }
        else { this.activatable = true; }
    }
}

// Code for the resizers
function componentResizer(x, y, radius, startAngle, endAngle, fillColor, lineWidth, lineColor, type)
{
    this.x = x, this.y = y, this.radius = radius;
    this.startAngle = startAngle, this.endAngle = endAngle;
    this.fillColor = fillColor, this.lineWidth = lineWidth, this.lineColor = lineColor;
    this.type = type, this.activatable = false;
    this.sfx1 = new componentSound("resources/sounds/Super_Mario_64_-_Pipe_Enter.wav", "SFX");
    this.sfx2 = new componentSound("resources/sounds/Super_Mario_64_-_Pipe_Exit.wav", "SFX");

    this.update = function()
    {
        this.context = gameArea.context;
        
        if (this.type == "Tiny")
        {
            if (this.activatable) { if (this.radius >= 15) { this.radius -= 0.5; } else { this.radius = 30; } }
            else (this.radius = 15);
        }
        else if (this.type == "Huge")
        {
            if (this.activatable) { if (this.radius <= 30) { this.radius += 0.5; } else { this.radius = 15; }; }
            else (this.radius = 15);
        }

        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle * Math.PI);
        this.context.fillStyle = this.fillColor;
        this.context.fill();

        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = this.lineColor;
        this.context.stroke();
    }

    this.resizePlayer = function()
    {
        if (!this.sfx1.sound.paused || !this.sfx2.sound.paused) { return; }

        if (this.type == "Tiny")
        {
            if (player.radius >= 20) { player.radius = 7.5; this.sfx1.play(); }
            else { player.radius = 20; this.sfx2.play(); }
        }
        else if (this.type == "Huge")
        {
            if (player.radius <= 20) { player.radius = 35; this.sfx2.play(); }
            else { player.radius = 20; this.sfx1.play(); }
        }
    }
}

// Code for the heads-up display
function componentHud(font, fillColor, outlineColor, x, y, text, startingTime, type)
{
    this.treasureCollected = 0, this.startingTime = startingTime; this.type = type;
    this.timeRemaining = (this.startingTime - (gameArea.frameNum / 50)).toFixed(1);

    this.font = font, this.fillColor = fillColor, this.outlineColor = outlineColor;
    this.x = x, this.y = y, this.text = text;

    this.update = function()
    {
        if (this.type == "Treasure" && treasure.length > 0)
        {
            if (this.treasureCollected == treasure.length) { this.fillColor = colors.Gold; }

            this.text = "💰";
            this.text += this.treasureCollected + "/" + treasure.length;
        }
        else if (this.type == "Completion")
        {
            if (saveProgress.completion[14][1] < 50) { this.fillColor = colors.White; }
            else if (saveProgress.completion[14][1] >= 50 && saveProgress.completion[14][1] < 100)
            {
                this.fillColor = colors.shading(colors.Silver, 10);
            }
            else if (saveProgress.completion[14][1] == 100) { this.fillColor = colors.Gold; }
            else if (saveProgress.completion[14][1] >= 101)
            {
                this.fillColor = colors.rainbow(this.fillColor, 1);
            }

            this.text = "";
            if (saveProgress.completion[14][1] < 10) { this.text += "00"; }
            else if (saveProgress.completion[14][1] < 100) { this.text += "0"; }
            this.text += saveProgress.completion[14][1] + "%";
        }
        else if (this.type == "Timer" && this.startingTime > 0)
        {
            if (this.timeRemaining > 0) { this.timeRemaining = (this.startingTime - (gameArea.frameNum / 50)).toFixed(1); }
            if (this.timeRemaining < 10) { this.fillColor = colors.Red; }

            this.text = "⏱️";
            if (this.timeRemaining < 10) { this.text += "00"; }
            else if (this.timeRemaining < 100) { this.text += "0"; }
            this.text += this.timeRemaining;
        }

        this.context = gameArea.context;
        this.context.font = this.font;

        this.context.fillStyle = this.fillColor;
        this.context.fillText(this.text, this.x, this.y);
        this.context.strokeStyle = this.outlineColor;
        this.context.strokeText(this.text, this.x, this.y);
    }
}

// Code for playing the game's background music and sound effects
function componentSound(source, type)
{
    this.sound = document.createElement("audio");
    this.sound.src = source; this.type = type;

    if (this.type == "BGM") { this.sound.loop = true; this.sound.volume = 0.3; }
    else if (this.type == "SFX") { this.sound.loop = false; this.sound.volume = 0.5; }

    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function() { this.sound.play(); }
    this.stop = function() { this.sound.pause(); }
}

// Code for updating the game area and everything in it on every frame
function updateGameArea()
{
    // Clearing the game area
    gameArea.clear();
    if (!player.falling) { gameArea.frameNum += 1; }

    // Updating the walls
    for (i = 0; i < walls.length; i++)
    {
        if (player.objectCollision(walls[i])) { player.handleWallCollision(walls[i]); }

        if (walls[i]) { walls[i].update(); }
    }

    // Updating the bottomless holes
    for (i = 0; i < holes.length; i++)
    {
        if (player.objectCollision(holes[i])) { player.handleHoleFalling(holes[i]); }

        if (holes[i]) { holes[i].update(); }
    }

    // Updating the treasure
    for (i = 0; i < treasure.length; i++)
    {
        if (player.objectCollision(treasure[i]) && treasure[i].radius != 0)
        {
            treasure[i].disappear();
            hud[1].treasureCollected += 1;
        }

        if (treasure[i]) { treasure[i].update(); }
    }

    // Updating the warps
    for (i = 0; i < warps.length; i++)
    {
        if (player.objectCollision(warps[i]))
        {
            warps[i].rotationSpeed = 45;

            if (player.action) { warps[i].toDestination(); }
        }
        else { warps[i].rotationSpeed = 180; }

        if (warps[i]) { warps[i].update(); }
    }

    // Updating the switches
    for (i = 0; i < switches.length; i++)
    {
        if (player.objectCollision(switches[i]))
        {
            switches[i].enoughPlayerWeightToActivate();

            if (player.action) { switches[i].changeState(); }
        }
        else { switches[i].activatable = false; }

        if (switches[i]) { switches[i].update(); }
    }

    // Updateing the resizers
    for (i = 0; i < resizers.length; i++)
    {
        if (player.objectCollision(resizers[i]))
        {
            resizers[i].activatable = true;

            if (player.action) { resizers[i].resizePlayer(); }
        }
        else { resizers[i].activatable = false; }

        if (resizers[i]) { resizers[i].update(); }
    }

    // Updating the HUD
    for (i = 0; i < hud.length; i++) { if (hud[i]) { hud[i].update(); } }

    // Updating the music and sound effects
    if (!music.sound.muted) { document.querySelectorAll("audio").forEach((element) => element.muted = false); }
    else if (music.sound.muted) { document.querySelectorAll("audio").forEach((element) => element.muted = true); }

    // Updating the player
    player.newPosition();
    if (player) { player.update(); }

    // Checking conditions for a Game Over occuring
    if (hud[2].startingTime > 0 && hud[2].timeRemaining <= 0 && !gameIsOver) { gameOver(); }
}

// Code for the game over that occurs when the level time has run out
function gameOver()
{
    gameIsOver = true;

    document.querySelector("#actionButton").innerHTML = "🏠";
    document.querySelector("#pauseButton").innerHTML = "🔄️";

    var gameOverOverlay = [(new componentWall(0, 0, gameArea.canvas.width, gameArea.canvas.height,
                            colors.Gray, 0, colors.Black, false, "N/A", 0))];
    for (i = 0; i < gameOverOverlay.length; i++) { gameOverOverlay[i].update(); }
    
    var gameOverText = [(new componentHud("60px NewSuperMarioFontU", colors.Red, colors.Black, 350, 364, "GAME OVER", 0, "N/A")),
                        (new componentHud("40px NewSuperMarioFontU", colors.Red, colors.Black, 220, 414,
                            "Click 🔄️ to restart the level.", 0, "N/A")),
                        (new componentHud("40px NewSuperMarioFontU", colors.Red, colors.Black, 215, 464,
                            "Click 🏠 to return to the hub.", 0, "N/A"))];
    for (i = 0; i < gameOverText.length; i++) { gameOverText[i].update(); }

    sfx.sound.src = "resources/sounds/Super_Mario_64_-_Game_Over.wav"; sfx.play();
    clearInterval(gameArea.interval); gameArea.interval = null;
}

// Code for restarting the current level the player is on after a Game Over occurs
function levelRestart()
{
    switch (gameArea.currentLevel)
    {
        case "Title Screen": levelSetup.titleScreen(); break;
        case "Menu Screen":  levelSetup.menuScreen(); break;
        case "Credits":      levelSetup.credits(); break;
        case "Main Hub":     levelSetup.mainHub(); break;
        case "Level 1":      levelSetup.level1(); break;
        case "Level 2":      levelSetup.level2(); break;
        case "Level 3":      levelSetup.level3(); break;
        case "Level 4":      levelSetup.level4(); break;
        case "Level 5":      levelSetup.level5(); break;
        case "Level 6":      levelSetup.level6(); break;
        case "Level 7":      levelSetup.level7(); break;
        case "Level 8":      levelSetup.level8(); break;
        case "Level 9":      levelSetup.level9(); break;
        case "Level 10":     levelSetup.level10(); break;
        case "Level A":      levelSetup.levelA(); break;
        case "Level B":      levelSetup.levelB(); break;
        case "Level C":      levelSetup.levelC(); break;
        case "Level ?":      levelSetup.level$(); break;
        default:             levelSetup.titleScreen(); break;
    }
}

// Code for the player's actions during normal gameplay, or for returning to the main hub during a pause or Game Over
function playerAction()
{
    if (!gameStarted)
    {
        document.querySelector("#actionButton").innerHTML = "🅰️";
        document.querySelector("#pauseButton").innerHTML = "⏸️";

        sfx.sound.src = "resources/sounds/Super_Mario_64_-_Enter_Course.wav"; sfx.play();
        gameStarted = true;
        
        levelSetup.menuScreen();
    }
    else if (!gameArea.interval && gameIsOver)
    {
        document.querySelector("#actionButton").innerHTML = "🅰️";
        document.querySelector("#pauseButton").innerHTML = "⏸️";

        gameIsOver = false; sfx.stop();

        sfx.sound.src = "resources/sounds/Super_Mario_64_-_Enter_Course.wav"; sfx.play();
        gameArea.interval = setInterval(updateGameArea, gameArea.updateSpeed);

        levelSetup.mainHub();
    }
    else if (!gameArea.interval && !gameIsOver)
    {
        document.querySelector("#actionButton").innerHTML = "🅰️";
        document.querySelector("#pauseButton").innerHTML = "⏸️";

        sfx.sound.src = "resources/sounds/Super_Mario_64_-_Enter_Course.wav"; sfx.play();
        gameArea.interval = setInterval(updateGameArea, gameArea.updateSpeed);

        levelSetup.mainHub();
    }
    else if (gameArea.interval && !gameIsOver) { player.action = true; }
}

// Code for pausing the game during normal gameplay, or for restarting the current level after getting a Game Over
function pauseGame()
{
    if (gameStarted && !gameIsOver && !player.falling)
    {
        if (gameArea.interval)
        {
            document.querySelector("#actionButton").innerHTML = "🏠";
            document.querySelector("#pauseButton").innerHTML = "▶️";

            var pauseOverlay = [(new componentWall(0, 0, gameArea.canvas.width, gameArea.canvas.height,
                                    colors.Gray, 0, colors.Black, false, "N/A", 0))];
            for (i = 0; i < pauseOverlay.length; i++) { pauseOverlay[i].update(); }

            var pauseText = [(new componentHud("60px NewSuperMarioFontU", colors.White, colors.Black, 400, 364, "PAUSED", 0, "N/A")),
                             (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 220, 414,
                                "Click ▶️ to resume the game.", 0, "N/A")),
                             (new componentHud("40px NewSuperMarioFontU", colors.White, colors.Black, 215, 464,
                                "Click 🏠 to return to the hub.", 0, "N/A"))];
            for (i = 0; i < pauseText.length; i++) { pauseText[i].update(); }

            sfx.sound.src = "resources/sounds/Super_Mario_64_-_Pause.wav"; sfx.play();
            clearInterval(gameArea.interval); gameArea.interval = null;
        }
        else if (!gameArea.interval)
        {
            document.querySelector("#actionButton").innerHTML = "🅰️";
            document.querySelector("#pauseButton").innerHTML = "⏸️";

            sfx.sound.src = "resources/sounds/Super_Mario_64_-_Pause.wav"; sfx.play();
            gameArea.interval = setInterval(updateGameArea, gameArea.updateSpeed);
        }
    }
    else if (gameStarted && gameIsOver && !gameArea.interval)
    {
        document.querySelector("#actionButton").innerHTML = "🅰️";
        document.querySelector("#pauseButton").innerHTML = "⏸️";

        gameIsOver = false; sfx.stop();
        gameArea.interval = setInterval(updateGameArea, gameArea.updateSpeed);

        levelRestart();
    }
}

// Code for muting and unmuting the background music and all sound effects
function toggleAudioMuting()
{
    if (!music.sound.muted) { document.querySelector("#audioButton").innerHTML = "🔇"; music.sound.muted = true; }
    else if (music.sound.muted) { document.querySelector("#audioButton").innerHTML = "🔊"; music.sound.muted = false; }
}

// IDEAS
// - Create new "instructions" level and move all info from webpage into it, or put instructions across menu screen

// ISSUES
// - Sound effects not properly muting when the game interval is paused
// - Music restarting when the player restarts the current level after getting a game over
// - Wonkiness with falling into holes, possibly causing the player to fall only partially within the hole
// - Little visual difference between flip walls and bridges that are both on, and between flip walls and switches
// - Sometimes hard to tell if a wall is off and transparent depending on the background color
// - Text being mirrored and hard to read when in Mirror Mode
// - Change "else if" conditions to "else" conditions for "if-else" statements that use booleans ("else if" not needed)
// - Level time limits currently all set to default of 200 seconds and not adjusted for each individual level length

// Code for the joystick, originally by Bobboteck (Roberto D'Amico) on GitHub
let StickStatus = { xPosition: 0, yPosition: 0, x: 0, y: 0, cardinalDirection: "C" };

var JoyStick = (function (container, parameters, callback)
{
    parameters = parameters || {};
    var title = (typeof parameters.title === "undefined" ? "joystick" : parameters.title);
    var width = (typeof parameters.width === "undefined" ? 0 : parameters.width);
    var height = (typeof parameters.height === "undefined" ? 0 : parameters.height);
    var innerFillColor = (typeof parameters.innerFillColor === "undefined" ? colors.DarkGray : parameters.innerFillColor);
    var innerLineWidth = (typeof parameters.innerLineWidth === "undefined" ? 5 : parameters.innerLineWidth);
    var innerStrokeColor = (typeof parameters.innerStrokeColor === "undefined" ? colors.DimGray : parameters.innerStrokeColor);
    var outerLineWidth = (typeof parameters.outerLineWidth === "undefined" ? 5 : parameters.outerLineWidth);
    var outerStrokeColor = (typeof parameters.outerStrokeColor === "undefined" ? colors.DimGray : parameters.outerStokeColor);
    var autoReturnToCenter = (typeof parameters.autoReturnToCenter === "undefined" ? true : parameters.autoReturnToCenter);
    
    callback = callback || function(StickStatus) {};

    var objContainer = document.getElementById(container);
    objContainer.style.touchAction = "none";

    var canvas = document.createElement("canvas");
    canvas.id = title;
    
    if (width === 0) { width = objContainer.clientWidth; }
    if (height === 0) { height = objContainer.clientHeight; }
    canvas.width = width, canvas.height = height;
    
    objContainer.appendChild(canvas);
    var context = canvas.getContext("2d");

    var pressed = 0;
    var circumference = 2 * Math.PI;
    var innerRadius = (canvas.width - ((canvas.width / 2) + 10)) / 2;
    var maxMoveStick = innerRadius + 5;
    var outerRadius = innerRadius + 30;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var dirHorizontalLimitPos = canvas.width / 10;
    var dirHorizontalLimitNeg = dirHorizontalLimitPos * -1;
    var dirVerticalLimitPos = canvas.height / 10;
    var dirVerticalLimitNeg = dirVerticalLimitPos * -1;

    var movedX = centerX, movedY = centerY;

    if ("ontouchstart" in document.documentElement)
    {
        canvas.addEventListener("touchstart", onTouchStart, false);
        document.addEventListener("touchmove", onTouchMove, false);
        document.addEventListener("touchend", onTouchEnd, false);
    }
    else
    {
        canvas.addEventListener("mousedown", onMouseDown, false);
        document.addEventListener("mousemove", onMouseMove, false);
        document.addEventListener("mouseup", onMouseUp, false);
    }

    drawOuter(); drawInner();

    function drawOuter()
    {
        context.beginPath();
        context.arc(centerX, centerY, outerRadius, 0, circumference, false);
        context.lineWidth = outerLineWidth;
        context.strokeStyle = outerStrokeColor;
        context.stroke();
    }

    function drawInner()
    {
        context.beginPath();
        if (movedX < innerRadius) { movedX = maxMoveStick; }
        if ((movedX + innerRadius) > canvas.width) { movedX = canvas.width - maxMoveStick; }
        if (movedY < innerRadius) { movedY = maxMoveStick; }
        if ((movedY + innerRadius) > canvas.height) { movedY = canvas.height - maxMoveStick; }
        context.arc(movedX, movedY, innerRadius, 0, circumference, false);

        var grd = context.createRadialGradient(centerX, centerY, 5, centerX, centerY, 200);
        grd.addColorStop(0, innerFillColor);
        grd.addColorStop(1, innerStrokeColor);
        context.fillStyle = grd;
        context.fill();
        context.lineWidth = innerLineWidth;
        context.strokeStyle = innerStrokeColor;
        context.stroke();
    }

    let touchId = null;
    function onTouchStart(event) { pressed = 1; touchId = event.targetTouches[0].identifier; }

    function onTouchMove(event)
    {
        if (pressed === 1 && event.targetTouches[0].target === canvas)
        {
            movedX = event.targetTouches[0].pageX, movedY = event.targetTouches[0].pageY;

            if (canvas.offsetParent.tagName.toUpperCase() === "BODY")
            {
                movedX -= canvas.offsetLeft, movedY -= canvas.offsetTop;
            }
            else
            {
                movedX -= canvas.offsetParent.offsetLeft, movedY -= canvas.offsetParent.offsetTop;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            drawOuter(); drawInner();

            StickStatus.xPosition = movedX, StickStatus.yPosition = movedY;
            StickStatus.x = (100 * ((movedX - centerX) / maxMoveStick)).toFixed();
            StickStatus.y = ((100 * ((movedY - centerY) / maxMoveStick)) * -1).toFixed();
            StickStatus.cardinalDirection = getCardinalDirection();
            callback(StickStatus);
        }
    }

    function onTouchEnd(event)
    {
        if (event.changedTouches[0].identifier !== touchId) { return; }

        pressed = 0;

        if (autoReturnToCenter) { movedX = centerX, movedY = centerY; }

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawOuter(); drawInner();

        StickStatus.xPosition = movedX, StickStatus.yPosition = movedY;
        StickStatus.x = (100 * ((movedX - centerX) / maxMoveStick)).toFixed();
        StickStatus.y = ((100 * ((movedY - centerY) / maxMoveStick)) * -1).toFixed();
        StickStatus.cardinalDirection = getCardinalDirection();
        callback(StickStatus);
    }

    function onMouseDown(event) { pressed = 1; }

    function onMouseMove(event)
    {
        if (pressed === 1)
        {
            movedX = event.pageX, movedY = event.pageY;

            if (canvas.offsetParent.tagName.toUpperCase() === "BODY")
            {
                movedX -= canvas.offsetLeft, movedY -= canvas.offsetTop;
            }
            else
            {
                movedX -= canvas.offsetParent.offsetLeft, movedY -= canvas.offsetParent.offsetTop;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            drawOuter(); drawInner();

            StickStatus.xPosition = movedX, StickStatus.yPosition = movedY;
            StickStatus.x = (100 * ((movedX - centerX) / maxMoveStick)).toFixed();
            StickStatus.y = ((100 * ((movedY - centerY) / maxMoveStick)) * -1).toFixed();
            StickStatus.cardinalDirection = getCardinalDirection();
            callback(StickStatus);
        }
    }

    function onMouseUp(event)
    {
        pressed = 0;

        if (autoReturnToCenter) { movedX = centerX, movedY = centerY; }

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawOuter(); drawInner();

        StickStatus.xPosition = movedX, StickStatus.yPosition = movedY;
        StickStatus.x = (100 * ((movedX - centerX) / maxMoveStick)).toFixed();
        StickStatus.y = ((100 * ((movedY - centerY) / maxMoveStick)) * -1).toFixed();
        StickStatus.cardinalDirection = getCardinalDirection();
        callback(StickStatus);
    }

    function getCardinalDirection()
    {
        let result = "";
        let horizontal = movedX - centerX;
        let vertical = movedY - centerY;

        if (vertical >= dirVerticalLimitNeg && vertical <= dirVerticalLimitPos) { result = "C"; }
        if (vertical < dirVerticalLimitNeg) { result = "N"; }
        if (vertical > dirVerticalLimitPos) { result = "S"; }

        if (horizontal < dirHorizontalLimitNeg) { if (result === "C") { result = "W"; } else { result += "W"; } }
        if (horizontal > dirHorizontalLimitPos) { if (result === "C") { result = "E"; } else { result += "E"; } }

        return result;
    }

    this.getWidth = function () { return canvas.width; };
    this.getHeight = function () { return canvas.height; };
    this.getPosX = function () { return movedX; };
    this.getPosY = function () { return movedY; };
    this.getX = function () { return (100 * ((movedX - centerX) / maxMoveStick)).toFixed(); };
    this.getY = function () { return ((100 * ((movedY - centerY) / maxMoveStick)) * -1).toFixed(); };
    this.getDir = function () { return getCardinalDirection(); };
});

var joystickInputPosX, joystickInputPosY, joystickDirection, joystickX, joystickY;

var joystick = new JoyStick("joystick", { "title": "joystick", "width": 250, "height": 250 }, function(stickData)
{
    joystickInputPosX = stickData.xPosition;
    joystickInputPosY = stickData.yPosition;
    joystickDirection = stickData.cardinalDirection;
    joystickX = stickData.x;
    joystickY = stickData.y;
});