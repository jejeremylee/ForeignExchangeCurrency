import React from 'react';
import axios from "axios";
import BaseCurrency from "./baseCurrency/baseCurrency"
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
    }

    
    componentDidMount() {
        axios
          .get("http://api.openrates.io/latest?base=USD")
          .then(response => {
            const currencyAr = [];
            currencyAr.push( response.data.rates)
            console.log(currencyAr)
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
    
render() {
    return (
        <div className="exchange-currency">
            <div className="content-header">Foreign Exchange Currency</div>
            <div className="base">
                <BaseCurrency/>
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