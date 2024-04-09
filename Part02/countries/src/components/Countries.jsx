// import CountryClick from "./CountryClick";
// const Countries = ({ countryShow, showCountry }) => {
//   console.log(countryShow);
//   if (countryShow.length === 1) {
//     return <li>{countryShow[0]}</li>;
//   } else if (countryShow.length <= 10) {
//     return (
//       <CountryClick countryShow={countryShow[0]} showCountry={showCountry} />
//     );
//   } else if (countryShow === "") {
//     return <li>{countryShow}</li>;
//   } else {
//     return <p>Too many matches, specify another filter</p>;
//   }
// };
// export default Countries;
// const Countries = ({ countryShow }) => {
//   if (countryShow.length > 10) {
//     return <div>Too many matches, specify another filter</div>;
//   } else if (countryShow.length <= 10 && countryShow.length > 1) {
//     return (
//       <div>
//         {countryShow.map((country) => (
//           <div key={country.name}>
//             {country.name}
//             <button value={country.name}>show</button>
//           </div>
//         ))}
//       </div>
//     );
//   } else {
//     return <Countries country={countryShow[0]} />; // your component to show a single country
//   }
// };
// export default Countries;
import CountryClick from "./CountryClick";
import SingleCountry from "./SingleCountry";
const Countries = ({ countryShow, showCountry }) => {
  console.log(showCountry);
  if (countryShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countryShow.length <= 10 && countryShow.length > 1) {
    return <CountryClick countryShow={countryShow} showCountry={showCountry} />;
  }
  if (countryShow.length == 1) {
    return <SingleCountry oneCountry={countryShow[0]} />;
  }
  return <p>No matches</p>;
};

export default Countries;
