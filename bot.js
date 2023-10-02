
const mineflayer = require('mineflayer');
const Vec3 = require('vec3');

const options = {
    host: '',
  username: '',
  auth: 'microsoft',
  port: '25633',
  password: ''
};

let bot = mineflayer.createBot(options);

function login() {
  bot = mineflayer.createBot(options);

  bot.on('spawn', () => {
    const targetPoint = new Vec3(-838, 238, 31);
    bot.lookAt(targetPoint, true);
    setInterval(() => {
      if (bot.heldItem) {
        bot.activateItem();
      }
    }, 5 * 60 * 1000);
  });

  bot.on('kicked', (reason) => {
    console.log(`Kicked for reason: ${reason}`);
    setTimeout(login, 5 * 60 * 1000);
  });

  bot.on('end', () => {
    console.log('Bot has ended/disconnected. Reconnecting in 5 minutes...');
    setTimeout(login, 5 * 60 * 1000);
  });

  bot.on('error', console.log);
}

login();

