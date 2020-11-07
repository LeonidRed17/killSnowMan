function strategyGame(){
    alert('Да здравствует новое время!! в новой игре!')
    alert('Вас приветствует сыр-бор продукшен и святозор! Мы выпускаем игры!!!')
    alert('При производстве игры наш двор убирала снегоуборочная техника!! спасибо!')
    alert('Добро пожаловать в "Убийство Снежного человека 2"')
    alert('Попробуй пройти её и ты!! и все друзья!!!')
    function play(){
        var resultBlock = document.getElementById("result");
        var playerHP = 100;
        var playerDamage = 1;
        var chance = 0;
        var computerHP = 100;
        var computerDamage = 0.5;
        function attackEnemy(){
            computerHP -= 1;
            resultBlock.innerText = ('враг атакован -1hp здоровья врага: ' + computerHP);
            if(computerHP <90){
                computerHP = 100;
                chance +=1;
                resultBlock.innerText = ('Я вылечился, отстань!! держись!!!');
                if(chance >= 5){
                    alert('МОжет эта игра тебе не позубам!??');
                    chance = 0;
                }
            }
        }

    addEventListener("click",attackEnemy);
    }
    play();
}

strategyGame();