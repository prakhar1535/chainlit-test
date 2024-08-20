export { MessageContainer } from './MessageContainer';
// utils.js (or any utility file)
export function getOrCreateUUID() {
  let uuid = localStorage.getItem('user_uuid');
  if (!uuid) {
    uuid = crypto.randomUUID(); // Alternatively, use a UUID library
    localStorage.setItem('user_uuid', uuid);
  }
  return uuid;
}
