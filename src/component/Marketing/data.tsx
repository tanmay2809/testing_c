export const utility = [
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
  // {
  //   title: "Happy birthday to you! FREE starter on us",
  //   type: "Marketing",
  //   image: "image 168",
  //   start: false,
  // },
  // {
  //   title: "Happy birthday to you! FREE starter on us",
  //   type: "Marketing",
  //   image: "image 168",
  //   start: false,
  // },
  // {
  //   title: "Happy birthday to you! FREE starter on us",
  //   type: "Marketing",
  //   image: "image 168",
  //   start: false,
  // },
];
export const utilityCampaigns = [
  {
    order_action_required_1: {
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
    },
  },
  {
    welcome_message: {
      time: "",
      users: [],
      messageData: {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        // to: "+917076447932",
        type: "template",
        template: {
          name: "welcome_message",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "name",
                  text: "foodoos",
                },
              ],
            },
          ],
        },
      },
    },
  },
];
export const marketingCampaigns = [
  {
    order_action_required_1: {
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
                {
                  type: "image",
                  image: {
                    link: "../../assets/Group 1171278505.png",
                  },
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
            {
              type: "button",
              sub_type: "quick_reply",
              index: "0",
              parameters: [
                {
                  type: "payload",
                  payload: "PAYLOAD",
                },
              ],
            },
            {
              type: "button",
              sub_type: "quick_reply",
              index: "1",
              parameters: [
                {
                  type: "payload",
                  payload: "PAYLOAD",
                },
              ],
            },
          ],
        },
      },
    },
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
            {
              type: "image",
              image: {
                link: "../../assets/Group 1171278505.png",
              },
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
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [
            {
              type: "payload",
              payload: "PAYLOAD",
            },
          ],
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [
            {
              type: "payload",
              payload: "PAYLOAD",
            },
          ],
        },
      ],
    },
  },
};
export const utilityContent = [
  {
    content_1: {
      type: "Utility",
      header: "<p>Special offer from <strong>{name}</strong></p>",
      body: `<p>Enjoy a <strong>{offer}</strong> on a billing of <strong>{price}</strong> or above! 🎉</p><br /><p>📅 Valid until: <strong>{date}</strong></p><p>📍 Visit us at: <strong>{location}</strong></p><br /><p>T&C apply. Hurry, come savor the flavors at <strong>{name}</strong> 🍲</p><p>For more details, call us at <strong>{phone}</strong></p>`,
    },
  },
  {
    content_2: {
      type: "Utility",
      header:
        "<p>Welcome to <strong>{name}</strong><p><br/><p>Discover the perfect blend of delicious food and gaming fun.</p><br/><p>Enjoy your time with us.🤩</p>",
    },
  },
];
export const marketingContent = [
  {
    content_3: {
      type: "Marketing",
      header: "<p>Special offer from <strong>{name}</strong></p>",
      body: `<p>Enjoy a <strong>{offer}</strong> on a billing of <strong>{price}</strong> or above! 🎉</p><br /><p>📅 Valid until: <strong>{date}</strong></p><p>📍 Visit us at: <strong>{location}</strong></p><br /><p>T&C apply. Hurry, come savor the flavors at <strong>{name}</strong> 🍲</p>`,
      footer: "<p>Thanks from <strong>{name}</strong></p>",
    },
  },
];
// export const content_1 = {
//   type: "Utility",
//   header: "<p>Special offer from <strong>{name}</strong></p>",
//   body: `<p>Enjoy a <strong>{offer}</strong> on a billing of <strong>{price}</strong> or above! 🎉</p><br /><p>📅 Valid until: <strong>{date}</strong></p><p>📍 Visit us at: <strong>{location}</strong></p><br /><p>T&C apply. Hurry, come savor the flavors at <strong>{name}</strong> 🍲</p><p>For more details, call us at <strong>{phone}</strong></p>`,
// };
// export const content_2 = {
//   type: "Utility",
//   header:
//     "<p>Welcome to <strong>{name}</strong><p><br/><p>Discover the perfect blend of delicious food and gaming fun.</p><br/><p>Enjoy your time with us.🤩</p>",
// };
// export const content_3 = {
//   type: "Marketing",
//   header: "<p>Special offer from <strong>{name}</strong></p>",
//   body: `<p>Enjoy a <strong>{offer}</strong> on a billing of <strong>{price}</strong> or above! 🎉</p><br /><p>📅 Valid until: <strong>{date}</strong></p><p>📍 Visit us at: <strong>{location}</strong></p><br /><p>T&C apply. Hurry, come savor the flavors at <strong>{name}</strong> 🍲</p>`,
//   footer: "<p>Thanks from <strong>{name}</strong></p>",
// };
