// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyAoa6XVwvLudjkyHxzF2Q8Xp61BEaG8_Ho",
  authDomain: "insancemerlang-e829c.firebaseapp.com",
  projectId: "insancemerlang-e829c",
  storageBucket: "insancemerlang-e829c.firebasestorage.app",
  messagingSenderId: "544747474491",
  appId: "1:544747474491:web:be2b4a1553734a5c53961e"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const barangCollection = collection(db, "barang")


// fungsi untuk menampilkan daftar barang
export async function daftarBarang () {
  
  // ambil snapshot data dari koleksi film
  const snapshot = await getDocs(barangCollection)

  // ambil elemen tabel data
  const tabel = document.getElementById('tabelData')

  // kosongkan isi tabel nya
  tabel.innerHTML = ""

  // loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data
    const data = doc.data()
    const id = doc.id
    
    // buat elemen kolom untuk nomor urut
    
    
    // buat elemen baris baru
    const baris = document.createElement("tr")
const nomorUrut = document.createElement("td")
nomorUrut.textContent = tabel.rows.length + 1
    // buat elemen kolom untuk barang
    const kolomBarang = document.createElement("td")
    kolomBarang.textContent = data.barang

    // buat elemen untuk kolom harga 
    const kolomHarga = document.createElement("td")
    kolomHarga.textContent = data.harga

    // buat elemen kolom untuk stok
    const kolomStok = document.createElement('td')
    kolomStok.textContent = data.stok

    // buat elemen kolom untuk aksi
    const kolomAksi = document.createElement('td')

    // tombol Barang
     // tombol edit
  const tombolEdit = document.createElement('a')
  tombolEdit.textContent = 'Edit'
  tombolEdit.href = 'edit.html?id=' + id
  tombolEdit.className = 'button edit'
  
  // tombol hapus
  const tombolHapus = document.createElement('button')
  tombolHapus.textContent = 'Hapus'
  tombolHapus.className = 'button delete'
  tombolHapus.onclick = async () => {
    await hapusBarang(id)
  }

    //tambahkan elemen ke dalam kolom aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)

    // tambahkan kolom ke dalam baris
    baris.appendChild(nomorUrut)
    baris.appendChild(kolomBarang)
    baris.appendChild(kolomHarga)
    baris.appendChild(kolomStok)
    baris.appendChild(kolomAksi)

    // tambahkan baris ke alam tabel
    tabel.appendChild(baris)

  })
}

//fungsi untuk menambahkan barang baru
export async function tambahBarang(data) {
  //ambil nilai dari from
  const barang = document.getElementById('barang').value
  const harga = document.getElementById('harga').value
  const stok = document.getElementById('stok').value
  
  // tambahkan data ke firestore
  await addDoc(barangCollection, {
    barang: barang,
    harga: harga,
    stok: stok
  })
  
  // alihkan ke halaman daftar baranh
  window.location.href = 'daftar.html'
}

  //fungsi untuk mengambil data barang bedasarkan id
  //agar data ditampilkan di form. ubah
  export async function ambilBarang(id) {
    const docRef = doc(db, "barang", id)
    const docSnap = await getDoc(docRef)
    
    return await docSnap.data()
  }
  
    //fungsi untuk mengubah data barang
  export async function ubahBarang(id, namaBarang, harga, stok) {
    // mengubah data di firestore
    await updateDoc(doc(db, "barang", id), {
      namaBarang: barang,
      harga: harga,
      aktor: stok,
    })
    
    //alihkan ke halaman daftar barang
    window.location.href = 'daftar.html'
  }
  
  // fungsi untuk menghapus data barang
 export async function hapusBarang(id) {
  if (!confirm("yakin ingin menghapus data ini? ")) return
  //menghapus dokumen siswa berdasarkan id
  await deleteDoc(doc(db, "barang", id))
  
  //refresh data film
  await daftarBarang()
}