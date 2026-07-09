'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  X,
  Phone,
  Wifi,
  Tv,
  Check,
  Building,
  Clock,
  Car,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ChevronRight,
  MessageCircle,
  Instagram,
} from 'lucide-react';

// ============================================================================
// DATA STRUCTURES
// ============================================================================

interface RoomItem {
  id: string;
  name: string;
  isAC: boolean;
  beds: string;
  capacity: string;
  basePrice: number;
  gst: number;
  totalPrice: number;
  description: string;
  image: string;
}

interface VenueItem {
  id: string;
  name: string;
  price: number;
  description: string;
  capacity?: string;
  details?: string;
  image: string;
}

interface DecorItem {
  id: string;
  name: string;
  description: string;
  details?: string;
  image: string;
}

interface CartItem {
  id: string;
  name: string;
  category: 'room' | 'venue' | 'decor';
  price: number; // 0 for items with separate charges
  quantity: number;
  image: string;
}

const ROOMS_DATA: RoomItem[] = [
  {
    id: 'double-non-ac',
    name: 'Double Bed Room (Non-AC)',
    isAC: false,
    beds: '2 Beds',
    capacity: '2 Adults',
    basePrice: 1250,
    gst: 62,
    totalPrice: 1312,
    description: 'Comfortable lodge room containing exactly 2 beds, attached clean bathroom, LED TV, and wardrobe.',
    image: '/room1.png',
  },
  {
    id: 'double-ac',
    name: 'Double Bed Room (A/C)',
    isAC: true,
    beds: '2 Beds',
    capacity: '2 Adults',
    basePrice: 1700,
    gst: 85,
    totalPrice: 1785,
    description: 'Air-conditioned double bedroom with exactly 2 beds, modern interiors, and clean tiles.',
    image: '/room2.png',
  },
  {
    id: 'triple-non-ac',
    name: 'Triple Bed Room (Non-AC)',
    isAC: false,
    beds: '3 Beds',
    capacity: '3 Adults',
    basePrice: 1550,
    gst: 77,
    totalPrice: 1627,
    description: 'Spacious guest room featuring exactly 3 beds, attached neat bathroom, and ventilation.',
    image: '/room3.jpg',
  },
  {
    id: 'triple-ac',
    name: 'Triple Bed Room (A/C)',
    isAC: true,
    beds: '3 Beds',
    capacity: '3 Adults',
    basePrice: 1950,
    gst: 97,
    totalPrice: 2047,
    description: 'Air-conditioned guest room featuring exactly 3 beds, ideal for families.',
    image: '/room3.jpg',
  },
  {
    id: 'four-bed-non-ac',
    name: 'Four Bed Room (Non-AC)',
    isAC: false,
    beds: '4 Beds / 2 Double Beds',
    capacity: '4 Adults',
    basePrice: 1800,
    gst: 90,
    totalPrice: 1890,
    description: 'Large family bedroom with 2 double beds (4 beds total), clean sheets, and ample space.',
    image: '/room1.png',
  },
  {
    id: 'six-bed-non-ac',
    name: 'Six Bed Room (Non-AC)',
    isAC: false,
    beds: '6 Beds / 3 Double Beds',
    capacity: '6 Adults',
    basePrice: 2150,
    gst: 107,
    totalPrice: 2257,
    description: 'Extra-large lodging room containing 3 double beds (6 beds total), perfect for wedding guests.',
    image: '/room3.jpg',
  },
];

const VENUES_DATA: VenueItem[] = [
  {
    id: 'function-hall',
    name: 'Vaibhava Grand Function Hall',
    price: 20000,
    description: 'Grand function space with wedding stage layout. Includes Fan Ventilation. Air Cooler available inside the hall (charges apply).',
    capacity: '200 to 250 Guests',
    details: 'Equipped with main stage lighting and large guest seating hall.',
    image: '/exterior.jpg',
  },
  {
    id: 'dining-hall',
    name: 'Spacious Dining Hall',
    price: 5000,
    description: 'Large dining room adjacent to the function hall, structured for smooth guest catering services.',
    capacity: '100+ Seating Capacity',
    details: 'Includes clean serving counters, washbasins, and dining tables.',
    image: '/dining_indoor.jpg',
  },
  {
    id: 'kitchen-hall',
    name: 'Catering Kitchen Room',
    price: 5000,
    description: 'Commercial cooking area designed for large-scale wedding cooking and professional catering teams.',
    capacity: 'Heavy Cooking Setup',
    details: 'Equipped with gas pipeline layout, storage racks, and food prep areas.',
    image: '/kitchen.jpg',
  },
];

