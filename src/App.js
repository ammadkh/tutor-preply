import "./App.css";
import { useEffect } from "react";
import { TutorProvider } from "./contexts/tutorContext";
import TutorsList from "./components/TutorsList";
import { storeData } from "./services/tutorService";

function App() {
  useEffect(() => {
    //storeData(); to store data on firestore
  }, []);
  return (
    <TutorProvider>
      <TutorsList />
    </TutorProvider>
  );
}

export default App;
