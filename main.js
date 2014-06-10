//Namespace
var mydb = {};
mydb.indexedDB = {};

// Abrir o banco de dados
mydb.indexedDB = null;

mydb.indexedDB.open = function() {
  var request = indexedDB.open("todos");

  request.onsuccess = function(e) {
    mydb.indexedDB.db = e.target.result;
  };

  request.onfailure = mydb.indexedDB.onerror;
}
