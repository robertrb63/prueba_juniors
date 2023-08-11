import { useEffect, useState } from "react";
import "./App.css";

const ENPOINT_RAMDOM_CAT = "https://catfact.ninja/fact";
// const ENDPOINT_CAT = `https://cataas.com/cat/gif/says/${firstWord}?filter=sepia&color=orange&size=40&type=or&json=true`
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";
export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, SetimageUrl] = useState();

  useEffect(() => {
    fetch(ENPOINT_RAMDOM_CAT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);

  useEffect(() => {
    if (!fact) return;
    const firstWord = fact.split(" ", 3).join(" ");
    console.log(firstWord);

    fetch(
      `https://cataas.com/cat/gif/says/${firstWord}?filter=sepia&color=orange&size=40&type=or&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        const { url } = response;
        SetimageUrl(url);
      });
  }, [fact]);

  return (
    <main>
      <h1> App Mis Gatitos </h1>
      <section>
        {fact && <p> {fact} </p>}
        {imageUrl && (
          <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={fact} />
        )}
      </section>
    </main>
  );
}
