// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
// import './styles.css';

// // --- PRODUCTS: 35 items ---
// const PRODUCTS = Array.from({ length: 35 }).map((_, i) => ({
//   id: (i + 1).toString(),
//   name: `Tanvi Product ${i + 1}`,
//   price: (9.99 + i * 2.5).toFixed(2),
//   image: `https://via.placeholder.com/600x600?text=Tanvi+Product+${i + 1}`,
//   short: `Premium skincare formula number ${i + 1} — gentle, effective, and crafted for radiant skin.`,
//   long: `Tanvi Product ${i + 1} is formulated with high-quality ingredients to hydrate, soothe, and brighten. Recommended for daily use. Suitable for all skin types. Use mornings and evenings for best results.`
// }));

// // Inject CSS so everything is self-contained
// const CSS = `
// :root{--bg:#fbfaf8;--card:#ffffff;--muted:#7a6b6b;--accent:#c28b6e;--accent-dark:#b06f4f}
// *{box-sizing:border-box}
// body{font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin:0; background:linear-gradient(120deg,#fbf7f5 0%, #fffdfa 60%); color:#1b1b1b}
// .header{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;border-bottom:1px solid rgba(0,0,0,0.05);position:sticky;top:0;background:rgba(255,255,255,0.8);backdrop-filter:blur(6px);z-index:50}
// .brand{display:flex;gap:14px;align-items:center}
// .logo{width:54px;height:54px;border-radius:12px;background:linear-gradient(135deg,var(--accent),var(--accent-dark));display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-family:Georgia, 'Times New Roman', Times, serif}
// .nav a{margin:0 10px;text-decoration:none;color:inherit;font-weight:600}
// .search{flex:1;max-width:520px;margin:0 20px}
// .search input{width:100%;padding:10px 14px;border-radius:12px;border:1px solid rgba(0,0,0,0.08)}
// .controls{display:flex;gap:12px;align-items:center}
// .cart-btn{position:relative;padding:8px 12px;border-radius:10px;background:var(--card);box-shadow:0 2px 8px rgba(9,9,9,0.05);cursor:pointer;border:1px solid rgba(0,0,0,0.04)}
// .cart-count{position:absolute;right:-6px;top:-6px;background:var(--accent-dark);color:white;border-radius:999px;padding:4px 7px;font-size:12px}
// .container{max-width:1200px;margin:28px auto;padding:0 20px}
// .hero{display:grid;grid-template-columns:1fr 420px;gap:24px;align-items:center;margin-bottom:26px}
// .hero-card{background:linear-gradient(180deg,#fff 0%, #fffdfa 100%);padding:28px;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,0.06)}
// .h-title{font-family:Georgia, 'Times New Roman', Times, serif;font-size:36px;margin:0 0 10px}
// .h-sub{color:var(--muted);margin:0 0 18px}
// .cta{display:inline-block;padding:12px 18px;border-radius:10px;background:var(--accent);color:white;text-decoration:none;font-weight:700}
// .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px}
// .card{background:var(--card);border-radius:14px;padding:12px;overflow:hidden;box-shadow:0 8px 22px rgba(20,20,20,0.04);transition:transform .28s ease, box-shadow .28s ease}
// .card:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(20,20,20,0.08)}
// .card img{width:100%;height:200px;object-fit:cover;border-radius:10px}
// .card h4{margin:10px 0 6px;font-size:16px}
// .card p{margin:0;color:var(--muted);font-size:14px}
// .price{font-weight:800;margin-top:8px}
// .card-actions{display:flex;gap:8px;margin-top:12px}
// .btn{padding:8px 10px;border-radius:10px;border:none;cursor:pointer;font-weight:700}
// .btn-outline{background:transparent;border:1px solid rgba(0,0,0,0.08)}
// .btn-primary{background:var(--accent);color:white}
// .footer{margin-top:40px;padding:22px 32px;border-top:1px solid rgba(0,0,0,0.04);display:flex;justify-content:space-between;align-items:center}
// .toast{position:fixed;right:20px;bottom:20px;background:#222;color:#fff;padding:12px 16px;border-radius:10px;box-shadow:0 8px 20px rgba(0,0,0,0.25);opacity:0;transform:translateY(18px);transition:all .28s ease}
// .toast.show{opacity:1;transform:translateY(0)}
// .detail{display:grid;grid-template-columns:420px 1fr;gap:22px}
// .detail img{width:100%;border-radius:12px}
// .meta h2{font-family:Georgia, 'Times New Roman', Times, serif}
// .about-card, .contact-card, .checkout-card{background:var(--card);padding:18px;border-radius:12px}
// .small-note{color:var(--muted);font-size:13px;margin-top:8px}
// .badge{display:inline-block;padding:6px 8px;border-radius:999px;background:rgba(194,139,110,0.12);color:var(--accent-dark);font-weight:700;margin-bottom:8px}
// @media(max-width:900px){.hero{grid-template-columns:1fr;}.detail{grid-template-columns:1fr}}
// `;

