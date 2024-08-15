export const utility = [
  // {
  //     title: "",

  //     // type: "Utility",
  //     // image: "../../assets/image 168.png",
  //     // start: false,
  // },

  {
    title: "Welcome Greetings when they visit your business",
    type: "Utility",
    image: "../../assets/image 168.png",
    start: false,
  },
  {
    title: "Welcome Greetings when they visit your business",
    type: "Utility",
    image: "../../assets/image 168.png",
    start: false,
  },
  {
    title: "Welcome Greetings when they visit your business",
    type: "Utility",
    image: "../../assets/image 168.png",
    start: false,
  },
];
export const marketing = [
  {
    title: "Happy birthday to you! FREE starter on us",
    type: "Marketing",
    image: "image 168",
    start: false,
  },
  {
    title: "Happy birthday to you! FREE starter on us",
    type: "Marketing",
    image: "image 168",
    start: false,
  },
  {
    title: "Happy birthday to you! FREE starter on us",
    type: "Marketing",
    image: "image 168",
    start: false,
  },
  {
    title: "Happy birthday to you! FREE starter on us",
    type: "Marketing",
    image: "image 168",
    start: false,
  },
];

export const order_action_required_1 = {
  time: "",
  users: [],
  messageData: {
    messaging_product: "whatsapp",
    //   "to": "+919546959970",
    type: "template",
    template: {
      name: "order_action_required_1",
      language: {
        code: "en_us",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "name",
              text: "Foodoos",
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "name",
              text: "Foodoos",
            },
            {
              type: "offer",
              text: "Free Refreshment",
            },
            {
              type: "price",
              text: "500",
            },
            {
              type: "date",
              text: "15th August",
            },
            {
              type: "location",
              text: "AMP Baisakhi Mall, Salt",
            },
            {
              type: "phone",
              text: "7603037718",
            },
          ],
        },
      ],
    },
  },
};
export const order_action_required_2 = {
    time: "",
    users: [],
    messageData: {
      messaging_product: "whatsapp",
      //   "to": "+919546959970",
      type: "template",
      template: {
        name: "order_action_required_1",
        language: {
          code: "en_us",
        },
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "name",
                text: "Foodoos",
              },
            ],
          },
          {
            type: "body",
            parameters: [
              {
                type: "name",
                text: "Foodoos",
              },
              {
                type: "offer",
                text: "Free Refreshment",
              },
              {
                type: "price",
                text: "500",
              },
              {
                type: "date",
                text: "15th August",
              },
              {
                type: "location",
                text: "AMP Baisakhi Mall, Salt",
              },
            ],
          },
          {
            type: "footer",
            parameters: [
              {
                type: "name",
                text: "Foodoos",
              },

            ],
          },
        ],
      },
    },
  };
export const content_1 = {
  header: "<p>Special offer from <strong>{name}</strong></p>",
  body: `<p>Enjoy a <strong>{offer}</strong> on a billing of <strong>{price}</strong> or above! 🎉</p><br /><p>📅 Valid until: <strong>{date}</strong></p><p>📍 Visit us at: <strong>{location}</strong></p><br /><p>T&C apply. Hurry, come savor the flavors at <strong>{name}</strong> 🍲</p><p>For more details, call us at <strong>{phone}</strong></p>`,
};
export const content_2 = {
    header: "<p>Special offer from <strong>{name}</strong></p>",
    body: `<p>Enjoy a <strong>{offer}</strong> on a billing of <strong>{price}</strong> or above! 🎉</p><br /><p>📅 Valid until: <strong>{date}</strong></p><p>📍 Visit us at: <strong>{location}</strong></p><br /><p>T&C apply. Hurry, come savor the flavors at <strong>{name}</strong> 🍲</p>`,
    footer: "<p>Thanks from <strong>{name}</strong></p>",
  };
