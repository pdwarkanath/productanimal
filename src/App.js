import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import namesilo from './img/namesilo.gif';
import namecheap from './img/namecheap.jpg';
import fiverr from './img/fiverr.jpg';
import bluehost from './img/bluehost.png';
import webflow from './img/webflow.jpg';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactGA from 'react-ga';

ReactGA.initialize('G-4659F1MZJ3');
ReactGA.pageview(window.location.pathname + window.location.search);
const emoji = require("emoji-dictionary");

const theme = createMuiTheme({
  palette: {
    primary: {main: "#77A6F7"},
    secondary: {main: "#D3E3FC"},
    success: {main: "#00887A"},
    error: {main: "#FFCCBC"}
  },
});

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    backgroundColor: "#77A6F7",
    padding: theme.spacing(0, 1),
    alignItems:"center",
    position: "fixed",
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 3,
  },
  navitem: {
    color: "#FFFFFF",
  },
  paper: {
    padding: theme.spacing(8, 4),
    margin: theme.spacing(2,2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '80vh',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    margin: theme.spacing(2, 0, 0),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  aboutGrid: {
    backgroundColor: '#D3E3FC',
    minHeight: '80vh',
  },
  about: {
    padding: theme.spacing(8, 4),
    margin: theme.spacing(2,2),
  },
  suggestedDomain: {
    padding: theme.spacing(2,2),
  },
  domainRegistrars: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  domainRegistrarBanner: {
    height: 200,
  },
  resources: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  resourcesItem: {
    margin: theme.spacing(2,2),
    width: 200,
  }
}));


const GreenTextTypography = withStyles({
  root: {
    color: "#00887A"
  }
})(Typography);

function App() {
  return (
  <Box>
    <ThemeProvider theme={theme}>
  <Grid container component="main">
      <CssBaseline />
      <Navbar />
      <ProductForm />
      <About />
      <Resources />
  </Grid>
  </ThemeProvider>
  </Box>
  );
}

const animals = ['zebra', 'panda', 'gator', 'fox', 'monkey', 'cat', 'wolf', 'dog', 'tiger','lion', 'dino', 'elephant', 'bear', 'eagle', 'cheetah', 'leopard', 'dragon', 'crow', 'sparrow', 'koala', 'giraffe', 'shark', 'whale', 'dolphin', 'frog', 'rat', 'mouse', 'buffalo', 'horse', 'cow', 'mule', 'donkey', 'rabbit', 'hare', 'chicken', 'turkey', 'goat', 'duck', 'goose', 'ferret', 'raccoon', 'hawk', 'otter', 'seal', 'deer', 'hippo', 'pigeon', 'llama', 'parrot', 'owl', 'turtle', 'rhino', 'chimp', 'gorilla', 'babboon', 'weasel', 'crocodile'];
const n = animals.length;
const generateDomain= async(product, updateDomain, updateLoading) => {
  
  let available = false;
  let count = 0;
  while (count < 10 & !available){
    const domain = product.replace(/[^a-z0-9]/gi, '') + animals[Math.floor(Math.random()*n)] +'.com';
    let url = 'https://wq2b5o9kkc.execute-api.us-east-2.amazonaws.com/?domain='+ domain;
    let res = await fetch(url)
    let json = await res.json()
    console.log(json)
    if (json.available) {
      available = true;
      updateDomain(domain)
      updateLoading(false)
    }
    count = count + 1;
  } 
  if (!available){
    updateDomain("Not Found")
    updateLoading(false)
  }
  return
}
function ProductForm() {
  const classes = useStyles();
  const [product, setProduct] = React.useState('')
  const [suggestedDomain, updateDomain] = React.useState('');
  const [isLoading, updateLoading] = React.useState(false);
  const handleSubmit = (e) => {
    updateLoading(true)
    e.preventDefault();
    generateDomain(product, updateDomain, updateLoading)
}

  const inputProps = {
    minLength: 4,
  };
  return (    
  <Grid item xs={12} sm={8} md={6} id="home">
    <form className={classes.form} onSubmit={handleSubmit}>
    <Box className={classes.paper}>
      <Typography component="h1" variant="h5" color="primary">
        Enter Product
      </Typography>
        <TextField id="product" inputProps={inputProps} label="Product" variant="outlined" name="product" value={product} className={classes.input} onChange={e => setProduct(e.target.value)} required autoFocus/>
        <Button type="submit" variant="contained" color="primary" className={classes.submit}>Generate</Button>
        <SuggestedDomain suggestedDomain={suggestedDomain} isLoading={isLoading} className={classes.suggestedDomain}/>
    </Box>
    </form>
    
  </Grid>
  );
}

