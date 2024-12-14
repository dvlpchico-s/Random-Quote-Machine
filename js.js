const { createStore } = Redux;
const { Provider, useDispatch, useSelector } = ReactRedux;
const { useState } = React;
const { render } = ReactDOM;

// Estado inicial
const initialState = {
  quote: "A vida é uma escolha entre felicidade e dor.",
  author: "Autor Desconhecido",
  twitterLink: "",
  bgColor: "#FFFFFF"
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUOTE':
      return { 
        ...state, 
        quote: action.payload.quote, 
        author: action.payload.author,
        twitterLink: action.payload.twitterLink 
      };
    case 'SET_COLOR':
      return { ...state, bgColor: action.payload };
    default:
      return state;
  }
};

// Store
const store = createStore(reducer);

// Actions
const setQuote = (quote, author, twitterLink) => ({
  type: 'SET_QUOTE',
  payload: { quote, author, twitterLink }
});

const setColor = (color) => ({
  type: 'SET_COLOR',
  payload: color
});

// Função para gerar cor aleatória
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Componente App
function App() {
  const dispatch = useDispatch();
  const quote = useSelector(state => state.quote);
  const author = useSelector(state => state.author);
  const twitterLink = useSelector(state => state.twitterLink);
  const bgColor = useSelector(state => state.bgColor);

  const generateQuote = () => {
    const quotes = [
      {
        text: "A vida é uma escolha entre felicidade e dor.",
        author: "Autor Desconhecido",
        twitter: "twitter.com/intent/tweet"
      },
      {
        text: "Acredite em si mesmo e em todas as suas capacidades.",
        author: "Autor Desconhecido",
        twitter: "twitter.com/intent/tweet"
      },
      {
        text: "A verdadeira felicidade está na simplicidade.",
        author: "Autor Desconhecido",
        twitter: "twitter.com/intent/tweet"
      },
      {
        text: "Água mole pedra dura, tanto bate até que fura",
        author: "Provérbio Popular",
        twitter: "twitter.com/intent/tweet"
      },
      {
        text: "É apenas um dia ruim, não uma vida ruim",
        author: "Autor Desconhecido",
        twitter: "twitter.com/intent/tweet"
      },
      {
        text: "Rapadura é doce mas não é mole não",
        author: "Provérbio Popular",
        twitter: "twitter.com/intent/tweet"
      }
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const randomColor = getRandomColor();

    dispatch(setQuote(randomQuote.text, randomQuote.author, randomQuote.twitter));
    dispatch(setColor(randomColor));
    document.body.style.backgroundColor = randomColor; // Muda a cor de fundo da página
  };

  return (
    <div className="wrapper" id="quote-box">
      <h1>Gerador de Citações Aleatórias</h1>
      <button onClick={generateQuote} id="new-quote">Gerar Citação</button>
      <p id="text">{quote}</p>
      <p id="author">- {author}</p>
      <a href={twitterLink} id="tweet-quote" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/?size=100&id=phOKFKYpe00C&format=png&color=000000" alt="Tweetar Citação"/>
      </a>
    </div>
  );
}

// Renderizando o componente App dentro do Provider
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
