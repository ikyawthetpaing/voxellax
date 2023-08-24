import { Option } from "@/types";

export function getCategory(categorySlug: string) {
  const category = categories.find(({ slug }) => slug === categorySlug);
  return category;
}

export function getSubcategory(categorySlug: string, subcategorySlug: string) {
  const subcategory = categories
    .find((category) => category.slug === categorySlug)
    ?.subcategories.find((subcategory) => subcategory.slug === subcategorySlug);
  return subcategory;
}

export function getCategories(): Option[] {
  return categories.map(({ title, slug }) => ({
    label: title,
    value: slug,
  }));
}

export function getSubcategories(category?: string): Option[] {
  if (!category) return [];

  const subcategories =
    categories
      .find((c) => c.slug === category)
      ?.subcategories.map((s) => ({
        label: s.title,
        value: s.slug,
      })) ?? [];

  return subcategories;
}

type Category = {
  title: string;
  description: string;
  slug: string;
  subcategories: {
    title: string;
    description?: string;
    slug: string;
  }[];
};

export const categories: Category[] = [
  {
    title: "Graphics",
    description:
      "Explore more than 530,000 graphics to use for social media, e-commerce, cards, and webpages. These graphics sets feature apparel mockups, logos, icons, and themed graphic elements for web and print projects of all kinds.",
    slug: "graphics",
    subcategories: [
      {
        title: "Objects",
        description: "The board itself.",
        slug: "objects",
      },
      {
        title: "Textures",
        description: "The wheels that go on the board.",
        slug: "textures",
      },
      {
        title: "Patterns",
        description: "The trucks that go on the board.",
        slug: "patterns",
      },
      {
        title: "Wallpapers",
        description: "The bearings that go in the wheels.",
        slug: "wallpapers",
      },
      {
        title: "Backgrounds",
        description: "The griptape that goes on the board.",
        slug: "backgrounds",
      },
    ],
  },
  {
    title: "E-Books",
    description: "The board itself.",
    slug: "e-books",
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
        slug: "concept-art",
      },
      {
        title: "Character Design",
        description: "Digital designs of characters and creatures.",
        slug: "character-design",
      },
    ],
  },
  {
    title: "Fonts",
    description: "The board itself.",
    slug: "fonts",
    subcategories: [
      {
        title: "Serif",
        description: "Fonts with serifs.",
        slug: "serif",
      },
      {
        title: "Sans-serif",
        description: "Fonts without serifs.",
        slug: "sans-serif",
      },
      {
        title: "Script",
        description: "Cursive and script-style fonts.",
        slug: "script",
      },
      {
        title: "Display",
        description: "Decorative and display fonts.",
        slug: "display",
      },
      {
        title: "Handwritten",
        description: "Fonts with a handwritten style.",
        slug: "handwritten",
      },
      {
        title: "Gothic",
        description: "Fonts with a gothic and medieval style.",
        slug: "gothic",
      },
      {
        title: "Graffiti",
        description: "Fonts inspired by street graffiti.",
        slug: "graffiti",
      },
      {
        title: "Retro",
        description: "Fonts with a vintage and retro feel.",
        slug: "retro",
      },
    ],
  },
  {
    title: "Templates",
    description: "The board itself.",
    slug: "templates",
    subcategories: [
      {
        title: "Canva Templates",
        description: "Reusable React components for web development.",
        slug: "canva-templates",
      },
      {
        title: "HTML Templates",
        description: "Pre-designed HTML website templates.",
        slug: "html-templates",
      },
      {
        title: "WordPress Themes",
        description: "Themes for WordPress-powered websites.",
        slug: "wordpress-themes",
      },
      {
        title: "React Components",
        description: "Reusable React components for web development.",
        slug: "react-components",
      },
    ],
  },
  {
    title: "Photography",
    description: "The board itself.",
    slug: "photography",
    subcategories: [
      {
        title: "Landscape",
        description: "Stunning landscapes from around the world.",
        slug: "landscape",
      },
      {
        title: "Portraits",
        description: "Captivating portraits of people.",
        slug: "portraits",
      },
      {
        title: "Nature",
        description: "Beautiful photos of flora and fauna.",
        slug: "nature",
      },
      {
        title: "Abstract",
        description: "Artistic and abstract photography.",
        slug: "abstract",
      },
    ],
  },
  {
    title: "Audio",
    description: "The board itself.",
    slug: "audio",
    subcategories: [
      {
        title: "Music Tracks",
        description: "Original music tracks for various projects.",
        slug: "music-tracks",
      },
      {
        title: "Sound Effects",
        description: "High-quality sound effects for multimedia.",
        slug: "sound-effects",
      },
      {
        title: "Loops",
        description: "Loopable audio clips for seamless playback.",
        slug: "loops",
      },
    ],
  },
  {
    title: "Video",
    description: "The board itself.",
    slug: "video",
    subcategories: [
      {
        title: "Stock Footage",
        description: "High-quality video clips for various projects.",
        slug: "stock-footage",
      },
      {
        title: "Motion Graphics",
        description: "Animated graphics and visual effects.",
        slug: "motion-graphics",
      },
      {
        title: "After Effects Templates",
        description: "Pre-made templates for After Effects.",
        slug: "after-effects-templates",
      },
    ],
  },
  {
    title: "3D Assets",
    description: "The board itself.",
    slug: "3d-assets",
    subcategories: [
      {
        title: "3D Models",
        description: "High-quality 3D models for various projects.",
        slug: "3d-models",
      },
      {
        title: "Textures",
        description: "Textures and materials for 3D rendering.",
        slug: "3d-textures",
      },
      {
        title: "Animations",
        description: "Animated 3D sequences and character animations.",
        slug: "3d-animations",
      },
    ],
  },
  {
    title: "Online Courses",
    description: "The board itself.",
    slug: "online-courses",
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
];

// export const productTags = [
//   "new",
//   "sale",
//   "bestseller",
//   "featured",
//   "popular",
//   "trending",
//   "limited",
//   "exclusive",
// ];

// export const sortOptions = [
//   { label: "Date: Old to new", value: "createdAt.asc" },
//   {
//     label: "Date: New to old",
//     value: "createdAt.desc",
//   },
//   { label: "Price: Low to high", value: "price.asc" },
//   { label: "Price: High to low", value: "price.desc" },
//   {
//     label: "Alphabetical: A to Z",
//     value: "name.asc",
//   },
//   {
//     label: "Alphabetical: Z to A",
//     value: "name.desc",
//   },
// ];
