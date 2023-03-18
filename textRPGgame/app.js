const $startScreen = document.querySelector("#start-screen");
const $gameMenu = document.querySelector("#game-menu");
const $battleMenu = document.querySelector("#battle-menu");
const $nameInput = document.querySelector("#name-input");
const $menuInput = document.querySelector("#menu-input");
const $battleInput = document.querySelector("#battle-input");
const $monsterStart = document.querySelector("#monster-start")
const $message = document.querySelector("#message");

const $heroName = document.querySelector("#hero-name");
const $heroLevel = document.querySelector("#hero-level");
const $heroHp = document.querySelector("#hero-hp");
const $heroXp = document.querySelector("#hero-xp");
const $heroAtt = document.querySelector("#hero-att");
const $monsterName = document.querySelector("#monster-name");
const $monsterHp = document.querySelector("#monster-hp");
const $monsterAtt = document.querySelector("#monster-att");

const hero = {
    name : '',
    level : 1,
    maxHp : 100, //최대체력
    hp : 100,  //현재체력
    xp : 0,
    att : 10,  //공격력
    attack(monster){ // attack:function(monster) => function 생략
        monster.hp -= this.att;
        this.hp -= monster.att; 
    },
    heal(monster){
        this.hp += 20;
        this.hp -= monster.att;
    },
};

class Monster{//클래스 생성
    constructor(name,hp,xp,att){
        this.name = name;
        this.hp = hp;
        this.xp = xp;
        this.att = att;
    }
    attack(monster){ // 화살표 함수쓰면 this가 달라질 수 있기 때문에 화살표 함수 쓰지 않기
        monster.hp -= this.att;//클래스 안엑서도 this는 새로 생성한 객체
        this.hp -= monster.att; 
    } 
    heal(monster){
        this.hp += 20;
        this.hp -= monster.att;
    }
}
const monster1 = new Monster('슬라임',25,10,11);
const monster2 = new Monster('스켈레톤',26,10,10);
const monster3 = new Monster('마왕',25,10,11);
function StartScreen(event){
    event.preventDefault();
    const name = $nameInput.value;
    $startScreen.style.display = 'none';
    $gameMenu.style.display = 'block';
    $heroName.textContent = name;
    hero.name = name;
    $heroLevel.textContent = `${hero.level} Lev`;
    $heroHp.textContent = `HP : ${hero.hp} / ${hero.maxHp}`;
    $heroXp.textContent = `XP : ${hero.xp} / ${hero.level * 15}`;
    $heroAtt.textContent = `ATT : ${hero.att}`;
}
function OngameMenu(event){
    event.preventDefault();
    const menuinput = $menuInput.value;
    if(menuinput === '1'){//모험
        $menuInput.value = '';
        monster = JSON.parse(
            JSON.stringify(monsterList[Math.floor(Math.random()*monsterList.length)])
            );
        monster.maxHp = monster.hp;
        $monsterName.textContent = monster.name;
        $monsterHp.textContent = `HP : ${monster.hp}`;
        $monsterAtt.textContent = `ATT : ${monster.att}`;
        console.log(monster);
        $gameMenu.style.display = 'none';
        $battleMenu.style.display = 'block';
    }
    else if(menuinput === '2'){//휴식
        $menuInput.value = '';
        hero.hp = hero.maxHp;
    }
    else if(menuinput === '3'){//종료
        $menuInput.value = '';
        return;
    }
}
function OnBattleMenu(event){
    event.preventDefault();
    const battleinput = $battleInput.value;
    if(battleinput === '1'){//공격
        $battleInput.value = '';
        hero.attack(monster);
        monster.attack(hero);
        $heroHp.textContent = `HP : ${hero.hp} / ${hero.maxHp}`;
        $monsterHp.textContent = `HP : ${monster.hp}`;
        $message.textContent = `${hero.att}의 데미지를 주고 ${monster.att}의 데메지를 받았다.`;
    }
    else if(battleinput === '2'){//회복
        $battleInput.value = '';
        hero.heal(monster);

    }
    else if(battleinput === '3'){//도망
        $battleInput.value = '';
        $battleMenu.style.display = 'none';
        $gameMenu.style.display = 'block'; 
    }
}
$startScreen.addEventListener("submit",StartScreen);
$gameMenu.addEventListener("submit",OngameMenu);
$battleMenu.addEventListener("submit",OnBattleMenu);