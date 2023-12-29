import React from "react";
import axios from "axios";
import Cloth from '../components/Clothes';
import './Home.css';

class Home extends React.Component{
    state={
        isLoading: true,
        clothes: [],
    }

    getClothes= async()=>{
        const{
            data:{
                data:{clothes},
            },
        }=await axios.get('https://gist.githubusercontent.com/BB5030/cf655c9f813ff888f7aa265d56113168/raw/4dd8cac3a1bf7d8239a5f74e4361d2bc5c4e30e5/data2.json')
        this.setState({clothes, isLoading:false});
    };
    
    componentDidMount(){
        this.getClothes();
    }

    render(){
        const {isLoading, clothes} = this.state;
        return(
            <section className="container">
                {isLoading ? (
                    <div className="loader">
                        <span className="loader_text">Loading...</span>
                    </div>
                ):(
                    <div>
                        <div className="clothBox">
                            <div className="price"><h1>20,000 ~ 50,000</h1></div>
                            <div className="clothes">
                            {clothes.map(cloth=>(
                                cloth.lprice >= 20000 && cloth.lprice <= 50000 &&
                                <Cloth
                                    key={cloth.index}
                                    image={cloth.image}
                                    title={cloth.title}
                                    link={cloth.link}
                                    lprice={cloth.lprice}
                                />
                            ))}
                            </div>
                        </div>
                        <div className="clothBox">
                            <div className="price"><h1>50,000 ~ 100,000</h1></div>
                            <div className="clothes">
                            {clothes.map(cloth=>(
                                cloth.lprice >= 50000 && cloth.lprice <= 100000 &&
                                <Cloth
                                    key={cloth.index}
                                    image={cloth.image}
                                    title={cloth.title}
                                    link={cloth.link}
                                    lprice={cloth.lprice}
                                />
                            ))}
                            </div>
                        </div>
                        <div className="clothBox">
                            <div className="price"><h1>100,000 ~</h1></div>
                            <div className="clothes">
                            {clothes.map(cloth=>(
                                cloth.lprice >= 100000 &&
                                <Cloth
                                    key={cloth.index}
                                    image={cloth.image}
                                    title={cloth.title}
                                    link={cloth.link}
                                    lprice={cloth.lprice}
                                />
                            ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    }
}
export default Home;
