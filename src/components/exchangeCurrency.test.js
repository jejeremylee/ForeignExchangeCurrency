import React from "react";
import { render } from "@testing-library/react";
import ExchangeCurrency from './exchangeCurrency';

describe("Exchange Currency component", () => {
    it("should render page completely", () => {

        const { getByText } = render(<ExchangeCurrency/>);

        const header = getByText(/Foreign Exchange Currency/i)

        const addButton = getByText(/Add More Currencies/i);

        expect(header).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
    });
}); 