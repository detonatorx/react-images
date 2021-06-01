import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFirestore = collection => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribed = projectFirestore
      .collection(collection)
      .orderBy('createdAt')
      .onSnapshot(snap => {
        let documents = [];

        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });

        setDocs(documents);
      });

    return () => unsubscribed();
  }, [collection]);
  return { docs };
};

export default useFirestore;
