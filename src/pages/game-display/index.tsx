import { useState } from "react";
import { useParams } from "react-router-dom";

import { data } from "../../../data";

// import BackLogo from "@assets/images/icon-back.svg";
// import CategoryLogo from "@assets/images/pick_category.svg";

import "./index.scss";

const GameDisplay = () => {
  const catObjects = Object.keys(data.categories).map((name, index) => ({
    name,
    id: index,
  }));

  let [lifes, setLifes] = useState(5);
  const { id } = useParams();

  const category_name = catObjects.find(
    (elem: { name: string; id: number }) => elem.id === Number(id)
  )?.name;
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const [selectedAlphabets, setSelectedAlphabets] = useState([]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const options = data.categories[category_name];

  const randomOption =
    options[Math.floor(Math.random() * options.length)]?.name?.split("");

  const randomElement = randomOption.map((char: string) => ({
    char: char.toLowerCase(),
    guessed: false,
  }));

  const [words, setWords] = useState(randomElement);

  console.log({ randomElement });

  const onClick = (char: string) => {
    // both scenario
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setSelectedAlphabets([...selectedAlphabets, char]);
    // good scenario
    if (
      words?.find(
        (elem: { char: string; guessed: boolean }) =>
          elem.char.toLowerCase() === char.toLowerCase()
      )
    ) {
      const test = words.map((elem: { char: string; guessed: boolean }) => {
        if (elem.char === char) {
          return {
            char,
            guessed: true,
          };
        } else return elem;
      });
      setWords(test);
    }
    // bad scenario
    else {
      setLifes(lifes - 1);
    }
  };
  const listItems = alphabet.map((char: string) => (
    <button
      onClick={() => onClick(char)}
      className="word__container"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      disabled={!!selectedAlphabets.includes(char)}
      key={char}
    >
      {char}
    </button>
  ));

  const guessedWord = words?.map(
    (item: { guessed: boolean; char: string }, index: number) => {
      if (item.char == " ") {
        return (
          <div
            key={index}
            style={{ visibility: "hidden", height: "109px", width: "109px" }}
          />
        );
      } else {
        return (
          <div className="char__container" key={index}>
            <div> {item.guessed ? item.char : ""} </div>
          </div>
        );
      }
    }
  );

  return (
    <div style={{ display: "flex" }}>
      <div>
        {" "}
        <h1 style={{ fontSize: "1.5rem", color: "#fff" }}>
          Find one of {category_name}{" "}
        </h1>
      </div>
      <div style={{ color: "#fff", fontSize: 50 }}>{lifes} </div>
      <section className="alphabet__container"> {guessedWord}</section>
      <section className="alphabet__container"> {listItems}</section>
    </div>
  );
};

export default GameDisplay;
