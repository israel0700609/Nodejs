let w;
let amount_mines;
let flag_lose = 0;
let diamond_value;
let numofdiamonds = 0;
let bet = 0;
let profit = 0;
let bet_placed = 0;
let played = 0;
cou = 0;

let baseMultiplier;

let array = [];

let mone_y = 5000;
document.getElementById("money").innerHTML = "Your Balance: " + mone_y + "$";

function startgame() {
    flag_lose = 0;

    w = 5;
    h = w;
    amount_mines = parseInt(document.getElementById("mines").value);
    numofdiamonds = 0;
    diamond_value = w * w - amount_mines;

    let id = document.getElementById("con");

    if (id) {
        id.innerHTML = "";
        id.style.gridTemplateColumns = `repeat(${w}, 1fr)`;
    }

    array = generateUniqueRandomNumbers(amount_mines, w * h);

    let index = 0;
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            let btn = document.createElement("button");

            if (array.includes(index)) {
                btn.id = "mine";
                btn.className = "mines";
            } else {
                btn.id = "diamond";
                btn.className = "diamonds";
            }

            btn.innerHTML = '';
            id.appendChild(btn);

            btn.onclick = function () {
                if(bet_placed == 0)
                {
                    checkerror();                    
                    return;
                }
                check(btn, btn.id);
                update();
            };
            index++;
        }
    }
}

function generateUniqueRandomNumbers(count, max) {
    let set = new Set();
    while (set.size < count) {
        set.add(Math.floor(Math.random() * max));
    }
    return Array.from(set);
}

function check(btn, id) {
    let img = new Image();
    if (id === "mine") {
        img.src = 'pics/bomb.png';
        btn.appendChild(img);
        btn.disabled = true;
        flag_lose = 1;
        profit = 0;
        numofdiamonds = 0;
        document.getElementById("Profit").innerHTML = "Profit: " + profit + "$";
        bet = 0;
        cou = 0;

        document.getElementById("beta").value = "";
        if(flag_lose == 1)
        {
            setTimeout(Delay,500);
            bet_placed = 0;

        }
        document.getElementById("mines").value = 1;


    } else {
        img.src = 'pics/diamond.png';
        btn.appendChild(img);
        btn.disabled = true;
        numofdiamonds += 1;
        profit+= parseInt((baseMultiplier / 100)* (numofdiamonds + amount_mines))
        
    }
}
function Delay()
{

    startgame();

}
function bets5() {
    bet = parseFloat(document.getElementById("beta").value);
    document.getElementById("beta").value = (bet * 0.5).toFixed(2);
}

function bets2() {
    bet = parseFloat(document.getElementById("beta").value);
    document.getElementById("beta").value = (bet * 2).toFixed(2);
}

function update() {
    if (numofdiamonds > 0 && !flag_lose) {
        document.getElementById("Profit").innerHTML = "Profit: " + profit + "$";
    }
}

function leave() {
    if (!flag_lose && bet_placed == 1) {
        modal1.style.display = "flex";
        document.getElementById("p1").innerHTML = `
        Your Bet: ${bet}$<br>
        Your Balance: ${mone_y}$<br>
        Amount of Mines: ${amount_mines}<br>
        Amount of Diamonds: ${diamond_value}
        <br>
        Amount of Diamonds you got: ${numofdiamonds}
        <br>
        Total Profit: ${profit}$
        <br>
    `;

        mone_y += parseFloat(profit) + bet;
        document.getElementById("money").innerHTML = "Your Balance: " + mone_y + "$";
        profit = 0;
        document.getElementById("Profit").innerHTML = "Profit: ";
    }
    else{
        checkerror();

        return;
    }

    document.getElementById("beta").value = "";
    bet = 0;
    flag_lose = 0;
    document.getElementById("mines").value = 1;
    numofdiamonds = 0;
    bet_placed = 0;
    cou = 0;
    startgame();
}

let modal1 = document.getElementById("Repmodal");
let modal = document.getElementById("betModal");
function placeBet() {
    if(cou >= 1)
    {
        checkerror();
        return;
    }    

    amount_mines = parseInt(document.getElementById("mines").value);

    bet = parseFloat(document.getElementById("beta").value);
    baseMultiplier = 1.01 * bet;
    if (bet <= 0 || mone_y - bet < 0 || isNaN(bet)) {
        checkerror();

        return;
    }
    modal.style.display = "flex";

    diamond_value = w * w - amount_mines;

    document.getElementById("p").innerHTML = `
        Your Bet: ${bet}$<br>
        Your Balance: ${mone_y}$<br>
        Amount of Mines: ${amount_mines}<br>
        Amount of Diamonds: ${diamond_value}
    `;
    document.getElementById("Profit").innerHTML = "Profit: "
}

