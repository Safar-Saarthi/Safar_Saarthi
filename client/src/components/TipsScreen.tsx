import { Shield, AlertTriangle, MapPin, Phone, Eye, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TipsScreen() {
  //todo: remove mock functionality
  const safetyTips = [
    {
      id: "1",
      title: "Always Stay Alert in Crowded Areas",
      content: "Keep your belongings secure and be aware of your surroundings, especially in tourist hotspots. Pickpockets often target distracted visitors.",
      category: "General Safety",
      priority: "high",
      icon: Eye
    },
    {
      id: "2", 
      title: "Share Your Location with Trusted Contacts",
      content: "Always inform family or friends about your travel plans and current location. Use location sharing features when exploring unfamiliar areas.",
      category: "Communication",
      priority: "high",
      icon: MapPin
    },
    {
      id: "3",
      title: "Keep Emergency Numbers Handy",
      content: "Save local emergency numbers, embassy contacts, and tourist helpline numbers in your phone. Know the universal emergency number (112) for most countries.",
      category: "Emergency Prep",
      priority: "critical",
      icon: Phone
    },
    {
      id: "4",
      title: "Research Local Safety Conditions",
      content: "Before visiting any destination, research current safety conditions, common scams, and areas to avoid, especially during certain times of day.",
      category: "Travel Planning",
      priority: "medium", 
      icon: Shield
    },
    {
      id: "5",
      title: "Avoid Displaying Expensive Items",
      content: "Keep jewelry, expensive electronics, and large amounts of cash hidden. Use hotel safes for valuables and consider using a money belt.",
      category: "General Safety",
      priority: "high",
      icon: AlertTriangle
    },
    {
      id: "6",
      title: "Plan Your Return Route",
      content: "Always have a plan for getting back to your accommodation safely, especially when going out at night. Know public transport schedules and taxi options.",
      category: "Travel Planning", 
      priority: "medium",
      icon: Clock
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Emergency Prep": return "text-destructive";
      case "General Safety": return "text-orange-600";
      case "Communication": return "text-primary";
      case "Travel Planning": return "text-chart-2";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="flex-1 overflow-auto pb-20">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2" data-testid="text-tips-title">Safety Tips</h1>
          <p className="text-muted-foreground">
            Essential safety advice for travelers to stay safe and enjoy their journey
          </p>
        </div>

        <div className="space-y-4">
          {safetyTips.map((tip) => {
            const IconComponent = tip.icon;
            return (
              <Card key={tip.id} className="hover-elevate cursor-pointer" data-testid={`tip-card-${tip.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${getCategoryColor(tip.category)} bg-current/10`}>
                        <IconComponent className={`h-5 w-5 ${getCategoryColor(tip.category)}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base leading-tight" data-testid={`tip-title-${tip.id}`}>
                          {tip.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                            data-testid={`tip-category-${tip.id}`}
                          >
                            {tip.category}
                          </Badge>
                          <Badge 
                            className={`text-xs ${getPriorityColor(tip.priority)}`}
                            data-testid={`tip-priority-${tip.id}`}
                          >
                            {tip.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p 
                    className="text-sm text-muted-foreground leading-relaxed"
                    data-testid={`tip-content-${tip.id}`}
                  >
                    {tip.content}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Reference Card */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Quick Safety Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Trust your instincts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Stay connected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Know your surroundings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Keep emergency contacts ready</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}