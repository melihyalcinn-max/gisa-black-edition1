import Link from 'next/link';
export default function Page(){ const tools=[['Logo Mockup','/ai-logo-mockup','Logo yükle, ürün üzerinde önizle.'],['Katalog Metni','/ai-copy-studio','Katalog, story ve WhatsApp metni üret.'],['Koku Danışmanı','/ai-scent-advisor','Konsepte göre koku ailesi öner.'],['SEO Motoru','/ai-seo-engine','Başlık, meta ve anahtar kelime üret.'],['WhatsApp Asistanı','/whatsapp-assistant','Müşteri mesajına satış cevabı hazırla.']]; return <main style={page}><section style={wrap}><p style={{color:'#c8a96a',letterSpacing:'.22em',textTransform:'uppercase'}}>GISA AI Studio</p><h1 style={h1}>Akıllı satış araçları.</h1><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:18}}>{tools.map(([t,h,d])=><Link key={h} href={h} style={{...card,color:'#f7f2e8',textDecoration:'none',display:'block'}}><h2>{t}</h2><p style={{color:'#b8afa3'}}>{d}</p></Link>)}</div></section></main>}

const page={minHeight:'100vh',background:'#070707',color:'#f7f2e8',padding:'56px 24px'};
const wrap={maxWidth:1080,margin:'0 auto'};
const h1={fontFamily:'Georgia,serif',fontSize:'clamp(42px,6.2vw,88px)',lineHeight:.92,fontWeight:400,margin:'12px 0 28px'};
const card={border:'1px solid rgba(200,169,106,.24)',borderRadius:24,background:'linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02))',padding:24};
const input={width:'100%',padding:'13px 14px',borderRadius:14,border:'1px solid rgba(200,169,106,.25)',background:'#0b0b0b',color:'#f7f2e8',margin:'8px 0 14px'};
const btn={border:0,borderRadius:999,padding:'13px 19px',background:'#c8a96a',color:'#090909',fontWeight:700,cursor:'pointer'};
