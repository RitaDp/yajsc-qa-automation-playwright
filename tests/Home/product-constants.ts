export const PRODUCT_CATEGORIES = {
  HAND_TOOLS: {
    PARENT: 'Hand Tools',
    HAMMER: 'Hammer',
    HAND_SAW: 'Hand Saw',
    WRENCH: 'Wrench',
    SCREWDRIVER: 'Screwdriver',
    PLIERS: 'Pliers',
    CHISELS: 'Chisels',
    MEASURES: 'Measures',
  },
  POWER_TOOLS: {
    PARENT: 'Power Tools',
    GRINDER: 'Grinder',
    SANDER: 'Sander',
    SAW: 'Saw',
    DRILL: 'Drill',
  },
  OTHER: {
    PARENT: 'Other',
    TOOL_BELTS: 'Tool Belts',
    STORAGE: 'Storage Solutions',
    WORKBENCH: 'Workbench',
    SAFETY: 'Safety Gear',
    FASTENERS: 'Fasteners',
  }
} as const;

export const SORT_OPTIONS = {
  NAME_ASC: { option: 'Name (A - Z)', path: 'sort' },
  NAME_DESC: { option: 'Name (Z - A)', path: 'sort' },
  PRICE_ASC: { option: 'Price (Low - High)', path: 'sort' },
  PRICE_DESC: { option: 'Price (High - Low)', path: 'sort' },
} as const;