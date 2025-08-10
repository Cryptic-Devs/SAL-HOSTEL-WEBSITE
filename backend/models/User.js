module.exports = {
  roles: ['student', 'admin'],
  validateUserData(user) {
    if (!user.username || !user.email || !user.password) {
      return false;
    }
    return true;
  }
};
