import React, {useEffect, useState} from 'react';

import { Alert, Container } from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../../../config';

const Prices = () => {

  useEffect( ()=> {
     const fetchData = async()=>{
      let res = await axios.get(`${API_URL}/concerts`);
      setConcerts(res.data)
     }

     fetchData();
    
  }, []);

  const [concerts, setConcerts] = useState([]) 


return (
  <Container>
    <h1>Prices</h1>
    <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
    
    <Alert color="info">
        Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
    </Alert>

    {concerts.map((concert)=> ( 
      <div>
        <h2> Day {concert.day}</h2>
        <p> Price: {concert.price} $ </p>
        <p> Workshops: "{concert.workshops.map((workshop)=>(workshop.name)).join(", ")}"</p>
      </div>
    ))}
  </Container>
);

}

export default Prices;