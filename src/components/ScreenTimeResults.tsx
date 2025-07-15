import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ScreenTimeData } from "@/types/screentime";
import { formatTime } from "@/lib/time-utils";

interface ScreenTimeResultsProps {
  data: ScreenTimeData;
}

const categoryIcons: Record<string, { label: string }> = {
  "Social Media": { label: "Social Media" },
  "Entertainment": { label: "Entertainment" },
  "Productivity": { label: "Productivity" },
  "Messaging": { label: "Messaging" },
  "Other": { label: "Other" },
};

const ScreenTimeResults = ({ data }: ScreenTimeResultsProps) => {
  const totalMinutes = data.totalScreenTime;
  const goalMinutes = data.goalTime || 270; // Default to 4.5 hours (270 minutes) if no goal set
  const categories = Object.entries(data.categoryBreakdown).filter(([, minutes]) => minutes > 0);

  // Calculate color based on category time (0-60min = green, 60-120min+ = red)
  const getCategoryColor = (minutes: number) => {
    if (minutes <= 60) {
      // Green zone: interpolate from green to yellow-green
      const ratio = minutes / 60;
      const red = Math.round(0 + (255 - 0) * ratio * 0.3);
      const green = Math.round(255 - (255 - 200) * ratio * 0.2);
      const blue = Math.round(0);
      return `rgb(${red}, ${green}, ${blue})`;
    } else {
      // Red zone: interpolate from yellow to red
      const ratio = Math.min((minutes - 60) / 60, 1); // 60 minutes to reach full red at 120 minutes
      const red = 255; // Keep red at maximum
      const green = Math.round(200 * (1 - ratio)); // Fade green to 0
      const blue = Math.round(0); // Keep blue at 0
      return `rgb(${red}, ${green}, ${blue})`;
    }
  };

  // Calculate color based on screen time relative to goal time
  const getScreenTimeColor = (minutes: number) => {
    const hours = minutes / 60;
    const goalHours = goalMinutes / 60;
    
    if (minutes <= goalMinutes) {
      // Green zone: interpolate from bright green to yellow-green as you approach goal
      const ratio = minutes / goalMinutes;
      const red = Math.round(34 + (255 - 34) * ratio * 0.3);
      const green = Math.round(197 + (235 - 197) * (1 - ratio * 0.2));
      const blue = Math.round(94 + (59 - 94) * ratio * 0.5);
      return `rgb(${red}, ${green}, ${blue})`;
    } else {
      // Red zone: interpolate from bright orange to stop sign red as you exceed goal
      const excessMinutes = minutes - goalMinutes;
      const maxExcess = goalMinutes * 0.5; // 50% over goal to reach full red
      const ratio = Math.min(excessMinutes / maxExcess, 1);
      
      if (ratio <= 0.375) {
        // First part: bright orange to red-orange
        const subRatio = ratio / 0.375;
        const red = 255; // Keep red at maximum
        const green = Math.round(165 - (165 - 100) * subRatio); // Orange to red-orange
        const blue = Math.round(0);
        return `rgb(${red}, ${green}, ${blue})`;
      } else {
        // Second part: red-orange to stop sign red
        const subRatio = (ratio - 0.375) / 0.625;
        const red = 255; // Keep red at maximum for stop sign red
        const green = Math.round(100 * (1 - subRatio)); // Fade green to 0
        const blue = Math.round(0); // Keep blue at 0 for stop sign red
        return `rgb(${red}, ${green}, ${blue})`;
      }
    }
  };

  const summaryColor = getScreenTimeColor(totalMinutes);


  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <div className="flex flex-col items-center justify-center ">
        <div
          className="rounded-xl shadow-lg flex flex-col items-center justify-center py-4 px-6 mx-auto"
          style={{ background: summaryColor , minHeight: 120, width: '100%' }}
        >
          <div className="text-white text-lg font-bold mb-1" style={{ letterSpacing: -1 }}>
            Last 24hr
          </div>
          <div className="text-white font-extrabold text-5xl mb-1" style={{ fontSize: 48, letterSpacing: -2, lineHeight: 1 }}>
            {formatTime(totalMinutes)}
          </div>
          <div className="text-white text-base opacity-90 mb-1">
            Synced: {data.date}
          </div>
          {/* <div className="text-white text-sm opacity-75">
            Goal: {formatTime(goalMinutes)}
          </div> */}
        </div>
      </div>

      {/* Category Breakdown - pill shaped, white, minimal */}
      <div
        className="w-full rounded-3xl shadow-lg bg-white px-7 py-6"
        style={{ minHeight: 120 }}
      >
        <div className="text-[20px] font-semibold text-gray-800 mb-5">Time by Category</div>
        <div className="flex flex-col divide-y divide-gray-200">
          {categories.map(([category, minutes], idx) => {
            const percentage = (minutes / 1440) * 100; // 1440 minutes = 24 hours
            const iconColor = getCategoryColor(minutes);
            return (
              <div key={category} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    aria-label={category}
                    className="inline-block"
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      background: iconColor,
                      display: 'inline-block',
                      marginRight: 8,
                    }}
                  />
                  <span className="text-gray-700 text-base truncate" style={{ maxWidth: 120 }}>{category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-900 font-bold text-base" style={{ minWidth: 48, textAlign: 'right' }}>{formatTime(minutes)}</span>
                  {/* <span className="text-gray-400 text-sm" style={{ minWidth: 32, textAlign: 'right' }}>{percentage.toFixed(1)}%</span> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScreenTimeResults;
