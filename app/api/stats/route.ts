import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = await executeQuery(`
      SELECT
        COUNT(*) as totalShipments,
        SUM(CASE WHEN Status = 'In Transit' THEN 1 ELSE 0 END) as inTransit,
        SUM(CASE WHEN Status = 'Delivered' THEN 1 ELSE 0 END) as delivered,
        SUM(CASE WHEN Status = 'Delayed' THEN 1 ELSE 0 END) as delayed
      FROM Shipments
    `);

    return NextResponse.json(stats[0]);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}