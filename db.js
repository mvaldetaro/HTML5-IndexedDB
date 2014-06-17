// http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

var todoDB = (function() {
  var tDB = {};
  var datastore = null;

  // -------------------------------------------------------------------
  // Abre conexão
  // -------------------------------------------------------------------

  tDB.open = function(callback) {
    // Versão do DB
    var version = 1;
    // Abre conexão para o armazenamento de dados
    var request = indexedDB.open('todos', version);
    // Tratando atualizações de armazenamento de dados.
    request.onupgradeneeded = function(e) {
      var db = e.target.result;
      e.target.transaction.onerror = tDB.onerror;

      // Remove armazenamento de dados antigos.
      if (db.objectStoreNames.contains('todo')) {
        db.deleteObjectStore('todo');
      }

      //Cria um novo armazenamento de dados
      var store = db.createObjectStore('todo', { keyPath: 'timestamp' });
    };

    // Tratando acesso com sucesso
    request.onsucess = function(e) {
      // Obter uma referência para o DB.
      datastore = e.target.result;
      // Executa a callback.
      callback();
    };
    // Tratando erros quando o armazenamento de dados é acessado
    request.onerror = tDB.onerror;
  }

  // -------------------------------------------------------------------
  // Busca todos os itens no armazenamento de dados.
  // -------------------------------------------------------------------

  tDB.fetchTodos = function(callback) {
    var db = datastore;
    var transaction = db.transaction(['todo'], 'readwrite');
    var objStore = transaction.objectStore('todo');

    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = objStore.openCursor(keyRange);

    var todos = [];

    transaction.oncomplete = function(e) {
      // Executa a função de callback
      callback(todos);
    };

    cursorRequest.onsucess = function(e) {
      var result = e.target.result;

      if (!!result == false) {
        return;
      }

      todos.push(result.value);

      result.continue();
    };

    cursorRequest.onerror = tDB.onerror;
  };

  // -------------------------------------------------------------------
  // Cria um novo item
  // -------------------------------------------------------------------

  tDB.createTodo = function(text, callback) {
    // Obter uma referência para a db.
    var db = datastore;
    // Inicia uma nova transação.
    var transaction = db.transaction(['todo'],'readwrite');
    // Obter o armazenamento de dados.
    var objStore = transaction.objectStore('todo');
    // Criar um timestamp para o item de tarefas.
    var timestamp = new Date().getTime();
    // Cria um objeto para o item de tarefas.
    var todo = {
      'text': text,
      'timestamp': timestamp
    };
    // Cria o pedido de armazenamento de dados.
    var request = objStore.put(todo);
    // Trata o armazenamento de dados bem sucedido
    request.onsucess = function(e) {
      // Executa a função de callback
      callback(todo);
    };
    // Trata os erros
    request.onerror = tDB.onerror;
  };


  return tDB;
}());


