// Café Bizarre site content (mirrors cafebizarre.com.np)

export const BRAND = {
  name: "Café Bizarre",
  parent: "Bizarre Bros.",
  fullTitle: "Bizarre Bros — Café Bizarre",
  tagline: "Serving more than just Coffee.",
  hero: "We Serve a Unique Coffee Experience, Which You Won't Find Anywhere Else.",
  microTag: "Experience Matters — Instant Coffee Ta Ghar Mai Chha Ni!",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Bizarre Coin", to: "/bizarre-coin" },
  { label: "Franchise", to: "/franchise" },
  { label: "Join Us", to: "/join-us" },
  { label: "Contact", to: "/contact" },
];

export const SOCIALS = [
  { label: "Facebook", icon: "FacebookRounded", href: "https://www.facebook.com/" },
  { label: "Instagram", icon: "Instagram", href: "https://www.instagram.com/bizarrebros_/" },
  { label: "YouTube", icon: "YouTube", href: "https://www.youtube.com/@bizarrebros." },
  { label: "LinkedIn", icon: "LinkedIn", href: "https://www.linkedin.com/in/manojbasnet/" },
];

export const CONTACT = {
  email: "admin@cafebizarre.com.np",
  emailHref: "mailto:admin@cafebizarre.com.np",
  city: "Kathmandu, Nepal",
  hours: "Mon – Sun · 7:00 AM – 9:00 PM",
};

export const ABOUT = {
  heading: "More than just Coffee.",
  intro:
    "Café Bizarre, presented by Bizarre Bros., is a place where each cup tells a story. We craft beans, brews and bites with intent — to surprise, to comfort, and to build community over a single shared table.",
  pillars: [
    {
      title: "Bean to Brew",
      body: "Hand-picked beans, freshly roasted in small batches, dialled in daily by our baristas.",
    },
    {
      title: "Made on the Spot",
      body: "Croissants, brownies, cakes and snacks baked through the day — never the night before.",
    },
    {
      title: "Local Soul",
      body: "Built in Kathmandu. Inspired by chiya stalls, espresso bars and everything in between.",
    },
  ],
};

export const COIN = {
  heading: "How Does Bizarre Coin Work?",
  intro:
    "Every order earns you Bizarre Coins. Climb tiers, unlock perks, redeem for drinks and treats. It's our way of saying — thanks for showing up.",
  tiers: [
    {
      name: "Bronze",
      color: "#cd7f32",
      perks: ["Earn 1 coin per Rs.100", "Birthday surprise", "Member-only menu peeks"],
    },
    {
      name: "Silver",
      color: "#b8b8b8",
      perks: ["Earn 2 coins per Rs.100", "Free drink every 10 visits", "Priority seating"],
    },
    {
      name: "Gold",
      color: "#d4af37",
      perks: ["Earn 3 coins per Rs.100", "Monthly free combo", "Invites to tasting nights"],
    },
  ],
};

export const FRANCHISE = {
  heading: "Open a Café Bizarre",
  body:
    "Bring the Bizarre experience to your city. We partner with operators who care about coffee, community and craft. Start with a conversation — we'll walk you through location, setup, training and supply.",
  bullets: [
    "Full barista training & SOP playbook",
    "Equipment + interior design support",
    "Centralised supply of beans & bakery",
    "Marketing, loyalty & POS systems included",
  ],
};

export const JOIN_FORM_FIELDS = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Mobile Number", type: "tel", required: true },
  { name: "role", label: "Applying For", type: "select", required: true,
    options: ["Barista", "Cashier", "Waiter", "Kitchen", "Manager", "Other"] },
  { name: "message", label: "Tell us about yourself", type: "textarea", required: false },
];
