import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Compass, GraduationCap, Heart, MapPin, Sparkles, Users } from 'lucide-react';

const CountUp = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;
    const started = performance.now();
    const duration = 1100;
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      setCount(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const DonutChart = ({ value, total, label, totalLabel, color, colorLight, size = 160, delay = 0 }) => {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((value / total) * circumference);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay }}
      className="flex min-w-[145px] flex-col items-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 160 160" className="-rotate-90">
          <circle cx="80" cy="80" r={radius} fill="none" stroke={colorLight} strokeWidth="14" />
          <circle cx="80" cy="80" r={radius} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60">{totalLabel}</span>
          <span className="text-3xl font-extrabold font-outfit" style={{ color }}>{value}</span>
        </div>
      </div>
      <p className="mt-3 max-w-[10rem] text-center text-xs font-bold leading-snug text-white/80 md:text-sm">{label}</p>
    </motion.div>
  );
};

const MiniRing = ({ value, maxVal, label, color }) => {
  const r = 25;
  const c = 2 * Math.PI * r;
  const offset = c - ((value / maxVal) * c);
  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <div className="relative h-14 w-14">
        <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
          <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="5" />
          <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-extrabold" style={{ color }}>{value}</div>
      </div>
      <span className="max-w-14 text-center text-[9px] font-semibold uppercase leading-tight tracking-wide text-white/60">{label}</span>
    </div>
  );
};

const SkillBreakdown = ({ title, total, color, skills }) => {
  const max = Math.max(...skills.map((skill) => skill.value));
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-7">
      <h5 className="mb-5 flex items-center gap-2 text-lg font-bold font-outfit" style={{ color }}>
        <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: color }} /> {title}
        <span className="ml-auto text-2xl font-extrabold text-white">{total}</span>
      </h5>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3">
            <div className="flex items-center justify-between gap-3 text-xs font-semibold text-white/75">
              <span className="truncate">{skill.label}</span><span className="text-white">{skill.value}</span>
            </div>
            <MiniRing value={skill.value} maxVal={max} label={skill.label} color={skill.color} />
            <div className="col-span-1 mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${(skill.value / max) * 100}%`, background: `linear-gradient(90deg, ${skill.color}, ${color})` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImpactStats = ({ t }) => {
  const stats = [
    { label: t.impact.youths, value: 1361, icon: GraduationCap, iconClass: 'bg-primary/10 text-primary', accent: 'from-primary to-pink-300' },
    { label: t.impact.districts, value: 3, icon: MapPin, iconClass: 'bg-secondary/10 text-secondary', accent: 'from-secondary to-sky-300' },
    { label: t.impact.skills, value: 15, icon: Sparkles, iconClass: 'bg-amber-100 text-amber-600', accent: 'from-amber-400 to-orange-300' },
    { label: t.impact.pillars, value: 5, icon: Compass, iconClass: 'bg-emerald-100 text-emerald-600', accent: 'from-emerald-400 to-teal-300' }
  ];
  const amuriaSkills = [
    { label: t.impact.tailoring, value: 415, color: '#e91e8c' }, { label: t.impact.bcp, value: 220, color: '#f06292' },
    { label: t.impact.hairdressingShort, value: 89, color: '#f48fb1' }, { label: t.impact.computerShort, value: 30, color: '#f8bbd0' },
    { label: t.impact.sweater, value: 33, color: '#fce4ec' }
  ];
  const kapelebyongSkills = [
    { label: t.impact.tailoring, value: 408, color: '#1565C0' }, { label: t.impact.bcp, value: 94, color: '#42a5f5' }, { label: t.impact.hairdressingShort, value: 72, color: '#90caf9' }
  ];

  return (
    <section className="relative z-20 -mt-20 px-4" id="impact">
      <div className="container">
        <div className="relative mb-14 overflow-hidden rounded-[2rem] bg-white p-7 shadow-2xl md:mb-16 md:rounded-[3rem] md:p-12">
          <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full bg-primary/5" />
          <div className="relative z-10 grid grid-cols-2 gap-5 md:gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="relative overflow-hidden rounded-2xl px-2 pb-4 text-center md:rounded-3xl">
                <div className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full ${stat.iconClass}`}><Icon size={21} /></div>
                <div className="mb-2 text-3xl font-bold font-outfit text-teso-dark md:text-5xl"><CountUp value={stat.value} />+</div>
                <div className="text-[10px] font-semibold uppercase leading-tight tracking-widest text-gray-500 md:text-sm">{stat.label}</div>
                <div className={`absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r ${stat.accent}`} />
              </motion.div>;
            })}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-[2.5rem] bg-teso-dark shadow-2xl md:rounded-[3rem]">
          <div className="px-7 pb-6 pt-9 md:px-12 md:pt-11">
            <h3 className="text-2xl font-bold font-outfit text-white md:text-3xl">{t.impact.trainingBreakdown}</h3>
            <p className="mt-1 text-sm font-semibold text-white/70">{t.impact.trainingPeriod}</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">{t.impact.chartLegend}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-white/10 px-5 py-8 sm:gap-8 sm:px-8 md:grid-cols-4 md:px-12 md:py-10">
            <DonutChart value={787} total={1361} label={t.impact.amuriaDistrict} totalLabel={t.common.total} color="#e91e8c" colorLight="rgba(233,30,140,.15)" size={148} delay={0} />
            <DonutChart value={574} total={1361} label={t.impact.kapelebyongDistrict} totalLabel={t.common.total} color="#42a5f5" colorLight="rgba(66,165,245,.15)" size={148} delay={0.08} />
            <DonutChart value={1010} total={1361} label={t.impact.femalesTrained} totalLabel={t.common.total} color="#f06292" colorLight="rgba(240,98,146,.15)" size={148} delay={0.16} />
            <DonutChart value={351} total={1361} label={t.impact.malesTrained} totalLabel={t.common.total} color="#90caf9" colorLight="rgba(144,202,249,.15)" size={148} delay={0.24} />
          </div>
          <div className="px-6 py-9 md:px-12 md:py-11">
            <h4 className="mb-7 text-sm font-bold font-outfit uppercase tracking-widest text-white">{t.impact.skillsDistribution}</h4>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <SkillBreakdown title="Amuria" total="787" color="#e91e8c" skills={amuriaSkills} />
              <SkillBreakdown title="Kapelebyong" total="574" color="#42a5f5" skills={kapelebyongSkills} />
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/20 bg-gradient-to-r from-primary/15 via-white/5 to-secondary/15 px-4 py-5 md:px-12 md:py-7">
            <div className="flex items-center justify-center gap-2.5 md:gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary"><Heart size={17} /></div><div><p className="text-[9px] font-semibold uppercase tracking-wider text-white/60 md:text-xs">{t.impact.females}</p><p className="text-lg font-extrabold font-outfit text-white md:text-xl">1,010</p></div></div>
            <div className="flex items-center justify-center gap-2.5 md:gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/20 text-secondary"><Users size={17} /></div><div><p className="text-[9px] font-semibold uppercase tracking-wider text-white/60 md:text-xs">{t.impact.males}</p><p className="text-lg font-extrabold font-outfit text-white md:text-xl">351</p></div></div>
            <div className="flex flex-col items-center justify-center"><p className="text-[9px] font-semibold uppercase tracking-wider text-white/60 md:text-xs">{t.impact.grandTotal}</p><p className="text-2xl font-extrabold font-outfit text-white md:text-3xl">1,361</p></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;
