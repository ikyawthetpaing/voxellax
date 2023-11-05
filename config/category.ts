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
      "Discover an extensive collection of high-quality graphics designed for various applications, including social media, e-commerce, cards, and webpages. Our graphics sets encompass apparel mockups, logos, icons, and thematic graphic elements, suitable for a wide range of web and print projects.",
    value: "graphics",
    subcategories: [
      {
        label: "Objects",
        description:
          "Explore graphic resources that capture the essence of physical objects, perfect for enhancing visual content with lifelike representations.",
        value: "objects",
      },
      {
        label: "Textures",
        description:
          "Access a rich selection of textures for adding depth and tactile qualities to your designs, ideal for elevating your creative projects.",
        value: "textures",
      },
      {
        label: "Patterns",
        description:
          "Find diverse pattern designs to complement your projects, including those suitable for adorning various surfaces and materials.",
        value: "patterns",
      },
      {
        label: "Wallpapers",
        description:
          "Enhance your digital or physical spaces with a variety of wallpapers, offering captivating visual appeal and versatility.",
        value: "wallpapers",
      },
      {
        label: "Backgrounds",
        description:
          "Discover backgrounds that provide the perfect backdrop for your designs, ensuring a polished and professional appearance.",
        value: "backgrounds",
      },
    ],
  },
  {
    label: "E-Books",
    description:
      "Explore a vast library of digital books covering a wide range of topics and genres. From fiction to non-fiction, self-help to textbooks, our e-books offer a diverse collection to cater to your reading preferences.",
    value: "e-books",
    subcategories: [
      {
        label: "Fiction",
        description:
          "Dive into captivating fictional worlds and narratives with our extensive selection of e-books, offering cool and comfy reads for effortless enjoyment.",
        value: "fiction",
      },
      {
        label: "Non-Fiction",
        description:
          "Expand your knowledge and insights with our collection of non-fiction e-books. Cozy up with trendy hoodies as you explore a world of informative and engaging content.",
        value: "non-fiction",
      },
      {
        label: "Self-Help",
        description:
          "Empower yourself with our self-help e-books, providing relaxed and stylish guidance for everyday life, just like your favorite pants for comfort and confidence.",
        value: "self-help",
      },
      {
        label: "Textbooks",
        description:
          "Access essential educational materials with our range of textbook e-books, ensuring you stay cool and comfortable on your academic journey, much like casual shorts on a sunny day.",
        value: "textbooks",
      },
      {
        label: "Lifestyle",
        description:
          "Enhance your lifestyle with our e-books that cover various aspects of living. Top off your look with stylish and laid-back hats while exploring topics that resonate with your personal style.",
        value: "lifestyle",
      },
      {
        label: "History",
        description:
          "Uncover the past through our history e-books, delving into the rich tapestry of human events. Top off your knowledge like a stylish hat as you journey through time.",
        value: "history",
      },
      {
        label: "Arts and Photography",
        description:
          "Immerse yourself in the world of arts and photography with our e-books. Top off your creative journey with stylish hats, all while exploring the visual and artistic realms.",
        value: "arts-and-photography",
      },
      {
        label: "Travel",
        description:
          "Embark on exciting journeys through our travel e-books. Top off your wanderlust with stylish hats as you explore new destinations and cultures from the comfort of your reading nook.",
        value: "travel",
      },
    ],
  },
  {
    label: "Digital Art",
    description:
      "Immerse yourself in the world of digital creativity and artistic expression. Our digital art collection encompasses a diverse range of visual assets, from stock photos to intricate illustrations, offering a myriad of options to elevate your creative projects.",
    value: "digital-art",
    subcategories: [
      {
        label: "Stock Photos",
        description:
          "Enhance your design projects with a versatile selection of high-quality stock photos. These assets serve as the foundation for achieving a stylish and low-profile look in your creative endeavors.",
        value: "stock-photos",
      },
      {
        label: "Illustrations",
        description:
          "Elevate your visual storytelling with exquisite illustrations that capture attention and admiration. Just like rad high-top shoes, these illustrations add an element of style and uniqueness to your projects.",
        value: "illustrations",
      },
      {
        label: "Digital Paintings",
        description:
          "Effortlessly blend creativity and style with digital paintings. These art pieces, akin to rad slip-on shoes, provide a seamless and dynamic way to express your artistic vision.",
        value: "digital-paintings",
      },
      {
        label: "Vector Graphics",
        description:
          "Achieve professional-grade designs with performance-driven vector graphics, much like the choice of rad shoes for the pros. These assets offer precision and versatility for your creative work.",
        value: "vector-graphics",
      },
      {
        label: "Icon Packs",
        description:
          "Enhance your projects with icon packs that deliver a sense of style and simplicity, reminiscent of rad slip-on shoes. These icons are perfect for adding a touch of elegance to your designs.",
        value: "icon-packs",
      },
      {
        label: "Concept Art",
        description:
          "Explore conceptual artwork suitable for various creative projects. Just as concept art fuels imagination and innovation, these visuals inspire fresh ideas and artistic directions.",
        value: "concept-art",
      },
      {
        label: "Character Design",
        description:
          "Immerse yourself in the world of digital character design. Craft unique and engaging characters and creatures for your projects, offering a touch of charm and personality.",
        value: "character-design",
      },
    ],
  },
  {
    label: "Fonts",
    description:
      "Immerse yourself in the world of typography and explore a diverse collection of fonts for your design and textual needs. Our font library offers a wide range of styles, each tailored to serve a specific purpose in your creative projects.",
    value: "fonts",
    subcategories: [
      {
        label: "Serif",
        description:
          "Discover fonts with elegant serifs that exude a timeless and classic charm, ideal for conveying a sense of tradition and authority in your designs.",
        value: "serif",
      },
      {
        label: "Sans-serif",
        description:
          "Explore fonts without serifs, delivering a clean and modern aesthetic, perfect for conveying simplicity and clarity in your written content.",
        value: "sans-serif",
      },
      {
        label: "Script",
        description:
          "Embrace the artistry of cursive and script-style fonts, bringing a touch of elegance and personalization to your projects with their graceful and fluid strokes.",
        value: "script",
      },
      {
        label: "Display",
        description:
          "Add a decorative touch to your designs with an array of display fonts, known for their artistic and eye-catching appearance, enhancing the visual impact of your content.",
        value: "display",
      },
      {
        label: "Handwritten",
        description:
          "Choose from a selection of handwritten-style fonts to infuse your work with an authentic and personalized feel, as if every word was penned by hand.",
        value: "handwritten",
      },
      {
        label: "Gothic",
        description:
          "Explore fonts inspired by the aesthetics of gothic and medieval art, perfect for adding a touch of historical and darkly artistic appeal to your projects.",
        value: "gothic",
      },
      {
        label: "Graffiti",
        description:
          "Get inspired by fonts derived from the vibrant world of street graffiti, offering a bold and expressive typographic style for your creative expressions.",
        value: "graffiti",
      },
      {
        label: "Retro",
        description:
          "Recapture the charm of the past with fonts that evoke a vintage and retro ambiance, giving your designs a sense of nostalgia and timeless appeal.",
        value: "retro",
      },
    ],
  },
  {
    label: "Templates",
    description:
      "Unlock the potential of efficiency and creativity with our diverse collection of templates, designed to streamline your projects and enhance your online presence.",
    value: "templates",
    subcategories: [
      {
        label: "Canva Templates",
        description:
          "Explore a variety of pre-designed Canva templates, offering ready-to-use resources to empower your visual content creation and web development.",
        value: "canva-templates",
      },
      {
        label: "HTML Templates",
        description:
          "Elevate your web presence with pre-designed HTML website templates, providing a foundation for professional and visually engaging online experiences.",
        value: "html-templates",
      },
      {
        label: "WordPress Themes",
        description:
          "Choose from a selection of themes tailored for WordPress-powered websites, allowing you to customize and optimize your online platform with ease.",
        value: "wordpress-themes",
      },
      {
        label: "React Components",
        description:
          "Integrate efficiency into web development with reusable React components. These components are designed to enhance the functionality and aesthetics of your digital projects.",
        value: "react-components",
      },
    ],
  },
  {
    label: "Photography",
    description:
      "Embark on a visual journey through our extensive photography collection, curated to capture the essence of the world's beauty, people, and artistic expressions.",
    value: "photography",
    subcategories: [
      {
        label: "Landscape",
        description:
          "Immerse yourself in the breathtaking landscapes from around the world, each photograph offering a stunning portrayal of natural beauty and scenic wonder.",
        value: "landscape",
      },
      {
        label: "Portraits",
        description:
          "Experience the art of portraiture with captivating images of people, each portrait capturing the unique stories and emotions of individuals.",
        value: "portraits",
      },
      {
        label: "Nature",
        description:
          "Delight in the wonders of the natural world through beautiful photos of flora and fauna. These images showcase the intricate details and vibrant life found in nature.",
        value: "nature",
      },
      {
        label: "Abstract",
        description:
          "Unleash your artistic sensibilities with abstract photography. Each image is a visual masterpiece, exploring unique and creative interpretations of the world.",
        value: "abstract",
      },
    ],
  },
  {
    label: "Audio",
    description:
      "Immerse yourself in the world of audio and sound design. Our audio collection offers a diverse range of resources to enhance the auditory experience of your multimedia projects.",
    value: "audio",
    subcategories: [
      {
        label: "Music Tracks",
        description:
          "Discover a library of original music tracks that cater to a wide array of creative projects. These tracks serve as the perfect auditory accompaniment to elevate your content.",
        value: "music-tracks",
      },
      {
        label: "Sound Effects",
        description:
          "Enhance the sensory dimension of your multimedia with high-quality sound effects. These effects are meticulously crafted to complement your visuals and engage your audience.",
        value: "sound-effects",
      },
      {
        label: "Loops",
        description:
          "Experience the seamless continuity of audio with loopable audio clips. These clips are designed for uninterrupted playback, offering versatility for a variety of projects.",
        value: "loops",
      },
    ],
  },
  {
    label: "Video",
    description:
      "Step into the realm of dynamic visuals and storytelling through our extensive video collection. We offer a wide range of resources to enhance your video projects and captivate your audience.",
    value: "video",
    subcategories: [
      {
        label: "Stock Footage",
        description:
          "Explore a library of high-quality video clips designed to elevate various projects. These clips provide a wealth of visual content to enhance your creative endeavors.",
        value: "stock-footage",
      },
      {
        label: "Motion Graphics",
        description:
          "Engage your audience with the magic of animated graphics and visual effects. Our motion graphics add a dynamic dimension to your videos, ensuring a captivating and professional look.",
        value: "motion-graphics",
      },
      {
        label: "After Effects Templates",
        description:
          "Simplify your video production with pre-made templates for Adobe After Effects. These templates streamline the editing process, enabling you to achieve stunning results with ease.",
        value: "after-effects-templates",
      },
    ],
  },
  {
    label: "3D Assets",
    description:
      "Enter the world of immersive three-dimensional content creation with our comprehensive collection of 3D assets. Unleash your creativity and elevate your projects with these dynamic resources.",
    value: "3d-assets",
    subcategories: [
      {
        label: "3D Models",
        description:
          "Discover a treasury of high-quality 3D models designed to enrich various projects. These models provide the foundation for creating stunning and realistic 3D environments and objects.",
        value: "3d-models",
      },
      {
        label: "Textures",
        description:
          "Enhance the visual quality of your 3D rendering with meticulously crafted textures and materials. These assets breathe life into your 3D scenes, adding depth and realism.",
        value: "3d-textures",
      },
      {
        label: "Animations",
        description:
          "Bring your 3D creations to life with animated sequences and character animations. These dynamic elements infuse motion and storytelling into your 3D projects.",
        value: "3d-animations",
      },
    ],
  },
  {
    label: "Online Courses",
    description:
      "Embark on a journey of online learning with our diverse range of courses, designed to empower you with valuable knowledge and skills to enhance various aspects of your life.",
    value: "online-courses",
    subcategories: [
      {
        label: "Entrepreneurship",
        description:
          "Equip yourself with essential tools for building and growing your entrepreneurial ventures, all in a format that's as rad as maintaining your skateboard.",
        value: "entrepreneurship",
      },
      {
        label: "Marketing",
        description:
          "Enhance your marketing prowess with our selection of courses that are as rad as upgrading your ride with top-quality bushings.",
        value: "marketing",
      },
      {
        label: "Programming",
        description:
          "Level up your technical skills with programming courses that are as rad as optimizing your skateboard's performance with shock and riser pads.",
        value: "programming",
      },
      {
        label: "Design",
        description:
          "Foster creativity and style with design courses that are as rad as adding flair to your skate tricks using skate rails.",
        value: "design",
      },
      {
        label: "Photography",
        description:
          "Capture moments with finesse through photography courses that are as rad as ensuring your board glides smoothly with high-quality skate wax.",
        value: "photography",
      },
      {
        label: "Music",
        description:
          "Step into the world of music with courses as rad as keeping your feet comfy and stylish with our selection of socks.",
        value: "music",
      },
      {
        label: "Language Learning",
        description:
          "Master new languages and communicate with ease through language learning courses, just as you carry your gear in style with our rad backpacks.",
        value: "language-learning",
      },
      {
        label: "Personal Development",
        description:
          "Boost your personal development with courses as rad as enhancing your skateboard's performance with shock and riser pads.",
        value: "personal-development",
      },
      {
        label: "Cooking",
        description:
          "Cultivate culinary skills and creativity with cooking courses as rad as adding style and flair to your skate tricks using skate rails.",
        value: "cooking",
      },
      {
        label: "Fitness",
        description:
          "Elevate your fitness journey with courses as rad as ensuring your board glides smoothly with high-quality skate wax.",
        value: "fitness",
      },
    ],
  },
];
