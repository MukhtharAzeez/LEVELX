/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import fetch from "../../Apis/fetch";
import Character from "./Character";
import Filters from "./Filters";
import { LoadingContext } from "../contexts/LoadingContext";

function Characters() {
  const { loading, setLoading, setError } = useContext(LoadingContext);
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState([]);
  const [clearRace, setClearRace] = useState(false);
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dropdown, setDropdown] = useState(false);


  const fetchCharacters = async (url) => {
    try {
      setLoading(true);
      const data = await fetch(url);
      setCharacters(data);
      setLoading(false);
    } catch (error) {
      setError("Oops, Something went wrong")
    }
  };
  useEffect(() => {
    if (race.length === 0) {
      setClearRace(true);
      return;
    }
    setPage(1)
    fetchCharacters(
      `/character?limit=${limit}&page=${1}&race=${race.join(",")}`
    );
    
  }, [race]);

  useEffect(() => {
    setPage(1)
    if (debouncedName.length === 0) {
      fetchCharacters(`/character?limit=${limit}&page=${1}`);
      return;
    }
    fetchCharacters(
      `/character?limit=${limit}&page=${1}&name=/${debouncedName}/i`
    );
  }, [debouncedName]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedName(name);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [name]);

  useEffect(() => {
    setPage(1)
    if (gender === "any") {
      fetchCharacters(`/character?limit=${limit}&page=${1}`);
      return;
    }
    if (gender === "Male" || gender === "Female")
      fetchCharacters(
        `/character?limit=${limit}&page=${1}&gender=${gender}`
      );
  }, [gender]);

  useEffect(() => {
    if (clearRace) {
      setPage(1)
      fetchCharacters(`/character?limit=${limit}&page=${1}`);
      setClearRace(false);
    }
  }, [clearRace]);

  const sortByName = (value) => {
    setPage(1)
    fetchCharacters(
      `/character?limit=${limit}&page=${1}&sort=name:${value}`
    );
    setAscending(!ascending);
  };

  const handleNext = () => {
    try {
      setName("")
      // setDebouncedName("")
      setGender("")
      // setRace([])
      setDropdown(false)
      setPage(page + 1);
      setAscending(true)
      fetchCharacters(`/character?limit=${limit}&page=${page + 1}`);
    } catch (error) {
      setCharacters([]);
    }
  };
  const handlePrev = () => {
    if (page === 1) return;
     setName("");
    //  setDebouncedName("");
     setGender("");
    //  setRace([]);
      setDropdown(false);
      setAscending(true);
     
    setPage(page - 1);
    fetchCharacters(`/character?limit=${limit}&page=${page - 1}`);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    setPage(1)
    fetchCharacters(`/character?limit=${e.target.value}&page=${1}`);
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold pb-4 ">Characters</h1>
        <Filters
          name={name}
          setName={setName}
          gender={gender}
          setGender={setGender}
          race={race}
          setRace={setRace}
          ascending={ascending}
          setAscending={setAscending}
          sortByName={sortByName}
          dropdown={dropdown}
          setDropdown={setDropdown}
        />
      </div>

      <div className="w-full flex flex-wrap gap-5 justify-center max-h-[800px] overflow-x-scroll">
        {characters.map((character) => (
          <Character key={character._id} character={character} />
        ))}
      </div>

      {!loading && characters.length === 0 && (
        <div className="text-center font-bold text-4xl ">
          No characters found
        </div>
      )}

      {characters.length > 0 && (
        <div className="absolute bottom-10 right-10 flex gap-4 bg-gray-400 px-6 py-2 rounded-2xl">
          <select
            className="p-2 border rounded-md px-6 cursor-pointer"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>

          <button
            className={`px-4 py-2 rounded-md bg-black text-white ${
              page === 1 ? "cursor-not-allowed" : "cursor-pointer"
            } `}
            onClick={handlePrev}
          >
            {page - 1}
          </button>
          <button className="px-4 py-2 rounded-md cursor-default">
            Page: <strong>{page}</strong>
          </button>
          <button
            className="px-4 py-2 rounded-md bg-black text-white cursor-pointer"
            onClick={handleNext}
          >
            {page + 1}
          </button>
        </div>
      )}
    </>
  );
}

export default Characters;
