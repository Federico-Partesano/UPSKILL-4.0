const welcomeText = `Ciao Benvenuto! io sono Marco, come posso tornarti utile!`;

export const steps = [
  {
    id: 1,
    content: welcomeText,
    deelay: 3000,
    goTo: 2,
  },
  {
    id: 2,
    // receiveInput: true,
    content: "Ti piace il progetto sì?!",
    options: [
      {
        content: "Sì!",
        goTo: 4,
      },
      {
        content: "No!",
        goTo: 5,
      },
    ],
  },
  {
    id: 3,
    content: "Va bene allora... ",
    goTo: 33,
  },
  {
    id: 33,
    content: "in caso di bisogno sono sempre quì, arrivederci!!",
    end: true,
  },
  {
    id: 4,
    content: "Mi fa piacere che ti piaccia, hai qualche dubbio sul sito??",
    options: [
      { content: "No", goTo: 3 },
      { content: "Sì", goTo: 55 },
    ],
  },
  {
    id: 55,
    content: "Su cosa?!",
    options: [
      { content: "Forum", goTo: 3 },
      { content: "Macchinari", goTo: 55 },
      { content: "Grafici", goTo: 55 },
      { content: "In caso di problemi che faccio?!", goTo: 55 },
    ],
    goTo: 5,
  },
  {
    id: 5,
    content: "Mi dispiace!!",
    end: false,
    goTo: 6,
  },
];
