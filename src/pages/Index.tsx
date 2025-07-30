import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import Search from "lucide-react/dist/esm/icons/search";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";
import { ScreenTimeData } from "@/types/screentime";

const ScreenTimeResults = lazy(() => import("@/components/ScreenTimeResults"));

const Index = () => {
  const [countryCode, setCountryCode] = useState<string>("1");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [screenTimeData, setScreenTimeData] = useState<ScreenTimeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagline, setTagline] = useState<string>("Call them out. Log them off.");
  const [taglineLoading, setTaglineLoading] = useState<boolean>(true);
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
  const [hasFoundData, setHasFoundData] = useState(false); // Track if we've successfully found data
  const navigate = useNavigate();

  // Initialize analytics
  const { trackEvent, trackScreenTime } = useAnalytics();

  // Fetch tagline on mount
  useEffect(() => {
    let isMounted = true;
    // Dynamically import the tagline fetcher to code-split it
    import("@/lib/screentime-api").then(({ fetchRandomTagline }) => {
      fetchRandomTagline().then(t => {
        if (isMounted) {
          setTagline(t);
          setTaglineLoading(false);
        }
      }).catch(() => {
        setTaglineLoading(false);
      });
    });

    return () => { isMounted = false; };
  }, []);

  const handlePhoneChange = (value: string) => {
    // Remove all non-digit characters for formatting
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format the phone number as (XXX) XXX-XXXX
    let formatted = '';
    if (digitsOnly.length <= 3) {
      formatted = digitsOnly;
    } else if (digitsOnly.length <= 6) {
      formatted = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else {
      formatted = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    }
    
    setPhoneNumber(formatted);
    setError(null);
  };

  const handleCountryCodeChange = (value: string) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    setCountryCode(digitsOnly);
  };

  const handleLookup = async () => {
    if (!phoneNumber || !phoneNumber.trim()) {
      setError("Please enter a phone number");
      trackEvent("validation_error", "phone_lookup", "empty_phone_number");
      return;
    }

    // Dynamically import the heavy phone number library only when needed
    // We import from 'libphonenumber-js/min' which is better for bundling
    // and uses a default export.
    const { default: parsePhoneNumberFromString } = await import("libphonenumber-js/min");

    // Parse and validate phone number using libphonenumber-js
    const fullPhoneNumber = `+${countryCode}${phoneNumber.replace(/\D/g, '')}`;
    const phoneObj = parsePhoneNumberFromString(fullPhoneNumber);
    if (!phoneObj || !phoneObj.isValid()) {
      setError("Please enter a valid phone number");
      trackEvent("validation_error", "phone_lookup", "invalid_phone_number");
      return;
    }

    const e164PhoneNumber = phoneObj.number; // E.164 format for lookup

    // Track successful lookup attempt
    trackEvent("lookup_attempt", "phone_lookup", "screen_time_search");

    setScreenTimeData(null);
    setIsLoading(true);
    setError(null);

    try {
      // Dynamically import the lookup function to code-split Firebase
      const { lookupScreenTime } = await import("@/lib/screentime-api");
      const data = await lookupScreenTime(e164PhoneNumber) as ScreenTimeData;
      setScreenTimeData(data);
      
      // Track successful lookup
      trackScreenTime("lookup_success", {
        phone_number: e164PhoneNumber,
        total_screen_time: data.totalScreenTime,
        has_social_media: data.categoryBreakdown["Social Media"] > 0
      });
      
      // Only set these states if we successfully found data
      setHasFoundData(true);
      setIsInputCollapsed(true);
    } catch (err) {
      console.error("Lookup error:", err);
      setError("No screen time data found for this phone number");
      
      // Track failed lookup
      trackEvent("lookup_failed", "phone_lookup", "no_data_found");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLookup();
    }
  };

  // Toggle collapse function
  const toggleInputCollapse = () => {
    setIsInputCollapsed(!isInputCollapsed);
    trackEvent("ui_interaction", "phone_input", isInputCollapsed ? "expand" : "collapse");
  };

  // Reset to home state function
  const resetToHome = () => {
    setCountryCode("1");
    setPhoneNumber("");
    setScreenTimeData(null);
    setIsLoading(false);
    setError(null);
    setIsInputCollapsed(false);
    setHasFoundData(false);
    trackEvent("ui_interaction", "home_icon", "reset_to_home");
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-start justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-2">
          <div 
            className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-2 mt-2 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={resetToHome}
          >
            <img src="/LeekIconNoBG.png" alt="Time Leak Icon" className="w-full h-full object-cover rounded-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">TimeLeak</h1>
          <p className="text-gray-600">{taglineLoading ? "..." : tagline}</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
          {/* Toggle button - Only show after successful data lookup */}
          {hasFoundData && (
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <button
                  onClick={toggleInputCollapse}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  type="button"
                >
                  <Search className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                </button>
              </div>
            </div>
          )}

          {/* Input Section - Always visible until first lookup, then collapsible */}
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
            hasFoundData && isInputCollapsed ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
          }`}>
            <div className={`${hasFoundData ? 'px-6 pb-6' : 'p-6'} ${hasFoundData ? 'border-b border-gray-100' : ''}`}>
              <div className="space-y-4">
                <div>
                  {!hasFoundData && (
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                      Phone Number
                    </Label>
                  )}
                  <div className="flex gap-2 mb-3">
                    {/* Country Code Input */}
                    <div className="relative">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg h-12 px-3 min-w-[60px]">
                        <span className="text-gray-700 font-medium mr-1">+</span>
                        <Input
                          type="text"
                          value={countryCode}
                          onChange={(e) => handleCountryCodeChange(e.target.value)}
                          className="border-none bg-transparent p-0 h-auto text-base font-medium text-gray-700 w-12 focus:ring-0 focus:outline-none"
                          disabled={isLoading}
                          maxLength={3}
                          placeholder="1"
                        />
                      </div>
                    </div>

                    {/* Phone Number Input */}
                    <div className="flex-1">
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="h-12 text-base"
                        disabled={isLoading}
                        onKeyDown={handleKeyPress}
                        id="phone"
                        name="phone"
                        required
                        maxLength={14}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleLookup}
                  disabled={isLoading || !phoneNumber}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Look Up
                    </div>
                  )}
                </Button>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isLoading || screenTimeData ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <Suspense fallback={<div className="p-6"><ResultsSkeleton /></div>}>
              <div className="p-6">
                {isLoading && <ResultsSkeleton />}
                {screenTimeData && !isLoading && (
                  <div className="animate-in fade-in duration-500">
                    <ScreenTimeResults data={screenTimeData} />
                  </div>
                )}
              </div>
            </Suspense>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-xs text-gray-500">
            This tool promotes healthy digital habits.
          </p>
          
          {/* About Link Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => {
            trackEvent("navigation", "index_page", "about_page_link");
            navigate("/about");
          }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Learn More About TimeLeak
                  </h3>
                  <p className="text-sm text-gray-600">
                    Discover how this tool works and how you can use it
                  </p>
                </div>
                <div className="text-blue-600 group-hover:text-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Wellness Link Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => {
            trackEvent("navigation", "index_page", "digital_wellness_page_link");
            navigate("/digital-wellness");
          }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    Digital Wellness Guide
                  </h3>
                  <p className="text-sm text-gray-600">
                    Learn about the impact of technology on your wellbeing
                  </p>
                </div>
                <div className="text-green-600 group-hover:text-green-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Early Access Link Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => {
            trackEvent("navigation", "index_page", "early_access_link");
            window.open("https://forms.gle/64HCMMKyx6WJyXgQ8", "_blank");
          }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    Get Early Access
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sign up to be one of the first to use the Android app.
                  </p>
                </div>
                <div className="text-purple-600 group-hover:text-purple-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ResultsSkeleton = () => (
  <div className="space-y-4 animate-in fade-in duration-300">
    <div className="flex items-center gap-2 mb-4">
      <Skeleton className="h-5 w-5 rounded" />
      <Skeleton className="h-5 w-32" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-20 rounded-lg" />
      <Skeleton className="h-20 rounded-lg" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  </div>
);

export default Index;