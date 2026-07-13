import { db } from "./firebase-config.js";

let firestore = null;
try {
    if (db) {
        firestore = await import("https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js");
    }
} catch (e) {
    console.warn("Firestore service failed to load dynamically:", e);
}

export async function getCollection(name) {
    if (!db || !firestore) throw new Error("Database not connected");
    const { collection, getDocs } = firestore;
    const snapshot = await getDocs(collection(db, name));

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}
export async function setDocument(collectionName, documentId, data) {
    if (!db || !firestore) throw new Error("Database not connected");
    const { doc, setDoc } = firestore;
    await setDoc(doc(db, collectionName, documentId), data);
}

export async function addDocument(collectionName, data) {
    if (!db || !firestore) throw new Error("Database not connected");
    const { collection, addDoc } = firestore;
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
}

export async function deleteDocument(collectionName, documentId) {
    if (!db || !firestore) throw new Error("Database not connected");
    const { doc, deleteDoc } = firestore;
    await deleteDoc(doc(db, collectionName, documentId));
}

export async function updateDocument(collectionName, documentId, data) {
    if (!db || !firestore) throw new Error("Database not connected");
    const { doc, updateDoc } = firestore;
    await updateDoc(doc(db, collectionName, documentId), data);
}