const square = document.querySelector(".square");
const squareI = document.querySelector(".squareI");
const squareII = document.querySelector(".squareII");
const squareIII = document.querySelector(".squareIII");
const peashooter = document.getElementById("peashooter");
const sunflower = document.querySelector(".sunflower");
const squares = document.querySelectorAll(".square");
const infoDisplay = document.querySelector("#info");
let body = document.querySelector("body");
let energyTotal = document.querySelector("i");
let generateZombie;
let moveZombie;
let enemyCounter = 400;
let energy = 200;
let plantType = 0;

//Lawn Mower

for (let i = 1; i < 6; i++) {
  let lawnMower = document.createElement("div");
  lawnMower.classList.add("lawnMower");
  lawnMower.style.left = gamestage.getBoundingClientRect().left - 100 + "px";
  row = document.getElementById("row" + i);
  row.append(lawnMower);
}

//select Plant

squareI.addEventListener("mousedown", () => {
  if (plantType != 1) {
    plantType = 1;
    squareII.classList.remove("yellow");
    squareI.classList.add("yellow");
    squareIII.classList.remove("yellow");
  }
});

squareII.addEventListener("mousedown", () => {
  if (plantType != 2) {
    plantType = 2;
    squareI.classList.remove("yellow");
    squareII.classList.add("yellow");
    squareIII.classList.remove("yellow");
  }
});

squareIII.addEventListener("mousedown", () => {
  if (plantType != 3) {
    plantType = 3;
    squareI.classList.remove("yellow");
    squareII.classList.remove("yellow");
    squareIII.classList.add("yellow");
  }
});

//Planting Plants

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (plantType == 1) {
      if (energy >= 100) {
        if (!square.hasChildNodes()) {
        let peashooterNew = document.createElement("div");
        peashooterNew.classList.add("peashooter");
        peashooterNew.classList.add("plant");
        // let shoot
        // shoot = setInterval(shootPea, 4000);
        square.appendChild(peashooterNew);
        energy = energy - 100;
        energyTotal.textContent = energy;
        peashooterNew.hp = 100
       }  else { }
      }
    } else if (plantType == 2) {
      if (energy >= 50) {
        if (!square.hasChildNodes()) {
        let sunflowerNew = document.createElement("div");
        sunflowerNew.classList.add("sunflower");
        sunflowerNew.classList.add("plant");
        square.appendChild(sunflowerNew);
        energy = energy - 50;
        energyTotal.textContent = energy;
        sunflowerNew.hp = 80
        }  else {}
       }
    } else if (plantType == 3) {
      if (energy >= 50) {
        if (!square.hasChildNodes()) {
        let wallnutNew = document.createElement("div");
        wallnutNew.classList.add("wallnut");
        wallnutNew.classList.add("plant");
        square.appendChild(wallnutNew);
        energy = energy - 50;
        energyTotal.textContent = energy;
        wallnutNew.hp = 200;
        }  else {}
       }
      }
    });
});




//generate Energy with Sunflower
setInterval(() => {
 let sunflowers = document.querySelectorAll(".sunflower");
 sunflowers.forEach((sunflower) => {
    energy = energy + 25;
    energyTotal.textContent = energy;
    let sunNew = document.createElement("div");
    sunNew.classList.add("sun");
    sunflower.appendChild(sunNew);
    setTimeout(() => {
      sunNew.remove();
    }, 700);
  });
}, 24000);

//Wallnut degrade
setInterval(() => {
 let wallnuts = document.querySelectorAll(".wallnut");
 wallnuts.forEach((wallnut) => {
    if (wallnut.hp <= 100) {
     wallnut.style.backgroundImage = ("url('./img/Wallnut_cracked1.webp')");
    }
    if (wallnut.hp <= 50){
     wallnut.style.backgroundImage = ("url('./img/Wallnut_cracked2.webp')");
    }
});
}, 10);

// Generate Sun that falls from the Sky
setInterval(() => {
  let sunFall = document.createElement("div");
  sunFall.classList.add("sunFall");
  gamestage.append(sunFall);
  sunFall.style.left =
    Math.random() * gamestage.getBoundingClientRect().bottom + "px";
  const sunsFalling = document.querySelectorAll(".sunFall");
  sunsFalling.forEach((element) => {
    element.addEventListener("mousedown", () => {
      element.remove();
      energy = energy + 25;
      energyTotal.textContent = energy;
    });
  });
}, 8000);

//Sun Falling speed
setInterval(() => {
  let suns = document.querySelectorAll(".sunFall");
  suns.forEach((element) => {
    element.style.top = element.getBoundingClientRect().top + 0.1 + "px";
    if (
      element.getBoundingClientRect().bottom >
      gamestage.getBoundingClientRect().bottom + 50
    ) {
      element.remove();
    }
  });
}, 50);

