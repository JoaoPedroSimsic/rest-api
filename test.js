const User = require('./src/models/User');

(async () => {
  try {
    const newUser = await User.create({
      name: 'aaaa',
      email: 'adsad@email.com',
      password: '123456',
    });
    console.log('usr', newUser);
  } catch (e) {
    console.log('error');
  }
})();
