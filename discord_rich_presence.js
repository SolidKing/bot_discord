const { Client } = require('discord-rpc/browser');
 
const clientID = '430471196853927936';
const scopes = ['rpc', 'rpc.api', 'messages.read'];
 
// This demonstrates discord's implicit oauth2 flow
// http://discordapi.com/topics/oauth2#implicit-grant
 
const params = new URLSearchParams(document.location.hash.slice(1));
 
const accessToken = params.has('access_token') ?
  params.get('access_token') : localStorage.accessToken;
localStorage.accessToken = accessToken;
 
if (!accessToken) {
  // Redirect to discord to get an access token
  document.location.href = `https://discordapp.com/oauth2/authorize?response_type=token&client_id=${clientID}&scope=${scopes.join(' ')}`;
}
 
const client = new Client({ transport: 'websocket' });
 
client.on('ready', () => {
  console.log('Logged in as', client.application.name);
  console.log('Authed for user', client.user.tag);
 
  client.selectVoiceChannel('81384788862181376');
});
 
// Log in to RPC with client id and access token
client.login(clientID, { accessToken, scopes });