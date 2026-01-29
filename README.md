# API Mastery Practice 🚀

Bu proje, bir Frontend Developer'ın temel API entegrasyonu, State yönetimi ve Modern Web geliştirme yetkinliklerini sergilemek amacıyla geliştirilmiştir.

## 🛠️ Kullanılan Teknolojiler

- **React 19 & TypeScript**: Tip güvenliği ve modern UI bileşenleri.
- **Redux Toolkit**: Merkezi state yönetimi ve Async Thunk ile API yönetimi.
- **Formik & Yup**: Form yönetimi ve şema tabanlı doğrulama.
- **Axios**: HTTP istekleri ve merkezi interceptor yapılandırması.
- **SASS (SCSS)**: Modüler ve premium styling.
- **React Router Dom v7**: Sayfalar arası dinamik yönlendirme.
- **React Toastify**: Kullanıcı geri bildirimleri için bildirim sistemi.

## ✨ Öne Çıkan Özellikler

- **Debounced Search**: Arama çubuğunda her harf değişiminde değil, yazma durduktan 500ms sonra API isteği atarak performans optimizasyonu sağlar.
- **Local Persistence Mock**: Mock API kullanıldığı için veriler veritabanına kaydedilmez. Bu projede, yeni eklenen kullanıcılar Redux state'inde tutularak uygulama içinde kalıcılık sağlanmıştır.
- **Custom Hooks**: `useDebounce` ve Redux için özelleştirilmiş hook yapısı.
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu premium arayüz.
- **Clean Code & Mimari**: Katmanlı mimari (Services, Slices, Hooks, Components) prensiplerine uygun dizin yapısı.

## 🚀 Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone [repo-url]
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```

## 📂 Proje Yapısı

- `src/services`: API katmanı (Axios yapılandırması).
- `src/slices`: Redux mantığı.
- `src/hooks`: Tekrar kullanılabilir mantık bileşenleri.
- `src/components`: UI bileşenleri ve stiller.
- `src/enums`: Merkezi sabitler.
- `src/types`: TypeScript arayüzleri.

---
Geliştiren: [Sertaç]
