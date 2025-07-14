import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Users, Shield, Zap, TrendingUp, Smartphone, Clock, BarChart3 } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

const About = () => {
  const [tagline, setTagline] = useState<string>("Call them out. Log them off.");
  const [taglineLoading, setTaglineLoading] = useState<boolean>(true);

  // Initialize analytics
  const { trackEvent } = useAnalytics();

  // Fetch tagline on mount
  useEffect(() => {
    let isMounted = true;
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

  const handleBackClick = () => {
    trackEvent("navigation", "about_page", "back_to_home");
    window.history.back();
  };

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Phone Number Lookup",
      description: "Enter any phone number to discover screen time patterns and digital habits."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Detailed Analytics",
      description: "Get comprehensive breakdowns of daily screen time, app usage, and category analysis."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Category Insights",
      description: "See how time is distributed across social media, productivity, entertainment, and more."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy Focused",
      description: "All lookups are anonymous and respect user privacy. No personal data is stored."
    }
  ];

  const useCases = [
    {
      title: "Digital Wellness Awareness",
      description: "Help friends and family understand their screen time habits and make informed decisions about their digital life.",
      examples: ["Family discussions", "Wellness coaching", "Digital detox planning"]
    },
    {
      title: "Social Accountability",
      description: "Use screen time data to start conversations about healthy technology use and digital boundaries.",
      examples: ["Friend check-ins", "Relationship discussions", "Social media awareness"]
    },
    {
      title: "Educational Tool",
      description: "Teach students and young people about digital wellness and responsible technology use.",
      examples: ["Classroom discussions", "Parent-teacher meetings", "Youth programs"]
    }
  ];

  const mockStats = {
    totalLookups: "47,892",
    averageScreenTime: "6.2 hours",
    topCategory: "Social Media",
    privacyScore: "100%"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-start justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            onClick={handleBackClick}
            variant="ghost"
            className="absolute left-0 top-0 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <img src="/LeekIconNoBG.png" alt="Time Leak Icon" className="w-full h-full object-cover rounded-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TimeLeak</h1>
          <p className="text-gray-600 text-lg">{taglineLoading ? "..." : tagline}</p>
        </div>



        {/* What is TimeLeak */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              What is TimeLeak?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              TimeLeak is a simple tool to help you — and the people around you — be more honest about screen time. 
              It's designed for anyone trying to spend less time on their phone and more time doing, well, literally anything else.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With just a phone number, you can see how much time someone spent on their phone yesterday, how many hours 
              on socials or entertainment, and how those minutes stack up. Sometimes seeing it written down and knowing 
              your friends can too, can be the motivation you needed to log off.
            </p>
          </CardContent>
        </Card>

        {/* Why I Built This */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Why I Built This
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              TimeLeak was born out of frustration, the frustration of knowing how much time phones steal from us 
              despite every attempt to break the habit. App limits, grayscale screens, deleting social media, all helpful, but often temporary.
            </p>
            <p className="text-gray-700 leading-relaxed">
              But you know what's hard to ignore? Accountability. Especially from the people whose opinions matter most.
            </p>
            <p className="text-gray-700 leading-relaxed">
              TimeLeak taps into the power of your circle. You can scroll for hours, and that's your choice, but by midnight, 
              your time is logged. Your friends might see. Or maybe they won't. But do you want to take that chance? 
              That's often enough to make us think twice.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Phones are winning those little in-between moments — while waiting for food, during commercials, walking across the room. 
              TimeLeak helps you take some of those moments back.
            </p>
          </CardContent>
        </Card>

        {/* How It Works */}
         <Card className="bg-white/80 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-600" />
              How It Works
            </CardTitle>
            <CardDescription>
              Simple steps to check screen time and create accountability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step-by-step process */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Download the Android App</h4>
                  <p className="text-gray-700 text-sm">
                    Install TimeLeak on your Android device to start tracking your screen time automatically.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Automatic Daily Upload</h4>
                  <p className="text-gray-700 text-sm">
                    Every night at midnight, your previous day's screen time data is uploaded and replaces the old data.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Search Any Phone Number</h4>
                  <p className="text-gray-700 text-sm">
                    Enter any phone number to see if they have screen time data available from yesterday.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">View Results</h4>
                  <p className="text-gray-700 text-sm">
                    See total screen time, app categories, and usage breakdowns — or nothing if no data exists.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Key features */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Daily Reset System</h5>
                  <p className="text-sm text-blue-700 leading-relaxed">
                    No permanent records, no history tracking. Every day at 11:59 pm, the day's data overwrites the previous day. 
                    It's designed for awareness, not surveillance — just a daily snapshot of your digital habits.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Ethics */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Privacy & Ethics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We take privacy seriously:
            </p>
            <ul className="text-gray-700 leading-relaxed space-y-2">
              <li>• No names, no ages, no personal details, just a phone number and yesterday's time stats.</li>
              <li>• Numbers are never saved or tracked, if there's no match, it's discarded instantly.</li>
              <li>• We don't store your search history.</li>
              <li>• The only tracking we do is standard visitor analytics (think page views, not people).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              I built this to encourage wellness, not shame. Share your time wisely, your mental health and safety always come first.
            </p>
          </CardContent>
        </Card>

        {/* What TimeLeak Is (and Isn't) */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              What TimeLeak Is (and Isn't)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <span className="text-green-600">✅</span> What TimeLeak Is
                </h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• A tool for self-awareness</li>
                  <li>• A way to invite your friends to check in with you (or each other)</li>
                  <li>• A daily reminder that those hours are adding up</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <span className="text-red-600">❌</span> What TimeLeak Isn't
                </h4>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• A surveillance tool</li>
                  <li>• A way to spy, stalk, or shame</li>
                  <li>• A data collection scheme</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              What's Next
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Right now, TimeLeak is about daily awareness, not tracking trends over time. In the future, 
              we might add more features, deeper insights, leaderboards, or new ways to visualize your habits. 
              But always with privacy and purpose at the core.
            </p>
          </CardContent>
        </Card>

        {/* Join the Movement */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Join the Movement</h3>
            <p className="text-blue-100 mb-4">
            </p>
            <p className="text-blue-100 mb-4">
              Check your time. Check your friends. Get outside.
            </p>
            <Button
              onClick={handleBackClick}
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Try TimeLeak Now
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            TimeLeak promotes digital wellness awareness and responsible technology use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 