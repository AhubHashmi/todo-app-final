// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBN11erqT8YokPlsHVG9qT3lCmkuWe9ULc",
    authDomain: "todoapp-adcf9.firebaseapp.com",
    projectId: "todoapp-adcf9",
    storageBucket: "todoapp-adcf9.appspot.com",
    messagingSenderId: "1091175190218",
    appId: "1:1091175190218:web:0fe340a7111379f2d6ae33",
    measurementId: "G-70PBYHCBQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const databs = getDatabase();


// var list = document.getElementById("list");

// firebase.database().ref('todos').on('child_added', function(data) {
//     var li = document.createElement('li')
//     var liText = document.createTextNode(data.val().value)
//     li.appendChild(liText)

//     var editBtn = document.createElement("button");
//     var editText = document.createTextNode("Edit")
//     editBtn.setAttribute("class", "btn")
//     delBtn.setAttribute('id', data.val().key)
//     editBtn.setAttribute("onclick", "editItem(this)")
//     editBtn.appendChild(editText)

//     var delBtn = document.createElement("button")
//     var delText = document.createTextNode("Delete")
//     delBtn.setAttribute("class", "btn")
//     delBtn.setAttribute('id', data.val().key)
//     delBtn.setAttribute("onclick", "deleteItem(this)")
//     delBtn.appendChild(delText)

//     li.appendChild(editBtn)
//     li.appendChild(delBtn)

//     list.appendChild(li)
// })

// window.addTodo = function() {
//     var todo_item = document.getElementById("todo-item");
//     var database = firebase.database().ref('todos')
//     var key = database.push().key;
//     var todo = {
//         value: todo_item.value,
//         key: key
//     }
//     database.child(key).set(todo)
//         // var reference = ref(databs, 'todo-items/')
//         // set(reference, todo)
//     todo_item.value = ""
// };

// window.deleteItem = function(e) {
//     firebase.database().ref('todos').child(e.id).remove()
//     e.parentNode.remove()
// }

// window.editItem = function(e) {
//     var val = prompt("Update Chore/Routine... " + e.parentNode.firstChild.nodeValue)
//     var editTodo = {
//         value: val,
//         key: e.id
//     }
//     firebase.database().ref('todos').child(e.id).set(editTodo)

//     e.parentNode.firstChild.nodeValue = val;
// }

// window.deleteAll = function() {
//     list.innerHTML = ""
// }

var list = document.getElementById("list");

window.addTodo = function() {
    var todo_item = document.getElementById("todo-item");
    var li = document.createElement('li')
    var liText = document.createTextNode(todo_item.value)
    li.appendChild(liText)

    var editBtn = document.createElement("button");
    var editText = document.createTextNode("Edit")
    editBtn.setAttribute("class", "btn")
    editBtn.setAttribute("onclick", "editItem(this)")
    editBtn.appendChild(editText)

    var delBtn = document.createElement("button")
    var delText = document.createTextNode("Delete")
        // delBtn.setAttribute("class", "btn")
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.appendChild(delText)

    li.appendChild(editBtn)
    li.appendChild(delBtn)

    list.appendChild(li)

    // todo_item.value = ""

    console.log(todo_item.value);
    // var reference = ref(databs, "Chores/");
    var id = Math.random().toString().slice(2);
    var obj = {
        text: todo_item.value,
        id: id,
        dt: new Date().getHours() + new Date().getMinutes() + new Date().getSeconds(),
    };
    console.log(obj);
    var reference = ref(databs, "chores/" + id + '/');
    var newRef = push(reference);
    obj.id = newRef.key;
    set(newRef, obj);
};

var choresData;

function renderChores() {
    var parent = document.getElementById("dispChores");
    parent.innerHTML = "";
    for (var i = 0; i < choresData.length; i++) {
        parent.innerHTML += `<div><p>${choresData[i].text}</p>
        <p>Time: ${choresData[i].dt}</p>
        </div>`;
    }
}

function getChores() {
    var reference = ref(databs, "chores/");
    onValue(reference, function(data) {
        choresData = object.values(data.val());
        console.log(choresData);
        renderChores();
    });
}
getChores();

window.deleteItem = function(e) {
    e.parentNode.remove()
}

window.editItem = function(e) {
    var val = prompt("Update Chore/Routine... " + e.parentNode.firstChild.nodeValue)
    e.parentNode.firstChild.nodeValue = val;
    console.log(val);
}

window.deleteAll = function() {
    list.innerHTML = ""
}