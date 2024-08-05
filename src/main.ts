import './style.css'
import { wsConnect } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web Socket Client</h1>

    <input id="token" placeholder="Json web token" />
    <button id="btn-connect">Connect</button>
    <br/>
    <span id="server-status">Offline</span>

    <ul id="clients-id">
    
    </ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-list"></ul>

  </div>
`

const inputToken = document.querySelector<HTMLInputElement>("#token")!;
const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect")!;

btnConnect.addEventListener("click", () => {

  if(!inputToken.value.trim().length) return alert("Ingrese un token válido");
  wsConnect(inputToken.value);
})