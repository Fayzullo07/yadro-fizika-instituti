# Figma Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Yadro fizikasi instituti saytining yangi yorug' ilmiy-texnologik dizaynini Figma'da noldan yaratish: dizayn tizimi, komponentlar, Bosh sahifa va sahifa shablonlari (desktop 1440 va mobil 390).

**Architecture:** Bitta Figma Design fayli, to'rt sahifa: `Foundations`, `Components`, `Home`, `Templates`. Avval Variables va text styles, keyin ular bog'langan komponentlar, oxirida sahifalar faqat komponent instance'laridan yig'iladi. Har vazifa `use_figma` (Plugin API) orqali bajariladi va `get_screenshot` bilan tekshiriladi.

**Tech Stack:** Figma MCP (`plugin_figma_figma`): `create_new_file`, `create_session`, `use_figma`, `get_screenshot`, `get_variable_defs`, `get_metadata`. Skills: `figma:figma-create-new-file`, `figma:figma-use` (har `use_figma` oldidan majburiy), `figma:figma-generate-library` (1-3 vazifa), `figma:figma-generate-design` (4-7 vazifa).

**Spec:** `docs/superpowers/specs/2026-10-09-figma-redesign-design.md`

## Global Constraints

- Uslub: yorug' fon, zamonaviy ilmiy-texnologik.
- Fon: `#FFFFFF` va `#F6F8FC`; kartalar oq, nozik soyali.
- Brend ranglar: `#013D8C` (asosiy), `#004FB6` (ikkinchi); iliq to'q sariq aksent faqat CTA va belgilar uchun.
- To'q seksiyalar faqat Hero, Statistika, Footer.
- Shrift: Nunito Sans. H1 56/64, H2 40, H3 28, body 16/24.
- Radius 12 va 20; spacing 8px tarmog'i; container kengligi 1240px.
- Qurilmalar: Desktop 1440px, Mobil 390px.
- Logo: faqat asl `src/assets/logo.png` (70 yillik logo ishlatilmaydi).
- Barcha rang, shrift, spacing, radius Variables/styles orqali bog'lanadi, qattiq yozilgan qiymat yo'q.
- Kod (`src/`) bu rejada o'zgarmaydi.
- Commit: foydalanuvchi nomidan, Claude attribution'siz, har vazifa uchun alohida commit (faqat `docs/` ichidagi o'zgarish uchun).

## Review Focus

- Uch tilda (uz/ru/en) matn uzunligi farqi: ruscha menyu va tugma matnlari uzunroq. Header va Button uzun matnda sinmasligi kerak (4 va 5-vazifa testi).
- Rasm yo'q yoki yuklanmagan holat (`RetryImage`/skeleton): kartalarda placeholder variant bo'lishi kerak (4-vazifa).
- Bo'sh ro'yxat (`EmptyStatePage`): ro'yxat shablonida bo'sh holat freymi bo'lishi kerak (8-vazifa).
- Juda uzun sarlavha (3+ qator) kartada va detal sahifada kesilishi (4 va 8-vazifa).
- Mobilda gorizontal scroll bo'lmasligi: har mobil freym 390px ichiga sig'ishi (7 va 9-vazifa).

---

## File Structure

Kod fayllari yaratilmaydi. Natijalar:

