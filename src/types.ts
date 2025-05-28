import { z } from 'zod';

// Palace (Saray) şeması
export const PalaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  theme: z.enum(['ancient', 'modern', 'nature', 'space', 'underwater', 'library']).default('ancient'),
  rooms: z.array(z.string()).default([])
});

// Room (Oda) şeması
export const RoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  palaceId: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number().default(0)
  }),
  color: z.string().default('#3498db'),
  size: z.enum(['small', 'medium', 'large']).default('medium'),
  items: z.array(z.string()).default([]),
  connections: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Memory Item (Hafıza Öğesi) şeması
export const MemoryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  roomId: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number().default(0)
  }),
  visualCue: z.object({
    type: z.enum(['image', 'icon', 'color', 'shape']),
    value: z.string(),
    description: z.string().optional()
  }),
  tags: z.array(z.string()).default([]),
  importance: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  lastReviewed: z.date().optional(),
  reviewCount: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Journey (Yolculuk) şeması
export const JourneySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  palaceId: z.string(),
  path: z.array(z.object({
    roomId: z.string(),
    itemIds: z.array(z.string()),
    duration: z.number().default(30), // saniye
    notes: z.string().optional()
  })),
  totalDuration: z.number(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Tip türleri
export type Palace = z.infer<typeof PalaceSchema>;
export type Room = z.infer<typeof RoomSchema>;
export type MemoryItem = z.infer<typeof MemoryItemSchema>;
export type Journey = z.infer<typeof JourneySchema>;

// Tool argüman şemaları
export const CreatePalaceArgsSchema = z.object({
  name: z.string().describe('The name of the memory palace'),
  description: z.string().optional().describe('Description of the palace'),
  theme: z.enum(['ancient', 'modern', 'nature', 'space', 'underwater', 'library']).optional().describe('Visual theme of the palace')
});

export const CreateRoomArgsSchema = z.object({
  name: z.string().describe('The name of the room'),
  palaceId: z.string().describe('ID of the palace this room belongs to'),
  description: z.string().optional().describe('Description of the room'),
  position: z.object({
    x: z.number().describe('X coordinate'),
    y: z.number().describe('Y coordinate'),
    z: z.number().optional().describe('Z coordinate (floor level)')
  }).describe('Position in the palace'),
  color: z.string().optional().describe('Color of the room (hex code)'),
  size: z.enum(['small', 'medium', 'large']).optional().describe('Size of the room')
});

export const AddMemoryItemArgsSchema = z.object({
  title: z.string().describe('Title of the memory item'),
  content: z.string().describe('The actual content/information to remember'),
  roomId: z.string().describe('ID of the room where this item will be placed'),
  position: z.object({
    x: z.number().describe('X coordinate within the room'),
    y: z.number().describe('Y coordinate within the room'),
    z: z.number().optional().describe('Z coordinate (height)')
  }).describe('Position within the room'),
  visualCue: z.object({
    type: z.enum(['image', 'icon', 'color', 'shape']).describe('Type of visual cue'),
    value: z.string().describe('The visual cue value (URL, icon name, color code, or shape name)'),
    description: z.string().optional().describe('Description of the visual cue')
  }).describe('Visual cue to help remember this item'),
  tags: z.array(z.string()).optional().describe('Tags for categorization'),
  importance: z.enum(['low', 'medium', 'high', 'critical']).optional().describe('Importance level')
});

export const CreateJourneyArgsSchema = z.object({
  name: z.string().describe('Name of the memory journey'),
  palaceId: z.string().describe('ID of the palace for this journey'),
  description: z.string().optional().describe('Description of the journey'),
  roomIds: z.array(z.string()).describe('Array of room IDs in the order to visit them'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional().describe('Difficulty level')
}); 