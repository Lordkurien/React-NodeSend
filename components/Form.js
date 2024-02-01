import { useState, useContext } from "react";
import appContext from "../context/app/appContext";

const Form = () => {
  const AppContext = useContext(appContext);
  const { addPassword, addDownloads } = AppContext;

  const [password, setPassword] = useState(false);

  return (
    <div className="w-full mt-20 ">
      <div>
        <label className="text-lg text-gray-800">Delete After: </label>
        <select
          onChange={(e) => addDownloads(e.target.value)}
          defaultValue=""
          className="select-downloads-password"
        >
        <option value="" disabled>-- Select --</option>
        <option value="1">1 download</option>
        <option value="5">5 downloads</option>
        <option value="10">10 downloads</option>
        <option value="20">20 downloads</option>
      </select>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800 mr-2">Password Protect</label>
          <input
            onChange={() => setPassword(!password)}
            type="checkbox" />
        </div>

        {password ? (
          <input
          onChange={ (e) => addPassword(e.target.value)}
          type="password"
          className="select-downloads-password"
          />
        ): (null)}
        
      </div>
    </div>
  )
}

export default Form;
