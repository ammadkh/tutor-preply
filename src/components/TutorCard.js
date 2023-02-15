import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarRateIcon from "@mui/icons-material/StarRate";
import Tooltip from "@mui/material/Tooltip";
import parse from "html-react-parser";
import Flag from "react-world-flags";

import { countries } from "../utils/coutriesList";
import { getLanguages } from "../utils/utils";
import EdiDialog from "./EditDialog";
import DynamicDropdowns from "./DynamicDropdowns";
import { TutorContext } from "../contexts/tutorContext";

export default function TutorCard({ tutor }) {
  const [isExpand, setIsExpand] = useState(false);
  const [showMoreLanguages, setShowMoreLanguages] = useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editData, setEditData] = useState(null);
  const [fieldType, setFieldType] = useState("text");
  const { isEditMode } = useContext(TutorContext);

  const handleClickOpen = (field, type = "text") => {
    if (!isEditMode) return;
    setFieldType(type);
    setIsModalOpen(true);
    setEditData({ ...tutor, field });
  };

  const handleClose = (value) => {
    setIsModalOpen(false);
  };

  const getCountryCode = countries.find(
    (item) => item.name === tutor.tutor_country
  )?.code;

  return (
    <div>
      <Grid container spacing={2} marginY={2}>
        <Grid item xs={10} sm={10} md={6.5} sx={{ margin: "auto" }}>
          <Card
            sx={{
              minWidth: 275,
              borderRadius: "24px",
              minHeight: 200,
              padding: "16px",
              boxShadow: "none",
            }}
          >
            <Grid container className="content">
              <Grid item sm={12} md={2.6}>
                <img
                  src={tutor?.thumbnail_img_url}
                  style={{ borderRadius: 15 }}
                  width={150}
                  alt=""
                />
              </Grid>
              <Grid item sm={12} md={6} sx={{ marginLeft: "15px" }}>
                <span
                  onClick={() => handleClickOpen("tutor_name")}
                  style={{ fontWeight: 800, fontSize: 18, marginRight: 10 }}
                >
                  {tutor?.tutor_name}
                </span>
                <Tooltip title={`Country of birth: ${tutor.tutor_country}`}>
                  <Button style={{ padding: 0, minWidth: "auto" }}>
                    <Flag code={getCountryCode} height="10" />
                  </Button>
                </Tooltip>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                    color: "grey",
                    marginTop: "3px",
                  }}
                >
                  <SchoolOutlinedIcon fontSize="18" />
                  <span
                    style={{ fontSize: "12px" }}
                    onClick={() => handleClickOpen("tutor_teaches")}
                  >
                    {tutor?.tutor_teaches}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 10,
                    color: "grey",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <PersonOutlineIcon style={{ fontSize: "18px" }} />
                  <span
                    onClick={() => handleClickOpen("students", "number")}
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "black",
                    }}
                  >
                    {tutor?.students || 0} active students
                  </span>
                  <FiberManualRecordIcon style={{ fontSize: "8px" }} />
                  <span
                    onClick={() => handleClickOpen("lessons", "number")}
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "black",
                    }}
                  >
                    {tutor?.lessons} lessons
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "10px",
                    fontWeight: "600",
                    color: "grey",
                    lineHeight: "30px",
                  }}
                >
                  {getLanguages(tutor?.languages).length < 4 ? (
                    <div
                      style={{ display: "inline" }}
                      onClick={() => handleClickOpen("languages", "dropdown")}
                    >
                      {parse(getLanguages(tutor?.languages).join(" "))}
                    </div>
                  ) : (
                    <>
                      <div>
                        <div
                          style={{ display: "inline" }}
                          onClick={() =>
                            handleClickOpen("languages", "dropdown")
                          }
                        >
                          {parse(
                            getLanguages(tutor?.languages).slice(0, 3).join(" ")
                          )}
                        </div>
                        {!showMoreLanguages && (
                          <span>
                            <Button
                              onClick={() => setShowMoreLanguages(true)}
                              style={{
                                padding: 0,
                                minWidth: "auto",
                                marginLeft: "10px",
                                fontSize: "13px",
                                marginBottom: "3px",
                                borderBottom: "2px dashed grey",
                                borderRadius: 0,
                                color: "grey",
                              }}
                            >
                              +{getLanguages(tutor?.languages).length - 3}
                            </Button>
                          </span>
                        )}
                      </div>
                      <div
                        style={{ display: "inline" }}
                        onClick={() => handleClickOpen("languages", "dropdown")}
                      >
                        {showMoreLanguages &&
                          parse(
                            getLanguages(tutor?.languages).slice(3).join(" ")
                          )}
                      </div>
                    </>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    marginTop: "10px",
                    color: "grey",
                    height: isExpand ? "auto" : "70px",
                    overflow: "hidden",
                  }}
                  onClick={() => handleClickOpen("description")}
                >
                  {tutor?.description}
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    color: "#0096b2",
                    cursor: "pointer",
                    fontWeight: 500,
                    marginBottom: "12px",
                    marginRight: "16px",
                    fontSize: "15px",
                  }}
                  onClick={() => setIsExpand((pre) => !pre)}
                >
                  {!isExpand ? "Read More" : "Read Less"}
                </div>
              </Grid>
              <Grid
                item
                sm={12}
                md={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  {tutor?.is_newly_joined && (
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: "#DAF2DC",
                        marginBottom: "25px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        fontWeight: 600,
                        textAlign: "center",
                        color: "#017912",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Newly joined
                    </div>
                  )}
                  {!tutor?.is_newly_joined && (
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ flex: 1, textAlign: "center" }}>
                        <StarRateIcon
                          style={{
                            color: "#FDC426",
                            fontSize: "18px",
                            marginRight: "3px",
                          }}
                        />
                        <span
                          style={{ fontSize: "25px", fontWeight: "500" }}
                          onClick={() => handleClickOpen("rating", "number")}
                        >
                          {tutor?.rating}
                        </span>
                      </div>
                      <div
                        onClick={() =>
                          handleClickOpen("n_of_reviews", "number")
                        }
                        style={{
                          flex: 1,
                          textAlign: "center",
                          marginTop: "10px",
                          marginBottom: "25px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "500",
                            marginRight: "2px",
                          }}
                        >
                          {tutor?.n_of_reviews}
                        </span>
                        <span style={{ fontSize: "14px" }}>reviews</span>
                      </div>
                    </div>
                  )}
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{ flex: 1, textAlign: "center" }}
                      onClick={() => handleClickOpen("price", "number")}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          marginRight: "3px",
                        }}
                      >
                        ${" "}
                      </span>
                      <span style={{ fontSize: "25px", fontWeight: "500" }}>
                        {tutor?.price}
                      </span>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        textAlign: "center",
                        marginTop: "10px",
                        marginBottom: "25px",
                      }}
                    >
                      <span style={{ fontSize: "14px" }}>per hour</span>
                    </div>
                  </div>
                </div>
                <div style={{ width: "90%" }}>
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: "100%",
                      fontSize: "15px",
                      padding: "12px 10px",
                      lineHeight: "auto",
                      borderRadius: "10px",
                      textTransform: "none",
                      backgroundColor: "#0096b2",
                      fontWeight: "600",
                      marginBottom: "15px",
                    }}
                  >
                    Book trial lesson
                  </Button>
                  <Button
                    block
                    variant="contained"
                    sx={{
                      minWidth: "100%",
                      fontSize: "15px",
                      padding: "12px 10px",
                      lineHeight: "auto",
                      borderRadius: "10px",
                      textTransform: "none",
                      backgroundColor: "#f7f5f2",
                      fontWeight: "600",
                      color: "black",
                    }}
                  >
                    Message
                  </Button>
                </div>
              </Grid>
              {isEditMode && <DynamicDropdowns tutor={tutor} />}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <EdiDialog
        open={isModalOpen}
        onClose={handleClose}
        editData={editData}
        fieldType={fieldType}
      />
    </div>
  );
}
