//Всплывающее окно при загрузке страницы, начало игры.
/*
Window.onload = (function(){
    
    let divElem = document.createElement("div");
    divElem.className = "startPopUp";


    let wrapper = document.getElementsByClassName("wrapper")[0];
    document.body.insertBefore(divElem,wrapper);
    
    let divTextBlock = document.createElement("div");
    divTextBlock.className = "startPopUpTextBlock";
    document.body.firstChild.nextSibling.appendChild(divTextBlock);
    
}());
*/
function startGame(){
    let closeButton = document.querySelector('.closeButton');

    closeButton.addEventListener('click',killSnowManGame);
    closeButton.addEventListener('click',(function(){document.body.removeChild(startPopUpWrapper)}));
    let startPopUpWrapper = document.getElementsByClassName('startPopUp')[0];

    let startGameButton = document.querySelector('.startGame');
    startGameButton.addEventListener('click',killSnowManGame);
    startGameButton.addEventListener('click', (function(){document.body.removeChild(startPopUpWrapper)}));
}
startGame()
/*
0. Графика и интерактив. 
    0.При входе в игру должно 
        0.Всплывать приветствие, презентация игры (при поддержке ЖКС №1, святозор и т.д) 
            0.1 вопрос у пользователя играть со звуком или без. (mute audio js вроде)
        1.всплывать popup с введением в игру и предисторией
        2. В конце игры показать че было после 
   
*/

