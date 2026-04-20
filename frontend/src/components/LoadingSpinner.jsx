import "../styles/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-wrapper">
        <div className="base-ring"></div>
        <div className="spinning-ring"></div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
