import { Palace, Room, MemoryItem, Journey } from './types.js';

/**
 * Basit in-memory storage sistemi
 * Gerçek bir uygulamada bu bir veritabanı olurdu
 */
export class MemoryPalaceStorage {
  private palaces: Map<string, Palace> = new Map();
  private rooms: Map<string, Room> = new Map();
  private memoryItems: Map<string, MemoryItem> = new Map();
  private journeys: Map<string, Journey> = new Map();

  // Palace operations
  createPalace(palace: Palace): Palace {
    this.palaces.set(palace.id, palace);
    return palace;
  }

  getPalace(id: string): Palace | undefined {
    return this.palaces.get(id);
  }

  getAllPalaces(): Palace[] {
    return Array.from(this.palaces.values());
  }

  updatePalace(id: string, updates: Partial<Palace>): Palace | undefined {
    const palace = this.palaces.get(id);
    if (!palace) return undefined;
    
    const updated = { ...palace, ...updates, updatedAt: new Date() };
    this.palaces.set(id, updated);
    return updated;
  }

  deletePalace(id: string): boolean {
    // İlgili tüm odaları, öğeleri ve yolculukları da sil
    const rooms = this.getRoomsByPalaceId(id);
    rooms.forEach(room => this.deleteRoom(room.id));
    
    const journeys = this.getJourneysByPalaceId(id);
    journeys.forEach(journey => this.deleteJourney(journey.id));
    
    return this.palaces.delete(id);
  }

  // Room operations
  createRoom(room: Room): Room {
    this.rooms.set(room.id, room);
    
    // Palace'in rooms listesini güncelle
    const palace = this.palaces.get(room.palaceId);
    if (palace) {
      palace.rooms.push(room.id);
      this.palaces.set(palace.id, palace);
    }
    
    return room;
  }

  getRoom(id: string): Room | undefined {
    return this.rooms.get(id);
  }

  getRoomsByPalaceId(palaceId: string): Room[] {
    return Array.from(this.rooms.values()).filter(room => room.palaceId === palaceId);
  }

  updateRoom(id: string, updates: Partial<Room>): Room | undefined {
    const room = this.rooms.get(id);
    if (!room) return undefined;
    
    const updated = { ...room, ...updates, updatedAt: new Date() };
    this.rooms.set(id, updated);
    return updated;
  }

  deleteRoom(id: string): boolean {
    const room = this.rooms.get(id);
    if (!room) return false;
    
    // İlgili tüm memory itemları sil
    const items = this.getMemoryItemsByRoomId(id);
    items.forEach(item => this.deleteMemoryItem(item.id));
    
    // Palace'in rooms listesinden çıkar
    const palace = this.palaces.get(room.palaceId);
    if (palace) {
      palace.rooms = palace.rooms.filter(roomId => roomId !== id);
      this.palaces.set(palace.id, palace);
    }
    
    return this.rooms.delete(id);
  }

  // Memory Item operations
  createMemoryItem(item: MemoryItem): MemoryItem {
    this.memoryItems.set(item.id, item);
    
    // Room'un items listesini güncelle
    const room = this.rooms.get(item.roomId);
    if (room) {
      room.items.push(item.id);
      this.rooms.set(room.id, room);
    }
    
    return item;
  }

  getMemoryItem(id: string): MemoryItem | undefined {
    return this.memoryItems.get(id);
  }

  getMemoryItemsByRoomId(roomId: string): MemoryItem[] {
    return Array.from(this.memoryItems.values()).filter(item => item.roomId === roomId);
  }

  updateMemoryItem(id: string, updates: Partial<MemoryItem>): MemoryItem | undefined {
    const item = this.memoryItems.get(id);
    if (!item) return undefined;
    
    const updated = { ...item, ...updates, updatedAt: new Date() };
    this.memoryItems.set(id, updated);
    return updated;
  }

  deleteMemoryItem(id: string): boolean {
    const item = this.memoryItems.get(id);
    if (!item) return false;
    
    // Room'un items listesinden çıkar
    const room = this.rooms.get(item.roomId);
    if (room) {
      room.items = room.items.filter(itemId => itemId !== id);
      this.rooms.set(room.id, room);
    }
    
    return this.memoryItems.delete(id);
  }

  // Journey operations
  createJourney(journey: Journey): Journey {
    this.journeys.set(journey.id, journey);
    return journey;
  }

  getJourney(id: string): Journey | undefined {
    return this.journeys.get(id);
  }

  getJourneysByPalaceId(palaceId: string): Journey[] {
    return Array.from(this.journeys.values()).filter(journey => journey.palaceId === palaceId);
  }

  updateJourney(id: string, updates: Partial<Journey>): Journey | undefined {
    const journey = this.journeys.get(id);
    if (!journey) return undefined;
    
    const updated = { ...journey, ...updates, updatedAt: new Date() };
    this.journeys.set(id, updated);
    return updated;
  }

  deleteJourney(id: string): boolean {
    return this.journeys.delete(id);
  }

  // Search operations
  searchMemoryItems(query: string): MemoryItem[] {
    const searchTerm = query.toLowerCase();
    return Array.from(this.memoryItems.values()).filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Statistics
  getStatistics() {
    return {
      totalPalaces: this.palaces.size,
      totalRooms: this.rooms.size,
      totalMemoryItems: this.memoryItems.size,
      totalJourneys: this.journeys.size,
      palaceBreakdown: Array.from(this.palaces.values()).map(palace => ({
        id: palace.id,
        name: palace.name,
        roomCount: this.getRoomsByPalaceId(palace.id).length,
        itemCount: this.getRoomsByPalaceId(palace.id)
          .reduce((total, room) => total + this.getMemoryItemsByRoomId(room.id).length, 0)
      }))
    };
  }
} 