import React from "react";
import { render } from "@testing-library/react";
import TargetCurrency from './targetCurrency';

describe("Target Currency component", () => {
    it("should render correctly with given param", () => {
        
        const { getByText } = render(<TargetCurrency targetCurrency={'IDR'} 
            currencyRates={[{'IDR':0.1}]} 
            currencyAmounts={1000000} />);
        const currencyAmount = getByText(/100000/i);
        const currencyRate = getByText(/1 USD = IDR 0.1/i);
        
        expect(currencyAmount).toBeInTheDocument();
        expect(currencyRate).toBeInTheDocument();
    });
}); 