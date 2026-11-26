import { Navigate, Route, Routes } from 'react-router'
import KasirFooter from './KasirFooter'
import KasirHeader from './KasirHeader'
import Antrean from './Antrean'
import BuatPesanan from './BuatPesanan'
import DaftarMenu from './DaftarMenu'
import Riwayat from './Riwayat'

function KasirPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <KasirHeader />
      <Routes>
        <Route index element={<Antrean />} />
        <Route path="buat-pesanan" element={<BuatPesanan />} />
        <Route path="menu" element={<DaftarMenu />} />
        <Route path="riwayat" element={<Riwayat />} />
        <Route path="*" element={<Navigate to="/kasir" replace />} />
      </Routes>
      <KasirFooter />
    </div>
  )
}

export default KasirPage