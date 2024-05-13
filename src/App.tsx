import Dashboard from "./components/dashboard";
import Filter from "./components/filter";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Filter
            filterMenuData={[
              "Backend",
              "Frontend",
              "Fullstack",
              "Devops",
              "Data Science",
              "Machine Learning",
              "Data Engineer",
              "NLP",
              "Flutter",
              "React Native",
              "Android",
              "IOS",
              "Computer Vision",
              "Deep Learning",
              "Tech Lead",
              "Web 3",
              "Data Infrastructure",
            ]}
            variant="filter"
            placeholder="Roles"
          />
          <Filter
            filterMenuData={[
              "remote",
              "Bangalore",
              "delhi ncr",
              "hyderabad",
              "mumbai",
              "chennai",
              "pune",
              "kolkata",
              "ahmedabad",
              "jaipur",
              "surat",
            ]}
            variant="filter"
            placeholder="Location"
          />
          <Filter
            variant="filter"
            filterMenuData={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
            placeholder="Experience"
            
          />
          <Filter variant="search" filterMenuData={[]} placeholder="Search Company Name"/>
          <Filter variant="filter" filterMenuData={["0","10L","20L","30L","40L","50L","60L","70L"]} placeholder="Minimum Base Pay"/>
        </div>

        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
