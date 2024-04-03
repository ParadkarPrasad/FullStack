const CountryClick = ({ countryShow, showCountry }) => {
  return (
    <>
      {countryShow.map((nation) => {
        <div key={nation.numericCode}>
          {nation.name}
          <button
            type="button"
            value={nation.name}
            onClick={showCountry}
          ></button>
        </div>;
      })}
    </>
  );
};

export default CountryClick;