// function injectCSS(){
//   if (!document.getElementById("tanvi-styles")){
//     const s = document.createElement('style');
//     s.id = "tanvi-styles";
//     s.innerHTML = CSS;
//     document.head.appendChild(s);
//   }
// }

// // Toast hook
// function useToast(){
//   const [msg, setMsg] = useState(null);
//   useEffect(()=>{
//     if (!msg) return;
//     const t = setTimeout(()=> setMsg(null), 2600);
//     return ()=> clearTimeout(t);
//   }, [msg]);
//   return { msg, show: (m)=> setMsg(m) };
// }

// // Header component
// function Header({cartCount, onSearch}){
//   return (
//     <header className="header">
//       <div className="brand">
//         <div className="logo">TS</div>
//         <div>
//           <div style={{fontWeight:800,fontSize:18}}>TANVI SKINCARE</div>
//           <div style={{fontSize:12,color:'var(--muted)'}}>High‑end skincare collection</div>
//         </div>
//       </div>

//       <div className="search"><input placeholder="Search products, e.g. cleansers" onChange={(e)=> onSearch(e.target.value)} /></div>

//       <nav className="nav">
//         <Link to="/">Home</Link>
//         <Link to="/products">Products</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//       </nav>

//       <div className="controls">
//         <Link to="/checkout" className="cart-btn" title="View cart">
//           <span style={{fontWeight:700}}>Checkout</span>
//           <span className="cart-count">{cartCount}</span>
//         </Link>
//       </div>
//     </header>
//   );
// }

// function Home({onAddToCart}){
//   return (
//     <div>
//       <div className="hero-card">
//         <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
//           <div>
//             <h1 className="h-title">Clean. Luxurious. Tanvi.</h1>
//             <p className="h-sub">A modern high-end skincare mockup — curated products for glow, hydration, and balance.</p>
//             <Link to="/products" className="cta">Shop the Collection</Link>
//             <div className="small-note">Free shipping on orders above $50. Trusted by enthusiasts worldwide.</div>
//           </div>
//           <img src="https://via.placeholder.com/380x300?text=Tanvi+Hero" alt="hero" style={{borderRadius:12}}/>
//         </div>
//       </div>

//       <section style={{marginTop:18}}>
//         <h3 style={{margin:'12px 0'}}>Featured Products</h3>
//         <div className="grid">
//           {PRODUCTS.slice(0,8).map(p => (
//             <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// function ProductCard({product, onAddToCart}){
//   return (
//     <div className="card">
//       <Link to={`/product/${product.id}`} style={{textDecoration:'none',color:'inherit'}}>
//         <img src={product.image} alt={product.name} />
//       </Link>
//       <h4>{product.name}</h4>
//       <p className="small-note">{product.short}</p>
//       <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
//         <div className="price">${product.price}</div>
//         <div className="card-actions">
//           <button className="btn btn-outline" onClick={()=> onAddToCart(product)}>Add</button>
//           <Link to={`/product/${product.id}`} className="btn btn-primary">View</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Products({search, onAddToCart}){
//   const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes((search||"").toLowerCase()) || p.short.toLowerCase().includes((search||"").toLowerCase()));
//   return (
//     <div>
//       <h2 style={{marginTop:0}}>Products</h2>
//       <div className="grid">
//         {filtered.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
//       </div>
//     </div>
//   );
// }

// function ProductDetail({onAddToCart}){
//   const { id } = useParams();
//   const nav = useNavigate();
//   const p = PRODUCTS.find(x => x.id === id);
//   if (!p) return <div className="about-card">Product not found.</div>;

