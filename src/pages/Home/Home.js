import React from 'react';
import AdvertisedItem from '../../components/AdvertisedItem/AdvertisedItem';
import Banner from '../../components/Banner/Banner';
import Categories from '../../components/Categories/Categories';
import ContactUs from '../../components/ContactUs/ContactUs';

const Home = () => {
    return (
        <div>
            <Banner />
            <Categories />
            <AdvertisedItem />
            <ContactUs />
        </div>
    );
};

export default Home;