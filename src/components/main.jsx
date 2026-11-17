import heroImg from '../assets/img/hero.jpg'
import espressoImg from '../assets/img/menu/espresso.jpg'
import kopiSusuImg from '../assets/img/menu/kopi-susu-gula-aren.jpg'
import cappuccinoImg from '../assets/img/menu/cappuccino.jpg'

function Main(){
    return(
         <main>
          <section
            id="home"
            className="min-h-[620px] md:min-h-[calc(100vh-5rem)] flex items-center text-white"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, .78) 0%, rgba(0, 0, 0, .35) 60%, rgba(0, 0, 0, .15) 100%), url(${heroImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div class="max-w-6xl mx-auto px-6 w-full">
              <h1 class="text-5xl md:text-7xl font-bold leading-[1.1] max-w-xl">
                Mari Nikmati Secangkir <span class="text-tan">Kopi</span>
              </h1>
              <p class="mt-6 max-w-md text-lg font-light text-white/80 leading-relaxed">
                Biji kopi pilihan dari petani lokal, disangrai segar dan diseduh langsung oleh barista kami.
              </p>
              <a href="#menu"
                class="inline-block mt-8 bg-tan text-white font-medium px-8 py-3 rounded-md shadow-lg shadow-black/40 hover:brightness-110 transition">
                Beli Sekarang
              </a>
            </div>
          </section>

      
          <section id="tentang" class="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-start">
            <h2 class="text-3xl md:text-4xl font-bold leading-snug">Dari kebun petani ke <span class="text-tan">cangkir</span>
              Anda</h2>
            <div class="space-y-5 text-[#665547] font-light leading-relaxed">
              <p>Kami membeli biji kopi langsung dari petani di Gayo, Kintamani, dan Toraja, lalu menyangrainya dalam jumlah
                kecil setiap minggu supaya rasanya tetap segar.</p>
              <p>Ruangan kami dibuat untuk berlama-lama: ada colokan di setiap meja, Wi-Fi cepat, dan kursi yang nyaman untuk
                bekerja berjam-jam.</p>
            </div>
          </section>

          <section id="menu" class="bg-[#e9dfd1] border-y border-[#39291f]/15">
            <div class="max-w-6xl mx-auto px-6 py-24">
              <h2 class="text-3xl md:text-4xl font-bold text-[#39291f]">
                Menu <span class="text-[#B98F5E]">Kami</span>
              </h2>
              <p class="mt-3 text-[#665547] font-light">
                Semua minuman bisa dipesan panas atau dingin.
              </p>
              <div class="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">

                <article
                  class="bg-[#f6efe4] border border-[#39291f]/10 rounded-lg overflow-hidden flex flex-row sm:flex-col shadow-sm">
                  <img src={espressoImg} alt="Espresso"
                    className="w-28 h-28 sm:w-full sm:h-auto sm:aspect-[4/3] shrink-0 object-cover bg-[#d9c9b2]" />
                    <div class="p-3 sm:p-5 flex flex-col flex-1 min-w-0">
                      <h3 class="text-base sm:text-lg font-semibold text-[#39291f]">Espresso</h3>
                      <p class="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[#665547] font-light flex-1 line-clamp-2">
                        Shot tunggal, pekat dan bersih.
                      </p>
                      <div class="mt-2 sm:mt-5 flex items-center justify-between gap-2">
                        <span class="text-sm sm:text-base text-[#B98F5E] font-semibold">Rp 18.000</span>
                        <button type="button"
                          class="bg-[#B98F5E] text-white text-xs sm:text-sm font-medium px-3.5 py-2 sm:px-4 rounded-md hover:brightness-110 transition">
                          Tambah
                        </button>
                      </div>
                    </div>
                </article>

                <article
                  class="bg-[#f6efe4] border border-[#39291f]/10 rounded-lg overflow-hidden flex flex-row sm:flex-col shadow-sm">
                  <img src={kopiSusuImg} alt="Kopi Susu Gula Aren"
                    className="w-28 h-28 sm:w-full sm:h-auto sm:aspect-[4/3] shrink-0 object-cover bg-[#d9c9b2]" />
                    <div class="p-3 sm:p-5 flex flex-col flex-1 min-w-0">
                      <h3 class="text-base sm:text-lg font-semibold text-[#39291f]">Kopi Susu Gula Aren</h3>
                      <p class="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[#665547] font-light flex-1 line-clamp-2">
                        Espresso, susu segar, dan gula aren.
                      </p>
                      <div class="mt-2 sm:mt-5 flex items-center justify-between gap-2">
                        <span class="text-sm sm:text-base text-[#B98F5E] font-semibold">Rp 24.000</span>
                        <button type="button"
                          class="bg-[#B98F5E] text-white text-xs sm:text-sm font-medium px-3.5 py-2 sm:px-4 rounded-md hover:brightness-110 transition">
                          Tambah
                        </button>
                      </div>
                    </div>
                </article>

                <article
                  class="bg-[#f6efe4] border border-[#39291f]/10 rounded-lg overflow-hidden flex flex-row sm:flex-col shadow-sm">
                  <img src={cappuccinoImg} alt="Cappuccino"
                    className="w-28 h-28 sm:w-full sm:h-auto sm:aspect-[4/3] shrink-0 object-cover bg-[#d9c9b2]" />
                    <div class="p-3 sm:p-5 flex flex-col flex-1 min-w-0">
                      <h3 class="text-base sm:text-lg font-semibold text-[#39291f]">Cappuccino</h3>
                      <p class="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[#665547] font-light flex-1 line-clamp-2">
                        Espresso, susu panas, dan busa tebal.
                      </p>
                      <div class="mt-2 sm:mt-5 flex items-center justify-between gap-2">
                        <span class="text-sm sm:text-base text-[#B98F5E] font-semibold">Rp 26.000</span>
                        <button type="button"
                          class="bg-[#B98F5E] text-white text-xs sm:text-sm font-medium px-3.5 py-2 sm:px-4 rounded-md hover:brightness-110 transition">
                          Tambah
                        </button>
                      </div>
                    </div>
                </article>

              </div>
            </div>
          </section>

          {/* bagian kontak */}
          <section id="kontak" class="max-w-6xl mx-auto px-6 py-24">
            <h2 class="text-3xl md:text-4xl font-bold">Kunjungi <span class="text-tan">Kami</span></h2>
            <div class="mt-10 grid md:grid-cols-3 gap-10 text-[#665547] font-light leading-relaxed">
              <div>
                <h3 class="text-[#39291f] font-semibold mb-2">Alamat</h3>
                <p>Jl.Raya No. 12<br />Jakarta Selatan 12345</p>
              </div>
              <div>
                <h3 class="text-[#39291f] font-semibold mb-2">Jam buka</h3>
                <p>Senin sampai Jumat: 08.00 – 22.00<br />Sabtu dan Minggu: 09.00 – 23.00</p>
              </div>
              <div>
                <h3 class="text-[#39291f] font-semibold mb-2">Hubungi kami</h3>
                <p>
                  <a href="https://wa.me/6281234567890" className="hover:text-tan">WhatsApp 0812-3456-7890</a><br />
                    <a href="mailto:halo@kenangansenja.id" className="hover:text-tan">halo@kenangansenja.id</a>
                </p>
              </div>
            </div>
          </section>
        </main>

    )
}

export default Main