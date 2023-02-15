import React, { useContext, useEffect } from "react";
import { TutorContext } from "../contexts/tutorContext";
import TutorCard from "./TutorCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClockLoader from "react-spinners/ClockLoader";
import Checkbox from "@mui/material/Checkbox";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function TutorsList() {
  const {
    tutors,
    totalTutors,
    nextPageHandler,
    prevPageHandler,
    isPreviousVisible,
    isNextVisible,
    isLoading,
    isEditMode,
    setIsEditMode,
  } = useContext(TutorContext);

  const handleNextPagination = () => {
    nextPageHandler();
  };

  const handlePreviousPagination = () => {
    prevPageHandler();
  };

  useEffect(() => {
    const body = document.querySelector("#root");
    body.scrollIntoView({
      behavior: "smooth",
    });
  }, [tutors]);

  if (!isLoading && !tutors.length) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h3>No data available.Please try again</h3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ClockLoader
          color={"black"}
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <Grid container marginY={5} justifyContent="center" marginBottom={0}>
        <Grid
          item
          xs={12}
          md={7}
          style={{ textAlign: "end", marginTop: "30px" }}
        >
          <div style={{ marginRight: "50px" }}>
            <Checkbox
              label="Edit Mode"
              checked={isEditMode}
              onChange={() => setIsEditMode((prev) => !prev)}
            />
            <span>Edit Mode</span>
          </div>
        </Grid>
        <Grid item xs={10} md={6}>
          <h4 style={{ marginBottom: 0 }}>
            {totalTutors} English teachers available
          </h4>
        </Grid>
        {tutors.map((tutor) => {
          return <TutorCard tutor={tutor} key={tutor.tutor_id} />;
        })}
        <Grid
          item
          xs={6.5}
          justifyContent={"end"}
          display="flex"
          className="totalPages"
          sx={{ fontSize: "14px", color: "grey" }}
        >
          <p>Total number of pages {Math.floor(totalTutors / 10)}</p>
        </Grid>
        <Grid
          item
          xs={6}
          marginTop={2}
          marginBottom={5}
          justifyContent={"space-between"}
          display="flex"
        >
          <Button
            onClick={handlePreviousPagination}
            disabled={!isPreviousVisible}
          >
            Previous
          </Button>
          <Button disabled={!isNextVisible} onClick={handleNextPagination}>
            NEXT
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
