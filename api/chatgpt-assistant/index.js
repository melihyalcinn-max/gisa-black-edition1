export const config = {
  runtime: 'edge',
};

const SYSTEM_PROMPT = `
Sen GISA Kimya BLACK EDITION dijital satış asistanısın.
Tonun: premium, net, profesyonel, satış odaklı.
Kapsam:
- Otel buklet ürünleri
- Refillable dispenser
- Logo baskılı ürünler
- Koku aileleri
- Numune / teklif süreci
- WhatsApp yönlendirme
Asla kesin stok/fiyat uydurma. Bilgi eksikse adet, ürün tipi, logo baskı ve teslim lokasyonu sor.
Cevapları kısa, güven veren ve teklif almaya yönlendiren şekilde yaz.
`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Only POST allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const message = String(body.message || '').slice(0, 2000);

    if (!message.trim()) {
      return new Response(JSON.stringify({ reply: 'Mesajınızı yazarsanız yardımcı olayım.' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({
        reply: fallbackReply(message),
        mode: 'fallback',
        note: 'OPENAI_API_KEY eklenmediği için ücretsiz template cevap döndü.'
      }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    const openaiRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        input: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message }
        ],
        max_output_tokens: 500
      }),
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      return new Response(JSON.stringify({
        reply: fallbackReply(message),
        mode: 'fallback',
        error: err.slice(0, 500)
      }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    const data = await openaiRes.json();
    const reply =
      data.output_text ||
      data.output?.map(item => item.content?.map(c => c.text).join('')).join('\n') ||
      fallbackReply(message);

    return new Response(JSON.stringify({ reply, mode: 'chatgpt' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({
      reply: 'Şu anda asistan cevabı oluşturulamadı. WhatsApp üzerinden destek alabilirsiniz.',
      error: String(error)
    }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }
}

function fallbackReply(message) {
  return `Merhaba, yardımcı olalım.

GISA Kimya BLACK EDITION tarafında logo baskılı dispenser, refillable sistemler ve premium koku çözümleri için çalışıyoruz.

Size net teklif hazırlayabilmemiz için şu bilgileri paylaşabilir misiniz?
- İlgilendiğiniz ürün tipi
- Yaklaşık adet
- Logo baskı isteği
- Teslimat şehri
- Tercih edilen ürün hacmi

İsterseniz logonuzu paylaşın; size ürün üzerinde örnek mockup ve teklif süreci hazırlayalım.`;
}