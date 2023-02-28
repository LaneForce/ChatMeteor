import { Messages } from '../collections/messages';

Messages.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
