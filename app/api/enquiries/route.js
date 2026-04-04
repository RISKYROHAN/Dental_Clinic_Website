import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Enquiry from '@/models/Enquiry';
import getRedisClient from '@/lib/redis';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const redis = await getRedisClient();
    
    // Rate Limiting (10 requests per hour)
    const rateLimitKey = `rate_limit:enquiry:${ip}`;
    if (ip !== 'unknown') {
      const currentCount = await redis.incr(rateLimitKey);
      if (currentCount === 1) {
        await redis.expire(rateLimitKey, 3600); // 1 hour
      }
      if (currentCount > 10) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
      }
    }

    const body = await request.json();
    const { name, phone, preferredDate, reason } = body;

    // Validate
    if (!name || !phone || !preferredDate || !reason) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await dbConnect();

    // Create enquiry
    const enquiry = await Enquiry.create({
      name,
      phone,
      preferredDate,
      reason
    });

    // Invalidate Admin Dashboard Cache
    if (redis.isOpen) {
      await redis.del('admin:enquiries');
    }

    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error) {
    console.error('Create Enquiry Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
