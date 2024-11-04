import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const shipments = await executeQuery(`
      SELECT 
        ShipmentID,
        TrackingNumber,
        Status,
        Origin,
        Destination,
        EstimatedDeliveryDate,
        ActualDeliveryDate,
        CustomerName,
        CreatedAt
      FROM Shipments
      ORDER BY CreatedAt DESC
    `);

    return NextResponse.json(shipments);
  } catch (error) {
    console.error('Failed to fetch shipments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipments' },
      { status: 500 }
    );
  }
}