import React from "react";
import TextField from '@material-ui/core/TextField';
import Currencies from "../currencies/currencies"
import "./baseCurrency.css";


export default function BaseCurrency() {
    return (
     <div className="baseCurrency">
        <Currencies currency="USD"/>
        <div className="textField">
            <TextField
                variant="outlined"
                fullWidth
                />
        </div>
     </div>
    );
  }