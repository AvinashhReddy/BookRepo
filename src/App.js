import { Button ,Form,Card} from 'react-bootstrap';
import './App.css';
import axios from 'axios'
import {useState,useEffect} from 'react'

import ReactStars from "react-rating-stars-component";

function App() {
  
const [books,setBooks]=useState()
const [searchValue,setSearchValue]=useState()
const [cart,setCart]=useState([])
const [flag,setFlag]=useState(true)
useEffect(async()=>{
  
 await axios.get('./data.json')
 .then((res)=>{
   console.log(res.data);
   setBooks(res.data)
 }).catch((err)=>{
   console.log(err);
 })

}
,[])
if(!books){
  return <h1 style={{textAlign:'center',paddingTop:'18vw'}}>Loading data...please wait for sometime</h1>
}
const setSearch=(event)=>{
  
  setSearchValue(event.target.value)
}

const addtoCart=(event,index)=>{
var a=[...cart]
a.push(index)
setCart(a)
}
function compareByPrice( a, b ) {
  if ( a.price < b.price ){
    return -1;
  }
  if ( a.price > b.price ){
    return 1;
  }
  return 0;
}

const sortby=(event)=>{
  if(event.target.value=="htol"){
    books.sort(compareByPrice)
 
  let a=[...books]
  
  setBooks(a.reverse())
  }
  else{
    books.sort(compareByPrice)
    let a=[...books]
    
  setBooks(a)
  }
  

} 

  return (
    <div >
      <h1 style={{textAlign:'center',padding:'2vw'}}>Book Repo</h1>
      <div style={{paddingTop:'0vw',paddingLeft:'4vw',display:'inline-block'}}>
        <h5>Sort by :</h5>
        <select onChange={(event)=>sortby(event)}>
  <option value="-">-</option>
  <option value="htol">price(high to low)</option>
  <option value="ltoh">price(low to high)</option>
  
</select>
</div>
<div style={{display:'inline-block', paddingLeft:'63vw'}}>
<Button onClick={(event)=>{setFlag(false)}}>Cart({cart.length})</Button>
</div>
<div style={{display:'inline-block', paddingLeft:'1vw'}}>
<Button>CheckOut</Button>
</div>

<div style={{paddingLeft:'4vw',paddingTop:'1vw',paddingRight:'6vw'}}>
<Form.Control type="email" placeholder="Search Books by title" onChange={(event)=>{setSearch(event)}} />
</div>

{flag && <>
{books.map((book,index)=>{
  return (<div>
{ new RegExp(searchValue,"i").test(book.title) &&  <div style={{paddingLeft:'4vw',paddingRight:'6vw',paddingTop:'1vw'}}>
   <Card >
  <Card.Header as="h5">{book.title}</Card.Header>
  <Card.Body>
    
    <Card.Text>
      <h5>authors : {book.authors}</h5>
      
      <h5>average rating :  <ReactStars
    count={5}
    isHalf={true}
    size={24}
    value={book.average_rating}
    
    
    activeColor="#ffd700"
  /></h5>
  <h5>isbn : {book.isbn}</h5>
  <h5>language code : {book.language_code}</h5>
  <h5>number of ratings : {book.ratings_count}</h5>
  <h5>price : {book.price} $</h5>
    </Card.Text>
    <Button variant="primary" onClick={(event)=>addtoCart(event,index)}> Add to cart</Button>
  </Card.Body>
</Card>
    </div> }
    </div>
  )
})
  } </>}

  {!flag && 
  <>
  <div style={{paddingLeft:'87vw',paddingTop:'1vw'}}><Button onClick={(event)=>{setFlag(true)}}>GoBack</Button></div>
  <h3 style={{paddingLeft:'4vw',paddingtop:'1vw'}}>Items in your Cart :</h3>
  {cart.map((index)=>{
    let book=books[index]
    return (<div>
  { new RegExp(searchValue,"i").test(book.title) &&  <div style={{paddingLeft:'4vw',paddingRight:'6vw',paddingTop:'1vw'}}>
     <Card >
    <Card.Header as="h5">{book.title}</Card.Header>
    <Card.Body>
      
      <Card.Text>
        <h5>authors : {book.authors}</h5>
        
        <h5>average rating :  <ReactStars
      count={5}
      isHalf={true}
      size={24}
      value={book.average_rating}
      
      
      activeColor="#ffd700"
    /></h5>
    <h5>isbn : {book.isbn}</h5>
    <h5>language code : {book.language_code}</h5>
    <h5>number of ratings : {book.ratings_count}</h5>
    <h5>price : {book.price} $</h5>
      </Card.Text>
      
    </Card.Body>
  </Card>
      </div> }
      </div>
    )
  })
    } </>
  
  }
    </div>
  );
}

export default App;
