import {
  Activity,
  AppWindow,
  ArrowDown,
  ArrowUp,
  AtSign,
  Bell,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  CreditCard,
  Crop,
  DollarSign,
  EyeOff,
  Facebook,
  Heart,
  HeartHandshake,
  Home,
  Image,
  Instagram,
  Loader2,
  LucideIcon,
  LucideProps,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Minus,
  MoreHorizontal,
  MoveRight,
  Plus,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Store,
  Trash,
  Twitter,
  UploadCloud,
  Users,
  X,
  Youtube,
} from "lucide-react";

import { generateRandomString } from "@/lib/utils";

export type Icon = LucideIcon;

export const Icons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  minus: Minus,
  plus: Plus,
  trash: Trash,
  image: Image,
  cart: ShoppingCart,
  moveRight: MoveRight,
  menu: Menu,
  search: Search,
  dollarSign: DollarSign,
  users: Users,
  creditCard: CreditCard,
  activity: Activity,
  home: Home,
  store: Store,
  mail: Mail,
  megaphone: Megaphone,
  appWindow: AppWindow,
  settings: Settings,
  moreHorizontal: MoreHorizontal,
  bell: Bell,
  x: X,
  uploadCloud: UploadCloud,
  star: Star,
  mapPin: MapPin,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  heart: Heart,
  heartHandshake: HeartHandshake,
  calendar: Calendar,
  slidersHorizontal: SlidersHorizontal,
  plusCircle: PlusCircle,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  check: Check,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  eyeOff: EyeOff,
  chevronsUpDown: ChevronsUpDown,
  crop: Crop,
  spinner: Loader2,
  atSign: AtSign,
  voxellax: ({ ...props }: LucideProps) => {
    const id1 = generateRandomString();
    const id2 = generateRandomString();
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 387.7567383082426 60"
        {...props}
      >
        <defs>
          <linearGradient
            gradientTransform="rotate(25)"
            id={id1}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "rgb(233, 13, 218)", stopOpacity: 1 }}
            ></stop>
            <stop
              offset="100%"
              style={{ stopColor: "rgb(21, 207, 241)", stopOpacity: 1 }}
            ></stop>
          </linearGradient>
        </defs>
        <g
          id={id2}
          fill={`url(#${id1})`}
          transform="matrix(5.982053997744841,0,0,5.982053997744841,-7.298108016925283,-24.646062262954153)"
        >
          <path d="M6.79 4.20L7.27 4.20L5.07 14L3.42 14L1.22 4.20L1.69 4.20L3.79 13.55L4.69 13.55L6.79 4.20ZM12.56 14.15L12.56 14.15Q11.12 14.15 10.26 13.08L10.26 13.08L10.26 13.08Q9.41 12.00 9.41 9.13L9.41 9.13L9.41 9.13Q9.41 6.27 10.26 5.19L10.26 5.19L10.26 5.19Q11.12 4.12 12.56 4.12L12.56 4.12L12.56 4.12Q13.99 4.12 14.84 5.19L14.84 5.19L14.84 5.19Q15.69 6.27 15.69 9.13L15.69 9.13L15.69 9.13Q15.69 12.00 14.84 13.08L14.84 13.08L14.84 13.08Q13.99 14.15 12.56 14.15L12.56 14.15ZM12.56 13.69L12.56 13.69Q13.36 13.69 13.92 13.31L13.92 13.31L13.92 13.31Q14.49 12.94 14.83 11.93L14.83 11.93L14.83 11.93Q15.16 10.92 15.16 9.13L15.16 9.13L15.16 9.13Q15.16 7.34 14.83 6.33L14.83 6.33L14.83 6.33Q14.49 5.33 13.92 4.96L13.92 4.96L13.92 4.96Q13.34 4.58 12.56 4.58L12.56 4.58L12.56 4.58Q11.76 4.58 11.19 4.96L11.19 4.96L11.19 4.96Q10.61 5.33 10.28 6.33L10.28 6.33L10.28 6.33Q9.94 7.34 9.94 9.13L9.94 9.13L9.94 9.13Q9.94 10.92 10.28 11.93L10.28 11.93L10.28 11.93Q10.61 12.94 11.19 13.31L11.19 13.31L11.19 13.31Q11.76 13.69 12.56 13.69L12.56 13.69ZM24.04 4.20L21.81 9.17L24.04 14L23.48 14L21.38 9.38L20.57 9.38L18.47 14L17.92 14L20.15 9.17L17.92 4.20L18.47 4.20L20.55 8.93L21.41 8.93L23.48 4.20L24.04 4.20ZM32.17 4.65L27.40 4.65L27.40 8.96L31.42 8.96L31.42 9.41L27.40 9.41L27.40 13.55L32.17 13.55L32.17 14L26.94 14L26.94 4.20L32.17 4.20L32.17 4.65ZM36.48 13.55L41.26 13.55L41.26 14L36.02 14L36.02 4.20L36.48 4.20L36.48 13.55ZM44.88 13.55L49.66 13.55L49.66 14L44.42 14L44.42 4.20L44.88 4.20L44.88 13.55ZM57.30 14L56.53 10.58L52.67 10.58L51.90 14L51.41 14L53.61 4.20L55.59 4.20L57.79 14L57.30 14ZM52.77 10.14L56.43 10.14L55.20 4.65L54.00 4.65L52.77 10.14ZM66.04 4.20L63.81 9.17L66.04 14L65.48 14L63.38 9.38L62.57 9.38L60.47 14L59.92 14L62.15 9.17L59.92 4.20L60.47 4.20L62.55 8.93L63.41 8.93L65.48 4.20L66.04 4.20Z"></path>
        </g>
      </svg>
    );
  },
  google: ({ ...props }: LucideProps) => (
    <svg
      viewBox="-0.5 0 48 48"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>Google-color</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g
        id="Icons"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Color-" transform="translate(-401.000000, -860.000000)">
          <g id="Google" transform="translate(401.000000, 860.000000)">
            <path
              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
              id="Fill-1"
              fill="#FBBC05"
            ></path>
            <path
              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
              id="Fill-2"
              fill="#EB4335"
            ></path>
            <path
              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
              id="Fill-3"
              fill="#34A853"
            ></path>
            <path
              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
              id="Fill-4"
              fill="#4285F4"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
};
