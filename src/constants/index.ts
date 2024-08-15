import { SegmentationPopupProps } from "../component/Customer/SegmentationPopup";
import { ChartOptions, ChartData } from "chart.js";

export const PlansData = {
  quarterly: [
    {
      name: "Free trial",
      desc: "Kickstart your journey with our free trial without any credit card",
      price: 0,
      validity: "(15 days free trial)",
      features: [
        "Digital QR menu with 5 tables",
        "Social media integration",
        "Automated customer data collection",
        "Automated feedback collection",
        "Partial Customer insights",
      ],
      button: {
        btn: "Lets get started",
        start: true,
      },
    },
    {
      name: "Starter Plan",
      desc: "Unleash the Power of Your Business with Starter Plan.",
      price: 765,
      validity: "/month billed annually",
      features: [
        "Digital QR menu with 5 tables",
        "Social media integration",
        "Automated customer data collection",
        "Automated feedback collection",
        "Customer insights ",
        "Automated marketing",
      ],
      button: {
        btn: "Lets get started",
        start: true,
      },
    },
    {
      name: "Premium Enterprise",
      desc: "Unleash the Power of Your Business with Premium Enterprise Plan.",
      price: 1215,
      validity: "/month/Outlet",
      features: [
        "All of Starter plan with unlimited tables",
        "Detailed customer insights",
        "WhatsApp Business Api",
        "Readymade Marketing template",
        "Personalised targeted marketing",
        "Dedicated 24/7 support",
      ],
      button: {
        btn: "Contact Sales",
        start: false,
      },
    },
  ],
  annually: [
    {
      name: "Free trial",
      desc: "Kickstart your journey with our free trial without any credit card",
      price: 0,
      validity: "(15 days free trial)",
      features: [
        "Digital QR menu with 5 tables",
        "Social media integration",
        "Automated customer data collection",
        "Automated feedback collection",
        "Partial Customer insights",
      ],
      button: {
        btn: "Lets get started",
        start: true,
      },
    },
    {
      name: "Starter Plan",
      desc: "Unleash the Power of Your Business with Starter Plan.",
      price: 465,
      validity: "/month billed annually",
      features: [
        "Digital QR menu with 5 tables",
        "Social media integration",
        "Automated customer data collection",
        "Automated feedback collection",
        "Customer insights ",
        "Automated marketing",
      ],
      button: {
        btn: "Lets get started",
        start: true,
      },
    },
    {
      name: "Premium Enterprise",
      desc: "Unleash the Power of Your Business with Premium Enterprise Plan.",
      price: 845,
      validity: "/month/Outlet",
      features: [
        "All of Starter plan with unlimited tables",
        "Detailed customer insights",
        "WhatsApp Business Api",
        "Readymade Marketing template",
        "Personalised targeted marketing",
        "Dedicated 24/7 support",
      ],
      button: {
        btn: "Contact Sales",
        start: false,
      },
    },
  ],
};