//   return (
//     <div className="detail">
//       <div>
//         <img src={p.image} alt={p.name} />
//       </div>
//       <div className="meta">
//         <div className="badge">Luxury</div>
//         <h2>{p.name}</h2>
//         <div className="small-note">${p.price}</div>
//         <p style={{marginTop:12}}>{p.long}</p>
//         <div style={{marginTop:12,display:'flex',gap:12}}>
//           <button className="btn btn-primary" onClick={()=>{ onAddToCart(p); }}>Add to Cart</button>
//           <button className="btn btn-outline" onClick={()=>{ onAddToCart(p); nav('/checkout', { state: { buyNow: p } }); }}>Buy Now</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function About(){
//   return (
//     <div className="about-card">
//       <h2>About TANVI SKINCARE</h2>
//       <p className="small-note">TANVI SKINCARE is a conceptual high-end brand mockup created for presentation purposes. The designs showcase modern UI, product displays, and smooth front-end interactions without a backend.</p>
//       <p style={{marginTop:12}}>Owner: <strong>AMEY AHER</strong></p>
//     </div>
//   );
// }

// function Contact(){
//   return (
//     <div className="contact-card">
//       <h2>Contact Us</h2>
//       <p className="small-note">Have a question or want to collaborate? Drop a message below (mock form).</p>
//       <form onSubmit={(e)=>{e.preventDefault(); alert('Form submitted (mock)')}}>
//         <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
//           <input placeholder="Your name" />
//           <input placeholder="Your email" />
//           <input style={{gridColumn:'1/-1'}} placeholder="Subject" />
//           <textarea style={{gridColumn:'1/-1'}} placeholder="Message" rows={5}></textarea>
//         </div>
//         <button className="btn btn-primary" style={{marginTop:10}}>Send Message</button>
//       </form>
//     </div>
//   );
// }

// function Checkout({cartItems, onClear, locationState}){
//   const total = cartItems.reduce((s,i)=> s + Number(i.price), 0).toFixed(2);
//   return (
//     <div className="checkout-card">
//       <h2>Checkout</h2>
//       {cartItems.length===0 ? (
//         <div className="small-note">Your cart is empty. Click products to add them.</div>
//       ) : (
//         <div>
//           <ul>
//             {cartItems.map((c,idx)=> (
//               <li key={idx} style={{marginBottom:8}}>{c.name} — ${c.price}</li>
//             ))}
//           </ul>
//           <div style={{fontWeight:800}}>Total: ${total}</div>
//           <div style={{marginTop:12}}>
//             <button className="btn btn-primary" onClick={()=>{ alert('Mock purchase completed — thank you!'); onClear(); }}>Place Order</button>
//             <button className="btn btn-outline" style={{marginLeft:8}} onClick={onClear}>Clear Cart</button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default function App(){
//   injectCSS();
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState([]);
//   const [search, setSearch] = useState('');
//   const toast = useToast();

//   useEffect(()=>{
//     // initial small animation or welcome
//     // show welcome toast once
//     toast.show('Welcome to TANVI SKINCARE mockup');
//   }, []);

//   function handleAddToCart(product){
//     setCartCount(c=> c+1);
//     setCartItems(items => [product, ...items]);
//     toast.show(`${product.name} added to cart`);
//   }

//   function handleClear(){ setCartCount(0); setCartItems([]); toast.show('Cart cleared'); }

//   return (
//     <BrowserRouter>
//       <Header cartCount={cartCount} onSearch={setSearch} />
//       <main className="container">
//         <Routes>
//           <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
//           <Route path="/products" element={<Products search={search} onAddToCart={handleAddToCart} />} />
//           <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/checkout" element={<Checkout cartItems={cartItems} onClear={handleClear} />} />
//           <Route path="*" element={<div className="about-card">Page not found</div>} />
//         </Routes>

//         <div className={`toast ${toast.msg ? 'show' : ''}`} role="status">{toast.msg || ''}</div>

//         <footer className="footer">
//           <div>
//             <div style={{fontWeight:800}}>TANVI SKINCARE</div>
//             <div className="small-note">Owner: AMEY AHER</div>
//           </div>
//           <div style={{textAlign:'right'}}>
//             <div>© {new Date().getFullYear()} TANVI GROUP OF INDUSTRIES PVT. LTD.</div>
//             <div className="small-note">Mockup created for presentation purposes.</div>
//           </div>
//         </footer>
//       </main>
//     </BrowserRouter>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import "./styles.css";

/**
 * TANVI SKINCARE - Single-file app component (routing via hash)
 * - Hash routes:
 *    #/           -> home
 *    #/products   -> products listing
 *    #/product/<id> -> product detail
 *    #/cart       -> cart page
 *    #/about
 *    #/contact
 *    #/checkout
 *
 * Notes:
 * - First 9 products use the 9 Pexels image links user provided.
 * - No backend. Add-to-cart simulated in front-end state.
 * - Uses hash-based navigation so no react-router dependency required.
 */

