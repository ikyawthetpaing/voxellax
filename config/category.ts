import { Category, Option } from "@/types";

export function getCategory(categoryValue: string) {
  const category = categories.find(({ value }) => value === categoryValue);
  return category;
}

export function getSubcategory(
  categoryValue: string,
  subcategoryValue: string
) {
  const subcategory = categories
    .find((category) => category.value === categoryValue)
    ?.subcategories.find(
      (subcategory) => subcategory.value === subcategoryValue
    );
  return subcategory;
}

export function getCategories(): Option[] {
  return categories.map(({ label: title, value: slug }) => ({
    label: title,
    value: slug,
  }));
}

export function getSubcategories(category: string): Option[] {
  const subcategories =
    categories
      .find((c) => c.value === category)
      ?.subcategories.map((s) => ({
        label: s.label,
        value: s.value,
      })) ?? [];

  return subcategories;
}

// in currently get random picks
export function getTrendingCategories() {
  const maxCount = 6;
  const trendingCategories: { title: string; href: string }[] = [];

  // Shuffle the categories to get a random order
  const shuffledCategories = shuffleArray(categories);

  for (const category of shuffledCategories) {
    for (const subcategory of category.subcategories) {
      if (trendingCategories.length >= maxCount) {
        return trendingCategories;
      }

      trendingCategories.push({
        title: subcategory.label,
        href: `/category/${category.value}/${subcategory.value}`,
      });
    }
  }

  return trendingCategories;
}

