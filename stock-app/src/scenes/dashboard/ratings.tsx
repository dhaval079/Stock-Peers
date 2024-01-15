import DashboardBox from "@/components/DashboardBox";
import { useGetSustainabilityQuery } from "@/state/yahooAPI";
import BoxHeader from "../../components/BoxHeader"; // Replace with actual path to BoxHeader component
import "../../index.css";
import RectangleCustom from "../dashboard/rectangle";
import { useMediaQuery, useTheme  } from "@mui/material";



type Props = {
  searchQuery: string;
};

const Ratings = ({ searchQuery }: Props) => {
  const palette = useTheme();  // Fix: Change `theme` to `palette`
  const isSmallScreen = useMediaQuery(palette.breakpoints.down('lg'));
  const { data, isLoading, error } = useGetSustainabilityQuery(searchQuery);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <>

      <DashboardBox gridArea="g" width="100%" height="100%">
        <BoxHeader
          title="Environment, Social and Governance (ESG) Risk Ratings"
          subtitle="Risk ratings provided by Sustainalytics"
          sideText=""
        />

        <div style={{ display: "flex", justifyContent: "space-between", padding:"1rem 1rem 0rem 1rem" , color:"#FFF"}}>
          <div>
                <span>Total ESG Score</span>
                <div style={{ display: "flex" }}>

                  <div style={{ fontSize: "20px", fontWeight: "600", gap: "1rem" }}>
                      {data["ESGScores"]["Score"]} 
                  
                      <span
                      style={{
                          paddingLeft: "0.5rem",
                          fontSize: "12px",
                          fontWeight: "500",
                      }}
                      >
                      {data["ESGScores"]["Percentile"]}
                      </span>

                  </div>

                </div>

                {/*<div style={{ fontSize: "16px", fontWeight: "500", display: "incline-block", paddingLeft: "0.5rem" }}>
                      {data["ESGScores"]["Rank"].slice(0, Math.ceil(data["ESGScores"]["Rank"].length / 2))}
                    </div>*/}
          </div>

          <div>
                <span style={{ marginRight: "10px" }}>Environment Risk Score</span>
                <div style={{ fontSize: "20px", fontWeight: "600", display: "flex" }}>{data["EnvironmentScore"]["Score"]}</div>
          </div>

          <div>
                <span style={{ marginRight: "10px" }}>Social Risk Score</span>
                <div style={{ fontSize: "20px", fontWeight: "600", display: "flex" }}>{data["SocialScore"]["Score"]}</div>
          </div>

          <div>
                <span style={{ marginRight: "10px" }}>Governance Risk Score</span>
                <div style={{ fontSize: "20px", fontWeight: "600", display: "flex" }}>{data["GovernanceScores"]["Score"]}</div>
          </div>
        </div>
        <hr style={{
            margin: isSmallScreen
              ? "1rem 1rem 0.5rem 10px"
              : "1rem 1rem 0.5rem 10px",
          }} />
        <RectangleCustom searchQuery={searchQuery} />
      </DashboardBox>
    </>
  );
};

export default Ratings;
