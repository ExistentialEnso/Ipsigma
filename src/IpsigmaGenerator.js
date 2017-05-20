const React = require('react');
const Chance = require('chance');
const Clipboard = require('clipboard-js');
const IpsigmaTypeSelect = require('./IpsigmaTypeSelect');

const chance = new Chance();

class IpsigmaGenerator extends React.Component {
    constructor(props) {
        super(props);

        // Define our initial state.
        this.state = {
            output: '',             // Initial output for the text box.
            paragraphCount: 3,      // Initial value for number of paragraphs to generate
            sentenceEndings:        // Punctuation marks that can end sentences. Adding duplicates increases their likelihood.
                ['.', '.', '.', '!', '?'],
            type: 'Pikachu',        // Initial value for the type of lipsum to generate
            types: [                // Schema for the different types of generation available.
                {
                    name: "Pikachu",
                    words: ["pikachu", "pika", "chuchu", "pikapi", "pikaaa", "pipika", "kachu", "pipikachu", "piiikachu", "pi", "kachuuu", "chu"]
                },
                {
                    name: "Bulbasaur",
                    words: ["bulbasaur", "bulba", "bulbabulb", "saur", "sauur", "bulbasaaaur", "bul", "bulbulbasaur", "bulbabulba", "bulbasaaaaur"]
                },
                {
                    name: "Charmander",
                    words: ["charmander", "charchar", "char", "charcharchar", "chaaaarmander", "charcharmander", "chaaaar", "mander"]
                }
            ]
        };
    }

   render() {
       return (
           <div className="generator">
               <h1>{this.props.appName || "Ipsigma"}</h1>
               <div className="row">
                   <div className="col-xs-6">
                       <label>Type</label>
                       <IpsigmaTypeSelect types={this.state.types} onChange={this.setType.bind(this)} />
                   </div>
                   <div className="col-xs-6">
                       <label># of Paragraphs</label>
                       <input className="form-control" type="number" onChange={this.onParagraphCountUpdated.bind(this)} defaultValue={this.state.paragraphCount} />
                   </div>
               </div>
               <br />
               <p>
                   <button className="btn btn-primary" onClick={this.generate.bind(this)}>Generate Ipsum</button>
                   &nbsp;
                   <button className="btn btn-primary" onClick={this.copyToClipboard.bind(this)}>Copy to Cliboard</button>
               </p>
               <br />
               <p>
                   <textarea rows="10" className="form-control" value={this.state.output} />
               </p>
           </div>
       );
   }

    /**
     * Uses Clipboard.js to put the current contents of the output textarea into the clipboard.
     */
   copyToClipboard() {
        Clipboard.copy(this.state.output);
   }

    /**
     * The primary lipsum generation function. Puts its result in the state rather than returning.
     */
   generate() {
       let output = '';

       for(let i=0; i<this.state.paragraphCount; i++) {
           // Generate the next paragraph
           output += this.generateParagraph();

           // If this isn't the last paragraph, we need to append 2 line breaks
           if(i+1 < this.state.paragraphCount) {
               output += "\r\n\r\n";
           }
       }

       // Put the final, combined output in the state so that React will display in the UI
       this.setState({output: output});
   }

    /**
     * Generates a single paragraph of lipsum and returns it.
     * @returns {string}
     */
   generateParagraph() {
       let output = '';
       let isSentenceStart = true;

       this.state.types.forEach((typeDef) => {
           // Is this the right type definition?
           if(typeDef.name === this.state.type) {
               // Each paragraph will be 50 - 75 words.
               let paragraphLength = 50 + chance.integer({min:0, max: 25});

               for(let i=0; i<paragraphLength; i++) {
                   let word = typeDef.words[chance.integer({min:0, max:typeDef.words.length-1})];

                   // If this is the first word of a new sentence, we need to capitalize it.
                   if(isSentenceStart) {
                       word = word.charAt(0).toUpperCase() + word.slice(1);
                       isSentenceStart = false;
                   }

                   output += word;

                   if(i !== (paragraphLength-1)) {
                       // Generate a random value that will be used to randomly sprinkle in punctuation.
                       let punctValue = chance.integer({min:1, max:10});

                       if(punctValue === 10) { // Randomly, 10% of the time, end the sentence.
                           output += this.state.sentenceEndings[chance.integer({min:0, max:this.state.sentenceEndings.length-1})];
                           isSentenceStart = true;
                       } else if(punctValue === 9) { // Randomly, 10% of the time, throw in a comma.
                           output += ",";
                       }

                       // Regardless of the above, since this isn't the last word, we need a space.
                       output += " ";
                   } else {
                       // This is the last word, so we should make sure it ends with some form of sentence-ending punctuation.
                       output += this.state.sentenceEndings[chance.integer({min:0, max:this.state.sentenceEndings.length-1})];
                   }
               }
           }
       });
       return output;
   }

    /**
     * Sets the type of lipsum to generate.
     * @param type
     */
   setType(type) {
       this.state.type = type;
   }

    /**
     * Updates the state whenever the paragraph count is updated.
     * @param e
     */
   onParagraphCountUpdated(e) {
        this.setState({paragraphCount: e.target.value});
   }
}

module.exports = IpsigmaGenerator;