//// reference types="cypress" />

before(function() {
    //cy.visit("https://demoqa.com/")
 })

describe('Elements Handles', function() {

    it('Text Box', () => {
        cy.visit('https://demoqa.com/text-box');
        cy.url().should('include', 'text-box');

        cy.get('#output').should('not.be.visible')
        cy.get('#userName').should('be.empty').type('Testing QA')
          .should('have.class', 'mr-sm-2 form-control')

        cy.get('input#userName').invoke('val').should('not.be.empty')

        cy.get('#userEmail').type('QA123@example.in');
        cy.get('input#userEmail').invoke('val').then((txt) => { expect(txt).to.contain('QA123@example.in') });

        cy.get('#currentAddress').type('41, software campus');
        cy.get('textarea#currentAddress').should('have.value', '41, software campus');

        cy.get('#permanentAddress').type('41, software campus');
        cy.get('#submit').should('be.visible').click();

        // to match text content against a regular expression
        // "Invoke" a function on the previously yielded subject.
        // first need to invoke jQuery method "text()" 
        // and then match using regular expression
        cy.get('#output').should('be.visible')
          .find('#name')
          .should('have.text', 'Name:Testing QA')
          .should('contain', 'QA')
          .should('have.html', 'Name:Testing QA')
          .invoke('text')
          .should('match', /Name:Testing QA/i);

        // And assertion - 
        cy.get('#output #name').should('have.text', 'Name:Testing QA')
          .and('contain', 'QA')
          .and('have.html', 'Name:Testing QA');
    })

    it('check box', () => {
        cy.visit('https://demoqa.com/checkbox');
        cy.url().should('include', 'checkbox');
        cy.get('button.rct-option-expand-all').click();
        cy.get('#tree-node-desktop').should('not.be.checked').check({force: true}).should('be.checked').uncheck({force: true});

        //"each" Iterate through an array like structure
        //"wrap Yield the object passed if object is a promise then Its resolved value" 
        cy.get('ol li.rct-node-leaf input').each(($el, index, $list) => {
            cy.log($el.length)
            cy.wrap($el).check({force: true});
            cy.wrap($el).uncheck({force: true});
        })
        // If check the particular box then do a condition.
        cy.get('ol li.rct-node-leaf span.rct-title ').each(($el, index, $list) => {
            //cy.log($el.text() + " " + index + " " + $list.text());
            //"wrap Yield the object passed if object is a promise then Its resolved value"    
            if ($el.text().trim() ===  "Public"){
                cy.wrap($el).prevUntil('span.rct-checkbox').click();
                //cy.wait(5000);
                cy.wrap($el).prevUntil('span.rct-checkbox').click().then((d) => cy.log(d.text()
                    
                ));
            }
        })
    })

    it('check box and radio button', () => {
        cy.visit('https://demoqa.com/radio-button');
        cy.url().should('include', 'radio-button');
        //cy.get('div.custom-radio #yesRadio').check();
        cy.get('div.custom-radio #yesRadio').check({force: true}).should('be.checked');
        cy.get('div.custom-radio #impressiveRadio').check({force: true}).should('be.checked') ;

        //disabled dom
        cy.get('div.custom-radio #noRadio').should('not.be.visible').and('be.disabled');
        
        // each - Iterate through an array like structure(array or object with a length property)
        cy.get('div.custom-radio input').each(($elm) => {
            cy.log($elm.length);
            if( $elm.is(':enabled')) {
                cy.wrap($elm).check({force: true});
            }
        })
    })

    it('Web table - check edit button', () => {
        cy.visit('https://demoqa.com/webtables');
        cy.url().should('include', 'webtables');

        cy.get('.rt-table .rt-thead ').each(($elm) => {

            cy.wrap($elm).next().find('.rt-tr-group').each(($elm2 ) => {
                cy.wrap($elm2).find('.rt-tr .rt-td').each(($elm3) => { 
                    /*cy.wrap($elm3).invoke('text').then((getText) => { 
                            //const getRow = getText.text();
                            cy.log(getText);
                        });*/

                    // get a particular cell action if row name mention.                    
                    if ($elm3.text().includes('Alden')) {
                        expect($elm3.text()).to.equal('Alden');
                        cy.wrap($elm3).nextAll().find('.action-buttons span').first().click();
                        cy.get('.modal-dialog .modal-content button.close').click();
                    }
                })
            })
        })

    })

    it('Web table - check and print grid box which have text', () => {
        cy.visit('https://demoqa.com/webtables');
        cy.url().should('include', 'webtables');

        cy.get('.rt-table .rt-thead ').each(($elm) => {
            cy.wrap($elm).get('.rt-tr-group .rt-tr').not('.-padRow').each(($getelm) => {
                cy.wrap($getelm).find('.rt-td').each(($getCellValue) => { cy.log($getCellValue.text()) });
            })
        });

    })

    it('Link - checking the respones', () => {
        cy.visit('https://demoqa.com/links');
        cy
        .get('a#simpleLink')
        .should('have.attr', 'href', 'https://demoqa.com')
        .should('have.attr', 'target', '_blank')

        // remove the "remote" attribute from link.
        cy.get('a#simpleLink').invoke('removeAttr', 'target').click();
        cy.url().should('include', 'https://demoqa.com');
        cy.go('back');

        //"request" Make an HTTP request.
        //"its" Get a property's value on the previously yielded DOM.
        // Verify the http request if link button raise HTTP after clicked
        const URLList = ['#simpleLink', '#dynamicLink']
        cy.get(URLList).each((aLink) => {
            cy.get(aLink).then((link) => {
                cy.request(link.prop('href'))
                  .its('status')
                  .should('eq', 200)
            })
        })

    })

    it('Click, Double Click and right click - checking the respones', () => {

        cy.visit('https://demoqa.com/buttons');
        // There is a position to click on the button. topLeft, 
        //top, topRight, left, center, right, bottomLeft, bottom, and bottomRight.
        cy.get('div #rightClickBtn').should('be.visible').rightclick('left');
        cy.contains('Click Me').click('center');
        cy.get('div #doubleClickBtn').should('be.visible').dblclick('right');

        cy.get('div button').each( ($elm, index) => {
            if($elm.text().trim() === "Click Me") {
                cy.wrap($elm).click().should('have.text', 'Click Me');
            }
            else if ($elm.text().trim() === "Double Click Me") {
                cy.wrap($elm).dblclick().should('contain.text', 'Double');
            }
            else if ($elm.text().trim() === "Right Click Me") {
                cy.wrap($elm).rightclick();
                cy.get('#rightClickMessage').should('have.text', 'You have done a right click');
            }
        })

    })
    beforeEach(() => { 
        // Load a fixed set of data located in a file.
        cy.fixture('examplejson.json').as('json').then((data) => { this.data = data });
    });
    it('Upload and Download File - checking the respones', () => {
        cy.visit('https://demoqa.com/upload-download');
        
        // access the json file data by calling fixture variable.
        cy.log(this.data.name + " " + this.data.email);
        
        //cy.get('input#uploadFile').selectFile('cypress/fixtures/examplejson.json');
        cy.get('.form-file input#uploadFile').selectFile("cypress/fixtures/imagejpegFile.jpeg");
        cy.get('.form-file input#uploadFile').selectFile("cypress/fixtures/soundmp3file.mp3");
        

        // download a file
        const path = require("path");
        cy.get('a#downloadButton').click();
        const downloadsFolder = "D://CypressProject//Cypress2022//DemoExamples//cypress//downloads";
        const downloadedFilename = path.join(downloadsFolder, 'sampleFile.jpeg')
        cy.readFile(downloadedFilename).should('exist');
        cy.readFile(downloadedFilename, 'binary', { timeout: 15000 })
        .should(buffer => expect(buffer.length).to.be.gt(100)); //gt - greater than 100 buffer value 

    })

    it('Broken links - get request and response', () => {

        //failOnStatusCode - Its need to be false if the URL have broken link. verify the broken response link
        cy.visit('https://demoqa.com/broken', {failOnStatusCode: false});
        //cy.get('a[href$=com]').last().click()
        cy.get('a[href="http://demoqa.com"]').then((link) => {
            cy.request(link.prop('href')).then((res) => {
                expect(res.status).to.be.eq(200);
                cy.log(res.status)
                expect(res.duration).to.lessThan(2000);
                cy.log(res.duration) 
                //cy.log(res.body) 
            })
        })
        //failOnStatusCode - Its need to be false if the URL have broken link. verify the broken response link
        cy.get('a[href$="500"]' ).then((link) => {
            cy.request({
                url: link.prop('href'), 
                failOnStatusCode: false 
            }).then((res) => {
                expect(res.status).to.eq(500)
                cy.log(res.status)
                expect(res.duration).to.lessThan(1000);
                cy.log(res.duration) 
                expect(res.body).to.deep.include( 'target');
                })
            })
    })


})
