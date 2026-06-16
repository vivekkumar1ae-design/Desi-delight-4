import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

// ─── Supabase ───────────────────────────────────────────────────────────────
const supabase = createClient(
  'https://daecghidqoqiwovyukcd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZWNnaGlkcW9xaXdvdnl1a2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NTQ0MzYsImV4cCI6MjA5NzEzMDQzNn0.Wv3gJg__ud_tOo5fYhNj6RANrW_4nZ2Pz_xQDXFWo_U'
);

// ─── Colors ─────────────────────────────────────────────────────────────────
const C = {
  bg: '#0A0806', section: '#12110D', card: '#161310',
  input: '#241F1A', gold: '#C59B4E', goldHover: '#DFB564',
  text: '#F6F0E5', muted: '#8E806A',
};

// ─── Menu Data ───────────────────────────────────────────────────────────────
const MENU = [
  // Starters
  { id:1, name:'Paneer Tikka', price:249, cat:'Starters', veg:true, img:'https://i.ibb.co/b54twxDX', spice:2, desc:'Tender cottage cheese marinated in aromatic spices, grilled to perfection in our tandoor. Served with mint chutney and sliced onions.', ingredients:'Paneer, Yogurt, Ginger-Garlic Paste, Red Chilli, Garam Masala, Kasuri Methi, Bell Peppers, Onion' },
  { id:2, name:'Chicken Leg Piece', price:139, cat:'Starters', veg:false, img:'https://i.ibb.co/ch9cnYcY', spice:3, desc:'Juicy chicken leg marinated overnight in our secret spice blend, slow-roasted for a smoky, fall-off-the-bone experience.', ingredients:'Chicken Leg, Yogurt, Tandoori Masala, Lemon, Red Chilli, Ginger-Garlic, Oil' },
  { id:3, name:'Samosa', price:25, cat:'Starters', veg:true, img:'https://i.ibb.co/tTPZwQYJ', spice:1, desc:'Crispy golden pastry filled with spiced potatoes and peas. A timeless Indian street food favourite, served with tamarind chutney.', ingredients:'Maida, Potato, Peas, Cumin, Coriander, Amchur, Green Chilli, Oil' },
  { id:4, name:'Chicken Kabab', price:229, cat:'Starters', veg:false, img:'https://i.ibb.co/Gfw3KxcF', spice:2, desc:'Minced chicken mixed with fresh herbs and aromatic spices, skewered and grilled over charcoal for an authentic smoky flavour.', ingredients:'Minced Chicken, Onion, Green Chilli, Coriander, Garam Masala, Egg, Breadcrumbs' },
  { id:20, name:'Momos', price:99, cat:'Starters', veg:true, img:'https://i.ibb.co/VYNHL7z7', spice:1, desc:'Steamed Himalayan dumplings stuffed with spiced vegetables, served with fiery red chutney. A street food sensation!', ingredients:'Maida, Cabbage, Carrot, Onion, Ginger, Garlic, Soy Sauce, Black Pepper' },
  { id:22, name:'Red Chilli Momos', price:129, cat:'Starters', veg:true, img:'https://i.ibb.co/M5SY8tb5', spice:4, desc:'Our classic momos tossed in a blazing red chilli sauce. Not for the faint-hearted — a fiery explosion of flavour!', ingredients:'Maida, Cabbage, Carrot, Red Chilli Sauce, Garlic, Vinegar, Sichuan Pepper' },

  // Main Course
  { id:5, name:'Butter Chicken', price:329, cat:'Main Course', veg:false, img:'https://i.ibb.co/nsxvHTtk', spice:2, desc:'The king of Indian curries — tender chicken in a velvety tomato-butter sauce with aromatic spices. Best enjoyed with naan or rice.', ingredients:'Chicken, Butter, Tomato, Cream, Kashmiri Chilli, Garam Masala, Kasuri Methi, Cardamom' },
  { id:6, name:'Butter Paneer Masala', price:269, cat:'Main Course', veg:true, img:'https://i.ibb.co/8gL6VrRt', spice:2, desc:'Soft paneer cubes in a rich, creamy tomato-butter gravy. A vegetarian delight that rivals any non-veg dish!', ingredients:'Paneer, Butter, Tomato, Cream, Onion, Cashew Paste, Garam Masala, Kasuri Methi' },
  { id:7, name:'Dal Makhni', price:219, cat:'Main Course', veg:true, img:'https://i.ibb.co/SwTd1X3g', spice:1, desc:'Slow-cooked black lentils simmered overnight with butter and cream. A Punjab classic that warms the soul.', ingredients:'Black Urad Dal, Rajma, Butter, Cream, Tomato, Ginger, Garlic, Garam Masala' },
  { id:8, name:'Chicken Curry', price:299, cat:'Main Course', veg:false, img:'https://i.ibb.co/8gSqjWKt', spice:3, desc:'A hearty, home-style chicken curry with whole spices and a rich onion-tomato gravy. Reminds you of Dadi ke haath ka khana!', ingredients:'Chicken, Onion, Tomato, Coriander, Cumin, Turmeric, Red Chilli, Bay Leaf, Cloves' },
  { id:9, name:'Palak Paneer', price:249, cat:'Main Course', veg:true, img:'https://i.ibb.co/1G3Db1zD', spice:1, desc:'Fresh cottage cheese in a smooth, vibrant spinach gravy with subtle spices. Nutritious, delicious, and beautifully green!', ingredients:'Palak, Paneer, Onion, Tomato, Garlic, Ginger, Cream, Cumin, Garam Masala' },
  { id:18, name:'Handi Chicken', price:349, cat:'Main Course', veg:false, img:'https://i.ibb.co/23FJ3MLC', spice:3, desc:'Premium chicken slow-cooked in a sealed clay pot (handi) with whole spices. The sealed cooking preserves every drop of flavour!', ingredients:'Chicken, Yogurt, Onion, Tomato, Whole Spices, Cream, Saffron, Ghee, Dum Masala' },

  // Biryani & Rice
  { id:10, name:'Chicken Biryani', price:249, cat:'Biryani & Rice', veg:false, img:'https://i.ibb.co/PGY7mjYG', spice:3, desc:'Fragrant basmati rice layered with succulent chicken, saffron, and caramelised onions. Cooked on dum for an unforgettable aroma.', ingredients:'Basmati Rice, Chicken, Saffron, Fried Onion, Yogurt, Whole Spices, Ghee, Mint' },
  { id:11, name:'Veg Biryani', price:189, cat:'Biryani & Rice', veg:true, img:'https://i.ibb.co/YFZNVPfX', spice:2, desc:'Seasonal vegetables and basmati rice slow-cooked with aromatic spices, saffron water, and pure ghee. A vegetarian royal feast!', ingredients:'Basmati Rice, Mixed Vegetables, Saffron, Ghee, Whole Spices, Fried Onion, Mint, Rose Water' },
  { id:12, name:'Mutton Biryani', price:349, cat:'Biryani & Rice', veg:false, img:'https://i.ibb.co/zVHkyZ4T', spice:3, desc:'Tender mutton pieces slow-cooked with premium basmati rice, whole spices and saffron. The crown jewel of our menu!', ingredients:'Basmati Rice, Mutton, Saffron, Fried Onion, Yogurt, Whole Spices, Ghee, Kewra Water' },
  { id:30, name:'Chicken Fried Rice', price:199, cat:'Biryani & Rice', veg:false, img:'https://i.ibb.co/6cjF3ZGP', spice:2, desc:'Wok-tossed rice with juicy chicken pieces, fresh vegetables, and our signature sauces. An Indo-Chinese classic!', ingredients:'Rice, Chicken, Egg, Spring Onion, Carrot, Capsicum, Soy Sauce, Vinegar, Pepper' },

  // Breads & Snacks
  { id:13, name:'Tandoori Roti', price:20, cat:'Breads & Snacks', veg:true, img:'https://i.ibb.co/BVhLcSm7', spice:0, desc:'Soft whole wheat bread baked fresh in our clay tandoor. The perfect companion for any curry or dal.', ingredients:'Whole Wheat Flour, Water, Salt, Butter' },
  { id:14, name:'Chhole Bhature', price:99, cat:'Breads & Snacks', veg:true, img:'https://i.ibb.co/BHWdLXzJ', spice:3, desc:'Fluffy deep-fried bread served with spicy, tangy chickpea curry. A North Indian breakfast legend that works anytime!', ingredients:'Maida, Chickpeas, Onion, Tomato, Amchur, Anardana, Garam Masala, Ginger' },
  { id:15, name:'Idli Sambar', price:79, cat:'Breads & Snacks', veg:true, img:'https://i.ibb.co/R10hKdP', spice:1, desc:'Soft, fluffy steamed rice cakes served with piping hot lentil sambar and coconut chutney. South India on your plate!', ingredients:'Rice, Urad Dal, Toor Dal, Vegetables, Tamarind, Mustard Seeds, Curry Leaves, Coconut' },
  { id:16, name:'Masala Dosa', price:119, cat:'Breads & Snacks', veg:true, img:'https://i.ibb.co/MD9GcDqJ', spice:2, desc:'Crispy golden rice crepe filled with spiced potato masala, served with sambar and three chutneys. A South Indian icon!', ingredients:'Rice, Urad Dal, Potato, Onion, Mustard, Curry Leaves, Turmeric, Green Chilli, Coconut Chutney' },
  { id:17, name:'Dahi Bhalla', price:89, cat:'Breads & Snacks', veg:true, img:'https://i.ibb.co/8nSqF6Pt', spice:1, desc:'Soft lentil dumplings soaked in chilled yogurt, drizzled with tamarind chutney and sprinkled with chaat masala. Pure bliss!', ingredients:'Urad Dal, Yogurt, Tamarind Chutney, Green Chutney, Chaat Masala, Red Chilli, Boondi' },
  { id:19, name:'Chhole Kulche', price:89, cat:'Breads & Snacks', veg:true, img:'https://i.ibb.co/Tqd7sQNt', spice:2, desc:'Fluffy kulcha bread paired with spicy chickpea curry — a classic Delhi street food combination you can\'t resist!', ingredients:'Maida, Chickpeas, Onion, Butter, Amchur, Garam Masala, Pomegranate Seeds' },

  // Desserts
  { id:21, name:'Malai Kulfi', price:69, cat:'Desserts', veg:true, img:'https://i.ibb.co/fdSrdLbV', spice:0, desc:'Traditional Indian ice cream made from thickened milk, flavoured with cardamom, saffron and topped with pistachios. Pure indulgence!', ingredients:'Full Cream Milk, Sugar, Cardamom, Saffron, Pistachio, Rose Water' },
  { id:23, name:'Rasmalai', price:79, cat:'Desserts', veg:true, img:'https://i.ibb.co/r8TTqBJ', spice:0, desc:'Soft cottage cheese discs soaked in chilled, sweetened milk flavoured with saffron and cardamom. A royal dessert experience!', ingredients:'Paneer, Milk, Sugar, Saffron, Cardamom, Pistachio, Rose Water' },
  { id:27, name:'Gulab Jamun (2 pcs)', price:59, cat:'Desserts', veg:true, img:'https://i.ibb.co/TB9pB4Nf', spice:0, desc:'Soft milk-solid dumplings deep-fried to golden perfection and soaked in rose-flavoured sugar syrup. The ultimate Indian sweet!', ingredients:'Khoya, Maida, Sugar Syrup, Rose Water, Cardamom, Saffron' },
  { id:28, name:'Rabri Kheer', price:89, cat:'Desserts', veg:true, img:'https://i.ibb.co/pj3mm3Bp', spice:0, desc:'Creamy rice pudding slow-cooked with thick rabri, nuts, and saffron. A festive dessert that brings celebrations to your table!', ingredients:'Rice, Full Cream Milk, Sugar, Saffron, Cardamom, Almonds, Pistachio, Rose Water' },

  // Beverages
  { id:24, name:'Masala Chai', price:25, cat:'Beverages', veg:true, img:'https://i.ibb.co/fY9dHhyg', spice:1, desc:'Aromatic Indian tea brewed with fresh ginger, cardamom, cloves, and cinnamon. The soul of every Indian morning!', ingredients:'Tea Leaves, Milk, Ginger, Cardamom, Cloves, Cinnamon, Sugar' },
  { id:25, name:'Thandai', price:69, cat:'Beverages', veg:true, img:'https://i.ibb.co/wrwgrj0K', spice:0, desc:'A chilled, festive drink made with milk, nuts, rose petals and aromatic spices. Holi in a glass!', ingredients:'Milk, Almonds, Cashew, Fennel Seeds, Rose Petals, Cardamom, Saffron, Sugar, Pepper' },
  { id:26, name:'Aam Pana', price:59, cat:'Beverages', veg:true, img:'https://i.ibb.co/d4bwNCFy', spice:0, desc:'A refreshing raw mango cooler with cumin, black salt, and mint. The perfect summer escape in every sip!', ingredients:'Raw Mango, Sugar, Cumin, Black Salt, Mint, Black Pepper, Water' },

  // Fast Food
  { id:29, name:'Veg Burger', price:99, cat:'Fast Food', veg:true, img:'https://i.ibb.co/1JKsG0QB', spice:1, desc:'A crispy vegetable patty with fresh lettuce, tomato, onion, and our secret desi sauce in a toasted bun. Desi twist on a classic!', ingredients:'Bun, Veg Patty, Lettuce, Tomato, Onion, Cheese, Mayo, Desi Sauce, Pickles' },
];

