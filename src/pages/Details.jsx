/* eslint-disable no-prototype-builtins */
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import male from "../assets/male.png";
import female from "../assets/female.png";
import { LoadingContext } from "../contexts/LoadingContext";
import fetch from "../../Apis/fetch";

function Details() {
  const navigate = useNavigate();
  const { loading, setLoading, setError } = useContext(LoadingContext);
  const {id} = useParams()
  const [character, setCharacter]= useState(null)

    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const result = await fetch(`/character/${id}`);
        setCharacter(result[0]);
        setLoading(false);
      } catch (error) {
        setError("Oops, Something went wrong");
      }
    };

    useEffect(() => {
      fetchCharacters();
    },[])
 
  const order = [
    "name",
    "gender",
    "race",
    "birth",
    "death",
    "hair",
    "height",
    "realm",
    "spouse",
    "wikiUrl",
  ];


  return (
    <>
      {character && (
        <>
          <div className=" border rounded-md border-gray-400 bg-gray-100 flex flex-col items-center p-4 gap-4">
            {character.gender === "Male" ? (
              <img
                src={male}
                alt={character.name}
                className="w-[100px] h-[100px]"
              />
            ) : (
              <img
                src={female}
                alt={character.name}
                className="w-[100px] h-[100px]"
              />
            )}

            {order.map((key) => {
              if (character.hasOwnProperty(key)) {
                return (
                  <div key={key} className="flex gap-4">
                    {key === "wikiUrl" ? (
                      <button
                        className="px-4 py-2 rounded-md bg-black text-white"
                        onClick={() => window.open(character[key])}
                      >
                        Click here to go to {key}
                      </button>
                    ) : (
                      <>
                        <p className="font-bold capitalize">{key}</p>
                        <p>{character[key] != "" ? character[key] : "N/A"}</p>
                      </>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
          <button
            className="px-4 py-2 rounded-md bg-black text-white mt-4"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </>
      )}
    </>
  );
}

export default Details;
