import inquirer from "inquirer"; //to get user input
import qr from "qr-image"; //to generate QR code from text url
import fs from "fs"; //to write to file

inquirer
    .prompt([
        /* Pass your questions in here */
        {
            'message': "Type in your URL: ",  //prompt user for url
            'name': "URL",          //store user input in URL
        },
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        const url = answers.URL;  //get url from user input
        var qr_svg = qr.image(url);         //generate qr code from url
        qr_svg.pipe(fs.createWriteStream('qr_img.png'));        //write qr code to file

        fs.writeFile('URL.txt', url, (err) => {   //write to file
            if (err) throw err;
            console.log('The file has been saved!');
        }
        );
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });
