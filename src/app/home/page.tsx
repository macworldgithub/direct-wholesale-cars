// import React from "react";
// import Price from "../components/UIComponents/Price/Price";
// import Card from "../components/UIComponents/Card/Card";
// import "./cars/cars.scss";

// const carsData = [
//   {
//     name: "2023 Toyota Camry LE",
//     description: "25,420 miles · Automatic · FWD",
//     price: "$22,500",
//     tags: ["Certified"],
//     image: "/images/cars.png",
//     location: "Atlanta, GA · Premium Auto Dealer"
//   },
//   {
//     name: "2023 Toyota Camry LE",
//     description: "25,420 miles · Automatic · FWD",
//     price: "$35,900",
//     tags: ["Featured"],
//     image: "/images/cars.png",
//     location: "Atlanta, GA · Premium Auto Dealer"
//   },
//   {
//     name: "2023 Toyota Camry LE",
//     description: "25,420 miles · Automatic · FWD",
//     price: "$28,750",
//     tags: ["New"],
//     image: "/images/cars.png",
//     location: "Atlanta, GA · Premium Auto Dealer"
//   }
// ];

// export default function Home() {
//   return (
//     <div className="main-container">
//       <Price />
//       <div className="cards-wrapper">
//         {carsData.map((car, idx) => (
//           <Card
//             key={idx}
//             name={car.name}
//             description={car.description}
//             price={car.price}
//             tags={car.tags}
//             image={car.image}
//             location={car.location}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
