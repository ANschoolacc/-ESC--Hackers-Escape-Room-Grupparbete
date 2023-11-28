describe("Booking Modal Test", () => {
    it("Shows the booking modal when pressing a booking button", () => {
        // Visit the URL of your booking page
        cy.visit("http://127.0.0.1:5501/ourChallenges.html?online=false");

        // Click on the first booking button
        cy.get(".sidescroll__btn").first().click();

        // Assert that the booking modal is visible
        cy.get(".booking-container").should("be.visible");
        // click on second button
        cy.get(".booking-container__button").click();
        // step two should be visible and step one should not
        cy.get(".booking-container__step-two").should("be.visible");
        cy.get(".booking-container__step-one").should("not.visible");
        //click on third button
        cy.get(".booking-container__submit-button").click();

        //first and second should be invisible and third should be visible
        cy.get(".booking-container__step-two").should("not.visible");
        cy.get(".booking-container__step-one").should("not.visible");
        cy.get(".booking-container__step-three").should("be.visible");

        cy.get(".booking-continer__link").click();

        cy.get(".booking-container__step-two").should("not.visible");
        cy.get(".booking-container__step-one").should("not.visible");
        cy.get(".booking-container__step-three").should("not.visible");
    });
});