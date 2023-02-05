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

class Game{//게임에 대한 설정
    constructor(name){
        this.monster = null;
        this.hero = null;
        this.monsterList = [
            { name : '슬라임', hp : 25, xp: 10, att : 10},
            { name : '스켈레톤', hp : 50, xp: 15, att : 10},
            { name : '마왕', hp : 150, xp: 35, att : 50},
        ];
        this.start(name);
    }
    start(name){
        $gameMenu.addEventListener("submit",this.OnGameMenuInput);
        $battleMenu.addEventListener("submit",this.OnBattleMenuInput); 
        this.changeScreen('game');
        this.hero = new Hero(this, name);
        this.updateHeroStat();
    }
    changeScreen(screen){
        if(screen === 'start'){
            $startScreen.style.display = 'block';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'none';
        }else if(screen === 'game'){
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'block';
            $battleMenu.style.display = 'none';
        }else if(screen === 'battle'){
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'block';
        }
    }
    OnGameMenuInput = (event) => {
        //이벤트리스너 하면 바깥 this와 안에 있는 this 의 의미가 달라진다. 그래서 this를 변수로 저장하는 방법도 있지만
        // 화살표 함수를 사용하면 바깥 this가 그대로 들어온다. 
        event.preventDefault();
        const menuinput = event.target['menu-input'].value;
        if(menuinput === '1'){//모험
            this.changeScreen('battle');
            const randomMonster = this.monsterList[Math.floor(Math.random() * this.monsterList.length)];
            console.log(randomMonster);
            this.monster = new Monster(
                this,
                randomMonster.name,
                randomMonster.hp,
                randomMonster.xp,
                randomMonster.att,
            );
            console.log(this.monster);
            this.updateMonsterStat();
            this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
        }else if(menuinput === '2'){//휴식
            this.hero.hp = this.hero.maxHp;
            this.updateHeroStat();
            this.showMessage('충분한 휴식을 취했다!');
        }else if(menuinput === '3'){//종료
            this.showMessage('');
            this.quit();
        }
    }
    OnBattleMenuInput = (event) => {
        event.preventDefault();
        const battleinput = event.target['battle-input'].value;
        if(battleinput === '1'){//공격
            const {hero,monster} = this; 
            hero.attack(monster);
            monster.attack(hero);
            // this.updateHeroStat();
            // this.updateMonsterStat();
            if(hero.hp <= 0){//내가 죽었을 때
                this.showMessage(`${hero.level}에서 전사. 새 주인공을 생성하세요.`);
                this.quit();//나중에 만들기 . 게임종료
            }
            else if(monster.hp <= 0){//몬스터가 죽었을 떄
                this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
                hero.getXp(monster.xp);
                this.monster = null;
                this.changeScreen('game');
            }else{//전투 진행 중
                this.showMessage(`${hero.att}데미지를 주고 ${monster.att}의 데미지를 받았다.`);
            }
            this.updateHeroStat();
            this.updateMonsterStat();
        }else if(battleinput === '2'){//회복
            const {hero,monster} = this;
            console.log(hero.hp);
            if(hero.hp - monster.att > 0){
                hero.hp = Math.min(hero.maxHp, hero.hp+20);
                monster.attack(hero);
                this.showMessage('체력을 조금 회복했다!');
                this.updateHeroStat();
            }else if(hero.hp - monster.att <= 0){
                this.showMessage(`${hero.level}에서 전사. 새 주인공을 생성하세요.`);
                this.quit();//나중에 만들기 . 게임종료
            }
        }else if(battleinput === '3'){//도망
            this.changeScreen('game'); 
            this.showMessage('부리나게 도망쳤다!');
            this.monster = null;
            this.updateMonsterStat();
        }
    }
    updateHeroStat(){
        const {hero} = this;//구조분해할당 : const hero = this.hero;
        if(hero === null){
            $heroName.textContent = '';
            $heroLevel.textContent = '';
            $heroHp.textContent = '';
            $heroXp.textContent = '';
            $heroAtt.textContent = '';
            return;
        }
        $heroName.textContent = hero.name;
        $heroLevel.textContent = `|${hero.level} Lev|`;
        $heroHp.textContent = `HP : ${hero.hp} / ${hero.maxHp}`;
        $heroXp.textContent = `XP : ${hero.xp} / ${15 * hero.level}`;
        $heroAtt.textContent = `ATT : ${hero.att}`;
    }
    updateMonsterStat(){
        const {monster} = this;
        if(monster === null){
            $monsterName.textContent = '';
            $monsterHp.textContent = '';
            $monsterAtt.textContent = '';
            return;
        }
        $monsterName.textContent = monster.name;
        $monsterHp.textContent = `HP : ${monster.hp} / ${monster.maxHp}`;
        $monsterAtt.textContent = `ATT : ${monster.att}`;
    }
    showMessage(message){
        $message.textContent = message;
    }
    quit(){
        this.hero = null;
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        $gameMenu.removeEventListener('submit',this.OngameMenu);
        $battleMenu.removeEventListener('submit',this.OnBattleMenu);
        this.changeScreen('start');
        game = null;
    }
  
}
class Unit{
    constructor(game,name,hp,xp,att){//부모클래스의 생성자 함수
        this.game = game;
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.xp = xp;
        this.att = att;
    }
    attack(target){
        target.hp -= this.att;
    }
}

class Hero extends Unit{
    constructor(game, name){
        super(game,name,100,0,10);//부모 클래스 생성자 호출할 때
        this.level = 1;
        this.maxHp = 100;
    }
    heal(monster){
        this.hp += 20;
        this.hp -= monster.att;
    }
    getXp(xp){
        this.xp += xp;
        if(this.xp >= this.level * 15){
            this.xp -= this.level * 15;
            //xp 10, lev 1, maxxp 15인데 경험치로 10을 얻었으면 xp 20, lev 2 레벨이 오르게 되고 여기서 Xp는 5가 되어야 한다.
            this.level += 1;
            this.maxHp += 5;
            this.hp = this.maxHp;
            this.att += 5;
            this.game.showMessage(`레벨 업! ${this.level}`);
        }

    }
}
class Monster extends Unit{//클래스 생성
    constructor(game,name,hp,xp,att){
        super(game,name,hp,xp,att);
        this.maxHp = hp;
    }
    // attack(target){ // 화살표 함수쓰면 this가 달라질 수 있기 때문에 화살표 함수 쓰지 않기
    //     target.hp -= this.att;//클래스 안엑서도 this는 새로 생성한 객체
    // } Unit을 상속받기 때문에 이 부분을 안써도 됨.
}

let game = null;
function StartScreen(event){
    event.preventDefault();
    const name = $nameInput.value;
    game = new Game(name);// 게임 새로 생성

}
$startScreen.addEventListener("submit",StartScreen);
