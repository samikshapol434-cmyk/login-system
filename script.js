
import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyBSu3FwaXk9-tGPvy7VTKekIQFTVCgckdk",
  authDomain: "database-92855.firebaseapp.com",
  databaseURL: "https://database-92855-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "database-92855",
  storageBucket: "database-92855.firebasestorage.app",
  messagingSenderId: "629161322645",
  appId: "1:629161322645:web:b560b8bfd484c611b6139c",
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


window.saveData = async function () {

  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;
  let mobile = document.getElementById("mobile").value;

  try {

    const studentRef = ref(db, "Students");

    await push(studentRef, {
      name: name,
      age: age,
      email: email,
      mobile: mobile
    });

    alert("Data Saved Successfully");

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mobile").value = "";

  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};


window.loadData = function () {

  const studentRef = ref(db, "Students");

  onValue(studentRef, (snapshot) => {

    let output = "";

    snapshot.forEach((child) => {

      let data = child.val();

      output += `
        <p>
          <b>Name:</b> ${data.name}<br>
          <b>Age:</b> ${data.age}<br>
          <b>Email:</b> ${data.email}<br>
          <b>Mobile:</b> ${data.mobile}
        </p>
        <hr>
      `;
    });

    document.getElementById("output").innerHTML = output;

  });

};