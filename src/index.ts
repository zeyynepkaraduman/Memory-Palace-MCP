#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { v4 as uuidv4 } from 'uuid';
import { MemoryPalaceStorage } from './storage.js';
import {
  Palace,
  Room,
  MemoryItem,
  Journey,
  CreatePalaceArgsSchema,
  CreateRoomArgsSchema,
  AddMemoryItemArgsSchema,
  CreateJourneyArgsSchema,
} from './types.js';

const storage = new MemoryPalaceStorage();

// Server'ı oluştur
const server = new Server(
  {
    name: 'memory-palace-mcp',
    version: '1.0.0',
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Tools listesi
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'create_palace',
        description: 'Create a new memory palace with a specific theme',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the memory palace'
            },
            description: {
              type: 'string',
              description: 'Description of the palace'
            },
            theme: {
              type: 'string',
              enum: ['ancient', 'modern', 'nature', 'space', 'underwater', 'library'],
              description: 'Visual theme of the palace'
            }
          },
          required: ['name']
        }
      },
      {
        name: 'list_palaces',
        description: 'List all memory palaces',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'create_room',
        description: 'Create a new room in a memory palace',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the room'
            },
            palaceId: {
              type: 'string',
              description: 'ID of the palace this room belongs to'
            },
            description: {
              type: 'string',
              description: 'Description of the room'
            },
            position: {
              type: 'object',
              properties: {
                x: { type: 'number', description: 'X coordinate' },
                y: { type: 'number', description: 'Y coordinate' },
                z: { type: 'number', description: 'Z coordinate (floor level)' }
              },
              required: ['x', 'y'],
              description: 'Position in the palace'
            },
            color: {
              type: 'string',
              description: 'Color of the room (hex code)'
            },
            size: {
              type: 'string',
              enum: ['small', 'medium', 'large'],
              description: 'Size of the room'
            }
          },
          required: ['name', 'palaceId', 'position']
        }
      },
      {
        name: 'add_memory_item',
        description: 'Add a memory item to a room with visual cues',
        inputSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the memory item'
            },
            content: {
              type: 'string',
              description: 'The actual content/information to remember'
            },
            roomId: {
              type: 'string',
              description: 'ID of the room where this item will be placed'
            },
            position: {
              type: 'object',
              properties: {
                x: { type: 'number', description: 'X coordinate within the room' },
                y: { type: 'number', description: 'Y coordinate within the room' },
                z: { type: 'number', description: 'Z coordinate (height)' }
              },
              required: ['x', 'y'],
              description: 'Position within the room'
            },
            visualCue: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['image', 'icon', 'color', 'shape'],
                  description: 'Type of visual cue'
                },
                value: {
                  type: 'string',
                  description: 'The visual cue value (URL, icon name, color code, or shape name)'
                },
                description: {
                  type: 'string',
                  description: 'Description of the visual cue'
                }
              },
              required: ['type', 'value'],
              description: 'Visual cue to help remember this item'
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Tags for categorization'
            },
            importance: {
              type: 'string',
              enum: ['low', 'medium', 'high', 'critical'],
              description: 'Importance level'
            }
          },
          required: ['title', 'content', 'roomId', 'position', 'visualCue']
        }
      },
      {
        name: 'create_journey',
        description: 'Create a memory journey through rooms',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the memory journey'
            },
            palaceId: {
              type: 'string',
              description: 'ID of the palace for this journey'
            },
            description: {
              type: 'string',
              description: 'Description of the journey'
            },
            roomIds: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of room IDs in the order to visit them'
            },
            difficulty: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced'],
              description: 'Difficulty level'
            }
          },
          required: ['name', 'palaceId', 'roomIds']
        }
      },
      {
        name: 'take_journey',
        description: 'Take a memory journey and review items',
        inputSchema: {
          type: 'object',
          properties: {
            journeyId: {
              type: 'string',
              description: 'ID of the journey to take'
            }
          },
          required: ['journeyId']
        }
      },
      {
        name: 'search_memories',
        description: 'Search for memory items by content or tags',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query'
            }
          },
          required: ['query']
        }
      },
      {
        name: 'get_palace_layout',
        description: 'Get detailed layout of a palace with all rooms and items',
        inputSchema: {
          type: 'object',
          properties: {
            palaceId: {
              type: 'string',
              description: 'ID of the palace'
            }
          },
          required: ['palaceId']
        }
      },
      {
        name: 'get_statistics',
        description: 'Get statistics about all memory palaces',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ]
  };
});

