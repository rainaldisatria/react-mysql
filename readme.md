# react-mysql
Fullstack, CRUD, REST - E-commerce web application build with ReactJS + MySQL.

The purpose of this project is to pass my end of semester exams.

## Notes
The code is a complete mess, BUT IT'S NOT A GARBAGE. 

But it still a trash tho, HAHAH.

Happy hacking!

## Main features: 
- Able to dynamically show tables from MySQL (no hardcoded code).
- Sort any tables by its properties (no hardcoded code).
- Able to edit tables while showing currently selected table's description.

## How to use
0. Import 'best raw with key with view.sql' to your local database with 'rumah_sakit' as its name.
1. Download and install NodeJS  LTS https://nodejs.org/en/download/
2. Open ./client in your terminal
3. Type 'npm install' (make sure you have solid internet connection)
4. Open ./server in your terminal
5. Type 'npm install' (make sure you have solid internet connection)
6. Open folder ./client in your terminal
7. Type 'npm start'
8. Open another terminal, as your current terminal is used to maintain localhost:3000/ connection
9. Open ./server in your terminal
10. Type 'nodemon index.js'
11. Make sure XAMPP (MYSQL and APACHE is active)
12. Open http://localhost:3000/ in your web browser
15. Happy shopping.

## Screenshots
### Halaman Utama (Shopping Page):
 
