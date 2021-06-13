import { useState } from "react";
import "./styles.css";
const api = {
   key: "82a7556be7e37bc5754b4f33a47f1ea0",
   base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
   const [query, setQuery] = useState("");
   const [weather, setWeather] = useState({});
   const search = (evt) => {
      if (evt.key === "Enter") {
         fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
               setWeather(result);
               setQuery("");
               console.log(result);
            });
      }
   };

   const dateBuilder = (d) => {
      let months = [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December"
      ];
      let days = [
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday",
         "Sunday"
      ];
      let day = days[d.getDay()];
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      let date = d.getDate();
      return `${month}  ${date} ${year}, ${day}`;
   };

   console.log();

   return (
      <div className="app">
         <main>
            <div className="search-box">
               <input
                  type="text"
                  className="search-bar"
                  placeholder="search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={search}
               />
            </div>
            {typeof weather.main != "undefined" ? (
               <div>
                  <div className="location-box">
                     <div className="location">
                        {weather.name}, {weather.sys.country}
                     </div>
                     <div className="date">{dateBuilder(new Date())}</div>
                  </div>
                  <div className="weather-box">
                     <div className="temp">
                        {Math.round(weather.main.temp)}°c
                     </div>
                     <div className="weather">{weather.weather[0].main}</div>
                  </div>
               </div>
            ) : (
               ""
            )}
         </main>
      </div>
   );
}

export default App;
