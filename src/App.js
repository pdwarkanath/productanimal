import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    margin: theme.spacing(2, 0, 0),
    width: theme.spacing(40),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  about: {
    margin: theme.spacing(8, 4),
  },
}));


function App() {
  const classes = useStyles();
  return (
  <div>
  
  <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <ProductForm />
      <About />
  </Grid>
  </div>
  );
}

const suffixes = ['zebra', 'panda', 'gator', 'fox', 'monkey', 'cat', 'wolf', 'dog'];
const n = suffixes.length;
const generateDomain= async(product, updateDomain) => {
  const domain = product.replace(/[^a-z0-9]/gi, '') + suffixes[Math.floor(Math.random()*n)] +'.com';
  let url = 'https://wq2b5o9kkc.execute-api.us-east-2.amazonaws.com/?domain='+ domain;
  let res = await fetch(url)
  let json = await res.json()
  json.available ? updateDomain(domain) : generateDomain(product, updateDomain)
  console.log(json)
  return
}
function ProductForm() {
  const classes = useStyles();
  const [product, setProduct] = React.useState('')
  const [suggestedDomain, updateDomain] = React.useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    generateDomain(product, updateDomain)
}
  const inputProps = {
    minLength: 4,
  };
  return (    
  <Grid item xs={12} sm={8} md={6}>
    <form className={classes.form} onSubmit={handleSubmit}>
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Enter Product
      </Typography>
        <TextField id="product" inputProps={inputProps} label="Product" variant="outlined" name="product" className={classes.input} onChange={e => setProduct(e.target.value)} required autoFocus/>
        <Button type="submit" variant="contained" color="primary" className={classes.submit}>Generate</Button>
        {suggestedDomain !== '' && <Typography component="h1" variant="h5">{suggestedDomain}</Typography>}
    </div>
    </form>
    
  </Grid>
  );
}

function About() {
  const classes = useStyles();
  return (    
  <Grid item xs={12} sm={4} md={6}>
    <div className={classes.about}>
      <Typography component="h1" variant="h5">
        About
      </Typography>
      <Typography component="p">If you're an entrepreneur looking to name your startup, it needs to be unique and memorable. A common formula is using combining the product name with that of an animal. foodpanda, mailchimp, hostgator are just some successful companies that have used this formula. This app helps you find that brand name for you.</Typography>
      <Typography component="p">Enter a word for the product you're building and we'll generate a brand name that has a .com domain available to register.</Typography>
    </div>
  </Grid>
  );
}

export default App;


