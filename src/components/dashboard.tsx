import { Grid } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import JobCard from "./jobcard";
import { useSelector } from "react-redux";
import { selectGlobalFilterData } from "../Redux/filterSlice";
interface fetchedJobDetails {
  companyName: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  jdUid: string;
  jdLink: string;
  maxExp: number;
  maxJdSalary: number;
  minExp: number;
  minJdSalary: number;
  salaryCurrencyCode: string;
}
const Dashboard = () => {
  const [jobsData, setJobsData] = useState<fetchedJobDetails[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const lastJobCardRef = useRef<HTMLDivElement>(null);
  const globalFilterData = useSelector(selectGlobalFilterData);
  const [queryParams, setQueryParams] = useState<string>("");
  //This is similar to previous api https://api.weekday.technology/adhoc/getSampleJdJSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/jdList?_start=${offset}&_limit=10${queryParams}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Convert data array to set and merge with existing set
          setJobsData((prevData) => {
            const newDataSet = new Set(
              prevData.map((item) => JSON.stringify(item))
            );
            data.forEach((item: string) =>
              newDataSet.add(JSON.stringify(item))
            );
            return Array.from(newDataSet).map((item) => JSON.parse(item));
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [offset, queryParams]);

  //build query params
  useEffect(() => {
    let baseQueryParams = "";
    setJobsData([]);

    globalFilterData.map(
      (filter: { placeholder: string; filterData: string[] }) => {
        if (filter.placeholder === "Roles") {
          filter.filterData.map((role) => {
            baseQueryParams += `&jobRole_like=${role}`;
          });
        }
        if (filter.placeholder === "Location") {
          filter.filterData.map((location) => {
            baseQueryParams += `&location_like=${location}`;
          });
        }
        if (filter.placeholder === "Experience") {
          filter.filterData.map((exp) => {
            baseQueryParams += `&minExp_gte=${exp}`;
          });
        }
        if (filter.placeholder === "Search Company Name") {
          if (filter.filterData.length > 0)
            baseQueryParams += `&companyName_like=${filter.filterData}`;
        }
        if (filter.placeholder === "Minimum Base Pay") {
          filter.filterData.map(
            (salary) =>
              (baseQueryParams += `&minJdSalary_gte=${salary.replace(
                "L",
                ""
              )}`)
          );
        }
      }
    );
    setQueryParams(baseQueryParams);
    return () => setOffset(0);
  }, [globalFilterData]);

  //Intersection observer is used to load more data when the user scrolls to the bottom of the page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prevOffset) => prevOffset + 10);
        }
      },
      { threshold: 1 }
    );

    if (lastJobCardRef.current) {
      observer.observe(lastJobCardRef.current);
    }

    return () => {
      if (lastJobCardRef.current) {
        observer.unobserve(lastJobCardRef.current);
      }
    };
  }, [jobsData.length]);

  return (
    <>
      <div style={{ padding: "10px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {jobsData.map((job: fetchedJobDetails, index) => (
            <Grid item xs={4} sm={4} md={3} key={index}>
              {index === jobsData.length - 1 ? (
                <div ref={lastJobCardRef}></div>
              ) : null}
              <JobCard
                jobtitle={job.jobRole}
                location={job.location}
                description={
                  job.jobDetailsFromCompany
                }
                minSalary={job.minJdSalary?.toString()}
                maxSalary={job.maxJdSalary?.toString()}
                company={job.companyName}
                imageSrc={job.logoUrl}
                experience={job.minExp?.toString()}
                currencyCode={job.salaryCurrencyCode}
                key={job.jdUid}
                jdLink={job.jdLink}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
