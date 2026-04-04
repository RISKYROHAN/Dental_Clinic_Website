import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Enquiry from '@/models/Enquiry';

export async function POST(request) {
  try {
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

    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error) {
    console.error('Create Enquiry Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
