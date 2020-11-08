function strategyGame() {

    alert('Да здравствует новое время!! в новой игре!')
    alert('Вас приветствует сыр-бор продукшен и святозор! Мы выпускаем игры!!!')
    alert('При производстве игры наш двор убирала снегоуборочная техника!! спасибо!')
    alert('Добро пожаловать в "Убийство Снежного человека 2" Версия 0.1 DLC для предзаказчиков')
    alert('Попробуй пройти её и ты!! и все друзья!!!')
 
   
    function play() {
        //User interface
        var attackComputerBtn = document.getElementById('attackenemy');

        var combatLogBlock = document.getElementById('result');
        var combatLogLaunch = 0;
        var playerHP = 100;
        var playerDMG = 1;

        var enemyHealthStatusBar = document.getElementById('enemy-health-status-bar');
        enemyHealthStatusBar.style.width = '100%';
        var enemyHealthStatusBarDecrease;
        var enemyImage = document.getElementById("enemy-image");
        enemyImage.style.opacity =1;

        var computerHP = 100;
        var computerDMG = 0.5;
        function attack() {
            computerHP -= playerDMG;
            enemyHealthStatusBarDecrease = parseInt(enemyHealthStatusBar.style.width) - 1;
            enemyHealthStatusBar.style.width = enemyHealthStatusBarDecrease + '%';
            enemyImage.style.opacity -= '0.01';
            
            if(computerHP == 0){
                attackComputerBtn.removeEventListener('click',attack);
            }
            combatLog();
            
        }
       
        if(computerHP >0){
            attackComputerBtn.addEventListener('click',attack);
        }
        //Combat Log block
        function combatLog(){
            var combatLogElement = document.createElement("p")
            
            combatLogElement.textContent = 'Здоровье врага: ' + computerHP;
           
            if(combatLogLaunch === 0){
                combatLogBlock.appendChild(combatLogElement);
                combatLogLaunch = 1;
                
            } else{
                combatLogBlock.insertBefore(combatLogElement,combatLogBlock.firstChild);
                if(computerHP == 95){
                    combatLogElement.textContent = 'Ай! Больно';
                }
                if(computerHP == 85){
                    combatLogElement.textContent = 'Что ж вы делаете то!';
                }
                if(computerHP == 65){
                    combatLogElement.textContent = 'Ну будьте же вы людьми!!';
                }
                if(computerHP == 50){
                    combatLogElement.textContent = 'Помогите!!';
                }
                if(computerHP == 10){
                    combatLogElement.textContent = 'Спасите!';
                }
                if(computerHP == 0){
                    combatLogElement.textContent = 'Вы убили снежного человека вам должно быть стыдно. Игра окончена для вас. Пришлите деньги на номер телефона по СМС..';
                }

            }
            combatLogLaunch++;
        }
        
        function computerStatusBar(){
            //
        }
    }
   
    play();
}


strategyGame();
