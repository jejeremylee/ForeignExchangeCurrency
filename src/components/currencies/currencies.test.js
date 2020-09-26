import React from "react";
import { render } from "@testing-library/react";
import Currencies from './currencies';

describe("Currencies component", () => {
    it("should render correct currency name from given param", () => {

        const { getByText } = render(<Currencies currency={'IDR'} />);
        const currencyName = getByText(/IDR/i);
        
        expect(currencyName).toBeInTheDocument();
    });
}); 