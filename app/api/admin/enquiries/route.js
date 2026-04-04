import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Enquiry from '@/models/Enquiry';

export async function GET() {
  try {
    await dbConnect();
    // Fetch and sort by newest first
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
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
    
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
