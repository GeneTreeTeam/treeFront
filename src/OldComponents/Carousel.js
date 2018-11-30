import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import First from '../assets/1.jpg';
import Second from '../assets/2.jpg';
import Third from '../assets/3.jpg';
import Fourth from '../assets/4.jpg';


export default class CarouselMoving extends Component{
    onChange(){
    }
    onClickItem(){}
    onClickThumb(){}
    render(){
    return (
            <Carousel showArrows={true} onChange={this.onChange()} onClickItem={this.onClickItem()} onClickThumb={this.onClickThumb()}>
                <div>
                    <image ></image>
                    <img src={First} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={Second} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={Third} />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={Fourth} />
                    <p className="legend">Legend 4</p>
                </div>

            </Carousel>
    );
    }
}