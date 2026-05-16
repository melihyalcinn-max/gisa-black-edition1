# ChatGPT Assistant Setup

Eklenen route:
- /chatgpt-assistant

Eklenen backend endpoint:
- /api/chatgpt-assistant

yayın altyapısı Environment Variables:
- OPENAI_API_KEY=sk-...
- OPENAI_MODEL=gpt-4.1-mini

Güvenlik:
- API key frontend içine yazılmadı.
- API key sadece yayın altyapısı Environment Variables tarafında tutulmalı.
- API key merkezi sistem'a commit edilmemeli.

Çalışma:
- OPENAI_API_KEY varsa gerçek ChatGPT cevabı döner.
- OPENAI_API_KEY yoksa ücretsiz fallback/template cevap döner.