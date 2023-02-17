

describe('check flights', () => {
  const flightsMBJFile = 'flightsMBJ.json';
  const flightsBNAFile = 'flightsBNA.json';
  const flightsRobinsonMBJFile = 'flightsRobinsonMBJ.json';

  it.skip('check JAMAICA FLIGHT', () => {
    cy.configureCypressTestingLibrary({ testIdAttribute: 'data-qa' })

    cy.visit('https://mobile.southwest.com/air/booking/shopping');

    cy.findByText('ONE WAY').click();

    cy.wait(1000);

    cy.findByText('From').click();
    cy.findByText('Nashville, TN - BNA').click();

    cy.wait(1000);

    cy.findByText('To').click();
    cy.findAllByText('Montego Bay, Jamaica - MBJ').click();
    cy.findByText('Select Depart').click();

    cy.findByText('July 2023').parent().within(() => {
      cy.findByText('24').click();
    });

    cy.wait(1000);

    cy.findByText('Done').click();
    cy.findByText('Pts').click();

    cy.wait(1000);

    cy.findByText('Select Passengers').click();
    cy.findByText('1').next().click();
    cy.findByText('Done').click();

    cy.wait(1000);

    cy.findByText('Find flights').click();

    cy.findByTestId('flight-351/1115')
      .within(() => {
        cy.findByText('From').next().within(() => {
          cy.readFile(flightsMBJFile).then(flightsMBJ => {
            cy.log('👉  reading the file...');
            cy.findByTestId('total-amount').then($el => {
              const text = $el.text().trim();
              cy.log('👉  checking points... ', text);
              if (text === flightsMBJ.currentPts) {
                cy.log(`😞 POINTS THE SAME: previous points "${flightsMBJ.currentPts}", but now "${text}"`);
                cy.writeFile(flightsMBJFile, {
                    ...flightsMBJ,
                    updatedPts: undefined
                });
              } else {
                cy.log(`🎉 NEW POINTS FOUND: previous points "${flightsMBJ.currentPts}", but now "${text}"`);

                if (parseInt(text) < parseInt(flightsMBJ.currentPts)) {
                  cy.writeFile(flightsMBJFile, {
                    ...flightsMBJ,
                    updatedPts: text,
                  });
                } else {
                  cy.log('NOOP: points are more than paid.')
                }
              }
            });
          });
        });
    });
  });

  it('check Robinson JAMAICA FLIGHT', () => {
    cy.configureCypressTestingLibrary({ testIdAttribute: 'data-qa' })

    cy.visit('https://mobile.southwest.com/air/booking/shopping');

    cy.findByText('ONE WAY').click();

    cy.wait(1000);

    cy.findByText('From').click();
    cy.findByText('Nashville, TN - BNA').click();

    cy.wait(1000);

    cy.findByText('To').click();
    cy.findAllByText('Montego Bay, Jamaica - MBJ').click();
    cy.findByText('Select Depart').click();

    cy.findByText('July 2023').parent().within(() => {
      cy.findByText('25').click();
    });

    cy.wait(1000);

    cy.findByText('Done').click();
    cy.findByText('Pts').click();

    cy.wait(1000);

    cy.findByText('Select Passengers').click();
    cy.findByText('1').next().click();
    cy.findByText('Done').click();

    cy.wait(1000);

    cy.findByText('Find flights').click();

    cy.findByTestId('flight-616/1042')
      .within(() => {
        cy.findByText('From').next().within(() => {
          cy.readFile(flightsRobinsonMBJFile).then(flightsMBJ => {
            cy.log('👉  reading the file...');
            cy.findByTestId('total-amount').then($el => {
              const text = $el.text().trim();
              cy.log('👉  checking points... ', text);
              if (text === flightsMBJ.currentPts) {
                cy.log(`😞 POINTS THE SAME: previous points "${flightsMBJ.currentPts}", but now "${text}"`);
                cy.writeFile(flightsRobinsonMBJFile, {
                    ...flightsMBJ,
                    updatedPts: undefined
                });
              } else {
                cy.log(`🎉 NEW POINTS FOUND: previous points "${flightsMBJ.currentPts}", but now "${text}"`);

                if (parseInt(text) < parseInt(flightsMBJ.currentPts)) {
                  cy.writeFile(flightsRobinsonMBJFile, {
                    ...flightsMBJ,
                    updatedPts: text,
                  });
                } else {
                  cy.log('NOOP: points are more than paid.')
                }
              }
            });
          });
        });
    });
  });

  it.skip('check NASHVILLE FLIGHT', () => {
   cy.configureCypressTestingLibrary({ testIdAttribute: 'data-qa' })

    cy.visit('https://mobile.southwest.com/air/booking/shopping');

    cy.findByText('ONE WAY').click();

    cy.wait(1000);

    cy.findByText('From').click();
    cy.findAllByText('Montego Bay, Jamaica - MBJ').click();

    cy.findByText('To').click();
    cy.findByText('Nashville, TN - BNA').click();

    cy.wait(1000);

    cy.findByText('Select Depart').click();

    cy.findByText('July 2023').parent().within(() => {
      cy.findByText('29').click();
    });

    cy.findByText('Done').click();
    cy.findByText('Pts').click();

    cy.wait(1000);

    cy.findByText('Select Passengers').click();
    cy.findByText('1').next().click();
    cy.findByText('Done').click();

    cy.wait(1000);

    cy.findByText('Find flights').click();

    cy.findByTestId('flight-1069/1953')
      .within(() => {
        cy.findByText('From').next().within(() => {
          cy.readFile(flightsBNAFile).then(flightsBNA => {
            cy.log('👉  reading the file...');
            cy.findByTestId('total-amount').then($el => {
              const text = $el.text().trim();
              cy.log('👉  checking points... ', text);
              if (text === flightsBNA.currentPts) {
                cy.log(`😞 POINTS THE SAME: previous points "${flightsBNA.currentPts}", but now "${text}"`);
                cy.writeFile(flightsBNAFile, {
                    ...flightsBNA,
                    updatedPts: undefined
                });
              } else {
                cy.log(`🎉 NEW POINTS FOUND: previous points "${flightsBNA.currentPts}", but now "${text}"`);

                if (parseInt(text) < parseInt(flightsBNA.currentPts)) {
                  cy.writeFile(flightsBNAFile, {
                    ...flightsBNA,
                    updatedPts: text,
                  });
                } else {
                  cy.log('NOOP: points are more than paid.')
                }
              }
            });
          });
        });
    });
  });
});