import { Modal, Paper } from "@mui/material";
import { useState } from "react";

interface JobCardProps {
  jobtitle: string;
  company: string;
  location: string;
  description: string;
  experience: string;
  imageSrc: string;
  minSalary: string;
  maxSalary: string;
  currencyCode: string;
  jdLink: string;
}
interface DescriptionModalProps {
  description: string;
}
const DescriptionModal = ({ description }: DescriptionModalProps) => {
  return (
    <div
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        width: "80%",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      {description}
    </div>
  );
};
const JobCard = ({
  jobtitle,
  company,
  location,
  description,
  minSalary,
  maxSalary,
  currencyCode,
  imageSrc,
  experience,
  jdLink
}: JobCardProps) => {
  const currencySign = currencyCode === "INR" ? "₹" : "$";
  const [openModal, setOpenModal] = useState(false);

  return (
    <Paper elevation={3}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div style={{ padding: "5px 0px", display: "flex", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: "5px 10px",
              flexWrap: "wrap",
              gap: "5px",
              width: "100%",
              flex: "1 1 0%",
            }}
          >
            <div
              style={{
                padding: "4px 6px",
                boxShadow: "rgba(6, 6, 6, 0.05) 0px 2px 6px 0px",
                borderRadius: "10px",
                border: "1px solid rgb(230, 230, 230)",
              }}
            >
              <div
                style={{
                  fontWeight: 300,
                  lineHeight: 1.5,
                  fontSize: "9px",
                }}
              >
                ⏳ Posted 18 days ago
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: "1 1 0%", padding: "8px 16px" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <img style={{ width: "auto", height: "2.5rem" }} src={imageSrc} />
            <div>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    marginBottom: "3px",
                    color: "#8b8b8b",
                  }}
                >
                  {company ?? "Company Not Specified"}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.5,
                    fontWeight: 300,
                  }}
                >
                  {jobtitle ?? "Job Title Not Specified"}
                </div>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 400,
                  marginTop: "5px",
                }}
              >
                {location ?? "Location Not Specified"}
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                color: "rgb(77, 89, 106)",
                fontWeight: 300,
                fontSize: "14px",
                margin: "8px 0px",
              }}
            >
              Estimated Salary: {currencySign}
              {minSalary ?? "Not Specified"} - {currencySign}
              {maxSalary ?? "Not Specified"} LPA <span>✅</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  height: "250px",
                  overflow: "hidden",
                  maskImage:
                    "linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      marginBottom: "0px",
                      fontWeight: 400,
                      margin: "0px",
                    }}
                  >
                    About Company
                  </p>
                  <div style={{ fontSize: "14px" }}>
                    <div style={{ marginBottom: "0px", fontWeight: 300 }}>
                      <strong>About us</strong>
                    </div>
                    <div style={{ marginBottom: "0px", fontWeight: 300 }}>
                      <span>
                        {description.substring(0, 500) + "..." ??
                          "Description Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "0.5rem",
                  position: "relative",
                  top: "-40px",
                  color: "#4943da",
                  cursor: "pointer",
                }}
                onClick={() => setOpenModal(true)}
              >
                View job
              </div>
              <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <DescriptionModal description={description} />
              </Modal>

              <div>
                <h3
                  style={{
                    marginTop: "0px",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    marginBottom: "3px",
                    color: "#8b8b8b",
                  }}
                >
                  Minimum Experience
                </h3>
                <h2
                  style={{
                    fontSize: "14px",
                    lineHeight: "0.5",
                    fontWeight: 300,
                  }}
                >
                  {experience ?? "Experience Not Specified"}
                </h2>
              </div>
            </div>
          </div>
          <div
            style={{
              flexGrow: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                justifyContent: "space-between",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <a href={jdLink} style={{ width: "100%" }}>
                <button
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    backgroundColor: "rgb(85, 239, 196)",
                    fontWeight: "500",
                    padding: "8px 16px",
                    border: "0px",
                    fontSize: "16px",
                    lineHeight: 1.75,
                    borderRadius: "8px",
                    cursor:"pointer"
                  }}
                >
                  ⚡ Easy Apply
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default JobCard;
