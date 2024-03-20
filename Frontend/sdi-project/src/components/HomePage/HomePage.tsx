import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const handleNavigateToList = () => {
    navigate("/tickets");
  };
  return (
    <div className="container">
      <h1 className="heading">HomePage</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleNavigateToList}
      >
        List of tickets
      </button>
    </div>
  );
}

export default HomePage;
