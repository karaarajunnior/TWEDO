import React from 'react';
import { motion } from 'framer-motion';

/* Reusable SVG Donut Chart */
const DonutChart = ({ value, total, label, color, colorLight, size = 160 }) => {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const percentage = (value / total) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 160 160" className="-rotate-90">
          {/* Background ring */}
          <circle cx="80" cy="80" r={radius} fill="none" stroke={colorLight} strokeWidth="14" />
          {/* Progress ring */}
          <circle
            cx="80" cy="80" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total</span>
          <span className="text-3xl font-black font-outfit" style={{ color }}>{value}</span>
        </div>
      </div>
      <p className="mt-4 text-sm font-bold text-gray-600 text-center">{label}</p>
    </motion.div>
  );
};

/* Small stat ring for subcounty data */
const MiniRing = ({ value, maxVal, label, color }) => {
  const r = 28;
  const c = 2 * Math.PI * r;
  const pct = maxVal > 0 ? (value / maxVal) * 100 : 0;
  const off = c - (pct / 100) * c;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
          <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={off} style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-black" style={{ color }}>{value}</div>
      </div>
      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider text-center leading-tight">{label}</span>
    </div>
  );
};

const ImpactStats = ({ t }) => {
  const stats = [
    { label: t.impact.youths, value: '1361' },
    { label: t.impact.districts, value: '3' },
    { label: t.impact.skills, value: '15' },
    { label: t.impact.pillars, value: '5' }
  ];

  return (
    <section className="relative z-20 -mt-20 px-4" id="impact">
      <div className="container">

        {/* Top stat cards — unchanged */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl p-8 md:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold font-outfit text-primary mb-2">
                  {stat.value}+
                </div>
                <div className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-widest leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ===== VISUAL DONUT CHARTS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-teso-dark rounded-[3rem] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="px-8 md:px-12 pt-10 pb-6">
            <h3 className="text-2xl md:text-3xl font-bold font-outfit text-white">Training Statistics Breakdown</h3>
            <p className="text-sm text-gray-400 font-semibold mt-1">Nov 2021 – March 2022 · Amuria &amp; Kapelebyong Districts</p>
          </div>

          {/* Main donut charts row */}
          <div className="px-8 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/5">
            <DonutChart value={787} total={1361} label="Amuria District" color="#e91e8c" colorLight="rgba(233,30,140,0.15)" />
            <DonutChart value={574} total={1361} label="Kapelebyong District" color="#1565C0" colorLight="rgba(21,101,192,0.15)" />
            <DonutChart value={1010} total={1361} label="Females Trained" color="#f06292" colorLight="rgba(240,98,146,0.15)" />
            <DonutChart value={351} total={1361} label="Males Trained" color="#42a5f5" colorLight="rgba(66,165,245,0.15)" />
          </div>

          {/* Skill-by-skill breakdown with mini rings */}
          <div className="px-8 md:px-12 py-10">
            <h4 className="text-lg font-bold text-white font-outfit mb-8 uppercase tracking-widest text-sm">Skills Distribution</h4>
            <div className="grid md:grid-cols-2 gap-10">

              {/* Amuria */}
              <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                <h5 className="text-primary font-bold font-outfit mb-6 text-lg flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block"></span> Amuria
                  <span className="ml-auto text-2xl font-black">787</span>
                </h5>
                <div className="grid grid-cols-5 gap-4">
                  <MiniRing value={415} maxVal={500} label="Tailoring" color="#e91e8c" />
                  <MiniRing value={220} maxVal={500} label="BCP" color="#f06292" />
                  <MiniRing value={89} maxVal={500} label="H.D" color="#f48fb1" />
                  <MiniRing value={30} maxVal={500} label="Comp." color="#f8bbd0" />
                  <MiniRing value={33} maxVal={500} label="Sweater" color="#fce4ec" />
                </div>
              </div>

              {/* Kapelebyong */}
              <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                <h5 className="text-secondary font-bold font-outfit mb-6 text-lg flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span> Kapelebyong
                  <span className="ml-auto text-2xl font-black">574</span>
                </h5>
                <div className="grid grid-cols-3 gap-4">
                  <MiniRing value={408} maxVal={500} label="Tailoring" color="#1565C0" />
                  <MiniRing value={94} maxVal={500} label="BCP" color="#42a5f5" />
                  <MiniRing value={72} maxVal={500} label="H.D" color="#90caf9" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer grand total */}
          <div className="px-8 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ background: 'linear-gradient(90deg, rgba(233,30,140,0.1), rgba(21,101,192,0.1))' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-lg">♀</div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Females</p>
                <p className="text-xl font-black font-outfit text-white">1,010</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-lg">♂</div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase">Males</p>
                <p className="text-xl font-black font-outfit text-white">351</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10"></div>
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-400 font-semibold uppercase">Grand Total Beneficiaries</p>
              <p className="text-3xl font-black font-outfit text-white">1,361</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ImpactStats;
