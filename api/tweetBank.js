const data = [];

const add = (name, content, imgURL) => {
  const tweet = { id: data.length, name, content, imgURL };
  data.push(tweet);
  return tweet;
};

const list = () => {
  return data;
};

const findOne = (id) => {
  return data.find(tweet => tweet.id === id)
};

const findAllMatch = (name) => {
  const newArr = data.filter(tweet => tweet.name === name)
  return newArr;
};

const remove = (id) => {
  data.forEach((tweet, i) => {
    if (tweet.id === id) data.splice(i, 1);
  });
};

module.exports = { add, list, findOne, findAllMatch, remove };

const randArrayEl = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = () => {
  const fake_firsts = [ "Toni", "Guille", "Santi", "Facu", "Alan", "Pinki", "Tincho", "Solano", "R2D2", ]; 
  const fake_lasts = [ "Scanlan", "Aszyn", "Tralice", "Velasco", "Sainz", "Palacio", "Palacios", "Lidueña", "Fisicaro", "Ecma", ]; return randArrayEl(fake_firsts) + " " + randArrayEl(fake_lasts); 
}

const getFakeTweet = () => {
  const awesome_adj = [ "increibles", "emocionantes", "increibles", "graciosos", "dulces", "cool", "sorprendentes", "impresionantes"]; 

  return ( "Plataforma 5 es " + randArrayEl(awesome_adj) + "! Los profesores simplemente son " + randArrayEl(awesome_adj) + ". #P5Love #codedreams" ); 
}; 

const getDummyImage = () => { 
  const dummy_img = [ "https://media.giphy.com/media/SDogLD4FOZMM8/giphy.gif", "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"];
  
  return randArrayEl(dummy_img);
}

for (let i = 0; i < 10; i++) {
  module.exports.add(getFakeName(), getFakeTweet(), getDummyImage());
}