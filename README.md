# GISA BLACK EDITION — Phase 2 + Phase 3

Bu paket Gisa Kimya için premium vitrin + admin kontrollü içerik/görsel yönetimi + GitHub/Vercel yayın akışı olarak hazırlanmıştır.

## Tek seferde yükleme

1. ZIP içindeki dosyaları GitHub reposunun kök dizinine yükle.
2. Vercel’de yeni proje oluştur ve GitHub reposunu bağla.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy sonrası admin: `/admin/cms`

## Admin mantığı

- Yazılar `content/*.json` dosyalarından gelir.
- Görseller `public/uploads` içine yüklenir.
- Admin panel GitHub API ile dosya günceller.
- GitHub değişince Vercel otomatik deploy eder.

## Phase 2 eklenenler

- Şifreli admin kapısı
- JSON içerik editörü
- Görsel yükleme ve yol kopyalama
- GitHub API commit sistemi
- Vercel otomatik deploy mantığı
- Akıllı sektör/koku seçici
- AI mockup demo alanı
- Analytics, SEO, Sentry, Cloudflare, SASSOS hazırlık alanları

## Phase 3 eklenenler

- Quote Studio: teklif brief önizleme
- Form webhook altyapısı: `site.sassosWebhook` doluysa CRM/SASSOS’a POST eder
- WhatsApp fallback: webhook yoksa talebi WhatsApp metnine çevirir
- Deployment OS bölümü: müşteriye gösterilecek operasyon akışı
- Admin hızlı içerik şablonları
- CI içinde JSON validate + build kontrolü

## Güvenlik

Statik admin kapısı gerçek backend auth değildir. Canlıda şunlardan biri önerilir:

- Vercel Deployment Protection
- Cloudflare Access
- Backend auth / SASSOS auth

Admin şifresi `ADMIN_NOTES.txt` içindedir.

## BLACK EDITION EXPANDED
Luxury showroom infrastructure activated.