//generate Projectile
setInterval( () => {
    peashooters = document.querySelectorAll(".peashooter");
    peashooters.forEach((peashooter) => {
    let bala = document.createElement("div");
    bala.classList.add("bala");
    bala.style.left = peashooter.getBoundingClientRect().left + 60 + "px";
    bala.style.top = peashooter.getBoundingClientRect().top + 11 + "px";
    gamestage.append(bala);
  });
}, 8000)

//Bullet movement
setInterval( () => {
  let balas = document.querySelectorAll(".bala");
  balas.forEach((bala) => {
    bala.style.left = bala.getBoundingClientRect().right - 15 + "px";

    if (
      bala.getBoundingClientRect().left >=
      gamestage.getBoundingClientRect().right + 201
    ) {
      bala.remove();
    }
    //Collision Detection on Zombie
    let zombies = document.querySelectorAll("div.zombie, div.zombieEating");

    zombies.forEach((zombie) => {
      if (
        bala.getBoundingClientRect().left >= zombie.getBoundingClientRect().left
      ) {
        if (
          bala.getBoundingClientRect().top >=
            zombie.getBoundingClientRect().top &&
          bala.getBoundingClientRect().top <=
            zombie.getBoundingClientRect().top + 150
        ) {
          bala.remove();
          if (zombie.hp > 1 ) {
          zombie.hp = zombie.hp -1
         } else {
          zombie.style.backgroundImage = "url('./img/explosion.gif')";
          if (enemyCounter > 0) {
            enemyCounter = enemyCounter - 28;
          } else {
            clearInterval(generateZombie);
            clearInterval(moveZombie);
            alert("YOU WIN!");
            location.replace("./index.html");
          }
          setTimeout(() => {
            zombie.remove();
          }, 700); }
        }
      }
    });


    //Collision Detection on Saitama
    let saitamas = document.querySelectorAll("div.saitama, div.saitamaPunch");

    saitamas.forEach((zombie) => {
      if (
        bala.getBoundingClientRect().left >= zombie.getBoundingClientRect().left
      ) {
        if (
          bala.getBoundingClientRect().top >=
            zombie.getBoundingClientRect().top &&
          bala.getBoundingClientRect().top <=
            zombie.getBoundingClientRect().top + 150
        ) {
          bala.remove();
          if (zombie.hp > 1 ) {
          zombie.hp = zombie.hp -1
         } else {
          zombie.style.backgroundImage = "url('./img/saitamaDies.gif')";
          if (enemyCounter > 0) {
            enemyCounter = enemyCounter - 28;
          } else {
            clearInterval(generateZombie);
            clearInterval(moveZombie);
            alert("YOU WIN!");
            location.replace("./index.html");
          }
          setTimeout(() => {
            zombie.remove();
          }, 700); }
        }
      }
    });


    //Collision Detection on Grut
    let gruts = document.querySelectorAll("div.grut, div.grutAttaking");

    gruts.forEach((zombie) => {
      if (
        bala.getBoundingClientRect().left >= zombie.getBoundingClientRect().left
      ) {
        if (
          bala.getBoundingClientRect().top >=
            zombie.getBoundingClientRect().top &&
          bala.getBoundingClientRect().top <=
            zombie.getBoundingClientRect().top + 150
        ) {
          bala.remove();
          if (zombie.hp > 1 ) {
          zombie.hp = zombie.hp -1
         } else {
          zombie.style.backgroundImage = "url('./img/grutDies.gif')";
          if (enemyCounter > 0) {
            enemyCounter = enemyCounter - 28;
          } else {
            clearInterval(generateZombie);
            clearInterval(moveZombie);
            alert("YOU WIN!");
            location.replace("./index.html");
          }
          setTimeout(() => {
            zombie.remove();
          }, 700); }
        }
      }
    });


  });
},10)




//Zombie Spawn
let spawn = 0;
function spawnZombies() {
  spawn++;
  if (spawn % 203 == 0) {
    let zombie = document.createElement("div");
    zombie.classList.add("zombie");
    zombie.style.right = gamestage.getBoundingClientRect().left - 200 + "px";
    rand = Math.floor(Math.random() * 5) + 1;
    randRow = "row" + rand;
    row = document.getElementById(randRow);
    row.append(zombie);
    zombie.hp = 3
  }
}

generateZombie = setInterval(spawnZombies, 100);

