import { Component } from "react";
import { Form, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});
//console.log(process.env);
export default class Header extends Component {
    state = {
        weather_data: [],
        city: 'Delhi',
        country: 'IN',
        rdate: '',
        rday: '',
        icon: '',
        currentTemp: '',
        tempDesc: ''
    }

    constructor(){
        console.log('I am constructor');
        //Super(): It is used to call the constructor of its parent class. 
        //This is required when we need to access some variables of its parent class.
        super();
        this.getWeatherData();
    }   
    
    //http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=8584915e301635faa851c9666a5108a6
    getWeatherData = () => {
        api.get(`/weather?q=${this.state.city}&appid=${process.env.REACT_APP_OW_ID}&units=metric`).then(res => {
            //console.log(`currentTemp:${res.data.main.temp}`);
            this.setState({
                currentTemp: res.data.main.temp,
                country: res.data.sys.country,
                icon: `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`,
                tempDesc: res.data.weather[0].description,
                rdate: `${Date().toLocaleString().split(' ')[1]} ${Date().toLocaleString().split(' ')[2]}, ${Date().toLocaleString().split(' ')[3]} ` ,
                rday: Date().toLocaleString().split(' ')[0]
            });
        }).catch(error => {
            Swal.fire(`Data not found on city name ${this.state.city}.`);
        })
    }

    submitCity = (e) => {
        e.preventDefault();
        this.getWeatherData();
    }

    onChange = (e) => {
        //console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }
  render() {
    const { currentTemp, rdate, rday, country, city, icon, tempDesc } = this.state;
    return (
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-12 grid-margin stretch-card">
              <div className="card card-weather">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="weather-date-location">
                        <h3>{rday}</h3>
                        <p className="text-gray">
                          {" "}
                          <span className="weather-date">
                            {rdate}
                          </span>{" "}
                          <span className="weather-location">
                            {city}, {country}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <Form onSubmit={this.submitCity}>
                        <Row className="align-items-center">
                          <Col xs="auto">
                            <Form.Label
                              htmlFor="inlineFormInputGroup"
                              visuallyHidden
                            >
                              Change City Here
                            </Form.Label>
                            <InputGroup className="mb-2">
                              <InputGroup.Text>&#128269;</InputGroup.Text>
                              <FormControl
                                id="inlineFormInputGroup"
                                placeholder="Delhi"
                                name="city"
                                value={city}
                                onChange={this.onChange}
                                required
                              />
                            </InputGroup>
                          </Col>
                          {/* <Col xs="auto">
                            <Button type="submit" className="mb-2">
                              Change City
                            </Button>
                          </Col> */}
                        </Row>
                      </Form>
                    </div>
                  </div>

                  <div className="weather-data d-flex">
                    <div className="mr-auto">
                      <h4 className="display-3">
                        {currentTemp} <span className="symbol">°</span>C
                      </h4>
                      <p> <img src={icon}/> {tempDesc} </p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="d-flex weakly-weather">
                    {/* <div className="weakly-weather-item">
                      <p className="mb-0"> Sun </p>{" "}
                      <i className="mdi mdi-weather-cloudy"></i>
                      <p className="mb-0"> 30° </p>
                    </div>
                    <div className="weakly-weather-item">
                      <p className="mb-1"> Mon </p>{" "}
                      <i className="mdi mdi-weather-hail"></i>
                      <p className="mb-0"> 31° </p>
                    </div>
                    <div className="weakly-weather-item">
                      <p className="mb-1"> Tue </p>{" "}
                      <i className="mdi mdi-weather-partlycloudy"></i>
                      <p className="mb-0"> 28° </p>
                    </div>
                    <div className="weakly-weather-item">
                      <p className="mb-1"> Wed </p>{" "}
                      <i className="mdi mdi-weather-pouring"></i>
                      <p className="mb-0"> 30° </p>
                    </div>
                    <div className="weakly-weather-item">
                      <p className="mb-1"> Thu </p>{" "}
                      <i className="mdi mdi-weather-pouring"></i>
                      <p className="mb-0"> 29° </p>
                    </div>
                    <div className="weakly-weather-item">
                      <p className="mb-1"> Fri </p>{" "}
                      <i className="mdi mdi-weather-snowy-rainy"></i>
                      <p className="mb-0"> 31° </p>
                    </div>
                    <div className="weakly-weather-item">
                      <p className="mb-1"> Sat </p>{" "}
                      <i className="mdi mdi-weather-snowy"></i>
                      <p className="mb-0"> 32° </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
