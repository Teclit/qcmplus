import React from 'react'
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationMenu from "../../components/NavigationMenu/NavigationMenu";
import Apropos from '../../components/apropos/Apropos';
import Banner from '../../components/banner/Banner';
import LeadMagnet from '../../components/leadMagnet/LeadMagnet';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header/Header';
import Testimonials from '../../components/testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <div className='container_header'>
                <NavigationMenu />
                <Header />
                <Apropos />
                <Banner />
                <Testimonials/>
                <LeadMagnet />
                <Footer />
            </div>
        </div>
    )
}

export default Home