// Zombie Speed
function zombieSpeed() {
  let zombies = document.querySelectorAll("div.zombie");
  zombies.forEach((element) => {
    element.style.left = element.getBoundingClientRect().left - 0.3 + "px";

    //Game over;
    if (
      element.getBoundingClientRect().left <
      gamestage.getBoundingClientRect().left - 100
    ) {
      element.remove();
      clearInterval(generateZombie);
      clearInterval(moveZombie);
      alert("YOU LOSE!");
      location.replace("./index.html");
    }
    //Lawn Mower Defends
    let defenders = document.querySelectorAll(".lawnMower");
    defenders.forEach((defender) => {
      if (
        element.getBoundingClientRect().bottom >=
          defender.getBoundingClientRect().top &&
        element.getBoundingClientRect().right >=
          defender.getBoundingClientRect().left - 50 &&
        element.getBoundingClientRect().left <=
          defender.getBoundingClientRect().right &&
        element.getBoundingClientRect().top <=
          defender.getBoundingClientRect().bottom
      ) {
        element.style.backgroundImage = "url('./img/explosion.gif')";
        if (enemyCounter >= 0) {
          enemyCounter = enemyCounter - 1;
        } else {
          clearInterval(generateZombie);
          clearInterval(moveZombie);
          alert("YOU WIN!");
          location.replace("./index.html");
        }
        setTimeout(() => {
          element.remove();
        }, 400);
        setInterval(() => {
          defender.style.left =
            defender.getBoundingClientRect().right - 100 + "px";
          if (
            defender.getBoundingClientRect().left >=
            gamestage.getBoundingClientRect().right + 100
          ) {
            defender.remove();
          }
        }, 100);
      }
    });

    //Zombie Collision

    let plants = document.querySelectorAll(".plant");
    plants.forEach((plant) => {
      if (
        element.getBoundingClientRect().bottom >=
          plant.getBoundingClientRect().top &&
        element.getBoundingClientRect().right >=
          plant.getBoundingClientRect().left &&
        element.getBoundingClientRect().left <=
          plant.getBoundingClientRect().right - 50 &&
        element.getBoundingClientRect().top <=
          plant.getBoundingClientRect().bottom
      ) {
        element.classList.remove("zombie");
        element.classList.add("zombieEating");
        element.style.left = element.getBoundingClientRect().left;
         let interval = setInterval(() => {
         if (element.hp > 1){
          if (plant.hp >= 0) {
            plant.hp -= 1;
          }
          if (plant.hp <= 0) {
            plant.remove();
            element.classList.remove("zombieEating");
            element.classList.add("zombie");
            clearInterval(interval)
          }
         } else {
          clearInterval(interval)
          element.style.backgroundImage = "url('./img/explosion.gif')";
          setTimeout(() => {
            element.remove();
          }, 1400); }
        }, 100);
      }
    });
  });
}

moveZombie = setInterval(zombieSpeed, 10);


//Saitama Spawn
let spawnSaitama = 0;
function spawnSaitamaGenerator() {
  spawnSaitama++;
  if (spawnSaitama == 100) {
    let saitama = document.createElement("div");
    saitama.classList.add("saitama");
    saitama.style.right = gamestage.getBoundingClientRect().left - 200 + "px";
    rand = Math.floor(Math.random() * 5) + 1;
    randRow = "row" + rand;
    row = document.getElementById(randRow);
    row.append(saitama);
    saitama.hp = 3
  }
}

generateSaitama = setInterval(spawnSaitamaGenerator, 100);

// Saitama Speed
function saitamaSpeed() {
  let saitamas = document.querySelectorAll("div.saitama");
  saitamas.forEach((element) => {
    element.style.left = element.getBoundingClientRect().left - 0.3 + "px";

    //Game over;
    if (
      element.getBoundingClientRect().left <
      gamestage.getBoundingClientRect().left - 100
    ) {
      element.remove();
      clearInterval(generateSaitama);
      clearInterval(moveSaitama);
      alert("YOU LOSE!");
      location.replace("./index.html");
    }
    //Lawn Mower Defends
    let defenders = document.querySelectorAll(".lawnMower");
    defenders.forEach((defender) => {
      if (
        element.getBoundingClientRect().bottom >=
          defender.getBoundingClientRect().top &&
        element.getBoundingClientRect().right >=
          defender.getBoundingClientRect().left - 50 &&
        element.getBoundingClientRect().left <=
          defender.getBoundingClientRect().right &&
        element.getBoundingClientRect().top <=
          defender.getBoundingClientRect().bottom
      ) {
        element.style.backgroundImage = "url('./img/saitamaDies.gif')";
        if (enemyCounter >= 0) {
          enemyCounter = enemyCounter - 1;
        } else {
          clearInterval(generateSaitama);
          clearInterval(moveSaitama);
          alert("YOU WIN!");
          location.replace("./index.html");
        }
        setTimeout(() => {
          element.remove();
        }, 400);
        setInterval(() => {
          defender.style.left =
            defender.getBoundingClientRect().right - 100 + "px";
          if (
            defender.getBoundingClientRect().left >=
            gamestage.getBoundingClientRect().right + 100
          ) {
            defender.remove();
          }
        }, 100);
      }
    });

    //Saitama Collision

    let plants = document.querySelectorAll(".plant");
    plants.forEach((plant) => {
      if (
        element.getBoundingClientRect().bottom >=
          plant.getBoundingClientRect().top &&
        element.getBoundingClientRect().right >=
          plant.getBoundingClientRect().left &&
        element.getBoundingClientRect().left <=
          plant.getBoundingClientRect().right - 50 &&
        element.getBoundingClientRect().top <=
          plant.getBoundingClientRect().bottom
      ) {
        element.classList.remove("saitama");
        element.classList.add("saitamaPunch");
        element.style.left = element.getBoundingClientRect().left;
         let interval = setInterval(() => {
         if (element.hp > 1){
          setTimeout(() => {
          plant.style.backgroundImage = "url('./img/plantexplodes.gif')";
         }, 500);
         setTimeout(() => {
            plant.remove();
            element.classList.remove("saitamaPunch");
            element.classList.add("saitama");
           },1000 );
         } else {
          clearInterval(interval)
          element.style.backgroundImage = "url('./img/saitamaDies.gif')";
          setTimeout(() => {
            element.remove();
          }, 1400); }
          clearInterval(interval)
        }, 100);
      }
    });
  });
}

