import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  interface IUser {
    name: {
      first: "";
      last: "";
    };
    email: string;
  }
  const [user, setUser] = useState<IUser>({
    name: { first: "", last: "" },
    email: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Function to fetch data
  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get("https://randomuser.me/api")
      .then((response) => {
        //Destructured name and email address
        const {
          name: { first, last },
          email,
        } = response.data.results[0];
        setUser({ name: { first, last }, email });
        localStorage.setItem(
          "user",
          JSON.stringify({ name: { first, last }, email })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Call fetch function on page load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>User info</h1>
      <div className="flex">
        <h4>Full Name: </h4>
        <p>{user.name.first + " " + user.name.last}</p>
      </div>
      <div className="flex">
        <h4>User Email: </h4>
        <p>{user.email}</p>
      </div>

      <button disabled={isLoading} className="btn" onClick={() => fetchData()}>
        {isLoading ? "Loading..." : "Refresh"}
      </button>
    </div>
  );
};

export default App;