const CATS = ['All', ...Array.from(new Set(MENU.map(i => i.cat)))];
const VALID_PINCODES = ['841301','841302','841303','841304','841305'];
const ADMIN_PASSWORD = 'desidelight@admin2024';
const UPI_ID = '8540868095@fam';
const WHATSAPP = '918540868095';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const SpiceIndicator = ({ level }) => (
  <div style={{ display:'flex', gap:2, alignItems:'center' }}>
    {[1,2,3,4].map(i => (
      <span key={i} style={{ fontSize:10, color: i <= level ? '#ff4500' : C.muted }}>🌶</span>
    ))}
  </div>
);

const VegBadge = ({ veg }) => (
  <div style={{
    width:14, height:14, border:`1.5px solid ${veg?'#22c55e':'#ef4444'}`,
    borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
  }}>
    <div style={{ width:7, height:7, borderRadius:'50%', background: veg?'#22c55e':'#ef4444' }} />
  </div>
);

const Logo = () => (
  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
    <svg width="42" height="42" viewBox="0 0 42 42">
      <circle cx="21" cy="21" r="20" fill="#C59B4E" opacity="0.15" stroke="#C59B4E" strokeWidth="1"/>
      <text x="21" y="16" textAnchor="middle" fill="#C59B4E" fontSize="11" fontFamily="Playfair Display" fontWeight="700">DD</text>
      <path d="M10 22 Q21 30 32 22" stroke="#C59B4E" strokeWidth="1.2" fill="none" opacity="0.8"/>
      <text x="21" y="32" textAnchor="middle" fill="#C59B4E" fontSize="5" fontFamily="Inter" letterSpacing="1">DESI DELIGHT</text>
    </svg>
    <div>
      <div style={{ fontFamily:'Playfair Display', fontSize:18, fontWeight:700, color:C.gold, letterSpacing:1 }}>Desi Delight</div>
      <div style={{ fontSize:9, color:C.muted, letterSpacing:2, textTransform:'uppercase' }}>Authentic Indian Kitchen</div>
    </div>
  </div>
);

