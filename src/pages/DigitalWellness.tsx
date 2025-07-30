import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Brain, Zap, Eye, Heart, Target, Lightbulb, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

const DigitalWellness = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [tagline, setTagline] = useState<string>("Call them out. Log them off.");
  const [taglineLoading, setTaglineLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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
    window.history.back();
  };

  const handleIconClick = () => {
    navigate("/");
  };

  const handleExternalLink = (url: string, topic: string) => {
    window.open(url, '_blank');
  };

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const wellnessTopics = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "The Mental Health Cost of Screen Time",
      description: "Excessive screen time has been linked to increased anxiety, depression, and loneliness, particularly affecting teens and young adults.",
      content: "Research shows that heavy social media use correlates with higher rates of depression and anxiety. The constant comparison, fear of missing out (FOMO), and disrupted sleep patterns create a perfect storm for mental health challenges.",
      highlights: [
        "Excessive screen time can cause behavior problems, which then can lead to even more screen time, creating a harmful cycle.",
        "The U.S. loses $73 billion each year because of health problems linked to too much screen time.",
        "Constant comparison leads to decreased self-esteem and body image issues.",
        "The mere presence of a smartphone can reduce cognitive performance and attention."
      ],
      links: [
      {
         title: "Tanner Welton: Cell Phone Addiction",
         url: "https://www.ted.com/talks/tanner_welton_cell_phone_addiction",
         description: "TEDx talk where Tanner Welton explores how our phones can become addictive and impact our lives"
         },
        {
         title: "The Anxious Generation with Jonathan Haidt | What Now? with Trevor Noah Podcast",
         url: "https://www.youtube.com/watch?v=Ey4XhHqnkuQ",
         description: "Jonathan Haidt discusses how smartphones and social media are affecting Gen Z in a candid talk with Trevor Noah"
       },
      ]
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "The Dopamine Trap",
      description: "Apps are engineered to hijack your attention through infinite scroll, likes, and notifications that trigger dopamine releases.",
      content: "Every notification, like, or scroll creates a small happiness hit that keeps you coming back for more. Tech companies employ teams of psychologists and neuroscientists to optimize these 'hooks' that make their products addictive.",
      highlights: [
        "Infinite scroll eliminates natural stopping points",
        "Variable reward schedules (like slot machines) keep users engaged",
        "Social validation through likes creates addictive feedback loops"
      ],
      links: [
      {
         title: "Center for Humane Technology – Solutions Overview",
         url: "https://www.humanetech.com/solutions",
         description: "An overview of strategies and actions—from platform design to policy—to create tech that prioritizes people’s well‑being"
         },
        {
          title: "The Social Dilemma Documentary",
          url: "https://www.thesocialdilemma.com/",
          description: "Netflix documentary exploring social media's addictive design"
        }
      ]
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Social Media and Reality Distortion",
      description: "Bots, algorithmic feeds, and AI-generated content are subtly manipulating what you see and believe.",
      content: "What you see on social media is increasingly curated by algorithms designed to maximize engagement, not truth. This creates echo chambers, spreads misinformation, and distorts your perception of reality.",
      highlights: [
        "Algorithmic feeds prioritize engagement over accuracy",
        "A few people with loud opinions can make it seem like everyone thinks the same way, even if that’s not true.",
        "People post their best moments, making it seem like everyone is happier or more successful.",
        "Distortion can have profound consequences for mental health, social cohesion, and public decision-making."
      ],
      links: [
         {
            title: "How a Small but Vocal Minority Distorts Reality & Sows Division",
            url: "https://www.pbs.org/newshour/show/how-a-small-but-vocal-minority-of-social-media-users-distort-reality-and-sow-division",
            description: "PBS NewsHour explores how a few loud social media voices can warp public perception and deepen social divides"
          },
          {
            title: "Dead Internet Theory",
            url: "https://en.wikipedia.org/wiki/Dead_Internet_theory",
            description: "An overview of the theory that much of the internet is produced by bots and AI, rather than real humans"
          }          
      ]
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Physical Health Impacts",
      description: "Screen time affects your body through poor sleep, sedentary behavior, and blue light exposure.",
      content: "The physical consequences of excessive screen time extend beyond just eye strain. Blue light disrupts sleep cycles, while sedentary behavior contributes to obesity, heart disease, and other health issues.",
      highlights: [
        "Extended phone use is linked to more frequent headaches and can worsen migraine symptoms",
        "Sedentary behavior linked to obesity, diabetes, and heart disease",
        "These devices get in the way of living a healthy life."
      ],
      links: [
        {
          title: "Harvard Health on Blue Light",
          url: "https://www.health.harvard.edu/staying-healthy/blue-light-has-a-dark-side",
          description: "Medical research on blue light's effects on sleep and health"
        },
        {
          title: "WHO Guidelines on Physical Activity",
          url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
          description: "Official recommendations for reducing sedentary behavior"
        }
      ]
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Your Attention is the Product",
      description: "If it's free, you're the product. Your time and attention generate ad revenue for tech companies.",
      content: "Social media platforms don't charge users because they're selling your attention to advertisers. The more time you spend, the more ads you see, and the more money they make. Your attention is literally their business model.",
      highlights: [
         "Platforms optimize for 'time spent' over your health and wellbeing",
         "Personal data fuels targeted advertising algorithms, directly translating to increased revenue",
         "The digital advertising industry reached a record $259 billion in revenue in 2024"
      ],
      links: [
         {
            title: "How We've All Lost Control of Our Minds",
            url: "https://www.youtube.com/watch?v=zQoTgejl60s",
            description: "Tim Wu explains how tech exploits our attention and impacts our ability to focus"
          },
          {
            title: "Scott Galloway: The Attention Addiction Economy",
            url: "https://www.profgalloway.com/addiction-economy/",
            description: "Scott Galloway examines how companies profit from our digital addictions and attention economy"
          },
        {
         title: "IAB/PwC Internet Ad Revenue Report 2024",
         url: "https://www.iab.com/wp-content/uploads/2024/04/IAB_PwC_Internet_Ad_Revenue_Report_2024.pdf",
         description: "Industry report detailing digital advertising revenue trends and growth metrics for 2023–2024"
       }
      ]
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "What You Can Do About It",
      description: "Practical steps to regain control of your digital life and improve your wellbeing.",
      content: "Awareness is the first step. From there, try strategies to reduce screen time, improve sleep, and build healthier digital habits. TimeLeak can help you stay accountable along the way.",
      highlights: [
         "Make good habits easy and bad habits harder to access.",
         "Practice digital mindfulness—change starts with intention.",
         "Disable non-essential app notifications.",
         "Create phone-free zones and times.",
         "Swap scrolling for reading, hobbies, or real social interaction.",
         "Unfollow accounts that don’t serve your wellbeing.",
         "Connect with friends and family in person whenever possible.",
         "Keep experimenting—find what works for you.",
         "Make health-conscious choices in every area of life."
      ],
      links: [
         {
            title: "Why Peer Support Is Crucial in Addiction Recovery",
            url: "https://therehab.com/the-power-of-connection-why-peer-support-is-crucial-in-addiction-recovery/",
            description: "Explores how peer relationships can support recovery by offering empathy, shared experience, and accountability."
          },
          {
            title: "How Tech Is Recycling Big Tobacco’s Playbook",
            url: "https://www.humanetech.com/podcast/weaponizing-uncertainty-how-tech-is-recycling-big-tobaccos-playbook",
            description: "Podcast episode featuring Naomi Oreskes on how tech mirrors Big Tobacco’s tactics to sow doubt and delay regulation",
          },
          {
            title: "Jonathan Haidt on Social Media’s Impact",
            url: "https://jonathanhaidt.com/social-media/",
            description: "Insights from Jonathan Haidt on how social media affects mental health and society"
          },
          {
            title: "The Beginner’s Guide to NoSurf",
            url: "https://www.reddit.com/r/nosurf/comments/9cbyn5/the_beginners_guide_to_nosurf_essential_reading/",
            description: "Reddit thread offering foundational advice and insights for reducing internet use and embracing a low‑surf lifestyle"
          },
          {
            title: "Nothing: Simply Do Nothing",
            url: "https://nothing.mvze.net/start/",
            description: "A minimalist timer that encourages you to pause, breathe, and embrace doing absolutely nothing" 
          },
          {
            title: "On Tyranny: Twenty Lessons from the Twentieth Century",
            url: "https://qrco.de/fuckfascism",
            description: "A call to stay active, aware, and intentional in resistance."
          },
          {
            title: "Food Not Bombs – Official Site",
            url: "https://foodnotbombs.net/new_site/index.php",
            description: "Community-based movement sharing free vegan meals to protest war, poverty, and environmental destruction."
          },
          {
            title: "NutritionFacts.org",
            url: "https://nutritionfacts.org/",
            description: "Evidence-based updates on the latest in nutrition research."
          },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-start justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-300/10 to-blue-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-2">
          <Button
            onClick={handleBackClick}
            variant="ghost"
            className="absolute left-0 top-0 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div 
            className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-2 mt-2 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={handleIconClick}
          >
            <img src="/LeekIconNoBG.png" alt="Time Leak Icon" className="w-full h-full object-cover rounded-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">TimeLeak</h1>
          <p className="text-gray-600">{taglineLoading ? "..." : tagline}</p>
        </div>

        {/* Wellness Topics - Grid Layout */}
        <div className="space-y-4 mb-6">
          {wellnessTopics.map((topic, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleSection(index)}>
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    {topic.icon}
                    <span className="text-base">{topic.title}</span>
                  </div>
                  <div className={`text-gray-500 transition-transform duration-300 ease-in-out ${
                    expandedSections[index] ? 'rotate-180' : 'rotate-0'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {topic.description}
                </CardDescription>
              </CardHeader>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedSections[index] 
                    ? 'max-h-[2000px] opacity-100 translate-y-0' 
                    : 'max-h-0 opacity-0 -translate-y-2'
                }`}
              >
                <CardContent className="pt-0 space-y-3">
                    <div className="cursor-pointer" onClick={() => toggleSection(index)}>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {topic.content}
                      </p>
                      
                      {/* Key Highlights - Condensed */}
                      <div className="bg-blue-50 p-3 rounded-lg mt-3">
                        <h5 className="font-medium text-blue-800 text-sm mb-2">Key Points:</h5>
                        <ul className="space-y-1">
                          {topic.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-xs text-blue-700 flex items-start gap-2">
                              <span className="text-blue-600 text-xs">•</span>
                              <span className="flex-1">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* External Links - Side by Side */}
                      <div className="mt-3">
                        <h5 className="font-medium text-gray-900 text-sm mb-2">Learn More:</h5>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {topic.links.map((link, idx) => (
                        <div 
                          key={idx} 
                          className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExternalLink(link.url, topic.title.toLowerCase().replace(/\s+/g, '_'));
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h6 className="font-medium text-gray-900 text-sm truncate">{link.title}</h6>
                              <p className="text-xs text-gray-600 truncate">{link.description}</p>
                            </div>
                            <ExternalLink className="w-3 h-3 text-blue-600 ml-2 flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold mb-2">Take Control of Your Digital Life</h3>
            <p className="text-green-100 mb-3 text-sm">
              Start with awareness. Use this app to leak your screen time and take back control.
            </p>
            <Button
              onClick={handleBackClick}
              variant="secondary"
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              Check Your Screen Time
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            Digital wellness is about creating a healthy relationship with technology. Your mental and physical health matter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalWellness;