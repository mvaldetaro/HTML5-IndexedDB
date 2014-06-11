// Estudo IndexedDB
//ref.: https://developer.mozilla.org/pt-BR/docs/IndexedDB/Usando_IndexedDB

// Na linha abaixo, você deve incluir os prefixos do navegador que você vai testar.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransition = window.IDBTransition || window.weblitIDBTransition || window.msIDBTransition;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla nunca usou prefixo nesses objetos, então não precisamos window.mozIDB*)

if (!window.indexedDB) {
  window.alert("Este navegador não suporta uma versão estável do IndexedDB. Alguns recursos não disponíveis.");
  console.log("Este navegador não suporta uma versão estável do IndexedDB. Alguns recursos não disponíveis.");
};

//Abrindo um banco
var db;
var request = window.indexedDB.open("DBTeste", 3);

// Trata o erro a cada request
request.onerror = function(event) {
  alert("Você não habilitou minha web app para usar IndexedDB?!");
};

request.onsuccess = function(event) {
  db = request.result;
};

// Este evento é implementado somente em navegadores mais recentes
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // cria um objectStore para esse banco
  var objectStore = db.createObjectStore("nome", { keyPath: "minhaChave" });

};

