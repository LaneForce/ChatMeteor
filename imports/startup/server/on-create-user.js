import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((opts = {}, user) => {
  return Object.assign(user, { 
    border: opts.border || 1, 
    avatar: opts.avatar || 1, 
  });
});
