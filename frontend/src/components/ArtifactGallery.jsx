import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ZoomIn, X, BarChart3, Workflow, Database, Layers, Eye, FileText, CheckCircle2 } from 'lucide-react';

const ARTIFACTS = [
  {
    id: 'bmc',
    title: 'Business Model Canvas (BMC)',
    subtitle: 'Pemetaan 9 Blok Model Bisnis Strategis',
    category: 'Business Modeling',
    description: 'Dokumentasi model bisnis lengkap meliputi Value Propositions, Customer Segments, Key Resources, dan Revenue Streams untuk validasi PMW.',
    icon: Workflow,
    details: [
      'Customer Segments: Pelaku usaha catering, komunitas peduli lingkungan, dan konsumen sehat.',
      'Value Propositions: Otomasi kalkulasi nutrisi gizi MBG dan supply chain limbah organik terstandar.',
      'Cost & Revenue: Pemetaan struktur biaya operasional dan proyeksi arus kas monetisasi.',
    ],
    svgType: 'bmc',
  },
  {
    id: 'vpc',
    title: 'Value Proposition Canvas (VPC)',
    subtitle: 'Analisis Keselarasan Kebutuhan & Fitur Solusi',
    category: 'Product Discovery',
    description: 'Pemetaan mendalam Customer Profile (Customer Jobs, Pains, Gains) terhadap Value Map (Pain Relievers & Gain Creators) pada proyek OLIM.',
    icon: Layers,
    details: [
      'Customer Pains: Keraguan mutu bahan limbah organik dan risiko sengketa transaksi.',
      'Pain Relievers: Modul Admin Dispute Resolution & escrow payment terverifikasi.',
      'Gain Creators: Efisiensi waktu pengadaan suplai pakan maggot hingga 50%.',
    ],
    svgType: 'vpc',
  },
  {
    id: 'erd',
    title: 'Entity Relationship Diagram (ERD) & Star Schema',
    subtitle: 'Arsitektur Basis Data Relasional & Data Warehouse',
    category: 'Data Architecture',
    description: 'Pemodelan skema relasi basis data PostgreSQL untuk FoodFlow serta perancangan Star Schema (Fact & Dimension Tables) pada Data Warehouse Rumah Sakit.',
    icon: Database,
    details: [
      'Fact Table: Fakta transaksi layanan medis, resep obat, dan utilisasi kamar rawat inap.',
      'Dimension Tables: Dimensi Pasien (SCD Type 2), Dokter, Waktu, dan Departemen Klinis.',
      'Integritas Data: Penegakan Foreign Key constraints, indexing komposit, dan normalisasi 3NF.',
    ],
    svgType: 'erd',
  },
  {
    id: 'dfd',
    title: 'Data Flow Diagram (DFD Level 0 & 1)',
    subtitle: 'Dekomposisi Aliran Informasi & Proses Sistem',
    category: 'System Analysis',
    description: 'Visualisasi aliran pertukaran data antara entitas eksternal (Staff Lab, Dosen, Mahasiswa) dengan proses inti dan penyimpanan datastore pada SIM Lab ILET.',
    icon: Workflow,
    details: [
      'Context Diagram (Level 0): Batasan sistem dan interaksi pengguna eksternal.',
      'Level 1 DFD: Proses verifikasi peminjaman, update kuota bahan kimia, dan approval surat bebas lab.',
      'Datastore: Penyimpanan log audit penggunaan instrumen laboratorium.',
    ],
    svgType: 'dfd',
  },
  {
    id: 'usecase',
    title: 'Use Case Diagram & Activity Modeling',
    subtitle: 'Spesifikasi Fungsional & Batasan Sistem (SRS)',
    category: 'Requirement Engineering',
    description: 'Spesifikasi skenario use case mencakup include/extend relationships, user role authorization, serta activity flow penyusunan resep makanan massal.',
    icon: FileText,
    details: [
      'Actor Mapping: Admin Produksi, Chef Katering, Petugas Gudang, dan Validator Gizi.',
      'Include Scenarios: Validasi ketersediaan bahan otomatis saat memasukkan resep menu.',
      'Exception Flow: Penanganan notifikasi stok kritis bahan baku gudang.',
    ],
    svgType: 'usecase',
  },
  {
    id: 'powerbi',
    title: 'Dashboard Analitik Power BI & Data Mining',
    subtitle: 'Visualisasi KPI Bisnis & Business Intelligence',
    category: 'Data Analytics',
    description: 'Rancangan dashboard analitik eksekutif interaktif untuk memantau performa bisnis, rasio konversi pesanan, dan klasterisasi tren komoditi pasar.',
    icon: BarChart3,
    details: [
      'KPI Metrics: Total pendapatan, Bed Occupancy Rate (BOR), dan Average Length of Stay (ALOS).',
      'Interactive Slicers: Filter multi-dimensi per kuartal, departemen spesialis, dan demografi wilayah.',
      'Predictive Modeling: Korelasi tren kebutuhan gizi terhadap fluktuasi harga bahan mentah pasar.',
    ],
    svgType: 'powerbi',
  },
];

