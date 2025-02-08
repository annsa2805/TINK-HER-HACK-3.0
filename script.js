import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcbEpLUebQj0rQJjYw2WhYSvvOUgMqii0",
    authDomain: "wardrobe-genie-39bdb.firebaseapp.com",
    projectId: "wardrobe-genie-39bdb",
    storageBucket: "wardrobe-genie-39bdb.firebasestorage.app",
    messagingSenderId: "205233556785",
    appId: "1:205233556785:web:f45ff6719dc589076e3410",
    measurementId: "G-W4EQT04790"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

window.uploadOutfits = async function() {
    let input = document.getElementById("uploadImage");
    let files = input.files;

    if (files.length === 0) {
        alert("Please select images to upload!");
        return;
    }

    for (let file of files) {
        let storageRef = ref(storage, `outfits/${file.name}`);
        await uploadBytes(storageRef, file);
    }
    
    alert("Images uploaded successfully!");
    loadOutfits(); // Refresh outfit gallery
};

// Load outfits dynamically from Firebase Storage
async function loadOutfits() {
    let outfitGallery = document.getElementById("suggestedOutfit");
    outfitGallery.innerHTML = ""; // Clear previous images

    let storageRef = ref(storage, "outfits/");
    let outfitList = await listAll(storageRef);

    for (let item of outfitList.items) {
        let url = await getDownloadURL(item);
        let img = document.createElement("img");
        img.src = url;
        img.classList.add("outfit-img");
        outfitGallery.appendChild(img);
    }
}

// Load outfits when page loads
window.onload = loadOutfits;
