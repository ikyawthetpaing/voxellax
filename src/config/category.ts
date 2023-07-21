// import { type Product } from "@/db/schema"
import type { Option } from "@/types";
import { Product } from "@prisma/client";

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
        title: "3D Models",
        description: "Timeless style with rad classic shoes.",
        slug: "3d-models",
      },
      {
        title: "Fonts",
        description: "Rad low tops shoes for a stylish low-profile look.",
        slug: "fonts",
      },
      {
        title: "Templates",
        description: "Elevate your style with rad high top shoes.",
        slug: "templates",
      },
      {
        title: "Icon Packs",
        description: "Effortless style with rad slip-on shoes.",
        slug: "icon-packs",
      },
    ],
  },
  {
    title: "Online Courses",
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

export function getCategories() {
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