function closeModal() {
    modal.style.display = "none";
}
function closeModal1()
{
    modal1.style.display = "none";
}
function confirmBet() {
    mone_y -= bet;
    closeModal();
    bet_placed = 1;
    cou+=1
    document.getElementById("money").innerHTML = `Your Balance: ${mone_y}$`;
    startgame();
}
function confirmrep()
{
    closeModal1();
    document.getElementById("money").innerHTML = `Your Balance: ${mone_y}$`;
    startgame();
}

function restart() {
amount_mines = 0;
flag_lose = 0;
diamond_value;
numofdiamonds = 0;
bet = 0;
profit = 0;
bet_placed = 0;
played = 0;
cou = 0;

    document.getElementById("mines").value = 1;
    document.getElementById("Profit").innerHTML = "Profit: "
    document.getElementById("beta").value = "";
    startgame();
}

let how = document.getElementById("howto");


function howtoplay()
{
    document.getElementById("p2").innerHTML = `
<h1>מכרות ויהלומים</h1>
            <p>הוא משחק הימורים פשוט המבוסס על מזל. מטרת המשחק היא לחשוף יהלומים מוסתרים בתוך רשת של משבצות מבלי לחשוף מוקשים.</p>
            
            <h2>איך לשחק</h2>
            <ul>
                <li><strong>הימור:</strong> לפני תחילת כל סיבוב, עליך להגדיר את סכום ההימור שלך.</li>
                <li><strong>בחירת מספר מוקשים:</strong> עליך לבחור כמה מוקשים יהיו מוסתרים בלוח. ככל שיש יותר מוקשים כך הסיכוי שלך לחשוף יהלום קטן, אך התגמול על כל יהלום שתחשוף יהיה גבוה יותר.</li>
                <li><strong>חשיפת משבצות:</strong> לאחר קביעת ההימור ומספר המוקשים, עליך ללחוץ על משבצות בלוח כדי לחשוף אותן.</li>
                <ul>
                    <li><strong>יהלום:</strong> אם חשפת יהלום, אתה זוכה בסכום כסף בהתאם לגודל ההימור שלך ולמספר היהלומים שכבר חשפת בסיבוב הנוכחי.</li>
                    <li><strong>מוקש:</strong> אם חשפת מוקש, המשחק מסתיים ואתה מפסיד את סכום ההימור שלך.</li>
                </ul>
                <li><strong>סיום הסיבוב:</strong> אתה יכול לסיים את הסיבוב בכל עת לאחר שחשפת יהלום ולקחת את הרווחים שצברת עד כה. אם תמשיך לחשוף משבצות, אתה מסתכן בחשיפת מוקש ובאיבוד כל הרווחים.</li>
            </ul>

            <h2>ההימורים</h2>
            <ul>
                <li><strong>סכום ההימור:</strong> הסכום שאתה מהמר עליו בכל סיבוב.</li>
                <li><strong>מכפיל:</strong> ככל שתחשוף יותר יהלומים בסיבוב מבלי לחשוף מוקש, כך יגדל המכפיל של סכום ההימור שלך.</li>
                <li><strong>בחירת מספר המוקשים:</strong> משפיעה על הסיכון ועל פוטנציאל הרווח. יותר מוקשים = סיכון גבוה יותר ורווח פוטנציאלי גבוה יותר.</li>
                <li><strong>מתי לסיים את הסיבוב:</strong> ההחלטה מתי לקחת את הרווחים שצברת ולסיים את הסיבוב היא חלק חשוב באסטרטגיית המשחק. עליך לשקול את הסיכון מול הסיכוי ולהחליט מתי עדיף להפסיק.</li>
            </ul>

            <h2>חשוב לזכור</h2>
            <p><strong>"מכרות ויהלומים" הוא משחק מזל.</strong> אין דרך להבטיח ניצחון, ותמיד קיים סיכוי להפסיד כסף. שחקו באחריות.</p>
    `;
    how.style.display = "flex";
}



function closehow()
{
    how.style.display = "none"
}



function checkerror()
{
    if(bet_placed == 0 && mone_y - bet > 0 )
    {
        error.style.display = "flex";
        document.getElementById("err").innerHTML = `
        ERROR: Please Place Your Bet.
        

    `;
    setTimeout(Delay1,4000);


        
    }
    else if(cou >= 1)
    {
        error.style.display = "flex";
        document.getElementById("err").innerHTML = `
        ERROR: You Cant Bet While Playing.

    `;

    setTimeout(Delay1,4000);

    }
    else if(bet <= 0 || mone_y - bet < 0 || isNaN(bet))
    {
        error.style.display = "flex";
        document.getElementById("err").innerHTML = `
        ERROR: Invalid Bet

    `;

    setTimeout(Delay1,4000);

    }
}


function cl()
{
    error.style.display = "none";
}

function Delay1()
{
    error.style.display = "none";

}

let error = document.getElementById("error");



function aboutme()
{
    window.open('About.html', '_self')
}

function dream()
{
    window.open('dream.html', '_self')
}

function pardes()
{
    window.open('Pardes.html','_self')

}