import io from 'socket.io-client';

var socket = io();
var authentication = "hamsterjumpAuthentication";

function saveAuthentication(uniqueId) {
  localStorage.setItem(authentication, uniqueId);
}

function getAuthentication() {
  return localStorage.getItem(authentication);
}

function removeAuthentication() {
  localStorage.removeItem(authentication);
}

export default {
  init: function () {

    // => some ideas for identification of the user
    socket.on("authenticate", function (data) {
      saveAuthentication(data.uniqueId);
    });

    var id = getAuthentication();
    socket.emit("authenticate", { uniqueId: id });

    window.addEventListener("beforeunload", function () {
      socket.disconnect();
    });
  }
};

