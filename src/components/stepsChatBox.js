const welcomeText = `Benvenuto! Come posso esserti utile?`;
const dashboardText = `Nella dashboard puoi trovare uno stato generale dei sensori, con un grafico real time di un sensore`;
const notificationsText = `Nella pagina delle notifiche puoi trovare tutti gli avvisi ed allarmi riguardanti le anomalie dei singoli sensori, macchinari o stato di un processo`;

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
        value: "prova3",
        content: "Macchinari",
        goTo: 4,
      },
    ],
    deelay: 3000,
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