/* ------------------------- image links (user-provided 9) ------------------------- */
const REAL_IMAGES = [
  "https://images.pexels.com/photos/6635922/pexels-photo-6635922.jpeg",
  "https://images.pexels.com/photos/34718060/pexels-photo-34718060.jpeg",
  "https://images.pexels.com/photos/28277127/pexels-photo-28277127.jpeg",
  "https://images.pexels.com/photos/2639947/pexels-photo-2639947.jpeg",
  "https://images.pexels.com/photos/7290657/pexels-photo-7290657.jpeg",
  "https://images.pexels.com/photos/19577602/pexels-photo-19577602.jpeg",
  "https://images.pexels.com/photos/13599849/pexels-photo-13599849.jpeg",
  "https://images.pexels.com/photos/7810572/pexels-photo-7810572.jpeg",
  "https://images.pexels.com/photos/26093503/pexels-photo-26093503.jpeg",
];

/* ------------------------- product data (35+ items) ------------------------- */
const PRODUCTS = [
  {
    id: "p1",
    name: "Tanvi's L’Oréal Paris Age Perfect Facial Day Cream SPF 15",
    price: 24.99,
    desc:
      "A moisturizing cream that firms and softens skin. Contains SPF 15 for daily sun protection. Ideal for mature skin to enhance radiance and hydration.",
    img: REAL_IMAGES[0],
  },
  {
    id: "p2",
    name: "Tanvi's AVON Anew Ultimate Multi-Performance",
    price: 29.99,
    desc:
      "Fades dark spots and firms skin for a youthful look. Hydrates deeply and boosts skin radiance. Suitable for all skin types.",
    img: REAL_IMAGES[1],
  },
  {
    id: "p3",
    name: "Tanvi's Olay Regenerist Micro-Sculpting Cream SPF 30",
    price: 34.99,
    desc:
      "Provides intense moisture and sun protection. Helps smooth skin texture and reduce wrinkles. Fast-absorbing, non-greasy formula.",
    img: REAL_IMAGES[2],
  },
  {
    id: "p4",
    name: "Tanvi's RoC Multi Correxion 5-in-1 Anti-Aging Moisturizer",
    price: 27.5,
    desc:
      "Reduces wrinkles and firms skin visibly. Protects skin while improving texture. Gentle formula ideal for daily use.",
    img: REAL_IMAGES[3],
  },
  {
    id: "p5",
    name: "Tanvi's Olay Regenerist Retinol24 Night Moisturizer",
    price: 39.99,
    desc:
      "Softens and hydrates skin overnight. Enhances skin firmness and brightness. Contains retinol for anti-aging benefits.",
    img: REAL_IMAGES[4],
  },
  {
    id: "p6",
    name: "Tanvi's No7 Protect & Perfect Intense Advanced Serum",
    price: 33.0,
    desc:
      "Smooths fine lines and firms skin. Minimizes pores and improves texture. Lightweight serum for daily application.",
    img: REAL_IMAGES[5],
  },
  {
    id: "p7",
    name: "Tanvi's NEOSTRATA Triple Firming Anti-Aging Neck Cream",
    price: 42.0,
    desc:
      "Targets fine lines and wrinkles on the neck. Firms and tightens skin texture. Clinical-grade ingredients for visible results.",
    img: REAL_IMAGES[6],
  },
  {
    id: "p8",
    name: "Tanvi's Mary Kay Clear Proof Deep-Cleansing Charcoal Mask",
    price: 18.5,
    desc:
      "Purifies and detoxifies skin deeply. Controls oil and reduces shine. Gentle mask that does not over-dry.",
    img: REAL_IMAGES[7],
  },
  {
    id: "p9",
    name: "Tanvi's SUM37 LosecSumma Repair Cream",
    price: 55.0,
    desc:
      "Repair cream with natural fermentation for skin vitality. Boosts skin resilience and moisture. Suitable for sensitive skin.",
    img: REAL_IMAGES[8],
  },
  /* rest use placeholders; you can replace with real links later */
  { id: "p10", name: "Tanvi's SUM37 Time Energy Bright Cream", price: 48, desc: "Brightens and revitalizes dull skin.", img: "https://via.placeholder.com/600x600.png?text=SUM37+Bright" },
  { id: "p11", name: "Tanvi's CeraVe Healing Ointment", price: 12.99, desc: "Intense hydration for dry, cracked skin.", img: "https://via.placeholder.com/600x600.png?text=CeraVe+Ointment" },
  { id: "p12", name: "Tanvi's Neutrogena Hydro Boost Water Gel", price: 19.5, desc: "Lightweight water-gel hydration.", img: "https://via.placeholder.com/600x600.png?text=Hydro+Boost" },
  { id: "p13", name: "Tanvi's Glossier Boy Brow", price: 16.0, desc: "Defines and shapes brows naturally.", img: "https://via.placeholder.com/600x600.png?text=Boy+Brow" },
  { id: "p14", name: "Tanvi's Drunk Elephant Babyfacial", price: 80, desc: "At-home exfoliating treatment.", img: "https://via.placeholder.com/600x600.png?text=Babyfacial" },
  { id: "p15", name: "Tanvi's Papaya & Niacinamide Serum", price: 22, desc: "Brightens skin and reduces dark spots.", img: "https://via.placeholder.com/600x600.png?text=Papaya+Serum" },
  { id: "p16", name: "Tanvi's Sunscreen Serum SPF 50+", price: 26.99, desc: "Hydrating high-SPF serum.", img: "https://via.placeholder.com/600x600.png?text=SPF+50" },
  { id: "p17", name: "Tanvi's Green Tea HydraDetox Mist", price: 14.5, desc: "Refreshes and revitalizes skin.", img: "https://via.placeholder.com/600x600.png?text=Green+Tea+Mist" },
  { id: "p18", name: "Tanvi's Green Tea Face Serum", price: 20, desc: "Tightens pores and brightens.", img: "https://via.placeholder.com/600x600.png?text=Green+Tea+Serum" },
  { id: "p19", name: "Tanvi's Herbivore Glow Serum", price: 38, desc: "Antioxidant rich glow serum.", img: "https://via.placeholder.com/600x600.png?text=Herbivore+Glow" },
  { id: "p20", name: "Tanvi's Fresh Black Tea Serum", price: 62, desc: "Combats signs of aging.", img: "https://via.placeholder.com/600x600.png?text=Black+Tea+Serum" },
  { id: "p21", name: "Tanvi's The Inkey List Niacinamide", price: 9.99, desc: "Reduces inflammation and blemishes.", img: "https://via.placeholder.com/600x600.png?text=Niacinamide" },
  { id: "p22", name: "Tanvi's La Roche-Posay Effaclar", price: 24, desc: "Targets acne & blemishes.", img: "https://via.placeholder.com/600x600.png?text=Effaclar" },
  { id: "p23", name: "Tanvi's Tatcha Dewy Skin Cream", price: 68, desc: "Hydrates and imparts luminous glow.", img: "https://via.placeholder.com/600x600.png?text=Tatcha+Dewy" },
  { id: "p24", name: "Tanvi's O3+ Hydrating Cream", price: 21, desc: "Boosts hydration and nourishes skin.", img: "https://via.placeholder.com/600x600.png?text=O3+Cream" },
  { id: "p25", name: "Tanvi's Clinique Moisture Surge", price: 47, desc: "72-hour auto-replenishing hydrator.", img: "https://via.placeholder.com/600x600.png?text=Clinique+MS" },
  { id: "p26", name: "Tanvi's Kiehl’s Ultra Facial Cream", price: 39, desc: "Lightweight all-day hydration.", img: "https://via.placeholder.com/600x600.png?text=Kiehls+Ultra" },
  { id: "p27", name: "Tanvi's Neutrogena Rapid Wrinkle Repair", price: 29.99, desc: "Retinol serum for fine lines.", img: "https://via.placeholder.com/600x600.png?text=Rapid+Wrinkle" },
  { id: "p28", name: "Tanvi's Cetaphil Gentle Cleanser", price: 11.5, desc: "Mild cleanser for sensitive skin.", img: "https://via.placeholder.com/600x600.png?text=Cetaphil" },
  { id: "p29", name: "Tanvi's Bioderma Sensibio H2O", price: 15.5, desc: "Micellar water for gentle cleansing.", img: "https://via.placeholder.com/600x600.png?text=Bioderma" },
  { id: "p30", name: "Tanvi's The Ordinary Hyaluronic Acid 2% + B5", price: 7.99, desc: "Hydrates and plumps skin.", img: "https://via.placeholder.com/600x600.png?text=Hyaluronic+B5" },
  { id: "p31", name: "Tanvi's Laneige Water Sleeping Mask", price: 28, desc: "Overnight hydration boost.", img: "https://via.placeholder.com/600x600.png?text=Laneige+Mask" },
  { id: "p32", name: "Tanvi's Dr. Jart+ Cicapair", price: 49, desc: "Calms redness and repairs skin barrier.", img: "https://via.placeholder.com/600x600.png?text=Cicapair" },
  { id: "p33", name: "Tanvi's Paula’s Choice 2% BHA", price: 30, desc: "Exfoliates inside the pores for clear skin.", img: "https://via.placeholder.com/600x600.png?text=BHA+2%" },
  { id: "p34", name: "Tanvi's Elizabeth Arden Eight Hour Cream", price: 24.5, desc: "Multi-purpose balm for hydration.", img: "https://via.placeholder.com/600x600.png?text=Eight+Hour" },
  { id: "p35", name: "Tanvi's Garnier Moisture Bomb", price: 12, desc: "Instant hydration and antioxidant protection.", img: "https://via.placeholder.com/600x600.png?text=Moisture+Bomb" },
  { id: "p36", name: "Tanvi's La Mer Crème de la Mer", price: 320, desc: "Luxurious moisturizing and restorative cream.", img: "https://via.placeholder.com/600x600.png?text=La+Mer" },
  { id: "p37", name: "Tanvi's Sunday Riley Good Genes", price: 88, desc: "Brightens and resurfaces skin texture.", img: "https://via.placeholder.com/600x600.png?text=Good+Genes" }
];

