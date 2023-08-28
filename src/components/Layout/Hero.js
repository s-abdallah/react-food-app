import React, { memo } from "react";
import heroImage from "../../assets/header.jpg";
import Card from "../UI/Card";

const Hero = (props) => {
  return (
    <React.Fragment>
      <div className="hero">
        <figure style={{ backgroundImage: `url(${heroImage})` }}>
          <img src={heroImage} alt="Hero" width="1033" height="688" />
        </figure>

        <Card className="caption">
          <h2> {props.title} </h2>
          <p>
            Your Gateway to Gastronomic Delights: Explore Our Culinary Universe
            Indulge Your Palate: Dive into a World of Irresistible Flavors A
            Symphony of Taste and Texture Awaits – Welcome to [Food APP] Savor
            the Art of Food: Where Flavor Meets Imagination More Than a Meal: An
            Epicurean Journey Awaits You Curated Cravings: Your Ultimate
            Destination for Exquisite Food Celebrate Flavor, Comfort, and Joy
            with [Food APP] Where Every Bite Tells a Story: Unveil the Magic at
            [Food APP] Elevate Your Dining Experience: Join Us in Redefining
            Delicious"
          </p>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default memo(Hero);
