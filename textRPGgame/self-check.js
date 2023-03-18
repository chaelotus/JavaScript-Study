class Human{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    sayName(){
        console.log(this.name);
    }
    sayAge(){
        console.log(this.age);
    }
}
class Programer extends Human{
    constructor(name,age,languages){
        super(name,age);
        this.languages = languages;
    }
    writeCode(){
        console.log(`${this.languages.join()} 으로 코딩해요`);
    }
}
const Programer1 = new Programer(
    '박채연',
    26,
    ['html','css','js'],
);
Programer1.writeCode();