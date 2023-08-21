import { FaDiceD20, FaBook, FaAddressCard } from "react-icons/fa";
import {
  Home,
  Users,
  // Box,
  DollarSign,
  // Tag,
  // Clipboard,
  // Camera,
  // AlignLeft,
  // UserPlus,
  // Chrome,
  // BarChart,Settings,Archive,
  LogIn,
} from "react-feather";

export const MENUITEMS = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
  // {
  //     title: 'User', icon: Users, type: 'sub', active: false, children: [
  //         { path: '/User/user-list', title: 'all Users', type: 'link' },
  //     ]
  // },
  {
    path: "/User/user-list",
    title: "User",
    icon: Users,
    type: "link",
    active: false,
  },
  {
    title: "Transaction",
    path: "/transaction",
    icon: DollarSign,
    type: "link",
    active: false,
  },
  {
    title: "Games",
    icon: FaDiceD20,
    type: "sub",
    active: false,
    children: [
      { path: "/games/poker", title: "Poker", type: "link" },
      // {path:'/games/blackjack', title: 'BlackJack', type: 'link'},
      // {path:'/games/slots', title: 'Slots', type: 'link'},
      // {path:'/games/roulette', title: 'Roulette', type: 'link'}
    ],
  },
  {
    title: "Crypto Redeem",
    path: "/cypto-redeem",
    icon: FaAddressCard,
    type: "link",
    active: false,
  },
  {
    title: "Reports",
    icon: FaBook,
    type: "sub",
    active: false,
    children: [
      {
        path: "/reports-deposit-withdraw",
        title: "Deposit & Withdraw",
        type: "link",
      },
      { path: "/user-reports", title: "User Report", type: "link" },
      // {path:'/games/blackjack', title: 'BlackJack', type: 'link'},
      // {path:'/games/slots', title: 'Slots', type: 'link'},
      // {path:'/games/roulette', title: 'Roulette', type: 'link'}
    ],
  },
  //   {
  //     title: "Manage Prizes",
  //     path: "/prizes",
  //     icon: FaGift,
  //     type: "link",
  //     active: false,
  //   },
  //   {
  //     title: "KYC",
  //     path: "/kyc",
  //     icon: FaAddressCard,
  //     type: "link",
  //     active: false,
  //   },
  {
    title: "Logout",
    path: "/auth/login",
    icon: LogIn,
    type: "link",
    active: false,
  },
];
