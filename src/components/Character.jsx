/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */

import male from "../assets/male.png";
import female from "../assets/female.png";
import { useNavigate } from "react-router-dom";

function Character({character}) {
  const order = ["name", "gender", "race"];
  const navigate = useNavigate()

  return (
    <div className="h-[300px] w-[250px] border rounded-md border-gray-400 bg-gray-100 flex flex-col items-center p-4 gap-4 cursor-pointer" onClick={()=>navigate('/details', { state:{data: character} })}>
      {character.gender === "Male" ? (
        <img src={male} alt={character.name} className="w-[100px] h-[100px]" />
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
              <p className="font-bold capitalize">{key}</p>
              <p>{character[key]}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default Character