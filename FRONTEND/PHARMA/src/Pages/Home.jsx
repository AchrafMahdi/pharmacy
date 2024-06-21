import React from "react";
import Hero from "../components/Hero";
import Steps from "../components/Steps";
import FAQ from "../components/FAQ";
import Cards from "../components/Cards";

const Home = () => {
    return (
        <div>
            <Hero />
            <Steps />
            <Cards />
            <FAQ />
        </div>
    );
};

export default Home;
