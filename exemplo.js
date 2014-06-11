// Estudo IndexedDB
//ref.: https://developer.mozilla.org/pt-BR/docs/IndexedDB/Usando_IndexedDB

const dbName = "clientes";

const DadosClientes = [
  { ssn: "444-44-4444", nome: "Bill", idade: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", nome: "Donna", idade: 32, email: "donna@home.org" }
];

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
  //Tratar erros.
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;

  var objectStore = db.createObject("clientes", { keyPath: "ssn" });

  objectStore.createIndex("nome", "nome", {unique: false});

  objectStore.createIndex("email", "email", {unique: true});

  objectStore.transition.oncomplete = function(event) {
    var clientesObjectStore = db.transition("clientes", "readwrite").objectStore("clientes");
    for (var i in DadosClientes) {
      clientesObjectStore.add(DadosClientes[i]);
    };
  }

};

