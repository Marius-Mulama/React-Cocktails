import React, { useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const res = await fetch(`${url}${id}`);
        const data = await res.json();
        const { drinks } = data;
        if (drinks) {
          const {
            strDrink: name,
            strDrinkThumb: img,
            strCategory: category,
            strGlass: glass,
            strAlcoholic: info,
            strInstructions: instructions,
            strIngredient1, 
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = drinks[0];
          const ingredients = [
            strIngredient1, 
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const newCocktail = {
            name,img,info,category,glass,instructions,ingredients
          }
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
        setLoading(false)

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    getCocktail();
  }, [id]);

  if(loading)
  {
    return <Loading/>
  }
  if(!cocktail)
  {
    return <h2 className="section-title">no cocktail to display</h2>
  }
  const {name,img,info,category,glass,instructions,ingredients} = cocktail;
  return (
    <section className="section cocktail-section">
    <Link to="/" className="btn btn-primary">
      Back Home
    </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={img} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions: </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients: </span>
            {
              ingredients.map((item,index)=>{
                return item ? <span key={index}>{item}</span> : null
              })
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
