// This checks inputs to make sure they are single letters
const fix = (letter, check) => {
    //Checks for single letter
    if(check.toUpperCase() == check.toLowerCase() || check.length != 1){
        return letter;
    }

    return check.toLowerCase();
}


// This decondes according to user input
const unjumble = () => {

    //Load the values from the input
    const a = fix('a', document.getElementById('a').value);
    const b = fix('b', document.getElementById('b').value);
    const c = fix('c', document.getElementById('c').value);
    const d = fix('d', document.getElementById('d').value);
    const e = fix('e', document.getElementById('e').value);
    const f = fix('f', document.getElementById('f').value);
    const g = fix('g', document.getElementById('g').value);
    const h = fix('h', document.getElementById('h').value);
    const i = fix('i', document.getElementById('i').value);
    const j = fix('j', document.getElementById('j').value);
    const k = fix('k', document.getElementById('k').value);
    const l = fix('l', document.getElementById('l').value);
    const m = fix('m', document.getElementById('m').value);
    const n = fix('n', document.getElementById('n').value);
    const o = fix('o', document.getElementById('o').value);
    const p = fix('p', document.getElementById('p').value);
    const q = fix('q', document.getElementById('q').value);
    const r = fix('r', document.getElementById('r').value);
    const s = fix('s', document.getElementById('s').value);
    const t = fix('t', document.getElementById('t').value);
    const u = fix('u', document.getElementById('u').value);
    const v = fix('v', document.getElementById('v').value);
    const w = fix('w', document.getElementById('w').value);
    const x = fix('x', document.getElementById('x').value);
    const y = fix('y', document.getElementById('y').value);
    const z = fix('z', document.getElementById('z').value);


    //Get hidden jumbled quote
    var hidden = document.getElementById('hidden').innerHTML.split('');

    //Get rid of bad values

    //Do the mapping
    const unjumbled = hidden.map((char) => {
        switch (char) {
            case 'a': return a;
            case 'b': return b;
            case 'c': return c;
            case 'd': return d;
            case 'e': return e;
            case 'f': return f;
            case 'g': return g;
            case 'h': return h;
            case 'i': return i;
            case 'j': return j;
            case 'k': return k;
            case 'l': return l;
            case 'm': return m;
            case 'n': return n;
            case 'o': return o;
            case 'p': return p;
            case 'q': return q;
            case 'r': return r;
            case 's': return s;
            case 't': return t;
            case 'u': return u;
            case 'v': return v;
            case 'w': return w;
            case 'x': return x;
            case 'y': return y;
            case 'z': return z;
            default: return char;

        }
    }).join('')

    //Update quote
    var show = document.getElementById('showing');
    show.innerHTML = unjumbled;

    return false; //Stops page from reloading
}


// This loads the quote as originally encoded
const reJumble = () => {
    var show = document.getElementById('showing');
    show.innerHTML = document.getElementById('hidden').innerHTML;
    return false; //Stops page from reloading
}