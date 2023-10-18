import {
  doc,
  getDoc,
  query,
  getDocs,
  collection,
  orderBy,
  // limit,
} from "firebase/firestore";
import { db } from "../config/firebase";

export async function getUserRole(id) {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  return docSnap.data().role;
}

export async function getItems() {
  const itemsCollectionRef = collection(db, "items");
  const q = query(itemsCollectionRef, orderBy("isNew", "desc"));
  const data = await getDocs(q);
  console.log(data);

  const filteredData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return filteredData;
}

export async function getPurchases() {
  const purchasesCollectionRef = collection(db, "purchases");
  const q = query(purchasesCollectionRef, orderBy("timestamp", "desc"));
  const data = await getDocs(q);

  const filteredData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return filteredData;
}
