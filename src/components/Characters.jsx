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
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dropdown, setDropdown] = useState(false);
  const [preventFromContinuosCalling, setPreventFromContinuosCalling] = useState(true)

  const [filteredLink, setFilteredLink] = useState(
    `/character?limit=10&page=1`
  );

  const fetchCharacters = async (url) => {
    try {
      setLoading(true);
      const data = await fetch(url);
      setCharacters(data);
      setLoading(false);
    } catch (error) {
      setError("Oops, Something went wrong");
    }
  };

  useEffect(() => {
    if(preventFromContinuosCalling){
      const object = {
        name: debouncedName,
        gender: gender,
        race: race,
        asc: ascending,
      };
      setPage(1);
      let link = `/character?limit=${limit}&page=${1}`;
      try {
        for (const [key, value] of Object.entries(object)) {
          if (key === "name" && value.length > 0) {
            link += `&${key}=/${value}/i`;
          }
          if (key === "race" && value.length > 0) {
            link += `&race=${race.join(",")}`;
          }
          if (key === "asc") {
            link += `&sort=name:${ascending ? "asc" : "desc"}`;
          }
          if (key === "gender" && value.length > 0 && value != "any") {
            link += `&gender=${value}`;
          }
        }
      } catch (error) {
        link = `/character?limit=${limit}&page=${1}`;
      }
      fetchCharacters(link);
      setFilteredLink(link);
    }
  }, [
    debouncedName,
    gender,
    race,
    ascending,
    limit,
    preventFromContinuosCalling,
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedName(name);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [name]);

  const handleNext = () => {
    try {
      const updatedLink = filteredLink.replace(/page=\d+/, `page=${page + 1}`);
      setFilteredLink(updatedLink);
      setPage(page + 1);
      fetchCharacters(updatedLink);
    } catch (error) {
      setCharacters([]);
    }
  };
  const handlePrev = () => {
    if (page === 1) return;
    const updatedLink = filteredLink.replace(/page=\d+/, `page=${page - 1}`);
    setFilteredLink(updatedLink);
    setPage(page - 1);
    fetchCharacters(updatedLink);
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value); 
  };

  const refresh = () => {
    setPreventFromContinuosCalling(false)
    setName("")
    setDebouncedName("")
    setGender("")
    setAscending(true)
    setLimit(10)
    setPage(1)
    setRace([])
    setDropdown(false)
    setPreventFromContinuosCalling(true)
  }

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
      {(name || gender || race.length > 0 || !ascending) && (
        <button
          className="absolute bottom-10 left-10 flex gap-4 bg-gray-400 px-6 py-2 rounded-2xl"
          onClick={refresh}
        >
          Clear filters and refresh
        </button>
      )}
    </>
  );
}

export default Characters;
