import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const USERNAME = "calebephrem";
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const QUERY = `
  query($username: String!, $from: DateTime, $to: DateTime) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

type Level = 0 | 1 | 2 | 3 | 4;

type ContributionDay = {
  contributionCount: number;
  date: string;
};

const levelColors: Record<Level, string> = {
  0: "bg-off-white/10",
  1: "bg-accent/30",
  2: "bg-accent/50",
  3: "bg-accent/75",
  4: "bg-accent",
};

const dayLabels = [
  { label: "Mon", index: 1 },
  { label: "Wed", index: 3 },
  { label: "Fri", index: 5 },
];

function getLevel(count: number): Level {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

const Contributions: React.FC = () => {
  const [weeks, setWeeks] = useState<any[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      if (!token) return;

      const to = new Date();
      const from = new Date();
      from.setFullYear(to.getFullYear() - 1);

      try {
        const res = await fetch(GITHUB_GRAPHQL_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: QUERY,
            variables: {
              username: USERNAME,
              from: from.toISOString(),
              to: to.toISOString(),
            },
          }),
        });

        const json = await res.json();
        const calendar =
          json.data.user.contributionsCollection.contributionCalendar;
        setWeeks(calendar.weeks);
        setTotalContributions(calendar.totalContributions);
      } catch (e) {
        console.error("Failed to load GitHub contributions:", e);
      }
    };
    load();
  }, []);

  return (
    <section className="py-16 md:py-32 px-6 bg-near-black text-off-white w-full overflow-hidden relative">
      <div className="max-w-7xl mx-auto z-10 w-full">
        {/* Header Logic */}
        <div className="mb-8">
          <div className="overflow-hidden mb-4">
            <motion.h2
              className="font-pixel text-xl md:text-2xl"
              style={{ fontFamily: '"Press Start 2P", cursive' }}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              CONTRIBUTIONS
            </motion.h2>
          </div>
          <motion.p
            className="text-off-white/50 font-mono text-xs tracking-widest"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {totalContributions} contributions in the last year •
            <a
              href={`https://github.com/${USERNAME}`}
              className="text-accent ml-2 hover:underline"
            >
              @{USERNAME}
            </a>
          </motion.p>
        </div>

        <div className="inline-block">
          {/* Month Labels Row */}
          <motion.div
            className="flex text-[10px] font-mono text-off-white/30 mb-2 h-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="w-8" /> {/* Offset for day labels */}
            <div className="flex gap-[3px]">
              {weeks.map((week, i) => {
                const firstDay = new Date(week.contributionDays[0].date);
                const monthName = firstDay.toLocaleString("default", {
                  month: "short",
                });

                const prevWeekFirstDay =
                  i > 0
                    ? new Date(weeks[i - 1].contributionDays[0].date)
                    : null;
                const isNewMonth =
                  !prevWeekFirstDay ||
                  firstDay.getMonth() !== prevWeekFirstDay.getMonth();

                const isGraphStart = i === 0;
                let shouldSkipStartLabel = false;

                if (isGraphStart && weeks[4]) {
                  const fifthWeekDay = new Date(
                    weeks[4].contributionDays[0].date,
                  );

                  if (fifthWeekDay.getMonth() !== firstDay.getMonth()) {
                    shouldSkipStartLabel = true;
                  }
                }

                return (
                  <div key={i} className="w-5 flex-shrink-0 text-center">
                    {isNewMonth && !shouldSkipStartLabel ? monthName : ""}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="flex gap-2">
            {/* Day Labels Column */}
            <motion.div
              className="flex flex-col gap-[3px] h-[158px] justify-start pt-[2px]"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
                const label = dayLabels.find((d) => d.index === idx);
                return (
                  <div key={idx} className="h-5 flex items-center">
                    <span className="text-off-white/30 font-mono text-[10px] leading-none">
                      {label ? label.label : ""}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* The Grid */}
            <div className="flex gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <motion.div
                  key={weekIndex}
                  className="flex flex-col gap-[3px]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: weekIndex * 0.012, // ~0.6s total stagger across 52 weeks
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {week.contributionDays.map(
                    (day: ContributionDay, dayIndex: number) => {
                      const level = getLevel(day.contributionCount);
                      return (
                        <motion.div
                          key={day.date}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: weekIndex * 0.005 }}
                          className={`w-5 h-5 rounded-sm cursor-pointer hover:ring-1 hover:ring-white/50 ${levelColors[level]}`}
                          onMouseEnter={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();

                            const formattedDate = new Date(
                              day.date,
                            ).toLocaleDateString("default", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            });

                            setTooltip({
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8,
                              text: `${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formattedDate}`,
                            });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                        />
                      );
                    },
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <motion.div
            className="flex justify-end items-center gap-2 mt-4"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <span className="text-off-white/30 font-mono text-[10px]">
              Less
            </span>
            {([0, 1, 2, 3, 4] as Level[]).map((l) => (
              <div key={l} className={`w-3 h-3 rounded-sm ${levelColors[l]}`} />
            ))}
            <span className="text-off-white/30 font-mono text-[10px]">
              More
            </span>
          </motion.div>
        </div>
      </div>

      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 bg-white text-black font-mono text-[10px] rounded pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </section>
  );
};

export default Contributions;