- Figma fayli: `Yadro fizikasi instituti, Redesign` (URL `docs/superpowers/plans/` ichidagi shu faylga 1-vazifada yoziladi).
- Modify: `docs/superpowers/plans/2026-10-09-figma-redesign.md` (Figma URL va fileKey qo'shiladi).

Figma sahifalari va ularning mas'uliyati:

| Sahifa        | Mazmuni                                                           |
| ------------- | ----------------------------------------------------------------- |
| `Foundations` | Variables, text styles, effect styles va ularning vizual namunasi |
| `Components`  | Barcha qayta ishlatiladigan komponentlar (variantlar bilan)       |
| `Home`        | Bosh sahifa desktop va mobil                                      |
| `Templates`   | Sahifa shablonlari desktop va mobil                               |

---

### Task 1: Figma faylini yaratish va sahifa tuzilmasi

**Files:**

- Modify: `docs/superpowers/plans/2026-10-09-figma-redesign.md` (Figma URL)

**Interfaces:**

- Produces: `FILE_KEY` (string) va `SESSION_ID` (UUID); keyingi barcha vazifalar shularni ishlatadi. Sahifa nomlari aynan: `Foundations`, `Components`, `Home`, `Templates`.

- [ ] **Step 1: Skill'ni yuklash**

`Skill` bilan `figma:figma-create-new-file` ni chaqiring.

- [ ] **Step 2: Fayl yaratish**

`create_new_file` (Design turi), nomi `Yadro fizikasi instituti, Redesign`, jamoa: `team::1303498874677436880` (Pro, Full seat). Natijadagi `fileKey` ni `FILE_KEY` deb saqlang.

- [ ] **Step 3: Sessiya ochish**

`create_session` (`fileKey = FILE_KEY`, vazifa: "Yadro fizikasi instituti saytini qayta dizayn qilish"). Qaytgan UUID ni `SESSION_ID` deb saqlang.

- [ ] **Step 4: Sahifalarni yaratish**

`figma:figma-use` ni yuklang, so'ng `use_figma` bilan:

```js
const names = ['Foundations', 'Components', 'Home', 'Templates'];
const first = figma.root.children[0];
first.name = names[0];
for (const n of names.slice(1)) {
  const p = figma.createPage();
  p.name = n;
}
return figma.root.children.map((p) => p.name);
```

- [ ] **Step 5: Tekshiruv**

`get_metadata` natijasida to'rtta sahifa aynan shu tartibda bo'lishi kerak: `Foundations, Components, Home, Templates`.

- [ ] **Step 6: URL ni yozib commit qilish**

Shu reja faylining oxiriga `## Figma fayli` bo'limini qo'shing (URL va `FILE_KEY`).

```bash
git add docs/superpowers/plans/2026-10-09-figma-redesign.md
git commit -m "docs: record Figma redesign file URL"
```

---

### Task 2: Foundations, Variables, text styles, effect styles

**Files:**

- Figma: sahifa `Foundations`

**Interfaces:**

- Consumes: `FILE_KEY`, `SESSION_ID` (1-vazifa).
- Produces (aynan shu nomlar, keyingi vazifalar ularni bog'laydi):
  - Collection `Color` (Light mode):
    - `brand/950` `#0A1330`, `brand/900` `#012D6A`, `brand/700` `#013D8C`, `brand/600` `#004FB6`, `brand/100` `#DCE8F8`, `brand/50` `#EEF3FB`
    - `accent/600` `#D97706`, `accent/500` `#F59E0B`, `accent/100` `#FEF3C7`
    - `neutral/0` `#FFFFFF`, `neutral/50` `#F6F8FC`, `neutral/100` `#EAEEF5`, `neutral/300` `#C5CDDB`, `neutral/500` `#6B7689`, `neutral/700` `#374155`, `neutral/900` `#101828`
    - `danger/600` `#D92D20`
  - Collection `Space` (FLOAT): `space/1`=4, `space/2`=8, `space/3`=12, `space/4`=16, `space/6`=24, `space/8`=32, `space/12`=48, `space/16`=64, `space/24`=96
  - Collection `Radius` (FLOAT): `radius/md`=12, `radius/lg`=20, `radius/full`=999
  - Text styles (Nunito Sans): `H1` 56/64 Bold, `H2` 40/48 Bold, `H3` 28/36 Bold, `H4` 20/28 SemiBold, `Body/L` 18/28 Regular, `Body/M` 16/24 Regular, `Body/S` 14/20 Regular, `Caption` 12/16 SemiBold, `Button` 16/24 SemiBold
  - Effect styles: `shadow/card` (0 1 2 rgba(16,24,40,0.06) + 0 4 16 rgba(16,24,40,0.08)), `shadow/hover` (0 8 32 rgba(16,24,40,0.14))

- [ ] **Step 1: Skill'larni yuklash**

`figma:figma-use` va `figma:figma-generate-library`.

- [ ] **Step 2: Color variables yaratish**

`use_figma` bilan `figma.variables.createVariableCollection('Color')`, har bir token uchun `createVariable(name, collection, 'COLOR')` va `setValueForMode` (hex ni `{r,g,b}` 0-1 ga o'tkazib).

- [ ] **Step 3: Space va Radius variables**

Xuddi shunday `Space` va `Radius` collection'lari (`FLOAT`).

- [ ] **Step 4: Shriftni tekshirish va text styles**

`figma.loadFontAsync({family:'Nunito Sans', style:'Bold'})` (Regular, SemiBold ham). Agar shrift mavjud bo'lmasa to'xtang va foydalanuvchiga ayting. Shriftni jimgina almashtirmang. Keyin `figma.createTextStyle()` bilan yuqoridagi to'qqiz style.

- [ ] **Step 5: Effect styles**

`figma.createEffectStyle()` bilan `shadow/card` va `shadow/hover`.

- [ ] **Step 6: Foundations sahifasiga namuna freymlarini chizish**

Rang kvadratlari (nomi bilan), text style namunalari, spacing/radius namunalari. Barcha fill'lar variable'ga bog'langan bo'lishi shart (`setBoundVariableForPaint`).

- [ ] **Step 7: Tekshiruv**

`get_variable_defs` qaytargan ro'yxatda yuqoridagi barcha nomlar bor. `get_screenshot` bilan Foundations sahifasini foydalanuvchiga ko'rsating. Foydalanuvchi tasdig'ini kuting. Rang yoki shrift o'zgarsa shu vazifada tuzatiladi.

---

### Task 3: Asosiy komponentlar (Button, Badge, Input, Tabs, Breadcrumb, Pagination)

**Files:**

- Figma: sahifa `Components`

**Interfaces:**

- Consumes: Task 2 dagi barcha variable va style nomlari.
- Produces (component set nomlari va variant property'lari aynan):
  - `Button`: `Variant=Primary|Secondary|Ghost|Accent`, `Size=M|S`, `State=Default|Hover|Disabled`
  - `Badge`: `Tone=Brand|Accent|Neutral`
  - `Input`: `State=Default|Focus|Error|Disabled`
  - `Tabs`: `Item=Active|Inactive` (auto-layout qatori)
  - `Breadcrumb`, `Pagination`: `Page=Current|Other` elementlari

- [ ] **Step 1: Skill'larni yuklash**

`figma:figma-use`, `figma:figma-generate-library`.

- [ ] **Step 2: Button set**

Auto-layout, padding `space/4` va `space/6` (variable bog'langan), radius `radius/md`, matn `Button` style. Primary = fill `brand/700`, matn `neutral/0`. Accent = fill `accent/500`, matn `neutral/900`. Secondary = chegara `brand/700`. Ghost = fill yo'q. Hover/Disabled rang farqlari variable'dan. Uzun matn sinov varianti: "Hujjatlarni yuklab olish va ko'rish" (ruscha: "Скачать и просмотреть документы") sig'ishi uchun `layoutSizingHorizontal = 'HUG'`.

- [ ] **Step 3: Badge, Input, Tabs, Breadcrumb, Pagination**

Har biri auto-layout va variable bog'langan. Input Error holati `danger/600` chegara va `Caption` xabar matni.

- [ ] **Step 4: Tekshiruv**

`get_screenshot` bilan Components sahifasini ko'rsating. Qattiq yozilgan qiymatni qidiring:

```js
const bad = figma.currentPage.findAll(
  (n) =>
    'fills' in n &&
    Array.isArray(n.fills) &&
    n.fills.some((f) => f.type === 'SOLID' && !(n.boundVariables && n.boundVariables.fills))
);
return bad.length;
```

Kutiladigan natija: `0` (matn tugunlarining style orqali berilgan rangi bundan mustasno bo'lsa, sababini yozing). Foydalanuvchi tasdig'ini kuting.

---

### Task 4: Karta komponentlari (News, Announcement, Event, Staff, Gallery tile)

**Files:**

- Figma: sahifa `Components`

**Interfaces:**

- Consumes: `Button`, `Badge` (Task 3), Task 2 variable/style'lari.
- Produces: komponent set `Card/News`, `Card/Announcement`, `Card/Event`, `Card/Staff`, `Tile/Gallery`. Har birida `Image=Photo|Placeholder` variant property'si.

- [ ] **Step 1: Skill'ni yuklash**

`figma:figma-use`.

- [ ] **Step 2: Card/News**

Vertikal auto-layout: rasm (16:9, radius `radius/md` tepada), `Badge` (sana), `H4` sarlavha (maks 3 qator, kesish), `Body/S` qisqa matn, "Batafsil" Ghost tugma. Fill `neutral/0`, effect `shadow/card`, radius `radius/lg`. `Image=Placeholder` variantida rasm o'rniga `neutral/100` fon va ikonka.

- [ ] **Step 3: Card/Announcement, Card/Event, Card/Staff, Tile/Gallery**

Card/Event: chapda sana bloki (`brand/50` fon, kun `H3`, oy `Caption`). Card/Staff: kvadrat/doira foto, ism `H4`, lavozim `Body/S`. Tile/Gallery: rasm va hover qatlami (`brand/950` 40% overlay).

- [ ] **Step 4: Chegara holatlarini tekshirish**

Har kartada 3+ qatorli juda uzun sarlavha nusxasini qo'ying, sarlavha 3 qatordan keyin kesilishi (`textTruncation = 'ENDING'`, `maxLines = 3`) kerak.

- [ ] **Step 5: Tekshiruv**

`get_screenshot`; foydalanuvchi tasdig'ini kuting.

---

### Task 5: Layout komponentlari (Header, mobil menyu, Footer, SectionHeader)

**Files:**

- Figma: sahifa `Components`

**Interfaces:**

- Consumes: Task 2-4 komponent/variable'lari. Menyu tuzilmasi `src/config/menu.ts` dan: `Institut`, `Laboratoriyalar`, `Yangiliklar`, `Ilmiy faoliyat`, `Normativ`, `Ochiq ma'lumotlar`, `Aloqa` (aniq ro'yxatni fayldan o'qing). Til almashtirgich: `UZ | RU | EN`.
- Produces: `Header/Desktop`, `Header/Mobile` (`Menu=Closed|Open`), `Footer/Desktop`, `Footer/Mobile`, `SectionHeader` (`Align=Left|Center`).

- [ ] **Step 1: Menyu ma'lumotini o'qish**

`src/config/menu.ts` va `src/locales/uz/common.json` dan nav matnlarini o'qing; Figma'dagi yorliqlar shu bo'lsin.

- [ ] **Step 2: Header/Desktop**

Balandligi 80, fill `neutral/0`, pastki chegarasi `neutral/100`, container 1240. Chapda asl `logo.png` (Figma'ga `upload_assets` bilan), o'rtada menyu, o'ngda til almashtirgich va qidiruv. Ruscha yorliqlar (`src/locales/ru/common.json`) bilan variant sinab ko'ring: menyu bir qatorga sig'masa, qisqa yorliq yoki "Yana" dropdown rejasini foydalanuvchiga ko'rsating.

- [ ] **Step 3: Header/Mobile va Menu=Open**

390px, logo + burger; ochiq holat to'liq ekran, akkordeon bo'limlar.

- [ ] **Step 4: Footer va SectionHeader**

Footer: fill `brand/950`, 4 ustun (institut, havolalar, aloqa, ijtimoiy tarmoq), `Body/S` matn `neutral/300`, pastki qatorda mualliflik huquqi. Mobilda ustunlar vertikal. SectionHeader: `H2` + ostida 48px aksent chiziq (`accent/500`) + ixtiyoriy "Barchasi" havolasi.

- [ ] **Step 5: Tekshiruv**

`get_screenshot` (desktop va mobil, ochiq menyu ham). Foydalanuvchi tasdig'ini kuting.

---

### Task 6: Bosh sahifa, desktop 1440

**Files:**

- Figma: sahifa `Home`

**Interfaces:**

- Consumes: Task 3-5 komponentlari. Bo'limlar tartibi `src/pages/Home/Home.tsx` dagidek: Hero, Stats, Partners, About, News, Announcements, Events, Gallery, Video, Map (AddressMapSection).
- Produces: freym `Home/Desktop` (1440 x auto).

- [ ] **Step 1: Skill'larni yuklash**

`figma:figma-use`, `figma:figma-generate-design`.

- [ ] **Step 2: Namuna kontent tayyorlash**

`src/assets` dan rasmlar (`institut.png`, `acceleration.jpg`, hamkor logolari: `galgotias.png`, `ordena.png`, `visitech.png`, `mia.png`, `tuyafed.png`) va `src/locales/uz/common.json` dan matnlarni oling; `upload_assets` bilan yuklang.

- [ ] **Step 3: Bo'limlarni bittadan yig'ish**

Har bo'lim alohida `use_figma` chaqiruvi. Tarkib:

- Hero: fill `brand/950`, orbita chiziqlari motivi, `H1` sarlavha, `Accent` tugma.
- Stats: `brand/900`, 4 raqam.
- Partners: `neutral/0` qator.
- About: ikki ustun (matn + rasm).
- News/Announcements/Events/Gallery: `SectionHeader` + kartalar to'ri (`Card/*` instance'lari).
- Video va Map bo'limlari.

Vertikal oraliq bo'limlar orasida `space/24`, bo'limlar fonini `neutral/0` va `neutral/50` navbatlab turing.

- [ ] **Step 4: Tekshiruv**

Har bo'limdan keyin `get_screenshot`. Oxirida butun sahifa; instance'lardan tashqari yo'qligi (xom freym kartalar yo'qligi) tekshiruvi:

```js
const frame = figma.currentPage.findOne((n) => n.name === 'Home/Desktop');
return frame.findAll((n) => n.type === 'INSTANCE').length;
```

Foydalanuvchi tasdig'ini kuting.

---

### Task 7: Bosh sahifa, mobil 390

**Files:**

- Figma: sahifa `Home`

**Interfaces:**

- Consumes: `Home/Desktop` (Task 6), mobil komponent variantlari (Task 5).
- Produces: freym `Home/Mobile` (390 x auto).

- [ ] **Step 1: Mobil bo'limlarni yig'ish**

Kartalar to'ri bitta ustun yoki gorizontal scroll qatori, Hero ixchamroq (`H1` mobilda 36/44; shu qiymat uchun Task 2 ga `H1/Mobile` style qo'shing va 2-vazifa foydalanuvchi tasdig'idan keyin shu yerda yarating).

- [ ] **Step 2: Tekshiruv**

Gorizontal scroll bo'lmasligi: `Home/Mobile` ichidagi har bir tugunning `x + width <= 390` ekanini tekshiring:

```js
const f = figma.currentPage.findOne((n) => n.name === 'Home/Mobile');
return f.findAll(
  (n) =>
    'width' in n &&
    n.absoluteBoundingBox &&
    n.absoluteBoundingBox.x + n.absoluteBoundingBox.width > f.absoluteBoundingBox.x + 390
).length;
```

Kutiladigan natija: `0` (ataylab gorizontal scroll qilinadigan qator ichidagi tugunlar mustasno, ular alohida clip qilingan konteynerda bo'lsin). `get_screenshot` va foydalanuvchi tasdig'i.

---

### Task 8: Sahifa shablonlari, desktop

**Files:**

- Figma: sahifa `Templates`

**Interfaces:**

- Consumes: Task 3-5 komponentlari, `Header/Desktop`, `Footer/Desktop`.
- Produces: freymlar `T/List`, `T/List-Empty`, `T/Detail`, `T/Laboratory`, `T/Documents`, `T/Staff`, `T/Contact` (har biri 1440 x auto).

- [ ] **Step 1: Namunaviy sahifa tarkibini o'qish**

Joriy sahifalardan tuzilmani oling: `src/pages/News/NewsList/NewsList.tsx`, `NewsDetail/NewsDetail.tsx`, `src/pages/Research/Laboratories/Laboratories.tsx` va `tabs/*`, `src/pages/Institute/Documents/Documents.tsx`, `src/pages/Institute/Team/Team.tsx`, `src/pages/Contact/Contact.tsx`.

- [ ] **Step 2: Umumiy sahifa boshi**

Header, `PageTitle` bloki (`brand/50` fon, `Breadcrumb` va `H1`), kontent, Footer.

- [ ] **Step 3: Shablonlarni yig'ish**

- `T/List`: filtr qatori, `Card/News` to'ri, `Pagination`.
- `T/List-Empty`: bo'sh holat (ikonka, matn "Ma'lumot topilmadi", `Secondary` tugma).
- `T/Detail`: katta rasm, `H1`, meta qatori, matn, fayl ilovalari ro'yxati, "Orqaga" tugmasi; 3+ qatorli sarlavha sinovi.
- `T/Laboratory`: `Tabs` (Haqida, Ilmiy faoliyat, Xodimlar, Xalqaro), Staff kartalari.
- `T/Documents`: hujjat qatorlari (PDF ikonka, nom, hajm, yuklab olish).
- `T/Staff`: `Card/Staff` to'ri.
- `T/Contact`: aloqa ma'lumotlari, forma (`Input`, `Button`), xarita bloki.

- [ ] **Step 4: Tekshiruv**

Har shablonda `get_screenshot`, instance sanash (6-vazifadagi usul) va foydalanuvchi tasdig'i.

---

### Task 9: Sahifa shablonlari, mobil

**Files:**

- Figma: sahifa `Templates`

**Interfaces:**

- Consumes: Task 8 shablonlari, `Header/Mobile`, `Footer/Mobile`.
- Produces: `T/List/Mobile`, `T/Detail/Mobile`, `T/Laboratory/Mobile`, `T/Documents/Mobile`, `T/Staff/Mobile`, `T/Contact/Mobile` (390 x auto).

- [ ] **Step 1: Mobil shablonlarni yig'ish**

Bitta ustun, `Tabs` gorizontal scroll chiplari, jadval o'rniga kartalar.

- [ ] **Step 2: Tekshiruv**

7-vazifadagi 390px chegarasi tekshiruvini har freymga qo'llang (kutilgan natija `0`), `get_screenshot`, foydalanuvchi tasdig'i.

---

### Task 10: Yakuniy audit va topshirish

**Files:**

- Modify: `docs/superpowers/plans/2026-10-09-figma-redesign.md` (natija bo'limi)

**Interfaces:**

- Consumes: butun fayl.

- [ ] **Step 1: Qattiq qiymat auditi**

Butun faylda variable/style'ga bog'lanmagan rang, shrift o'lchami va radius'larni qidiring (3-vazifadagi skriptni har sahifada ishga tushiring). Topilganlarni bog'lang.

- [ ] **Step 2: Komponent qamrovi**

Sahifalarda xom (instance bo'lmagan) kartalar, tugmalar, header/footer qolmaganini tekshiring.

- [ ] **Step 3: Nomlash va tartib**

Barcha freymlar `Home/Desktop`, `T/List` kabi aniq nomlangan; sahifalarda freymlar tartibli joylashgan.

- [ ] **Step 4: Topshirish**

`get_screenshot` bilan har sahifaning umumiy ko'rinishini foydalanuvchiga ko'rsating va Figma URL ni bering. Reja oxiriga `## Natija` bo'limini (qamrab olingan freymlar ro'yxati) yozib commit qiling:

```bash
git add docs/superpowers/plans/2026-10-09-figma-redesign.md
git commit -m "docs: record Figma redesign delivery"
```

- [ ] **Step 5: Keyingi bosqich**

Foydalanuvchiga taklif qiling: dizaynni React kodiga o'tkazish uchun yangi brainstorming va spec (`figma:figma-design-to-code`).

---

## Self-Review

- **Spec qamrovi:** Foundations (2), Components (3-5), Home desktop/mobil (6-7), Templates desktop/mobil (8-9), muvaffaqiyat mezonlari (3, 6, 10), logo cheklovi (5), `ECONNREFUSED` xavfi (1-vazifa `create_session` bosqichida ulanish tekshiriladi).
- **Joy egalari:** yo'q.
- **Nomlar mosligi:** variable/style/komponent nomlari 2-5 vazifalarda bir xil ishlatilgan. Kamchilik: 7-vazifadagi `H1/Mobile` style 2-vazifa ro'yxatida yo'q va 7-vazifada kiritilishi alohida ko'rsatilgan.
