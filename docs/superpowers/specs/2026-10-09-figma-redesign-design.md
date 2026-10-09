# Yadro fizikasi instituti sayti: Figma'da qayta dizayn (spetsifikatsiya)

Sana: 2026-10-09

## Maqsad

Saytni yangi vizual tilda qayta dizayn qilish. Dizayn Figma'da noldan yaratiladi. Kodga o'tkazish bu spetsifikatsiya doirasidan tashqarida, alohida keyingi bosqich.

## Kelishilgan shartlar

- Dizayn manbai: Figma'da noldan yaratiladi (tayyor fayl yo'q).
- Uslub: zamonaviy ilmiy-texnologik, yorug' fon.
- Hajm: dizayn tizimi + Layout + Bosh sahifa + asosiy sahifa shablonlari.
- Qurilmalar: Desktop 1440px va Mobil 390px.
- Funksiya, API va marshrutlar o'zgarmaydi, faqat ko'rinish yangilanadi.
- Logo: faqat asl `logo.png` (70 yillik logo vaqtinchalik, ishlatilmaydi).
- Kod bu bosqichda o'zgarmaydi.

## Joriy holat (muammolar)

- Rang `#013d8c` ~190 joyda to'g'ridan-to'g'ri yozilgan, token yo'q.
- Tipografiya va spacing tizimsiz.
- Container 1540px, juda keng.
- 65 sahifa, ~60 komponent. Stack: React 19, Vite, Tailwind 4, antd 6, uch til (uz/ru/en).

## Vizual til

- Fon: oq va `#F6F8FC`. Kartalar oq, nozik soyali.
- Rang: asosiy `#013d8c`, ikkinchi `#004fb6`, iliq to'q sariq aksent (faqat CTA va belgilar), neytral kulrang shkala.
- To'q seksiyalar: faqat Hero, Statistika, Footer.
- Shrift: Nunito Sans. H1 56/64, H2 40, H3 28, body 16/24.
- Motiv: nozik, ixtiyoriy orbita/atom chiziqlari (Hero va ajratgichlarda).
- Shakl: radius 12/20, 8px spacing tarmog'i, container 1240px.

## Figma fayl tuzilmasi

1. `Foundations`: Variables (rang, spacing, radius), text styles, effektlar.
2. `Components`: Button, Input, Card (yangilik, e'lon, tadbir, xodim), Badge, Breadcrumb, Pagination, Tabs, Header (desktop va mobil menyu), Footer, SectionHeader.
3. `Home`: Hero, Stats, Partners, About, News, Announcements, Events, Gallery, Video, Map. Desktop va mobil.
4. `Templates`: ro'yxat (Yangiliklar), detal (Yangilik/E'lon/Tadbir), Laboratoriyalar + detal (tablar), Hujjatlar/Normativ, Xodimlar/Rahbariyat, Aloqa. Desktop va mobil.

## Jarayon

1. `create_new_file`, keyin `create_session`.
2. Tartib: Foundations, Components, Home, Templates. Dizayn tizimi avval, sahifalar faqat komponentlardan yig'iladi.
3. Har bosqichdan keyin skrinshot bilan tekshiruv va foydalanuvchiga ko'rsatish.
4. Namuna matn va rasm: `src/assets` va `src/locales`dan.

## Muvaffaqiyat mezoni

- Barcha ranglar, shrift va spacing Variables/styles orqali bog'langan (qattiq yozilgan qiymat yo'q).
- Barcha sahifalar komponent instance'laridan yig'ilgan.
- Home va barcha shablonlar desktop va mobil variantda mavjud.
- Foydalanuvchi har bosqichda tasdiqlagan.

## Tashqarida (YAGNI)

- React kodiga o'tkazish (keyingi alohida spec).
- Qolgan ~50 ichki sahifaning alohida dizayni (shablonlardan yig'iladi).
- Animatsiya/prototip oqimlari.
- Yangi funksiya yoki kontent o'zgarishi.

## Xavflar

- Figma MCP serveri oldin `ECONNREFUSED` bergan edi. Plugin serveri `whoami` orqali tekshirildi va ishlaydi. Bo'lmasa, qayta ulanish kerak.
- Haqiqiy kontent API'dan keladi, Figma'da namuna ma'lumot ishlatiladi.
