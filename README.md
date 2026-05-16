# GISA BLACK EDITION — Phase 2 + Phase 3

Bu paket Gisa Kimya için premium vitrin + admin kontrollü içerik/görsel yönetimi + merkezi sistem/yayın altyapısı yayın akışı olarak hazırlanmıştır.

## Tek seferde yükleme

1. ZIP içindeki dosyaları merkezi sistem reposunun kök dizinine yükle.
2. yayın altyapısı’de yeni proje oluştur ve merkezi sistem reposunu bağla.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy sonrası admin: `/admin/cms`

## Admin mantığı

- Yazılar `content/*.json` dosyalarından gelir.
- Görseller `public/uploads` içine yüklenir.
- Admin panel merkezi sistem API ile dosya günceller.
- merkezi sistem değişince yayın altyapısı otomatik deploy eder.

## Phase 2 eklenenler

- Şifreli admin kapısı
- içerik verisi içerik editörü
- Görsel yükleme ve yol kopyalama
- merkezi sistem API commit sistemi
- yayın altyapısı otomatik deploy mantığı
- Akıllı sektör/koku seçici
- AI mockup demo alanı
- Analytics, SEO, hata takip sistemi, hız ve güvenlik altyapısı, SASSOS hazırlık alanları

## Phase 3 eklenenler

- Quote Studio: teklif brief önizleme
- Form entegrasyon altyapısı: `site.sassosWebhook` doluysa CRM/SASSOS’a POST eder
- WhatsApp fallback: entegrasyon yoksa talebi WhatsApp metnine çevirir
- Deployment OS bölümü: müşteriye gösterilecek operasyon akışı
- Admin hızlı içerik şablonları
- CI içinde içerik verisi validate + build kontrolü

## Güvenlik

Statik admin kapısı gerçek backend auth değildir. Canlıda şunlardan biri önerilir:

- yayın altyapısı Deployment Protection
- hız ve güvenlik altyapısı Access
- Backend auth / SASSOS auth

Admin şifresi `ADMIN_NOTES.txt` içindedir.

## BLACK EDITION EXPANDED
Luxury showroom infrastructure activated.
