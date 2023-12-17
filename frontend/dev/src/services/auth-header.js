export default function authHeader(state = 'main', method = 'dict') {
  const user = JSON.parse(localStorage.getItem('_auth'));
  const actions = { main: 'accs_token', refresh: 'rfsh_token' };
  let resp = null;
  let smallResp = null;
  if (user) {
    resp = { Authorization: `Bearer ${user[actions[state]]}` };
    smallResp = `Bearer ${user[actions[state]]}`;
  }
  return method === 'dict' ? resp : smallResp;
}