// ─── Nav ─────────────────────────────────────────────────────────────────────
const Nav = ({ page, setPage, cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ['Home','Menu','Reserve','Track','Reviews'];

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      background:'rgba(10,8,6,0.95)', backdropFilter:'blur(12px)',
      borderBottom:`1px solid ${C.card}`, padding:'0 20px',
      display:'flex', alignItems:'center', justifyContent:'space-between', height:64
    }}>
      <div onClick={()=>setPage('Home')} style={{cursor:'pointer'}}><Logo /></div>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <div style={{ display:'none' }} className="desktop-nav">
          {links.map(l => (
            <button key={l} onClick={()=>setPage(l)} style={{
              background:'none', border:'none', cursor:'pointer', padding:'8px 14px',
              color: page===l ? C.gold : C.muted, fontFamily:'Inter', fontSize:13,
              fontWeight: page===l ? 600 : 400, transition:'color 0.2s',
              borderBottom: page===l ? `2px solid ${C.gold}` : '2px solid transparent'
            }}>{l}</button>
          ))}
        </div>
        <button onClick={()=>setPage('Cart')} style={{
          position:'relative', background:C.card, border:`1px solid ${C.gold}40`,
          borderRadius:12, padding:'8px 14px', cursor:'pointer', color:C.text,
          display:'flex', alignItems:'center', gap:6, fontSize:14
        }}>
          🛒
          {cartCount > 0 && (
            <span style={{
              position:'absolute', top:-6, right:-6, background:C.gold,
              color:'#0A0806', borderRadius:'50%', width:18, height:18,
              fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center'
            }}>{cartCount}</span>
          )}
        </button>
        <button onClick={()=>setMenuOpen(!menuOpen)} style={{
          background:'none', border:`1px solid ${C.card}`, borderRadius:8,
          padding:'8px 10px', cursor:'pointer', color:C.text, fontSize:16
        }}>☰</button>
      </div>
      {menuOpen && (
        <div style={{
          position:'fixed', top:64, left:0, right:0, background:C.section,
          borderBottom:`1px solid ${C.card}`, padding:16, zIndex:999
        }}>
          {[...links,'Admin'].map(l => (
            <button key={l} onClick={()=>{setPage(l);setMenuOpen(false);}} style={{
              display:'block', width:'100%', background:'none', border:'none',
              textAlign:'left', padding:'12px 16px', color: page===l ? C.gold : C.text,
              fontSize:15, cursor:'pointer', fontFamily:'Inter',
              borderBottom:`1px solid ${C.card}`
            }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
};

// ─── Floating Buttons ─────────────────────────────────────────────────────────
const FloatingButtons = ({ page, setPage, cartCount }) => (
  <div style={{ position:'fixed', bottom:24, right:20, zIndex:999, display:'flex', flexDirection:'column', gap:12 }}>
    {page !== 'Home' && (
      <button onClick={()=>window.history.back ? setPage('Home') : setPage('Home')} style={{
        width:48, height:48, borderRadius:'50%', background:C.card,
        border:`1px solid ${C.gold}60`, color:C.gold, fontSize:20,
        cursor:'pointer', boxShadow:`0 4px 20px rgba(197,155,78,0.3)`
      }}>←</button>
    )}
    <button onClick={()=>setPage('Cart')} style={{
      width:52, height:52, borderRadius:'50%', background:C.gold,
      border:'none', color:'#0A0806', fontSize:22, cursor:'pointer',
      boxShadow:`0 4px 24px rgba(197,155,78,0.5)`, position:'relative'
    }}>
      🛒
      {cartCount > 0 && (
        <span style={{
          position:'absolute', top:-4, right:-4, background:'#ef4444',
          color:'#fff', borderRadius:'50%', width:20, height:20,
          fontSize:11, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center'
        }}>{cartCount}</span>
      )}
    </button>
  </div>
);

// ─── Home ─────────────────────────────────────────────────────────────────────
const Home = ({ setPage, setSelectedItem }) => {
  const chefPicks = MENU.filter(i => [5,10,1,18].includes(i.id));

  return (
    <div>
      {/* Hero */}
      <div style={{
        minHeight:'100vh', background:`linear-gradient(135deg, ${C.bg} 0%, #1a1108 50%, ${C.bg} 100%)`,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        textAlign:'center', padding:'80px 20px 40px', position:'relative', overflow:'hidden'
      }}>
        <div style={{
          position:'absolute', top:'20%', left:'10%', width:200, height:200,
          background:`radial-gradient(circle, ${C.gold}15 0%, transparent 70%)`, borderRadius:'50%'
        }}/>
        <div style={{
          position:'absolute', bottom:'20%', right:'10%', width:150, height:150,
          background:`radial-gradient(circle, ${C.gold}10 0%, transparent 70%)`, borderRadius:'50%'
        }}/>
        <div style={{
          fontSize:11, letterSpacing:4, color:C.gold, textTransform:'uppercase',
          marginBottom:16, fontFamily:'Inter'
        }}>✦ Chhapra Ka Sabse Premium Restaurant ✦</div>
        <h1 style={{
          fontFamily:'Playfair Display', fontSize:'clamp(42px,8vw,80px)',
          fontWeight:900, color:C.text, lineHeight:1.1, marginBottom:16
        }}>
          Desi <span style={{ color:C.gold }}>Delight</span>
        </h1>
        <p style={{
          fontSize:'clamp(14px,2vw,18px)', color:C.muted, maxWidth:500,
          lineHeight:1.7, marginBottom:36, fontFamily:'Inter'
        }}>
          Authentic Indian flavours crafted with passion. From royal biryanis to street-style chaat — every bite tells a story.
        </p>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
          <button onClick={()=>setPage('Menu')} style={{
            background:`linear-gradient(135deg, ${C.gold}, ${C.goldHover})`,
            border:'none', padding:'14px 32px', borderRadius:50,
            color:'#0A0806', fontWeight:700, fontSize:15, cursor:'pointer',
            fontFamily:'Inter', boxShadow:`0 8px 32px rgba(197,155,78,0.4)`
          }}>Order Now 🍽️</button>
          <button onClick={()=>setPage('Reserve')} style={{
            background:'transparent', border:`1.5px solid ${C.gold}`,
            padding:'14px 32px', borderRadius:50, color:C.gold,
            fontWeight:600, fontSize:15, cursor:'pointer', fontFamily:'Inter'
          }}>Reserve Table</button>
        </div>

        {/* Stats */}
        <div style={{
          display:'flex', gap:32, marginTop:60, flexWrap:'wrap', justifyContent:'center'
        }}>
          {[['30+','Menu Items'],['500+','Happy Customers'],['4.8★','Rating'],['10km','Delivery Range']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontSize:28, fontWeight:700, color:C.gold, fontFamily:'Playfair Display' }}>{n}</div>
              <div style={{ fontSize:12, color:C.muted, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chef's Picks */}
      <div style={{ padding:'60px 20px', background:C.section, maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ fontSize:11, color:C.gold, letterSpacing:3, textTransform:'uppercase', marginBottom:8 }}>Hand Picked</div>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:32, color:C.text }}>Chef's Specials</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:20 }}>
          {chefPicks.map(item => (
            <div key={item.id} onClick={()=>{setSelectedItem(item);setPage('Detail');}} style={{
              background:C.card, borderRadius:16, overflow:'hidden',
              cursor:'pointer', border:`1px solid ${C.input}`,
              transition:'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 12px 40px rgba(197,155,78,0.2)`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}>
              <img src={item.img} alt={item.name} style={{ width:'100%', height:160, objectFit:'cover' }} loading="lazy" />
              <div style={{ padding:14 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                  <VegBadge veg={item.veg} />
                  <span style={{ fontSize:14, fontWeight:600, color:C.text }}>{item.name}</span>
                </div>
                <div style={{ color:C.gold, fontWeight:700, fontSize:16 }}>₹{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div style={{ padding:'60px 20px', maxWidth:800, margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontSize:11, color:C.gold, letterSpacing:3, textTransform:'uppercase', marginBottom:8 }}>Our Journey</div>
        <h2 style={{ fontFamily:'Playfair Display', fontSize:32, color:C.text, marginBottom:24 }}>Our Story</h2>
        <p style={{ color:C.muted, lineHeight:1.9, fontSize:15 }}>
          Desi Delight was born from a simple dream — to bring the authentic tastes of Indian homes to every table in Chhapra.
          What started as a small kitchen with big dreams has grown into the city's most beloved dining destination.
          Our recipes are passed down through generations, each dish carrying the warmth of a grandmother's kitchen
          and the precision of a master chef. We source our spices fresh, cook everything from scratch,
          and pour our heart into every single plate. When you dine with us, you're not just eating food —
          you're experiencing a legacy of flavour, love, and tradition.
        </p>
        <div style={{ marginTop:32, display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={{
            background:'#25D366', color:'#fff', padding:'12px 24px',
            borderRadius:50, textDecoration:'none', fontWeight:600, fontSize:14
          }}>💬 WhatsApp Us</a>
          <a href="tel:8540868095" style={{
            background:C.card, color:C.gold, padding:'12px 24px', border:`1px solid ${C.gold}`,
            borderRadius:50, textDecoration:'none', fontWeight:600, fontSize:14
          }}>📞 Call Us</a>
        </div>
      </div>

      {/* Contact */}
      <div style={{ background:C.section, padding:'50px 20px', textAlign:'center' }}>
        <h2 style={{ fontFamily:'Playfair Display', fontSize:28, color:C.text, marginBottom:24 }}>Get In Touch</h2>
        <div style={{ display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap' }}>
          {[
            ['📞', 'Phone', '8540868095'],
            ['💬', 'WhatsApp', '8540868095'],
            ['✉️', 'Email', 'vivekkumarg28samelan@gmail.com'],
            ['📍', 'Location', 'Chhapra, Bihar']
          ].map(([icon, label, val]) => (
            <div key={label} style={{ background:C.card, padding:'20px 24px', borderRadius:12, minWidth:180, border:`1px solid ${C.input}` }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{icon}</div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:13, color:C.text, wordBreak:'break-all' }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background:C.bg, padding:'24px 20px', textAlign:'center', borderTop:`1px solid ${C.card}` }}>
        <div style={{ marginBottom:8 }}><Logo /></div>
        <p style={{ color:C.muted, fontSize:12, marginTop:8 }}>© 2024 Desi Delight. All rights reserved. Made with ❤️ in Chhapra.</p>
      </div>
    </div>
  );
};

// ─── Menu Page ────────────────────────────────────────────────────────────────
const MenuPage = ({ cart, setCart, setPage, setSelectedItem }) => {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);

  const filtered = MENU.filter(i =>
    (cat === 'All' || i.cat === cat) &&
    (!vegOnly || i.veg) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      if (ex) return prev.map(c => c.id === item.id ? {...c, qty: c.qty+1} : c);
      return [...prev, {...item, qty:1}];
    });
  };

  const getQty = (id) => cart.find(c=>c.id===id)?.qty || 0;

  return (
    <div style={{ padding:'80px 16px 100px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontSize:11, color:C.gold, letterSpacing:3, textTransform:'uppercase', marginBottom:8 }}>Explore</div>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:36, color:C.text }}>Our Menu</h2>
        </div>

        {/* Search + Filter */}
        <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap', alignItems:'center' }}>
          <input
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="🔍 Search dishes..."
            style={{
              flex:1, minWidth:200, background:C.input, border:`1px solid ${C.card}`,
              borderRadius:50, padding:'10px 18px', color:C.text, fontSize:14,
              outline:'none', fontFamily:'Inter'
            }}
          />
          <button onClick={()=>setVegOnly(!vegOnly)} style={{
            padding:'10px 18px', borderRadius:50, border:`1.5px solid ${vegOnly?'#22c55e':C.muted}`,
            background: vegOnly ? '#22c55e20' : 'transparent',
            color: vegOnly ? '#22c55e' : C.muted, cursor:'pointer', fontSize:13, fontWeight:600
          }}>🌱 Veg Only</button>
        </div>

        {/* Category Pills */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', marginBottom:28, paddingBottom:4 }}>
          {CATS.map(c => (
            <button key={c} onClick={()=>setCat(c)} style={{
              padding:'8px 18px', borderRadius:50, whiteSpace:'nowrap',
              border:`1.5px solid ${cat===c ? C.gold : C.card}`,
              background: cat===c ? `${C.gold}20` : C.card,
              color: cat===c ? C.gold : C.muted,
              cursor:'pointer', fontSize:12, fontWeight: cat===c ? 600 : 400
            }}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))', gap:20 }}>
          {filtered.map(item => {
            const qty = getQty(item.id);
            return (
              <div key={item.id} style={{
                background:C.card, borderRadius:16, overflow:'hidden',
                border:`1px solid ${C.input}`, transition:'box-shadow 0.2s'
              }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 8px 32px rgba(197,155,78,0.15)`}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
                <div style={{ position:'relative', cursor:'pointer' }} onClick={()=>{setSelectedItem(item);setPage('Detail');}}>
                  <img src={item.img} alt={item.name} style={{ width:'100%', height:180, objectFit:'cover' }} loading="lazy" />
                  <div style={{ position:'absolute', top:10, right:10, background:'rgba(10,8,6,0.8)', borderRadius:20, padding:'3px 10px', fontSize:11, color:C.gold }}>
                    {item.cat}
                  </div>
                </div>
                <div style={{ padding:14 }}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:8, marginBottom:6 }}>
                    <VegBadge veg={item.veg} />
                    <div>
                      <div style={{ fontSize:14, fontWeight:600, color:C.text, lineHeight:1.3 }}>{item.name}</div>
                      <SpiceIndicator level={item.spice} />
                    </div>
                  </div>
                  <p style={{ fontSize:12, color:C.muted, lineHeight:1.5, marginBottom:12, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                    {item.desc}
                  </p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <span style={{ color:C.gold, fontWeight:700, fontSize:17 }}>₹{item.price}</span>
                    {qty === 0 ? (
                      <button onClick={()=>addToCart(item)} style={{
                        background:`linear-gradient(135deg, ${C.gold}, ${C.goldHover})`,
                        border:'none', borderRadius:50, padding:'7px 18px',
                        color:'#0A0806', fontWeight:700, fontSize:12, cursor:'pointer'
                      }}>Add +</button>
                    ) : (
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <button onClick={()=>setCart(prev => {
                          const ex = prev.find(c=>c.id===item.id);
                          if (ex.qty === 1) return prev.filter(c=>c.id!==item.id);
                          return prev.map(c=>c.id===item.id?{...c,qty:c.qty-1}:c);
                        })} style={{ width:28,height:28,borderRadius:'50%',background:C.input,border:`1px solid ${C.gold}`,color:C.gold,cursor:'pointer',fontSize:16,fontWeight:700 }}>−</button>
                        <span style={{ color:C.text, fontWeight:700, minWidth:20, textAlign:'center' }}>{qty}</span>
                        <button onClick={()=>addToCart(item)} style={{ width:28,height:28,borderRadius:'50%',background:C.gold,border:'none',color:'#0A0806',cursor:'pointer',fontSize:16,fontWeight:700 }}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px 20px', color:C.muted }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🍽️</div>
            <p>Koi item nahi mila. Search change karo!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Product Detail ───────────────────────────────────────────────────────────
const Detail = ({ item, cart, setCart, setPage }) => {
  if (!item) { setPage('Menu'); return null; }
  const qty = cart.find(c=>c.id===item.id)?.qty || 0;

  const addToCart = () => {
    setCart(prev => {
      const ex = prev.find(c=>c.id===item.id);
      if (ex) return prev.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c);
      return [...prev,{...item,qty:1}];
    });
  };

  return (
    <div style={{ padding:'80px 16px 100px', maxWidth:900, margin:'0 auto' }}>
      <div style={{ background:C.card, borderRadius:20, overflow:'hidden', border:`1px solid ${C.input}` }}>
        <img src={item.img} alt={item.name} style={{ width:'100%', height:'clamp(240px,40vw,420px)', objectFit:'cover' }} />
        <div style={{ padding:'clamp(20px,4vw,40px)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <VegBadge veg={item.veg} />
            <span style={{ fontSize:11, background:`${C.gold}20`, color:C.gold, padding:'3px 12px', borderRadius:20 }}>{item.cat}</span>
          </div>
          <h1 style={{ fontFamily:'Playfair Display', fontSize:'clamp(24px,4vw,36px)', color:C.text, marginBottom:8 }}>{item.name}</h1>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
            <span style={{ fontSize:28, fontWeight:700, color:C.gold }}>₹{item.price}</span>
            <SpiceIndicator level={item.spice} />
          </div>
          <p style={{ color:C.muted, lineHeight:1.8, fontSize:15, marginBottom:24 }}>{item.desc}</p>

          <div style={{ background:C.input, borderRadius:12, padding:16, marginBottom:28 }}>
            <div style={{ fontSize:12, color:C.gold, fontWeight:600, marginBottom:8, letterSpacing:1 }}>INGREDIENTS</div>
            <p style={{ color:C.muted, fontSize:13, lineHeight:1.7 }}>{item.ingredients}</p>
          </div>

          {/* Spice level info */}
          <div style={{ background:C.section, borderRadius:12, padding:16, marginBottom:28 }}>
            <div style={{ fontSize:12, color:C.gold, fontWeight:600, marginBottom:8 }}>SPICE LEVEL</div>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              <SpiceIndicator level={item.spice} />
              <span style={{ color:C.muted, fontSize:13 }}>
                {item.spice===0?'No Spice':item.spice===1?'Mild':item.spice===2?'Medium':item.spice===3?'Hot':'Extra Hot 🔥'}
              </span>
            </div>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
            {qty === 0 ? (
              <button onClick={addToCart} style={{
                background:`linear-gradient(135deg, ${C.gold}, ${C.goldHover})`,
                border:'none', borderRadius:50, padding:'14px 36px',
                color:'#0A0806', fontWeight:700, fontSize:16, cursor:'pointer', flex:1
              }}>Add to Cart 🛒</button>
            ) : (
              <div style={{ display:'flex', alignItems:'center', gap:16, flex:1, justifyContent:'center' }}>
                <button onClick={()=>setCart(prev=>{const ex=prev.find(c=>c.id===item.id);if(ex.qty===1)return prev.filter(c=>c.id!==item.id);return prev.map(c=>c.id===item.id?{...c,qty:c.qty-1}:c);})}
                  style={{ width:44,height:44,borderRadius:'50%',background:C.input,border:`1.5px solid ${C.gold}`,color:C.gold,cursor:'pointer',fontSize:20,fontWeight:700 }}>−</button>
                <span style={{ fontSize:24, fontWeight:700, color:C.text, minWidth:40, textAlign:'center' }}>{qty}</span>
                <button onClick={addToCart} style={{ width:44,height:44,borderRadius:'50%',background:C.gold,border:'none',color:'#0A0806',cursor:'pointer',fontSize:20,fontWeight:700 }}>+</button>
              </div>
            )}
            <button onClick={()=>setPage('Menu')} style={{
              background:'transparent', border:`1.5px solid ${C.muted}`,
              borderRadius:50, padding:'14px 24px', color:C.muted, cursor:'pointer', fontSize:14
            }}>← Back to Menu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Cart ─────────────────────────────────────────────────────────────────────
const Cart = ({ cart, setCart, setPage }) => {
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const delivery = subtotal > 0 ? 40 : 0;
  const total = subtotal + delivery;

  if (cart.length === 0) return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 20px' }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🛒</div>
      <h2 style={{ fontFamily:'Playfair Display', color:C.text, marginBottom:8 }}>Cart is empty!</h2>
      <p style={{ color:C.muted, marginBottom:24 }}>Kuch toh order karo yaar!</p>
      <button onClick={()=>setPage('Menu')} style={{ background:C.gold,border:'none',borderRadius:50,padding:'12px 28px',color:'#0A0806',fontWeight:700,cursor:'pointer',fontSize:15 }}>Browse Menu</button>
    </div>
  );

  return (
    <div style={{ padding:'80px 16px 100px', maxWidth:700, margin:'0 auto' }}>
      <h2 style={{ fontFamily:'Playfair Display', fontSize:32, color:C.text, marginBottom:24 }}>Your Cart</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:24 }}>
        {cart.map(item => (
          <div key={item.id} style={{ background:C.card, borderRadius:14, padding:16, border:`1px solid ${C.input}`, display:'flex', gap:12, alignItems:'center' }}>
            <img src={item.img} alt={item.name} style={{ width:64,height:64,borderRadius:10,objectFit:'cover',flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                <VegBadge veg={item.veg} />
                <span style={{ fontSize:14,fontWeight:600,color:C.text }}>{item.name}</span>
              </div>
              <span style={{ color:C.gold,fontWeight:700 }}>₹{item.price} × {item.qty} = ₹{item.price*item.qty}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <button onClick={()=>setCart(prev=>{const ex=prev.find(c=>c.id===item.id);if(ex.qty===1)return prev.filter(c=>c.id!==item.id);return prev.map(c=>c.id===item.id?{...c,qty:c.qty-1}:c);})}
                style={{ width:28,height:28,borderRadius:'50%',background:C.input,border:`1px solid ${C.gold}`,color:C.gold,cursor:'pointer',fontSize:16,fontWeight:700 }}>−</button>
              <span style={{ color:C.text,fontWeight:700,minWidth:20,textAlign:'center' }}>{item.qty}</span>
              <button onClick={()=>setCart(prev=>prev.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c))}
                style={{ width:28,height:28,borderRadius:'50%',background:C.gold,border:'none',color:'#0A0806',cursor:'pointer',fontSize:16,fontWeight:700 }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Bill Summary */}
      <div style={{ background:C.card, borderRadius:16, padding:20, border:`1px solid ${C.input}`, marginBottom:20 }}>
        <h3 style={{ color:C.gold, fontFamily:'Playfair Display', marginBottom:16 }}>Bill Summary</h3>
        {cart.map(i=>(
          <div key={i.id} style={{ display:'flex',justifyContent:'space-between',marginBottom:8 }}>
            <span style={{ color:C.muted,fontSize:13 }}>{i.name} × {i.qty}</span>
            <span style={{ color:C.text,fontSize:13 }}>₹{i.price*i.qty}</span>
          </div>
        ))}
        <div style={{ borderTop:`1px solid ${C.input}`,marginTop:12,paddingTop:12 }}>
          <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
            <span style={{ color:C.muted }}>Subtotal</span><span style={{ color:C.text }}>₹{subtotal}</span>
          </div>
          <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
            <span style={{ color:C.muted }}>Delivery</span><span style={{ color:C.text }}>₹{delivery}</span>
          </div>
          <div style={{ display:'flex',justifyContent:'space-between',marginTop:12,paddingTop:12,borderTop:`1px solid ${C.input}` }}>
            <span style={{ color:C.text,fontWeight:700,fontSize:16 }}>Total</span>
            <span style={{ color:C.gold,fontWeight:700,fontSize:18 }}>₹{total}</span>
          </div>
        </div>
      </div>
      <button onClick={()=>setPage('Checkout')} style={{
        width:'100%',background:`linear-gradient(135deg, ${C.gold}, ${C.goldHover})`,
        border:'none',borderRadius:50,padding:'16px',color:'#0A0806',
        fontWeight:700,fontSize:16,cursor:'pointer'
      }}>Proceed to Checkout →</button>
    </div>
  );
};

// ─── Checkout ─────────────────────────────────────────────────────────────────
const Checkout = ({ cart, setCart, setPage, setOrderId }) => {
  const [form, setForm] = useState({ name:'', phone:'', address:'', pincode:'', payment:'upi' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [upiDone, setUpiDone] = useState(false);
  const [upiOpened, setUpiOpened] = useState(false);

  const total = cart.reduce((s,i)=>s+i.price*i.qty,0) + 40;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Naam zaroori hai';
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Valid 10-digit phone number do';
    if (!form.address.trim()) e.address = 'Address zaroori hai';
    if (!VALID_PINCODES.includes(form.pincode)) e.pincode = 'Sirf Chhapra ke pincodes: 841301-841305';
    return e;
  };

  const openUPI = () => {
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=Desi+Delight&am=${total}&cu=INR&tn=Food+Order`;
    window.location.href = upiUrl;
    setUpiOpened(true);
  };

  const placeOrder = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    if (form.payment === 'upi' && !upiDone) {
      alert('Pehle UPI payment karo aur phir "Payment Ho Gaya" button dabao!');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.from('orders').insert({
        customer_name: form.name, phone: form.phone,
        address: form.address, pincode: form.pincode,
        items: cart, total, payment_mode: form.payment, status: 'Placed'
      }).select().single();
      if (error) throw error;
      setOrderId(data.id);
      // WhatsApp message
      const msg = `🍽️ *New Order - Desi Delight*\n\n👤 ${form.name}\n📞 ${form.phone}\n📍 ${form.address}, ${form.pincode}\n\n${cart.map(i=>`• ${i.name} × ${i.qty} = ₹${i.price*i.qty}`).join('\n')}\n\n💰 Total: ₹${total}\n💳 Payment: ${form.payment==='upi'?'UPI (Paid)':'Cash on Delivery'}`;
      setCart([]);
      setPage('OrderSuccess');
      // Open WhatsApp after navigation (user clicks)
      setTimeout(()=>{
        const wa = document.getElementById('wa-notify-btn');
        if(wa) wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
      },100);
    } catch(err) {
      alert('Order place karne mein problem. Try again!');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ padding:'80px 16px 100px', maxWidth:600, margin:'0 auto' }}>
      <h2 style={{ fontFamily:'Playfair Display', fontSize:32, color:C.text, marginBottom:24 }}>Checkout</h2>

      {/* Order Summary */}
      <div style={{ background:C.card, borderRadius:14, padding:16, marginBottom:20, border:`1px solid ${C.input}` }}>
        <div style={{ fontSize:12, color:C.gold, marginBottom:10, letterSpacing:1 }}>ORDER SUMMARY</div>
        {cart.map(i=>(
          <div key={i.id} style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
            <span style={{ color:C.muted, fontSize:13 }}>{i.name} × {i.qty}</span>
            <span style={{ color:C.text, fontSize:13 }}>₹{i.price*i.qty}</span>
          </div>
        ))}
        <div style={{ borderTop:`1px solid ${C.input}`, marginTop:10, paddingTop:10, display:'flex', justifyContent:'space-between' }}>
          <span style={{ color:C.text, fontWeight:700 }}>Total (with delivery)</span>
          <span style={{ color:C.gold, fontWeight:700, fontSize:18 }}>₹{total}</span>
        </div>
      </div>

      {/* Form */}
      {[
        {key:'name', label:'Aapka Naam *', placeholder:'Full name', type:'text'},
        {key:'phone', label:'Phone Number * (Proof ke liye)', placeholder:'10-digit mobile number', type:'tel'},
        {key:'address', label:'Delivery Address *', placeholder:'Ghar ka pura address', type:'text'},
        {key:'pincode', label:'Pincode * (Sirf Chhapra - 10km radius)', placeholder:'841301 - 841305', type:'text'},
      ].map(f=>(
        <div key={f.key} style={{ marginBottom:16 }}>
          <label style={{ display:'block', fontSize:12, color:C.muted, marginBottom:6, letterSpacing:0.5 }}>{f.label}</label>
          <input
            type={f.type} value={form[f.key]} placeholder={f.placeholder}
            onChange={e=>{ setForm({...form,[f.key]:e.target.value}); setErrors({...errors,[f.key]:''}); }}
            style={{
              width:'100%', background:C.input, border:`1.5px solid ${errors[f.key]?'#ef4444':C.card}`,
              borderRadius:10, padding:'12px 16px', color:C.text, fontSize:14,
              outline:'none', fontFamily:'Inter'
            }}
          />
          {errors[f.key] && <div style={{ color:'#ef4444', fontSize:11, marginTop:4 }}>{errors[f.key]}</div>}
        </div>
      ))}

      {/* Payment Method */}
      <div style={{ marginBottom:24 }}>
        <label style={{ fontSize:12, color:C.muted, letterSpacing:0.5, display:'block', marginBottom:10 }}>PAYMENT METHOD *</label>
        <div style={{ display:'flex', gap:12 }}>
          {[['upi','UPI Payment 📱'],['cod','Cash on Delivery 💵']].map(([val,label])=>(
            <button key={val} onClick={()=>setForm({...form,payment:val})} style={{
              flex:1, padding:'12px', borderRadius:12,
              border:`2px solid ${form.payment===val?C.gold:C.card}`,
              background: form.payment===val ? `${C.gold}15` : C.card,
              color: form.payment===val ? C.gold : C.muted,
              cursor:'pointer', fontSize:13, fontWeight:600
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* UPI Payment Flow */}
      {form.payment === 'upi' && (
        <div style={{ background:C.card, borderRadius:14, padding:20, marginBottom:20, border:`1px solid ${C.gold}40` }}>
          <div style={{ fontSize:13, color:C.text, marginBottom:12, fontWeight:600 }}>UPI Payment Steps:</div>
          <div style={{ fontSize:13, color:C.muted, marginBottom:4 }}>1️⃣ UPI ID: <strong style={{ color:C.gold }}>{UPI_ID}</strong></div>
          <div style={{ fontSize:13, color:C.muted, marginBottom:12 }}>2️⃣ Amount: <strong style={{ color:C.gold }}>₹{total}</strong></div>
          {!upiOpened ? (
            <button onClick={openUPI} style={{
              width:'100%', background:`linear-gradient(135deg, ${C.gold}, ${C.goldHover})`,
              border:'none', borderRadius:50, padding:'12px', color:'#0A0806',
              fontWeight:700, fontSize:14, cursor:'pointer', marginBottom:10
            }}>Open UPI App & Pay ₹{total} →</button>
          ) : !upiDone ? (
            <div>
              <p style={{ color:C.muted, fontSize:12, marginBottom:10 }}>Payment complete ho gayi? ✅</p>
              <button onClick={()=>setUpiDone(true)} style={{
                width:'100%', background:'#22c55e', border:'none', borderRadius:50,
                padding:'12px', color:'#fff', fontWeight:700, fontSize:14, cursor:'pointer'
              }}>✅ Payment Ho Gaya — Confirm</button>
            </div>
          ) : (
            <div style={{ color:'#22c55e', fontSize:13, fontWeight:600 }}>✅ Payment Confirmed!</div>
          )}
        </div>
      )}

      <button onClick={placeOrder} disabled={loading} style={{
        width:'100%', background: loading ? C.muted : `linear-gradient(135deg, ${C.gold}, ${C.goldHover})`,
        border:'none', borderRadius:50, padding:'16px', color:'#0A0806',
        fontWeight:700, fontSize:16, cursor: loading ? 'not-allowed' : 'pointer'
      }}>
        {loading ? 'Order Place ho raha hai...' : `Place Order${form.payment==='cod'?' (COD)':' — Payment Done ✅'}`}
      </button>
    </div>
  );
};

// ─── Order Success ─────────────────────────────────────────────────────────────
const OrderSuccess = ({ orderId, setPage }) => (
  <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 20px', textAlign:'center' }}>
    <div style={{ fontSize:72, marginBottom:16 }}>🎉</div>
    <h2 style={{ fontFamily:'Playfair Display', fontSize:36, color:C.gold, marginBottom:8 }}>Order Placed!</h2>
    <p style={{ color:C.muted, marginBottom:8 }}>Aapka order successfully place ho gaya hai!</p>
    <div style={{ background:C.card, borderRadius:12, padding:'12px 24px', marginBottom:24, border:`1px solid ${C.gold}40` }}>
      <span style={{ color:C.muted, fontSize:12 }}>Order ID: </span>
      <span style={{ color:C.gold, fontSize:12, fontFamily:'monospace' }}>{orderId?.slice(0,8).toUpperCase()}</span>
    </div>
    <a id="wa-notify-btn" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={{
      background:'#25D366', color:'#fff', padding:'14px 28px',
      borderRadius:50, textDecoration:'none', fontWeight:700, fontSize:15,
      display:'inline-block', marginBottom:16
    }}>💬 WhatsApp pe Confirm Karo</a>
    <br />
    <button onClick={()=>setPage('Track')} style={{
      background:'transparent', border:`1.5px solid ${C.gold}`, borderRadius:50,
      padding:'12px 24px', color:C.gold, cursor:'pointer', fontSize:14, fontWeight:600, marginTop:12
    }}>📦 Track Your Order</button>
    <br />
    <button onClick={()=>setPage('Menu')} style={{
      background:'transparent', border:'none', color:C.muted,
      cursor:'pointer', fontSize:13, marginTop:16
    }}>← Back to Menu</button>
  </div>
);

// ─── Track Order ──────────────────────────────────────────────────────────────
const Track = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [inputId, setInputId] = useState(orderId?.slice(0,8).toUpperCase() || '');
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState('');

  const STEPS = ['Placed','Confirmed','Preparing','Out for Delivery','Delivered'];

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    setLoading(true);
    const { data } = await supabase.from('orders').select('*')
      .ilike('id', `${id.toLowerCase()}%`).single();
    setOrder(data || null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (orderId) fetchOrder(orderId);
  }, [orderId, fetchOrder]);

  // Realtime subscription
  useEffect(() => {
    if (!order?.id) return;
    const channel = supabase.channel('order-track')
      .on('postgres_changes', { event:'UPDATE', schema:'public', table:'orders', filter:`id=eq.${order.id}` },
        payload => setOrder(payload.new))
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [order?.id]);

  const curStep = order ? STEPS.indexOf(order.status) : -1;

  return (
    <div style={{ padding:'80px 16px 100px', maxWidth:600, margin:'0 auto' }}>
      <h2 style={{ fontFamily:'Playfair Display', fontSize:32, color:C.text, marginBottom:24 }}>Track Order</h2>

      <div style={{ display:'flex', gap:10, marginBottom:32 }}>
        <input value={inputId} onChange={e=>setInputId(e.target.value.toUpperCase())}
          placeholder="Order ID daalo (pehle 8 char)"
          style={{ flex:1, background:C.input, border:`1px solid ${C.card}`, borderRadius:50, padding:'12px 18px', color:C.text, fontSize:14, outline:'none', fontFamily:'monospace' }}
        />
        <button onClick={()=>fetchOrder(inputId)} style={{
          background:C.gold, border:'none', borderRadius:50, padding:'12px 20px',
          color:'#0A0806', fontWeight:700, cursor:'pointer'
        }}>Track</button>
      </div>

      {loading && <div style={{ textAlign:'center', color:C.muted }}>Loading...</div>}

      {order && (
        <div style={{ background:C.card, borderRadius:16, padding:24, border:`1px solid ${C.input}` }}>
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:12, color:C.muted }}>Order ID</div>
            <div style={{ color:C.gold, fontFamily:'monospace', fontSize:13 }}>{order.id.slice(0,8).toUpperCase()}</div>
          </div>
          <div style={{ marginBottom:28 }}>
            {STEPS.map((step, i) => (
              <div key={step} style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:i<STEPS.length-1?20:0 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <div style={{
                    width:28, height:28, borderRadius:'50%', flexShrink:0,
                    background: i <= curStep ? C.gold : C.input,
                    border: `2px solid ${i <= curStep ? C.gold : C.card}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:12, color: i <= curStep ? '#0A0806' : C.muted, fontWeight:700
                  }}>{i < curStep ? '✓' : i+1}</div>
                  {i < STEPS.length-1 && <div style={{ width:2, height:20, background: i < curStep ? C.gold : C.card, marginTop:4 }} />}
                </div>
                <div style={{ paddingTop:4 }}>
                  <div style={{ color: i <= curStep ? C.text : C.muted, fontWeight: i === curStep ? 700 : 400, fontSize:14 }}>{step}</div>
                  {i === curStep && <div style={{ fontSize:11, color:C.gold, marginTop:2 }}>← Current Status</div>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop:`1px solid ${C.input}`, paddingTop:16 }}>
            <div style={{ fontSize:12, color:C.muted, marginBottom:4 }}>Delivery to</div>
            <div style={{ color:C.text, fontSize:13 }}>{order.address}, {order.pincode}</div>
            <div style={{ color:C.gold, fontWeight:700, marginTop:8 }}>Total: ₹{order.total}</div>
          </div>
        </div>
      )}
      {!order && !loading && inputId && (
        <div style={{ textAlign:'center', color:C.muted, padding:40 }}>Order nahi mila. ID check karo!</div>
      )}
    </div>
  );
};

// ─── Reserve ──────────────────────────────────────────────────────────────────
const Reserve = () => {
  const [form, setForm] = useState({ name:'', phone:'', date:'', time:'', guests:'2', special:'' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waMsg, setWaMsg] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Naam zaroori hai';
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Valid phone number do';
    if (!form.date) e.date = 'Date select karo';
    if (!form.time) e.time = 'Time select karo';
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    try {
      await supabase.from('reservations').insert({
        name: form.name, phone: form.phone, date: form.date,
        time: form.time, guests: parseInt(form.guests),
        special_request: form.special
      });
      const msg = `🍽️ *Table Reservation - Desi Delight*\n\n👤 ${form.name}\n📞 ${form.phone}\n📅 ${form.date} at ${form.time}\n👥 ${form.guests} Guests\n💬 ${form.special || 'No special request'}`;
      setWaMsg(msg);
      setDone(true);
    } catch { alert('Kuch problem aaya. Try again!'); }
    finally { setLoading(false); }
  };

  if (done) return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 20px', textAlign:'center' }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
      <h2 style={{ fontFamily:'Playfair Display', fontSize:32, color:C.gold, marginBottom:8 }}>Reservation Done!</h2>
      <p style={{ color:C.muted, marginBottom:24 }}>Aapki table book ho gayi hai. WhatsApp pe confirm karein:</p>
      <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noreferrer" style={{
        background:'#25D366', color:'#fff', padding:'14px 28px',
        borderRadius:50, textDecoration:'none', fontWeight:700, fontSize:15, display:'inline-block'
      }}>💬 WhatsApp pe Confirm Karo</a>
    </div>
  );

  return (
    <div style={{ padding:'80px 16px 100px', maxWidth:550, margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <div style={{ fontSize:11, color:C.gold, letterSpacing:3, textTransform:'uppercase', marginBottom:8 }}>Book Your Seat</div>
        <h2 style={{ fontFamily:'Playfair Display', fontSize:32, color:C.text }}>Table Reservation</h2>
      </div>
      {[
        {key:'name',label:'Aapka Naam *',placeholder:'Full name',type:'text'},
        {key:'phone',label:'Phone Number *',placeholder:'10-digit mobile',type:'tel'},
        {key:'date',label:'Date *',placeholder:'',type:'date'},
        {key:'time',label:'Time *',placeholder:'',type:'time'},
      ].map(f=>(
        <div key={f.key} style={{ marginBottom:16 }}>
          <label style={{ display:'block',fontSize:12,color:C.muted,marginBottom:6 }}>{f.label}</label>
          <input type={f.type} value={form[f.key]} placeholder={f.placeholder}
            onChange={e=>{setForm({...form,[f.key]:e.target.value});setErrors({...errors,[f.key]:''});}}
            style={{ width:'100%',background:C.input,border:`1.5px solid ${errors[f.key]?'#ef4444':C.card}`,borderRadius:10,padding:'12px 16px',color:C.text,fontSize:14,outline:'none',fontFamily:'Inter' }}
          />
          {errors[f.key] && <div style={{ color:'#ef4444',fontSize:11,marginTop:4 }}>{errors[f.key]}</div>}
        </div>
      ))}
      <div style={{ marginBottom:16 }}>
        <label style={{ display:'block',fontSize:12,color:C.muted,marginBottom:6 }}>Guests *</label>
        <select value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})}
          style={{ width:'100%',background:C.input,border:`1px solid ${C.card}`,borderRadius:10,padding:'12px 16px',color:C.text,fontSize:14,outline:'none' }}>
          {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} Guest{n>1?'s':''}</option>)}
        </select>
      </div>
      <div style={{ marginBottom:24 }}>
        <label style={{ display:'block',fontSize:12,color:C.muted,marginBottom:6 }}>Special Request (Optional)</label>
        <textarea value={form.special} onChange={e=>setForm({...form,special:e.target.value})}
          placeholder="Birthday cake, window seat, wheelchair access..."
          rows={3} style={{ width:'100%',background:C.input,border:`1px solid ${C.card}`,borderRadius:10,padding:'12px 16px',color:C.text,fontSize:14,outline:'none',resize:'vertical',fontFamily:'Inter' }}
        />
      </div>
      <button onClick={submit} disabled={loading} style={{
        width:'100%',background:`linear-gradient(135deg, ${C.gold}, ${C.goldHover})`,
        border:'none',borderRadius:50,padding:'16px',color:'#0A0806',fontWeight:700,fontSize:16,cursor:'pointer'
      }}>{loading?'Booking...':'Book Table 🍽️'}</button>
    </div>
  );
};

// ─── Reviews ─────────────────────────────────────────────────────────────────
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name:'', rating:5, comment:'' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('reviews').select('*').order('created_at',{ascending:false});
    setReviews(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const submit = async () => {
    if (!form.name.trim() || !form.comment.trim()) { alert('Naam aur comment zaroori hai!'); return; }
    setSubmitting(true);
    const { data } = await supabase.from('reviews').insert(form).select().single();
    if (data) setReviews(prev => [data, ...prev]);
    setForm({ name:'', rating:5, comment:'' });
    setSubmitting(false);
  };

  const avgRating = reviews.length ? (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1) : '—';

  return (
    <div style={{ padding:'80px 16px 100px', maxWidth:700, margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:32 }}>
        <div style={{ fontSize:11,color:C.gold,letterSpacing:3,textTransform:'uppercase',marginBottom:8 }}>What People Say</div>
        <h2 style={{ fontFamily:'Playfair Display',fontSize:32,color:C.text,marginBottom:8 }}>Reviews</h2>
        <div style={{ fontSize:36,fontWeight:700,color:C.gold }}>{avgRating} ★</div>
        <div style={{ color:C.muted,fontSize:13 }}>{reviews.length} reviews</div>
      </div>

      {/* Submit Review */}
      <div style={{ background:C.card,borderRadius:16,padding:24,marginBottom:32,border:`1px solid ${C.input}` }}>
        <h3 style={{ color:C.gold,marginBottom:16,fontFamily:'Playfair Display' }}>Apna Review Do</h3>
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Aapka naam"
          style={{ width:'100%',background:C.input,border:`1px solid ${C.card}`,borderRadius:10,padding:'10px 14px',color:C.text,fontSize:14,outline:'none',marginBottom:12,fontFamily:'Inter' }}
        />
        <div style={{ display:'flex', gap:8, marginBottom:12 }}>
          {[1,2,3,4,5].map(s=>(
            <button key={s} onClick={()=>setForm({...form,rating:s})} style={{
              background:'none',border:'none',fontSize:24,cursor:'pointer',
              opacity: s<=form.rating ? 1 : 0.3
            }}>⭐</button>
          ))}
        </div>
        <textarea value={form.comment} onChange={e=>setForm({...form,comment:e.target.value})}
          placeholder="Khane ke baare mein batao..." rows={3}
          style={{ width:'100%',background:C.input,border:`1px solid ${C.card}`,borderRadius:10,padding:'10px 14px',color:C.text,fontSize:14,outline:'none',resize:'vertical',fontFamily:'Inter',marginBottom:12 }}
        />
        <button onClick={submit} disabled={submitting} style={{
          background:`linear-gradient(135deg, ${C.gold}, ${C.goldHover})`,border:'none',
          borderRadius:50,padding:'10px 24px',color:'#0A0806',fontWeight:700,cursor:'pointer'
        }}>{submitting?'Submitting...':'Submit Review ⭐'}</button>
      </div>

      {loading ? <div style={{ textAlign:'center',color:C.muted }}>Loading reviews...</div> :
        reviews.map(r=>(
          <div key={r.id} style={{ background:C.card,borderRadius:14,padding:18,marginBottom:14,border:`1px solid ${C.input}` }}>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
              <span style={{ fontWeight:600,color:C.text }}>{r.name}</span>
              <span style={{ color:C.gold }}>{'⭐'.repeat(r.rating)}</span>
            </div>
            <p style={{ color:C.muted,fontSize:13,lineHeight:1.6 }}>{r.comment}</p>
            <div style={{ fontSize:11,color:C.input,marginTop:6 }}>{new Date(r.created_at).toLocaleDateString('hi-IN')}</div>
          </div>
        ))
      }
    </div>
  );
};

// ─── Admin ────────────────────────────────────────────────────────────────────
const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState('');
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(null);

  const STATUSES = ['Placed','Confirmed','Preparing','Out for Delivery','Delivered'];

  const login = () => {
    if (pwd === ADMIN_PASSWORD) setAuthed(true);
    else alert('Wrong password!');
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [o, r] = await Promise.all([
      supabase.from('orders').select('*').order('created_at',{ascending:false}),
      supabase.from('reservations').select('*').order('created_at',{ascending:false})
    ]);
    setOrders(o.data || []);
    setReservations(r.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { if (authed) fetchAll(); }, [authed, fetchAll]);

  // Realtime
  useEffect(() => {
    if (!authed) return;
    const ch = supabase.channel('admin-orders')
      .on('postgres_changes',{event:'INSERT',schema:'public',table:'orders'}, payload=>{
        setOrders(prev=>[payload.new,...prev]);
      })
      .on('postgres_changes',{event:'UPDATE',schema:'public',table:'orders'}, payload=>{
        setOrders(prev=>prev.map(o=>o.id===payload.new.id?payload.new:o));
      })
      .subscribe();
    return ()=>supabase.removeChannel(ch);
  }, [authed]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    await supabase.from('orders').update({ status }).eq('id', id);
    setUpdating(null);
  };

  const nextStatus = (cur) => {
    const i = STATUSES.indexOf(cur);
    return i < STATUSES.length-1 ? STATUSES[i+1] : null;
  };

  const todayOrders = orders.filter(o=>new Date(o.created_at).toDateString()===new Date().toDateString());
  const todayRevenue = todayOrders.reduce((s,o)=>s+o.total,0);

  if (!authed) return (
    <div style={{ minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:20 }}>
      <div style={{ background:C.card,borderRadius:20,padding:40,width:'100%',maxWidth:380,border:`1px solid ${C.gold}40` }}>
        <div style={{ textAlign:'center',marginBottom:24 }}>
          <Logo />
          <div style={{ color:C.muted,fontSize:13,marginTop:8 }}>Admin Dashboard</div>
        </div>
        <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&login()}
          placeholder="Admin Password"
          style={{ width:'100%',background:C.input,border:`1px solid ${C.card}`,borderRadius:10,padding:'12px 16px',color:C.text,fontSize:14,outline:'none',marginBottom:16,fontFamily:'Inter' }}
        />
        <button onClick={login} style={{ width:'100%',background:`linear-gradient(135deg, ${C.gold}, ${C.goldHover})`,border:'none',borderRadius:50,padding:'14px',color:'#0A0806',fontWeight:700,fontSize:15,cursor:'pointer' }}>
          Login 🔐
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding:'80px 16px 100px', maxWidth:1000, margin:'0 auto' }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24,flexWrap:'wrap',gap:12 }}>
        <h2 style={{ fontFamily:'Playfair Display',fontSize:28,color:C.gold }}>Admin Dashboard</h2>
        <button onClick={fetchAll} style={{ background:C.card,border:`1px solid ${C.gold}`,borderRadius:50,padding:'8px 18px',color:C.gold,cursor:'pointer',fontSize:13 }}>🔄 Refresh</button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:16,marginBottom:28 }}>
        {[
          ['📦','Today Orders',todayOrders.length],
          ['💰','Today Revenue',`₹${todayRevenue}`],
          ['📋','Total Orders',orders.length],
          ['🪑','Reservations',reservations.length],
        ].map(([icon,label,val])=>(
          <div key={label} style={{ background:C.card,borderRadius:14,padding:18,border:`1px solid ${C.input}`,textAlign:'center' }}>
            <div style={{ fontSize:24,marginBottom:6 }}>{icon}</div>
            <div style={{ fontSize:11,color:C.muted,marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:22,fontWeight:700,color:C.gold }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:'flex',gap:8,marginBottom:20 }}>
        {[['orders','Orders 📦'],['reservations','Reservations 🪑']].map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{
            padding:'10px 20px',borderRadius:50,border:`1.5px solid ${tab===t?C.gold:C.card}`,
            background:tab===t?`${C.gold}20`:C.card,color:tab===t?C.gold:C.muted,cursor:'pointer',fontSize:13,fontWeight:600
          }}>{l}</button>
        ))}
      </div>

      {loading ? <div style={{ color:C.muted,textAlign:'center',padding:40 }}>Loading...</div> :

      tab === 'orders' ? (
        orders.length === 0 ? <div style={{ color:C.muted,textAlign:'center',padding:40 }}>Koi order nahi abhi</div> :
        orders.map(o=>(
          <div key={o.id} style={{ background:C.card,borderRadius:14,padding:18,marginBottom:14,border:`1px solid ${C.input}` }}>
            <div style={{ display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8,marginBottom:10 }}>
              <div>
                <span style={{ color:C.gold,fontFamily:'monospace',fontSize:12 }}>{o.id.slice(0,8).toUpperCase()}</span>
                <span style={{ color:C.text,fontWeight:600,marginLeft:12 }}>{o.customer_name}</span>
                <span style={{ color:C.muted,fontSize:12,marginLeft:8 }}>📞 {o.phone}</span>
              </div>
              <span style={{ background:`${C.gold}20`,color:C.gold,padding:'3px 12px',borderRadius:20,fontSize:12,fontWeight:600 }}>{o.status}</span>
            </div>
            <div style={{ color:C.muted,fontSize:12,marginBottom:8 }}>📍 {o.address}, {o.pincode}</div>
            <div style={{ display:'flex',flexWrap:'wrap',gap:6,marginBottom:10 }}>
              {(o.items||[]).map((item,i)=>(
                <span key={i} style={{ background:C.input,color:C.text,padding:'3px 10px',borderRadius:20,fontSize:11 }}>{item.name} ×{item.qty}</span>
              ))}
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8 }}>
              <div>
                <span style={{ color:C.gold,fontWeight:700 }}>₹{o.total}</span>
                <span style={{ color:C.muted,fontSize:11,marginLeft:10 }}>{o.payment_mode?.toUpperCase()}</span>
                <span style={{ color:C.muted,fontSize:11,marginLeft:10 }}>{new Date(o.created_at).toLocaleString('hi-IN')}</span>
              </div>
              {nextStatus(o.status) && (
                <button disabled={updating===o.id} onClick={()=>updateStatus(o.id,nextStatus(o.status))} style={{
                  background:C.gold,border:'none',borderRadius:50,padding:'8px 18px',
                  color:'#0A0806',fontWeight:700,fontSize:12,cursor:updating===o.id?'not-allowed':'pointer',
                  opacity:updating===o.id?0.6:1
                }}>{updating===o.id?'Updating...`':`→ ${nextStatus(o.status)}`}</button>
              )}
            </div>
          </div>
        ))
      ) : (
        reservations.length === 0 ? <div style={{ color:C.muted,textAlign:'center',padding:40 }}>Koi reservation nahi</div> :
        reservations.map(r=>(
          <div key={r.id} style={{ background:C.card,borderRadius:14,padding:18,marginBottom:14,border:`1px solid ${C.input}` }}>
            <div style={{ display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8 }}>
              <div>
                <span style={{ color:C.text,fontWeight:600 }}>{r.name}</span>
                <span style={{ color:C.muted,fontSize:12,marginLeft:10 }}>📞 {r.phone}</span>
              </div>
              <span style={{ background:`${C.gold}20`,color:C.gold,padding:'3px 12px',borderRadius:20,fontSize:12 }}>{r.status}</span>
            </div>
            <div style={{ color:C.muted,fontSize:13,marginTop:8 }}>📅 {r.date} at {r.time} · 👥 {r.guests} guests</div>
            {r.special_request && <div style={{ color:C.muted,fontSize:12,marginTop:4 }}>💬 {r.special_request}</div>}
          </div>
        ))
      )}
    </div>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('Home');
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dd_cart')) || []; } catch { return []; }
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderId, setOrderId] = useState(null);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('dd_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync cart across tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'dd_cart') {
        try { setCart(JSON.parse(e.newValue) || []); } catch {}
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  const renderPage = () => {
    switch(page) {
      case 'Home': return <Home setPage={setPage} setSelectedItem={setSelectedItem} />;
      case 'Menu': return <MenuPage cart={cart} setCart={setCart} setPage={setPage} setSelectedItem={setSelectedItem} />;
      case 'Detail': return <Detail item={selectedItem} cart={cart} setCart={setCart} setPage={setPage} />;
      case 'Cart': return <Cart cart={cart} setCart={setCart} setPage={setPage} />;
      case 'Checkout': return <Checkout cart={cart} setCart={setCart} setPage={setPage} setOrderId={setOrderId} />;
      case 'OrderSuccess': return <OrderSuccess orderId={orderId} setPage={setPage} />;
      case 'Track': return <Track orderId={orderId} />;
      case 'Reserve': return <Reserve />;
      case 'Reviews': return <Reviews />;
      case 'Admin': return <Admin />;
      default: return <Home setPage={setPage} setSelectedItem={setSelectedItem} />;
    }
  };

  return (
    <div style={{ minHeight:'100vh', background:C.bg }}>
      <Nav page={page} setPage={setPage} cartCount={cartCount} />
      {renderPage()}
      <FloatingButtons page={page} setPage={setPage} cartCount={cartCount} />
    </div>
  );
}
