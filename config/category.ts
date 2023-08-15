import { Option } from "@/types";

export const sortOptions = [
  { label: "Date: Old to new", value: "createdAt.asc" },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  { label: "Price: Low to high", value: "price.asc" },
  { label: "Price: High to low", value: "price.desc" },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
];

export const productCategories = [
  {
    title: "Graphics",
    description:
      "Explore more than 530,000 graphics to use for social media, e-commerce, cards, and webpages. These graphics sets feature apparel mockups, logos, icons, and themed graphic elements for web and print projects of all kinds.",
    slug: "graphics",
    image: "/images/skateboard-one.webp",
    subcategories: [
      {
        title: "Objects",
        description: "The board itself.",
        image: "/images/deck-one.webp",
        slug: "objects",
      },
      {
        title: "Textures",
        description: "The wheels that go on the board.",
        image: "/images/wheel-one.webp",
        slug: "textures",
      },
      {
        title: "Patterns",
        description: "The trucks that go on the board.",
        image: "/images/truck-one.webp",
        slug: "patterns",
      },
      {
        title: "Wallpapers",
        description: "The bearings that go in the wheels.",
        image: "/images/bearing-one.webp",
        slug: "wallpapers",
      },
      {
        title: "Backgrounds",
        description: "The griptape that goes on the board.",
        image: "/images/griptape-one.webp",
        slug: "backgrounds",
      },
    ],
  },
  {
    title: "E-Books",
    description: "The board itself.",
    slug: "e-books",
    image: "/images/clothing-one.webp",
    subcategories: [
      {
        title: "Fiction",
        description: "Cool and comfy tees for effortless style.",
        slug: "fiction",
      },
      {
        title: "Non-Fiction",
        description: "Cozy up in trendy hoodies.",
        slug: "non-fiction",
      },
      {
        title: "Self-Help",
        description: "Relaxed and stylish pants for everyday wear.",
        slug: "self-help",
      },
      {
        title: "Textbooks",
        description: "Stay cool with casual and comfortable shorts.",
        slug: "textbooks",
      },
      {
        title: "Lifestyle",
        description: "Top off your look with stylish and laid-back hats.",
        slug: "lifestyle",
      },
      {
        title: "History",
        description: "Top off your look with stylish and laid-back hats.",
        slug: "history",
      },
      {
        title: "Arts and Photography",
        description: "Top off your look with stylish and laid-back hats.",
        slug: "arts-and-photography",
      },
      {
        title: "Travel",
        description: "Top off your look with stylish and laid-back hats.",
        slug: "travel",
      },
    ],
  },
  {
    title: "Digital Art",
    description: "The board itself.",
    slug: "digital-art",
    image: "/images/shoe-one.webp",
    subcategories: [
      {
        title: "Stock Photos",
        description: "Rad low tops shoes for a stylish low-profile look.",
        slug: "stock-photos",
      },
      {
        title: "Illustrations",
        description: "Elevate your style with rad high top shoes.",
        slug: "illustrations",
      },
      {
        title: "Digital Paintings",
        description: "Effortless style with rad slip-on shoes.",
        slug: "digital-paintings",
      },
      {
        title: "Vector Graphics",
        description: "Performance-driven rad shoes for the pros.",
        slug: "vector-graphics",
      },
      {
        title: "Icon Packs",
        description: "Effortless style with rad slip-on shoes.",
        slug: "icon-packs",
      },
      {
        title: "Concept Art",
        description: "Conceptual artwork for various projects.",
        image: "/images/concept-art-one.webp",
        slug: "concept-art",
      },
      {
        title: "Character Design",
        description: "Digital designs of characters and creatures.",
        image: "/images/character-design-one.webp",
        slug: "character-design",
      },
    ],
  },
  {
    title: "Fonts",
    description: "The board itself.",
    slug: "fonts",
    image: "/images/fonts-category.webp",
    subcategories: [
      {
        title: "Serif",
        description: "Fonts with serifs.",
        image: "/images/serif-font-one.webp",
        slug: "serif",
      },
      {
        title: "Sans-serif",
        description: "Fonts without serifs.",
        image: "/images/sans-serif-font-one.webp",
        slug: "sans-serif",
      },
      {
        title: "Script",
        description: "Cursive and script-style fonts.",
        image: "/images/script-font-one.webp",
        slug: "script",
      },
      {
        title: "Display",
        description: "Decorative and display fonts.",
        image: "/images/display-font-one.webp",
        slug: "display",
      },
      {
        title: "Handwritten",
        description: "Fonts with a handwritten style.",
        image: "/images/handwritten-font-one.webp",
        slug: "handwritten",
      },
      {
        title: "Gothic",
        description: "Fonts with a gothic and medieval style.",
        image: "/images/gothic-font-one.webp",
        slug: "gothic",
      },
      {
        title: "Graffiti",
        description: "Fonts inspired by street graffiti.",
        image: "/images/graffiti-font-one.webp",
        slug: "graffiti",
      },
      {
        title: "Retro",
        description: "Fonts with a vintage and retro feel.",
        image: "/images/retro-font-one.webp",
        slug: "retro",
      },
    ],
  },
  {
    title: "Templates",
    description: "The board itself.",
    slug: "templates",
    image: "/images/web-templates-category.webp",
    subcategories: [
      {
        title: "Canva Templates",
        description: "Reusable React components for web development.",
        image: "/images/react-component-one.webp",
        slug: "canva-templates",
      },
      {
        title: "HTML Templates",
        description: "Pre-designed HTML website templates.",
        image: "/images/html-template-one.webp",
        slug: "html-templates",
      },
      {
        title: "WordPress Themes",
        description: "Themes for WordPress-powered websites.",
        image: "/images/wordpress-theme-one.webp",
        slug: "wordpress-themes",
      },
      {
        title: "React Components",
        description: "Reusable React components for web development.",
        image: "/images/react-component-one.webp",
        slug: "react-components",
      },
    ],
  },
  {
    title: "Photography",
    description: "The board itself.",
    slug: "photography",
    image: "/images/photography-category.webp",
    subcategories: [
      {
        title: "Landscape",
        description: "Stunning landscapes from around the world.",
        image: "/images/landscape-photo-one.webp",
        slug: "landscape",
      },
      {
        title: "Portraits",
        description: "Captivating portraits of people.",
        image: "/images/portrait-photo-one.webp",
        slug: "portraits",
      },
      {
        title: "Nature",
        description: "Beautiful photos of flora and fauna.",
        image: "/images/nature-photo-one.webp",
        slug: "nature",
      },
      {
        title: "Abstract",
        description: "Artistic and abstract photography.",
        image: "/images/abstract-photo-one.webp",
        slug: "abstract",
      },
    ],
  },
  {
    title: "Audio",
    description: "The board itself.",
    slug: "audio",
    image: "/images/audio-category.webp",
    subcategories: [
      {
        title: "Music Tracks",
        description: "Original music tracks for various projects.",
        image: "/images/music-track-one.webp",
        slug: "music-tracks",
      },
      {
        title: "Sound Effects",
        description: "High-quality sound effects for multimedia.",
        image: "/images/sound-effect-one.webp",
        slug: "sound-effects",
      },
      {
        title: "Loops",
        description: "Loopable audio clips for seamless playback.",
        image: "/images/audio-loop-one.webp",
        slug: "loops",
      },
    ],
  },
  {
    title: "Video",
    description: "The board itself.",
    slug: "video",
    image: "/images/video-category.webp",
    subcategories: [
      {
        title: "Stock Footage",
        description: "High-quality video clips for various projects.",
        image: "/images/stock-footage-one.webp",
        slug: "stock-footage",
      },
      {
        title: "Motion Graphics",
        description: "Animated graphics and visual effects.",
        image: "/images/motion-graphics-one.webp",
        slug: "motion-graphics",
      },
      {
        title: "After Effects Templates",
        description: "Pre-made templates for After Effects.",
        image: "/images/after-effects-template-one.webp",
        slug: "after-effects-templates",
      },
    ],
  },
  {
    title: "3D Assets",
    description: "The board itself.",
    slug: "3d-assets",
    image: "/images/3d-assets-category.webp",
    subcategories: [
      {
        title: "3D Models",
        description: "High-quality 3D models for various projects.",
        image: "/images/3d-model-one.webp",
        slug: "3d-models",
      },
      {
        title: "Textures",
        description: "Textures and materials for 3D rendering.",
        image: "/images/3d-texture-one.webp",
        slug: "3d-textures",
      },
      {
        title: "Animations",
        description: "Animated 3D sequences and character animations.",
        image: "/images/3d-animation-one.webp",
        slug: "3d-animations",
      },
    ],
  },
  {
    title: "Online Courses",
    description: "The board itself.",
    slug: "online-courses",
    image: "/images/backpack-one.webp",
    subcategories: [
      {
        title: "Entrepreneurship",
        description:
          "Essential tools for maintaining your skateboard, all rad.",
        slug: "entrepreneurship",
      },
      {
        title: "Marketing",
        description: "Upgrade your ride with our rad selection of bushings.",
        slug: "marketing",
      },
      {
        title: "Programming",
        description:
          "Enhance your skateboard's performance with rad shock and riser pads.",
        slug: "programming",
      },
      {
        title: "Design",
        description:
          "Add creativity and style to your tricks with our rad skate rails.",
        slug: "design",
      },
      {
        title: "Photography",
        description: "Keep your board gliding smoothly with our rad skate wax.",
        slug: "photography",
      },
      {
        title: "Music",
        description: "Keep your feet comfy and stylish with our rad socks.",
        slug: "music",
      },
      {
        title: "Language Learning",
        description: "Carry your gear in style with our rad backpacks.",
        slug: "language-learning",
      },

      {
        title: "Personal Development",
        description:
          "Enhance your skateboard's performance with rad shock and riser pads.",
        slug: "personal-development",
      },
      {
        title: "Cooking",
        description:
          "Add creativity and style to your tricks with our rad skate rails.",
        slug: "cooking",
      },
      {
        title: "Fitness",
        description: "Keep your board gliding smoothly with our rad skate wax.",
        slug: "fitness",
      },
    ],
  },
] satisfies {
  title: string;
  description: string;
  slug: string;
  image: string;
  subcategories: {
    title: string;
    description?: string;
    image?: string;
    slug: string;
  }[];
}[];

export const productTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
];

export function getCategories(): Option[] {
  const categories = productCategories.map(({ title, slug }) => ({
    label: title,
    value: slug,
  }));

  return categories;
}

export function getSubcategories(category?: string): Option[] {
  if (!category) return [];

  const subcategories =
    productCategories
      .find((c) => c.slug === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? [];

  return subcategories;
}