moveSaitama = setInterval(saitamaSpeed, 10);

//Grut Spawn
let spawnGrut = 0;
function spawnGrutGenerator() {
  spawnGrut++;
  if (spawnGrut % 605 == 0) {
    let grut = document.createElement("div");
    grut.classList.add("grut");
    grut.style.right = gamestage.getBoundingClientRect().left - 200 + "px";
    rand = Math.floor(Math.random() * 5) + 1;
    randRow = "row" + rand;
    row = document.getElementById(randRow);
    row.append(grut);
    grut.hp = 6
  }
}

generateGrut = setInterval(spawnGrutGenerator, 100);

// Grut Speed
function grutSpeed() {
  let gruts = document.querySelectorAll("div.grut");
  gruts.forEach((element) => {
    element.style.left = element.getBoundingClientRect().left - 0.3 + "px";

    //Game over;
    if (
      element.getBoundingClientRect().left <
      gamestage.getBoundingClientRect().left - 100
    ) {
      element.remove();
      clearInterval(generateGrut);
      clearInterval(moveGrut);
      alert("YOU LOSE!");
      location.replace("./index.html");
    }
    //Lawn Mower Defends
    let defenders = document.querySelectorAll(".lawnMower");
    defenders.forEach((defender) => {
      if (
        element.getBoundingClientRect().bottom >=
          defender.getBoundingClientRect().top &&
        element.getBoundingClientRect().right >=
          defender.getBoundingClientRect().left - 50 &&
        element.getBoundingClientRect().left <=
          defender.getBoundingClientRect().right &&
        element.getBoundingClientRect().top <=
          defender.getBoundingClientRect().bottom
      ) {
        element.style.backgroundImage = "url('./img/grutDies.gif')";
        if (enemyCounter >= 0) {
          enemyCounter = enemyCounter - 1;
        } else {
          clearInterval(generateGrut);
          clearInterval(moveGrut);
          alert("YOU WIN!");
          location.replace("./index.html");
        }
        setTimeout(() => {
          element.remove();
        }, 400);
        setInterval(() => {
          defender.style.left =
            defender.getBoundingClientRect().right - 100 + "px";
          if (
            defender.getBoundingClientRect().left >=
            gamestage.getBoundingClientRect().right + 100
          ) {
            defender.remove();
          }
        }, 100);
      }
    });

    //Grut Collision

    let plants = document.querySelectorAll(".plant");
    plants.forEach((plant) => {
      if (
        element.getBoundingClientRect().bottom >=
          plant.getBoundingClientRect().top &&
        element.getBoundingClientRect().right >=
          plant.getBoundingClientRect().left &&
        element.getBoundingClientRect().left <=
          plant.getBoundingClientRect().right - 50 &&
        element.getBoundingClientRect().top <=
          plant.getBoundingClientRect().bottom
      ) {
        element.classList.remove("grut");
        element.classList.add("grutAttaking");
        element.style.left = element.getBoundingClientRect().left;
         let interval = setInterval(() => {
         if (element.hp > 1){
          if (plant.hp >= 0) {
            plant.hp -= 1;
          }
          if (plant.hp <= 0) {
            plant.remove();
            element.classList.remove("grutAttaking");
            element.classList.add("grut");
            clearInterval(interval)
          }
         } else {
          clearInterval(interval)
          element.style.backgroundImage = "url('./img/grutDies.gif')";
          setTimeout(() => {
            element.remove();
          }, 1400); }
        }, 100);
      }
    });
  });
}

moveGrut = setInterval(grutSpeed, 10);
