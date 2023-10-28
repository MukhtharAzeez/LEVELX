/* eslint-disable react/prop-types */
import { useState } from "react";

function Filters({ name, setName, gender, setGender, race, setRace, ascending,setAscending, dropdown, setDropdown }) {
  
  const [races] = useState([
  "Hobbits",
  "Human",
  "Elves",
  "Dwarves",
  "Orcs",
  "Ents",
  "Horse-lords",
  "Istari",
  "Trolls",
  "Nazgul",
  "Dragons",
  "Eagles",
  "Ainur"
]);

  const handleRaceChange =(e)=> {
    const value = e.target.value
     if (race.includes(value)) {
       setRace(race.filter((item) => item !== value));
     } else {
       setRace([...race, value]);
     }
  }


  return (
    <div className="flex gap-8 flex-wrap w-full justify-end">
      {/* Sort by Name */}
      <div>
        Name sorted order: {ascending ? "Ascending" : "Descending"}
        <button
          className="px-4 py-1 bg-black text-white rounded-md ml-2"
          onClick={() => setAscending(!ascending)}
        >
          Change
        </button>
      </div>
      {/* Search By Name */}
      <div className="flex gap-2">
        <input
          type="text"
          className=" p-2 border rounded-l h-[40px]"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Filter Gender */}
      <select
        className="w-1/4 p-2 border rounded-md h-[40px] cursor-pointer"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="any">Any Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* Filter Race */}
      <div className="relative inline-block text-left">
        <button
          className="text-white bg-blue-700 flex px-8 py-2 justify-center items-center cursor-pointer rounded-md "
          type="button"
          onClick={() => setDropdown(!dropdown)}
        >
          Race
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path stroke="currentColor" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        {dropdown && (
          <ul className="absolute min-w-full bg-white border border-gray-400">
            {races.map((value) => (
              <li
                className="w-full border-b border-gray-200 rounded-t-lg "
                key={value}
              >
                <div className="flex items-center pl-3">
                  <input
                    type="checkbox"
                    value={value}
                    checked={race.includes(value)}
                    onChange={handleRaceChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="vue-checkbox"
                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {value}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}

        
      </div>
    </div>
  );
}

export default Filters;