const DECOR_DATA: DecorItem[] = [
  {
    id: 'stage-decor',
    name: 'Event Stage Design & Decoration',
    description: 'Custom traditional naming ceremony cradle setups, wedding backdrops, flower arches, and draping (as shown in our real cradle stage photo).',
    details: 'Separate charges apply based on stage theme selection.',
    image: '/stage_decor.jpg',
  },
  {
    id: 'chair-covers',
    name: 'Wedding Chair Covers',
    description: 'Banquet chairs covered in neat stretch fabric covers with satin ribbons, marigolds, and traditional Indian wedding accents.',
    details: 'Separate charges apply per chair cover requested.',
    image: '/chair_cover.jpg',
  },
];

// Album contains ONLY real photos, no AI placeholders
const ALBUM_IMAGES = [
  { src: '/exterior.jpg', title: 'Lodge & Convention Hall Facade' },
  { src: '/stage_decor.jpg', title: 'Event Stage Design & Decoration' },
  { src: '/room1.png', title: 'Real Double Bed Room' },
  { src: '/room2.png', title: 'AC Double Bed Room' },
  { src: '/room3.jpg', title: 'Real Triple Bed Room' },
  { src: '/room6.jpg', title: 'Real Six Bed Room' },
  { src: '/dining_indoor.jpg', title: 'Spacious Indoor Dining Hall' },
  { src: '/dining_outdoor.jpg', title: 'Outdoor Dining Lawn Area' },
  { src: '/kitchen.jpg', title: 'Commercial Catering Kitchen' },
  { src: '/tariff.png', title: 'Official Lodge Tariff Card' },
  { src: '/vaibhavGrand.jpeg', title: 'Hotel Reception Lounge' },
  { src: '/vaibhavGrand2.jpeg', title: 'Lodge Entrance and Lobby' },
];

const AGENTS = [
  { name: 'Deekshith', role: 'Manager (Primary)', phone: '8792125788', isPrimary: true },
  { name: 'G.K. Manjunatha', role: 'Owner (Alternate)', phone: '8722559402', isPrimary: false },
];