/* -------------------------- small helpers ------------------------- */
function getHashRoute() {
  // Returns { route: "home"|"products"|... , param: optional }
  const hash = window.location.hash || "#/";
  const clean = hash.replace(/^#/, "");
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) return { route: "home" };
  if (parts[0] === "product") return { route: "product", param: parts[1] || null };
  return { route: parts[0] };
}

/* -------------------------- main App ------------------------- */
export default function App() {
  const [routeInfo, setRouteInfo] = useState(getHashRoute());
  const [cart, setCart] = useState([]); // array of {id, qty}
  const [toast, setToast] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderTimer = useRef(null);

  // update route on hash change
  useEffect(() => {
    const onHash = () => setRouteInfo(getHashRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // slider autoplay
  useEffect(() => {
    sliderTimer.current = setInterval(() => {
      setSliderIndex((s) => (s + 1) % REAL_IMAGES.length);
    }, 3500);
    return () => clearInterval(sliderTimer.current);
  }, []);

  // toast auto-clear
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const navigate = (hash) => {
    window.location.hash = hash;
  };

  const addToCart = (productId) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === productId);
      if (found) {
        return prev.map((p) => (p.id === productId ? { ...p, qty: p.qty + 1 } : p));
      } else {
        return [...prev, { id: productId, qty: 1 }];
      }
    });
    setToast("Added to cart");
    // little cart pulse animation
    const cartEl = document.querySelector(".nav-cart");
    if (cartEl) {
      cartEl.classList.remove("pulse");
      // force reflow
      void cartEl.offsetWidth;
      cartEl.classList.add("pulse");
    }
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => prev.map((p) => (p.id === productId ? { ...p, qty } : p)));
  };

  const totalCount = cart.reduce((s, it) => s + it.qty, 0);
  const totalAmount = cart.reduce((s, it) => {
    const product = PRODUCTS.find((p) => p.id === it.id);
    return s + (product ? product.price * it.qty : 0);
  }, 0);

  // helpers to get product details
  const productById = (id) => PRODUCTS.find((p) => p.id === id);
  const productIndexForFront = (i) => PRODUCTS[i % PRODUCTS.length];

  /* ----------- Render small components ----------- */
  const Header = () => (
    <header className="site-header">
      <div className="brand" onClick={() => navigate("/")}>
        <div className="brand-mark">T</div>
        <div className="brand-text">
          <div className="brand-name">TANVI SKINCARE</div>
          <div className="brand-sub">High-Beauty & Care</div>
        </div>
      </div>

      <nav className="site-nav">
        <button className={`nav-link ${routeInfo.route === "home" ? "active" : ""}`} onClick={() => navigate("/")}>Home</button>
        <button className={`nav-link ${routeInfo.route === "products" ? "active" : ""}`} onClick={() => navigate("/products")}>Products</button>
        <button className={`nav-link ${routeInfo.route === "about" ? "active" : ""}`} onClick={() => navigate("/about")}>About</button>
        <button className={`nav-link ${routeInfo.route === "contact" ? "active" : ""}`} onClick={() => navigate("/contact")}>Contact</button>
      </nav>

      <div className="nav-actions">
        <button className="btn-ghost" onClick={() => navigate("/products")}>Shop</button>
        <button className="btn-cart" onClick={() => navigate("/cart")}>
          <span className="nav-cart">🛒 <span className="cart-count">{totalCount}</span></span>
        </button>
      </div>
    </header>
  );

  /* ----------- Pages ----------- */
  const HomePage = () => (
    <section className="page home-page">
      <div className="hero">
        <div className="hero-left">
          <h1>Glow with Confidence</h1>
          <p className="lead">Curated skincare essentials—science driven, beautifully presented.</p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => navigate("/products")}>Shop All Products</button>
            <button className="btn-ghost" onClick={() => navigate("/about")}>About Us</button>
          </div>

          <div className="feature-strip">
            <div className="feature">
              <strong>Free</strong>
              <span>shipping over ₹999</span>
            </div>
            <div className="feature">
              <strong>Natural</strong>
              <span>and clinical blends</span>
            </div>
            <div className="feature">
              <strong>Trusted</strong>
              <span>by thousands</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="slider">
            {REAL_IMAGES.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`slide-${i}`}
                className={`slide ${i === sliderIndex ? "active" : ""}`}
                loading="lazy"
              />
            ))}

            <div className="slider-controls">
              {REAL_IMAGES.map((_, i) => (
                <button key={i} className={`dot ${i === sliderIndex ? "on" : ""}`} onClick={() => setSliderIndex(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section head">
        <h2>Featured Products</h2>
        <p className="muted">Curated picks from our collection</p>
        <div className="featured-grid">
          {PRODUCTS.slice(0, 8).map((p) => (
            <article className="prod-card" key={p.id}>
              <div className="img-wrap" onClick={() => navigate(`/product/${p.id}`)}>
                <img src={p.img} alt={p.name} />
              </div>
              <div className="prod-info">
                <h3>{p.name}</h3>
                <div className="price">₹{p.price.toFixed(2)}</div>
                <div className="prod-actions">
                  <button className="btn-sm" onClick={() => addToCart(p.id)}>Add to Cart</button>
                  <button className="btn-link" onClick={() => { navigate(`/product/${p.id}`); }}>View</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  const ProductsPage = () => {
    const [q, setQ] = useState("");
    const [sort, setSort] = useState("");
    const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return 0;
      });

    return (
      <section className="page products-page">
        <div className="list-header">
          <div>
            <h2>All Products</h2>
            <p className="muted">Explore our curated collection</p>
          </div>
          <div className="filters">
            <input placeholder="Search product..." value={q} onChange={(e) => setQ(e.target.value)} />
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Sort</option>
              <option value="low">Price: low → high</option>
              <option value="high">Price: high → low</option>
            </select>
          </div>
        </div>

        <div className="catalog-grid">
          {filtered.map((p) => (
            <div className="catalog-card" key={p.id}>
              <div className="catalog-img" onClick={() => navigate(`/product/${p.id}`)}>
                <img src={p.img} alt={p.name} />
              </div>
              <div className="catalog-body">
                <h3>{p.name}</h3>
                <p className="muted small">{p.desc}</p>
                <div className="row">
                  <div className="price">₹{p.price.toFixed(2)}</div>
                  <div className="actions">
                    <button className="btn-sm" onClick={() => addToCart(p.id)}>Add</button>
                    <button className="btn-link" onClick={() => navigate(`/product/${p.id}`)}>Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const ProductDetailPage = ({ id }) => {
    const p = productById(id);
    if (!p) return <section className="page"><h2>Product not found</h2></section>;

    return (
      <section className="page detail-page">
        <div className="detail-grid">
          <div className="left">
            <img className="detail-image" src={p.img} alt={p.name} />
          </div>
          <div className="right">
            <h2>{p.name}</h2>
            <div className="price big">₹{p.price.toFixed(2)}</div>
            <p className="muted">{p.desc}</p>

            <div className="detail-actions">
              <button className="btn-primary" onClick={() => addToCart(p.id)}>Add to Cart</button>
              <button className="btn-ghost" onClick={() => { addToCart(p.id); navigate("/checkout"); }}>Buy Now</button>
            </div>

            <div className="meta-card">
              <h4>Details</h4>
              <ul>
                <li>Skin type: All / Targeted</li>
                <li>Use: As directed</li>
                <li>Net: Demo 50ml</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const CartPage = () => {
    return (
      <section className="page cart-page">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty — add items to simulate checkout.</p>
            <button className="btn-primary" onClick={() => navigate("/products")}>Shop Now</button>
          </div>
        ) : (
          <div className="cart-wrap">
            <div className="cart-items">
              {cart.map((it) => {
                const prod = productById(it.id);
                return (
                  <div className="cart-item" key={it.id}>
                    <img src={prod.img} alt={prod.name} />
                    <div className="ci-body">
                      <h4>{prod.name}</h4>
                      <div className="muted small">{prod.desc}</div>
                      <div className="ci-controls">
                        <div className="qty">
                          <button onClick={() => updateQty(it.id, it.qty - 1)}>-</button>
                          <span>{it.qty}</span>
                          <button onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
                        </div>
                        <div className="ci-price">₹{(prod.price * it.qty).toFixed(2)}</div>
                      </div>
                    </div>
                    <button className="remove" onClick={() => removeFromCart(it.id)}>✕</button>
                  </div>
                );
              })}
            </div>

            <aside className="cart-side">
              <div className="summary">
                <h3>Order Summary</h3>
                <div className="row between"><span>Items</span><strong>{totalCount}</strong></div>
                <div className="row between"><span>Total</span><strong>₹{totalAmount.toFixed(2)}</strong></div>
                <button className="btn-primary" onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
              </div>
            </aside>
          </div>
        )}
      </section>
    );
  };

  const AboutPage = () => (
    <section className="page about-page">
      <h2>About TANVI SKINCARE</h2>
      <p className="muted">Owned by <strong>AMEY AHER</strong>. TANVI GROUP OF INDUSTRIES PVT. LTD. — curated luxury & science-driven skincare.</p>
      <div className="cards">
        <div className="info-card">
          <h4>Mission</h4>
          <p>Make premium skincare accessible in a refined & trusted way.</p>
        </div>
        <div className="info-card">
          <h4>Philosophy</h4>
          <p>Blend clinical actives with gentle botanicals for visible results.</p>
        </div>
      </div>
    </section>
  );

  const ContactPage = () => (
    <section className="page contact-page">
      <h2>Contact Us</h2>
      <div className="contact-grid">
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setToast("Message sent (mock)"); }}>
          <input placeholder="Name" required />
          <input placeholder="Email" type="email" required />
          <textarea placeholder="Message" rows="5" required />
          <button className="btn-primary" type="submit">Send</button>
        </form>
        <div className="contact-info">
          <h4>Customer Care</h4>
          <p>Email: support@tanvi.example</p>
          <p>Phone: +91 90000 00000</p>
          <p>Address: Mumbai (demo)</p>
        </div>
      </div>
    </section>
  );

  const CheckoutPage = () => (
    <section className="page checkout-page">
      <h2>Checkout (mock)</h2>
      <p className="muted">This is a front-end mockup only — no real payment integration.</p>
      <div className="checkout-box">
        <div className="left">
          <h3>Shipping Info</h3>
          <input placeholder="Full name" />
          <input placeholder="Address" />
          <input placeholder="City, State, ZIP" />
        </div>
        <div className="right">
          <h3>Payment</h3>
          <input placeholder="Cardholder name" />
          <input placeholder="Card number" />
          <div className="row">
            <input placeholder="MM/YY" />
            <input placeholder="CVC" />
          </div>
          <button className="btn-primary">Place Order (mock)</button>
        </div>
      </div>
    </section>
  );

  /* ------------------- main render switch ------------------- */
  const { route, param } = routeInfo;
  return (
    <div className="app">
      <Header />
      <main className="main">
        {route === "home" && <HomePage />}
        {route === "products" && <ProductsPage />}
        {route === "product" && param && <ProductDetailPage id={param} />}
        {route === "cart" && <CartPage />}
        {route === "about" && <AboutPage />}
        {route === "contact" && <ContactPage />}
        {route === "checkout" && <CheckoutPage />}
        {!["home","products","product","cart","about","contact","checkout"].includes(route) && <HomePage />}
      </main>

      <footer className="site-footer">
        <div>Owner: AMEY AHER • © {new Date().getFullYear()} TANVI GROUP OF INDUSTRIES PVT. LTD.</div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
