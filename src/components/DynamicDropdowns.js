import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import dropdownData from "../utils/dropdown.json";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TutorContext } from "../contexts/tutorContext";

export default function DynamicDropdowns({ tutor }) {
  const { updateTutorData } = useContext(TutorContext);

  const updateInformation = async (body) => {
    try {
      updateTutorData(tutor.tutor_id, body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid item xs={12} style={{ display: "flex", margin: "20px 5px 0 5px" }}>
      {Object.keys(dropdownData).map((key, index) => {
        return (
          <div
            key={index}
            style={{
              textAlign: "start",
              marginRight: "15px",
            }}
          >
            {tutor && (
              <>
                <InputLabel id={index.toString()} style={{ fontSize: "12px" }}>
                  {key?.toUpperCase()}
                </InputLabel>
                <Select
                  labelId={index.toString()}
                  id="demo-simple-select"
                  value={tutor[key]}
                  label={key}
                  style={{ minWidth: "150px", height: "30px" }}
                  onChange={(event) => {
                    const updatedBody = {
                      [key]: event.target.value,
                    };
                    updateInformation(updatedBody);
                  }}
                >
                  {Object.values(dropdownData[key]).map((option) => {
                    return (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    );
                  })}
                </Select>
              </>
            )}
          </div>
        );
      })}
    </Grid>
  );
}
