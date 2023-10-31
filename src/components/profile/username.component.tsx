import { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";

export default function UsernameInput() {
  const [username, setUsername] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const checkUsernameAvailability = useCallback((username: string) => {
    const debouncedCheck = debounce(async (username: string) => {
      try {
        await axios.get(`/api/user/check-username?username=${username}`);
        setIsUsernameAvailable(true);
        console.log("Username is available");
      } catch (error) {
        console.log("Username is not available");
        setIsUsernameAvailable(false);
      }
    }, 1000);
    debouncedCheck(username);
  }, []); // Empty dependency array

  const handleInputChange = (e: any) => {
    setUsername(e.target.value);
    checkUsernameAvailability(e.target.value);
  };

  return (
    <input
      value={username}
      onChange={handleInputChange}
      className=" ml-5 mt-5 pl-2"
      placeholder="Username"
    />
  );
}