export default function ArtifactGallery() {
  const { t } = useLanguage();
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  return (
    <section id="artefak" className="py-20 lg:py-28 bg-white border-t border-[#09318D]/10" aria-labelledby="artifacts-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD91CC]/25 text-[#09318D] text-xs font-black uppercase tracking-wider mb-3">
            {t.gallery.sectionBadge}
          </div>
          <h2 id="artifacts-heading" className="font-display text-3xl sm:text-4xl font-extrabold text-[#09318D] tracking-tight">
            {t.gallery.title}
          </h2>
          <div className="w-16 h-1.5 bg-[#FD91CC] rounded-full mt-3" />
          <p className="text-sm sm:text-base text-[#09318D]/75 mt-3 leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Artifact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTIFACTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedArtifact(item)}
                className="bg-white border border-[#09318D]/15 hover:border-[#FD91CC] rounded-3xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedArtifact(item);
                  }
                }}
                aria-label={`Lihat detail artefak ${item.title}`}
              >
                <div>
                  {/* Category Pill & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#09318D]/5 text-[#09318D] border border-[#09318D]/10 group-hover:bg-[#FD91CC]/30 transition-colors">
                      {item.category}
                    </span>
                    <div className="p-2 rounded-xl bg-[#09318D] text-[#FD91CC] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#09318D] leading-snug group-hover:text-[#09318D]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#09318D]/70 mt-1 mb-3">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-[#09318D]/80 leading-relaxed font-sans line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Inspect Action Footer */}
                <div className="mt-6 pt-4 border-t border-[#09318D]/10 flex items-center justify-between text-xs font-bold text-[#09318D] group-hover:text-[#09318D]">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#FD91CC]" />
                    <span>Klik untuk memperbesar</span>
                  </span>
                  <ZoomIn className="w-4 h-4 text-[#FD91CC] group-hover:scale-125 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Zoom Artifact Modal */}
      {selectedArtifact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#09318D]/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#09318D]/20 p-6 sm:p-8 relative">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#09318D]/10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FD91CC] text-[#09318D]">
                  {selectedArtifact.category}
                </span>
                <h3 className="font-display text-2xl font-extrabold text-[#09318D] mt-2">
                  {selectedArtifact.title}
                </h3>
                <p className="text-sm font-semibold text-[#09318D]/70">
                  {selectedArtifact.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedArtifact(null)}
                className="p-2 rounded-full bg-[#09318D]/10 hover:bg-[#09318D]/20 text-[#09318D] transition-colors focus-visible:ring-2 focus-visible:ring-[#FD91CC]"
                aria-label="Tutup pratinjau"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mockup Canvas */}
            <div className="my-6 p-6 rounded-2xl bg-[#09318D]/5 border-2 border-dashed border-[#09318D]/20 flex flex-col items-center justify-center text-center space-y-3">
              <div className="p-4 rounded-2xl bg-[#09318D] text-[#FD91CC] shadow-lg">
                <Workflow className="w-10 h-10" />
              </div>
              <h4 className="font-display font-bold text-base text-[#09318D]">
                Visualisasi Skematis & Spesifikasi Dokumen
              </h4>
              <p className="text-xs text-[#09318D]/75 max-w-md">
                Artefak ini disusun secara langsung dalam siklus pengembangan proyek menggunakan standar metodologi industri.
              </p>
            </div>

            {/* Artifact Description & Key Elements */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#09318D]">
                Komponen Analitis Utama:
              </h4>
              <div className="space-y-2">
                {selectedArtifact.details.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#09318D]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#FD91CC] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#09318D]/10 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedArtifact(null)}
                className="px-6 py-2.5 rounded-full bg-[#09318D] text-white font-bold text-xs hover:bg-[#09318D]/90 transition-colors"
              >
                Tutup Artefak
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
