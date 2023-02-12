import { createContext, useEffect, useState } from "react";
import {
  getNextTutors,
  getPrevTutors,
  getTotalTutorsCount,
  getTutors,
  updateTutorRecord,
} from "../services/tutorService";

export const TutorContext = createContext({});

export const TutorProvider = ({ children }) => {
  const [tutors, setTutors] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [totalTutors, setTotalTutors] = useState([]);
  const [isPreviousVisible, setIsPreviousVisible] = useState(false);
  const [isNextVisible, setIsNextVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getTutorsData = async () => {
      try {
        const { tutors, lastVisible, firstVisible, isNextVisible } =
          await getTutors();
        const totalTutorsResponse = await getTotalTutorsCount();
        setTutors(tutors);
        setTotalTutors(totalTutorsResponse);
        setLastVisible(lastVisible);
        setFirstVisible(firstVisible);
        setIsNextVisible(isNextVisible);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTutorsData();
  }, []);

  const updateTutorData = async (tutorId, updatedBody) => {
    setIsLoading(true);
    try {
      await updateTutorRecord(tutorId, updatedBody);
      const updatedTutors = [...tutors];
      let updateTutorIndex = updatedTutors.findIndex(
        (tutor) => tutor.tutor_id === tutorId
      );
      let updatedTutor = updatedTutors.find(
        (tutor) => tutor.tutor_id === tutorId
      );
      updatedTutor = { ...updatedTutor, ...updatedBody };
      updatedTutors[updateTutorIndex] = updatedTutor;
      setTutors(updatedTutors);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextPageHandler = async () => {
    setIsLoading(true);
    try {
      const { tutors, last, first, isNextVisible } = await getNextTutors(
        lastVisible
      );
      setTutors(tutors);
      setLastVisible(last);
      setFirstVisible(first);
      setIsNextVisible(isNextVisible);
      setIsPreviousVisible(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const prevPageHandler = async () => {
    setIsLoading(true);
    try {
      const { tutors, last, first, isPreviousVisible } = await getPrevTutors(
        firstVisible
      );
      setTutors(tutors);
      setLastVisible(last);
      setFirstVisible(first);
      setIsPreviousVisible(isPreviousVisible);
      setIsNextVisible(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TutorContext.Provider
      value={{
        tutors,
        totalTutors,
        nextPageHandler,
        prevPageHandler,
        isPreviousVisible,
        isNextVisible,
        isLoading,
        updateTutorData,
        isEditMode,
        setIsEditMode,
      }}
    >
      {children}
    </TutorContext.Provider>
  );
};