// Tool çağrıları
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'create_palace': {
        const parsed = CreatePalaceArgsSchema.parse(args);
        const now = new Date();
        const palace: Palace = {
          id: uuidv4(),
          name: parsed.name,
          description: parsed.description,
          theme: parsed.theme || 'ancient',
          rooms: [],
          createdAt: now,
          updatedAt: now
        };
        
        const created = storage.createPalace(palace);
        return {
          content: [
            {
              type: 'text',
              text: `🏰 Memory Palace "${created.name}" created successfully!\n\n` +
                    `ID: ${created.id}\n` +
                    `Theme: ${created.theme}\n` +
                    `Description: ${created.description || 'No description'}\n\n` +
                    `You can now create rooms in this palace using the create_room tool.`
            }
          ]
        };
      }

      case 'list_palaces': {
        const palaces = storage.getAllPalaces();
        if (palaces.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: '🏰 No memory palaces found. Create your first palace using the create_palace tool!'
              }
            ]
          };
        }

        const palaceList = palaces.map(palace => {
          const roomCount = storage.getRoomsByPalaceId(palace.id).length;
          const itemCount = storage.getRoomsByPalaceId(palace.id)
            .reduce((total, room) => total + storage.getMemoryItemsByRoomId(room.id).length, 0);
          
          return `🏰 **${palace.name}** (${palace.theme})\n` +
                 `   ID: ${palace.id}\n` +
                 `   Rooms: ${roomCount} | Items: ${itemCount}\n` +
                 `   ${palace.description || 'No description'}\n`;
        }).join('\n');

        return {
          content: [
            {
              type: 'text',
              text: `Memory Palaces:\n\n${palaceList}`
            }
          ]
        };
      }

      case 'create_room': {
        const parsed = CreateRoomArgsSchema.parse(args);
        
        // Palace var mı kontrol et
        const palace = storage.getPalace(parsed.palaceId);
        if (!palace) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Palace with ID ${parsed.palaceId} not found.`
              }
            ]
          };
        }

        const now = new Date();
        const room: Room = {
          id: uuidv4(),
          name: parsed.name,
          description: parsed.description,
          palaceId: parsed.palaceId,
          position: {
            x: parsed.position.x,
            y: parsed.position.y,
            z: parsed.position.z || 0
          },
          color: parsed.color || '#3498db',
          size: parsed.size || 'medium',
          items: [],
          connections: [],
          createdAt: now,
          updatedAt: now
        };

        const created = storage.createRoom(room);
        return {
          content: [
            {
              type: 'text',
              text: `🏠 Room "${created.name}" created in palace "${palace.name}"!\n\n` +
                    `ID: ${created.id}\n` +
                    `Position: (${created.position.x}, ${created.position.y}, ${created.position.z})\n` +
                    `Size: ${created.size}\n` +
                    `Color: ${created.color}\n\n` +
                    `You can now add memory items to this room using the add_memory_item tool.`
            }
          ]
        };
      }

      case 'add_memory_item': {
        const parsed = AddMemoryItemArgsSchema.parse(args);
        
        // Room var mı kontrol et
        const room = storage.getRoom(parsed.roomId);
        if (!room) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Room with ID ${parsed.roomId} not found.`
              }
            ]
          };
        }

        const now = new Date();
        const item: MemoryItem = {
          id: uuidv4(),
          title: parsed.title,
          content: parsed.content,
          roomId: parsed.roomId,
          position: {
            x: parsed.position.x,
            y: parsed.position.y,
            z: parsed.position.z || 0
          },
          visualCue: parsed.visualCue,
          tags: parsed.tags || [],
          importance: parsed.importance || 'medium',
          reviewCount: 0,
          createdAt: now,
          updatedAt: now
        };

        const created = storage.createMemoryItem(item);
        return {
          content: [
            {
              type: 'text',
              text: `📝 Memory item "${created.title}" added to room "${room.name}"!\n\n` +
                    `ID: ${created.id}\n` +
                    `Content: ${created.content}\n` +
                    `Position: (${created.position.x}, ${created.position.y}, ${created.position.z})\n` +
                    `Visual Cue: ${created.visualCue.type} - ${created.visualCue.value}\n` +
                    `Importance: ${created.importance}\n` +
                    `Tags: ${created.tags.join(', ') || 'None'}`
            }
          ]
        };
      }

      case 'create_journey': {
        const parsed = CreateJourneyArgsSchema.parse(args);
        
        // Palace ve rooms kontrol et
        const palace = storage.getPalace(parsed.palaceId);
        if (!palace) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Palace with ID ${parsed.palaceId} not found.`
              }
            ]
          };
        }

        // Tüm room'lar var mı kontrol et
        const rooms = parsed.roomIds.map(id => storage.getRoom(id)).filter(room => room !== undefined);
        if (rooms.length !== parsed.roomIds.length) {
          const missingIds = parsed.roomIds.filter(id => !storage.getRoom(id));
          return {
            content: [
              {
                type: 'text',
                text: `❌ Some rooms not found. Missing room IDs: ${missingIds.join(', ')}`
              }
            ]
          };
        }

        const now = new Date();
        const path = parsed.roomIds.map(roomId => {
          const items = storage.getMemoryItemsByRoomId(roomId);
          return {
            roomId,
            itemIds: items.map(item => item.id),
            duration: 30, // Default 30 seconds per room
            notes: undefined
          };
        });

        const journey: Journey = {
          id: uuidv4(),
          name: parsed.name,
          description: parsed.description,
          palaceId: parsed.palaceId,
          path,
          totalDuration: path.length * 30,
          difficulty: parsed.difficulty || 'beginner',
          createdAt: now,
          updatedAt: now
        };

        const created = storage.createJourney(journey);
        return {
          content: [
            {
              type: 'text',
              text: `🗺️ Memory journey "${created.name}" created in palace "${palace.name}"!\n\n` +
                    `ID: ${created.id}\n` +
                    `Rooms: ${created.path.length}\n` +
                    `Total Duration: ${created.totalDuration} seconds\n` +
                    `Difficulty: ${created.difficulty}\n\n` +
                    `Take this journey using the take_journey tool!`
            }
          ]
        };
      }

      case 'take_journey': {
        const { journeyId } = args as { journeyId: string };
        
        const journey = storage.getJourney(journeyId);
        if (!journey) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Journey with ID ${journeyId} not found.`
              }
            ]
          };
        }

        let journeyText = `🗺️ **Memory Journey: ${journey.name}**\n\n`;
        journeyText += `Description: ${journey.description || 'No description'}\n`;
        journeyText += `Difficulty: ${journey.difficulty}\n`;
        journeyText += `Total Duration: ${journey.totalDuration} seconds\n\n`;
        journeyText += `**Journey Path:**\n\n`;

        journey.path.forEach((step, index) => {
          const room = storage.getRoom(step.roomId);
          const items = step.itemIds.map(id => storage.getMemoryItem(id)).filter(item => item !== undefined);
          
          journeyText += `**Step ${index + 1}: ${room?.name || 'Unknown Room'}**\n`;
          journeyText += `Duration: ${step.duration} seconds\n`;
          
          if (items.length > 0) {
            journeyText += `Memory Items:\n`;
            items.forEach(item => {
              if (item) {
                journeyText += `  • ${item.title}: ${item.content}\n`;
                journeyText += `    Visual Cue: ${item.visualCue.type} - ${item.visualCue.value}\n`;
                journeyText += `    Position: (${item.position.x}, ${item.position.y})\n`;
                
                // Update review count
                storage.updateMemoryItem(item.id, { 
                  reviewCount: item.reviewCount + 1,
                  lastReviewed: new Date()
                });
              }
            });
          } else {
            journeyText += `  No memory items in this room.\n`;
          }
          journeyText += `\n`;
        });

        return {
          content: [
            {
              type: 'text',
              text: journeyText
            }
          ]
        };
      }

      case 'search_memories': {
        const { query } = args as { query: string };
        
        const results = storage.searchMemoryItems(query);
        
        if (results.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: `🔍 No memory items found for query: "${query}"`
              }
            ]
          };
        }

        let searchText = `🔍 **Search Results for "${query}"**\n\n`;
        searchText += `Found ${results.length} memory item(s):\n\n`;

        results.forEach((item, index) => {
          const room = storage.getRoom(item.roomId);
          const palace = room ? storage.getPalace(room.palaceId) : null;
          
          searchText += `**${index + 1}. ${item.title}**\n`;
          searchText += `Content: ${item.content}\n`;
          searchText += `Location: ${palace?.name || 'Unknown Palace'} → ${room?.name || 'Unknown Room'}\n`;
          searchText += `Visual Cue: ${item.visualCue.type} - ${item.visualCue.value}\n`;
          searchText += `Tags: ${item.tags.join(', ') || 'None'}\n`;
          searchText += `Importance: ${item.importance}\n`;
          searchText += `Review Count: ${item.reviewCount}\n\n`;
        });

        return {
          content: [
            {
              type: 'text',
              text: searchText
            }
          ]
        };
      }

      case 'get_palace_layout': {
        const { palaceId } = args as { palaceId: string };
        
        const palace = storage.getPalace(palaceId);
        if (!palace) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Palace with ID ${palaceId} not found.`
              }
            ]
          };
        }

        const rooms = storage.getRoomsByPalaceId(palaceId);
        
        let layoutText = `🏰 **Palace Layout: ${palace.name}**\n\n`;
        layoutText += `Theme: ${palace.theme}\n`;
        layoutText += `Description: ${palace.description || 'No description'}\n`;
        layoutText += `Total Rooms: ${rooms.length}\n\n`;

        if (rooms.length === 0) {
          layoutText += `No rooms in this palace yet. Create rooms using the create_room tool.\n`;
        } else {
          layoutText += `**Rooms:**\n\n`;
          
          rooms.forEach((room, index) => {
            const items = storage.getMemoryItemsByRoomId(room.id);
            layoutText += `**${index + 1}. ${room.name}**\n`;
            layoutText += `  Position: (${room.position.x}, ${room.position.y}, ${room.position.z})\n`;
            layoutText += `  Size: ${room.size} | Color: ${room.color}\n`;
            layoutText += `  Description: ${room.description || 'No description'}\n`;
            layoutText += `  Memory Items: ${items.length}\n`;
            
            if (items.length > 0) {
              items.forEach(item => {
                layoutText += `    • ${item.title} (${item.importance})\n`;
                layoutText += `      Content: ${item.content}\n`;
                layoutText += `      Visual: ${item.visualCue.type} - ${item.visualCue.value}\n`;
              });
            }
            layoutText += `\n`;
          });
        }

        return {
          content: [
            {
              type: 'text',
              text: layoutText
            }
          ]
        };
      }

      case 'get_statistics': {
        const stats = storage.getStatistics();
        
        let statsText = `📊 **Memory Palace Statistics**\n\n`;
        statsText += `Total Palaces: ${stats.totalPalaces}\n`;
        statsText += `Total Rooms: ${stats.totalRooms}\n`;
        statsText += `Total Memory Items: ${stats.totalMemoryItems}\n`;
        statsText += `Total Journeys: ${stats.totalJourneys}\n\n`;

        if (stats.palaceBreakdown.length > 0) {
          statsText += `**Palace Breakdown:**\n`;
          stats.palaceBreakdown.forEach(palace => {
            statsText += `• ${palace.name}: ${palace.roomCount} rooms, ${palace.itemCount} items\n`;
          });
        }

        return {
          content: [
            {
              type: 'text',
              text: statsText
            }
          ]
        };
      }

      default:
        return {
          content: [
            {
              type: 'text',
              text: `❌ Unknown tool: ${name}`
            }
          ]
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
});

// Resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'memory-palace://palaces',
        mimeType: 'application/json',
        name: 'All Memory Palaces',
        description: 'List of all memory palaces'
      },
      {
        uri: 'memory-palace://statistics',
        mimeType: 'application/json',
        name: 'Statistics',
        description: 'Memory palace statistics'
      }
    ]
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case 'memory-palace://palaces':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(storage.getAllPalaces(), null, 2)
          }
        ]
      };
    
    case 'memory-palace://statistics':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(storage.getStatistics(), null, 2)
          }
        ]
      };
    
    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

// Server'ı başlat
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Memory Palace MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
}); 