import { ShipmentList } from "@/components/dashboard/shipment-list";
import { StatsCards } from "@/components/dashboard/stats-cards";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8 gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Logistics Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your shipments and track deliveries in real-time
        </p>
      </div>
      
      <StatsCards />
      <ShipmentList />
    </main>
  );
}