import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

export default class VerticalAndFade extends Component {
  constructor(props){
    super(props);
    this.state = {
      cars:[

      ]
    }
  }

  handleChange = event => {
    document.getElementById('bg-img-car').src = event.target.src
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      vertical: true,
      verticalSwiping: true,
      // fade: true,

    };
    return (

        <div className="d">
          <Slider {...settings}>
            {this.state.cars && this.state.cars.map((item) => (
                <div key={item.id}>
                  {item.group && item.group.map((it,index) => (
                      <div key={index} className='slide-img'>
                        <img className="j"
                             src={it}
                             onClick={this.handleChange.bind(this)}/>
                      </div>
                  ))}
                </div>
            ))}
          </Slider>
        </div>
    );
  }
}
