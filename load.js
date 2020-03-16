//Shuffles an array
const shuffle = (constArr) => {
  var array = constArr;
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// Encodes the quote
const jumble = (text) => {

    //Get a permutation of the alphabet
    const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var alphaPerm = shuffle(alpha);

    //Use the permutation on the quote
    var jumbled = (text.split('')).map((char) => {
      switch (char) {
        case 'a': return alphaPerm[0];
        case 'b': return alphaPerm[1];
        case 'c': return alphaPerm[2];
        case 'd': return alphaPerm[3];
        case 'e': return alphaPerm[4];
        case 'f': return alphaPerm[5];
        case 'g': return alphaPerm[6];
        case 'h': return alphaPerm[7];
        case 'i': return alphaPerm[8];
        case 'j': return alphaPerm[9];
        case 'k': return alphaPerm[10];
        case 'l': return alphaPerm[11];
        case 'm': return alphaPerm[12];
        case 'n': return alphaPerm[13];
        case 'o': return alphaPerm[14];
        case 'p': return alphaPerm[15];
        case 'q': return alphaPerm[16];
        case 'r': return alphaPerm[17];
        case 's': return alphaPerm[18];
        case 't': return alphaPerm[19];
        case 'u': return alphaPerm[20];
        case 'v': return alphaPerm[21];
        case 'w': return alphaPerm[22];
        case 'x': return alphaPerm[23];
        case 'y': return alphaPerm[24];
        case 'z': return alphaPerm[25];
        default: return char;
    }});

    return jumbled.join('');
}


// Loads the quotes
const writeIt = () => {

    //Get the quotes
    const quotes = returnQuotes();

    //Decide the quote number
    const totNum = 30 + 1;
    var hash = window.location.hash;
    var hashInt = parseInt(hash.substring(1));
    var num;
    if (hashInt >= 0 && hashInt <= totNum)
      num = hashInt;
    else
      num = Math.floor(Math.random() * totNum); //Makes a random int from 0 to n

    // Grab one of the quotes
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(quotes,"text/xml");
    const quote = xmlDoc.getElementsByTagName("text")[num].childNodes[0].nodeValue;

    //Grab the speaker
    const speaker = xmlDoc.getElementsByTagName("person")[num].childNodes[0].nodeValue;


    // Load the number onto the screen
    const number = document.createElement('h3');
    number.style.textAlign = "center";
    number.innerHTML = num;
    document.body.append(number);

    // Load the jumbled quote, but hidden
    const hidden = document.createElement('p');
    hidden.id = "hidden";
    hidden.innerHTML = jumble(quote.toLowerCase()); //Jumble the original quote
    hidden.style.display = "none";
    document.body.append(hidden);

    // Load the quote onto the screen
    const showing = document.createElement('p');
    showing.id = "showing";
    showing.style.width = "400px";
    showing.style.fontWeight = "bold";
    showing.style.textAlign = "center";
    showing.innerHTML = hidden.innerHTML;
    document.body.append(showing);

    // Load the speaker onto the screen
    const person = document.createElement('p');
    person.style.textAlign = "right";
    person.innerHTML = '-' + speaker;
    document.body.append(person);
  };


  // Keep quotes here until I figure out COR error
  const returnQuotes = () =>{
    quotes = "<quotes>" +
    "<quote> <num>0</num> <text>Swear to God I'll turn this car around</text>" + 
      "<person> mom </person> </quote>" +
    "<quote> <num>1</num> <text>If you want to know what God thinks of money, just look at the people he gave it to. </text>" + 
      "<person> dorothy parker</person> </quote>" +
    "<quote> <num>2</num> <text>If I survive this life without dying, I'll be surprised. </text>" + 
      "<person> nasreddin </person> </quote>" +
    "<quote> <num>3</num> <text>Shit jobs tend to be blue collar and pay by the hour, whereas bullshit jobs tend to be white collar and salaried. </text>" + 
      "<person> david graeber </person> </quote>" +
    "<quote> <num>4</num> <text> Love doesn't just sit there, like a stone, it has to be made, like bread; remade all the time, made new. </text>" + 
      "<person> ursula k leguin </person> </quote>" +
    "<quote> <num>5</num> <text>Poetry is the way we help give name to the nameless so it can be thought.</text>" + 
      "<person> audre lorde </person> </quote>" +
    "<quote> <num>6</num> <text> If you don't like what someone has to say, argue with them. </text>" + 
      "<person> noam chomsky </person> </quote>" +
    "<quote> <num>7</num> <text> Cauliflower is nothing but cabbage with a college education. </text>" + 
      "<person> mark twain </person>  </quote>" +
    "<quote> <num>8</num> <text> To win the people, always cook them some savoury that pleases them. </text>" + 
      "<person> aristophanes </person> </quote>" +
    "<quote> <num>9</num> <text> All of this turbulence wasn't forecasted, apologies from the intercom. And I am relieved that I'd left my room tidy, they'll think of me kindly When they come for my things.</text>" + 
      "<person> mitski </person> </quote>" +
    "<quote> <num>10</num> <text> Anyone who uses more than two chords is just showing off. </text>" + 
      "<person> woody guthrie </person> </quote>" +
    "<quote> <num>11</num> <text> Sometimes I sound like gravel, and sometimes I sound like coffee and cream. </text>" + 
      "<person> nina simone </person> </quote>" +
    "<quote> <num>12</num> <text> Under every stone lurks a politician. </text>" + 
      "<person> aristophanes </person> </quote>" +
    "<quote> <num>13</num> <text> There's a hell of a distance between wise-cracking and wit. Wit has truth in it; wise-cracking is simply calisthenics with words. </text>" + 
      "<person> dorothy parker </person> </quote>" +
    "<quote> <num>14</num> <text> Caring for myself is not self-indulgence, it is self-preservation, and that is an act of political warfare. </text>" + 
      "<person> audre lorde </person> </quote>" +
    "<quote> <num>15</num> <text> I can live for two months on a good compliment. </text>" + 
      "<person> mark twain  </person> </quote>" +
    "<quote> <num>16</num> <text> Either you repeat the same conventional doctrines everybody is saying, or else you say something true, and it will sound like it's from Neptune. </text>" + 
      "<person> noam chomsky </person> </quote>" +
    "<quote> <num>17</num> <text> stop misquoting me, you fucks </text>" + 
      "<person> albert einstein </person> </quote>" +
    "<quote> <num>18</num> <text> I look inside myself and I ask \"Do I feel like a man or a woman?\" And the answer is that I feel like shit </text>" + 
      "<person> contrapoints </person> </quote>" +
    "<quote> <num>19</num> <text> Never put off till tomorrow what you can do the day after tomorrow. </text>" + 
      "<person> mark twain  </person> </quote>" +
    "<quote> <num>20</num> <text> A cotton pulse is always taken with a silken hand. </text>" + 
      "<person> nasreddin </person> </quote>" +
    "<quote> <num>21</num> <text> Police are bureaucrats with weapons. </text>" + 
      "<person> david graeber </person> </quote>" +
    "<quote> <num>22</num> <text> Heterosexuality is not normal, it's just common. </text>" + 
      "<person> dorothy parker </person> </quote>" +
    "<quote> <num>23</num> <text> Any fool can make something complicated. It takes a genius to make it simple. </text>" + 
      "<person> woody guthrie </person> </quote>" +
    "<quote> <num>24</num> <text> The white fathers told us: I think, therefore I am. The black goddess within each of us - the poet - whispers in our dreams: I feel, therefore I can be free. </text>" + 
      "<person> audre lorde</person> </quote>" +
    "<quote> <num>25</num> <text> People who deny the existence of dragons are often eaten by dragons. </text>" + 
      "<person> ursula k leguin</person> </quote>" +
    "<quote> <num>26</num> <text> But it is one thing to read about dragons and another to meet them. </text>" + 
      "<person> ursula k leguin </person> </quote>" +
    "<quote> <num>27</num> <text> If I knew what two and two were, I would say Four! </text>" + 
      "<person> nasreddin </person> </quote>" +
    "<quote> <num>28</num> <text> Quickly, bring me a beaker of wine, so that I may wet my mind and say something clever. </text>" + 
      "<person> aristophanes </person> </quote>" +
    "<quote> <num>29</num> <text> I ain't a Communist necessarily, but I have been in the red all my life. </text>" + 
      "<person> woody guthrie </person> </quote>" +
    "<quote> <num>30</num> <text>That would be a good thing for them to cut on my tombstone: Wherever she went, including here, it was against her better judgment. </text>" + 
      "<person> dorothy parker </person> </quote>" +
      
    "</quotes>";


    

    return quotes;
  }



writeIt();