function About() {
  const classes = useStyles();
  return (    
  <Grid item xs={12} sm={4} md={6} className={classes.aboutGrid} id="about">
    <Box className={classes.about}>
      <Typography color="primary" component="h1" variant="h5">
      About
      </Typography>
      
      <Typography component="p">{emoji.getUnicode("rocket")} If you're an entrepreneur looking to name your startup, a fun way to do it is combining the product name {emoji.getUnicode("gift")}with that of an animal{emoji.getUnicode("dog")}</Typography>
      <Typography component="p">{emoji.getUnicode("clap")} foodpanda, mailchimp, hostgator are just some successful companies that have used this formula. This app helps you find that brand name for you{emoji.getUnicode("raised_hands")}</Typography>
      <Typography component="p">{emoji.getUnicode("computer")} Enter a word for the product you're building and we'll generate a brand name that has a .com domain{emoji.getUnicode("link")} available to register{emoji.getUnicode("checkered_flag")}</Typography>
      <Typography component="p">{emoji.getUnicode("x")} If you don't like it, hit 'GENERATE' again and we will try a new domain name{emoji.getUnicode("tada")}</Typography>
      <Typography component="p">{emoji.getUnicode("e-mail")} For questions, suggestions, get in touch <a href="mailto:dk@weekinmemes.com">dk@weekinmemes.com</a></Typography>
    </Box>
  </Grid>
  );
}


function SuggestedDomain({suggestedDomain, isLoading}){
  
  if(isLoading){
    return (
    <Box><CircularProgress color="secondary" /></Box>
    )} else {
    if (suggestedDomain === ''){
    return (
    <Box></Box>
    )} else if (suggestedDomain === 'Not Found'){
    return(
    <Typography color="error" component="h1" variant="h6" align="center">Sorry, we could not find a domain for you. Please try a different product name</Typography>
  )} else {
    return (
    <Box>
      <GreenTextTypography component="h1" variant="h5" align="center">{suggestedDomain}</GreenTextTypography>
      <DomainRegistrars suggestedDomain={suggestedDomain} />
    </Box>
  )}
  }
}
function DomainRegistrars({suggestedDomain}){
  const classes = useStyles();
  let domainRegistrars = [{
      name: 'Namesilo',
      url: 'https://www.namesilo.com/domain/search-domains?query='+suggestedDomain+'&rid=4362081yv',
      img: namesilo,
    },{
      name: 'Namecheap',
      url: 'https://www.kqzyfj.com/click-100254953-13266668',
      img: namecheap,
    }]
  const items = domainRegistrars.map((x)=><Box key={x.name} m={1}><a href={x.url} target="_blank" rel="noreferrer"><img className={classes.domainRegistrarBanner} src={x.img} alt={x.name}></img></a></Box>)
  return (
  <Box>
  <Typography component="h1" variant="h6" align="center">{emoji.getUnicode("sparkles")}Buy this domain from:{emoji.getUnicode("sparkles")}</Typography>
  <Box className={classes.domainRegistrars}>
    {items}
  </Box>
  <Typography component="p">DISCLAIMER: These are affiliate links. We earn commission if you make a purchase via the above links at no additional cost to you.</Typography>
  </Box>
  )
}

function Resources(){
  const classes = useStyles();
  const partners = [{
    name: 'Namesilo',
    url: 'https://www.namesilo.com/domain/search-domains?rid=4362081yv',
    img: namesilo,
    type: 'Domain',
    description: 'Namesilo is a domain registrar. Get a domain for $8.99'
  },{
    name: 'Namecheap',
    url: 'https://www.kqzyfj.com/click-100254953-13266668',
    img: namecheap,
    type: 'Domain',
    description: 'Namecheap is a domain registrar. Get a domain for $8.88'
  },{
    name: 'Fiverr',
    url: 'https://track.fiverr.com/visit/?bta=168387&nci=7011',
    img: fiverr,
    type: 'Design',
    description: 'Need a logo? Find a designer who can make it for as little as $5'
  },{
    name: 'Bluehost',
    url: 'https://www.bluehost.com/track/productanimal/',
    img: bluehost,
    type: 'Hosting',
    description: 'Web hosting with 1-click wordpress installation. Get started for $3.95/month'
  },{
    name: 'Webflow',
    url: 'https://webflow.com/?rfsn=4827629.18deb6&utm_medium=affiliate',
    img: webflow,
    type: 'NoCode',
    description: 'Build websites and apps without writing any code. Free until you’re ready to launch'
  }]
const items = partners.map((x)=>{
  return(
  <Card className={classes.resourcesItem} key={x.name}>
      <CardActionArea>
      <a href={x.url} target="_blank" rel="noreferrer">
        <CardMedia
          component="img"
          alt={x.name}
          image={x.img}
          title={x.name}
        /></a>
        <CardContent>
          <Typography color="primary" gutterBottom variant="h5" component="h2">
            {x.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {x.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a href={x.url} target="_blank" rel="noreferrer">
        <Button size="small" color="primary">
          Learn More
        </Button>
        </a>
      </CardActions>
    </Card>
)})
  return (
    <Grid item xs={12} id="resources">
      <Box className={classes.paper}>
        <Typography color="primary" component="h1" variant="h5">
        Resources
        </Typography>
        <Typography component="p">DISCLAIMER: These are affiliate links. We earn commission if you make a purchase via the links below at no additional cost to you.</Typography>
        <Box className={classes.resources}>
          {items}
        </Box>
        
      </Box>
  </Grid>
  )
}



function Navbar() {
  const classes = useStyles();
  return (
    <Box className={classes.navbar}>
      <Typography>Product Animal</Typography>
      <Box>
        <a href="#home"><Button className={classes.navitem}>Home</Button></a>
        <a href="#about"><Button className={classes.navitem}>About</Button></a>
        <a href="#resources"><Button className={classes.navitem}>Resources</Button></a>
      </Box>
    </Box>
  );
}

export default App;


