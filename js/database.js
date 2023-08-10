const firebaseConfig = {
    apiKey: "AIzaSyCfOXntDOpCNCl7Seoxh3HW9BezPnjwP4I",
    authDomain: "facerecognation-d992b.firebaseapp.com",
    projectId: "facerecognation-d992b",
    storageBucket: "facerecognation-d992b.appspot.com",
    messagingSenderId: "258622090070",
    appId: "1:258622090070:web:2e7bd36eb91efebe2a44f7",
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebaseApp.auth();

  const db = firebaseApp.firestore();

const date = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

const hourTime = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })
const hour = hourTime.slice(0,2)

async function getAllData({name}) {

    let data = []

    await db.collection("absent-facerecog")
      .get()  
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
         if(doc.data().name == name) data.push(doc.data())
        });
      });

    return data
}


async function getDataToday({name}) {

    let data = []

    await db.collection("absent-facerecog")
        .where("date", "==", date)
        .where("name", "==", name)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
        });
    
    return data
}

async function addData({name}) {

    const  today = await getDataToday({name: name})

    if(today.length > 0) return window.location.href = `/success.html?name=${name}&already=1`;
    
    let late = 9 - hour
    const description = hour > 9 ? `${Math.abs(late)} hours late` : "On Time"

    db.collection("absent-facerecog")
      .add({
        name: name,
        description: description,
        date: date,
        hour: hourTime,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        if(description == "On Time") window.location.href = `/success.html?name=${name}&already=3`;
        else window.location.href = `/success.html?name=${name}&already=0`;
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }