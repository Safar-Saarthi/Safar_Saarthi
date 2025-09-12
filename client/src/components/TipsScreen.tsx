import { Shield, AlertTriangle, MapPin, Phone, Eye, Clock, Heart, Plane, FileText, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { SafetyTip } from "@shared/schema";

export default function TipsScreen() {
  // Fetch safety tips from API
  const { data: safetyTips = [], isLoading } = useQuery<SafetyTip[]>({
    queryKey: ['/api/safety-tips'],
  });

  // Map categories to icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Emergency Prep": return Phone;
      case "General Safety": return Shield;
      case "Communication": return Users;
      case "Travel Planning": return Plane;
      case "Health & Wellness": return Heart;
      case "Transportation": return MapPin;
      case "Documentation": return FileText;
      default: return Eye;
    }
  };

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
      case "Health & Wellness": return "text-chart-3";
      case "Transportation": return "text-chart-4";
      case "Documentation": return "text-chart-5";
      default: return "text-muted-foreground";
    }
  };

  if (isLoading) {
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
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="flex gap-2">
                        <div className="h-5 bg-muted rounded w-20"></div>
                        <div className="h-5 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            const IconComponent = getCategoryIcon(tip.category);
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