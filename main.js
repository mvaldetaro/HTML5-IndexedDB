//Namespace
var estudo = {};

estudo.indexedDB = {};
estudo.indexedDB.db = null;

// Abrindo BD e criando armazenamento de objetos

// Abre o BD
estudo.indexedDB.open = function() {
  var request = indexedDB.open("todos", "Descrição do banco de dados");
  // "todos" é o nome do banco de dados
  request.onsuccess = function(e) {
    var v = "1.0";
    estudo.indexedDB.db = e.target.result;
    var db = estudo.indexedDB.db;

    //Verifica a versão
    if (v!= db.version) {
      var setVrequest = db.version(v);

      setVrequest.on.failure = estudo.indexedDB.onerror;
      setVrequest.onsuccess = function(e) {
        //Cria o armazenamento de objetos
        var store = db.createObjectStore("todo", {keyPath: "timeStamp"});

        estudo.indexedDB.getAllTodoItems();
      };
    }
    estudo.indexedDB.getAllTodoItems();
  };

  request.onfailure = estudo.indexedDB.onerror;
};
