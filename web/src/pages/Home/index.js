import  React, {useEffect, useState, useContext} from 'react';
import axios from 'axios'
import { v4 as uuid } from "uuid";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { GlobalContext } from "../../context/GlobalState";
import Button from '@mui/material/Button';
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';



function Home() {
  const { addItem, addQuant, quant } = useContext(GlobalContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  function addToCart(item, index){
    const { name, family, genus,nutritions } = item
    const { carbohydrates, protein, fat, calories, sugar } = nutritions

    addQuant(1)

    addItem(
     {
        id: uuid(),
        quantItem:1,
        name: name,
        family: family,
        genus,
        carbohydrates: carbohydrates, 
        protein,
        fat,
        calories,
        sugar
      }
    )
  }

  async function getProducts() {

    await axios.get("http://localhost:8000")
    .then((response) => {
      console.log(response.data)
      setLoading(false)
      setProducts(response.data)
      
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
  
    })
  }
  useEffect(() => {
    setLoading(true)
    getProducts()
  }, []);
  

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  function Spacer (height) {
    return (
      <div style={{ height : height ? height : 72 }} >

      </div>
    )
  }


  return (
    <Box sx={{ flexGrow: 1,  width: '100%'  }}>
      <AppBar  position="fixed">
        <Toolbar sx={{ justifyContent:'space-between', backgroundColor:'#2FB86E' }} >

        <div style={{ width:48, }} /> 
    
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            Hortifruti Frexco
          </Typography>

          <Link to ="/cart">
          <IconButton
              sx={{color:'#fff', width:48, height:48}}
              aria-label="show 17 new notifications"
            >
              <Badge badgeContent={quant} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            </Link>
            
        </Toolbar>
      </AppBar>
              {Spacer(72)}  


   { products && !loading 
     ? 

    (
      <Grid 
       container spacing={4}>
      {products.map((item, index) => (
        <Grid key={index} item lg={2}  md={3} sm={3} xs={0}>
          <Box >
          
            <Box  sx={{ alignItems:'center',  display:'flex', flexDirection:'column', backgroundColor:'#e5e6e7', padding:2 , borderRadius:2  }}>
              <div style={{ alignItems:'center' }} >

              <Typography
                style={{ fontWeight: 600,  }}
                gutterBottom
                variant='h5'
                color='textPrimary'
              >
                {item.name}
              </Typography>
              <Typography
                display='block'
                variant='body1'
                color='#222'
              >
                {item.family}
              </Typography>
              <Typography
                display='block'
                variant='body1'
                color='#222'
              >
                {item.genus}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {`carbohydrates • ${item.nutritions.carbohydrates}`}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {`protein • ${item.nutritions.protein}`}
              </Typography>

              <Typography  variant='body2' color='textSecondary'>
                {`fat • ${item.nutritions.fat}`}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {`calories • ${item.nutritions.calories}`}
              </Typography>

              <Typography style={{ textAlign:'left' }} variant='body2' color='textSecondary'>
                {`sugar • ${item.nutritions.sugar}`}
              </Typography>

    {Spacer(18)}
      <Button sx={{ color:"#2FB86E", border:1,  }} onClick={ () =>  addToCart(item, index)} size="small">Add to cart</Button>
 
    </div>

            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
    )



      :
      <div style={{ alignItems:"center", justifyContent:"center", display:'flex',   }} >
      <Spacer />
      <Dots color='#2FB86E' />
    </div>
      
      }

    </Box>
  );
}

export default Home