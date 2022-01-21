import  React, { useContext} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import "react-activity/dist/Dots.css";
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Grid from '@mui/material/Grid';

import { GlobalContext } from "../../context/GlobalState";

function Cart() {

  const { items, delQuant, delAll, deleteItems, updateItem, quant } = useContext(GlobalContext);

//new cart
function cleanCart(){
  
  if( items.length >0 ){
    delAll()
    alert('Carrinho limpo com sucesso!')

  }else {
    alert('Carrinho vazio.')

  }


}


function editProduct(item, value){
  const {id, quantItem, name, family, genus, carbohydrates, protein, fat, calories, sugar } = item

  if(value === 'ADD'){


  updateItem(
         {
        id:id,
        quantItem: quantItem +1,
        name:name,
        family: family,
        genus:genus,
        carbohydrates:carbohydrates, 
        protein:protein,
        fat:fat,
        calories:calories,
        sugar:sugar
      }
  )
}
else if(value === 'REMOVE'){
  
  updateItem(
    {
   id:id,
   quantItem: quantItem -1,
   name:name,
   family: family,
   genus:genus,
   carbohydrates:carbohydrates, 
   protein:protein,
   fat:fat,
   calories:calories,
   sugar:sugar
 }
)
}

}

function removeProd(id){
  delQuant(1)
  deleteItems(id)

}

//new cart

  function Spacer (height) {
    return (
      <div style={{ height:72 }} >

      </div>
    )
  }
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="fixed">
        <Toolbar sx={{ justifyContent:'space-between' ,backgroundColor:'#2FB86E' }} >


        <Link to ="/">
          <IconButton
            sx={{color:'#fff', width:48,  height:48}}
            >
                <ArrowBackRoundedIcon />
            </IconButton>
        </Link>

          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            Hortifruti Frexco
          </Typography>

          <IconButton
            onClick={cleanCart}
            sx={{color:'#D32F2F',width:48,  height:48}}
            >
              <Badge  badgeContent={quant} color="error">
                <RemoveShoppingCartOutlinedIcon  />

              </Badge>

            </IconButton>

        </Toolbar>
      </AppBar>
      <Spacer />

{
  items.length >0 
  ?
      <Grid 
       container spacing={4}>
      {items.map((item, index) => (
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
                mb={1}
                
              >
                {item.genus}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {`carbohydrates • ${item.carbohydrates}`}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {`protein • ${item.protein}`}
              </Typography>

              <Typography  variant='body2' color='textSecondary'>
                {`fat • ${item.fat}`}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                {`calories • ${item.calories}`}
              </Typography>

              <Typography style={{ textAlign:'left' }} variant='body2' color='textSecondary'>
                {`sugar • ${item.sugar}`}
              </Typography>
              

    
    <CardActions sx={{ flexDirection:'row' }} >
    <IconButton
            onClick={() => editProduct(item, 'ADD')}
            sx={{color:'black', width:48,  height:48}}
            >
                <AddOutlinedIcon />
            </IconButton>

            <Typography variant="h5" component="div">{item.quantItem}</Typography>

            <IconButton
              disabled={ item.quantItem  > 1 ? false: true }
                        onClick={() => editProduct(item, 'REMOVE')}

            sx={{color:item.quantItem >1 ? 'black': 'gray', width:48,  height:48}}
            >
                <RemoveOutlinedIcon />
            </IconButton>

    </CardActions>


      <Button sx={{color:'#DD5465'}}  onClick={ () =>  removeProd(item.id)} size="small">Remover produto</Button>
    
 
    </div>

            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>

    :
    <div style={{ width:'100%', height:'80%', display:'flex', flexDirection:'column',  alignItems:'center' }} >

<Typography
            variant="h5"
            noWrap
            component="div"
            color='#2FB86E'
          >
           Carrinho vazio
          </Typography>

   
    <ShoppingCartOutlinedIcon    sx={{color:'#2FB86E', width:100,  height:100}} />
    </div>


}
    </Box>
  );
}

export default Cart