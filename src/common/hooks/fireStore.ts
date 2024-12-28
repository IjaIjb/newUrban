import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  getDocs,
  DocumentSnapshot,
  Query,
  DocumentData,
  where,
  addDoc,
  updateDoc,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { USER_TYPE } from "@/common/types";
import { addParkDefaultData } from "../data";

export const saveUser = async (
  user: any,
  data: any,
  role: USER_TYPE
): Promise<any> => {
  try {
    const userRef = doc(db, role, user.uid);
    await setDoc(userRef, data);
    try {
      const res = await getUser(user.uid, role);
      return res;
    } catch (err) {
      console.log(err, "error");
      throw err;
    }
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

export const savePark = async (data: any, userId: any): Promise<string> => {
  try {
    const { parkName, fullAddress, parkPhoneNumber } = data;
    if (parkName) {
      addParkDefaultData.parkName = parkName;
    }
    if (fullAddress) {
      addParkDefaultData.address = fullAddress;
    }
    if (parkPhoneNumber) {
      addParkDefaultData.phone = parkPhoneNumber;
    }
    addParkDefaultData.ownerId = userId;
    // console.log("save park::::::",addParkDefaultData, addParkDefaultData.parkId);
    const parkRef = doc(db, "parks", addParkDefaultData.parkId); // Replace 'documentId' with the actual ID of the document
    await setDoc(parkRef, addParkDefaultData);
    return "Park successfully created";
  } catch (error) {
    console.error("Error saving Park:", error);
    throw error;
  }
};

export const getUser = async (userId: any, role: string) => {
  console.log(userId, role, "user role");
  try {
    const userRef: any = doc(db, role, userId);
    const userSnapshot: any = await getDoc(userRef);
    const user: any = userSnapshot.data();
    if (user) {
      return user;
    } else {
      throw new Error("change user role and try again");
    }
  } catch (err) {
    throw err;
  }
};

export const getAll = async (
  collectionName: string,
  operation?: ("==" | "!=")[],
  whereFields?: string[],
  whereValues?: any[]
): Promise<QuerySnapshot<DocumentData>> => {
  try {
    let q: Query<DocumentData> = query(collection(db, collectionName));

    if (
      whereFields &&
      whereValues &&
      whereFields.length === whereValues.length
    ) {
      for (let i = 0; i < whereFields.length; i++) {
        const field = whereFields[i];
        const value = whereValues[i];
        const op = operation && operation[i] ? operation[i] : "==";
        if (op === "==" || op === "!=") {
          q = query(q, where(field, op, value));
        }
      }
    }

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, "data");
    return querySnapshot;
  } catch (error) {
    throw error;
  }
};

export const getOne = async (
  collectionName: string,
  operation?: ("==" | "!=")[],
  whereFields?: string[],
  whereValues?: any[]
): Promise<DocumentData | null> => {
  try {
    let q: Query<DocumentData> = query(collection(db, collectionName));

    if (
      whereFields &&
      whereValues &&
      whereFields.length === whereValues.length
    ) {
      for (let i = 0; i < whereFields.length; i++) {
        const field = whereFields[i];
        const value = whereValues[i];
        const op = operation && operation[i] ? operation[i] : "==";
        if (op === "==" || op === "!=") {
          q = query(q, where(field, op, value));
        }
      }
    }

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      const documentSnapshot = querySnapshot.docs[0];
      return documentSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (collectionName: string, userId: any) => {
  try {
    const userRef = doc(collection(db, collectionName), userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error(`No user found with ID: ${userId}`);
    }

    const userData = userDoc.data();
    return { id: userId, ...userData };
  } catch (error) {
    throw error;
  }
};

export const saveTrip = async (values: any) => {
  try {
    const tripCollectionRef = collection(db, "trips");
    const newUserRef = await addDoc(tripCollectionRef, values);
    if (newUserRef) {
      return newUserRef;
    } else {
      throw new Error("an error occured while creating park");
    }
  } catch (err) {
    throw err;
  }
};

export const updateOne = async (
  collectionName: string,
  documentId: string,
  updatedData: any
) => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    const res: any = await updateDoc(documentRef, updatedData);
    return res;
  } catch (err) {
    throw err;
  }
};

export const saveData = async (
  data: any,
  collectionName: string
): Promise<any> => {
  try {
    const saveData = collection(db, collectionName);
    const newUserRef = await addDoc(saveData, data);
    if (newUserRef) {
      return newUserRef;
    } else {
      throw new Error("an error occured while creating park");
    }
  } catch (error) {
    console.error("Error saving file:", error);
  }
};
export const updateTrip = async (tripId: string, values: any) => {
  try {
    const tripDocRef = doc(db, "trips", tripId);
    await updateDoc(tripDocRef, values);
    return true;
  } catch (error) {
    throw error;
  }
};
