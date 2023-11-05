import { IconType } from "@/types";
import {
  Activity,
  AppWindow,
  ArrowDown,
  ArrowUp,
  AtSign,
  BadgeCheck,
  Bell,
  Bookmark,
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
  Eye,
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
  Package,
  PackageSearch,
  PenLine,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Share,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  StarHalf,
  Store,
  Trash,
  Twitter,
  Undo,
  UploadCloud,
  Users,
  X,
  Youtube,
} from "lucide-react";

import { getUniqueId } from "@/lib/utils";

interface IconProps extends LucideProps {
  name: IconType;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = Icons[name];
  return <IconComponent {...props} />;
}

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
  eye: Eye,
  eyeOff: EyeOff,
  chevronsUpDown: ChevronsUpDown,
  crop: Crop,
  spinner: Loader2,
  atSign: AtSign,
  bookmark: Bookmark,
  packageSearch: PackageSearch,
  verified: BadgeCheck,
  starHalf: StarHalf,
  share: Share,
  package: Package,
  penLine: PenLine,
  undo: Undo,
  voxellax: ({ ...props }: LucideProps) => {
    const id = getUniqueId();
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 391.4656282170464 60"
        {...props}
      >
        <defs>
          <linearGradient
            gradientTransform="rotate(25)"
            id={id}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "rgb(233, 13, 218)", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgb(21, 207, 241)", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <g
          // id="a9946bf0-9b02-4119-a904-5a75f9b80de4"
          fill={`url(#${id})`}
          transform="matrix(5.982053997744841,0,0,5.982053997744841,-5.264207882079262,-24.646062262954153)"
        >
          <path d="M6.52 4.20L7.60 4.20L5.40 14L3.08 14L0.88 4.20L1.96 4.20L3.96 13.10L4.52 13.10L6.52 4.20ZM12.56 14.15L12.56 14.15Q11.51 14.15 10.77 13.73L10.77 13.73L10.77 13.73Q10.02 13.30 9.58 12.19L9.58 12.19L9.58 12.19Q9.14 11.07 9.14 9.13L9.14 9.13L9.14 9.13Q9.14 7.18 9.58 6.08L9.58 6.08L9.58 6.08Q10.02 4.97 10.77 4.54L10.77 4.54L10.77 4.54Q11.51 4.12 12.56 4.12L12.56 4.12L12.56 4.12Q14.15 4.12 15.06 5.21L15.06 5.21L15.06 5.21Q15.96 6.30 15.96 9.13L15.96 9.13L15.96 9.13Q15.96 11.97 15.06 13.06L15.06 13.06L15.06 13.06Q14.15 14.15 12.56 14.15L12.56 14.15ZM12.56 13.24L12.56 13.24Q13.29 13.24 13.80 12.89L13.80 12.89L13.80 12.89Q14.31 12.54 14.60 11.64L14.60 11.64L14.60 11.64Q14.90 10.74 14.90 9.13L14.90 9.13L14.90 9.13Q14.90 7.53 14.60 6.63L14.60 6.63L14.60 6.63Q14.31 5.73 13.80 5.38L13.80 5.38L13.80 5.38Q13.29 5.03 12.56 5.03L12.56 5.03L12.56 5.03Q11.82 5.03 11.30 5.38L11.30 5.38L11.30 5.38Q10.79 5.73 10.50 6.62L10.50 6.62L10.50 6.62Q10.21 7.52 10.21 9.13L10.21 9.13L10.21 9.13Q10.21 10.74 10.50 11.64L10.50 11.64L10.50 11.64Q10.79 12.54 11.30 12.89L11.30 12.89L11.30 12.89Q11.82 13.24 12.56 13.24L12.56 13.24ZM24.32 4.20L22.09 9.17L24.32 14L23.20 14L21.24 9.60L20.71 9.60L18.75 14L17.63 14L19.85 9.18L17.63 4.20L18.75 4.20L20.69 8.71L21.27 8.71L23.20 4.20L24.32 4.20ZM32.35 5.10L27.76 5.10L27.76 8.74L31.60 8.74L31.60 9.63L27.76 9.63L27.76 13.10L32.35 13.10L32.35 14L26.75 14L26.75 4.20L32.35 4.20L32.35 5.10ZM36.75 13.10L41.34 13.10L41.34 14L35.76 14L35.76 4.20L36.75 4.20L36.75 13.10ZM45.15 13.10L49.74 13.10L49.74 14L44.16 14L44.16 4.20L45.15 4.20L45.15 13.10ZM56.94 14L56.25 10.95L52.95 10.95L52.26 14L51.23 14L53.42 4.20L55.78 4.20L57.97 14L56.94 14ZM53.14 10.05L56.06 10.05L54.94 5.10L54.26 5.10L53.14 10.05ZM66.32 4.20L64.09 9.17L66.32 14L65.20 14L63.24 9.60L62.71 9.60L60.75 14L59.63 14L61.85 9.18L59.63 4.20L60.75 4.20L62.69 8.71L63.27 8.71L65.20 4.20L66.32 4.20Z" />
        </g>
      </svg>
    );
  },
  google: ({ ...props }: LucideProps) => (
    <svg
      viewBox="-0.5 0 48 48"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
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
  paypal: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 -9 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <rect
          x="0.5"
          y="0.5"
          width="57"
          height="39"
          rx="3.5"
          fill="white"
          stroke="#F3F3F3"
        ></rect>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.4388 20.2562L26.6913 18.6477L26.1288 18.6346H23.4429L25.3095 6.76505C25.3153 6.72911 25.3341 6.69575 25.3616 6.67201C25.3892 6.64827 25.4243 6.63525 25.4611 6.63525H29.9901C31.4937 6.63525 32.5313 6.94897 33.073 7.56826C33.327 7.85879 33.4887 8.16246 33.567 8.49653C33.6491 8.84713 33.6505 9.26596 33.5704 9.77689L33.5646 9.81405V10.1415L33.8186 10.2858C34.0324 10.3996 34.2024 10.5298 34.3328 10.6788C34.55 10.9273 34.6905 11.2431 34.7499 11.6173C34.8113 12.0022 34.791 12.4604 34.6905 12.979C34.5746 13.5755 34.3873 14.0951 34.1343 14.5202C33.9016 14.9119 33.6052 15.2369 33.2531 15.4886C32.9171 15.7279 32.5178 15.9095 32.0664 16.0257C31.6288 16.1399 31.1301 16.1975 30.583 16.1975H30.2305C29.9786 16.1975 29.7338 16.2886 29.5416 16.4517C29.3489 16.6183 29.2215 16.8459 29.1824 17.0947L29.1558 17.2396L28.7096 20.0747L28.6894 20.1787C28.684 20.2117 28.6748 20.2281 28.6613 20.2392C28.6493 20.2494 28.632 20.2562 28.615 20.2562H26.4388"
          fill="#28356A"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.0589 9.85181C34.0455 9.93848 34.03 10.027 34.0126 10.1181C33.4154 13.1934 31.372 14.2558 28.7623 14.2558H27.4335C27.1143 14.2558 26.8453 14.4881 26.7957 14.8038L25.9227 20.3573C25.8904 20.5647 26.0497 20.7514 26.2582 20.7514H28.615C28.894 20.7514 29.1311 20.5481 29.1751 20.2721L29.1982 20.1521L29.6419 17.3281L29.6705 17.1732C29.7139 16.8962 29.9515 16.6928 30.2305 16.6928H30.583C32.8663 16.6928 34.6538 15.7632 35.1763 13.0728C35.3944 11.9489 35.2815 11.0105 34.704 10.3505C34.5293 10.1516 34.3125 9.98635 34.0589 9.85181"
          fill="#298FC2"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.4342 9.60206C33.3429 9.57534 33.2488 9.5512 33.1522 9.52936C33.0551 9.50807 32.9557 9.48922 32.8533 9.47267C32.4951 9.41462 32.1025 9.38708 31.682 9.38708H28.1322C28.0447 9.38708 27.9617 9.40689 27.8874 9.44269C27.7236 9.52163 27.602 9.67707 27.5726 9.86736L26.8174 14.6641L26.7957 14.8039C26.8454 14.4882 27.1144 14.2558 27.4335 14.2558H28.7623C31.372 14.2558 33.4154 13.1929 34.0127 10.1181C34.0305 10.0271 34.0455 9.93856 34.0589 9.85189C33.9078 9.77146 33.7442 9.7027 33.568 9.64411C33.5244 9.62959 33.4795 9.61562 33.4342 9.60206"
          fill="#22284F"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.5726 9.86737C27.6021 9.67708 27.7236 9.52165 27.8874 9.44325C27.9622 9.40731 28.0447 9.38751 28.1322 9.38751H31.682C32.1025 9.38751 32.4951 9.41518 32.8534 9.47323C32.9557 9.48964 33.0551 9.50863 33.1522 9.52992C33.2488 9.55162 33.3429 9.5759 33.4342 9.60248C33.4795 9.61605 33.5244 9.63015 33.5684 9.64412C33.7446 9.70272 33.9084 9.77202 34.0595 9.85191C34.2372 8.71545 34.058 7.94168 33.4453 7.241C32.7698 6.46953 31.5507 6.1394 29.9906 6.1394H25.4615C25.1429 6.1394 24.8711 6.37174 24.8218 6.68803L22.9354 18.6796C22.8982 18.9168 23.0807 19.1309 23.3193 19.1309H26.1153L27.5726 9.86737"
          fill="#28356A"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.0946 23.5209H9.79248C9.56648 23.5209 9.3743 23.6855 9.339 23.9093L8.00345 32.4009C7.97695 32.5686 8.10638 32.7195 8.27584 32.7195H9.85225C10.0782 32.7195 10.2704 32.555 10.3057 32.3308L10.6659 30.0404C10.7006 29.8162 10.8932 29.6516 11.1188 29.6516H12.1641C14.3393 29.6516 15.5946 28.5959 15.9226 26.5042C16.0703 25.589 15.9288 24.87 15.5014 24.3664C15.0321 23.8134 14.1997 23.5209 13.0946 23.5209ZM13.4755 26.6224C13.2949 27.8106 12.3896 27.8106 11.5143 27.8106H11.0159L11.3655 25.5914C11.3863 25.4573 11.5021 25.3585 11.6374 25.3585H11.8658C12.4621 25.3585 13.0246 25.3585 13.3152 25.6994C13.4886 25.9027 13.5416 26.2049 13.4755 26.6224Z"
          fill="#28356A"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.0496 26.5199H21.4683C21.3336 26.5199 21.2171 26.6187 21.1964 26.7528L21.1264 27.1963L21.0159 27.0356C20.6736 26.5373 19.9101 26.3707 19.1483 26.3707C17.4008 26.3707 15.9084 27.698 15.6177 29.5598C15.4666 30.4885 15.6814 31.3766 16.2068 31.9959C16.6887 32.5653 17.3782 32.8026 18.1985 32.8026C19.6065 32.8026 20.3871 31.8947 20.3871 31.8947L20.3167 32.3354C20.2902 32.5038 20.4196 32.6549 20.5881 32.6549H22.0124C22.2389 32.6549 22.4301 32.4903 22.4659 32.2661L23.3205 26.8385C23.3475 26.6714 23.2185 26.5199 23.0496 26.5199ZM20.8453 29.6064C20.6928 30.5122 19.9759 31.1204 19.0613 31.1204C18.6022 31.1204 18.2353 30.9727 17.9995 30.6929C17.7658 30.415 17.6771 30.0194 17.7513 29.5787C17.8939 28.6805 18.6229 28.0524 19.5235 28.0524C19.9725 28.0524 20.3375 28.2022 20.578 28.4843C20.8188 28.7695 20.9145 29.1676 20.8453 29.6064Z"
          fill="#28356A"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.3495 26.6556H29.7604C29.6088 26.6556 29.4664 26.7312 29.3805 26.8576L27.1888 30.095L26.2598 26.9839C26.2014 26.7892 26.0223 26.6556 25.8195 26.6556H24.2581C24.0682 26.6556 23.9365 26.8416 23.9968 27.0208L25.7471 32.1718L24.1016 34.5014C23.9722 34.6849 24.1025 34.9372 24.3261 34.9372H25.9132C26.0639 34.9372 26.2048 34.8635 26.2903 34.7397L31.5754 27.089C31.702 26.906 31.572 26.6556 31.3495 26.6556"
          fill="#28356A"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36.6469 23.5209H33.3444C33.1189 23.5209 32.9267 23.6855 32.8914 23.9093L31.5559 32.4009C31.5294 32.5686 31.6588 32.7195 31.8273 32.7195H33.5221C33.6794 32.7195 33.8141 32.6044 33.8387 32.4475L34.2178 30.0404C34.2525 29.8162 34.4453 29.6516 34.6707 29.6516H35.7156C37.8912 29.6516 39.1461 28.5959 39.4745 26.5042C39.6227 25.589 39.4803 24.87 39.0529 24.3664C38.584 23.8134 37.7521 23.5209 36.6469 23.5209ZM37.0279 26.6224C36.8478 27.8106 35.9424 27.8106 35.0666 27.8106H34.5689L34.9189 25.5914C34.9396 25.4573 35.0545 25.3585 35.1902 25.3585H35.4186C36.0144 25.3585 36.5774 25.3585 36.868 25.6994C37.0414 25.9027 37.094 26.2049 37.0279 26.6224Z"
          fill="#298FC2"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M46.5999 26.5199H45.0195C44.8839 26.5199 44.7685 26.6187 44.7482 26.7528L44.6782 27.1963L44.5671 27.0356C44.2248 26.5373 43.4619 26.3707 42.6999 26.3707C40.9526 26.3707 39.4607 27.698 39.1701 29.5598C39.0194 30.4885 39.2332 31.3766 39.7585 31.9959C40.2415 32.5653 40.9299 32.8026 41.7503 32.8026C43.1582 32.8026 43.9389 31.8947 43.9389 31.8947L43.8685 32.3354C43.842 32.5038 43.9713 32.6549 44.1408 32.6549H45.5647C45.7902 32.6549 45.9823 32.4903 46.0176 32.2661L46.8727 26.8385C46.8988 26.6714 46.7693 26.5199 46.5999 26.5199ZM44.3958 29.6064C44.2442 30.5122 43.5262 31.1204 42.6116 31.1204C42.1534 31.1204 41.7856 30.9727 41.5498 30.6929C41.3163 30.415 41.2283 30.0194 41.3016 29.5787C41.4451 28.6805 42.1732 28.0524 43.0738 28.0524C43.5228 28.0524 43.8878 28.2022 44.1283 28.4843C44.3701 28.7695 44.4657 29.1676 44.3958 29.6064Z"
          fill="#298FC2"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48.3324 23.7543L46.9771 32.4013C46.9506 32.569 47.0799 32.7199 47.2484 32.7199H48.611C48.8375 32.7199 49.0296 32.5554 49.0643 32.3312L50.4008 23.84C50.4275 23.6724 50.298 23.5209 50.1295 23.5209H48.6038C48.4691 23.5213 48.3532 23.6202 48.3324 23.7543"
          fill="#298FC2"
        ></path>
      </g>
    </svg>
  ),
  gpay: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 -11 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <rect
          x="0.5"
          y="0.5"
          width="69"
          height="47"
          rx="5.5"
          fill="white"
          stroke="#D9D9D9"
        ></rect>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.0603 31.5161V25.4741H36.1786C37.4564 25.4741 38.535 25.046 39.4142 24.2015L39.6252 23.9875C41.2313 22.2391 41.1258 19.5155 39.4142 17.898C38.5584 17.0416 37.3861 16.5778 36.1786 16.6016H31.1729V31.5161H33.0603ZM33.0605 23.6425V18.4332H36.2262C36.9063 18.4332 37.5512 18.6948 38.0319 19.1706C39.052 20.1696 39.0754 21.8347 38.0905 22.8694C37.6098 23.3809 36.9297 23.6663 36.2262 23.6425H33.0605ZM48.4293 22.1083C47.6204 21.359 46.5185 20.9784 45.1234 20.9784C43.3298 20.9784 41.9816 21.6444 41.0906 22.9646L42.7553 24.0231C43.3649 23.1192 44.1973 22.6673 45.2524 22.6673C45.9206 22.6673 46.5653 22.9171 47.0694 23.369C47.5618 23.7972 47.8432 24.4156 47.8432 25.0698V25.5098C47.1163 25.1055 46.2019 24.8914 45.0765 24.8914C43.7635 24.8914 42.7084 25.2006 41.923 25.831C41.1375 26.4613 40.739 27.2939 40.739 28.3524C40.7155 29.3158 41.1258 30.2316 41.8527 30.85C42.5912 31.5161 43.5291 31.8491 44.631 31.8491C45.9323 31.8491 46.9639 31.2663 47.7494 30.1007H47.8314V31.5161H49.6368V25.2244C49.6368 23.9042 49.2382 22.8576 48.4293 22.1083ZM43.3066 29.6369C42.9197 29.3514 42.6852 28.8876 42.6852 28.3881C42.6852 27.8291 42.9432 27.3652 43.4473 26.9965C43.9632 26.6278 44.6081 26.4375 45.3702 26.4375C46.4255 26.4256 47.2462 26.6635 47.8325 27.1392C47.8325 27.948 47.5159 28.6497 46.8945 29.2444C46.3317 29.8153 45.5696 30.1364 44.7723 30.1364C44.2446 30.1483 43.7287 29.9699 43.3066 29.6369ZM53.693 35.9999L60.0001 21.3114H57.9485L55.0295 28.6378H54.9943L52.0049 21.3114H49.9534L54.0916 30.8619L51.747 35.9999H53.693Z"
          fill="#3C4043"
        ></path>
        <path
          d="M26.544 24.1659C26.544 23.5831 26.4971 23.0003 26.4034 22.4294H18.4434V25.7239H23.0037C22.8161 26.7825 22.2065 27.734 21.3155 28.3286V30.4695H24.0353C25.6296 28.9828 26.544 26.7825 26.544 24.1659Z"
          fill="#4285F4"
        ></path>
        <path
          d="M18.4442 32.539C20.7185 32.539 22.6411 31.7778 24.0361 30.4695L21.3164 28.3287C20.5544 28.852 19.5814 29.1493 18.4442 29.1493C16.2403 29.1493 14.3763 27.6388 13.7081 25.6169H10.9062V27.8291C12.3365 30.7193 15.2555 32.539 18.4442 32.539Z"
          fill="#34A853"
        ></path>
        <path
          d="M13.708 25.6169C13.3563 24.5584 13.3563 23.4048 13.708 22.3343V20.134H10.9058C9.69808 22.5484 9.69808 25.4029 10.9058 27.8172L13.708 25.6169Z"
          fill="#FBBC04"
        ></path>
        <path
          d="M18.4442 18.8019C19.6517 18.7781 20.8123 19.242 21.6798 20.0864L24.0948 17.6363C22.559 16.1853 20.5427 15.3885 18.4442 15.4123C15.2555 15.4123 12.3365 17.2439 10.9062 20.134L13.7081 22.3462C14.3763 20.3124 16.2403 18.8019 18.4442 18.8019Z"
          fill="#EA4335"
        ></path>
      </g>
    </svg>
  ),
  visa: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 -9 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <rect
          x="0.5"
          y="0.5"
          width="57"
          height="39"
          rx="3.5"
          fill="white"
          stroke="#F3F3F3"
        ></rect>
        <path
          d="M25.7516 27.4332H21.8901L24.3054 13.4325H28.1667L25.7516 27.4332Z"
          fill="#15195A"
        ></path>
        <path
          d="M39.7499 13.7748C38.9882 13.4915 37.7802 13.1787 36.2865 13.1787C32.4731 13.1787 29.7878 15.0851 29.7713 17.8106C29.7396 19.8215 31.6939 20.9384 33.1556 21.6089C34.6495 22.2941 35.1574 22.7413 35.1574 23.352C35.1422 24.29 33.9502 24.7223 32.8384 24.7223C31.2967 24.7223 30.4707 24.4994 29.2153 23.9776L28.7069 23.7539L28.1665 26.8967C29.0722 27.2835 30.7408 27.6268 32.4731 27.6419C36.5249 27.6419 39.1627 25.765 39.1939 22.8605C39.2093 21.2667 38.1774 20.0454 35.9526 19.0475C34.602 18.4069 33.7749 17.9749 33.7749 17.3195C33.7908 16.7236 34.4745 16.1133 35.9991 16.1133C37.2544 16.0834 38.1768 16.3663 38.8755 16.6494L39.2247 16.7981L39.7499 13.7748V13.7748V13.7748Z"
          fill="#15195A"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M46.6618 13.4325H49.6486L52.7639 27.433H49.1885C49.1885 27.433 48.8386 25.8244 48.7278 25.3328H43.7699C43.6266 25.705 42.9595 27.433 42.9595 27.433H38.9078L44.6435 14.5941C45.0409 13.6855 45.7407 13.4325 46.6618 13.4325ZM46.4238 18.556C46.4238 18.556 45.2001 21.6689 44.8821 22.4732H48.0918C47.933 21.7733 47.2017 18.4219 47.2017 18.4219L46.9319 17.2156C46.8182 17.5262 46.6539 17.9533 46.543 18.2414C46.4679 18.4366 46.4173 18.568 46.4238 18.556Z"
          fill="#15195A"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.1589 13.4325H11.3716C12.2138 13.462 12.8971 13.7152 13.1194 14.6094L14.4696 21.0422C14.4697 21.0426 14.4699 21.043 14.47 21.0434L14.8832 22.9796L18.6649 13.4325H22.7481L16.6785 27.4184H12.5951L9.15337 15.253C7.96587 14.6021 6.6106 14.0786 5.09534 13.7154L5.1589 13.4325Z"
          fill="#15195A"
        ></path>
      </g>
    </svg>
  ),
  master: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 -9 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <rect
          x="0.5"
          y="0.5"
          width="57"
          height="39"
          rx="3.5"
          fill="white"
          stroke="#F3F3F3"
        ></rect>
        <path
          d="M34.3102 28.9765H23.9591V10.5122H34.3102V28.9765Z"
          fill="#FF5F00"
        ></path>
        <path
          d="M24.6223 19.7429C24.6223 15.9973 26.3891 12.6608 29.1406 10.5107C27.1285 8.93843 24.5892 7.99998 21.8294 7.99998C15.2961 7.99998 10 13.2574 10 19.7429C10 26.2283 15.2961 31.4857 21.8294 31.4857C24.5892 31.4857 27.1285 30.5473 29.1406 28.975C26.3891 26.8249 24.6223 23.4884 24.6223 19.7429"
          fill="#EB001B"
        ></path>
        <path
          d="M48.2706 19.7429C48.2706 26.2283 42.9745 31.4857 36.4412 31.4857C33.6814 31.4857 31.1421 30.5473 29.1293 28.975C31.8815 26.8249 33.6483 23.4884 33.6483 19.7429C33.6483 15.9973 31.8815 12.6608 29.1293 10.5107C31.1421 8.93843 33.6814 7.99998 36.4412 7.99998C42.9745 7.99998 48.2706 13.2574 48.2706 19.7429"
          fill="#F79E1B"
        ></path>
      </g>
    </svg>
  ),
};
