
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ScreenTimeData } from "@/types/screentime";
import { formatTime } from "@/lib/time-utils";

interface ScreenTimeResultsProps {
  data: ScreenTimeData;
}

const categoryEmojis = {
  "Social Media": "📘",
  "Entertainment": "🎬", 
  "Productivity": "💼",
  "Messaging": "💬",
  "Other": "❓"
};

const categoryColors = {
  "Social Media": "bg-pink-500",
  "Entertainment": "bg-purple-500",
  "Productivity": "bg-green-500", 
  "Messaging": "bg-blue-500",
  "Other": "bg-gray-500"
};

const ScreenTimeResults = ({ data }: ScreenTimeResultsProps) => {
  const totalMinutes = data.totalScreenTime;
  
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-white shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Screen Time Summary
          </CardTitle>
          <div className="text-gray-600">
            <p className="text-lg">{data.date}</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">
              {formatTime(totalMinutes)}
            </p>
          </div>
        </CardHeader>
      </Card>

      {/* Category Breakdown */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Time by Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(data.categoryBreakdown).map(([category, minutes]) => {
            if (minutes === 0) return null;
            
            const percentage = totalMinutes > 0 ? (minutes / totalMinutes) * 100 : 0;
            const emoji = categoryEmojis[category as keyof typeof categoryEmojis];
            const colorClass = categoryColors[category as keyof typeof categoryColors];
            
            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{emoji}</span>
                    <span className="font-medium">{category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatTime(minutes)}</div>
                    <div className="text-sm text-gray-500">{percentage.toFixed(0)}%</div>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={percentage} className="h-3" />
                  <div 
                    className={`absolute top-0 left-0 h-3 rounded-full ${colorClass}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Top Apps */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Most Used Apps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.apps
              .sort((a, b) => b.timeSpent - a.timeSpent)
              .slice(0, 5)
              .map((app, index) => {
                const percentage = totalMinutes > 0 ? (app.timeSpent / totalMinutes) * 100 : 0;
                return (
                  <div key={app.name} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{app.name}</div>
                        <div className="text-sm text-gray-500">{app.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatTime(app.timeSpent)}</div>
                      <div className="text-sm text-gray-500">{percentage.toFixed(0)}%</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScreenTimeResults;
