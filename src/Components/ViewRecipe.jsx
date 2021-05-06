import "./ViewRecipe.css";

const ViewRecipe = (props) => {
  return (
    <div className="recipe-container">
      <h1>{props.name}</h1>
      <div className="ingredients">
        <p>
          <ul>
            <li>
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.{" "}
            </li>
            <li>
              {" "}
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown
            </li>
            <li>
              {" "}
              printer took a galley of type and scrambled it to make a type
              specimen book.{" "}
            </li>
            <li>
              {" "}
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining
            </li>
            <li>
              essentially unchanged. It was popularised in the 1960s with the
              release of Letraset sheets containing{" "}
            </li>
            <li>
              {" "}
              Lorem Ipsum passages, and more recently with desktop publishing
              software like{" "}
            </li>
            <li>Aldus PageMaker including versions of Lorem Ipsum.</li>
          </ul>
        </p>
      </div>
      <div className = "directions">
        
          <ul>
            <li>1. Do stuff</li>
            <li>1. Do stuff</li>
            <li>1. Do stuff</li>
            <li>1. Do stuff</li>
            <li>1. Do stuff</li>
          </ul>
      
      </div>
    </div>
  );
};

export default ViewRecipe;
