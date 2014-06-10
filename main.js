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

