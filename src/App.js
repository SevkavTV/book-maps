import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import { CircularProgress, Container, TextField } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import MapContainer from './GoogleMaps';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { getAllEntries, getBookInfoByISBN, getEntriesByParam } from './Services/httpRequests'
// Languages
const languages = ['Kazakh', 'Swedish', 'Yiddish', 'Karachay-Balkar', 'Russian', 'Portuguese', 'Cornish', 'Syriac', 'Altaic languages', 'Manx', 'Latvian', 'Walloon', 'French', 'Scots', 'Bashkir', 'Komi', 'Kirghiz', 'Georgian', 'Hungarian', 'Tsonga', 'Altai', 'Gaelic', 'Maori', 'Latin', 'Artificial languages', 'Belarusian', 'Swahili', 'Icelandic', 'Gothic', 'Irish', 'Neapolitan', 'Romansh', 'Spanish', 'Dutch', 'German', 'Esperanto', 'North Ndebele', 'Persian', 'Welsh', 'Zulu', 'Ladino', 'Tongan', 'Italian', 'Hawaiian', 'Aromanian', 'English', 'Shona', 'Samoan', 'Romany']



// styles

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  list: {
    width: 270,
  },
  fullList: {
    width: 'auto',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    width: 200,
  },
  input: {
    width: 200,
  },
  label: {
    marginLeft: 8,
  }
}));
// Googlemaps



// App
function App() {
  // classes

  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const [markers, setMarkers] = React.useState([])

  const [markerInfo, setInfoMarker] = React.useState(null)
  const [searchText, setSearchText] = React.useState(null)

  if (markers.length === 0) {
    getAllEntries(["ISBN", "Place of creation/publication"]).then((resp) => {
      let markers = {}
      for (let item of resp.data) {
        let lat_change = Math.random() / 10 - 0.05
        let lng_change = Math.random() / 10 - 0.05

        item['Place of creation/publication'].lat = item['Place of creation/publication'].lat + lat_change
        item['Place of creation/publication'].lng = item['Place of creation/publication'].lng + lng_change

        markers[item['ISBN']] = item['Place of creation/publication']
      }
      console.log(markers)
      setMarkers(markers)
    })
  }

  // left navbar
  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onMarkerClick = (marker) => {
    let markerId = marker.id
    getBookInfoByISBN(markerId).then((resp) => {
      let r = resp.data.replaceAll('NaN', 'null')
      let ans = JSON.parse(r)
      console.log(ans)
      setInfoMarker(ans)
    })
  }

  const onSearchChange = (event) => {
    setSearchText(event.target.value)
  };

  const findByParam = () => {
    console.log(searchText)
    if(searchText){
      getEntriesByParam(searchText).then((resp) => {
        console.log(resp.data)
        console.log(typeof(resp.data))
      })
    }
  }

  // multiselect
  const [language, setLanguage] = React.useState([]);

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // Navbar definition
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >

      <FormControl className={classes.formControl}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <InputLabel id="demo-mutiple-checkbox-label" className={classes.label}>Contries</InputLabel>
            <Select
              labelId="mutiple-checkbox-label"
              id="mutiple-checkbox"
              multiple
              display={true}
              value={language}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              className={classes.input}
            >
              {languages.map((languagesItem) => (
                <MenuItem key={languagesItem} value={languagesItem}>
                  <Checkbox checked={language.indexOf(languagesItem) > -1} />
                  <ListItemText primary={languagesItem} />
                </MenuItem>
              ))}
            </Select>
            <Divider />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="from" className={classes.input} />
          </Grid>
          <Grid item>
            <TextField id="standard-basic" label="to" className={classes.input} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<SendIcon />}
            >
              Make query
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );


  return (
    <>
      <Container maxWidth="xl" style={{ margin: 0, padding: 0 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            {['left'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
            <Typography className={classes.title} variant="h6" noWrap>
              Book Maps
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={onSearchChange}
              />

            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              style={{backgroundColor: 'white', color: 'blue'}}
              onClick={findByParam}
            >
              Find
            </Button>
          </Toolbar>
        </AppBar>
      </Container>

      <Grid container direction="row">
        <Grid item xs={10}>
          {
            markers.length === 0 ?
              <CircularProgress />
              :
              <MapContainer markers={markers} onMarkerClick={onMarkerClick} />
          }
        </Grid>
        <Grid
          item
          xs={2}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>{markerInfo ? markerInfo['Title'] : null}</Grid>
          <Grid item>{markerInfo ? markerInfo['Content type'] : null}</Grid>
          <Grid item>{markerInfo ? markerInfo['Country of publication'] : null}</Grid>
          <Grid item>{markerInfo ? markerInfo['Date of creation/publication'] : null}</Grid>
          <Grid item>{markerInfo ? markerInfo['Genre'] : null}</Grid>
          <Grid item>{markerInfo ? markerInfo['Languages'] : null}</Grid>
          <Grid item>{markerInfo ? markerInfo['Name'] : null}</Grid>
          <Grid item>{markerInfo ? markerInfo['Physical description'] : null}</Grid>
          <Grid item>{markerInfo ? markerInfo['Publisher'] : null}</Grid>
        </Grid>
      </Grid>


    </>
  );
}

export default App;
