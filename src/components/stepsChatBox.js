const welcomeText = `Benvenuto! Come posso esserti utile?`;
const dashboardText = `Nella dashboard puoi trovare uno stato generale dei sensori, con un grafico real time di un sensore`;
const notificationsText = `Nella pagina delle notifiche puoi trovare tutti gli avvisi ed allarmi riguardanti le anomalie dei singoli sensori, macchinari o stato di un processo`;
const machinesText = `Cliccando sul bottone macchinari si aprirà un menù a tendina in cui potrai selezionare il tipo di macchinario, dopo di che vedrai una tabella con tutti i macchinari di quel tipo`;

export const steps = [
  {
    id: 1,
    content: welcomeText,
    options: [
      {
        value: "dashboard",
        content: "Dashboard",
        goTo: 4,
      },

      {
        value: "notifications",
        content: "Notifiche",
        goTo: 20,
      },
      {
        value: "Machines",
        content: "Macchinari",
        goTo: 50,
      },
    ],
    deelay: 3000,
  },
  {
    id: 50,
    // receiveInput: true,
    content: machinesText,
    delay: 3000,
    goTo: 7,
  },
  {
    id: 4,
    // receiveInput: true,
    content: dashboardText,
    delay: 3000,
    goTo: 90,
  },
  {
    id: 20,
    // receiveInput: true,
    content: notificationsText,
    goTo: 6,
  },

  {
    id: 5,
    // receiveInput: true,
    content: "Vuoi andare alla dashboard?!",
    options: [
      {
        value: "dashboard",
        content: "Sì",
        goTo: 100,
      },
      {
        value: "No",
        content: "No",
        goTo: 90,
      },
    ],
  },

  {
    id: 6,
    delay: 8000,

    // receiveInput: true,
    content: "Vuoi andare alle notifiche?!",
    options: [
      {
        value: "notifications",
        content: "Sì",
        goTo: 100,
      },
      {
        value: "No",
        content: "No",
        goTo: 90,
      },
    ],
  },
  {
    id: 7,
    delay: 8000,

    // receiveInput: true,
    content: "Vuoi vedere una lista di macchinari di un tipo?!",
    options: [
      {
        value: "notifications",
        content: "Sì",
        goTo: 80,
      },
      {
        value: "No",
        content: "No",
        goTo: 90,
      },
    ],
  },

  {
    id: 80,
    delay: 1000,

    // receiveInput: true,
    content: "Quale?",
    options: [
      {
        value: "vasche_latte",
        content: "vasche del latte",
        goTo: 100,
      },
      {
        value: "pastorizzazione",
        content: "pastorizzazione",
        goTo: 100,
      },
      {
        value: "stagionatura",
        content: "stagionatura",
        goTo: 100,
      },
    ],
  },

  {
    delay: 0,
    id: 100,
    end: true,
    content: "Okay",
  },

  {
    id: 90,
    content: "Vuoi aiuto su altro?",
    options: [
      {
        value: "Sì",
        content: "Sì",
        goTo: 1,
      },
      {
        value: "No",
        content: "No",
        goTo: 91,
      },
    ],
  },
  {
    id: 91,
    value: "okay",
    content: "okay",
    end: true,
  },
];
