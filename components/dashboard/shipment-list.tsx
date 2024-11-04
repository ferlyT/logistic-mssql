"use client";

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { Package2, Truck, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Shipment {
  ShipmentID: string;
  TrackingNumber: string;
  Status: string;
  Origin: string;
  Destination: string;
  EstimatedDeliveryDate: string;
  ActualDeliveryDate: string | null;
  CustomerName: string;
  CreatedAt: string;
}

export function ShipmentList() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShipments() {
      try {
        const response = await fetch('/api/shipments');
        const data = await response.json();
        setShipments(data);
      } catch (error) {
        console.error('Failed to fetch shipments:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchShipments();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'In Transit': 'bg-blue-500',
      'Delivered': 'bg-green-500',
      'Pending': 'bg-yellow-500',
      'Delayed': 'bg-red-500',
    };

    return (
      <Badge className={statusStyles[status as keyof typeof statusStyles] || 'bg-gray-500'}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package2 className="h-6 w-6" />
          Active Shipments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking #</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Est. Delivery</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.ShipmentID}>
                <TableCell className="font-medium">{shipment.TrackingNumber}</TableCell>
                <TableCell>{getStatusBadge(shipment.Status)}</TableCell>
                <TableCell>{shipment.CustomerName}</TableCell>
                <TableCell>{shipment.Origin}</TableCell>
                <TableCell>{shipment.Destination}</TableCell>
                <TableCell>
                  {format(new Date(shipment.EstimatedDeliveryDate), 'MMM dd, yyyy')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}