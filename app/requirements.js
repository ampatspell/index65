const loggedIn = ({ user }) => {
  if(!user) {
    return 'login';
  }
  return null;
};

const anonymous = ({ user }) => {
  if(user) {
    return 'logged-in';
  }
  return null;
};

const member = ({ user }) => {
  if(!user) {
    return 'login';
  }
  if(!user.isAdmin && !user.isMember) {
    return 'denied';
  }
  return null;
};

const admin = ({ user }) => {
  if(!user) {
    return 'login';
  }
  if(!user.isAdmin) {
    return 'denied';
  }
  return null;
};

export default {
  loggedIn,
  anonymous,
  member,
  admin
}