import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase/firebase";

const useContact = () => {
    const [error, setError] = useState("");
    const [contacts, setContacts] = useState([]);
    const [contactDetail, setContactDetail] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const getContacts = useCallback(async () => {
        const arr = [];
        const data = await getDocs(collection(db, "contacts"));
        data.forEach((doc) => {
            arr.push({ tid: doc.id, ...doc.data() });
        });
        setContacts(arr);
        setLoading(false);
    }, []);

    const addContact = async (data) => {
        const res = await addDoc(collection(db, "contacts"), {
            ...data,
            createdAt: Timestamp.fromDate(new Date()),
        });
        return res;
    };

    const getContactDetail = async (id) => {
        const docRef = doc(db, "contacts", id);
        const res = await getDoc(docRef);
        setLoading(false);
        if (res.exists()) {
            setContactDetail(res.data());
        } else {
            setError("Данный контакт не найден!");
        }
    };

    const updateContact = async (id, data) => {
        const ref = doc(db, "contacts", id);
        const res = await updateDoc(ref, data);
        return res;
    };

    return {
        isLoading,
        contacts,
        getContacts,
        addContact,
        contactDetail,
        getContactDetail,
        error,
        updateContact,
    };
};

export default useContact;
