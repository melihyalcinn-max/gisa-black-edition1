'use client';
import {useState} from 'react';
export default function Page(){const[p,setP]=useState('Matte Black Refillable Dispenser');const[s,setS]=useState('Premium otel');const[out,setOut]=useState('');function gen(){setOut(`KATALOG METNİ
${p}, ${s} alanları için tasarlanmış premium refillable çözümüdür. Mat yüzey hissi, sade formu ve markaya özel logo uygulamasıyla banyolarda güçlü bir marka teması oluşturur.

INSTAGRAM
Misafir deneyimini küçük bir detaydan güçlü bir marka dokunuşuna dönüştürün.

WHATSAPP
Merhaba, ${p} için size özel mockup ve teklif hazırlayabiliriz.`)}return <main style={page}><section style={wrap}><p style={{color:'#c8a96a',letterSpacing:'.22em',textTransform:'uppercase'}}>AI Copy Studio</p><h1 style={h1}>Premium metni hazırla.</h1><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}><div style={card}><input style={input} value={p} onChange={e=>setP(e.target.value)}/><input style={input} value={s} onChange={e=>setS(e.target.value)}/><button style={btn} onClick={gen}>Metin üret</button></div><pre style={{...card,whiteSpace:'pre-wrap'}}>{out||'Metin burada oluşacak.'}</pre></div></section></main>}

const page={minHeight:'100vh',background:'#070707',color:'#f7f2e8',padding:'56px 24px'};
const wrap={maxWidth:1080,margin:'0 auto'};
const h1={fontFamily:'Georgia,serif',fontSize:'clamp(42px,6.2vw,88px)',lineHeight:.92,fontWeight:400,margin:'12px 0 28px'};
const card={border:'1px solid rgba(200,169,106,.24)',borderRadius:24,background:'linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02))',padding:24};
const input={width:'100%',padding:'13px 14px',borderRadius:14,border:'1px solid rgba(200,169,106,.25)',background:'#0b0b0b',color:'#f7f2e8',margin:'8px 0 14px'};
const btn={border:0,borderRadius:999,padding:'13px 19px',background:'#c8a96a',color:'#090909',fontWeight:700,cursor:'pointer'};
