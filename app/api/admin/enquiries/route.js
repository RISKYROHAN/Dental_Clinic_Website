import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Enquiry from '@/models/Enquiry';
import getRedisClient from '@/lib/redis';

export async function GET() {
  try {
    const redis = await getRedisClient();
    
    // Check Cache
    if (redis.isOpen) {
      const cachedEnquiries = await redis.get('admin:enquiries');
      if (cachedEnquiries) {
        return NextResponse.json({ success: true, data: JSON.parse(cachedEnquiries) });
      }
    }

    await dbConnect();
    // Fetch and sort by newest first
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });

    // Store in Cache (1 hour TTL)
    if (redis.isOpen) {
      await redis.setEx('admin:enquiries', 3600, JSON.stringify(enquiries));
    }

    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    console.error('Fetch enquiries error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { status } = await request.json();

    if (!id || !status) {
       return NextResponse.json({ error: 'ID and Status are required' }, { status: 400 });
    }

    await dbConnect();
    const updated = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    
    const redis = await getRedisClient();
    if (redis.isOpen) {
      // Invalidate Cache since standard data was modified
      await redis.del('admin:enquiries');
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
