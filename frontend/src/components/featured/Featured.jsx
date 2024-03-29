import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels/countByCity?cities=Sylhet,Dhaka,Chattagram"
  );

  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 3,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = (city) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination: city, dates, options } });
    navigate("/hotels", { state: { destination: city, dates, options } });
  };

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div
            className="featuredItem"
            onClick={() => handleSearch("Sylhet")}
          >
            <img
             src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt="Sylhet"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Sylhet</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div
            className="featuredItem"
            onClick={() => handleSearch("Dhaka")}
          >
            <img
               src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt="Dhaka"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Dhaka</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>

          <div
            className="featuredItem"
            onClick={() => handleSearch("Chattagram")}
          >
            <img
               src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt="Chattagram"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Chattagram</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;