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
        }=await axios.get('https://gist.githubusercontent.com/BB5030/f5837a9d2b79775dbcda223e389a5444/raw/192d0041786eb35941214ebe931c1dd7bd7482b6/data3.json')
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