// Helper function to shuffle an array randomly
function shuffleArray(array: Category[]) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const categories: Category[] = [
  {
    label: "Graphics",
    description:
      "Explore more than 530,000 graphics to use for social media, e-commerce, cards, and webpages. These graphics sets feature apparel mockups, logos, icons, and themed graphic elements for web and print projects of all kinds.",
    value: "graphics",
    subcategories: [
      {
        label: "Objects",
        description: "The board itself.",
        value: "objects",
      },
      {
        label: "Textures",
        description: "The wheels that go on the board.",
        value: "textures",
      },
      {
        label: "Patterns",
        description: "The trucks that go on the board.",
        value: "patterns",
      },
      {
        label: "Wallpapers",
        description: "The bearings that go in the wheels.",
        value: "wallpapers",
      },
      {
        label: "Backgrounds",
        description: "The griptape that goes on the board.",
        value: "backgrounds",
      },
    ],
  },
  {
    label: "E-Books",
    description: "The board itself.",
    value: "e-books",
    subcategories: [
      {
        label: "Fiction",
        description: "Cool and comfy tees for effortless style.",
        value: "fiction",
      },
      {
        label: "Non-Fiction",
        description: "Cozy up in trendy hoodies.",
        value: "non-fiction",
      },
      {
        label: "Self-Help",
        description: "Relaxed and stylish pants for everyday wear.",
        value: "self-help",
      },
      {
        label: "Textbooks",
        description: "Stay cool with casual and comfortable shorts.",
        value: "textbooks",
      },
      {
        label: "Lifestyle",
        description: "Top off your look with stylish and laid-back hats.",
        value: "lifestyle",
      },
      {
        label: "History",
        description: "Top off your look with stylish and laid-back hats.",
        value: "history",
      },
      {
        label: "Arts and Photography",
        description: "Top off your look with stylish and laid-back hats.",
        value: "arts-and-photography",
      },
      {
        label: "Travel",
        description: "Top off your look with stylish and laid-back hats.",
        value: "travel",
      },
    ],
  },
  {
    label: "Digital Art",
    description: "The board itself.",
    value: "digital-art",
    subcategories: [
      {
        label: "Stock Photos",
        description: "Rad low tops shoes for a stylish low-profile look.",
        value: "stock-photos",
      },
      {
        label: "Illustrations",
        description: "Elevate your style with rad high top shoes.",
        value: "illustrations",
      },
      {
        label: "Digital Paintings",
        description: "Effortless style with rad slip-on shoes.",
        value: "digital-paintings",
      },
      {
        label: "Vector Graphics",
        description: "Performance-driven rad shoes for the pros.",
        value: "vector-graphics",
      },
      {
        label: "Icon Packs",
        description: "Effortless style with rad slip-on shoes.",
        value: "icon-packs",
      },
      {
        label: "Concept Art",
        description: "Conceptual artwork for various projects.",
        value: "concept-art",
      },
      {
        label: "Character Design",
        description: "Digital designs of characters and creatures.",
        value: "character-design",
      },
    ],
  },
  {
    label: "Fonts",
    description: "The board itself.",
    value: "fonts",
    subcategories: [
      {
        label: "Serif",
        description: "Fonts with serifs.",
        value: "serif",
      },
      {
        label: "Sans-serif",
        description: "Fonts without serifs.",
        value: "sans-serif",
      },
      {
        label: "Script",
        description: "Cursive and script-style fonts.",
        value: "script",
      },
      {
        label: "Display",
        description: "Decorative and display fonts.",
        value: "display",
      },
      {
        label: "Handwritten",
        description: "Fonts with a handwritten style.",
        value: "handwritten",
      },
      {
        label: "Gothic",
        description: "Fonts with a gothic and medieval style.",
        value: "gothic",
      },
      {
        label: "Graffiti",
        description: "Fonts inspired by street graffiti.",
        value: "graffiti",
      },
      {
        label: "Retro",
        description: "Fonts with a vintage and retro feel.",
        value: "retro",
      },
    ],
  },
  {
    label: "Templates",
    description: "The board itself.",
    value: "templates",
    subcategories: [
      {
        label: "Canva Templates",
        description: "Reusable React components for web development.",
        value: "canva-templates",
      },
      {
        label: "HTML Templates",
        description: "Pre-designed HTML website templates.",
        value: "html-templates",
      },
      {
        label: "WordPress Themes",
        description: "Themes for WordPress-powered websites.",
        value: "wordpress-themes",
      },
      {
        label: "React Components",
        description: "Reusable React components for web development.",
        value: "react-components",
      },
    ],
  },
  {
    label: "Photography",
    description: "The board itself.",
    value: "photography",
    subcategories: [
      {
        label: "Landscape",
        description: "Stunning landscapes from around the world.",
        value: "landscape",
      },
      {
        label: "Portraits",
        description: "Captivating portraits of people.",
        value: "portraits",
      },
      {
        label: "Nature",
        description: "Beautiful photos of flora and fauna.",
        value: "nature",
      },
      {
        label: "Abstract",
        description: "Artistic and abstract photography.",
        value: "abstract",
      },
    ],
  },
  {
    label: "Audio",
    description: "The board itself.",
    value: "audio",
    subcategories: [
      {
        label: "Music Tracks",
        description: "Original music tracks for various projects.",
        value: "music-tracks",
      },
      {
        label: "Sound Effects",
        description: "High-quality sound effects for multimedia.",
        value: "sound-effects",
      },
      {
        label: "Loops",
        description: "Loopable audio clips for seamless playback.",
        value: "loops",
      },
    ],
  },
  {
    label: "Video",
    description: "The board itself.",
    value: "video",
    subcategories: [
      {
        label: "Stock Footage",
        description: "High-quality video clips for various projects.",
        value: "stock-footage",
      },
      {
        label: "Motion Graphics",
        description: "Animated graphics and visual effects.",
        value: "motion-graphics",
      },
      {
        label: "After Effects Templates",
        description: "Pre-made templates for After Effects.",
        value: "after-effects-templates",
      },
    ],
  },
  {
    label: "3D Assets",
    description: "The board itself.",
    value: "3d-assets",
    subcategories: [
      {
        label: "3D Models",
        description: "High-quality 3D models for various projects.",
        value: "3d-models",
      },
      {
        label: "Textures",
        description: "Textures and materials for 3D rendering.",
        value: "3d-textures",
      },
      {
        label: "Animations",
        description: "Animated 3D sequences and character animations.",
        value: "3d-animations",
      },
    ],
  },
  {
    label: "Online Courses",
    description: "The board itself.",
    value: "online-courses",
    subcategories: [
      {
        label: "Entrepreneurship",
        description:
          "Essential tools for maintaining your skateboard, all rad.",
        value: "entrepreneurship",
      },
      {
        label: "Marketing",
        description: "Upgrade your ride with our rad selection of bushings.",
        value: "marketing",
      },
      {
        label: "Programming",
        description:
          "Enhance your skateboard's performance with rad shock and riser pads.",
        value: "programming",
      },
      {
        label: "Design",
        description:
          "Add creativity and style to your tricks with our rad skate rails.",
        value: "design",
      },
      {
        label: "Photography",
        description: "Keep your board gliding smoothly with our rad skate wax.",
        value: "photography",
      },
      {
        label: "Music",
        description: "Keep your feet comfy and stylish with our rad socks.",
        value: "music",
      },
      {
        label: "Language Learning",
        description: "Carry your gear in style with our rad backpacks.",
        value: "language-learning",
      },

      {
        label: "Personal Development",
        description:
          "Enhance your skateboard's performance with rad shock and riser pads.",
        value: "personal-development",
      },
      {
        label: "Cooking",
        description:
          "Add creativity and style to your tricks with our rad skate rails.",
        value: "cooking",
      },
      {
        label: "Fitness",
        description: "Keep your board gliding smoothly with our rad skate wax.",
        value: "fitness",
      },
    ],
  },
];
