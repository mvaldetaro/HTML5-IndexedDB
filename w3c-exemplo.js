// Estudo IndexedDB
var request = indexedDB.open("library");

request.onerror = function(event) {
  console.log("Opa! rolou um error.");
};

request.onupgradeneeded = function() {
  // The database did not previously exist, so create object stores and indexes.
  var db = request.result;
  var store = db.createObjectStore("books", {keyPath: "isbn"});
  var titleIndex = store.createIndex("title", "title", {unique: true});
  var authorIndex = store.createIndex("author", "author");

  // Populate with initial data.
  store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
  store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
  store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
};

request.onsuccess = function() {
  db = request.result;
};