function killSnowManGame() {
    //Объекты отвечающие за характеристики персонажей.
    let player = {
        name: 'Biglove',
        hp: 100,
        mindmg: 1,
        maxdmg: 10,
        dmg: function () {
            return Number((this.mindmg + Math.random() * (this.maxdmg - this.mindmg)).toFixed());
        }
    };
    let computer = {
        name: 'Snowman',
        hp: 100,
        mindmg: 1,
        maxdmg: 10,
        dmg: function () {
            return Number((this.mindmg + Math.random() * (this.maxdmg - this.mindmg)).toFixed());
        }
    };
    //Модуль боевой системы.
    function battleSystem() {
        //battleChat('Вы бродили тёмной ночью по городу.. Шла сильная метель.. самый настоящий снегопад.. коммунальщики очень плохо убрали снег...и вдруг на вас напал злейший враг! Приготовьтесь к бою!');

        //Кнопка атаки игрока
        let attackButton = document.getElementById('attackEnemy');

        let control = 0; //Переменная контроля хода. 0 = игрок, 1 = компьютер.

        //UI
        let enemyImage = document.getElementsByClassName("enemy-image")[0];
        let playerImage = document.getElementsByClassName("player-image")[0];
        enemyImage.style.opacity = 1 ;
        
        //Установка начальных значений для работы сними.
        let playerhpStatusBar = document.getElementsByClassName('player-health-status-bar')[0];
        //Длина блока здоровья и значение внутри отвечающее за имеющееся колличество здоровье.
        playerhpStatusBar.style.width = '300px';
        playerhpStatusBar.innerHTML = "100";

        let computerhpStatusBar = document.getElementsByClassName('enemy-health-status-bar')[0];
        computerhpStatusBar.style.width = '300px';
        computerhpStatusBar.innerHTML = "100";
        //Анимации,эффекты
        let getDemageSound = new Audio();
        getDemageSound.preload = 'auto';
        getDemageSound.src = 'kick.mp3';
        //Функция атаки компьютера
        function computerAttack() {
            let damage = computer.dmg();
            player.hp -= damage;

            playerhpStatusBar.style.width = (parseInt(playerhpStatusBar.style.width) - damage * 3) + 'px';

            if (player.hp <= 0) {
                player.hp = 0;
                playerhpStatusBar.style.width = '0px';
            }
           
            //анимация получения урона игрока
            playerImage.classList.remove("player-image")
            getDemageSound.play();
            playerImage.classList.toggle("get-demage-animation-image");
            setTimeout(function () {
                playerImage.classList.remove("get-demage-animation-image")
                playerImage.classList.toggle("player-image")
            }, 1000)
            playerhpStatusBar.innerHTML = player.hp;
            battleChat('Чат: ' + 'Снеговик атаковал вас и нанёс -' + damage + ' урона.')
            battleChat(' Ваше здоровье: ' + player.hp);
            control = 0; //Передача хода оппоненту
            stepControl();
        }

        //Функция атаки игрока
        function playerAttack() {
            attackButton.removeEventListener('click', playerAttack);
            //Генерация урона игрока
            let damage = player.dmg();
            //Вычитание урона из здоровья
            computer.hp -= damage;


            //Анимация снеговика
            //Снеговик тает
            enemyImage.style.opacity -= 0.05;
            //Получение урона компьютером
            enemyImage.classList.remove("enemy-image");


            enemyImage.classList.toggle("get-demage-animation-image");
            getDemageSound.play();
            setTimeout(function () {
                enemyImage.classList.remove("get-demage-animation-image");
                enemyImage.classList.toggle("enemy-image")
            }, 1000)


            //Изменение наполнения блока здоровья противника пропорционально нанесенному урону.
            computerhpStatusBar.style.width = parseInt(computerhpStatusBar.style.width) - damage * 3 + 'px';
            //
            if (computer.hp < 0) {
                computerhpStatusBar.style.width = '0px';
                computer.hp = 0;
                enemyImage.style.opacity -= 0;
            }
            if(computer.hp < 100 && computer.hp > 90){
                battleChat("Снеговик: Мужик ты че делаешь");
            }
            else if(computer.hp < 80 && computer.hp>70){
                battleChat("Снеговик: чё так больно то");
            } 
            else if(computer.hp < 70 && computer.hp>60){
                battleChat("Снеговик: Аййй");
            } 
            else if(computer.hp < 60 && computer.hp>50){
                battleChat("Снеговик: ...");
            } 
            else if(computer.hp < 50 && computer.hp>40){
                battleChat("Снеговик: ...");
            } 
            else if(computer.hp < 11 && computer.hp>0){
                battleChat("Снеговик: Я всего лишь снег! не убивай меня");
            } 
            //Изменение текстового индикатора здоровья
            computerhpStatusBar.innerHTML = computer.hp;
            battleChat('Чат: ' + 'Вы атаковали противника и нанесли -' + damage + ' урона.');
            battleChat(' Здоровье противника: ' + computer.hp)

            //Передача хода оппоненту
            control = 1;
            stepControl();
        }

        //UI: счётчик, боевой чат

        function battleChat(message) {
            //Чат
            let chatInput = document.getElementById("battleChat");

            let chatInputFirstMessage = chatInput.firstChild;
            let appendBr = document.createElement("br");
            this.message = message;

            messageNode = document.createElement("p");
            messageNode.textContent = this.message;

            function appendMessageToBattleChat() {
                chatInput.insertBefore(messageNode, chatInputFirstMessage);
                chatInput.insertBefore(appendBr, chatInputFirstMessage);
            }
            appendMessageToBattleChat();
        }
        //Передача инициативу игроку
        function playerStep() {

           
            document.getElementById("step").innerHTML = 'Ходит ' + player.name;
            document.getElementById("step").style.color = 'blue';
            attackButton.addEventListener('click', playerAttack); //Кнопка атаки для игрока

            
        }
        //Передача инициативу компьютеру
        function computerStep() {
            //Счётчик времени
            document.getElementById("step").style.color = 'red';
            document.getElementById("step").innerHTML = 'Ходит ' + computer.name;
            document.getElementById("battleTimer").innerHTML = "Таймер хода : " + 0;
            //Атака компьютера
            setTimeout(computerAttack, 3000);
        }
        //Счётчик хода от 10 до 0. Если 0 - инициатива переходит опоненту.
        function timer() {
            //Каждую секунду уменьшает i на 1 и выводит в HTML элемент.
           
            let i = 11;
            
            let count = setInterval(counterPlayer, 1000);
            function counterPlayer() {
                if(computer.hp == 0){
                    return undefined;
                }
                --i;
                document.getElementById("battleTimer").innerHTML = "Таймер хода : " + i;
                if (control == 1) {
                    i = 0;
                    document.getElementById("battleTimer").innerHTML = "Таймер хода : " + i;
                    clearInterval(count);
                }
                else if (i == 0) {
                    //Если i == 0 Сообщение в батл чат: ход переходит противнику.
                    attackButton.removeEventListener('click', playerAttack);
                    clearInterval(count);
                    battleChat('Чат: ' + 'Вы пропустили ход: 10 секунд прошло');
                    battleChat('Чат: ' + 'Теперь ходит противник')
                    control = 1;
                    stepControl();
                }
            }
        }
        //Функция контроля инициативы: чей ход?
        function stepControl() {
            //Проверка чей ход?
            if (player.hp == 0) {
                battleChat('Чат: ' + player.name + " Мёртв" + " Этот усач поплатился за покушение на вас.");
                attackButton.removeEventListener('click', playerAttack);
                control = 3;
            }
            if (computer.hp == 0) {
                battleChat('Чат : ' + computer.name + " Мёртв. Вы победили в этой грязной битве.");
                attackButton.removeEventListener('click', playerAttack);
                control = 3;

            }
            if (control == 0) {
                timer();
                playerStep();
               
            }
             if (control == 1) {
                
                computerStep();
                
            }
            
           
    
        }
    stepControl();

}
battleSystem();
   //Модуль интерактивных сообщений.
}
