import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { MagicCard } from "@/components/MagicCard";
import { Skeleton } from "@/components/ui/skeleton";

interface AutomatedRewards {
  id: string;
  currentTotal: string;
  lastUpdated: string;
  createdAt: string;
}

export function RewardsCounter() {
  const { data: rewards, isLoading, isError } = useQuery<AutomatedRewards>({
    queryKey: ["/api/rewards"],
    refetchInterval: 60000,
  });

  const formatCurrency = (value: string | undefined) => {
    if (!value) return "$471,552";
    const num = parseFloat(value);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <MagicCard
      enableParticles={true}
      enableTilt={true}
      enableMagnetism={true}
      enableClickRipple={true}
      enableGlow={true}
      particleCount={15}
      glowColor="251, 191, 36"
    >
      <Card className="p-12 max-w-2xl mx-auto glow-border bg-card/80 backdrop-blur-sm">
        {isLoading ? (
          <Skeleton className="h-24 w-full mb-4" data-testid="skeleton-rewards-counter" />
        ) : (
          <div className="text-6xl md:text-8xl font-bold gradient-text mb-4" data-testid="text-rewards-counter">
            {isError ? "$471,552" : formatCurrency(rewards?.currentTotal)}
          </div>
        )}
        <p className="text-lg text-muted-foreground" data-testid="text-rewards-distributed">
          Total Rewards Distributed
        </p>
      </Card>
    </MagicCard>
  );
}
