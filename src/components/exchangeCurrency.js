import React from 'react';
import axios from "axios";
import Currencies from "./currencies/currencies"
import TargetCurrency from "./targetCurrency/targetCurrency"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import "./exchangeCurrency.css"

class ExchangeCurrency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false,
            currencies:[1],
            amount: 10.00,
            undisplayedCurrency : [
                'SGD',
                'JPY',
                'GBP',
                'CAD',
                'CHF',
                'INR',
                'MYR',
                'KRW',
              ],
            displayedCurrency : [
                'IDR',
                'EUR',
              ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.handleAddUpdate = this.handleAddUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    
    componentDidMount() {
        const proxyurl="https://cors-anywhere.herokuapp.com/"
        axios
          .get(proxyurl+"https://api.openrates.io/latest?base=USD",{
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          },
        })
          .then(response => {
            const currencyAr = [];
            currencyAr.push( response.data.rates)
            this.setState({ currencies: currencyAr });
          })
          .catch(err => {
            console.log("Fetching rates data failed", err);
          });
      }
    
    handleDelete(currency){
        this.setState({ displayedCurrency: this.state.displayedCurrency.filter((item) => currency !== item) });
        this.setState({ undisplayedCurrency: this.state.undisplayedCurrency.concat(currency) });
    };

    handleAddClick(event) {
        this.setState({anchorEl: event.currentTarget});
    };
  
    handleAddClose() {
        this.setState({anchorEl: false});
    };

    handleAddUpdate(currency) {
        this.handleAddClose();
        this.setState({ displayedCurrency: this.state.displayedCurrency.concat(currency) });
        this.setState({ undisplayedCurrency: this.state.undisplayedCurrency.filter((item) => currency !== item) });
    };
    
    handleInputChange(e){
        console.log(e.target.value)
        this.setState({ amount: e.target.value });
    };

render() {
    return (
        <div className="exchange-currency">
            <div className="content-header">Foreign Exchange Currency</div>
            <div className="base">
                <div className="base-currency">
                    <Currencies currency="USD"/>
                <div className="text-field-container">
                    <input 
                    className="text-field" 
                    type="number" 
                    defaultValue={10.00}
                    onChange={(e) => {this.handleInputChange(e)}}              
                    />
                </div>
            </div>
        </div>
            <div className="target">
            {
            this.state.displayedCurrency.map((currency, index) =>
                <div className="target-content">
                    <TargetCurrency targetCurrency={currency} currencyRates={this.state.currencies} currencyAmounts={this.state.amount}/>
                    <IconButton onClick={(e) => {this.handleDelete(currency, index)}} aria-label="delete">
                        <DeleteIcon fontSize="large" />
                    </IconButton>
                </div>
            )}
            </div>
            { this.state.undisplayedCurrency && !!this.state.undisplayedCurrency.length 
            ?  
            <div className='add-currencies'>
                <Fab color="primary" variant='extended' aria-label="add" onClick={(e) => {this.handleAddClick(e)}}>
                    <AddIcon/>
                    Add More Currencies
                </Fab>
                <Menu
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleAddClose}
                >
                     {
                     this.state.undisplayedCurrency.map((currency) =>
                     <MenuItem onClick={(e) => this.handleAddUpdate(currency)}>{currency}</MenuItem>
                     )}
                </Menu>
            </div>
            : 
            null
            }
        </div>
      );
  }
}

export default ExchangeCurrency;