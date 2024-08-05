import { Manager, Socket } from "socket.io-client"

let socket: Socket; // undefined

export const wsConnect = (token: string) => {

    const manager = new Manager("localhost:3000/socket.io/socket.io.js", {
        extraHeaders: { // en los extra headers envia el token de autentucacion
            authentication: token
        }
    });

    socket?.removeAllListeners(); // borrar el socket anterior y todos los listeners
    socket = manager.socket('/');
    
    addListeners();
}


const addListeners = () => {

    const serverStatusSpan = document.querySelector("#server-status")!;
    const clientsIdList = document.querySelector("#clients-id")!;
    const messgeForm = document.querySelector<HTMLFormElement>("#message-form")!;
    const messageInput = document.querySelector<HTMLInputElement>("#message-input")!;
    const messagesList = document.querySelector("#messages-list")!;
    serverStatusSpan.innerHTML ="Offline"
    socket.on("connect", () => {
        serverStatusSpan.innerHTML = "Online";
    })

    socket.on("disconnect", () => {
        serverStatusSpan.innerHTML = "Disconnect";
    })

    socket.on("clients-updated", (payload: string[]) => {

        clientsIdList.innerHTML = '';

        payload.forEach(client => {
            const li = document.createElement("li");
            li.innerHTML = client;
            clientsIdList.appendChild(li)
        })
    });


    messgeForm.addEventListener("submit", e => {
        e.preventDefault();

        if (!messageInput.value.trim().length) return;

        socket.emit("message-from-client", {
            id: "",
            message: messageInput.value
        });

        messageInput.value = "";
    })

    socket.on("message-from-server", (data: { fullName: string, message: string }) => {
        console.log(data)
        const newMessageLi = `
        
                <strong> ${data.fullName} </strong>
                <strong> ${data.message} </strong>
         
        `;

        const li = document.createElement("li");
        li.innerHTML = newMessageLi;

        messagesList.appendChild(li);
    })
}