export const PlansTable = [
  {
    head: "Number of Tables",
    plan1: "5 Tables",
    plan2: {
      head: "10 Tables",
      subhead: "Table Add-ons on Demand",
    },
    plan3: {
      head: "Unlimited",
    },
  },
  {
    head: "Menu catalogue items",
    plan1: "Unlimited",
    plan2: {
      head: "Unlimited",
    },
    plan3: {
      head: "Unlimited",
    },
  },
  {
    head: "Customer records",
    plan1: "100 Max",
    plan2: {
      head: "Unlimited",
    },
    plan3: {
      head: "Unlimited",
    },
  },
  {
    head: "Social media integration",
    plan1: "check",
    plan2: {
      head: "check",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Automated customer data collection",
    plan1: "check",
    plan2: {
      head: "check",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Customer data Analytics",
    plan1: "",
    plan2: {
      head: "Partial",
    },
    plan3: {
      head: "Detailed",
    },
  },
  {
    head: "Automated Feedback collection",
    plan1: "check",
    plan2: {
      head: "check",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Automated WhatApp Campaign",
    plan1: "uncheck",
    plan2: {
      head: "Partial",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Readymade WhatsApp campaign template",
    plan1: "uncheck",
    plan2: {
      head: "check",
    },
    plan3: {
      head: "check",
      subhead: "Customisable",
    },
  },
  {
    head: "Analytics and reporting",
    plan1: "uncheck",
    plan2: {
      head: "check",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Outlet Management",
    plan1: "uncheck",
    plan2: {
      head: "uncheck",
    },
    plan3: {
      head: "check",
    },
  },
  {
    head: "Official WhatsApp Business API",
    plan1: "uncheck",
    plan2: {
      head: "uncheck",
    },
    plan3: {
      head: "check",
      subhead: "At additional setup fee of ₹5000",
    },
  },
  {
    head: "Official WhatsApp Greentick",
    plan1: "uncheck",
    plan2: {
      head: "uncheck",
    },
    plan3: {
      head: "check",
      subhead: "Additional verification required",
    },
  },
  {
    head: "WhatsApp Messaging",
    plan1: "uncheck",
    plan2: {
      head: "uncheck",
    },
    plan3: {
      head: "check",
    },
  },
];

//segmentaion colors
export const segmentationColors = {
  New: "bg-green-200 text-green-800",
  Regular: "bg-purple-200 text-purple-800",
  Risk: "bg-red-200 text-red-800",
  Loyal: "bg-yellow-200 text-yellow-800",
};

export interface Customer {
  userId: {
    _id: string;
    name: string;
    phone: string;
    gender: string;
    birthday: string;
    anniversary: string;
    favoriteMenuItems: [
      {
        resId: string;
        menuItems: string[];
        _id: string;
      }
    ];
  };
  resId: string;
  visits: string[];
  // segmentation: "New" | "Regular" | "Risk" | "Loyal";
}

//dummy data for customersList
// export const customers: Customer[] = [
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "Risk",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "Risk",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "Risk",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "Risk",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "Risk",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "Risk",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "Risk",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "Risk",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "New",
//   },
//   {
//     name: "Sam Sundar",
//     phone: "+91 7603037718",
//     visits: 1,
//     lastVisit: "Today",
//     segmentation: "Regular",
//   },
// ];

//hardcoded data for segmentation popups
export const segmentationDetails: {
  [key in SegmentationPopupProps["segmentation"]]: {
    title: string;
    description: string;
    proTip: string;
    color: string;
  };
} = {
  New: {
    title: "New",
    description:
      "These customers have visited your business for the first time.",
    proTip: "Send a welcome message and special first-visit offers.",
    color: "bg-green-200 text-green-800",
  },
  Regular: {
    title: "Regular",
    description:
      "These customers have visited your business for more than 3 time in last 30 days.",
    proTip: "Send  Offer campaigns on their next Visit at your business",
    color: "bg-purple-200 text-purple-800",
  },
  Risk: {
    title: "Risk",
    description:
      "These customers have not visited your business in last 60 Days",
    proTip:
      "Send  Offer campaigns for retaining them to Visit at your business again",
    color: "bg-red-200 text-red-800",
  },
  Loyal: {
    title: "Loyal",
    description:
      "These customers have visited your business more than 5 times in the last 60 days.",
    proTip:
      "Send personalized offer campaigns on their next visit at your business.",
    color: "bg-yellow-200 text-yellow-800",
  },
};

// Generate labels for each day of the month
const daysInMonth = Array.from({ length: 30 }, (_, i) => `${i + 1} July`);

export const dataForOverview: ChartData<"bar"> = {
  labels: daysInMonth,
  datasets: [
    {
      label: "Regular Customer",
      data: [
        1, 42, 6, 1, 42, 6, 1, 42, 6, 1, 42, 6, 1, 42, 6, 1, 42, 6, 1, 42, 6, 1,
        42, 6, 1, 42, 6, 1, 42, 21,
      ],
      backgroundColor: "#004AAD",
      barThickness: 20,
    },
    {
      label: "New Customer",
      data: [
        18, 12, 6, 18, 12, 6, 18, 12, 6, 18, 12, 6, 18, 12, 6, 18, 12, 6, 18,
        12, 6, 18, 12, 6, 18, 12, 6, 18, 12, 23,
      ],
      backgroundColor: "#C0DBFF",
      barThickness: 20,
      borderRadius: {
        topLeft: 5,
        topRight: 5,
      },
    },
  ],
};

export const options: ChartOptions<"bar"> = {
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
    },
  },
  plugins: {
    legend: {
      display: false, // Hides the legend
    },
  },
};
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const weekVisit = {
  headline: "Weekend/weekdays Visit",
  body: "This graph shows visit differentiation of customer on weekdays vs weekends in a month",
};
export const monthlyVisit = {
  headline: "Monthly Visit",
  body: "This graph shows visiting pattern of customers in a month",
};

// src/constants/slidesData.ts

export interface Slide {
  image: string;
  title: string;
  type: string;
  start: boolean;
}

export interface SlideCategory {
  title: string;
  slides: Slide[];
}

export const AllData: Record<string, SlideCategory> = {
  recentlyViewed: {
    title: "Recently Viewed",
    slides: [
      {
        image: "../../assets/image 168.png",
        title: "Welcome Greetings when they visit your business",
        type: "Utility",
        start: false,
      },
      {
        image: "image 168",
        title: "Happy birthday to you! FREE starter on us",
        type: "Marketing",
        start: false,
      },
      {
        image: "https://via.placeholder.com/300x200",
        title: "Happy birthday to you! Enjoy Flat 10% OFF",
        type: "Utility",
        start: false,
      },
      {
        image: "https://via.placeholder.com/300x200",
        title: "Welcome Greetings when they visit your business",
        type: "Marketing",
        start: false,
      },
      {
        image: "https://via.placeholder.com/300x200",
        title: "Happy birthday! Enjoy a complimentary dessert on the house.",
        type: "Utility",
        start: false,
      },
      {
        image: "https://via.placeholder.com/300x200",
        title:
          "Happy Birthday! Treat yourself with a flat 25% discount from us.",
        type: "Utility",
        start: false,
      },
      {
        image: "https://via.placeholder.com/300x200",
        title: "Feedback Campaign for Zomato reviews",
        type: "Utility",
        start: false,
      },
      {
        image: "image 166.png",
        title: "Feedback Campaign for Google reviews",
        type: "Marketing",
        start: false,
      },
      // Add more slides
    ],
  },
};
export const slidesData: Record<string, SlideCategory> = {
  birthdays: {
    title: "Birthdays",
    slides: [
      {
        image: "https://via.placeholder.com/300x200",
        title: "Birthday 1",
        type: "Utility",
        start: false,
      },
      {
        image: "https://via.placeholder.com/300x200",
        title: "Birthday 2",
        type: "Utility",
        start: false,
      },
      // Add more slides
    ],
  },
  anniversaries: {
    title: "Anniversaries",
    slides: [
      {
        image: "https://via.placeholder.com/300x200",
        title: "Anniversary 1",
        type: "Utility",
        start: false,
      },
      {
        image: "https://via.placeholder.com/300x200",
        title: "Anniversary 2",
        type: "Utility",
        start: false,
      },
      // Add more slides
    ],
  },
  // events: {
  //   title: "Events",
  //   slides: [
  //     {
  //       image: "https://via.placeholder.com/300x200",
  //       title: "Event 1",
  //       type: "Utility",
  //     },
  //     {
  //       image: "https://via.placeholder.com/300x200",
  //       title: "Event 2",
  //       type: "Utility",
  //     },
  //     // Add more slides
  //   ],
  // },
};

export const pricingData = {
  basic: [
    {
      utility: "0.50",
    },
    {
      marketing: "1.10",
    },
  ],
  premium: [
    {
      utility: "0.40",
    },
    {
      marketing: "1.00",
    },
  ],
};
export const Campaigns = {
  Questions: {
    1: "What are Utility Campaigns?",
    2: "What are Marketing Campaigns?",
  },
  answers: {
    1: "A utility campaign focuses on providing functional value to customers, such as reminders, confirmations, updates, and customer support. These messages are usually transactional, offering useful information that enhances the user experience and ensures smooth service operations.",
    2: "A marketing campaign aims to promote products or services, attract new customers, and drive sales. These messages often include offers, discounts, product announcements, and brand awareness efforts. Marketing campaigns are designed to engage customers and encourage them to take action.",
  },
};

type Campaign = {
  channel: string;
  name: string;
  delivered: number;
  revisit: number;
  conversionRate: string;
  cost: string;
  status: string;
};

export const manageCampaigns: Campaign[] = [
  {
    channel: "Marketing",
    name: "Anniversary campaign to all customers",
    delivered: 0,
    revisit: 0,
    conversionRate: "0%",
    cost: "₹0",
    status: "Under Review",
  },
  {
    channel: "Marketing",
    name: "Birthday campaign to all customers",
    delivered: 250,
    revisit: 32,
    conversionRate: "12%",
    cost: "₹250",
    status: "Active",
  },
  {
    channel: "Utility",
    name: "Greeting Campaign on visit",
    delivered: 300,
    revisit: 0,
    conversionRate: "0%",
    cost: "₹150",
    status: "Active",
  },
  {
    channel: "Marketing",
    name: "Birthday campaign to all customers",
    delivered: 150,
    revisit: 20,
    conversionRate: "13%",
    cost: "₹150",
    status: "Pause",
  },
];
