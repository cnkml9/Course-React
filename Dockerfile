# Resmi Node.js image'ini temel alıyoruz, versiyon olarak en son LTS sürümünü kullanıyoruz.
FROM node:18-alpine

# Uygulama dosyalarının kopyalanacağı dizini oluşturuyoruz.
WORKDIR /app

# package.json ve package-lock.json dosyalarını çalışma dizinine kopyalıyoruz.
COPY package*.json ./

# Gerekli bağımlılıkları yüklüyoruz.
RUN npm install --legacy-peer-deps

# Proje dosyalarını çalışma dizinine kopyalıyoruz.
COPY . .

# Uygulamanın dışarıdan erişilebilmesi için gerekli portu açıyoruz.
EXPOSE 3000

# Uygulamayı başlatıyoruz.
CMD ["npm", "start"]
