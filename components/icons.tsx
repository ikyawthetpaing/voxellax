import {
  Activity,
  AppWindow,
  ArrowDown,
  ArrowUp,
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
};
