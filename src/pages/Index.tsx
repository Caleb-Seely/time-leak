
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import ScreenTimeResults from "@/components/ScreenTimeResults";
import { lookupScreenTime } from "@/lib/screentime-api";
import type { ScreenTimeData } from "@/types/screentime";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [screenTimeData, setScreenTimeData] = useState<ScreenTimeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    if (!phoneNumber.trim()) {
      setError("Please enter a phone number");
      return;
    }

    setIsLoading(true);
    setError(null);
    setScreenTimeData(null);

    try {
      const data = await lookupScreenTime(phoneNumber);
      setScreenTimeData(data);
    } catch (err) {
      console.error("Lookup error:", err);
      setError("No screen time data found for this phone number. Make sure you've shared your data recently.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLookup();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            📱 Screen Time Peek
          </h1>
          <p className="text-lg text-gray-600">
            Check yesterday's phone usage by entering any phone number
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-base font-medium">
                Phone Number
              </Label>
              <div className="flex gap-3 mt-2">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg h-12"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleLookup}
                  disabled={isLoading}
                  className="h-12 px-6"
                >
                  {isLoading ? "Searching..." : "Look Up"}
                </Button>
              </div>
            </div>

            {error && (
              <Alert>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        )}

        {screenTimeData && !isLoading && (
          <ScreenTimeResults data={screenTimeData} />
        )}

        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>This tool promotes awareness of digital wellness and screen time habits.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