export default function HotelBookingApp() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Booking Form Details
  const [guestName, setGuestName] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);

  // Gallery lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState('');

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('vaibhava_grand_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('vaibhava_grand_cart', JSON.stringify(newCart));
  };

  // Add Room to Cart
  const addRoomToCart = (room: RoomItem) => {
    const existing = cart.find(i => i.id === room.id);
    let newCart: CartItem[] = [];
    if (existing) {
      newCart = cart.map(i => i.id === room.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      newCart = [...cart, { id: room.id, name: room.name, category: 'room', price: room.totalPrice, quantity: 1, image: room.image }];
    }
    saveCart(newCart);
    triggerNotification(`Added "${room.name}" to cart 🛒`);
  };

  // Add Venue to Cart
  const addVenueToCart = (venue: VenueItem) => {
    const existing = cart.find(i => i.id === venue.id);
    let newCart: CartItem[] = [];
    if (existing) {
      newCart = cart.map(i => i.id === venue.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      newCart = [...cart, { id: venue.id, name: venue.name, category: 'venue', price: venue.price, quantity: 1, image: venue.image }];
    }
    saveCart(newCart);
    triggerNotification(`Added "${venue.name}" to cart 🛒`);
  };

  // Add Decor to Cart (Separate Charges apply, price initialized to 0)
  const addDecorToCart = (decor: DecorItem) => {
    const existing = cart.find(i => i.id === decor.id);
    let newCart: CartItem[] = [];
    if (existing) {
      const increment = decor.id === 'chair-covers' ? 50 : 1;
      newCart = cart.map(i => i.id === decor.id ? { ...i, quantity: i.quantity + increment } : i);
    } else {
      const initialQty = decor.id === 'chair-covers' ? 100 : 1;
      newCart = [...cart, { id: decor.id, name: decor.name, category: 'decor', price: 0, quantity: initialQty, image: decor.image }];
    }
    saveCart(newCart);
    triggerNotification(`Added "${decor.name}" to cart 🛒`);
  };

  // Decrease Qty
  const decreaseQty = (itemId: string) => {
    const target = cart.find(i => i.id === itemId);
    if (!target) return;
    const decrement = itemId === 'chair-covers' ? 50 : 1;

    let newCart: CartItem[] = [];
    if (target.quantity <= decrement) {
      newCart = cart.filter(i => i.id !== itemId);
    } else {
      newCart = cart.map(i => i.id === itemId ? { ...i, quantity: i.quantity - decrement } : i);
    }
    saveCart(newCart);
  };

  // Increase Qty
  const increaseQty = (itemId: string) => {
    const increment = itemId === 'chair-covers' ? 50 : 1;
    const newCart = cart.map(i => i.id === itemId ? { ...i, quantity: i.quantity + increment } : i);
    saveCart(newCart);
  };

  // Remove Item
  const removeItem = (itemId: string) => {
    const newCart = cart.filter(i => i.id !== itemId);
    saveCart(newCart);
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Get stay duration in days (defaulting to 1 if not selected or invalid)
  const getBookingDays = () => {
    if (!checkInDate || !checkOutDate) return 1;
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    
    // Set hours to midnight to compare date diffs only
    inDate.setHours(0, 0, 0, 0);
    outDate.setHours(0, 0, 0, 0);
    
    const diffTime = outDate.getTime() - inDate.getTime();
    if (diffTime < 0) return 1;
    if (diffTime === 0) return 1;
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  // Calculate Total (only counts items with price > 0, decor is separate charges)
  const calculateTotal = () => {
    const days = getBookingDays();
    return cart.reduce((total, i) => total + (i.price * i.quantity * days), 0);
  };

  // Form check-in/out formatted helper
  const formatDateStr = (dateStr: string) => {
    if (!dateStr) return 'Not selected';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Generate Message Payload for Cart Checkout
  const getWhatsAppMessage = () => {
    let itemLines = '';
    const days = getBookingDays();
    cart.forEach((i, idx) => {
      if (i.category === 'decor') {
        itemLines += `${idx + 1}. *${i.name}* (Qty: ${i.quantity}) - _Separate Charges_\n`;
      } else {
        itemLines += `${idx + 1}. *${i.name}* (Qty: ${i.quantity}) - ₹${i.price * i.quantity} per day (Total for ${days} ${days === 1 ? 'day' : 'days'}: ₹${i.price * i.quantity * days})\n`;
      }
    });

    return `Hello Hotel Vaibhava Grand! I would like to book the following items:

👤 *Guest Name:* ${guestName || 'Not specified'}
📅 *Check-In:* ${formatDateStr(checkInDate)}
📅 *Check-Out:* ${formatDateStr(checkOutDate)}
📆 *Total Stay:* ${days} ${days === 1 ? 'day' : 'days'}

🛍️ *Booking Items:*
${itemLines}
💰 *Total Estimated Price:* ₹${calculateTotal()} (plus separate charges for decor if selected)

Please confirm availability and booking terms. Thank you!`;
  };

  // Direct WhatsApp Book link for single room card
  const getDirectRoomBookingLink = (roomName: string, price: number) => {
    const message = `Hello Hotel Vaibhava Grand! I want to book a room directly:
🏨 *Room Category:* ${roomName}
💰 *Total Price:* ₹${price}/day
👤 *My Name:* [Please enter your name]
📅 *Preferred Dates:* [Please enter check-in / check-out dates]

Please let me know room availability. Thank you!`;
    return `https://wa.me/918792125788?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-800 font-sans pb-16 antialiased">
      
      {/* 1. TOP HEADER BAR */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-black text-lg shadow-glow-teal">V</div>
            <span className="font-extrabold text-gray-900 tracking-tight text-base sm:text-lg">Hotel Vaibhava Grand</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/vaibhavgrand?igsh=aWZxc3VzMTAwZjNw"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-slate-100 rounded-xl text-rose-600 transition"
              title="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            
            <button
              onClick={() => setCartOpen(true)}
              className="relative px-3.5 py-2 bg-slate-900 text-white font-bold rounded-xl flex items-center gap-1.5 hover:bg-slate-800 transition active:scale-95 text-xs shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart 🛒</span>
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full text-[9px] w-5 h-5 flex items-center justify-center font-black animate-scaleIn">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* NOTIFICATION TOAST */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-teal-300 font-bold px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2 border border-teal-500/20 text-xs"
          >
            <CheckCircle className="w-4 h-4 text-teal-400" />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO BANNER */}
      <div className="relative bg-slate-950 text-white py-16 px-6 border-b border-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: "url('/exterior.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-300 text-xs font-bold uppercase tracking-widest">
            <Building className="w-3.5 h-3.5" />
            Boarding, Lodging & Function Spaces
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Vaibhav Grand
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            Classic function and dining spaces for up to 250 guests in Chitradurga. 
            Function Hall: ₹20,000 | Dining Hall: ₹5,000 | Kitchen: ₹5,000. 
            Build your package below, add rooms or venue spaces, customize stage décor, and checkout easily on WhatsApp.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs">
            <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur-md">
              <Car className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-slate-200">Free Parking Available</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur-md">
              <Clock className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-slate-200">24-Hour Hot Water</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur-md">
              <Wifi className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-slate-200">Generator Power Backup</span>
            </div>
          </div>
        </div>
      </div>

      {/* CORE CATALOG PORTAL */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CATALOG */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* SECTION 1: LODGE ROOMS (TOP) */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block">LODGING SUITES</span>
              <h2 className="text-2xl font-black text-gray-900">Rooms & Accommodations</h2>
              <p className="text-xs text-slate-500 mt-1">Available rooms at Hotel Vaibhava Grand. Booking a room directly sends a query to Manager Deekshith on WhatsApp.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ROOMS_DATA.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      onClick={() => {
                        setLightboxImage(room.image);
                        setLightboxOpen(true);
                      }}
                      className="w-full h-full object-cover group-hover:scale-103 transition duration-300 cursor-zoom-in"
                    />
                    <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider ${
                      room.isAC ? 'bg-teal-400 text-slate-950' : 'bg-slate-800 text-white'
                    }`}>
                      {room.isAC ? 'A/C' : 'Non-A/C'}
                    </span>
                    <span className="absolute bottom-4 left-4 text-white text-[10px] font-bold bg-slate-950/60 px-3 py-1 backdrop-blur-md rounded-lg">
                      {room.beds}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-teal-600 transition">
                        {room.name}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-teal-500" />
                        Capacity: {room.capacity} ({room.beds})
                      </p>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {room.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-end justify-between gap-4">
                      <div>
                        <span className="text-[9px] text-slate-400 block">Total Price (GST Incl.)</span>
                        <span className="text-xl font-black text-gray-900">₹{room.totalPrice}</span>
                        <span className="text-xs text-slate-400">/day</span>
                      </div>

                      <div className="flex flex-col gap-2 w-1/2">
                        {/* Add to Package Cart */}
                        <button
                          onClick={() => addRoomToCart(room)}
                          className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[10px] transition active:scale-95 text-center"
                        >
                          Add to Cart 🛒
                        </button>
                        
                        {/* Book Directly on WhatsApp */}
                        <a
                          href={getDirectRoomBookingLink(room.name, room.totalPrice)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold rounded-xl text-[10px] transition active:scale-95 text-center flex items-center justify-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          Book Directly
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: VENUES (MIDDLE) */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block">EVENT VENUES</span>
              <h2 className="text-2xl font-black text-gray-900">Function spaces & Catering halls</h2>
              <p className="text-xs text-slate-500 mt-1">Book spaces for marriages, receptions, dining, or cooking configurations.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VENUES_DATA.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      onClick={() => {
                        setLightboxImage(venue.image);
                        setLightboxOpen(true);
                      }}
                      className="w-full h-full object-cover group-hover:scale-103 transition duration-300 cursor-zoom-in"
                    />
                    {venue.capacity && (
                      <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-lg">
                        {venue.capacity}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-teal-600 transition">
                        {venue.name}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {venue.description}
                      </p>
                      {venue.details && (
                        <p className="text-[10px] text-slate-400 italic">
                          * {venue.details}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 block">Venue Cost</span>
                        <span className="text-xl font-black text-gray-900">₹{venue.price}</span>
                        <span className="text-xs text-slate-400">/day</span>
                      </div>

                      <button
                        onClick={() => addVenueToCart(venue)}
                        className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition active:scale-95 shadow-sm"
                      >
                        Add to Cart 🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: EVENT DECORATIONS */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block">EVENT SERVICES</span>
              <h2 className="text-2xl font-black text-gray-900">Decor & Chair Extras</h2>
              <p className="text-xs text-slate-500 mt-1">Additional services to prepare the halls for celebrations. Mapped with separate charges.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {DECOR_DATA.map((decor) => (
                <div
                  key={decor.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={decor.image}
                      alt={decor.name}
                      onClick={() => {
                        setLightboxImage(decor.image);
                        setLightboxOpen(true);
                      }}
                      className="w-full h-full object-cover group-hover:scale-103 transition duration-300 cursor-zoom-in"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-teal-600 transition">
                        {decor.name}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {decor.description}
                      </p>
                      <p className="text-[10px] text-teal-600 font-bold bg-teal-50 px-2.5 py-1.5 rounded-lg inline-block">
                        Separate Additional Charges
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium italic">Rates calculated on WhatsApp</span>
                      <button
                        onClick={() => addDecorToCart(decor)}
                        className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition active:scale-95"
                      >
                        Add to Cart 🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: VISUAL ALBUM (LAST) */}
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block">PHOTO GALLERY</span>
              <h2 className="text-2xl font-black text-gray-900">Original Lodge & Convention Hall Album</h2>
              <p className="text-xs text-slate-500 mt-1">Explore real photos of Hotel Vaibhava Grand lobby, exterior facade, tariff sheet, and corridors.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {ALBUM_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxImage(img.src);
                    setLightboxOpen(true);
                  }}
                  className="group relative h-36 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md border border-slate-200 transition-all"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 flex items-end p-3 transition duration-200">
                    <span className="text-[10px] text-white font-bold truncate w-full">{img.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: STICKY PACKAGE CART */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 space-y-6">
            
            {/* CART CONTAINER */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-teal-500" />
                  <h3 className="font-extrabold text-slate-900 text-lg">My Cart</h3>
                </div>
                <span className="bg-teal-50 text-teal-600 px-2.5 py-0.5 rounded-lg text-xs font-bold">
                  {cart.length} Selected
                </span>
              </div>

              {/* Cart List */}
              {cart.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto stroke-[1.5]" />
                  <p className="text-xs font-medium">Your package cart is empty.</p>
                  <p className="text-[11px] leading-relaxed">Select rooms, function hall spaces, or chair covers to create your dynamic booking query.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {cart.map((i) => (
                    <div
                      key={i.id}
                      className="flex gap-3 items-center justify-between p-2 bg-slate-50 rounded-2xl border border-slate-100 text-xs"
                    >
                      <div className="w-10 h-10 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-950 truncate leading-snug">{i.name}</h4>
                        <span className="text-[10px] text-gray-500 block">
                          {i.price === 0 ? 'Separate charges' : `₹${i.price} x ${i.quantity} x ${getBookingDays()} ${getBookingDays() === 1 ? 'day' : 'days'}`}
                        </span>
                        {i.price > 0 && (
                          <span className="text-[9px] font-black text-teal-600 block">
                            Subtotal: ₹{i.price * i.quantity * getBookingDays()}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => decreaseQty(i.id)}
                          className="p-1 bg-white border border-slate-200 rounded-md text-gray-600 hover:bg-slate-100"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-bold w-4 text-center text-[10px]">{i.quantity}</span>
                        <button
                          onClick={() => increaseQty(i.id)}
                          className="p-1 bg-white border border-slate-200 rounded-md text-gray-600 hover:bg-slate-100"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                        <button
                          onClick={() => removeItem(i.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Form & WhatsApp Redirect Link */}
              {cart.length > 0 && (
                <div className="border-t border-slate-100 pt-4 mt-4 space-y-4">
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition bg-white"
                    />
                  </div>

                  {/* Stay Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Check-In</label>
                      <input
                        type="date"
                        required
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Check-Out</label>
                      <input
                        type="date"
                        required
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition bg-white"
                      />
                    </div>
                  </div>

                  {/* Agent Priority Selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Send inquiry to:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {AGENTS.map((agent) => (
                        <button
                          type="button"
                          key={agent.phone}
                          onClick={() => setSelectedAgent(agent)}
                          className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                            selectedAgent.phone === agent.phone
                              ? 'border-teal-400 bg-teal-50/20 text-teal-950 font-bold'
                              : 'border-gray-200 text-gray-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-[10px] block">{agent.name}</span>
                          <span className="text-[8px] text-gray-400 font-normal">{agent.role}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Calculation details */}
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Total</span>
                      <span className="text-[8px] text-slate-400">Excludes decor / covers charge</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-gray-900">₹{calculateTotal()}</span>
                    </div>
                  </div>

                  {/* Anchor link direct redirection to bypass popup blockers */}
                  <a
                    href={`https://wa.me/91${selectedAgent.phone}?text=${encodeURIComponent(getWhatsAppMessage())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold rounded-xl shadow-lg transition active:scale-98 text-xs text-center"
                    onClick={(e) => {
                      if (!guestName || !checkInDate || !checkOutDate) {
                        e.preventDefault();
                        alert('Please fill out your Name and Stay Dates before checking out!');
                      }
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Checkout on WhatsApp
                  </a>

                </div>
              )}
            </div>

            {/* QUICK DIRECT CONTACT */}
            <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-md">
              <h4 className="font-bold text-white text-sm">Direct Contact Directory</h4>
              <p className="text-xs text-slate-400">Reach out directly via phone or walk-in. Manager is first priority.</p>
              
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="font-bold text-teal-400 block">Manager: Deekshith</span>
                  <a href="tel:8792125788" className="hover:underline text-white font-medium">+91 87921 25788</a>
                </div>
                <div>
                  <span className="font-bold text-teal-400 block">Owner: G.K. Manjunatha</span>
                  <a href="tel:8722559402" className="hover:underline text-white font-medium">+91 87225 59402</a>
                </div>
                <div>
                  <span className="font-bold text-teal-400 block">Office Contact</span>
                  <a href="tel:8088897235" className="hover:underline text-white font-medium">+91 80888 97235</a>
                </div>
                <div className="pt-2">
                  <a
                    href="https://www.instagram.com/vaibhavgrand?igsh=aWZxc3VzMTAwZjNw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-rose-400 hover:underline"
                  >
                    <Instagram className="w-4 h-4" />
                    Follow @vaibhavgrand on Instagram
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* MOBILE FLOATING CART */}
      {cart.length > 0 && !cartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-30 lg:hidden animate-slideUp">
          <button
            onClick={() => setCartOpen(true)}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-between px-6 shadow-xl active:scale-98 border border-white/10 text-xs"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-teal-400" />
              <span>Cart: {cart.length} Selected</span>
            </div>
            <span className="font-black text-teal-300">Total: ₹{calculateTotal()}</span>
          </button>
        </div>
      )}

      {/* MOBILE SLIDE-OVER OVERLAY */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-end justify-center lg:hidden"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-teal-500" />
                  <span>My Cart 🛒</span>
                </h3>
                <button onClick={() => setCartOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile cart list */}
              <div className="space-y-3 max-h-[250px] overflow-y-auto">
                {cart.map((i) => (
                  <div
                    key={i.id}
                    className="flex gap-3 items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-100 text-xs"
                  >
                    <div className="w-10 h-10 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate leading-snug">{i.name}</h4>
                      <span className="text-[10px] text-slate-500 block">
                        {i.price === 0 ? 'Separate charges' : `₹${i.price} x ${i.quantity} x ${getBookingDays()} ${getBookingDays() === 1 ? 'day' : 'days'}`}
                      </span>
                      {i.price > 0 && (
                        <span className="text-[9px] font-black text-teal-600 block">
                          Subtotal: ₹{i.price * i.quantity * getBookingDays()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button onClick={() => decreaseQty(i.id)} className="p-1 bg-white border border-slate-200 rounded-md">
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="font-bold w-4 text-center">{i.quantity}</span>
                      <button onClick={() => increaseQty(i.id)} className="p-1 bg-white border border-slate-200 rounded-md">
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile booking form */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-teal-400 transition bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Check-In</label>
                    <input
                      type="date"
                      required
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Check-Out</label>
                    <input
                      type="date"
                      required
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Send inquiry to:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {AGENTS.map((agent) => (
                      <button
                        type="button"
                        key={agent.phone}
                        onClick={() => setSelectedAgent(agent)}
                        className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                          selectedAgent.phone === agent.phone
                            ? 'border-teal-400 bg-teal-50/20 text-teal-950 font-bold'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        <span className="text-[10px] block">{agent.name}</span>
                        <span className="text-[8px] text-gray-400 font-normal">{agent.role}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-155 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Total</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-gray-900">₹{calculateTotal()}</span>
                  </div>
                </div>

                {/* Direct anchor link checkout on mobile */}
                <a
                  href={`https://wa.me/91${selectedAgent.phone}?text=${encodeURIComponent(getWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-teal-400 hover:bg-teal-500 text-slate-950 font-bold rounded-xl shadow-lg text-xs text-center"
                  onClick={(e) => {
                    if (!guestName || !checkInDate || !checkOutDate) {
                      e.preventDefault();
                      alert('Please fill out your Name and Stay Dates before checking out!');
                    }
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Checkout on WhatsApp
                </a>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GALLERY LIGHTBOX DIALOG */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm z-50 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-4xl max-h-[80vh] w-full px-6 flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={lightboxImage}
                className="max-w-full max-h-[70vh] rounded-3xl object-contain shadow-2xl border border-white/5"
              />
              <div className="text-center text-white mt-2">
                <p className="text-xs text-slate-400">View Photo Album Preview</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. LOCATION SECTION WITH EMBEDDED GOOGLE MAP */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex px-3 py-1 bg-teal-50 rounded-full text-teal-600 text-xs font-bold tracking-wide">
              FIND US
            </div>
            <h2 className="text-3xl font-black text-gray-900 leading-tight">
              Direct Map Location
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We are situated at <strong>Vaibhava Layout, Turuvanuru Road, near railway bridge, Chitradurga, Karnataka - 577502</strong>. 
              Use this map to navigate directly to the lodge or convention hall.
            </p>
            
            <div className="space-y-3.5 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <MapPin className="w-4.5 h-4.5 text-teal-500 flex-shrink-0" />
                <span>Vaibhav Layout, Turuvanuru Road, Chitradurga</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4.5 h-4.5 text-teal-500 flex-shrink-0" />
                <span>Contact Support: 8088897235</span>
              </p>
            </div>
            
            <a
              href="https://maps.google.com/?q=Hotel+Vaibhava+Grand+Chitradurga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-400 text-slate-950 font-bold rounded-xl hover:bg-teal-500 transition active:scale-95 text-xs text-center shadow-md"
            >
              <MapPin className="w-4 h-4" />
              Open in Google Maps
            </a>
          </div>
          
          <div className="lg:col-span-7 h-80 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
            <iframe
              title="Hotel Vaibhava Grand Google Maps Location"
              src="https://maps.google.com/maps?q=Hotel%20Vaibhava%20Grand%20Turuvanuru%20Road%20Chitradurga&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-10 mt-16 text-center text-xs">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <p className="text-slate-200 font-bold text-sm">Hotel Vaibhava Grand Boarding & Lodging</p>
          <p className="max-w-md mx-auto text-[11px] leading-relaxed">
            Vaibhava Layout, Turuvanuru Road, Near Railway Bridge, Chitradurga, Karnataka - 577502. <br />
            Powered by Classic Cart-to-WhatsApp Booking Portal.
          </p>
          <div className="flex justify-center gap-4 py-2">
            <a
              href="https://www.instagram.com/vaibhavgrand?igsh=aWZxc3VzMTAwZjNw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-rose-400 hover:underline text-xs"
            >
              <Instagram className="w-4 h-4" />
              Follow @vaibhavgrand on Instagram
            </a>
          </div>
          <p className="text-slate-500 pt-2">© {new Date().getFullYear()} Hotel Vaibhava Grand. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}
