
const mineflayer = require('mineflayer');
const Vec3 = require('vec3');

const options = {
    host: '',
  username: '',
  auth: 'microsoft',
  port: '25633',
  password: ''
};

let bot;
let isOnline = false;
let activateItemInterval;

function startActivateItemCycle() {
  if (activateItemInterval) {
    clearInterval(activateItemInterval);
  }
  activateItemInterval = setInterval(() => {
    if (isOnline && bot.heldItem) {
      bot.activateItem();
    }
  }, 5 * 60 * 1000);
}

function login() {
  bot = mineflayer.createBot(options);

  bot.on('spawn', () => {
    isOnline = true;
    const targetPoint = new Vec3(-838, 238, 31);
    if (isOnline) {
      bot.lookAt(targetPoint, true);
      startActivateItemCycle();
    }
  });

  bot.on('kicked', (reason, loggedIn) => {
    isOnline = false;
    console.log(`Kicked for reason: ${reason}`);
    if (!loggedIn) {
      console.log("Duplicate login detected. Waiting for 5 minutes...");
      setTimeout(login, 5 * 60 * 1000);
    }
  });

  bot.on('end', () => {
    isOnline = false;
    console.log('Bot has ended/disconnected. Reconnecting in 5 minutes...');
    setTimeout(login, 5 * 60 * 1000);
  });

  bot.on('error', console.log);
}

login();