![image](https://user-images.githubusercontent.com/57592497/105723885-de39f380-5f59-11eb-834b-55c2ffa986ea.png)

Pada halaman ini, user dapat membeli macam-macam obat dengan quantitas yang berbeda-beda. Sebelum dapat membeli, user diminta untuk log in terlebih dahulu

### Halaman Log In:
 
![image](https://user-images.githubusercontent.com/57592497/105723919-e5f99800-5f59-11eb-8e6c-abf64ed15248.png)

Di sini, user dapat memasukan username dan password yang dimilikanya untuk dapat membeli dan mengakses akun-nya. Jika user memasukan username dan password yang salah, maka akan ada pemberitahuan bahwa username atau password yang dimasukan salah. Di halaman ini juga terdapat link referral ke halaman Sign up.

### Halaman Sign Up:
 
![image](https://user-images.githubusercontent.com/57592497/105723941-ed20a600-5f59-11eb-890b-9b699a7cb1eb.png)

Di halaman sign-up, user dapat membuat akun. Membuat akun di lakukan dengan memberi data-data diri: nama depan, nama terkahir, username, dan password. Jika salah satu dari data diri tersebut tidak lengkap, maka akan ada notifikasi yang memberitahu user untuk mengisi form dengan benar. Password harus memiliki panjang minimal 8 karakter. Di halaman sign-up, juga terdapat link referral ke halaman sign-in atau log-in.


### Shopping Page pada saat user telah menggunakan akun :
 
![image](https://user-images.githubusercontent.com/57592497/105723979-f4e04a80-5f59-11eb-9465-740bdaf025e7.png)

Terlihat pada statusbar, tombol sign-up dan log-in hilang, berubah menjadi Cart (Keranjang belanja) dan icon user. 

![image](https://user-images.githubusercontent.com/57592497/105723998-fa3d9500-5f59-11eb-9572-7231b47a71ee.png)

Karena user telah log-in menggunakan akun yang valid, maka user dapat berbelanja. Terlihat disitu kami ingin membeli MICONAZOLE sebanyak 3 buah. Pada saat memasukan obat ke keranjang, akan ada notifikasi yang memberi tahu bahwa obat yang kita pilih telah dimasukan ke dalam keranjang dengan berhasil.
Catatan: User tidak dapat membeli lebih dari jumlah obat yang tersedia. Jika melebihi jumlah yang tersedia, maka quantitas nya akan menampilkan angka maksimum yang dapat dibeli.
Contoh: user memasukan angka 99 kedalam quantitas, namun karena persediaan MICONAZOLE hanya 65, maka quantitas yang terlihat disitu hanya 65.

### Halaman Cart (Keranjang Belanja):

![image](https://user-images.githubusercontent.com/57592497/105724038-04f82a00-5f5a-11eb-9eea-c33c31fef4e6.png)

Saat user telah memilih obat untuk dibeli, maka obat yang dibeli tersebut akan masuk ke dalam cart. Di halaman ini, user akan mendapatkan ringkasan informasi berupa: 
-	Obat apa saja yang akan dibeli, 
-	berapa harga satuanya, 
-	berapa quantitas dari masing-masing obat yang akan dibeli, 
-	total keseluruhan quantitas yang dibeli, 
-	berapa harga total dari keseluruhan harga obat. 
Jika telah yakin untuk membeli, user dapat membeli dengan mengeklik tombol ‘Buy’.
Catatan: User tidak dapat membeli lebih dari jumlah obat yang tersedia. Jika melebihi jumlah yang tersedia, maka quantitas nya akan menampilkan angka maksimum yang dapat dibeli.
Contoh: user memasukan angka 99 kedalam quantitas, namun karena persediaan MICONAZOLE hanya 65, maka quantitas yang terlihat disitu hanya 65.

### Halaman Cart (Keranjang Belanja) pada saat cart kosong:
![image](https://user-images.githubusercontent.com/57592497/105724098-15100980-5f5a-11eb-8ab8-f5473889291a.png)

Tampilan ketika belum ada obat di dalam keranjang belanja user. Di halaman ini user akan diberi tahu bahwa dia belum memasukan barang apa-apa kedalam kerajang belanjanya. Di halaman ini, user juga akan diberi tahu untuk memulai belanja dengan mengelik tombol ‘mulai belanja’.

### Halaman My Account (Akun Saya):
![image](https://user-images.githubusercontent.com/57592497/105724182-2a853380-5f5a-11eb-8688-d31eaf02690d.png)

Halaman my account akan menunjukkan detail pada account user. Seperti nama pertama, nama terakhir, username, dan password. Di halaman ini, tadinya kami ingin menambahkan balance atau saldo. Namun untuk simplicitas, kami tidak jadi menambahkannya.

### Sign-In dalam mode admin.
![image](https://user-images.githubusercontent.com/57592497/105724348-586a7800-5f5a-11eb-8962-f2787851eed5.png)

Sign-in dalam mode admin memberikan fitur-fitur lebih yang tidak tersedia pada mode customer. Untuk dapat masuk kedalam mode admin, dapat dilakukan dengan cara log-in meunggunakan username: admin, dan password: 123.

![image](https://user-images.githubusercontent.com/57592497/105724360-5bfdff00-5f5a-11eb-84a6-5f42b8784332.png)

Halaman utama dalam mode admin. Dapat dilihat bahwa dibagian kanan atas terdapat tambahan untuk bagian admin. Yaitu ‘ADMIN’.
Catatan: Admin juga dapat membeli obat layaknya customer.

### Halaman Cart pada mode admin.
![image](https://user-images.githubusercontent.com/57592497/105724383-63bda380-5f5a-11eb-9f4d-71818d0ba0f3.png)

Terlihat bahwa tidak terdapat banyak perubahan selain terdapat tombol ‘ADMIN’ di statusbar.

### Halaman Admin
![image](https://user-images.githubusercontent.com/57592497/105724408-6ae4b180-5f5a-11eb-83ac-6b683c233d80.png)

Tampilan ketika tombol ‘ADMIN’ pada statusbar diklik. Pada mode admin ini terdapat banyak halaman yang di klasifikasikan menjadi 3 hal:
-	Produk 
-	Statistik (atau insight) 
-	Super Admin.
3 Klasifikasi tersebut akan kami bahas satu per satu. Di halaman selanjutnya.

### Produk – Tabel Obat:
![image](https://user-images.githubusercontent.com/57592497/105724454-746e1980-5f5a-11eb-922d-ba38d7f0099a.png)

Tampilan dari Halaman List Obat. Pada halaman ini ditunjukkan jenis-jenis obat yang dijual. Tidak hanya itu, admin juga dapat mengedit, menghapus, dan juga menambahkan data ke tabel obat. 

### Produk- Persediaan
![image](https://user-images.githubusercontent.com/57592497/105724478-7d5eeb00-5f5a-11eb-8330-6d931dcebd28.png)

Tampilan dari Halaman Persediaan. Pada halaman ini ditunjukkan persediaan obat yang dijual. Tidak hanya itu, admin juga dapat mengedit, menghapus, dan juga menambahkan data ke tabel persediaan. 

### Produk – Log Perubahan
![image](https://user-images.githubusercontent.com/57592497/105724535-8a7bda00-5f5a-11eb-98a0-ea9a03bcfea5.png)

Tampilan dari Halaman Log Perubahaan. Pada halaman ini ditunjukkan perseidan obat yang dijual. Tabel ini hanya dapat dilihat, tidak dapat di edit.


### Produk - Obat Kadaluarsa
![image](https://user-images.githubusercontent.com/57592497/105724712-b8f9b500-5f5a-11eb-94ab-e1b052d98c46.png)

Tampilan dari pilihan Obat Kadaluarsa. Pada halaman ini ditunjukkan obat yang telah kadaluarsa. Tabel ini hanya dapat dilihat, tidak dapat di edit.

### Statistik – Ringkasan Penjualan
![image](https://user-images.githubusercontent.com/57592497/105724725-bd25d280-5f5a-11eb-8591-ca45dd86e961.png)
![image](https://user-images.githubusercontent.com/57592497/105724732-c020c300-5f5a-11eb-8698-052fb75a7cec.png)

Di halaman ini, terdapat grafik yang menunjukan total penjualan pada tahun ini, total pendapatan lifetime (dari awal toko tersebut dibangun sampai saat ini), dan detail dari obat apa saja yang terjual.

![image](https://user-images.githubusercontent.com/57592497/105724752-c7e06780-5f5a-11eb-9ef5-ca8b3d41060b.png)

Admin juga dapat memilih untuk melihat statistik pembelian dengan pilihan rentang waktu yang tidak terbatas (lifetime, tahun ini, bulan ini, dan waktu custom seperti minggu ini, kemarin, dan kapan saja). 
Untuk mengaktifkan mode custom, pilih Time Span pada opsi.
![image](https://user-images.githubusercontent.com/57592497/105724795-d169cf80-5f5a-11eb-9038-0e967ac2f673.png)

Maka akan muncul menu baru yang berisi 2 field date. Yaitu From dan Until.
‘From’ dari kapan waktu penjualan yang ingin dilihat, dan ‘until’ sampai kapan.
Jika kita memilih From 2019-01-01 sampai until 2019-01-31 maka kita akan melihat statistik pada bulan Januari 2019.
Jika kita memilih From 2019-01-01 sampai until 2019-01-07 maka kita akan melihat statistik pada pada minggu pertama bulan Januari. 

### Halaman Statistik - Pesanan
![image](https://user-images.githubusercontent.com/57592497/105724843-dd559180-5f5a-11eb-9243-a041abad462b.png)

Tampilan dari halaman Tabel Pesanan. Pada halaman akan menunjukkan pesanan yang dilakukan oleh pelanggan ketika mereka membeli obat.
Siapa yang membeli, obat apa yang dibeli dan berapa yang dibeli.

### Halaman Statistik - Transaksi
![image](https://user-images.githubusercontent.com/57592497/105724882-e8a8bd00-5f5a-11eb-9574-ca38543aa4e2.png)

Halaman ini mirip dengan halaman Pesanan. Hanya saja disini tidak berfokus pada siapa yang membeli, namun berfokus pada obat yang terjual di hari ini.

### Halaman Control Panel 
Yang terakhir merupakan tampilan dari Control Panel. Pada halaman ini admin dapat mengedit maupun mendelete seluruh tabel-tabel yang ada pada pilihan-pilihan sebelumnya. Admin juga dapat melihat profil para user serta mendelete dan mengedit profil user.
Halaman Control Panel dibagi menjadi beberapa klasifikasi:
-	Obat – Obat an
-	 Transaksi
-	Users

Untuk lebih jelasnya dapat dilihat pada gambar dibawah ini:
![image](https://user-images.githubusercontent.com/57592497/105724917-f100f800-5f5a-11eb-91cc-96e0452b8ca9.png)
![image](https://user-images.githubusercontent.com/57592497/105724971-fe1de700-5f5a-11eb-98b9-e11ab0828fe7.png)

### Fitur Search
![image](https://user-images.githubusercontent.com/57592497/105724984-02e29b00-5f5b-11eb-808a-6ddcfe86b8c8.png)

Aplikasi kami juga dapat melakukan search / mencari obat yang ingin dibeli. Fitur ini dapat dilakukan di halaman mana saja karena terdapat pada statusbar (yang selalu berada di atas halaman yang berwarna biru).

### Fitur Sort 
![image](https://user-images.githubusercontent.com/57592497/105725011-0a09a900-5f5b-11eb-96a6-5f2e4fa63de7.png)

Aplikasi kami juga dapat mengurutkan tabel sesuai dengan setiap properties pada table tersebut secara ascending maupun descending 

![image](https://user-images.githubusercontent.com/57592497/105725042-11c94d80-5f5b-11eb-8e31-6894a25f1f74.png)

Contohnya, jika pada Tabel Obat, maka dapat diurutkan sesuai kode obat, nama obat, bentuk obat, dan lainya, sesuai dengan semua properties dari tabel obat.

### Fitur Keamanan (404 Page)
![image](https://user-images.githubusercontent.com/57592497/105725100-20176980-5f5b-11eb-80da-af111faf9b5d.png)

Aplikasi kami juga memiliki fitur kemanan, yaitu:
-	Jika menuju url yang tidak diketahui, misalnya: “localhost:3000/asdf”, maka akan muncul tampilan bahwa tidak ada halaman yang dilalui oleh url tersebut
-	Jika customer mencoba masuk kedalam admin page, maka akan dialihkan ke 404 Page (karena customer tidak memiliki akses ke admin page).

Fitur Edit:

![image](https://user-images.githubusercontent.com/57592497/105804087-7f17c580-5fd1-11eb-83b2-cd4b96c3bdce.png)

