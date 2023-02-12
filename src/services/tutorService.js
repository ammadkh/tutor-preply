import { getFirebaseApp } from "../utils/firebaseHelper";
import {
  collection,
  getFirestore,
  setDoc,
  doc,
  getDocs,
  getCountFromServer,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  limitToLast,
  updateDoc,
} from "firebase/firestore";
import usersData from "../utils/users.json";

export const storeData = () => {
  const users = usersData;
  const app = getFirebaseApp();
  var db = getFirestore(app);

  const usersRef = collection(db, "tutors");

  users.forEach(async function (item) {
    await setDoc(doc(usersRef, `${item.tutor_id}`), {
      ...item,
    });
  });
};

export const getTutors = async () => {
  try {
    const tutors = [];
    const app = getFirebaseApp();
    var db = getFirestore(app);
    const collectionRef = collection(db, "tutors");
    const q = query(collectionRef, orderBy("tutor_name"), limit(11));
    const querySnapshot = await getDocs(q);
    const firstVisible = querySnapshot.docs[0];
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 2];
    const isNextVisible = querySnapshot.docs.length === 11;
    let index = 0;
    querySnapshot.forEach((doc) => {
      index++;
      // doc.data() is never undefined for query doc snapshots
      if (index < 11) {
        tutors.push(doc.data());
      }
    });
    return { tutors, lastVisible, firstVisible, isNextVisible };
  } catch (error) {
    console.log(error);
  }
};

export const getTotalTutorsCount = async () => {
  try {
    const app = getFirebaseApp();
    var db = getFirestore(app);
    const collectionRef = collection(db, "tutors");
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  } catch (error) {
    console.log(error);
  }
};

export const getNextTutors = async (lastVisible) => {
  try {
    const tutors = [];
    const app = getFirebaseApp();
    var db = getFirestore(app);
    const collectionRef = collection(db, "tutors");
    const q = query(
      collectionRef,
      orderBy("tutor_name"),
      startAfter(lastVisible),
      limit(11)
    );
    const querySnapshot = await getDocs(q);
    const first = querySnapshot.docs[0];
    const last = querySnapshot.docs[querySnapshot.docs.length - 2];
    const isNextVisible = querySnapshot.docs.length === 11;
    let index = 0;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      index++;
      if (index < 11) {
        tutors.push(doc.data());
      }
    });
    return { tutors, last, first, isNextVisible };
  } catch (error) {
    console.log(error);
  }
};

export const getPrevTutors = async (firstVisible) => {
  try {
    const tutors = [];
    const app = getFirebaseApp();
    var db = getFirestore(app);
    const collectionRef = collection(db, "tutors");
    const q = query(
      collectionRef,
      orderBy("tutor_name"),
      endBefore(firstVisible),
      limitToLast(11)
    );
    const querySnapshot = await getDocs(q);
    const first = querySnapshot.docs[1];
    const last = querySnapshot.docs[querySnapshot.docs.length - 1];
    const isPreviousVisible = querySnapshot.docs.length === 11;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tutors.push(doc.data());
    });
    if (isPreviousVisible) {
      tutors.shift();
    }
    return { tutors, last, first, isPreviousVisible };
  } catch (error) {
    console.log(error);
  }
};

export const updateTutorRecord = async (tutorId, updatedData) => {
  const app = getFirebaseApp();
  var db = getFirestore(app);
  try {
    const collectionRef = doc(db, `tutors/${tutorId}`);
    await updateDoc(collectionRef, updatedData);
  } catch (error) {
    console.log(error);
  }
};
